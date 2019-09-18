import React, { useState, useEffect } from "react";
import * as io from "socket.io-client";
import { allChatData } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("chat data", chatData => {
            store.dispatch(allChatData(chatData));
        });

        // socket.on("last message", lastMessage => {
        //     console.log("TEST!!!: ", lastMessage);
        //     store.dispatch(addLastMessage(lastMessage));
        // });

    }
};
