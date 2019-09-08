// !!The * route needs to be last in order
const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db/users");
const { hash, compare } = require("./utils/bc");
const uidSafe = require("uid-safe");
const multer = require("multer");
const path = require("path");
const config = require("./config");
const s3 = require("./s3");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(compression());

app.use(express.json());
app.use(express.static("public"));

app.use(
    require("cookie-session")({
        maxAge: 1000 * 60 * 60 * 24 * 365.25 * 1000,
        secret:
            process.env.NODE_ENV == "production"
                ? process.env.SESS_SECRET
                : require("./secrets").sessionSecret
    })
);

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/registration", (req, res) => {
    console.log("***REGISTRATION POST ROUTE: START***");
    console.log("LOG req.body", req.body);
    let fname = req.body.data.fname;
    let lname = req.body.data.lname;
    let email = req.body.data.email;
    let password = req.body.data.password;
    if ((fname, lname, email, password)) {
        hash(password)
            .then(hash =>
                db.addUser(fname, lname, email, hash))
            .then(data => {
                req.session.userId = data.rows[0].id;
                console.log("LOGGING data.rows in /registration", data.rows);
                console.log("MADE IT TO DATA");
                res.json(data);
            })
            .catch(err => {
                console.log("made it to catch err: ", err);
                res.json({
                    message: "error"
                });
            });
    }
});

app.post("/addBio", (req, res) => {
    console.log("***Bio POST ROUTE: START***");
    console.log("LOG req.body", req.body);
    let bio = req.body.data.bio;
    let id = req.session.userId;
    if (bio) {
        db.addBio(id, bio)
            .then(data => {
                // console.log("LOGGING data: ", data);
                // console.log("LOGGING data[0]: ", data[0]);
                // console.log("LOGGING data[0]profileimgurl: ", data[0].profileimgurl);
                console.log("LOGGING data", data[0] );
                res.json(data[0].bio);
            })
            .catch(err => {
                console.log("ERROR in /addProfileImage in index.js", err);
            });
    }
});

app.post("/login", (req, res) => {
    console.log("***LOG IN POST ROUTE: START***");
    let email = req.body.data.email;
    console.log("email in login: ", email);
    let password = req.body.data.password;
    db.getPasswordForCheck(email).then(hash => {
        console.log(hash);
        compare(password, hash[0].password)
            .then(match => {
                // console.log("LOGGING hash", hash);
                // console.log("LOGGING hash[0].id", hash[0].id);
                // console.log("LOGGING req.session.userId in /login", req.session.userId);
                console.log("***LOG IN POST ROUTE: SUCCESS***");
                console.log("Did my password match?");
                console.log(match);

                if (match === true) {
                    req.session.userId = hash[0].id;
                    res.redirect("/");
                } else if (match === false) {
                    console.log("ERROR in login: wrong password");
                    res.json({
                        message: "error"
                    });
                }
            })
            .catch(e => console.log("Error in login", e));
        console.log("***THIS IS THE UNSUCCESSFUL POST LOGIN ROUTE SPEAKING***");
    });
});

app.post("/addProfileImage", uploader.single("file"), s3.upload, (req, res) => {
    let profileimgurl = config.s3Url + req.file.filename;
    let id = req.session.userId;
    console.log("LOGGING PROFILE URL", config.s3Url + req.file.filename );
    if (req.file) {
        db.uploadProfilePic(id, profileimgurl)
            .then(data => {
                // console.log("LOGGING data: ", data);
                // console.log("LOGGING data[0]: ", data[0]);
                // console.log("LOGGING data[0]profileimgurl: ", data[0].profileimgurl);
                console.log("LOGGING data", data[0] );
                res.json(data[0].profileimgurl);
            })
            .catch(err => {
                console.log("ERROR in /addProfileImage in index.js", err);
            });
    } else {
        res.json({
            success: false
        });
    }
});

app.post("/getUserInfo", (req, res) => {
    db.getUserInfo(req.session.userId).then(data => {
        console.log(data);
        res.json(data);
    }).catch(err => {
        console.log("ERROR in /addProfileImage in index.js", err);
    });
});

// *******************************************
// *************LOGOUT ROUTE******************
// *******************************************
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome#/login");
});


app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
