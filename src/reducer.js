export default function reducer(state = {}, action) {
    if (action.type === 'GET_FRIENDS_AND_WANNABES') {
        state = {
            ...state,
            friendsAndWannabes: action.friendsAndWannabes
        };
    }
    return state;
}
