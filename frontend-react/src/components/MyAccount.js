import React from 'react';

import LoginForm from "./LoginForm";
import AppContext from '../AppContext';

class AccountInfo extends React.Component {
    render() {
        return (
            <div>
                Account Information
            </div>
        );
    }
}


export default class MyAccount extends React.Component {
    render () {
        return (
            <AppContext.Consumer>
                {(context) => (
                    context.userLoginStatus ? <AccountInfo /> : <LoginForm />
                )}
            </AppContext.Consumer>
        );
    }
}