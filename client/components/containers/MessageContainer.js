import React, { Component } from 'react';
import * as actions from '../../state/actions/actions.js';
import { connect } from 'react-redux';
import UserPage from '../UserPage';

const mapStateToProps = store => ({
    user: store.message.user,
    loggedIn: store.message.login_state,
    messages: store.message.messages,
    view: store.message.view
})

const dispatchStateToProps = dispatch => ({
    nowLoggedIn: (info) => dispatch(actions.loggedinState(info)),
    newView: (view) => dispatch(actions.view(view))
})

class MessageContainer extends Component {
    constructor(props) {
        super(props)
        // this.userSignedUp = this.userSignedUp.bind(this);
    }

    render() {
        return (<UserPage view={this.props.view} newView={this.props.newView} messages={this.props.messages} user={this.props.user} logout={this.props.nowLoggedIn}/>)
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(MessageContainer);