import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ recipientId }) {
    const [recipientIdForDbRel, setRecipientIdForDbRel] = useState(recipientId);
    const [receiverId, setReceiverId] = useState();
    const [senderId, setSenderId] = useState();
    const [acceptedStatus, setAcceptedStatus] = useState();
    const [loggedInUserCookie, setloggedInUserCookie] = useState();

    const onUserClickSendUserData = e => {
        console.log("Logging recipientId in onUserClick: ", recipientId);
        (async () => {
            await axios
                .post("/addReceiverAndSenderIDs/" + recipientId)
                .then(res => {
                    console.log(
                        "res.data.friendship.rows[0.id in SendUserData: ",
                        res.data.friendship.rows[0].id
                    );
                    console.log("res.data in SendUserData: ", res.data);
                    let friendStatus = res.data.friendship.rows[0].accepted;
                    let receiverId = res.data.friendship.rows[0].receiver_id;
                    let senderId = res.data.friendship.rows[0].sender_id;
                    let cookie = res.data.loggedInUserCookie;
                    console.log(
                        "!!!",
                        friendStatus,
                        receiverId,
                        senderId,
                        cookie
                    );
                    setloggedInUserCookie(cookie);
                    setReceiverId(receiverId);
                    setSenderId(senderId);
                    setAcceptedStatus(friendStatus);
                    console.log(
                        "Logging res.data in /addReceiverAndSenderIDs/",
                        res.data
                    );
                })
                .catch(function(err) {
                    console.log("Error in /addReceiverAndSenderIDs/: ", err);
                });
        })();
    };

    const onUserClickSetStatusTrue = e => {
        console.log("Logging recipientId in onUserClick: ", recipientId);
        (async () => {
            await axios
                .post("/setAcceptedToTrue/" + recipientId)
                .then(res => {
                    console.log("res.data in SendUserData: ", res.data);
                    let friendStatus = res.data.friendship.rows[0].accepted;
                    let receiverId = res.data.friendship.rows[0].receiver_id;
                    let senderId = res.data.friendship.rows[0].sender_id;
                    let cookie = res.data.loggedInUserCookie;
                    console.log("DATA! ", friendStatus, receiverId, senderId, cookie);
                    setloggedInUserCookie(cookie);
                    setReceiverId(receiverId);
                    setSenderId(senderId);
                    setAcceptedStatus(friendStatus);
                })
                .catch(function(err) {
                    console.log("Error in /setAcceptedToTrue/: ", err);
                });
        })();
    };

    const onUserClickUnfriend = e => {
        console.log("Logging recipientId in onUserClick: ", recipientId);
        (async () => {
            await axios
                .post("/unfriend/" + recipientId)
                .then(res => {
                    console.log("res.data in SendUserData: ", res.data);
                    let friendStatus = res.data.friendship.rows[0].accepted;
                    let receiverId = res.data.friendship.rows[0].receiver_id;
                    let senderId = res.data.friendship.rows[0].sender_id;
                    let cookie = res.data.loggedInUserCookie;
                    console.log("DATA! ", friendStatus, receiverId, senderId, cookie);
                    setloggedInUserCookie();
                    setReceiverId();
                    setSenderId();
                    setAcceptedStatus();
                })
                .catch(function(err) {
                    console.log("Error in /setAcceptedToTrue/: ", err);
                });
        })();
    };

    useEffect(() => {
        console.log("/getFriendRelationship/ axios is running");
        axios.get("/getFriendRelationship/" + recipientIdForDbRel).then(res => {
            console.log(
                "res.data in /getFriendRelationship/: ",
                res.data.friendship
            );
            let friendStatus = res.data.friendship.accepted;
            let receiverId = res.data.friendship.receiver_id;
            let senderId = res.data.friendship.sender_id;
            let cookie = res.data.loggedInUserCookie;
            console.log("DATA IN UNFRIEND", friendStatus, receiverId, senderId, cookie);
            setloggedInUserCookie(cookie);
            setReceiverId(receiverId);
            setSenderId(senderId);
            setAcceptedStatus(friendStatus);
        });
    }, []);

    if (acceptedStatus === undefined) {
        console.log("I AM GETTING TO ADD FRIEND");
        console.log(loggedInUserCookie, senderId, receiverId, acceptedStatus);

        return (
            <div>
                <button className="navbutton" onClick={onUserClickSendUserData}>
                    Add Friend
                </button>
            </div>
        );
    } else if (
        loggedInUserCookie === receiverId &&
        senderId &&
        acceptedStatus === false
    ) {
        console.log("I AM GETTING TO ACCEPT FRIEND REQUEST");
        console.log(loggedInUserCookie, senderId, receiverId, acceptedStatus);
        return (
            <div>
                <button
                    className="navbutton"
                    onClick={onUserClickSetStatusTrue}
                >
                    Accept Friend Request
                </button>
            </div>
        );
    } else if (acceptedStatus === false) {
        console.log("I AM GETTING TO CANCEL FRIEND REQUEST");
        console.log(loggedInUserCookie, senderId, acceptedStatus);

        return (
            <div>
                <button className="navbutton" onClick={onUserClickUnfriend}>
                    Cancel Friend Request
                </button>
            </div>
        );
    } else if (acceptedStatus === true) {
        console.log("I AM GETTING TO UNFRIEND");
        console.log(loggedInUserCookie, senderId, acceptedStatus);

        return (
            <div>
                <button className="navbutton" onClick={onUserClickUnfriend}>
                    Unfriend :(
                </button>
            </div>
        );
    }
}
