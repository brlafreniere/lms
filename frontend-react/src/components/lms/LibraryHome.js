import React from "react";

import BookGrid from "../book/BookGrid";

export default class LibraryHome extends React.Component {
    render () {
        return (
            <div>
                <h2>Newest Arrivals</h2>
                <BookGrid />
            </div>
        )
    }
}