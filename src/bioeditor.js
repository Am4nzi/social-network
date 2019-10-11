import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.isEditing = this.isEditing.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showEditProfileButton = this.showEditProfileButton.bind(this);
        this.handleSubmitandshowEditProfileButton = this.handleSubmitandshowEditProfileButton.bind(
            this
        );
    }

    isEditing(e) {
        this.setState(
            {
                bio: e.target.value
            },
            () => console.log("this.props.bio in isEditing: ", this.props.bio)
        );
    }

    handleSubmit(e) {
        let data = this.state;
        axios.post("/addbio", { data }).catch(function(err) {
            console.log("Error in handleSubmit: ", err);
        });
        e.preventDefault();
    }

    handleSubmitandshowEditProfileButton() {
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
                <form onSubmit={this.handleSubmitandshowEditProfileButton}>
                    {this.isEditing && (
                        <div>
                            <textarea
                                onChange={this.isEditing}
                                defaultValue={this.props.bio}
                            ></textarea>
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
