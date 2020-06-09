import React from "react";
import Axios from "axios";
import parse from "html-react-parser";

import LMS from "../../modules/lms";

export default class CreateAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accountCreatedSuccessfully: false,
            accountCreationFailed: false,
            failureMessage: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let payload = {
            email: event.target.email.value,
            password: event.target.password.value,
            password_confirmation: event.target.password_confirmation.value
        }

        LMS.api_call_v3({
            path: "/users",
            payload,
            func: Axios.post
        })
        .then(response => {
            this.setState({accountCreatedSuccessfully: true})
        }).catch(error => {
            this.setState({accountCreationFailed: true})
            
            let failureMessage = "";
            for (let [key, value] of Object.entries(error.response.data)) {
                failureMessage = failureMessage + `<li>${key}: ${value}</li>`
            }
            this.setState({failureMessage})
        })
    }

    StatusMessage = () => {
        if (this.state.accountCreatedSuccessfully) {
            return (<div className="alert alert-success">Account created successfully.</div>)
        } 

        if (this.state.accountCreationFailed) {
            return (
                <div className="alert alert-danger">
                    Failed to create account.
                    {this.state.failureMessage ? 
                        <ul>
                            {this.state.failureMessage && parse(this.state.failureMessage)}
                        </ul>
                    : null }
                </div>
            )
        } 

        return null;
    }

    render () {
        return (
            <div>
                <this.StatusMessage />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input name="email"  type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input name="password_confirmation" type="password" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}