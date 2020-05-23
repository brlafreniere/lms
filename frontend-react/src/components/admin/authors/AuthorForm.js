import React from "react";

import {Redirect} from "react-router-dom";

import FormBase from "../FormBase";

export default class AuthorForm extends FormBase {
    constructor(props) {
        super(props);
        this.state = {
            formFields: {
                last_name: '',
                first_name: null,
            }
        };
    }

    render() {
        this.setupRedirect();
        return (
            <form onSubmit={(e) => {e.preventDefault(); this.handleSubmit(e, this.state.formFields, false, this.props.id)}}>
                <div>
                    {this.state.redirect ? <Redirect to={`/admin/${this.props.plural}`} /> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input name="first_name" value={this.state.first_name} onChange={this.handleFieldChange} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input name="last_name" value={this.state.last_name} onChange={this.handleFieldChange} type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>        
        )
    }
}