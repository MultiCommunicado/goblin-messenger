import { combineReducers } from 'redux';
import mainReducer from './mainReducer.js'; 

const reducers = combineReducers({
  message: mainReducer 
}); 

export default reducers;