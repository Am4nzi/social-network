export default function reducer(state = {}, action) {
    if (action.type === "GET_FRIENDS_AND_WANNABES") {
        state = {
            ...state,
            friendsAndWannabes: action.friendsAndWannabes
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.map(user => {
                if (user.id != action.id) {
                    return user;
                } else {
                    return {
                        ...user,
                        makefriend: action.type == "UNFRIEND"
                    };
                }
            })
        };
    }
    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.map(user => {
                if (user.id != action.id) {
                    return user;
                } else {
                    return {
                        ...user,
                        makefriend: action.type == "ACCEPT_FRIEND_REQUEST"
                    };
                }
            })
        };
    }

    if (action.type == "ALL_CHAT_DATA") {
        console.log(
            "chatData in Reducer: ",
            action.chatData,
        );
        state = {
            ...state,
            chatMessages: action.chatData,
        };
    }

    if (action.type == "ONLINE_USERS") {
        console.log(
            "onlineUsersData in Reducer: ",
            action.onlineUsersData,
        );
        state = {
            ...state,
            onlineUsers: action.onlineUsersData,
        };
    }

    console.log("state in reducer", state);
    return state;
}
