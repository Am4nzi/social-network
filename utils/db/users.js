var spicedPg = require("spiced-pg");

var db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");

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
