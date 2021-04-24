import React, { Component } from 'react';
import Signup from '../Signup';
import Login from '../Login';
import * as actions from '../../state/actions/actions.js';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
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
        this.onSignUpClick = this.onSignUpClick.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onSignUpClick() {
        this.props.nowSigningUp(true);
    }

    onLoginClick() {

    }

    render() {
        if (this.props.signingUp) {
            // return signup page
            return (<Signup />)
        }
        if (this.props.loggedIn) {
            // return messenger container
        } else {
            // return login page
            return (<Login onSignUpClick={this.onSignUpClick}/>)
        }

    }
}

export default connect(mapStateToProps, dispatchStateToProps)(MainContainer);