import React from "react";
import Presentational from "./presentational";
import Uploader from "./uploader";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            fname: "Philip. J.",
            lname: "Fry",
            imageurl: "",
            uploaderIsVisible: false
        };
        this.showModal = this.showModal.bind(this);
    }

    showModal() {
        this.setState({
            uploaderIsVisible: true
        });
    }

    componentDidMount() {
        console.log("App mounted!");
        // We will want to make an axios request to server
        // it will do a db query to find out info about user (it will know who the user is by their login cookie i.e. req.session.id)
        // When we have that info we can add it to setState
    }

    render() {
        return (
            <React.Fragment>
            
                <h1 onClick={this.showModal}>Hello from App</h1>
                <Presentational
                    fname={this.state.fname}
                    lname={this.state.lname}
                    imageurl={this.state.imageurl}
                    showModal = {this.showModal}
                />
                {this.state.uploaderIsVisible && <Uploader />}

            </React.Fragment>
        );
    }
}
