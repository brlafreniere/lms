import React from 'react';
import { Route } from 'react-router-dom';
import Cookies from 'js-cookie';

import './App.css';
import Navbar from './components/Navbar';
import AppContext from './AppContext';
import AdminPage from './components/admin/AdminPage';

import BookDetailPage from './pages/BookDetail';
import AboutLMS from './pages/AboutLMS';
import LibraryHome from './pages/LibraryHome';
import CreateAccount from './pages/CreateAccount';
import NewBooks from './pages/NewBooks';
import MyAccount from './pages/MyAccount';

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
                            <LibraryHome />
                        </Route>

                        <Route exact path="/about">
                            <AboutLMS />
                        </Route>

                        <Route exact path="/new-books">
                            <NewBooks />
                        </Route>

                        <Route exact path="/book/:id">
                            <BookDetailPage />
                        </Route>

                        <Route exact path="/my-account">
                            <MyAccount />
                        </Route>

                        <Route exact path="/create-account">
                            <CreateAccount />
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