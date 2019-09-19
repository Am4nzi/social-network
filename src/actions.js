import axios from "./axios";

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

export async function allChatData(chatData) {
    return {
        type: "ALL_CHAT_DATA",
        chatData
    };
}

export function onlineUsers(onlineUsersData) {

    var merged = [].concat.apply([], onlineUsersData);

    const uniqueUsers = Array.from(new Set(merged.map(a => a.id))).map(id => {
        return merged.find(a => a.id === id);
    });

    console.log("merged in ACTIONS: ", merged);
    console.log("uniqueUsers in ACTIONS: ", uniqueUsers);
    onlineUsersData = uniqueUsers;
    return {
        type: "ONLINE_USERS",
        onlineUsersData
    };
}
