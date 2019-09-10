import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindUsers() {
    const [userName, setUserName] = useState();
    const [matchingUsers, setmatchingUsers] = useState([]);
    const [mostRecentUsers, setMostRecentUsers] = useState([]);

    useEffect(() => {
        console.log("");
        axios.get("/getThreeMostRecentUsers").then(res => {
            console.log("res in /getThreeMostRecentUsers: ", res.data);
            setMostRecentUsers(res.data);
        });
    }, []);

    const onUserChange = e => {
        setUserName(e.target.value);
    };

    useEffect(() => {
        let ignore = false;
        if (userName == "") {
            return;
        }
        (async () => {
            const res = await axios.get("/getMatchingUsers/" + userName);
            if (!ignore) {
                setmatchingUsers(res.data);
            } else {
                console.log("IGNORED");
            }
        })();
        return () => {
            ignore = true;
        };
    }, [userName]);

    return (
        <React.Fragment>
            <h2>Search for users</h2>
            <div>
                <input onChange={onUserChange} defaultValue={userName} />
            </div>

            {matchingUsers.length === 0 && !userName ? (
                <ul>
                    <h4>Check out who just joined</h4>
                    {console.log("userName: ", userName)}

                    {console.log("matchingUsers", matchingUsers)}
                    {mostRecentUsers.map(user => (
                        <li key={user.id}>
                            {" "}
                            {user.fname} {user.lname}
                            <img src={user.profileimgurl} />
                        </li>
                    ))}
                </ul>
            ) : (
                <ul>
                    {matchingUsers.map(user => (
                        <li key={user.id}>
                            {user.fname} {user.lname}
                            <img src={user.profileimgurl} />
                        </li>
                    ))}
                </ul>
            )}
        </React.Fragment>
    );
}
