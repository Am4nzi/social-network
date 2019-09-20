import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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
            <div className="search-input">
                <h2>Search for users</h2>

                <div>
                    <input onChange={onUserChange} defaultValue={userName} />
                </div>
            </div>

            {matchingUsers.length === 0 && !userName ? (
                <ul>
                    <h4 className="just-joined">Check out who just joined</h4>
                    <div className="findUsersGrid">
                        {mostRecentUsers.map(user => (
                            <div key={user.id}>
                                <div className="grid-text-container">
                                    {console.log("USER!!!: ", user.id)}
                                    {user.fname}
                                </div>
                                <div className="grid-image-container">
                                    <Link to={`/user/${user.id}`}>
                                        <img src={user.profileimgurl} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </ul>
            ) : (
                <ul>
                    <div className="findUsersGrid">
                        {matchingUsers.map(user => (
                            <div key={user.id}>
                                <div className="grid-text-container">
                                    {user.fname}
                                </div>
                                <div className="grid-image-container">
                                    <Link to={`/user/${user.id}`}>
                                        <img src={user.profileimgurl} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </ul>
            )}
        </React.Fragment>
    );
}
