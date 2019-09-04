import React from "react";
// import axios from "axios";
import Registration from './registration';

let elem = <Registration />;


export default function Welcome(props) {
    return ( <div>
        <h1>Welcome to your life.</h1>
        <img src="https://s3.amazonaws.com/spicedling/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg"/>
        <div className="registrationForm">{elem}</div>

    </div>
    );

}
