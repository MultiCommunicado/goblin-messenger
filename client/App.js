import React, { Component } from 'react';
// import future components
import Login from './components/Login.js';
import Signup from './components/Signup.js';

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Login />
                <Signup />
            </div>
        );
    }
}


export default App;