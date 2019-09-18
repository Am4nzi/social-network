import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsAndWannabes, unfriend } from "./actions";

export default function CurrentFriends() {
    const dispatch = useDispatch();
    const friendsAndWannabes = useSelector(
        state =>
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter(user => user.accepted)
    );

    useEffect(() => {
        dispatch(getFriendsAndWannabes());
    }, []);

    const currentFriends = (
        <div className="friends-list">
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
                                            dispatch(unfriend(user.id));
                                            dispatch(getFriendsAndWannabes(friendsAndWannabes));
                                        }}
                                    >
                                        Unfriend... :(
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
                <div>Nobody is hot!</div>
            )}
            {friendsAndWannabes &&
                !!friendsAndWannabes.length &&
                currentFriends}
        </div>
    );
}
