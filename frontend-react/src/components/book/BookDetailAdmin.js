import React from "react";
import {useParams} from "react-router-dom";

import Book from "../../modules/book";

export default function BookDetailAdmin(props) {
    let {id} = useParams();
    return (
        <BookDetailAdminComponent id={id} />
    )
}

export class BookDetailAdminComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: {},
            book_inventories: []
        }
    }

    componentDidMount() {
        Book.fetch(this.props.id).then(book => {
            this.setState({book: book})
        }).catch(console.log);
        Book.fetchInventories(this.props.id).then(book_inventories => {
            this.setState({book_inventories: book_inventories})
        }).catch(console.log)
    }

    render () {
        return (
            <div>
                <h2>{this.state.book.title}</h2>
                <div>
                    {this.state.book.synopsis}
                </div>
                <div className="mt-5">
                    <h3>Inventory</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Branch</th>
                                <th>Copies</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.book_inventories.map(bi => (
                                <tr key={bi.id}>
                                    <td>{bi.branch.name}</td>
                                    <td>{bi.copies}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}