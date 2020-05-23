import React from "react";

import Books from "../Books";

export default class LibraryHome extends React.Component {
    render () {
        return (
            <div>
                <h2>Newest Arrivals</h2>
                <Books />
            </div>
        )
    }
}