import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsAndWannabes, acceptFriendRequest } from "./actions";

export default function Wannabes() {
    const dispatch = useDispatch();
    const friendsAndWannabes = useSelector(
        state =>
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter(user => user.accepted === false)
    );

    useEffect(() => {
        dispatch(getFriendsAndWannabes());
    }, [friendsAndWannabes]);

    const wannabees = (
        <div className="friends-list">
            {console.log("friendsAndWannabes in wannabes: ", friendsAndWannabes)}
            {friendsAndWannabes &&
                friendsAndWannabes.map((user, index) => {
                    return (
                        <div key={index}>
                            <div className="user">
                                <div className="profile-img-container">
                                    <img src={user.profileimgurl} />
                                </div>
                                <div>
                                    <button
                                        className="navbutton"
                                        onClick={e => {
                                            dispatch(
                                                acceptFriendRequest(user.id)
                                            );
                                        }}
                                    >
                                        Add Friend
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
    return (
        <div id="makefriend">
            {friendsAndWannabes && !friendsAndWannabes.length && (
                <div>You have no friend requests</div>
            )}
            {friendsAndWannabes && !!friendsAndWannabes.length && wannabees}
        </div>
    );
}
