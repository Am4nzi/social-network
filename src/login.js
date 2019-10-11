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
            },
            () => console.log("this.state in handleChange:")
        );
    }

    handleSubmit(e) {
        let data = this.state;
        axios
            .post("/login", { data })
            .then(res => {
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