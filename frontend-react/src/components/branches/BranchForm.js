import React from "react";
import Branch from "../../modules/branch";

import {Redirect} from "react-router-dom";
import Form from "../../modules/form";

export default class BranchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            record: {
                name: "",
                street_address: "",
                city: "",
                state: "",
                zip: ""
            },
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        Branch.submitBranch(this.state.record).then(response => {
            this.setState({redirect: true})
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    {this.state.redirect ? <Redirect to={`/admin/${this.props.plural}`} /> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input name="name" value={this.state.record.name} onChange={Form.handleInputChange.bind(this)} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="street_address">Street Address</label>
                    <input name="street_address" value={this.state.record.street_address} onChange={Form.handleInputChange.bind(this)} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input name="city" value={this.state.record.city} onChange={Form.handleInputChange.bind(this)} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select className="form-control" id="state" name="state" value={this.state.record.state} onChange={Form.handleInputChange.bind(this)}>
                        <option value="">N/A</option>
                        <option value="AK">Alaska</option>
                        <option value="AL">Alabama</option>
                        <option value="AR">Arkansas</option>
                        <option value="AZ">Arizona</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DC">District of Columbia</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="IA">Iowa</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MD">Maryland</option>
                        <option value="ME">Maine</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MO">Missouri</option>
                        <option value="MS">Mississippi</option>
                        <option value="MT">Montana</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="NE">Nebraska</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NV">Nevada</option>
                        <option value="NY">New York</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VA">Virginia</option>
                        <option value="VT">Vermont</option>
                        <option value="WA">Washington</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WV">West Virginia</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="zip">Zip</label>
                    <input name="zip" value={this.state.record.zip} onChange={Form.handleInputChange.bind(this)} type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}