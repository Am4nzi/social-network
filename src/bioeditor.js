import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editProfileButtonIsVisible: props.editProfileButtonIsVisible,
            showEditProfileButton: props.showEditProfileButton,
            bioEditorIsVisible: props.bioEditorIsVisible
        };
        this.isEditing = this.isEditing.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showEditProfileButton = this.showEditProfileButton.bind(this);
        this.onClick2 = this.onClick2.bind(this);
    }

    isEditing(e) {
        console.log("this is working", this.props);
        this.setState(

            {
                bio: e.target.value,
            },
            () => console.log("this.props.bio in isEditing: ", this.props.bio)
        );
    }

    handleSubmit(e) {
        console.log("handleSubmit is running");
        let data = this.state;
        console.log("Logging data in handleSubmit: ", data);
        axios.post("/addbio", { data }).catch(function(err) {
            console.log("Error in handleSubmit: ", err);
        });
        e.preventDefault();

        // this.setState({value: this.state});
    }

    onClick2() {
        this.handleSubmit();
        this.showEditProfileButton();
    }

    showEditProfileButton() {
        if (this.state.editProfileButtonIsVisible === false) {
            this.setState({
                editProfileButtonIsVisible: true
            });
        } else if (this.editProfileButtonIsVisible === true) {
            this.setState({
                editProfileButtonIsVisible: false
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                {console.log("Logging this.state in render: ", this.state)}
                <form onSubmit={this.onClick2 }>
                    {this.isEditing && (
                        <div>
                            <textarea onChange={this.isEditing}></textarea>
                        </div>
                    )}

                    {!this.state.bioEditorIsVisible && (
                        <button onClick={this.state.showEditProfileButton}>
                            Save Bio
                        </button>
                    )}
                </form>
            </React.Fragment>
        );
    }
}
