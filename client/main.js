import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';

import { Routes, onAuthChange } from '../imports/routes';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
    const isLoggedIn = !!Meteor.userId();
    onAuthChange(isLoggedIn);
});

Meteor.startup(() => {
    Session.set('showVisibleLinks', true);
    ReactDOM.render(<Routes />, document.getElementById('app'));
});
