import React, { Component } from 'react';
import Signup from '../Signup';
import Login from '../Login';
import MessageContainer from './MessageContainer';
import * as actions from '../../state/actions/actions.js';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
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
        const username = document.getElementById("userSignup");
        const password = document.getElementById("passSignup");
        const language = document.getElementById("userLanguage");
        const newUser = {};
        newUser.username = username.value;
        newUser.password = password.value;
        newUser.language = language.value;
        username.value = '';
        password.value = '';
        console.log(newUser)
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(newUser)
            })
        .then(resp => resp.json())
        .then(data => {
            //check if user created succesfully, then login
            
            this.props.nowLoggedIn()
            this.props.login(data.user)
            console.log(this.props.user)
            // console.log(data)
        })
        .catch(err => console.log('Error creating new user! ERROR: ', err));
    }

    userLoggedIn() {
        const username = document.getElementById("userLogin");
        const password = document.getElementById("passLogin");
        const user = {};
        user.username = username.value;
        user.password = password.value;
        username.value = '';
        password.value = '';
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
            if (data.noMatch) {this.props.nowLoggedIn('wrongPassword')}
            else if (data.userUnknown) {this.props.nowLoggedIn('unknownUser')}
            else {
                this.props.nowLoggedIn('true')
                this.props.login(data.user)
            }
            console.log('current user ', user)
        })
        .catch(err => console.log('Error logging in user! ERROR: ', err));
    }

    render() {
        if (this.props.signingUp) {
            // return signup page
            return (<Signup signup={this.userSignedUp}/>)
        }
        if (this.props.loggedIn === 'true') {
            // return messenger container
            return (<MessageContainer />)
        } else {
            // return login page
            return (<Login info={this.props.loggedIn} onSignUpClick={this.props.nowSigningUp} submitLogin={this.userLoggedIn}/>)
        }

    }
}

export default connect(mapStateToProps, dispatchStateToProps)(MainContainer);