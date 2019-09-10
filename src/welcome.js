import React from "react";
import Registration from "./registration";
import Login from "./login";
let elem = <Registration />;
import { HashRouter, Route, Link } from "react-router-dom";

export default function Welcome() {
    return (
        <HashRouter>
            <h1>Welcome to your life.</h1>
            <img src="https://www.itsnicethat.com/system/files/072019/5d3ebaf37fa44cbd22001f5d/images_slice_large/dr-julian-gravy-painting-illustration-art-itsnicethat-013.jpeg?1564392493" />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/register" component={LoginLink} />
        </HashRouter>
    );
}

function LoginLink() {
    return <Link to="/login">log in</Link>;
}
