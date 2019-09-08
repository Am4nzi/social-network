import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile({
    fname,
    lname,
    bio,
    imageurl,
    showBioEditor,
    bioEditorIsVisible,
    editProfileButtonIsVisible,
    hideEditProfileButton,
    id,
    onClick,
    setBio
}) {
    imageurl = imageurl || "/css/img/profiledefault.svg";


    return (
        <React.Fragment>
            {console.log("editProfileButtonIsVisible in profile.js: ", { editProfileButtonIsVisible })}
            <div>
                <h1>
                    Hello {fname} {lname}
                </h1>
                <p>Your bio: {bio}</p>
            </div>
            {bioEditorIsVisible && <BioEditor />}
            {editProfileButtonIsVisible &&
            <a onClick={onClick} className="navbutton">
                Edit Profile
            </a>
            }
            <div className="bigimage">
                <ProfilePic fname={fname} lname={lname} imageurl={imageurl} />
            </div>

        </React.Fragment>
    );
}
