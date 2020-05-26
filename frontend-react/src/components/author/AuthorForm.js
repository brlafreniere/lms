import React from "react";

import {Redirect} from "react-router-dom";

import Form from "../../modules/form";
import Author from "../../modules/author";

export default class AuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: {
                last_name: '',
                first_name: '',
            }
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        Author.submitAuthor(this.state.record).then(response => {
            this.setState({redirect: true})
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    {this.state.redirect ? <Redirect to={`/admin/${this.props.plural}`} /> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input name="first_name" value={this.state.record.first_name} onChange={Form.handleInputChange.bind(this)} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input name="last_name" value={this.state.record.last_name} onChange={Form.handleInputChange.bind(this)} type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>        
        )
    }
}