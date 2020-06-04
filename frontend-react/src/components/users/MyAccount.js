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
                <h1 className="text-white bg-info p-3 rounded mt-5">Account for: {this.state.user.email}</h1>
                <h2 className="mt-5">Checkouts</h2>
                <table className="table">
                    <thead>
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
                <h2 className="mt-5">Reservations</h2>
                <table className="table">
                    <thead>
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