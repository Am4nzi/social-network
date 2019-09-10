import React from "react";

export default function Profilepic({ imageurl, showModal }) {
    imageurl = imageurl || "/css/img/default.png";

    return (
        <React.Fragment>
            <div className="profile-img-container">
                <img onClick={showModal} src={imageurl} />
            </div>
        </React.Fragment>
    );
}
