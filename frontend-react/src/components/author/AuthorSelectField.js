import React from "react";

import Author from "../../modules/author";

export default class AuthorSelectField extends React.Component {
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