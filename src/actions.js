import axios from "./axios";

export function getFriendsAndWannabes() {
    return axios
        .get("/getFriendsAndWannabes")
        .then(({ data }) => {
            return {
                type: "GET_FRIENDS_AND_WANNABES",
                friendsAndWannabes: data
            };
        });
}

export async function unfriend(id) {
    await axios.post(`/unfriend/${id}`);
    return {
        type: 'UNFRIEND',
        id
    };
}

export async function acceptFriendRequest(id) {
    await axios.post(`/setAcceptedToTrue/${id}`);
    return {
        type: 'ACCEPT_FRIEND_REQUEST',
        id
    };
}
