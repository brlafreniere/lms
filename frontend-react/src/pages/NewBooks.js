import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Book(props) {
    return (
        <div className="book-tile">
            <Link to={`/book/${props.book.id}`}>
                <div className="book-tile-title">{props.book.title}</div>
                <div className="book-tile-image">
                    <img alt={`${props.book.title} book cover`} src={`${process.env.REACT_APP_API_URL}/uploads/${props.book.cover_image_file_name}`} />
                </div>
            </Link>
        </div>
    )
}

export default class NewBooks extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/books`)
            .then(response => {
                const books = response.data;
                this.setState({books});
            });
    }

    render() {
        return (
            <div className="new-books-area">
                { this.state.books.map(book => <Book book={book} key={book.id} />)}
            </div>
        );
    }
}