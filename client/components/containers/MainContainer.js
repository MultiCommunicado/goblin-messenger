import React, { Component } from 'react';
import Signup from '../Signup';
import Login from '../Login';
import * as actions from '../../state/actions/actions.js';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
    user: store.message.user,
    loggedIn: store.message.login_state,
    signingUp: store.message.signup_state
})

const dispatchStateToProps = dispatch => ({
    nowLoggedIn: () => dispatch(actions.loggedinState()),
    login: (user) => dispatch(actions.login(user)),
    nowSigningUp: (bool) => dispatch(actions.signupState(bool)),
    signup: (newuser) => dispatch(actions.signup(newuser))
})

class MainContainer extends Component {
    constructor(props) {
        super(props)
        this.userSignedUp = this.userSignedUp.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    userSignedUp() {
        console.log(document.forms['signup'].elements);
    }

    onLoginClick() {
        // endpoint: /login (post) /signup (post)
        // {
        //     username:
        //     password:
        //     language:
        // }
    }

    render() {
        if (this.props.signingUp) {
            // return signup page
            return (<Signup signup={this.userSignedUp}/>)
        }
        if (this.props.loggedIn) {
            // return messenger container
        } else {
            // return login page
            return (<Login onSignUpClick={this.props.nowSigningUp}/>)
        }

    }
}

export default connect(mapStateToProps, dispatchStateToProps)(MainContainer);