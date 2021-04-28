import React from 'react';
import NewMessage from './NewMessage';
import MessageBox from './MessageBox';
import logo from '../logo.png';


const UserPage = props => {
    let clickedConvos = false;
    let clickedUser = false;
    let content = [];
    switch (props.view) {
        case "userpage":
            if (props.messages.received.length===0) {
                content.push(<div className="emptyMessages" >You have no messages!</div>)
                break;
            }
            console.log(props.messages.received)
            for (let i = props.messages.received.length-1; i >=0; i--) {
                content.push(<MessageBox id={i} username={'From: ' + props.messages.received[i].senderUsername} message={props.messages.received[i]}/>)
            }
            break;
        case "sentmessages":
            //check if messages have arrived
            if (props.messages.sent.length===0) {
                content.push(<div className="emptyMessages" >You haven't sent any messages yet! Send a new message above!</div>)
                break;
            }
            // create a new message for every message received
            for (let i = props.messages.sent.length-1; i >=0; i--) {
                content.push(<MessageBox id={i} username={'To: ' + props.messages.sent[i].receiverUsername} message={props.messages.sent[i]}/>)
            }
            break;
        case "newmessage":
            content.push(<NewMessage key={900} info={props.info} key={999} id="newmsg" send={props.send}/>);
        default:
            break;
    }
    return (
        <div className="userPage">
            <div className="userPageContainer">
                <div className="userNavBar">
                    <div className="userPageLogo"> 
                        <img id="userPageLogo" src={logo} alt="Multicommunicado"/>
                    </div>
                    <div>
                        <button className="userNavBarButton" onClick={() => props.newView('newmessage')}>New Message</button>
                    </div>
                    <div>
                        <button className="userNavBarButton" onClick={() => props.newView('sentmessages')}>Sent Messages</button>
                    </div>
                    <div>
                        <button className="userNavBarButton" onClick={() => {
                            props.newView('userpage');
                            clickedConvos=true
                            }}>Conversations</button>
                    </div>
                    <div>
                        <button className="logoutButton" onClick={() => props.logout(null)}>Log Out</button>
                    </div>
                </div>
                <div id="voyage">
                    <p id="copyright">© MultiDangerNoodle LLC,<br></br>  a subsidiary of Voyáge, Inc.</p>
                </div>
            </div>
        {/* if (clickedConvos===true) { */}
            <div className="userPageContainer" id="convoBar">
                <div className="userNavBar">
                    <div>
                        <button className="userNavBarButton" onClick={() => {
                            clickedUser = true;
                        }}>Akiko2</button>
                    </div>
                </div>
            </div>
        {/* if (clickedUser===true) { */}
            <div className="content">
                {content}
            </div>
        </div>
    );
}

export default UserPage;