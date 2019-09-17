// !!The * route needs to be last in order
const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db/dbqueries");
const { hash, compare } = require("./utils/bc");
const uidSafe = require("uid-safe");
const multer = require("multer");
const path = require("path");
const config = require("./config");
const s3 = require("./s3");
const cookieSession = require("cookie-session");

const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

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

// app.use(
//     require("cookie-session")({
//         maxAge: 1000 * 60 * 60 * 24 * 365.25 * 1000,
//         secret:
//             process.env.NODE_ENV == "production"
//                 ? process.env.SESS_SECRET
//                 : require("./secrets").sessionSecret
//     })
// );

const cookieSessionMiddleware = cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 365.25 * 1000,
    secret:
        process.env.NODE_ENV == "production"
            ? process.env.SESS_SECRET
            : require("./secrets").sessionSecret
});

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// ******************************************************
// ***********REDIRECT IF COOKIES NOT PRESENT************
// ******************************************************

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
    });
});

app.post("/addProfileImage", uploader.single("file"), s3.upload, (req, res) => {
    let profileimgurl = config.s3Url + req.file.filename;
    let id = req.session.userId;
    console.log("LOGGING PROFILE URL", config.s3Url + req.file.filename);
    if (req.file) {
        db.uploadProfilePic(id, profileimgurl)
            .then(data => {
                // console.log("LOGGING data: ", data);
                // console.log("LOGGING data[0]: ", data[0]);
                // console.log("LOGGING data[0]profileimgurl: ", data[0].profileimgurl);
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

app.get("/getUserInfo", (req, res) => {
    db.getUserInfo(req.session.userId)
        .then(data => {
            // console.log(data);
            res.json(data);
        })
        .catch(err => {
            console.log("ERROR in /getUserInfo in index.js", err);
        });
});

app.get("/getOtherProfileInfo/:id", (req, res) => {
    // console.log("Logging req.params.id in /getOtherProfileInfo", req.params.id);
    let removeColon = req.params.id;
    while (removeColon.charAt(0) === ":") {
        removeColon = removeColon.substr(1);
    }
    db.getOtherProfileInfo(removeColon)
        .then(data => {
            // console.log(data);
            res.json(data);
        })
        .catch(err => {
            console.log("ERROR in /addProfileImage in index.js", err);
        });
});

app.get("/getThreeMostRecentUsers", (req, res) => {
    db.getThreeMostRecentUsers()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log("ERROR in /getThreeMostRecentUsers in index.js", err);
        });
});

app.get("/getMatchingUsers/:user", (req, res) => {
    console.log("req.params.user", req.params.user);
    db.getMatchingUsers(req.params.user)
        .then(data => {
            console.log("data in /getMatchingUsers", data);
            res.json(data);
        })
        .catch(err => {
            console.log("ERROR in /getMatchingUsers in index.js", err);
        });
});

// *******************************************
// *************LOGOUT ROUTE******************
// *******************************************
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome#/login");
});

// ************************************************
// *************FRIENDSHIP ROUTES******************
// ************************************************

app.post("/addReceiverAndSenderIDs/:receiver_id", (req, res) => {
    console.log("***/addReceiverAndSenderIDs/ POST ROUTE: START***");
    // console.log("DATA in Receiver and Sender ", req.params.receiver_id, req.session.userId);
    db.addReceiverAndSenderIDs(req.params.receiver_id, req.session.userId)
        .then(data => {
            console.log(data);
            res.json({
                loggedInUserCookie: req.session.userId,
                friendship: data
            });
        })
        .catch(err => {
            console.log("ERROR in /addReceiverAndSenderIDs/ in index.js", err);
        });
});

app.get("/getFriendRelationship/:user", (req, res) => {
    console.log("***/getFriendRelationship/ GET ROUTE: START***");
    console.log("req.params.user: ", req.params.user);
    console.log("req.session.userId: ", req.session.userId);
    db.getFriendRelationship(req.params.user, req.session.userId)
        .then(data => {
            console.log("data in /getFriendRelationship", data);
            res.json({
                loggedInUserCookie: req.session.userId,
                friendship: data[0]
            });
        })
        .catch(err => {
            console.log("ERROR in /getFriendRelationship", err);
        });
});

app.post("/setAcceptedToTrue/:receiverid", (req, res) => {
    console.log("***/setAcceptedToTrue/ POST ROUTE: START***");
    console.log(
        "req.params in /setAcceptedToTrue/:receiver",
        req.params.receiverid
    );
    let receiver_id = req.params.receiverid;
    db.updateFriendRelationship(req.session.userId, receiver_id)
        .then(data => {
            res.json({
                loggedInUserCookie: req.session.userId,
                friendship: data
            });
        })
        .catch(err => {
            console.log("ERROR in /setAcceptedToTrue/ in index.js", err);
        });
});

app.get("/getFriendsAndWannabes", (req, res) => {
    console.log("***/getFriendsAndWannabes/ GET ROUTE: START***");
    db.getFriendsAndWannabes(req.session.userId)
        .then(data => {
            console.log("data in /getFriendsAndWannabes/", data);
            res.json(data);
        })
        .catch(err => {
            console.log("ERROR in /getFriendsAndWannabes/", err);
        });
});

// app.get("/getFriendsAndWannabesNew", (req, res) => {
//     db.getFriendsAndWannabesNew()
//         .then(data => {
//             console.log("data in /getFriendsAndWannabes/", data);
//             res.json(data);
//         })
//         .catch(err => {
//             console.log("ERROR in /getFriendsAndWannabes/", err);
//         });
// });

app.post("/unfriend/:receiverid", (req, res) => {
    console.log("***/unfriend/ POST ROUTE: START***");
    console.log("req.params.receiverid in /unfriend", req.params.receiverid);
    let receiver_id = req.params.receiverid;
    db.deleteFriendRelationship(req.session.userId, receiver_id)
        .then(data => {
            res.json({
                loggedInUserCookie: req.session.userId,
                friendship: data
            });
        })
        .catch(err => {
            console.log("ERROR in /unfriend/ in index.js", err);
        });
});

// app.post("/addFriendRelationship", (req, res) => {
//     console.log("***/addFriendRelationship POST ROUTE: START***");
//     db.addBio(receiver_id, sender_id, accepted)
//         .then(data => {
//             res.json(data[0].bio);
//         })
//         .catch(err => {
//             console.log("ERROR in /addFriendRelationship in index.js", err);
//         });
// });

// app.get("/getFriendRelationship", (req, res) => {
//     db.getFriendRelationship()
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             console.log("ERROR in /getFriendRelationship in index.js", err);
//         });
// });

// app.get("/welcome", (req, res) => {
//     if (req.session.userId) {
//         res.redirect("/");
//     }
// });
//
// app.get("*", function(req, res) {
//     if (!req.session.userId) {
//         res.redirect("/welcome");
//     } else {
//         res.sendFile(__dirname + "/index.html");
//     }
// });

io.on("connection", function(socket) {
    console.log("socket with the id ${socket.id} is now connected");
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    let userId = socket.request.session.userId

    db.getMsgsFromChatsDb().then(chatData => {
        let message = chatData;
        console.log("chatData in io: ", chatData);
        io.sockets.emit("last ten messages", message);
    }).catch(err => {
        console.log("ERROR in updateChatsDb  in index.js", err);
    });

    socket.on("My amazing chat message", msg => {
        console.log("message received");
        console.log("and this is the message: ", msg);
        io.sockets.emit("message from server", msg);
        console.log("userId in 'connection'", userId);

        db.addMsgToChatsDb(userId, msg).then(chatData => {

        }).catch(err => {
            console.log("ERROR in updateChatsDb  in index.js", err);
        });

    });

    //We need to do two things in here...
    // 1. We need to make a DB query to get the last 10 chat chat chatMessages
    // db.getLastTenChatMessages().then(data => {
    //Here is where we emit those messages
    // Something like io.sockets.emit(chatMessages, data.rows)})
    // Socket.on('new message', (msg) => {
    // 1. Get all the info about the user i.e. a db query - pass it the userId variable above
    // 2. Add chat message to database
    // 3. To get the last 10 messages... could create a chat message object to send out unless what you return from the DB has all the info already in the res.
    // 4. io.sockets.emit('new chat message variable') We are still in index.js
    // })
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

server.listen(8080, function() {
    console.log("I'm listening.");
});
