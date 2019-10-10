import React from "react";
import axios from "./axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {error: ""};
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => console.log("this.state in handleChange:", this.state)
        );
    }

    handleSubmit(e) {
        let data = this.state;
        axios
            .post("/registration", { data })
            .then(res => {
                if (res.data.message) {
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
        console.log("A LOGIN ERROR HAS OCCURED, PLEASE TRY AGAIN.");
        this.setState({
            error: true
        });
    }

    render() {
        return (

            <div>
                {this.state.error && (<h2>A LOGIN ERROR HAS OCCURED, PLEASE TRY AGAIN.</h2>)}
                <form onSubmit={this.handleSubmit} className = 'welcome-forms'>
                    <input
                        name="fname"
                        placeholder="First Name"
                        onChange={this.handleChange}
                    />
                    <input
                        name="lname"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="email"
                        onChange={this.handleChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={this.handleChange}
                    />
                    <button>Submit</button>
                </form>

            </div>
        );
    }
}
