import React from "react";

export default class BookTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='tab-body'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.records.map(record => 
                        <tr key={record.id}>
                            <td>{record.title}</td>
                            <td>{record.author.last_name}, {record.author.first_name}</td>
                            <td>
                                <nav className="nav">
                                    <button className="btn btn-primary" onClick={(e) => {this.props.deleteRecord(e, record.id)}}>Delete</button>
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