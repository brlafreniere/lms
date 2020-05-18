import React from "react";
import Axios from "axios";
import {
    Switch,
    Route,
    NavLink,
    Redirect
} from "react-router-dom";

class NewBookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            redirect: false,
            authors: [],
            author_id: null
        };
    }

    componentDidMount() {
        this.loadAuthors();
    }

    loadAuthors = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/authors`).then(response => {
            this.setState({authors: response.data})
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await Axios.post(
            `${process.env.REACT_APP_API_URL}/books`,
            {
                title: this.state.title,
                author_id: this.state.author_id
            }
        ).then(response => {
            this.setState({redirect: true})
        }).catch(error => {
            console.log(error)
        })
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    handleAuthorIdChange = (event) => {
        this.setState({author_id: event.target.value})
    }

    render() {
        if (this.state.redirect) {
            this.props.refreshBookList();
        }
        let authors = this.state.authors.map(author => {
            return <option key={author.id} value={author.id}>{author.last_name}, {author.first_name}</option>
        })
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.redirect ? <Redirect to="/admin/books" /> : null}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input name="title" value={this.state.title} onChange={this.handleTitleChange} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <select name="author_id" onChange={this.handleAuthorIdChange} className="custom-select" size="5">
                        {authors}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default class BooksAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }

    loadBooks = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/books`)
        .then(response => {
            this.setState({books: response.data})
        })
    }

    deleteBook = (event, bookId) => {
        event.preventDefault();
        Axios.delete(process.env.REACT_APP_API_URL + '/books/' + bookId).then(response => {
            this.loadBooks();
        })
    }

    componentDidMount() {
        this.loadBooks()
    }

    render() {
        return (
            <div className="admin-body">
                <Switch>
                    <Route exact path="/admin/books">
                        <div className="admin-menu">
                            <NavLink className="btn btn-primary" to="/admin/books/new">New Book</NavLink>
                        </div>
                        <div className='tab-body'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.books.map(b => 
                                    <tr key={b.id}>
                                        <td>{b.title}</td>
                                        <td>{b.author.last_name}, {b.author.first_name}</td>
                                        <td>
                                            <nav className="nav">
                                                <button className="btn btn-primary" onClick={(e) => {this.deleteBook(e, b.id)}}>Delete</button>
                                            </nav>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Route>
                    <Route exact path="/admin/books/new">
                        <NewBookForm refreshBookList={this.loadBooks}/>
                    </Route>
                </Switch>
            </div>
        );
    }
}