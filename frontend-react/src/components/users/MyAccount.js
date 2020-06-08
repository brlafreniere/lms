import React from 'react';
import Moment from "moment";

import LoginForm from "./LoginForm";
import AppContext from '../../AppContext';
import User from '../../modules/user';

class AccountInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        User.getMyAccountInfo(this.props.user.id).then(user => {
            this.setState({user})
        })
    }

    render() {
        return (
            <div>
                <h1 className="mt-5">Account Summary</h1>
                <h3 className="mt-5">Checkouts</h3>
                {this.state.user.checkouts && this.state.user.checkouts.length > 0 ? 
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Title</th>
                                <th>Due</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.user.checkouts && this.state.user.checkouts.map(checkout => (
                                <tr key={checkout.id}>
                                    <td>{checkout.book.title}</td>
                                    <td>{Moment(checkout.book.due_at).format('MMMM Do YYYY')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                : "No checkouts" }
                <h3 className="mt-5">Reservations</h3>
                {this.state.user.reservations && this.state.user.reservations.length > 0 ? 
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th>Ready for pick-up</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.user.reservations && this.state.user.reservations.map(reservation => (
                            <tr key={reservation.id}>
                                <td>{reservation.book.title}</td>
                                <td>{reservation.ready ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : "No reservations" }
            </div>
        );
    }
}


export default class MyAccount extends React.Component {
    render () {
        return (
            <AppContext.Consumer>
                {(context) => (
                    context.userLoginStatus ? <AccountInfo user={context.user} /> : <LoginForm />
                )}
            </AppContext.Consumer>
        );
    }
}