import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    withRouter,
    Router
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import LogIn from '../ui/LogIn';

const history = createHistory();

export const onAuthChange = isLoggedIn => {
    const pathName = history.location.pathname;

    const isAuthenticatedPage = authenticatedPages.includes(pathName);
    const isUnauthenticatedPage = unAuthenticatedPages.includes(pathName);

    if (isUnauthenticatedPage && isLoggedIn) {
        history.replace('/links');
    } else if (isAuthenticatedPage && !isLoggedIn) {
        history.replace('/');
    }
};

const authenticatedPages = ['/links'];
const unAuthenticatedPages = ['/', '/signup'];

export const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/links" component={Link} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);
