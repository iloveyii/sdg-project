import React, {Component} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Navbar from './components/Navbar'
import Container from './components/Container'
import Plots from './components/Plots';
import Mls from './components/Mls';
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
                    <Plots/>
                </Container>
            </>
        );
    }
}

export default App;
