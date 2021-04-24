import React from 'react'; 
import { render } from 'react-dom'; 
import { Provider } from 'react-redux'; 
import store from './state/store.js';
import App from './App.js';
import styles from './styles.css';

render(
  <Provider store={store}> 
    <App />
  </Provider>, 
  document.getElementById('root')
); 