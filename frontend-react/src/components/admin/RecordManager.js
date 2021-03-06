import React from "react";
import Axios from "axios";
import {
    Switch,
    Route,
    NavLink,
    useParams
} from "react-router-dom";

function FormComponentWithID (props) {
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
        Axios.get(process.env.REACT_APP_API_URL + '/' + this.props.plural).then(response => {
            this.setState({records: response.data})
        }).catch(console.log)
    }

    deleteRecord = (event, recordId) => {
        event.preventDefault();
        Axios.delete(process.env.REACT_APP_API_URL + '/' + this.props.plural + '/' + recordId).then(response => {
            this.loadRecords();
        }).catch(console.log)
    }

    render() {
        // this allows us to pass props to children that are loaded via {this.props.children}
        // more on that here: https://medium.com/better-programming/passing-data-to-props-children-in-react-5399baea0356
        const TableComponent = this.props.table
        const FormComponent = this.props.form
        const DetailComponent = this.props.detail
        let InventoryForm = this.props.inventory
        return (
            <div className="admin-body">
                {this.state.errorMessage ? <errorMessage msg={this.state.errorMessage} /> : null}
                <Switch>
                    {/* table route*/}
                    <Route exact path={`/admin/${this.props.plural}`}>
                        <div className="admin-menu">
                            <NavLink className="btn btn-primary" to={`/admin/${this.props.plural}/new`}>New {this.props.singular.charAt(0).toUpperCase() + this.props.singular.slice(1)}</NavLink>
                        </div>
                        <TableComponent plural={this.props.plural} records={this.state.records} deleteRecord={this.deleteRecord} refreshData={this.loadRecords} />
                    </Route>

                    {/* new record */}
                    <Route exact path={`/admin/${this.props.plural}/new`}>
                        <FormComponent plural={this.props.plural} redirectCallback={this.loadRecords} />
                    </Route>

                    {/* inventory */}
                    {InventoryForm ?
                        <Route exact path={`/admin/${this.props.plural}/:id/inventory`}>
                            <InventoryForm />
                        </Route>
                    : null }

                    {/* detail */}
                    {DetailComponent ?
                        <Route exact path={`/admin/${this.props.plural}/:id`}>
                            <DetailComponent />
                        </Route>
                    : null }

                    {/* edit record */}
                    <Route exact path={`/admin/${this.props.plural}/:id/edit`}>
                        <FormComponentWithID formComponent={FormComponent} plural={this.props.plural} redirectCallback={this.loadRecords}/>
                    </Route>
                </Switch>
            </div>
        );
    }
}