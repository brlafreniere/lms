import React from "react";

import FormBase from "../FormBase";

export default class AuthorForm extends FormBase {
    constructor(props) {
        super(props);
        this.state = {
            formFields: {
                last_name: '',
                first_name: null,
            }
        };
    }

    render() {
        return (
            <div className='tab-body'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.authors.map(a =>
                            <tr key={a.id}>
                                <td>{a.last_name}</td>
                                <td>{a.first_name}</td>
                                <td>
                                    <nav className="nav">
                                        <button className="btn btn-primary" onClick={(e) => { this.deleteAuthor(e, a.id) }}>Delete</button>
                                    </nav>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}