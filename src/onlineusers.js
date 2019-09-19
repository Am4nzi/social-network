import React from "react";
import { useSelector } from "react-redux";

export default function OnlineUsers() {
const onlineUsers = useSelector(state => state && state.onlineUsers);

    return (
        <React.Fragment>
            <div className="online-users-modal-wrapper">
                <div className="online-users-modal">
                    <div className="uploader">
                        <h3>These users are online</h3>
                    </div>
                    {onlineUsers &&
                        onlineUsers.map((user, index) => {
                            return (
                                <div key={index}>
                                    <p>{user.fname}</p>
                                </div>
                            );
                        })}
                </div>
            </div>
        </React.Fragment>
    );
}
