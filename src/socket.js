import React from "react";
import * as io from "socket.io-client";
import { allChatData, onlineUsers } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("chat data", chatData => {
            store.dispatch(allChatData(chatData));
        });

        socket.on("online users", onlineUsersData => {
            console.log("onlineUsersData in socket.js: ", onlineUsersData);
            store.dispatch(onlineUsers(onlineUsersData));
        });

        // socket.on("last message", lastMessage => {
        //     console.log("TEST!!!: ", lastMessage);
        //     store.dispatch(addLastMessage(lastMessage));
        // });
    }
};
