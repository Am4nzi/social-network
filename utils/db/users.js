var spicedPg = require("spiced-pg");

var db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");

exports.addUser = (fname, lname, email, password) => {
    return db.query(
        `INSERT INTO users (fname, lname, email, password) VALUES
         ($1, $2, $3, $4)
         RETURNING id, fname`,
        [fname, lname, email, password]
    );
};

exports.getPasswordForCheck = function(email) {
    return db
        .query(`SELECT password, id FROM users WHERE email=$1`, [email])
        .then(({ rows }) => {
            return rows;
        });
};
