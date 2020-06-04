import React from "react";
import Axios from "axios";
import {useParams} from "react-router-dom";

import Book from "../../modules/book";

export class BookInventoryDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book_inventories: []
        }
    }

    componentDidMount() {
        Book.fetchInventories(this.props.book_id).then(book_inventories => {
            this.setState({book_inventories})
        })
    }

    render() {
        return (
            <div>
                <h4 class="mt-5">Availability</h4>
                <table class="table mt-4">
                    <thead>
                        <tr>
                            <th>Branch</th>
                            <th>Copies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.book_inventories && this.state.book_inventories.map(bi => (
                            <tr key={bi.id}>
                                <td>{bi.branch.name}</td>
                                <td>{bi.copies}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

/* 
 * Represents a collection of individual book inventory records.
 */
export default function BookInventoryCollection(props) {
    let {id} = useParams();
    return (
        <BookInventoryCollectionComponent book_id={id} />
    )
}

/* 
 * Drop down widget so that the user can select which branch a new inventory
 * record applies to 
 */
class BranchSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            branches: []
        }
    }

    componentDidMount() {
        let url = `${process.env.REACT_APP_API_URL}/book_inventories/branches_with_no_inventory`
        let payload = {
            book_id: this.props.book_id
        }
        Axios.post(url, payload).then(response => {
            this.setState({branches: response.data})
        })
    }

    render() {
        return (
            <div>
                <select name="branch_id" className="form-control" onChange={this.props.branchSelected}>
                    <option></option>
                    {this.state.branches.map(branch => (
                        <option key={branch.id} value={branch.id}>{branch.name}</option>
                    ))}
                </select>
            </div>
        )
    }
}

/* 
 * This component represents an individual record of inventory. It associates a
 * number of copies with a branch and a book.
 */
export class BookInventoryRecord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book_id: props.book_id,
            branch_id: props.branch_id,
            copies: props.copies,
            create: true
        }
        this.save_button = React.createRef()
    }

    componentDidMount() {
        if (this.props.branch_id) {
            this.setState({create: false})
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.save_button.current.classList.remove("btn-secondary")
        this.save_button.current.classList.add("btn-primary")
    }

    branchSelected = (event) => {
        this.setState({
            branch_id: event.target.value
        })
    }

    handleSave = (event) => {
        let payload = {
            branch_id: this.state.branch_id,
            book_id: this.state.book_id,
            copies: this.state.copies
        }
        if (this.state.create) {
            let url = `${process.env.REACT_APP_API_URL}/book_inventories`
            Axios.post(url, payload)
        } else {
            let url = `${process.env.REACT_APP_API_URL}/book_inventories/${this.props.id}`
            Axios.put(url, payload)
        }
        this.save_button.current.classList.remove("btn-primary")
        this.save_button.current.classList.add("btn-secondary")
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.branch ? <label htmlFor="copies">{this.props.branch.name}</label> : <BranchSelector book_id={this.state.book_id} branchSelected={this.branchSelected} />}
                </td>
                <td style={{display: "inline-flex"}}>
                    <input type="text" name="copies" className="form-control mr-1" value={this.state.copies} onChange={this.handleChange} />
                    <button className="btn btn-secondary" ref={this.save_button} onClick={this.handleSave} >Save</button>
                </td>
            </tr>
        )
    }
}

/* 
 * Represents a collection of book inventory records. Fetches all book
 * inventory records from an endpoint, and then renders individual rows for
 * each record.
 */
export class BookInventoryCollectionComponent extends React.Component {
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

    addInventoryRecord = () => {
        let newInventoryRecord = {
            id: null,
            book_id: this.props.book_id,
            branch_id: null,
            copies: 0
        }
        this.setState(prevState => {
            return {book_inventories: [...prevState.book_inventories, newInventoryRecord]}
        });
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary mb-3" onClick={this.addInventoryRecord}>Add Inventory to Branch</button>
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
            </div>
        )
    }
}