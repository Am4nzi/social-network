import React from "react";
import axios from "axios";

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        //The line below is similar in function to Vue's me/this. Binding fixes the scope issue with this.
        //It saying that this refers to hello.
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // console.log('handleChange is running');
        console.log("e.target.name: ", e.target.name);
        //We use this.setState to PUT information in state!
        this.setState(
            {
                [e.target.name]: e.target.value
                //the console.log is in a callback to prevent hoisting due to asynchronous activity
            },
            () => console.log("this.state in handleChange:", this.state)
        );
    }

    // this refers to the Hello component and handleChange is function within the component
    render() {
        return (
            <div>
                <h1>Hello!</h1>
                <form>
                    <input
                        name="first"
                        placeholder="first"
                        onChange={ this.handleChange }
                    />
                    <input
                        name="last"
                        placeholder="last"
                        onChange={ this.handleChange }
                    />
                </form>
                <button>submit</button>
            </div>
        );
    }
}
