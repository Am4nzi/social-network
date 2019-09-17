import React, { useState, useEffect } from "react";
import * as io from "socket.io-client";
import { addLastTenMessages } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("message from server", msg => {
            console.log(`
                Got message from the front end
                About to start redux stuff by
                dispatching an action!
                My message: ${msg}
                `);
        });

        socket.on("last ten messages", chatData => {
            console.log(`
                Here is where the last 10 messages are supposed to be: ${chatData}
                `);
            store.dispatch(addLastTenMessages(chatData));
        });

        // socket.on(
        //     'chatMessages',
        //     msgs => store.dispatch(
        //         chatMessages(msgs)
        //     )
        // );
        //
        // socket.on(
        //     'chatMessage',
        //     msg => store.dispatch(
        //         chatMessage(msg)
        //     )
        // );
    }
};
