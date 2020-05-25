import React from 'react';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import AppContext from "../AppContext";

const AdminLink = (
    <li className="nav-item">
        <Link to="/admin/books" className="nav-link">
            Admin
        </Link>
    </li>
)

const UserMenu = (props) => {
    if (props.userLoginStatus) {
        return (
            <ul className="navbar-nav ml-auto">
                {props.userIsAdmin ? AdminLink : null}
                <li className="nav-item">
                    <Link to="/my-account" className="nav-link">
                        My Account
                    </Link>
                </li>
                <li className="nav-item">
                    <Link onClick={props.logoutCallback} to="/" className="nav-link">
                        Log Out
                    </Link>
                </li>
            </ul>
        )
    } else {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/my-account" className="nav-link">
                        Log In
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/create-account" className="nav-link">
                        Create Account
                    </Link>
                </li>
            </ul>
        )
    }
}

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
                                                <Link to="/about" className="nav-link">
                                                    About
                                                </Link>
                                            </li>
                                        </ul>
                                        <UserMenu userLoginStatus={context.userLoginStatus} userIsAdmin={context.user.admin} logoutCallback={context.logUserOut} />
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