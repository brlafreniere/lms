import React from 'react';
import Cookies from 'js-cookie';

import './App.css';
import SiteMenuAndSwitch from './components/SiteMenuAndSwitch';
import AppContext from './AppContext';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: Cookies.get('user-object') ? JSON.parse(Cookies.get('user-object')) : {},
            userLoginStatus: Cookies.get("auth-token") ? true : false, 
            setUser: (user) => {
                this.setState({user: user})
            },
            logUserIn: (authToken, authTokenExpiration, user) => {
                this.setState({userLoginStatus: true, user: user})
                Cookies.set('user-object', JSON.stringify(user))
                Cookies.set('auth-token', authToken)
                Cookies.set('auth-token-expiration', authTokenExpiration)
            },
            logUserOut: () => {
                this.setState({userLoginStatus: false})
                Cookies.remove('auth-token')
                Cookies.remove('auth-token-expiration')
            }
        }
    }

    render() {
        return (
            <div className="App">
                <AppContext.Provider value={this.state}>
                    <SiteMenuAndSwitch />
                </AppContext.Provider>
            </div>
        );
    }
}