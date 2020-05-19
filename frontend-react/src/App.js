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
                    <Navbar>
                        <Route exact path="/">
                            <h1>Welcome</h1>
                            <p>Welcome to my Library Management System. This
                            is a web application that would be used for
                            managing a library organization, such as your
                            local county library along with their network of
                            branches. With it, you can manage branches, book
                            inventory, checkouts, members, and employees.</p>
                            
                            <h4>How do I log in?</h4>
                            <p>If you would like to demo the admin side, feel
                            free to contact me and I will send you the login
                            details!</p>

                            <h4>How did you build this?</h4>
                            <p>I built this with React and Ruby on Rails.</p>

                            <h4>Source code</h4>
                            <p>The source code is available on <a
                            href="https://github.com/brlafreniere/lms">GitHub</a>.</p>

                            <h4>Me, elsewhere on the internet</h4>
                            <ul>
                                <li><a href="http://blainelafreniere.io">My website and blog</a></li>
                                <li><a href="https://github.com/brlafreniere">GitHub</a></li>
                                <li><a href="https://twitter.com/brlafreniere">Twitter</a></li>
                            </ul>
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
                        <Route path="/admin">
                            <AdminPage />
                        </Route>
                    </Navbar>
                </AppContext.Provider>
            </div>
        );
    }
}