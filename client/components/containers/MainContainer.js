import React, { Component } from 'react';
import Signup from '../Signup';
import Login from '../Login';

class MainContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Login />
                <Signup />
            </div>
        )
    }
}

export default MainContainer;