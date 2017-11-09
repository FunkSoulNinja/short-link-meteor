import React, { Component } from 'react';

import onEnterPrivatePage from './util/onEnterPrivatePage';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilter from './LinksListFilter';

class Link extends Component {
    componentWillMount() {
        // if (!Meteor.userId()) {
        //     this.props.history.push('/');
        // }
        onEnterPrivatePage(this.props.history);
    }
    render() {
        return (
            <div>
                <PrivateHeader title="Your Links" />
                <div className="page-content">
                    <LinksListFilter />
                    <AddLink />
                    <LinksList />
                </div>
            </div>
        );
    }
}
export default Link;
