import React from "react";
import Axios from "axios";
import {
    Switch,
    Route,
    NavLink,
    Redirect
} from "react-router-dom";

class NewRecordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    handleSubmit = async (event, formData) => {
        event.preventDefault();

        await Axios.post(`${process.env.REACT_APP_API_URL}/${this.props.plural}`, formData)
        .then(response => {
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
            this.props.redirectCallback();
        }
        const Form = this.props.form
        return (
            <div>
                {this.state.redirect ? <Redirect to={`/admin/${this.props.plural}`} /> : null}
                <Form handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

function errorMessage(props) {
    return (
        <div class="alert alert-danger" role="alert">
            {props.msg}
        </div>
    )
}

export default class RecordAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            records: []
        }
    }

    loadRecords = () => {
        Axios.get(process.env.REACT_APP_API_URL + '/' + this.props.plural)
        .then(response => {
            this.setState({records: response.data})
        }).catch(error => {
            console.log(error)
        })
    }

    deleteRecord = (event, recordId) => {
        event.preventDefault();
        Axios.delete(process.env.REACT_APP_API_URL + '/' + this.props.plural + '/' + recordId).then(response => {
            this.loadRecords();
        })
    }

    componentDidMount() {
        this.loadRecords()
    }

    render() {
        // this allows us to pass props to children that are loaded via {this.props.children}
        // more on that here: https://medium.com/better-programming/passing-data-to-props-children-in-react-5399baea0356
        const TableComponent = this.props.table

        const table = React.Children.map(this.props.table, child => {
            return React.cloneElement(child, {
                records: this.state.records
            })
        })

        return (
            <div className="admin-body">
                {this.state.errorMessage ? <errorMessage msg={this.state.errorMessage} /> : null}
                <Switch>
                    <Route exact path={`/admin/${this.props.plural}`}>
                        <div className="admin-menu">
                            <NavLink className="btn btn-primary" to={`/admin/${this.props.plural}/new`}>New {this.props.singular.charAt(0).toUpperCase() + this.props.singular.slice(1)}</NavLink>
                        </div>
                        <TableComponent records={this.state.records} deleteRecord={this.deleteRecord} />
                    </Route>
                    <Route exact path={`/admin/${this.props.plural}/new`}>
                        <NewRecordForm plural={this.props.plural} form={this.props.form} redirectCallback={this.loadRecords}/>
                    </Route>
                </Switch>
            </div>
        );
    }
}