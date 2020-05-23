import React from "react";
import Axios from 'axios';

import AppContext from '../../AppContext.js';
import Error from '../Error.js';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            unauthorizedError: false,
            generalError: false,
        }
    }

    logIn = (context, event) => {
        event.preventDefault();
        Axios.post(`${process.env.REACT_APP_API_URL}/users/authenticate`, {email: this.state.email, password: this.state.password})
            .then(response => {
                let {token, expiration, user} = response.data;
                context.logUserIn(token, expiration, user)
            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    this.setState({unauthorizedError: true});
                } else {
                    this.setState({generalError: true});
                    console.error(error);
                }
            });
    }

    changeEmail = (event) => {
        this.setState({email: event.target.value})
    }

    changePassword = (event) => {
        this.setState({password: event.target.value})
    }

    render () {
        var error
        if (this.state.unauthorizedError) {
            error = <Error message="Username or password incorrect." />
        }
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div style={{width: "40%"}}>
                        <form onSubmit={(e) => this.logIn(context, e)}>
                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input name="email" type="email" value={this.state.email} onChange={this.changeEmail} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input name="password" type="password" value={this.state.password} onChange={this.changePassword} className="form-control" />
                            </div>
                            <input type="submit" className="btn btn-primary" />
                        </form>
                        { error }
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}