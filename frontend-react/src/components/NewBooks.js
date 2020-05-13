import React from 'react';
import axios from 'axios';

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
            <div className="NewBooks">
                <ul>
                    { this.state.books.map(book => <li key={book.id}>{book.title}</li>) }
                </ul>
            </div>
        );
    }
}