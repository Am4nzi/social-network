import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);

    const keyCheck = e => {
        console.log("e.key", e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            console.log(e.target.value);
            socket.emit("chat data", e.target.value);
            e.target.value = "";
        }
    };

    const elemRef = useRef();

    useEffect(() => {
        let value = false;
        socket.emit("chat data", value);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    return (
        <React.Fragment>
            <div className="component-outer-wrapper">
                <div>
                    <h1>Chat Room!</h1>

                    <div className="chat-messages" ref={elemRef}>
                        {chatMessages &&
                            chatMessages.reverse().map((user, index) => {
                                return (
                                    <div key={index}>
                                        <div className="user">
                                            <div className="chat-user">
                                                <div className="chat-img-container">
                                                    <img
                                                        src={user.profileimgurl}
                                                    />
                                                    <p>{user.fname}</p>
                                                </div>
                                            </div>
                                            <p>{user.message}</p>
                                        </div>
                                    </div>
                                );
                            })}

                    </div>

                    <textarea
                        placeholder="Add your message here"
                        onKeyDown={keyCheck}
                    ></textarea>
                </div>
            </div>
        </React.Fragment>
    );
}
