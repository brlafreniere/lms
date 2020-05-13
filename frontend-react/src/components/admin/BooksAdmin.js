import React from "react";
import Axios from "axios";
import {
    Link
} from "react-router-dom";

export default class BooksAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }

    loadBooks = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/books`)
        .then(response => {
            console.log(response)
            this.setState({books: response.data})
        })
    }

    componentDidMount() {
        this.loadBooks()
    }

    render() {
        return (
            <div className='tab-body'>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.books.map(b => 
                        <tr>
                            <td>{b.title}</td>
                            <td>
                                <nav class="nav">
                                    <Link className="nav-link" to="/admin/books/:id/edit">Edit</Link>
                                    <Link className="nav-link" to="/admin/books/:id/delete">Delete</Link>
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