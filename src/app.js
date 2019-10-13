import React from "react";
import ProfilePic from "./profilepic";
import Profile from "./profile";
import Uploader from "./uploader";
import { Chat } from "./chat";
import Friends from "./friends";
import CurrentFriends from "./currentfriends";
import FindUsers from "./findusers";
import OtherProfile from "./otherprofile";
import OnlineUsers from "./onlineusers";
import OnlineUsersText from "./onlineuserstext";
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
            onlineUsersIsVisible: false,
            editProfileButtonIsVisible: true,
            bioEditorIsVisible: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModalOnBody = this.hideModalOnBody.bind(this);
        this.showOnlineUsers = this.showOnlineUsers.bind(this);
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
                console.log("Error in /getUserInfo in app.js", err);
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

    showOnlineUsers() {
        if (this.state.onlineUsersIsVisible === false) {
            this.setState({
                onlineUsersIsVisible: true
            });
        } else if (this.state.onlineUsersIsVisible === true) {
            this.setState({
                onlineUsersIsVisible: false
            });
        }
    }

    hideModalOnBody() {
        if (this.state.uploaderIsVisible === true) {
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
                {this.state.onlineUsersIsVisible && (
                    <OnlineUsers showOnlineusers={this.showOnlineusers} />
                )}

                <nav>
                    <a href="/">
                        <img src="/css/img/logo.svg" className="logo" />
                    </a>
                    <ul className="navbar">
                        <a href="/friends" className="navbutton">
                            Your Crushes
                        </a>
                        <a href="/findusers" className="navbutton">
                            Find hot aliens
                        </a>
                        <a href="/chat" className="navbutton">
                            Flirt
                        </a>

                        <a href="/logout" className="navbutton">
                            Logout
                        </a>
                        <ProfilePic
                            fname={this.state.fname}
                            lname={this.state.lname}
                            imageurl={this.state.imageurl}
                            showModal={this.showModal}
                        />
                    </ul>
                </nav>
                <div className="online-users">
                    <h2 className="strapline">Dating for celebrity aliens</h2>
                    <OnlineUsersText showOnlineUsers={this.showOnlineUsers} />
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        setImage={imageurl =>
                            this.setState({ imageurl: imageurl })
                        }
                        showModal={this.showModal}
                    />
                )}

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
                                    showOnlineUsers={this.showOnlineUser}
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
                        <Route path="/friends" component={Friends} />
                        <Route
                            path="/currentfriends"
                            component={CurrentFriends}
                        />
                        <Route
                            path="/user/:id"
                            component={OtherProfile}
                            id={this.state.id}
                        />
                        <Route path="/findusers" component={FindUsers} />
                        <Route path="/chat" component={Chat} />
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
