var spicedPg = require("spiced-pg");

var db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");

//**************************************
//********USERS TABLE*******************
//**************************************

exports.addUser = (fname, lname, email, password, profileimgurl) => {
    return db.query(
        `INSERT INTO users (fname, lname, email, password, profileimgurl) VALUES
         ($1, $2, $3, $4, $5)
         RETURNING *`,
        [fname, lname, email, password, profileimgurl]
    );
};

exports.addBio = function(id, bio) {
    return db
        .query(
            `UPDATE users
            SET bio=$2
            WHERE id=$1
            RETURNING profileimgurl`,
            [id, bio]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.uploadProfilePic = function(id, profileimgurl) {
    return db
        .query(
            `UPDATE users
            SET profileimgurl=$2
            WHERE id=$1
            RETURNING profileimgurl`,
            [id, profileimgurl]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getPasswordForCheck = function(email) {
    return db
        .query(`SELECT password, id FROM users WHERE email=$1`, [email])
        .then(({ rows }) => {
            return rows;
        });
};

exports.getUserInfo = function(id) {
    return db
        .query(`SELECT * FROM users WHERE id=$1`, [id])
        .then(({ rows }) => {
            return rows;
        });
};

exports.getOtherProfileInfo = function(urlId) {
    return db
        .query(`SELECT * FROM users WHERE id=$1`, [urlId])
        .then(({ rows }) => {
            return rows;
        });
};

exports.getThreeMostRecentUsers = () => {
    return db
        .query(
            `SELECT * FROM users
        ORDER BY id DESC
        LIMIT 3`
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getMatchingUsers = function(val) {
    return db
        .query(
            `SELECT fname, lname, profileimgurl, id FROM users WHERE fname || ' ' || lname ILIKE $1;`,
            [val + "%"]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.addReceiverAndSenderIDs = (receiver_id, sender_id) => {
    return db.query(
        `INSERT INTO friendships (receiver_id, sender_id) VALUES
         ($1, $2)
         RETURNING *`,
        [receiver_id, sender_id]
    );
};

exports.updateUserProfileData = (age, city, url, user_id) => {
    return db.query(
        `INSERT INTO userprofiles (age, city, url, user_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id)
        DO UPDATE SET age = $1, city = $2, url = $3`,
        [age, city, url, user_id]
    );
};

exports.updateUserData = (fname, lname, email, password, user_id) => {
    return db.query(
        `UPDATE users
        SET fname = $1, lname = $2, email = $3, password = $4
        WHERE users.id = $5
         RETURNING id`,
        [fname, lname, email, password, user_id]
    );
};

//********************************************
//********FRIENDSHIPS TABLE*******************
//********************************************

exports.addReceiverAndSenderIDs = (receiver_id, sender_id) => {
    return db.query(
        `INSERT INTO friendships (receiver_id, sender_id) VALUES
         ($1, $2)
         RETURNING *`,
        [receiver_id, sender_id]
    );
};

exports.updateFriendRelationship = (receiver_id, sender_id) => {
    return db.query(
        `UPDATE friendships
        SET accepted = TRUE
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)
         RETURNING *`,
        [receiver_id, sender_id]
    );
};

exports.deleteFriendRelationship = (receiver_id, sender_id) => {
    return db.query(
        `DELETE FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)
         RETURNING *`,
        [receiver_id, sender_id]
    );
};

exports.getFriendRelationship = function(receiver_id, sender_id) {
    return db
        .query(
            `SELECT * FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
            [receiver_id, sender_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getFriendsAndWannabes = receiver_id => {
    return db
        .query(
            `SELECT users.id, users.fname, users.lname, users.profileimgurl, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
    OR (accepted = false AND sender_id = $1 AND receiver_id = users.id)`,
            [receiver_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.saveMessage = async function(sender_id, msg) {
    if (msg.message) {
        await db.query(
            `
           INSERT INTO chats (sender_id, message, user_wall)
           VALUES ($1, $2, $3)
           RETURNING sender_id;
       `,
            [sender_id, msg.message, msg.otherUser ? msg.otherUser:0]
        );

    }

    return db.query(
        `SELECT users.id, users.fname, users.profileimgurl, chats.message, chats.user_wall
        FROM users
        JOIN chats
        ON (chats.sender_id = users.id)
        WHERE chats.user_wall = $1
        ORDER BY chats.created_at DESC
        LIMIT 10;`,
        [msg.otherUser ? msg.otherUser:0]
    );
};

exports.getOnlineUsers = function(id) {
    return db
        .query(`SELECT * FROM users WHERE id=$1`, [id])
        .then(({ rows }) => {
            return rows;
        });
};
