import { createStore } from 'redux';
// compose with dev tools
import reducers from './reducers/index.js'; 

const store = createStore(reducers); 

export default store;