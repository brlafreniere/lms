import React from "react";
import Axios from "axios";

import {Redirect} from "react-router-dom";

import LMS from "../../modules/lms";
import Book from "../../modules/book";
import Form from "../../modules/form";
import AuthorSelectField from "../../components/author/AuthorSelectField";

export default class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {
                title: '',
                author_id: 0,
                synopsis: '',
                cover_image: null
            },
            branches: [],
            redirect: false,
        };
        if (this.props.id) {
            this.loadBook()
        }
    }

    componentDidMount() {
        if (this.props.id) {
            this.loadBook()
        }
    }

    loadBook = () => {
        Book.fetch(this.props.id).then(book => {
            this.setState({book: book})
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let formData = Form.makeFormData(this.state.book)
        let config = Form.multipartConfig()

        if (this.state.book.id) {
            // put update
            Axios.put(LMS.api("/books/" + this.state.book.id), formData, config).then(response => {
                this.setState({redirect: true})
            }).catch(error => {
                console.log(error)
            })
        } else {
            // create
            Axios.post(LMS.api("/books"), formData, config).then(response => {
                this.setState({redirect: true})
            }).catch(error => {
                console.log(error)
            })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        {this.state.redirect ? <Redirect to={`/admin/${this.props.plural}`} /> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input name="title" value={this.state.book.title} onChange={Form.handleInputChange.bind(this)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <AuthorSelectField name="author_id" value={this.state.book.author_id} onChangeCallback={Form.handleInputChange.bind(this)} className="custom-select" size="5" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="synopsis">Synopsis</label>
                        <textarea name="synopsis" className="form-control" value={this.state.book.synopsis} onChange={Form.handleInputChange.bind(this)} rows="10">
                        </textarea>
                    </div>
                    {this.state.book.cover_image_file_name ? 
                        <img className='admin-current-book-cover' src={`${process.env.REACT_APP_API_URL}/uploads/${this.state.book.cover_image_file_name}`} alt={this.state.book.title + " cover image"}/>
                    : null}
                    <div className="custom-file form-group mt-3">
                        <input name="cover_image" type="file" onChange={Form.handleInputChange.bind(this)} className="custom-file-input" id="customFile" />
                        <label className="custom-file-label" htmlFor="customFile">Cover Image</label>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">{this.props.id ? "Update" : "Submit"}</button>
                </form>
            </div>
        )
    }
}