import React from "react";
import Axios from "axios";
import {
    useParams,
    Link,
    Switch,
    Route
} from "react-router-dom";

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
            book: {}
        }
    }

    componentDidMount() {
        this.loadBook();
    }

    loadBook = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/books/${this.props.bookId}`).then(response => {
            this.setState({book: response.data})
        }).catch(console.log)
    }

    render() {
        return (
            <div className='book-detail'>
                <div className='book-detail-image'>
                    <div><img src={`${process.env.REACT_APP_API_URL}/uploads/${this.state.book.cover_image_file_name}`} width="200" alt={this.state.book.title + 'cover image'}/></div>
                </div>
                <div className='book-detail-title-and-synopsis'>
                    <h2>{this.state.book.title}</h2>
                    {this.state.book.synopsis}
                    <div className='book-detail-options'>
                        <Link to={`/books/${this.state.book.id}/checkout`} className="btn btn-primary">Check Out</Link>
                    </div>
                </div>
            </div>
        )
    }
}