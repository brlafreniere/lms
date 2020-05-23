import React from "react";
import Axios from "axios";

import {Redirect} from "react-router-dom";

import FormBase from "../FormBase";

export default class BookForm extends FormBase {
    constructor(props) {
        super(props);
        this.state = {
            book: {},
            formFields: {
                title: '',
                author_id: null,
                cover_image: null
            },
            authors: [],
        };
        this.title = React.createRef();
        this.author_id = React.createRef();
        this.synopsis = React.createRef();
        if (this.props.id) {
            this.loadBook()
        }
    }

    componentDidMount() {
        this.loadAuthors();
        if (this.props.id) {
            this.loadBook()
        }
    }

    loadBook = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/books/${this.props.id}`).then(response => {
            this.author_id.current.value = response.data.author_id
            this.title.current.value = response.data.title
            this.synopsis.current.value = response.data.synopsis
            this.setState(prevState => {
                let formFields = Object.assign({}, prevState.formFields)
                formFields['title'] = response.data['title']
                formFields['author_id'] = response.data['author_id']
                formFields['synopsis'] = response.data['synopsis']
                return {
                    book: response.data,
                    formFields
                }
            })
        })
    }

    loadAuthors = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/authors`).then(response => {
            this.setState({authors: response.data})
        })
    }

    render() {
        this.setupRedirect()
        let authors = this.state.authors.map(author => {
            return <option key={author.id} value={author.id}>{author.last_name}, {author.first_name}</option>
        })
        return (
            <form onSubmit={(e) => {e.preventDefault(); this.handleSubmit(e, this.state.formFields, true, this.props.id)}}>
                <div>
                    {this.state.redirect ? <Redirect to={`/admin/${this.props.plural}`} /> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input name="title" ref={this.title} value={this.state.title} onChange={this.handleFieldChange} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <select name="author_id" ref={this.author_id} onChange={this.handleFieldChange} className="custom-select" size="5">
                        {authors}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="synopsis">Synopsis</label>
                    <textarea name="synopsis" className="form-control" ref={this.synopsis} onChange={this.handleFieldChange} rows="10">
                    </textarea>
                </div>
                <img className='admin-current-book-cover' src={`${process.env.REACT_APP_API_URL}/uploads/${this.state.book.cover_image_file_name}`} alt={this.state.book.title + " cover image"}/>
                <div className="custom-file form-group">
                    <input name="cover_image" type="file" onChange={this.handleFieldChange} className="custom-file-input" id="customFile" />
                    <label className="custom-file-label" htmlFor="customFile">Cover Image</label>
                </div>
                <button style={{marginTop: '1rem'}} type="submit" className="btn btn-primary">{this.props.id ? "Update" : "Submit"}</button>
            </form>
        )
    }
}