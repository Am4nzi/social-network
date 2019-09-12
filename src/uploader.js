import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            id: "id"
        };
    }

    handleChange(e) {
        console.log(e.target.files[0]);
        this.setState(
            {
                [e.target.name]: e.target.files[0]
                //the console.log is in a callback to prevent hoisting due to asynchronous activity
            },
            () => console.log("this.setState in handleChange:")
        );
    }

    handleSubmit(e) {
        console.log("handleSubmit is running");
        let formData = new FormData();
        formData.append("file", this.state.file);
        axios
            .post("/addProfileImage", formData)
            .then(res => {
                console.log("Logging res.data in handleSubmit", res.data);
                this.props.setImage(res.data);
                if (res.data.message) {
                    this.handleError();
                } else {
                    // location.replace("/");
                }
            })
            .catch(function(err) {
                console.log("Error in handleSubmit: ", err);
            });
        e.preventDefault();
        // this.setState({value: this.state});
    }

    render() {
        return (
            <React.Fragment>
                <div className="uploader-modal-wrapper">
                    <div className="uploader-modal">
                        <div className="uploader">
                            <h2>x</h2>
                            <h3>Upload a new profile picture</h3>

                            <input
                                name="file"
                                type="file"
                                accept="image/*"
                                onChange={this.handleChange}
                            />
                            <button onClick={this.handleSubmit}>submit</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
