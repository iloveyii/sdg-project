import React, {Component} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Navbar from './components/Navbar'
import Container from './components/Container'
import Plottings from './components/Plottings'
import Ml from './components/Ml'
import Upload from './components/Upload'
import Basic from './components/Basic'


class App extends Component {

    render() {
        return (
            <>
                <Navbar/>
                <Container>
                    <Upload/>
                    <Basic/>
                </Container>
            </>
        );
    }
}

export default App;
