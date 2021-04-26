import React from 'react'


// request body going out should be formatted this way for code to work
// post request to '/send'
/* {
    id: the Id of the user sending the message
    senderUsername: the message sender's username,
    targetUsername: the message recipient's username,
    language: the language code assigned from the initial sender
    message: the actual text to translate
}
*/

const NewMessage = props => {
    let info = [];
    if (props.info === 'noRecipient') info.push(<div className="info">You're not specifying a sender!</div>)
    if (props.info === 'noMessage') info.push(<div className="info">You aren't sending any message, type something in!</div>)
    if (props.info === 'userUnknown') info.push(<div className="info">That user doesn't exist!</div>)
    return (
        <div>
            <div className="newMessage">
                <h1>Send New Message</h1>
                <input className="inputForm" id="receiverUsername" type="text" placeholder="Recipient Username"/><br/>
                <textarea rows= '3' columns = '10' className="messageInput" id="newMessage" type="text" placeholder="Message"/><br/>
                {info}
                <button className="sendButton" onClick={props.send}>Send</button>
            </div>
        </div>
    );
}

export default NewMessage;