import React from 'react';

//have signup and password input field 
//with "signup" button and signup link

const Signup = props => (
    <div className="loginSignup">
        <div className="loginSignupForm">
            <form method="POST" action='/signup'>
                <h1>Signup</h1>
                <input name="username" type="text" placeholder="username"></input><br/>
                <input name="password" type="password" placeholder="password"></input><br/>
                <select className="Select" id="usersLanguage" name="usersLanguage" onChange="do something to handle change">
                    <option value="EN"> English </option>
                    <option value="SP"> Spanish </option>
                    <option value="FR"> French </option>
                </select>
                <input  type="submit" value="Create User"></input>
            </form>
        </div>
    </div>
);

export default Signup; 