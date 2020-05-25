import React from "react"

export default class BranchTable extends React.Component {
    render() {
        return (
            <div className='tab-body'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Street Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.records.map(record => 
                        <tr key={record.id}>
                            <td>{record.name}</td>
                            <td>{record.street_address}</td>
                            <td>{record.city}</td>
                            <td>{record.state}</td>
                            <td>{record.zip}</td>
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
        )
    }
}