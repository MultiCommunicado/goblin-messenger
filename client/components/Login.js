import React from 'react'

//have login and password input field 
//with "login" button and signup link

const Login = props => (
    <div className="loginSignup">
        <div className="loginSignupForm">
            <form method="POST" action='/login'>
                <h1>Login</h1>
                <input name="username" type="text" placeholder="username"/><br/>
                <input name="password" type="password" placeholder="password"/><br/>
                <input  type="submit" value="Login"></input>
                <button onClick={() => props.onSignUpClick(true)}>Sign up</button>
            </form>
        </div>
    </div>
);

export default Login; 