import React, { useEffect } from "react";
import CurrentFriends from "./currentfriends";
import Wannabes from "./wannabes";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsAndWannabes } from "./actions";
import axios from "./axios";

export default function Friends() {
    const dispatch = useDispatch();
    const friendsAndWannabes = useSelector(state => state.friendsAndWannabes);

    useEffect(() => {
        dispatch(getFriendsAndWannabes());
    }, []);

    useEffect(() => {
        axios.get("/getFriendsAndWannabes").then(res => {});
    }, []);

    return (
        <React.Fragment>
            <div className="component-outer-wrapper">
                <div className="friends-component-inner-wrapper">
                    <h1>Friends List</h1>
                    <div className="currentFriends">
                        <h2>These people are your friends:</h2>
                    </div>
                    <CurrentFriends />
                    <div className="wannabes">
                        <h2>These people want to be your friends:</h2>
                        <Wannabes />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
