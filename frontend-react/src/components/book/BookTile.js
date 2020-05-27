import React from "react";

import {Link} from "react-router-dom";

export default function BookTile(props) {
    return (
        <Link to={`/books/${props.book.id}`}>
            <div className="book-tile" style={{'backgroundImage': `url(${process.env.REACT_APP_API_URL}/uploads/${props.book.cover_image_file_name})`}}>
                <div className='book-tile-title'>
                    {props.book.title}
                </div>
            </div>
        </Link>
    )
}