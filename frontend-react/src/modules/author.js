import React from "react";
import Axios from "axios"
import LMS from "./lms"

export class Author {
    static all = () => {
        return new Promise((resolve, reject) => {
            Axios.get(LMS.api("/authors")).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        });
    }

    static fetch = (id) => {

    }
}

export class AuthorSelectField extends React.Component {
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