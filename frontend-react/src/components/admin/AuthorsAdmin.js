import React from "react";
import Axios from "axios";
import {
    Switch,
    Route,
    NavLink,
    Redirect
} from "react-router-dom";

class NewAuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            redirect: false
        }
    }

    handleFirstNameChange = (event) => {
        this.setState({first_name: event.target.value})
    }

    handleLastNameChange = (event) => {
        this.setState({last_name: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        Axios.post(
            process.env.REACT_APP_API_URL + '/authors',
            {
                first_name: this.state.first_name,
                last_name: this.state.last_name
            }
        ).then(response => {
            this.props.refreshAuthorsList();
            this.setState({redirect: true})
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.redirect ? <Redirect to="/admin/authors" /> : null}
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input name="first_name" value={this.state.first_name} onChange={this.handleFirstNameChange} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input name="last_name" value={this.state.last_name} onChange={this.handleLastNameChange} type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>        
        )
    }
}

export default class AuthorsAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authors: []
        }
    }

    loadAuthors = () => {
        Axios.get(process.env.REACT_APP_API_URL + "/authors").then(response => {
            this.setState({authors: response.data})
        })
    }

    deleteAuthor = (event, authorId) => {
        Axios.delete(process.env.REACT_APP_API_URL + "/authors/" + authorId).then(response => {
            this.loadAuthors();
        })
    }

    componentDidMount() {
        this.loadAuthors();
    }

    render() {
        return (
            <div className="admin-body">
                <Switch>
                    <Route exact path="/admin/authors">
                        <div className="admin-menu">
                            <NavLink className="btn btn-primary" to="/admin/authors/new">New Author</NavLink>
                        </div>
                        <div className='tab-body'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.authors.map(a => 
                                    <tr key={a.id}>
                                        <td>{a.last_name}</td>
                                        <td>{a.first_name}</td>
                                        <td>
                                            <nav className="nav">
                                                <button className="btn btn-primary" onClick={(e) => {this.deleteAuthor(e, a.id)}}>Delete</button>
                                            </nav>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Route>
                    <Route>
                        <NewAuthorForm refreshAuthorsList={this.loadAuthors} />
                    </Route>
                </Switch>
            </div>
        );
    }
}