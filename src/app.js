import React from "react";
import ProfilePic from "./profilepic";
import Profile from "./profile";
import Uploader from "./uploader";
import BioEditor from "./bioeditor";
import FindUsers from "./findusers";
import OtherProfile from "./otherprofile";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            fname: "",
            lname: "",
            imageurl: "",
            bio: "",
            id: "",
            uploaderIsVisible: false,
            editProfileButtonIsVisible: true,
            bioEditorIsVisible: false
        };
        this.showModal = this.showModal.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.showBioEditor = this.showBioEditor.bind(this);
        this.hideEditProfileButton = this.hideEditProfileButton.bind(this);
        this.showEditProfileButton = this.showEditProfileButton.bind(this);
        this.setImage = this.setImage.bind(this);
        this.showBioAndEditProfileButton = this.showBioAndEditProfileButton.bind(
            this
        );
    }

    componentDidMount() {
        axios
            .get("/getUserInfo")
            .then(res => {
                this.getUserData(
                    res.data[0].fname,
                    res.data[0].lname,
                    res.data[0].bio,
                    res.data[0].profileimgurl
                );
            })
            .catch(function(err) {
                console.log("Error in handleSubmit: ", err);
            });
    }

    showModal() {
        if (this.state.uploaderIsVisible === false) {
            this.setState({
                uploaderIsVisible: true
            });
        } else if (this.state.uploaderIsVisible === true) {
            this.setState({
                uploaderIsVisible: false
            });
        }
    }

    showBioAndEditProfileButton() {
        this.showBioEditor();
        this.hideEditProfileButton();
    }

    showBioEditor() {
        if (this.state.bioEditorIsVisible === false) {
            this.setState({
                bioEditorIsVisible: true
            });
        } else if (this.state.bioEditorIsVisible === true) {
            this.setState({
                bioEditorIsVisible: false
            });
        }
    }

    hideEditProfileButton() {
        if (this.state.editProfileButtonIsVisible === true) {
            this.setState({
                editProfileButtonIsVisible: false
            });
        } else if (this.editProfileButtonIsVisible === false) {
            this.setState({
                editProfileButtonIsVisible: true
            });
        }
    }

    showEditProfileButton() {
        if (this.state.editProfileButtonIsVisible === false) {
            this.setState({
                editProfileButtonIsVisible: true
            });
        } else if (this.editProfileButtonIsVisible === true) {
            this.setState({
                editProfileButtonIsVisible: false
            });
        }
    }

    getUserData(fname, lname, bio, profileimgurl) {
        this.setState({
            fname: fname,
            lname: lname,
            bio: bio,
            imageurl: profileimgurl
        });
    }

    setImage(imageurl) {
        this.setState({ imageurl: imageurl });
    }

    render() {
        return (
            <React.Fragment>
                <nav>
                    <ul className="navbar">

                        <a href="/findusers" className="navbutton">
                            Find Users
                        </a>

                        <a
                            href="http://localhost:8080/welcome#/register"
                            className="navbutton"
                        >
                            Register
                        </a>

                        <a
                            href="http://localhost:8080/welcome#/login"
                            className="navbutton"
                        >
                            Login
                        </a>

                        <a href="/logout" className="navbutton">
                            Logout
                        </a>
                    </ul>

                    <ProfilePic
                        fname={this.state.fname}
                        lname={this.state.lname}
                        imageurl={this.state.imageurl}
                        showModal={this.showModal}
                    />
                </nav>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        setImage={imageurl =>
                            this.setState({ imageurl: imageurl })
                        }
                    />
                )}

                <h3 onClick={this.showModal}>Hello from App</h3>

                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    fname={this.state.fname}
                                    lname={this.state.lname}
                                    bio={this.state.bio}
                                    imageurl={this.state.imageurl}
                                    showModal={this.showModal}
                                    showBioEditor={this.showBioEditor}
                                    bioEditorIsVisible={
                                        this.state.bioEditorIsVisible
                                    }
                                    hideEditProfileButton={
                                        this.hideEditProfileButton
                                    }
                                    showBioAndEditProfileButton={
                                        this.showBioAndEditProfileButton
                                    }
                                    editProfileButtonIsVisible={
                                        this.state.editProfileButtonIsVisible
                                    }
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            component={OtherProfile}
                            id={this.state.id}
                        />
                        <Route
                            path="/findusers"
                            component={FindUsers}
                        />
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
