import React from "react";
// import axios from "axios";
import axios from "./axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        //The lines below is similar in function to Vue's me/this. Binding fixes the scope issue with this.
        //It saying that this refers to hello.
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {error: ""};
    }

    handleChange(e) {
        // console.log('handleChange is running');
        this.setState(
            {
                [e.target.name]: e.target.value
                //the console.log is in a callback to prevent hoisting due to asynchronous activity
            },
            () => console.log("this.state in handleChange:")
        );
    }

    handleSubmit(e) {
        console.log("handleSubmit is running");
        let data = this.state;
        console.log("Logging data in handleSubmit: ", data);
        axios
            .post("/registration", { data })
            .then(res => {
                console.log("Logging res in handleSubmit", res);
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
        // this.setState({value: this.state});
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
                {console.log("this.error in render", this.state.error)}
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
