import React from "react";
import {
    useParams,
} from "react-router-dom";

import Book from "../../modules/book";
import OverlayMenu from "../OverlayMenu"
import { BranchSelector } from "../branches/Branch";
import LMS from "../../modules/lms";

import "./BookDetail.css"

class ReservationForm extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        Book.createReservation({
            book_id: this.props.book.id,
            branch_id: event.target.branch_id.value
        }).then(response => {
            this.props.reservationSuccessful()
        }).catch(console.log)
        this.props.closeOverlay()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h4>Select pickup location:</h4>
                <div className="form-group">
                    <BranchSelector name="branch_id" />
                </div>
                <input type="submit" className="form-control btn btn-primary" />
            </form>
        )
    }
}

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
            showReservationMenu: false,
            reservationSuccessful: false,
        }
    }

    render() {
        return (
            <div className='book-detail-container'>
                <div className='book-detail-status-message'>
                    <this.StatusMessage />
                </div>
                <div className="d-flex">
                    <this.CoverImage />
                    <this.TitleAndSynopsis />
                </div>
                <this.ReservationMenu />
            </div>
        )
    }

    componentDidMount() {
        Book.fetch(this.props.bookId)
            .then(book => {this.setState({book})})
            .catch(console.log)
    }

    StatusMessage = () => {
        let output = null;
        if (this.state.book["already_checked_out?"]) {
            output = <div className="alert alert-primary">You currently have this book checked out!</div>
        }
        if (this.state.book["already_reserved?"]) {
            output = <div className="alert alert-primary">You currently have this book reserved!</div>
        }
        if (this.state.reservationSuccessful) {
            output = <div className="alert alert-success">Reservation created!</div>
        }
        return output;
    }

    reservationSuccessful = () => {
        console.log('here')
        this.setState({reservationSuccessful: true})
    }

    showReservationMenu = () => {
        this.setState({showReservationMenu: true})
    }

    closeOverlay = () => {
        this.setState({showReservationMenu: false})
    }

    ReservationMenu = (props) => {
        if (this.state.showReservationMenu) {
            return (
                <OverlayMenu closeOverlay={this.closeOverlay}>
                    <ReservationForm
                        book={this.state.book}
                        closeOverlay={this.closeOverlay}
                        reservationSuccessful={this.reservationSuccessful}
                    />
                </OverlayMenu>
            )
        } else {
            return null;
        }
    }

    CoverImage = () => {
        if (this.state.book.cover_image_file_name) {
            return (
                <div className='book-detail-image'>
                    <div>
                        <img src={`${process.env.REACT_APP_API_URL}/uploads/${this.state.book.cover_image_file_name}`}
                            width="200"
                            alt={this.state.book.title + 'cover image'}/>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }

    NumberOfCopiesAvailableForCheckout = () => {
        return (<div>Copies available: {this.state.book.number_copies_available}</div>)
    }

    checked_out_or_already_reserved = () => {
        return (this.state.book['already_reserved?'] || this.state.book['already_checked_out?'])
    }

    ReserveButton = () => {
        if (!this.checked_out_or_already_reserved() && !this.state.reservationSuccessful) {
            return (<button className="btn btn-primary mb-3" onClick={this.showReservationMenu}>Reserve</button>)
        } else {
            return null;
        }
    }

    TitleAndSynopsis = () => {
        return (
            <div className='book-detail-title-and-synopsis'>
                <h2>{this.state.book.title}</h2>
                <div>{LMS.output_html_string(this.state.book.synopsis_formatted)}</div>
                <this.ReserveButton />
            </div>
        )
    }
}