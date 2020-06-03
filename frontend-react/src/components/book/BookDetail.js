import React from "react";
import Axios from "axios";
import {
    useParams,
} from "react-router-dom";

import Book from "../../modules/book";
import OverlayMenu from "../OverlayMenu"

import "./BookDetail.css"

export default function BookDetail(props) {
    let { id } = useParams();
    return (
        <BookDetailComponent bookId={id} />
    )
}

class BookDetailComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: {},
            showCheckoutMenu: false
        }
    }

    componentDidMount() {
        this.loadBook();
    }

    loadBook = () => {
        Book.fetch(this.props.bookId).then(book => {
            this.setState({book})
        }).catch(console.log)
    }

    showCheckoutMenu = () => {
        this.setState({showCheckoutMenu: true})
    }

    CheckoutMenu = (props) => {
        if (this.state.showCheckoutMenu) {
            return (
                <OverlayMenu closeOverlay={e => this.setState({showCheckoutMenu: false})}>
                    Ooga McBooga
                </OverlayMenu>
            )
        } else {
            return null;
        }
    }

    CoverImage = () => {
        return (
            <div className='book-detail-image'>
                <div>
                    <img src={`${process.env.REACT_APP_API_URL}/uploads/${this.state.book.cover_image_file_name}`}
                        width="200"
                        alt={this.state.book.title + 'cover image'}/>
                </div>
            </div>
        )
    }

    TitleAndSynopsis = () => {
        return (
            <div className='book-detail-title-and-synopsis'>
                <h2>{this.state.book.title}</h2>
                {this.state.book.synopsis}
            </div>
        )
    }

    render() {
        return (
            <div className='book-detail'>
                <this.CoverImage />
                <this.TitleAndSynopsis />
                <div className='book-detail-options mt-3'>
                    <button className="btn btn-primary" onClick={this.showCheckoutMenu}>Check Out</button>
                </div>
                <this.CheckoutMenu />
            </div>
        )
    }
}