import React, { Component } from 'react';
import Signup from '../Signup';
import Login from '../Login';
import MessageContainer from './MessageContainer';
import * as actions from '../../state/actions/actions.js';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
    //consider renaming some of these pieces of state or the functions to be clear
    user: store.message.user,
    loggedIn: store.message.login_state,
    signingUp: store.message.signup_state 
})

const dispatchStateToProps = dispatch => ({
    nowLoggedIn: (info) => dispatch(actions.loggedinState(info)),
    login: (user) => dispatch(actions.login(user)),
    nowSigningUp: (bool) => dispatch(actions.signupState(bool)),
    signup: (newuser) => dispatch(actions.signup(newuser))
})

class MainContainer extends Component {
  constructor(props) {
        super(props)
        this.userSignedUp = this.userSignedUp.bind(this);
        this.userLoggedIn = this.userLoggedIn.bind(this);
    }

    userSignedUp() {
      //grab user info from login form & create user Object
        const username = document.getElementById("userSignup");
        const password = document.getElementById("passSignup");
        const language = document.getElementById("userLanguage");
        const newUser = {};
        newUser.username = username.value;
        newUser.password = password.value;
        newUser.language = language.value;
        //post request to signup to create the new user
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(newUser)
            })
        .then(resp => resp.json())
        .then(data => {
            //check if user created succesfully, then login, 
            // (?) then clear the values from the object for safety
            if (data.hasAccount) {
              this.props.nowSigningUp(false);
            }
            else {
              this.props.login(data);
              console.log(this.props.loggedIn)
              username.value = '';
              password.value = '';
            }
        })
        .catch(err => console.log('Error creating new user! ERROR: ', err));
    }

    userLoggedIn() {
        //get user info from form and create object
        const username = document.getElementById("userLogin");
        const password = document.getElementById("passLogin");
        const user = {};
        user.username = username.value;
        user.password = password.value;
        //fetch post request to auth
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(user)
            })
        .then(resp => resp.json())
        .then(data => {
            //check if user verified succesfully, then login
            console.log(data)
            if (data.noMatch) {this.props.nowLoggedIn('wrongPassword')}
            else if (data.userUnknown) {this.props.nowLoggedIn('unknownUser')}
            else {
                this.props.nowSigningUp(null);
                username.value = '';
                password.value = '';
                this.props.login(data)
            }
            console.log('current user ', this.props.user)
        })
        .catch(err => console.log('Error logging in user! ERROR: ', err));
    }

    render() {
        console.log('rerendering')
        if (this.props.loggedIn === 'true') {
            // return messenger container
            return (<MessageContainer />)
        }
        if (this.props.signingUp) { // === 'true'
            // return signup page
            return (<Signup signup={this.userSignedUp}/>)
        } else {
            // return login page
            return (<Login info={this.props.loggedIn} onSignUpClick={this.props.nowSigningUp} submitLogin={this.userLoggedIn}/>)
        }

    }
}

export default connect(mapStateToProps, dispatchStateToProps)(MainContainer);