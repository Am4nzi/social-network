import React from "react";
import Registration from "./registration";
import Login from "./login";
let elem = <Registration />;
import { HashRouter, Route, Link } from "react-router-dom";

export default function Welcome() {
    return (
        <HashRouter>
            <React.Fragment>
                <div className="welcome-wrapper">
                    <img className="welcome-logo" src="/css/img/logo.svg" />
                    <h1>Dating for celebrity aliens.</h1>
                    <div className="welcome-nav">
                        <a
                            href="/welcome#/login"
                            className="navbutton"
                        >
                            Login
                        </a>
                        <a
                            href="/welcome#/register"
                            className="navbutton"
                        >
                            Register
                        </a>
                    </div>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Registration} />
                </div>
            </React.Fragment>
        </HashRouter>
    );
}
