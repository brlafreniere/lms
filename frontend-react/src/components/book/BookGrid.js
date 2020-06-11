import Axios from "axios";
import React from "react";

import {Link} from "react-router-dom";

import LMS from "../../modules/lms";

import "./BookGrid.css"

function BookCard(props) {
    return (
        <Link className="book-card-link" to={`/books/${props.book.id}`}>
            <div className="book-card">
                <img className="book-card-img" src={`${process.env.REACT_APP_API_URL}/uploads/${props.book.cover_image_file_name}`} alt={props.book.title + " cover image"} />
                <div className="book-card-body">
                    <h5>{props.book.title}</h5>
                </div>
            </div>
        </Link>
    )
}

export default class BookGrid extends React.Component {
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
        }).catch(console.log)
    }

    BookRowPadded = (props) => {
        let bookCards = props.books.map(book => {
            return (<BookCard key={book.id} book={book} />)
        })

        for (let i = props.books.length; i < props.padToSize; i++) {
            bookCards.push(<div className="book-card-pad" style={{display: "hidden" }} key={i + "-pad"} aria-hidden="true"></div>)
        }

        return (
            <div className="book-row mb-5">
                {bookCards}
            </div>
        )
    }

    BookGridOutput = (props) => {
        let book_chunks = LMS.chunk_array(this.state.books, props.row_size)
        let output = book_chunks.map((chunk, index) => {
            return (<this.BookRowPadded key={index} books={chunk} padToSize={props.row_size} />)
        })
        return output;
    }

    render() {
        return (
            <div className='book-grid'>
                <this.BookGridOutput row_size={5} />
            </div>
        )
    }
}