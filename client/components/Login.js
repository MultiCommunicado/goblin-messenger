import React from 'react';

//have login and password input field 
//with "login" button and signup link

const Login = props => {
    let info = [];
    if (props.info == 'wrongPassword') info.push(<div className="info">Wrong password!</div>)
    if (props.info == 'unknownUser') info.push(<div className="info">Unknown user!</div>)
    return (
        <div className="loginSignup">
            <div className="loginSignupForm">
                <h1>Login</h1>
                <input className="inputForm" id="userLogin" type="text" placeholder="username"/><br/>
                <input className="inputForm" id="passLogin" type="password" placeholder="password"/><br/>
                {info}
                <button className="inputForm" onClick={props.submitLogin}>Login</button>
                <button onClick={() => props.onSignUpClick(true)}>Sign up</button>
            </div>
        </div>
    );
}

export default Login; 