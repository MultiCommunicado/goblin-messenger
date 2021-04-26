// import actions
import * as types from '../actions/actionTypes.js';

const initialState = {
    user: null,
    login_state: null,
    signup_state: null,
    info: null,
    messages: {},
    view: 'userpage'
}

const mainReducer = (state = initialState, action) => {
    // declare state constants
    let login_state;
    let user;
    let view;

    switch (action.type) {

        case types.LOGIN_STATE:
            // user is logged in
            user = state.user;
            if (action.payload === null) user = null;
            login_state = action.payload;
            return {
                ...state,
                login_state,
                user
            }

        case types.LOGIN:
            // login user
            return {
                ...state,
            }

        case types.SIGNUP_STATE:
            // user wants to signup
            const signup_state = action.payload;
            // console.log('changing signup state to ', action.payload)
            return {
                ...state,
                signup_state
            }
        
        case types.SIGNUP:
            // sign up user
            login_state = true;
            return {
                ...state,
                login_state
            }
        
        case types.VIEW:
            view = action.payload;
            return {
                ...state,
                view
            }

        default:
            return state;
    }
}

export default mainReducer;