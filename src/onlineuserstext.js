import React from "react";
import { useSelector } from "react-redux";

export default function OnlineUsersText({ showOnlineUsers }) {
    const onlineUsers = useSelector(state => state && state.onlineUsers);


    return (
        <React.Fragment>


            {onlineUsers && (<p className="users-online-text" onClick={showOnlineUsers}> {onlineUsers.length} users online ▼</p>)}






        </React.Fragment>
    );
}
