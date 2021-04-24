import React, { Component } from 'react';
// import future components
import MainContainer from './components/containers/MainContainer.js'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <MainContainer />
            </div>
        );
    }
}


export default App;