import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

class AddLink extends Component {
    state = {
        url: '',
        isOpen: false,
        error: ''
    };
    onSubmit = e => {
        e.preventDefault();
        const url = this.state.url.trim();

        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.closeModal();
            } else {
                this.setState({ error: err.reason });
            }
        });
    };
    onChange = e => {
        this.setState({ url: e.target.value });
    };
    closeModal = () => {
        this.setState({
            url: '',
            error: '',
            isOpen: false
        });
    };
    render() {
        return (
            <div>
                <button className="button" onClick={e => this.setState({ isOpen: true })}>
                    + Add link
                </button>
                <Modal
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                    isOpen={this.state.isOpen}
                    contentLabel="Add Link"
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.closeModal}
                >
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : null}
                    <form onSubmit={this.onSubmit} className="boxed-view__form">
                        <input
                            type="text"
                            ref="url"
                            placeholder="URL"
                            value={this.state.url}
                            onChange={this.onChange}
                        />
                        <button className="button">Add Link</button>
                        <button
                            type="button"
                            className="button button--secondary"
                            onClick={() =>
                                this.setState({
                                    isOpen: false,
                                    url: '',
                                    error: ''
                                })}
                        >
                            Cancel
                        </button>
                    </form>
                </Modal>
            </div>
        );
    }
}
export default AddLink;
