import React from 'react'

//have login and password input field 
//with "login" button and signup link

const Login = props => (
    <div className="Login">
        <form method="POST" action='/login'>
            <input name="username" type="text" placeholder="username"></input>
            <input name="password" type="password" placeholder="password"></input>
            <input  type="submit" value="login"></input>
        </form>
        <button onClick={props.onSignUpClick}>Sign up</button>
    </div>
);

export default Login; 