import axios from "./axios";
import * as io from "socket.io-client";

export function getFriendsAndWannabes() {
    return axios.get("/getFriendsAndWannabes").then(({ data }) => {
        return {
            type: "GET_FRIENDS_AND_WANNABES",
            friendsAndWannabes: data
        };
    });
}

export async function unfriend(id) {
    await axios.post(`/unfriend/${id}`);
    return {
        type: "UNFRIEND",
        id
    };
}

export async function acceptFriendRequest(id) {
    await axios.post(`/setAcceptedToTrue/${id}`);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id
    };
}

export function addLastTenMessages(chatData) {
    return axios.get("/getFriendsAndWannabes").then(({ data }) => {
        console.log("chatData in actions", chatData);
        console.log("data in actions", data);
        return {
            type: "LAST_TEN_MESSAGES",
            profilepic: data,
            chatData
        };
    });
}
