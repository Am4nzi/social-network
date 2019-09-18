import React from "react";
import ProfilePic from "./profilepic";
import FriendButton from "./friendbutton";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            imageurl: "",
            bio: "",
            id: "",
            recipientId: "",
            truthState: ""
        };
    }

    getUserData(id) {
        this.setState({
            id: id
        });
    }

    componentDidMount() {
        axios
            .get("/getUserInfo")
            .then(res => {
                this.getUserData(res.data[0].id);
            })
            .catch(function(err) {
                console.log("Error in handleSubmit: ", err);
            });

        axios
            .get("/getOtherProfileInfo/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    fname: res.data[0].fname,
                    lname: res.data[0].lname,
                    bio: res.data[0].bio,
                    imageurl: res.data[0].profileimgurl
                });
                let loggedInId = this.props.match.params.id;
                let newNumber = loggedInId.slice(1);
                this.setState({ recipientId: newNumber });
                if (newNumber == this.state.id) {
                    location.replace("/");
                }
                if (res.data == null) {
                    location.replace("/");
                }
            })
            .catch(function(err) {
                console.log(
                    "Error in componentDidMount in otherprofile: ",
                    err
                );
                location.replace("/");
            });
    }

    render() {
        return (
            <React.Fragment>
                <div className="component-outer-wrapper">
                    <div className="component-inner-wrapper">
                        <div className="bio-left">
                            <div>
                                <h1>
                                    {this.state.fname}
                                </h1>
                                <div className="bigimage">
                                    <ProfilePic
                                        imageurl={this.state.imageurl}
                                    />
                                </div>
                            </div>
                            <div>
                                <FriendButton
                                    recipientId={this.props.match.params.id}
                                    truthStatus={true}
                                />
                            </div>



                        </div>
                        <div className="bioright">
                            <p>{this.state.fname} bio: {this.state.bio}</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
