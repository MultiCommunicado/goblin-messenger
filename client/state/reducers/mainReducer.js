// import actions
import * as types from '../actions/actionTypes.js';

const initialState = {
    user: null,
    login_state: null,
    signup_state: null,
    info: null,
    messages: {},
    view: 'userpage', //this state takes exact string inputs to 
    user_info: null
}

const mainReducer = (state = initialState, action) => {
    // declare state constants
    let login_state;
    let user;
    let view;
    let messages;
    let user_info;

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
            const { _id, username, language } = action.payload.user;
            const resMessages = action.payload.messages;
            messages = resMessages;
            login_state = 'true';
            user = { _id: _id, username: username, language: language };
            return {
                ...state,
                messages,
                login_state,
                user
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

        case types.USER_INFO:
        user_info = action.payload;
        return {
            ...state,
            user_info
        }

        case types.UPDATE_MESSAGES:
        messages = action.payload;
        return {
            ...state,
            messages
        }

        default:
            return state;
    }
}

export default mainReducer;