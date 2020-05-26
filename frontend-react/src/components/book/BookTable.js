import React from "react";

import {Link} from "react-router-dom";

export default class BookTable extends React.Component {
    componentDidMount() {
        this.props.refreshData();
    }

    render() {
        return (
            <div className='tab-body'>
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.records.map(record => 
                        <tr key={record.id}>
                            <td><Link to={`/admin/books/${record.id}`}>{record.title}</Link></td>
                            <td>{`${record.author.last_name}, ${record.author.first_name}`}</td>
                            <td>
                                <nav className="nav">
                                    <Link to={`/admin/books/${record.id}/inventory`} className="btn btn-primary mr-1">Inventory</Link>
                                    <Link to={`/admin/books/${record.id}/edit`} className="btn btn-primary mr-1" >Edit</Link>
                                    <button className="btn btn-danger" onClick={(e) => {this.props.deleteRecord(e, record.id)}}>Delete</button>
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