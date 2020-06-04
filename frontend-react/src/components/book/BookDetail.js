import React from "react";
import {
    useParams,
} from "react-router-dom";

import Book from "../../modules/book";
import OverlayMenu from "../OverlayMenu"
import { BranchSelector } from "../branches/Branch";

import "./BookDetail.css"

class ReservationForm extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        Book.createReservation({
            book_id: this.props.book.id,
            branch_id: event.target.branch_id.value
        }).then(response => {
            console.log(response)
        }).catch(error => {
            if (error.response.data.book && error.response.data.book[0] == "has already been taken") {
                this.props.reservationFailure("You have already placed a reservation for this book.")
            }
        })
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
            reservable: null,
            reservationFailureMessage: ""
        }
    }

    componentDidMount() {
        this.loadBook();
    }

    loadBook = () => {
        Book.fetch(this.props.bookId).then(book => {
            this.setState({book})
            this.checkReservationStatus()
        }).catch(console.log)
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
                    <ReservationForm book={this.state.book} closeOverlay={this.closeOverlay} reservationFailure={(message) => this.setState({reservable: false, reservationFailureMessage: message})} />
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

    checkReservationStatus = () => {
        Book.reservationStatus({
            book_id: this.state.book.id
        }).then(response => {
            if (response.data.reservable) {
                this.setState({reservable: true})
            } else {
                this.setState({reservable: false})
            }
        }).catch(error => {
            this.setState({reservable: false})
        })
    }

    ReserveButton = () => {
        const reserveButton = <button className="btn btn-primary mb-3" onClick={this.showReservationMenu}>Reserve</button>
        const unavailableMessage = <div className="alert alert-danger mb-3">This book is unavailable for reservation. {this.state.reservationFailureMessage}</div>
        if (this.state.reservable) {
            return reserveButton;
        } else {
            return unavailableMessage;
        }
    }

    TitleAndSynopsis = () => {
        return (
            <div className='book-detail-title-and-synopsis p-3'>
                <h2>{this.state.book.title}</h2>
                <this.ReserveButton />
                <div>{this.state.book.synopsis}</div>
            </div>
        )
    }

    render() {
        return (
            <div className='book-detail-container d-flex'>
                <this.CoverImage />
                <this.TitleAndSynopsis />
                <this.ReservationMenu />
            </div>
        )
    }
}