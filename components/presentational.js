import React from "react";

export default function Presentational({imageurl, fname, lname, showModal}) {
    console.log("imageurl: ", imageurl);
    imageurl = imageurl || "/css/img/default.png"
    return (
        <div>
            <h2>
                I'm the presentational component. My name is {fname}
                {lname}.
            </h2>
            <img onClick ={showModal} src={imageurl} />
        </div>
    );
}
