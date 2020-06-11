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
            record: {
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
        Book.fetch(this.props.id).then(record => {
            this.setState({record})
        }).catch(console.log)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let func = this.state.record.id ? Axios.put : Axios.post
        let path = this.state.record.id ? "/books/" + this.state.record.id : "/books"
        let payload = Object.assign(this.state.record, {
            author_first_name: event.target.author_first_name.value,
            author_middle_name: event.target.author_middle_name.value,
            author_last_name: event.target.author_last_name.value
        })
        let args = {path, payload: payload, func, multipart: true}
        LMS.api_call_v3(args)
        .then(response => { this.setState({redirect: true}) })
        .catch(console.log)
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
                        <input name="title" value={this.state.record.title} onChange={Form.handleInputChange.bind(this)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <AuthorSelectField name="author_id" value={this.state.record.author_id} className="custom-select" size="5" />
                    </div>
                    <div>
                        <label>Create Author</label>
                    </div>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">First, Middle, Last</span>
                        </div>
                        <input type="text" name="author_first_name" aria-label="First name" className="form-control" />
                        <input type="text" name="author_middle_name" aria-label="Middle name" className="form-control" />
                        <input type="text" name="author_last_name" aria-label="Last name" className="form-control" />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="synopsis">Synopsis</label>
                        <textarea name="synopsis" className="form-control" value={this.state.record.synopsis} onChange={Form.handleInputChange.bind(this)} rows="10">
                        </textarea>
                    </div>
                    {this.state.record.cover_image_file_name ? 
                        <img className='admin-current-book-cover' src={`${process.env.REACT_APP_API_URL}/uploads/${this.state.record.cover_image_file_name}`} alt={this.state.record.title + " cover image"}/>
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