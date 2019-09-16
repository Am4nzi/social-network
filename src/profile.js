import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile({
    fname,
    lname,
    bio,
    imageurl,
    bioEditorIsVisible,
    editProfileButtonIsVisible,
    showBioAndEditProfileButton,
    showModal
}) {
    imageurl = imageurl || "/css/img/profiledefault.svg";

    return (
        <React.Fragment>
            <div className="component-outer-wrapper">
                <div className="component-inner-wrapper">
                    <div className="bio-left">
                        <h1 className="bio-title">
                            Hello {fname}
                        </h1>
                        <div onClick={showModal} className="bigimage">
                            <ProfilePic imageurl={imageurl} />
                        </div>
                    </div>
                    <div className="bioright">
                        <div>
                            <p>
                                {fname}'s bio: {bio}
                            </p>
                        </div>
                        {bioEditorIsVisible && <BioEditor bio={bio} />}
                        {bio ? (
                            <div>
                                {editProfileButtonIsVisible && (
                                    <a
                                        onClick={showBioAndEditProfileButton}
                                        className="navbutton"
                                    >
                                        Edit Profile
                                    </a>
                                )}
                            </div>
                        ) : (
                            <div>
                                {editProfileButtonIsVisible && (
                                    <a
                                        onClick={showBioAndEditProfileButton}
                                        className="navbutton"
                                    >
                                        Add Profile
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
