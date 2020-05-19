import React from "react";

export default class BranchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            street_address: "",
            city: "",
            state: "",
            zip: ""
        }
    }

    handleFieldValueChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        //console.log(this.props.handleSubmit)
        return (
            <form onSubmit={(e) => {e.preventDefault(); this.props.handleSubmit(e, this.state)}}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input name="name" value={this.state.name} onChange={this.handleFieldValueChange} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="street_address">Street Address</label>
                    <input name="street_address" value={this.state.street_address} onChange={this.handleFieldValueChange} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input name="city" value={this.state.city} onChange={this.handleFieldValueChange} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input name="state" value={this.state.state} onChange={this.handleFieldValueChange} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="zip">Zip</label>
                    <input name="zip" value={this.state.zip} onChange={this.handleFieldValueChange} type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}