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
                    <div>
                        <h1 className="bio-title">You're looking good, {fname}</h1>
                        <div onClick={showModal} className="bigimage">
                            <ProfilePic imageurl={imageurl} />
                        </div>
                    </div>
                    <div className="biocenter">
                        <div>
                            <h2 className="bio-header">Your bio:</h2>
                            <p>{bio}</p>
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
