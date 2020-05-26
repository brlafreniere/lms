import React from "react";

import BookList from "../components/book/BookList";

export default class LibraryHome extends React.Component {
    render () {
        return (
            <div>
                <h2>Newest Arrivals</h2>
                <BookList />
            </div>
        )
    }
}