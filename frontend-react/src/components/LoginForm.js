import React from "react";
import Axios from 'axios';

import AppContext from '../AppContext';
import Error from './Error';

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
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div>
                        <form onSubmit={(e) => this.logIn(context, e)}>
                            <div>
                                E-mail: <br />
                                <input type="email" value={this.state.email} onChange={this.changeEmail} />
                            </div>
                            <div>
                                Password: <br />
                                <input type="password" value={this.state.password} onChange={this.changePassword} />
                            </div>
                            <input type="submit" />
                        </form>
                        { this.state.unauthorizedError ? <Error message="Username or password incorrect." /> : <Error message="A network error ocurred." /> }
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}