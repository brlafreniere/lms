import React from "react";
import {useParams} from "react-router-dom";

import Book from "../../modules/book";

export default function BookInventoryForm(props) {
    let {id} = useParams();
    return (
        <BookInventoryFormComponent book_id={id} />
    )
}

export class BookInventoryRecord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book_id: props.book_id,
            branch_id: props.branch_id,
            copies: props.copies
        }
        this.save_button = React.createRef()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.save_button.current.classList.remove("btn-secondary")
        this.save_button.current.classList.add("btn-primary")
    }

    handleSave = (event) => {
        this.save_button.current.classList.remove("btn-primary")
        this.save_button.current.classList.add("btn-secondary")
    }

    render() {
        return (
            <tr>
                <td><label htmlFor="copies">{this.props.branch.name}</label></td>
                <td style={{display: "inline-flex"}}>
                    <input type="text" name="copies" className="form-control mr-1" value={this.state.copies} onChange={this.handleChange} />
                    <button className="btn btn-secondary" ref={this.save_button} onClick={this.handleSave} >Save</button>
                </td>
            </tr>
        )
    }
}

export class BookInventoryFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book_inventories: []
        }
    }

    componentDidMount() {
        Book.fetchInventories(this.props.book_id).then(book_inventories => {
            this.setState({book_inventories: book_inventories})
        }).catch(console.log)
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <button className="btn btn-primary mb-3">Add Inventory to Branch</button>
                    <table className="table table-bordered table-hover">
                        <colgroup>
                            <col span="1" style={{width: '75%'}} />
                            <col span="1" style={{width: '25%'}} />
                        </colgroup>
                        <thead className="thead-dark">
                            <tr>
                                <th>Branch</th>
                                <th>Copies</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.book_inventories.map(book_inventory => (
                                <BookInventoryRecord key={book_inventory.id} {...book_inventory} />
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}