import React from "react";

import {Link} from "react-router-dom";

export default class AuthorTable extends React.Component {
    render() {
        return (
            <div className='tab-body'>
                <table className="table table-bordered">
                    <colgroup>
                        <col span="1" />
                        <col span="1" />
                        <col span="1" style={{width: "15%"}} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.records.map(record =>
                            <tr key={record.id}>
                                <td>{record.last_name}</td>
                                <td>{record.first_name}</td>
                                <td>
                                    <nav className="nav">
                                        <Link to={`/admin/${this.props.plural}/${record.id}/edit`} className="btn btn-primary mr-1" >Edit</Link>
                                        <button className="btn btn-danger" onClick={(e) => { this.props.deleteRecord(e, record.id) }}>Delete</button>
                                    </nav>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}