import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            id: "id"
        };
    }

    // To reanable the registration function, comment out the alertUser function and amend the butotn in render to this.handleSubmit

    alertUser() {
        alert(
            "The image upload function has been disabled for security reasons"
        );
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.files[0]
            },
            () => console.log("this.setState in handleChange:")
        );
    }

    handleSubmit(e) {
        let formData = new FormData();
        formData.append("file", this.state.file);
        axios
            .post("/addProfileImage", formData)
            .then(res => {
                this.props.setImage(res.data);
                if (res.data.message) {
                    this.handleError();
                } 
            })
            .catch(function(err) {
                console.log("Error in handleSubmit in uploader.js: ", err);
            });
        e.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <div className="uploader-modal-wrapper">
                    <div className="uploader-modal">
                        <div className="uploader">
                            <h2 className="closeModal" onClick={this.props.showModal}>x</h2>
                            <h3>Upload a new profile picture</h3>

                            <input
                                name="file"
                                type="file"
                                accept="image/*"
                                onChange={this.handleChange}
                            />
                            <button onClick={this.alertUser}>submit</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
