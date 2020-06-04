import Axios from "axios";
import React from "react";

import BookTile from "./BookTile";

export default class BookList extends React.Component {
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

    render() {
        return (
            <div className='book-group'>
                {this.state.books.map(book => 
                    <BookTile key={book.id} book={book} />
                )}
            </div>
        )
    }
}