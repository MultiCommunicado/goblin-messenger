import * as types from './actionTypes.js';

// action to update the current login state (is a user logged in?)
export const loggedinState = () => ({
    type: types.LOGIN_STATE
})

// action to login user
export const login = () => ({
    type: types.LOGIN
})


// action to update signup state (does a user want to signup?)
export const signupState = (bool) => ({
    type: types.SIGNUP_STATE,
    payload: bool
})

// action to signup user (log them in)
export const signup = () => ({
    type: types.SIGNUP
})

// more functions