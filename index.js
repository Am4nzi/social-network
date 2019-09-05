// !!The * route needs to be last in order
const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db/users");
const { hash, compare } = require("./utils/bc");

// const multer = require("multer");
//
// const diskStorage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         callback(null, __dirname + "/uploads");
//     },
//     filename: function(req, file, callback) {
//         uidSafe(24).then(function(uid) {
//             callback(null, uid + path.extname(file.originalname));
//         });
//     }
// });
//
// const uploader = multer({
//     storage: diskStorage,
//     limits: {
//         fileSize: 2097152
//     }
// });

app.use(compression());

app.use(express.json());

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
            .then(hash => db.addUser(fname, lname, email, hash))
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json({
                    message: "error"
                });
            });
    }
});

app.use(express.static("public"));

app.post("/login", (req, res) => {
    console.log("***LOG IN POST ROUTE: START***");
    let email = req.body.data.email;
    let password = req.body.data.password;
    db.getPasswordForCheck(email).then(hash => {
        console.log(hash);
        compare(password, hash[0].password)
            .then(match => {
                console.log("***LOG IN POST ROUTE: SUCCESS***");
                console.log("Did my password match?");
                console.log(match);

                if (match === true) {
                    res.redirect("/welcome");
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

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
