import React from "react";
// import axios from "axios";
import Registration from "./registration";
import Login from "./login";
let elem = <Registration />;
import { HashRouter, Route, Link } from "react-router-dom";

export default function Welcome(props) {
    return (
        <HashRouter>
            <div>
                <h1>Welcome to your life.</h1>
                <img src="https://s3.amazonaws.com/spicedling/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg" />
                <div className="registrationForm">{elem}</div>
                <Route path="*" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/" component={LoginLink} />
            </div>
        </HashRouter>
    );
}

//!IF YOU DON'T HAVE A COMPONENT TO ROUTE TO, JUST USE A NORMAL HREF.
function LoginLink() {
    return <Link to="/login">log in</Link>;
}

//Redirect isn't related to part 2 encounter but might be useful
// return (
// <Hashrouter>
// <div
//     <Route path="*" component={Registration} />
//     <Route path="/login" component={Login}/>
//     <Redirect path="*" to "/" />
// </div>
// </Hashrouter>
// );
