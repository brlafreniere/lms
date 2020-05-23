import React from "react";
import Axios from "axios";

import { Link } from "react-router-dom";

function Book(props) {
    return (
        <Link to={`/book/${props.book.id}`}>
            <div className="book-tile" style={{'background-image': `url(${process.env.REACT_APP_API_URL}/uploads/${props.book.cover_image_file_name})`}}>
                <div class='book-tile-title'>
                    {props.book.title}
                </div>
            </div>
        </Link>
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
                    <Book key={book.id} book={book} />
                )}
            </div>
        )
    }
}