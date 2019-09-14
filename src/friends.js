import React, { useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsAndWannabes } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friendsAndWannabes = useSelector(state => state.friendsAndWannabes);

    useEffect(() => {
        dispatch(getFriendsAndWannabes());
    }, []);

    useEffect(() => {
        console.log("/getFriendsAndWannabes axios is running");
        axios.get("/getFriendsAndWannabes").then(res => {
            console.log(res);
            console.log(res.data);
        });
    }, []);

    return (
        <React.Fragment>
            <div>
                <h1>Friends List</h1>
                <h2>These people are your friends:</h2>
                {friendsAndWannabes &&
                    friendsAndWannabes.map((friendsAndWannabes, index) => {
                        if (friendsAndWannabes.accepted === true) {
                            return (
                                <div key={index}>
                                    <p>{friendsAndWannabes.fname} {friendsAndWannabes.lname}</p>
                                    <div className="profile-img-container">
                                        <img
                                            src={
                                                friendsAndWannabes.profileimgurl
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        }
                    })}
                <h2>These people want to be your friends:</h2>
                {friendsAndWannabes &&
                    friendsAndWannabes.map((friendsAndWannabes, index) => {
                        if (friendsAndWannabes.accepted === false) {
                            return (
                                <div key={index}>
                                    <p>{friendsAndWannabes.fname} {friendsAndWannabes.lname}</p>
                                    <div className="profile-img-container">
                                        <img
                                            src={
                                                friendsAndWannabes.profileimgurl
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        }
                    })}
            </div>
        </React.Fragment>
    );
}
