import React from "react";
import Axios from "axios";
import {
    Link
} from "react-router-dom";
import {
    BrowserRouter as Router,
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
            redirect: false
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await Axios.post(
            `${process.env.REACT_APP_API_URL}/books`,
            {
                title: this.state.title
            }
        ).then(response => {
            this.setState({redirect: true})
        }).catch(error => {
            console.log(error)
        })
    }

    handleChange = (event) => {
        this.setState({title: event.target.value})
    }

    render() {
        if (this.state.redirect) {
            this.props.refreshBookList();
        }
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.redirect ? <Redirect to="/admin/books" /> : null}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input name="title" value={this.state.title} onChange={this.handleChange} type="text" className="form-control" />
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

    componentDidMount() {
        this.loadBooks()
    }

    render() {
        return (
            <div className="admin-body">
                <ul className="admin-menu nav nav-pills">
                    <li className="nav-item"><NavLink className="nav-link" to="/admin/books/new">New Book</NavLink></li>
                </ul>
                <Switch>
                    <Route exact path="/admin/books">
                        <div className='tab-body'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.books.map(b => 
                                    <tr key={b.id}>
                                        <td>{b.title}</td>
                                        <td>
                                            <nav className="nav">
                                                <Link className="nav-link" to="/admin/books/:id/edit">Edit</Link>
                                                <Link className="nav-link" to="/admin/books/:id/delete">Delete</Link>
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