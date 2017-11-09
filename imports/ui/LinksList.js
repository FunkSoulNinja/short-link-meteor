import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import propTypes from 'prop-types';
import moment from 'moment';
import Clipboard from 'clipboard';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links';

class LinksListItem extends React.Component {
    state = { justCopied: false };
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard
            .on('success', () => {
                this.setState({ justCopied: true });
                setTimeout(() => this.setState({ justCopied: false }), 1000);
            })
            .on('error', () => console.log('did not work'));
    }
    componentWillUnmount() {
        this.clipboard.destroy();
    }
    renderStats() {
        const visitedMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let lastVisitedMessage = null;

        if (typeof this.props.lastVisitedAt === 'number') {
            lastVisitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
        }

        return (
            <p className="item__message">
                {this.props.visitedCount} {visitedMessage} {lastVisitedMessage}
            </p>
        );
    }
    render() {
        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <a
                    href={this.props.shortUrl}
                    target="_blank"
                    className="button button--pill button--link"
                >
                    Visit
                </a>
                <button
                    className="button button--pill"
                    ref="copy"
                    data-clipboard-text={this.props.shortUrl}
                >
                    {this.state.justCopied ? 'Copied' : 'Copy'}
                </button>
                <button
                    className="button button--pill"
                    onClick={() =>
                        Meteor.call('links.setVisibility', this.props._id, !this.props.visible)}
                >
                    {this.props.visible ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

LinksListItem.propTypes = {
    _id: propTypes.string.isRequired,
    url: propTypes.string.isRequired,
    userId: propTypes.string.isRequired,
    shortUrl: propTypes.string.isRequired,
    visible: propTypes.bool.isRequired,
    visitedCount: propTypes.number.isRequired,
    lastVisitedAt: propTypes.number
};

export default class LinksList extends React.Component {
    state = { links: [] };
    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const links = Links.find({
                visible: Session.get('showVisibleLinks')
            }).fetch();
            this.setState({ links });
        });
    }
    componentWillUnmount() {
        this.linksTracker.stop();
    }
    renderLinksListItems() {
        if (this.state.links.length === 0) {
            return (
                <div className="item">
                    <p className="item__status-message">No Links Found</p>
                </div>
            );
        }
        return this.state.links.map(link => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} {...link} shortUrl={shortUrl} />;
        });
    }
    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight>{this.renderLinksListItems()}</FlipMove>
            </div>
        );
    }
}
