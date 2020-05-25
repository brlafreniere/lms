import React from "react";
import Axios from "axios";

export default class CreateAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formFields: {
                email: "",
                password: "",
                confirm_password: ""
            }
        }
    }

    handleFieldChange = (event) => {
        const { name, value, type } = event.target;        

        let file = null;
        if (type === "file") {
            file = event.target.files[0]; // only handling 1 file but that's okay
        }

        this.setState(prevState => {
            let formFields = Object.assign({}, prevState.formFields)
            if (type === "file") {
                formFields[name] = file
            } else {
                formFields[name] = value
            }
            return {formFields}
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        Axios.post(`${process.env.REACT_APP_API_URL}/users`, this.state.formFields).then(response => {
            console.log(response)
        })
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input name="email" value={this.state.email} onChange={this.handleFieldChange} type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input name="password" value={this.state.password} onChange={this.handleFieldChange} type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input name="password" value={this.state.confirm_password} onChange={this.handleFieldChange} type="password" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}