import React from 'react';
import NewMessage from './NewMessage';
import MessageBox from './MessageBox';

const UserPage = props => {
    let content = [];
    console.log('Entered view switch: ', props)
    switch (props.view) {
        case "userpage":
            if (!props.messages.received) {
                console.log("view: userpage")
                content.push(<div>Loading received messages...</div>)
                break;
            }
            for (let i = 0; i > props.messages.received; i++) {
                content.push(<MessageBox id={i} message={props.messages.received[i]}/>)
            }
            break;
        case "sentmessages":
            console.log("view: sent")
            //check if messages have arrived
            if (!props.messages.sent) {
                content.push(<div>Loading sent messages...</div>)
                break;
            }
            // create a new message for every message received
            for (let i = 0; i > props.messages.sent; i++) {
                content.push(<MessageBox id={i} message={props.messages.sent[i]}/>)
            }
            break;
        case "newmessage":
            console.log("view: new")
            content.push(<NewMessage />);
        default:
            break;
    }
    return (
        <div className="userPageContainer">
            <div className="userNavBar">
                <button onClick={() => props.logout(null)}>Logout</button>
                <button onClick={() => props.newView('newmessage')}>Send a new message</button>
                <button onClick={() => props.newView('sentmessages')}>View sent messages</button>
                <button onClick={() => props.newView('userpage')}>My messages</button>
            </div>
            <div>
                {content}
            </div>
        </div>
    );
}

export default UserPage;