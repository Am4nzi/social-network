import React from "react";
import axios from "./axios";

export default class Index extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { error: "" };
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
                //the console.log is in a callback to prevent hoisting due to asynchronous activity
            },
            () => console.log("this.state in handleChange:")
        );
    }

    handleSubmit(e) {
        console.log("handleSubmit is running in login");
        let data = this.state;
        axios
            .post("/login", { data })
            .then(res => {
                console.log("Logging res.data in handleSubmit", res.data);
                if (res.data.message === "error") {
                    this.handleError();
                } else {
                    location.replace("/");
                }
            })
            .catch(function(err) {
                console.log("Error in handleSubmit: ", err);
            });
        e.preventDefault();
    }

    handleError() {
        console.log("Error: incorrect password.");
        this.setState({
            error: true
        });
    }

    render() {
        return (
            <div>
                {console.log("this.error in render", this.state.error)}
                {this.state.error && <h2>Error: incorrect password.</h2>}
                <form onSubmit={this.handleSubmit} className = "welcome-forms">
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
