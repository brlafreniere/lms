import React from "react";
import Axios from "axios";

import {
    useParams, 
    Redirect,
    Link
} from "react-router-dom";

import LMS from "./lms";
import Form from "./form"
import { Author } from "./author";

export class Book {
    static fetch = (id) => {
        return new Promise((resolve, reject) => {
            Axios.get(LMS.api("/books/" + id)).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        });
    }

    static fetchInventories = (id) => {
        return new Promise((resolve, reject) => {
            Axios.get(LMS.api("/book_inventories/" + id)).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error);
            })
        })
    }
}

export function BookDetailAdmin(props) {
    let {id} = useParams();
    return (
        <BookDetailAdminComponent id={id} />
    )
}

export class BookDetailAdminComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: {},
            book_inventories: []
        }
    }

    componentDidMount() {
        Book.fetch(this.props.id).then(book => {
            this.setState({book: book})
        });
        Book.fetchInventories(this.props.id).then(book_inventories => {
            this.setState({book_inventories: book_inventories})
        })
    }

    render () {
        return (
            <div>
                <h2>{this.state.book.title}</h2>
                <div>
                    {this.state.book.synopsis}
                </div>
                <div className="mt-5">
                    <h3>Inventory</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Branch</th>
                                <th>Copies</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.book_inventories.map(bi => (
                                <tr key={bi.id}>
                                    <td>{bi.branch.name}</td>
                                    <td>{bi.copies}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export function BookInventoryFormWithID(props) {
    let {id} = useParams();
    return (
        <BookInventoryForm book_id={id} />
    )
}

export class BookInventory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book_id: props.book_id,
            branch_id: props.branch_id,
            copies: props.copies
        }
        this.save_button = React.createRef()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.save_button.current.classList.remove("btn-secondary")
        this.save_button.current.classList.add("btn-primary")
    }

    handleSave = (event) => {
        this.save_button.current.classList.remove("btn-primary")
        this.save_button.current.classList.add("btn-secondary")
    }

    render() {
        return (
            <tr>
                <td><label htmlFor="copies">{this.props.branch.name}</label></td>
                <td style={{display: "inline-flex"}}>
                    <input type="text" name="copies" className="form-control mr-1" value={this.state.copies} onChange={this.handleChange} />
                    <button className="btn btn-secondary" ref={this.save_button} onClick={this.handleSave} >Save</button>
                </td>
            </tr>
        )
    }
}

export class BookInventoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book_inventories: []
        }
    }

    componentDidMount() {
        Book.fetchInventories(this.props.book_id).then(book_inventories => {
            this.setState({book_inventories: book_inventories})
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <button className="btn btn-primary mb-3">Add Inventory to Branch</button>
                    <table className="table table-bordered table-hover">
                        <colgroup>
                            <col span="1" style={{width: '75%'}} />
                            <col span="1" style={{width: '25%'}} />
                        </colgroup>
                        <thead className="thead-dark">
                            <tr>
                                <th>Branch</th>
                                <th>Copies</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.book_inventories.map(book_inventory => (
                                <BookInventory key={book_inventory.id} {...book_inventory} />
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

class AuthorSelectField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authors: []
        }
    }

    componentDidMount = () => {
        this.loadAuthors();
    }

    loadAuthors = () => {
        Author.all().then(authors => {
            this.setState({ authors: authors })
        })
    }

    render() {
        return (
            <select name={this.props.name} className={this.props.className} value={this.props.value} onChange={this.props.onChangeCallback}>
                <option></option>
                {this.state.authors.map(author => (
                    <option key={author.id} value={author.id}>{author.last_name}, {author.first_name}</option>
                ))}
            </select>
        )
    }
}

export class BookForm extends React.Component {
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

export class BookTable extends React.Component {
    componentDidMount() {
        this.props.refreshData();
    }

    render() {
        return (
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
                        {this.props.records.map(record => 
                        <tr key={record.id}>
                            <td><Link to={`/admin/books/${record.id}`}>{record.title}</Link></td>
                            <td>{`${record.author.last_name}, ${record.author.first_name}`}</td>
                            <td>
                                <nav className="nav">
                                    <Link to={`/admin/books/${record.id}/inventory`} className="btn btn-primary mr-1">Inventory</Link>
                                    <Link to={`/admin/books/${record.id}/edit`} className="btn btn-primary mr-1" >Edit</Link>
                                    <button className="btn btn-danger" onClick={(e) => {this.props.deleteRecord(e, record.id)}}>Delete</button>
                                </nav>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

function BookTile(props) {
    return (
        <Link to={`/book/${props.book.id}`}>
            <div className="book-tile" style={{'background-image': `url(${process.env.REACT_APP_API_URL}/uploads/${props.book.cover_image_file_name})`}}>
                <div class='book-tile-title'>
                    {props.book.title}
                </div>
            </div>
        </Link>
    )
}

export class BookList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }

    componentDidMount = () => {
        this.queryBooks();
    }

    queryBooks = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/books`).then(response => {
            this.setState({books: response.data})
        })
    }

    render() {
        return (
            <div className='book-group'>
                {this.state.books.map(book => 
                    <BookTile key={book.id} book={book} />
                )}
            </div>
        )
    }
}
