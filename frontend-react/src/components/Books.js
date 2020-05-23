import React from "react";
import Axios from "axios";

import { Link } from "react-router-dom";

function Book(props) {
    return (
        <div className="book-tile">
            <Link to={`/book/${props.book.id}`}>
                <div className="book-tile-image">
                    <img alt={`${props.book.title} book cover`} src={`${process.env.REACT_APP_API_URL}/uploads/${props.book.cover_image_file_name}`} />
                </div>
                <div className="book-tile-title">{props.book.title}</div>
            </Link>
        </div>
    )
}

export default class Books extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }

    componentDidMount = () => {
        this.queryBooks();
    }

    queryBooks = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/books`).then(response => {
            this.setState({books: response.data})
        })
    }

    render() {
        return (
            <div className='book-group'>
                {this.state.books.map(book => 
                    <Book book={book} />
                )}
            </div>
        )
    }
}