import React from "react";
import {
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import "./AdminPage.css";
import BooksAdmin from "./BooksAdmin";
import AuthorsAdmin from "./AuthorsAdmin";

import RecordAdmin from "./RecordAdmin";

import BranchTable from "./tables/BranchTable";
import BranchForm from "./forms/BranchForm";

import BookTable from "./tables/BookTable";
import BookForm from "./forms/BookForm";

export default class AdminPage extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <NavLink to="/admin/books" className="nav-link" activeClassName="active">Books</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/authors" className="nav-link" activeClassName="active">Authors</NavLink>
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
                    <Route path="/admin/books">
                        <RecordAdmin singular="book" plural="books" table={BookTable} form={BookForm} />
                    </Route>
                    <Route path="/admin/authors">
                        <AuthorsAdmin />
                    </Route>
                    <Route path="/admin/branches">
                        <RecordAdmin singular="branch" plural="branches" table={BranchTable} form={BranchForm} />
                    </Route>
                </Switch>
            </div>
        )
    }
}