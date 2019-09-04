// !!The * route needs to be last in order
const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db/users");
// const { hash, compare } = require("./utils/bc");
const bc = require("./utils/bc");
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

// app.post("/registration", (req, res) => {
//     console.log("LOG req.body", req.body);
//     console.log("LOG req.props", req.props);
//     console.log("LOG req.state", req.state);
//     let fname = req.body.fname;
//     let lname = req.body.lname;
//     let email = req.body.email;
//     let password = req.body.password;
//     db.addUser(fname, lname, email, password).catch(e => console.log("Error in registration", e));
// });

app.post("/registration", (req, res) => {
    console.log("LOG req.body", req.body);
    let fname = req.body.data.fname;
    let lname = req.body.data.lname;
    let email = req.body.data.email;
    let password = req.body.data.password;
    console.log("I LIKE TURTLES", fname, lname, email, password);
    if ((fname, lname, email, password)) {
        console.log("I LIKE TURTLES", fname, lname, email, password);
        bc.hash(password)
            .then(hash =>
                db.addUser(fname, lname, email, hash)
            ).then(data => {
                res.json(data);
            })
            .catch(error => error.res); 
    }
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
