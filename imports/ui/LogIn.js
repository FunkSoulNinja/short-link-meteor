import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import onEnterPublicPage from './util/onEnterPublicPage';

class LogIn extends Component {
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

        Meteor.loginWithPassword(email, password, err => {
            if (err) {
                this.setState({
                    error: 'Unabled to log in. Check email and password'
                });
            } else {
                this.setState({ error: '' });
            }
        });
    };
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Log in to Short Lnk</h1>
                    {this.state.error ? <p>{this.state.error}</p> : null}
                    <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email" />
                        <input
                            ref="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                        <button className="button button--link">Log in</button>
                    </form>
                    <Link to="/signup">Need an account?</Link>
                </div>
            </div>
        );
    }
}
export default LogIn;
