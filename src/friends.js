import React, { useEffect } from "react";
import CurrentFriends from "./currentfriends";
import Wannabes from "./wannabes";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsAndWannabes } from "./actions";
import axios from "./axios";

export default function Friends() {
    const dispatch = useDispatch();

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
                    <h1>Aliens you've gravitated towards: </h1>
                    <div className="currentFriends">
                        <h2 className="bio-title">Your crushes: </h2>
                    </div>
                    <CurrentFriends />
                    <div className="wannabes">
                        <h2 className="bio-title">These people fancy you: </h2>
                        <Wannabes />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
