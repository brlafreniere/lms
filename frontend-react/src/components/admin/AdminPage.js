import React from "react";
import {
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import "./AdminPage.css";

import RecordManager from "./RecordManager";

import BranchTable from "./branches/BranchTable";
import BranchForm from "./branches/BranchForm";

import AuthorTable from "./authors/AuthorTable";
import AuthorForm from "./authors/AuthorForm";

import {
    BookTable,
    BookForm,
} from "../../modules/book";
import BookDetailAdmin from "./../book/BookDetailAdmin";
import BookInventoryFormWithID from "./../book/BookInventory";

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
                        <RecordManager key="book" singular="book" plural="books" table={BookTable} form={BookForm} detail={BookDetailAdmin} inventory={BookInventoryFormWithID} />
                    </Route>
                    <Route path="/admin/authors">
                        <RecordManager key="author" singular="author" plural="authors" table={AuthorTable} form={AuthorForm} />
                    </Route>
                    <Route path="/admin/branches">
                        <RecordManager key="branch" singular="branch" plural="branches" table={BranchTable} form={BranchForm} />
                    </Route>
                </Switch>
            </div>
        )
    }
}