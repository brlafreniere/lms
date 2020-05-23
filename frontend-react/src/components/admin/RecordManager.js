import React from "react";
import Axios from "axios";
import {
    Switch,
    Route,
    NavLink,
    useParams
} from "react-router-dom";

function WrapFormComponentWithID (props) {
    let {id} = useParams();
    const FormComponent = props.formComponent;
    return (
        <FormComponent plural={props.plural} redirectCallback={props.redirectCallback} id={id} />
    );
}


export default class RecordManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            records: []
        }
    }

    componentDidMount() {
        this.loadRecords();
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

    render() {
        // this allows us to pass props to children that are loaded via {this.props.children}
        // more on that here: https://medium.com/better-programming/passing-data-to-props-children-in-react-5399baea0356
        const TableComponent = this.props.table
        const FormComponent = this.props.form
        return (
            <div className="admin-body">
                {this.state.errorMessage ? <errorMessage msg={this.state.errorMessage} /> : null}
                <Switch>
                    {/* table route*/}
                    <Route exact path={`/admin/${this.props.plural}`}>
                        <div className="admin-menu">
                            <NavLink className="btn btn-primary" to={`/admin/${this.props.plural}/new`}>New {this.props.singular.charAt(0).toUpperCase() + this.props.singular.slice(1)}</NavLink>
                        </div>
                        <TableComponent records={this.state.records} deleteRecord={this.deleteRecord} />
                    </Route>

                    {/* new record */}
                    <Route exact path={`/admin/${this.props.plural}/new`}>
                        <FormComponent plural={this.props.plural} redirectCallback={this.loadRecords} />
                    </Route>

                    {/* edit record */}
                    <Route exact path={`/admin/${this.props.plural}/:id/edit`}>
                        <WrapFormComponentWithID formComponent={FormComponent} plural={this.props.plural} redirectCallback={this.loadRecords}/>
                    </Route>
                </Switch>
            </div>
        );
    }
}