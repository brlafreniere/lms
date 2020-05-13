import React from 'react';
import { Route } from 'react-router-dom';
import Cookies from 'js-cookie';

import './App.css';
import Navbar from './components/Navbar';
import NewBooks from './components/NewBooks';
import MyAccount from './components/MyAccount';
import AppContext from './AppContext';
import AdminPage from './components/admin/AdminPage';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: JSON.parse(Cookies.get('user-object')),
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
                    <Navbar>
                        <Route exact path="/">
                            Welcome to the Library Management System
                        </Route>
                        <Route exact path="/about">
                            The About Page
                        </Route>
                        <Route exact path="/new-books">
                            <NewBooks />
                        </Route>
                        <Route exact path="/my-account">
                            <MyAccount />
                        </Route>
                        <Route exact path="/admin">
                            <AdminPage />
                        </Route>
                    </Navbar>
                </AppContext.Provider>
            </div>
        );
    }
}