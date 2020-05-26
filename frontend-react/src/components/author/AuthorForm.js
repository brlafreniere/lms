import React from "react";

import {Redirect} from "react-router-dom";

import LMS from "../../modules/lms";
import Form from "../../modules/form";

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

        // update if ID is present
        if (this.state.record.id) {
            let path = "/authors/" + this.state.record.id
            LMS.api_call(path, this.state.record, 'put').then(response => {
                this.setState({redirect: true})
            })
        // otherwise create
        } else {
            LMS.api_call("/authors/", this.state.record, 'post').then(response => {
                this.setState({redirect: true})
            })
            // Axios.post(LMS.api("/books"), formData, config).then(response => {
            //     this.setState({redirect: true})
            // }).catch(error => {
            //     console.log(error)
            // })
        }
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