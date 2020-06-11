import React from "react";
import {
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import "./AdminPage.css";

import RecordManager from "./RecordManager";

import BranchTable from "../branches/BranchTable";
import BranchForm from "../branches/BranchForm";

import AuthorTable from "../author/AuthorTable";
import AuthorForm from "../author/AuthorForm";

import BookTable from "../../components/book/BookTable";
import BookForm from "../../components/book/BookForm";
import BookDetailAdmin from "./../book/BookDetailAdmin";
import BookInventoryFormWithID from "./../book/BookInventory";

function AdminNavigationTabs() {
    return (
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
                <li className="nav-item">
                    <NavLink to="/admin/goodreads" className="nav-link" activeClassName="active">Goodreads</NavLink>
                </li>
            </ul>
        </nav>
    )
}

function AdminNavigationSwitch() {
    return (
        <Switch>
            <Route path="/admin/books">
                <RecordManager
                    key="book"
                    singular="book"
                    plural="books"
                    table={BookTable}
                    form={BookForm}
                    detail={BookDetailAdmin}
                    inventory={BookInventoryFormWithID} />
            </Route>
            <Route path="/admin/authors">
                <RecordManager
                    key="author"
                    singular="author"
                    plural="authors"
                    table={AuthorTable}
                    form={AuthorForm} />
            </Route>
            <Route path="/admin/branches">
                <RecordManager 
                    key="branch"
                    singular="branch"
                    plural="branches"
                    table={BranchTable}
                    form={BranchForm} />
            </Route>
        </Switch>
    )
}

export default class AdminPage extends React.Component {
    render() {
        return (
            <div>
                <AdminNavigationTabs />
                <AdminNavigationSwitch />
            </div>
        )
    }
}