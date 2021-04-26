import React from 'react'

const MessageBox = props => {
    return (
        <div>
            <div className="senderName">{props.username}</div>
            <div className="messageBox">
                <div className="message">{props.message.input}</div>
            </div>
            <div className="pointer"></div>
        </div>
    );
}

export default MessageBox;