import React from 'react';
import logo from '../img/logo.svg';

//have signup and password input field 
//with "signup" button and signup link
//the two letter codes for the values of the selector are what are 
//referred to as ISO language codes, specifically the 639-1 which specify how the API
//knows what language the message sent is in, and what the recipient's language to translate to is
const Signup = props => (
    <div className="loginsignuppage">
        <img src={logo} alt="Multicommunicado" />
        <div className="loginSignup">
            <div className="loginSignupForm">
                <h1>Signup</h1>
                <input className="loginInput" id="userSignup" type="text" placeholder="username"></input><br />
                <input className="loginInput" id="passSignup" type="password" placeholder="password"></input><br />
                <select className="loginInput" id="userLanguage" name="language">
                    <option value="en"> English </option>
                    <option value="fr"> French </option>
                    <option value="ko"> Korean </option>
                    <option value="es"> Spanish </option>
                    <option value="ja"> Japanese </option>
                    <option value="ru"> Russian </option>
                    <option value="tr"> Turkish </option>
                    <option value="hi"> Hindi </option>
                    <option value="af"> Afrikaans </option>
                    <option value="zh"> Chinese </option>
                    <option value="ar"> Arabic </option>
                    <option value="cs"> Czech </option>
                    <option value="da"> Danish </option>
                    <option value="de"> German </option>
                    <option value="el"> Greek </option>
                    <option value="fa"> Persian </option>
                    <option value="fi"> Finnish </option>
                    <option value="hu"> Hungarian </option>
                    <option value="it"> Italian </option>
                </select>
                <button className="loginSignupButton" onClick={props.signup}>Sign Up</button>
            </div>
        </div>
    </div>
);


export default Signup;