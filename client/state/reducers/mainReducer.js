// import actions
import * as types from '../actions/actionTypes.js';

const initialState = {
    loggedIn: false
}

const mainReducer = (state = initialState, action) => {
    // declare state constants

    switch (action.type) {
        case types.LOGGED_IN:
            // const loggedIn = true;
            return {
                ...state,
                loggedIn: true
            }
        default:
            return state;
    }
}

export default mainReducer;