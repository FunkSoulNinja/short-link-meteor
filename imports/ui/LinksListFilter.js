import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class extends React.Component {
    state = { showVisibleLinks: true };
    componentDidMount() {
        this.tracker = Tracker.autorun(() => {
            this.setState({
                showVisibleLinks: Session.get('showVisibleLinks')
            });
        });
    }
    componentWillUnmount() {
        this.tracker.stop();
    }
    render() {
        return (
            <div>
                <label className="checkbox">
                    <input
                        className="checkbox__box"
                        type="checkbox"
                        checked={!this.state.showVisibleLinks}
                        onChange={e => Session.set('showVisibleLinks', !e.target.checked)}
                    />
                    show hidden links
                </label>
            </div>
        );
    }
}
