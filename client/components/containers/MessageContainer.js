import React, { Component } from 'react';
import * as actions from '../../state/actions/actions.js';
import { connect } from 'react-redux';
import UserPage from '../UserPage';

const mapStateToProps = store => ({
    user: store.message.user,
    loggedIn: store.message.login_state,
    messages: store.message.messages,
    view: store.message.view,
    user_info: store.message.user_info
})

const dispatchStateToProps = dispatch => ({
    nowLoggedIn: (info) => dispatch(actions.loggedinState(info)),
    newView: (view) => dispatch(actions.view(view)),
    userInfo: (info) => dispatch(actions.userInfo(info)),
    updateMessages: (messages) => dispatch(actions.updateMessages(messages))
})

class MessageContainer extends Component {
    constructor(props) {
        super(props)
        this.sendMessage = this.sendMessage.bind(this);
        this.sentMessagesButton = this.sentMessagesButton.bind(this);
        this.myMessagesButton = this.myMessagesButton.bind(this);
    }

    sentMessagesButton() {
        //fetch new messages
        fetch('/messages:username')
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.props.updateMessages(data);
            this.props.newView('sentmessages');
        })
    }

    myMessagesButton() {
        //fetch new messages
        fetch('/messages')
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.props.updateMessages(data);
            this.props.newView('userpage');
        })
    }

    sendMessage() {
        const recipient = document.getElementById("receiverUsername");
        const newmessage = document.getElementById("newMessage");
        const message = {};
        message.id = this.props.user._id;
        message.targetUsername = recipient.value;
        message.senderUsername = this.props.user.username;
        message.language = this.props.user.language;
        message.message = newmessage.value;
        
        /* {
        id: the Id of the user sending the message
        senderUsername: the message sender's username,
        targetUsername: the message recipient's username,
        language: the language code assigned from the initial sender
        message: the actual text to translate
        }*/
        fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(message)
            })
        .then(resp => resp.json())
        .then(data => {
            if (data.noRecipient) {this.props.userInfo('noRecipient')}
            else if (data.noMessage) {this.props.userInfo('noMessage')}
            else if (data.userNotFound) {this.props.userInfo('userUnknown')}
            else {
                console.log('new messages', data)
                recipient.value = '';
                newmessage.value = '';
                this.props.updateMessages(data.messages)
                // alert('Message sent!');
            }
        })
        .catch(err => console.log('Error sending new message! ERROR: ', err));
    }

    render() {
        return (<UserPage info={this.props.user_info}
                            send={this.sendMessage}
                            view={this.props.view}
                            newView={this.props.newView}
                            messages={this.props.messages}
                            user={this.props.user}
                            logout={this.props.nowLoggedIn}
                            sentMessagesClick={this.sentMessagesButton}
                            myMessagesClick={this.myMessagesButton}
                            />)
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(MessageContainer);