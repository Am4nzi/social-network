import React from "react";
import ProfilePic from "./profilepic";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            imageurl: "",
            bio: "",
            id: ""
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
                console.log("res.data in OtherProfile", res.data);
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
                <div>
                    <h1>
                        Hello {this.state.fname} {this.state.lname}
                    </h1>
                    <p>Your bio: {this.state.bio}</p>
                </div>

                <div className="bigimage">
                    <ProfilePic imageurl={this.state.imageurl} />
                </div>
            </React.Fragment>
        );
    }
}
