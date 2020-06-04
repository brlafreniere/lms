import React from "react";

import Branch from "../../modules/branch";

export class BranchSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            branches: []
        }
    }

    componentDidMount() {
        Branch.all().then(branches => {
            this.setState({branches})
        }).catch(console.log)
    }

    BranchOptions = () => {
        let branchOptions = [];
        for (let branch of this.state.branches) {
            branchOptions.push(<option value={branch.id} key={branch.id}>{branch.name}</option>)
        }
        return branchOptions;
    }

    render() {
        return (
            <div className="branch-selector-container">
                <select className="form-control" name={this.props.name} onChange={this.props.onChange}>
                    <this.BranchOptions />
                </select>
            </div>
        )
    }
}