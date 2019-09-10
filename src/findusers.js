import React, { useState, useEffect } from "react";
import Profile from "./profile";
import ProfilePic from "./profilepic";
import axios from "./axios";

export default function FindUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("/getThreeMostRecentUsers").then(res => {
            console.log("res in /getThreeMostRecentUsers: ", res.data);
            setUsers(res.data);
        });
    }, []);

    return (
        <React.Fragment>
            {console.log("users: ", users.id)}
            <ul>
                {users.map(user => (
                    <li key={user.id}> {user.id}<img src={user.profileimgurl}/></li>


                ))}
            </ul>
            <h1>Hello, world</h1>
        </React.Fragment>
    );
}
