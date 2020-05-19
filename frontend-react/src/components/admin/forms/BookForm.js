import React from "react";
import Axios from "axios";
import {
    Redirect
} from "react-router-dom";

export default class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formFields: {
                title: '',
                author_id: null,
                cover_image: null
            },
            authors: [],
        };
    }

    handleFieldChange = (event) => {
        const { name, value, type } = event.target;        

        let file = null;
        if (type == "file") {
            file = event.target.files[0]; // only handling 1 file but that's okay
        }

        this.setState(prevState => {
            let formFields = Object.assign({}, prevState.formFields)
            if (type == "file") {
                formFields[name] = file
            } else {
                formFields[name] = value
            }
            return {formFields}
        })
    }

    componentDidMount() {
        this.loadAuthors();
    }

    loadAuthors = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/authors`).then(response => {
            this.setState({authors: response.data})
        })
    }

    render() {
        if (this.state.redirect) {
            this.props.refreshBookList();
        }
        let authors = this.state.authors.map(author => {
            return <option key={author.id} value={author.id}>{author.last_name}, {author.first_name}</option>
        })
        return (
            <form onSubmit={(e) => {e.preventDefault(); this.props.handleSubmit(e, this.state.formFields, true)}}>
                {this.state.redirect ? <Redirect to="/admin/books" /> : null}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input name="title" value={this.state.title} onChange={this.handleFieldChange} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <select name="author_id" onChange={this.handleFieldChange} className="custom-select" size="5">
                        {authors}
                    </select>
                </div>
                <div className="custom-file form-group">
                    <input name="cover_image" type="file" onChange={this.handleFieldChange} className="custom-file-input" id="customFile" />
                    <label className="custom-file-label" htmlFor="customFile">Cover Image</label>
                </div>
                <button style={{marginTop: '1rem'}} type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}