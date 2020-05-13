import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import "./AdminPage.css";
import BooksAdmin from "./BooksAdmin";

export default class AdminPage extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <nav>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <NavLink to="/admin/books" className="nav-link" activeClassName="active">Books</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/branches" className="nav-link" activeClassName="active">Branches</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/members" className="nav-link" activeClassName="active">Members</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/admin/books">
                            <BooksAdmin />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}