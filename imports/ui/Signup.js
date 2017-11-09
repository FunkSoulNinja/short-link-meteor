import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import onEnterPublicPage from './util/onEnterPublicPage';

class Signup extends React.Component {
    state = { error: '' };
    componentWillMount() {
        // if (!!Meteor.userId()) {
        //     this.props.history.push('/links');
        // }
        onEnterPublicPage(this.props.history);
    }
    onSubmit = e => {
        e.preventDefault();

        const email = this.refs.email.value.trim();
        const password = this.refs.password.value.trim();

        if (password.length < 9) {
            return this.setState({
                error: 'Password word must be more than 8 characters long'
            });
        }

        Accounts.createUser({ email, password }, err => {
            if (err) {
                this.setState({ error: err.reason });
            } else {
                this.setState({ error: '' });
            }
        });
    };
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join Short Lnk</h1>
                    {this.state.error ? <p>{this.state.error}</p> : null}
                    <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email" />
                        <input
                            ref="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                        <button className="button button--link">Create Account</button>
                    </form>

                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        );
    }
}

export default Signup;
