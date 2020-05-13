import React from 'react';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import './Navbar.css';
import AppContext from "../AppContext";

const adminLink = (
    <li className="nav-item">
        <Link to="/admin" className="nav-link">
            Admin
        </Link>
    </li>
)

const userLoggedInMenu = (
    <AppContext.Consumer>
        {(context => 
            <ul className="navbar-nav ml-auto">
                {context.user.admin ? adminLink : null}
                <li className="nav-item">
                    <Link to="/my-account" className="nav-link">
                        My Account
                    </Link>
                </li>
                <li className="nav-item">
                    <Link onClick={context.logUserOut} to="/" className="nav-link">
                        Log Out
                    </Link>
                </li>
            </ul>
        )}
    </AppContext.Consumer>
)

const userLoggedOutMenu = (
    <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link to="/my-account" className="nav-link">
                Log In
            </Link>
        </li>
    </ul>
)

export default class Navbar extends React.Component {
    render() {
        return (
            <div>
                <AppContext.Consumer>
                    {(context) => (
                        <Router>
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                                <div className="container">
                                    <Link to="/" className="navbar-brand">
                                        Library Management System
                                    </Link>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>

                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item">
                                                <Link to="/new-books" className="nav-link">
                                                    New Books
                                                </Link>
                                            </li>
                                        </ul>
                                        {context.userLoginStatus ? userLoggedInMenu : userLoggedOutMenu}
                                    </div>
                                </div>
                            </nav>

                            <main className="container">
                                <Switch>
                                    {this.props.children}
                                </Switch>
                            </main>
                        </Router>
                    )}
                </AppContext.Consumer>
            </div>
        );
    }
}