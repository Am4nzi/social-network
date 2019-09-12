import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ recipientId, truthStatus }) {
    const [recipientIdForDb, setRecipientIdForDb] = useState();
    const [recipientIdForDbRel, setRecipientIdForDbRel] = useState(recipientId);
    const [receiverId, setReceiverId] = useState();
    const [senderId, setSenderId] = useState();
    const [acceptedStatus, setAcceptedStatus] = useState();
    const [acceptedStatusTrue, setAcceptedStatusTrue] = useState(truthStatus);
    const [loggedInUserCookie, setloggedInUserCookie] = useState();

    // useEffect(() => {
    //     console.log("recipientIdForDb", recipientIdForDb);
    //
    //     axios
    //         .post("/addReceiverAndSenderIDs/" + recipientIdForDb)
    //         .then(res => {
    //             console.log("Logging res.data in handleSubmit", res.data);
    //         })
    //         .catch(function(err) {
    //             console.log("Error in handleSubmit: ", err);
    //         });
    // }, []);

    useEffect(() => {
        (async () => {
            await axios
                .post("/addReceiverAndSenderIDs/" + recipientIdForDb)
                .then(res => {
                    console.log(
                        "Logging res.data in /addReceiverAndSenderIDs/",
                        res.data
                    );
                })
                .catch(function(err) {
                    console.log("Error in /addReceiverAndSenderIDs/: ", err);
                });
        })();
    }, [recipientIdForDb]);

    useEffect(() => {
        (async () => {
            console.log("acceptedStatusTrue in useEffect", acceptedStatusTrue);
            await axios
                .post("/setAcceptedToTrue/" + acceptedStatusTrue + "?" + recipientIdForDb)
                .then(res => {
                    console.log(
                        "Logging res.data in /setAcceptedToTrue/",
                        res.data
                    );
                })
                .catch(function(err) {
                    console.log("Error in /setAcceptedToTrue/: ", err);
                });
        })();
    }, [acceptedStatusTrue]);

    useEffect(() => {
        console.log("/getFriendRelationship/ axios is running");
        console.log("recipientIdForDbRel", recipientIdForDbRel);
        axios.get("/getFriendRelationship/" + recipientIdForDbRel).then(res => {
            console.log("Logging res in /getFriendRelationship/ axios", res);
            setloggedInUserCookie(res.data.loggedInUserCookie);
            setReceiverId(res.data.friendship.receiver_id);
            setSenderId(res.data.friendship.sender_id);
            setAcceptedStatus(res.data.friendship.accepted).catch(function(
                err
            ) {
                console.log("Error in /getFriendRelationship/ ", err);
            });
        });
    }, []);

    const onUserClick = e => {
        setRecipientIdForDb(recipientId);
        console.log("Logging recipientId in onUserClick: ", recipientId);
    };

    const onUserClickSetTrue = e => {
        setAcceptedStatusTrue(truthStatus);
        console.log("logging truthStatus", truthStatus)
    }




    if (acceptedStatus === undefined) {
        console.log("I AM GETTING TO ADD FRIEND");
        return (
            <div>
                <button className="navbutton" onClick={onUserClick}>
                    Add Friend
                </button>
            </div>
        );
    } else if (loggedInUserCookie === senderId && acceptedStatus === false) {
        console.log("I AM GETTING TO ACCEPT FRIEND REQUEST");
        console.log(loggedInUserCookie, senderId, acceptedStatus);
        return (
            <div>
                <button className="navbutton" onClick={onUserClickSetTrue}>
                    Accept Friend Request
                </button>
            </div>
        );
    } else if (acceptedStatus === false) {
        console.log("I AM GETTING TO CANCEL FRIEND REQUEST");
        console.log(loggedInUserCookie, senderId, acceptedStatus);

        return (
            <div>
                <button className="navbutton" onClick={onUserClick}>
                    Cancel Friend Request
                </button>
            </div>
        );
    }
    // return (
    //     <React.Fragment>
    //         {acceptedStatus === undefined ? (
    //             <div>
    //                 <button className="navbutton" onClick={onUserClick}>
    //                     Add Friend
    //                 </button>
    //             </div>
    //         ) : (
    //             <div>
    //                 <button className="navbutton" onClick={onUserClick}>
    //                     Accept Friend Request
    //                 </button>
    //             </div>
    //         )}
    //     </React.Fragment>
    // );
}
