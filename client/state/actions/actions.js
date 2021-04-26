import * as types from './actionTypes.js';

// action to update the current login state (is a user logged in?)
export const loggedinState = (info) => ({
    type: types.LOGIN_STATE,
    payload: info
})

// action to login user
export const login = (user) => ({
    type: types.LOGIN,
    payload: user
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

// action to signup user (log them in)
export const view = (view) => ({
    type: types.VIEW,
    payload: view
})

// more functions