import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        //The line below is similar in function to Vue's me/this. Binding fixes the scope issue with this.
        //It saying that this refers to hello.
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.state = {
        //     value: ''
        // }
    }

    handleChange(e) {
        // console.log('handleChange is running');
        // console.log("e.target.name: ", e.target.name);
        //We use this.setState to PUT information in state!
        this.setState(
            {
                [e.target.name]: e.target.value
                //the console.log is in a callback to prevent hoisting due to asynchronous activity
            },
            () => console.log("this.state in handleChange:")
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        // e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
        // console.log("e ", e);
        // console.log("MY LOG: ", this.state);
        let data = this.state;
        axios
            .post("/registration", { data })
            .then(function(data) {
                // var success = data.data.rows[0].fname;
                // console.log("SUCCESS!! WOO!", success);
                // console.log("data", data);
                console.log("back to registration.js");
            })
            .catch(function(err) {
                console.log("Error when adding comment: ", err);
                this.setState({
                    displayError: "homer"
                });
            });



        // this.setState({value: this.state});
    }

    render() {
        return (
            <div>

                <h2>{this.displayError}</h2>
                <h1 id="helloId">Hello!</h1>
                <form onSubmit={this.handleSubmit}>
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
