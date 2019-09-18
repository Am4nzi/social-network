import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ recipientId }) {
    const [recipientIdForDbRel, setRecipientIdForDbRel] = useState(recipientId);
    const [receiverId, setReceiverId] = useState();
    const [senderId, setSenderId] = useState();
    const [acceptedStatus, setAcceptedStatus] = useState();
    const [loggedInUserCookie, setloggedInUserCookie] = useState();
    console.log("DATA!!!", recipientIdForDbRel);

    const onUserClickSendUserData = e => {
        console.log("Logging recipientId in onUserClick: ", recipientId);
        (async () => {
            await axios
                .post("/addReceiverAndSenderIDs/" + recipientId)
                .then(res => {
                    let friendStatus = res.data.friendship.rows[0].accepted;
                    let receiverId = res.data.friendship.rows[0].receiver_id;
                    let senderId = res.data.friendship.rows[0].sender_id;
                    let cookie = res.data.loggedInUserCookie;
                    setloggedInUserCookie(cookie);
                    setReceiverId(receiverId);
                    setSenderId(senderId);
                    setAcceptedStatus(friendStatus);
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
                    let friendStatus = res.data.friendship.rows[0].accepted;
                    let receiverId = res.data.friendship.rows[0].receiver_id;
                    let senderId = res.data.friendship.rows[0].sender_id;
                    let cookie = res.data.loggedInUserCookie;
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
            let friendStatus = res.data.friendship.accepted;
            let receiverId = res.data.friendship.receiver_id;
            let senderId = res.data.friendship.sender_id;
            let cookie = res.data.loggedInUserCookie;
            setloggedInUserCookie(cookie);
            setReceiverId(receiverId);
            setSenderId(senderId);
            setAcceptedStatus(friendStatus);
        });
    }, []);

    if (acceptedStatus === undefined) {
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
        return (
            <div>
                <button className="navbutton" onClick={onUserClickUnfriend}>
                    Cancel Friend Request
                </button>
            </div>
        );
    } else if (acceptedStatus === true) {
        return (
            <div>
                <button className="navbutton" onClick={onUserClickUnfriend}>
                    Unfriend :(
                </button>
            </div>
        );
    }
}
