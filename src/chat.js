import React, { useState, useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
    const profilePic = useSelector(state => state && state.profilePic);


    let profilePicForChat = profilePic && profilePic[0].profileimgurl;
    let userNameForChat = profilePic && profilePic[0].fname;
    console.log("fname: ", userNameForChat);

    console.log("Here are my last 10 chat messages: ", chatMessages);

    const keyCheck = e => {
        console.log("e.key", e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            console.log(e.target.value);
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = "";
        }
    };

    const elemRef = useRef();

    useEffect(() => {
        // console.log("chat mounted");
        // console.log("elemRef", elemRef.current);
        // console.log("scroll-top: ", elemRef.current.scrollTop);
        // console.log("sroll height", elemRef.current.scrollHeight);
        // console.log("client height", elemRef.current.clientHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    return (
        <React.Fragment>
            <div className="component-outer-wrapper">
                <div>
                    <h1>Chat Room!</h1>
                    <div className="chat-messages" ref={elemRef}>
                        <p>Chat messages will go here</p>
                        <p>Chat messages will go here</p>
                        <p>Chat messages will go here</p>
                        <p>Chat messages will go here</p>
                        <p>Chat messages will go here</p>
                        <p>Chat messages will go here</p>
                        <p>Chat messages will go here</p>
                        <p>Chat messages will go here</p>
                        <p>Chat messages will go here</p>
                        <p>Chat messages will go here</p>
                        <p>Chat messages will go here</p>

                        {chatMessages &&
                            chatMessages.map((user, index) => {
                                return (
                                    <div key={index}>
                                        <div className="user">
                                            <div className="profile-img-container">
                                            <p>{userNameForChat}</p>
                                                <img src={profilePicForChat} />
                                                <p>{user.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        <textarea
                            placeholder="Add your message here"
                            onKeyDown={keyCheck}
                        ></textarea>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
