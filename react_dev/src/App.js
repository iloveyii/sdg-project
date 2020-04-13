import React from 'react';
import Navbar from './components/Navbar'
import Container from './components/Container'
import Plottings from './components/Plottings'
import Ml from './components/Ml'
import Upload from './components/Upload'
import Basic from './components/Basic'
import ThemeContextProvider from './contexts/ThemeContextProvider'
import BasicContextProvider from './contexts/BasicContextProvider';
import PlottingsContextProvider from './contexts/PlottingsContextProvider';
import MlContextProvider from './contexts/MlContextProvider';

function App() {
    return (
        <>
            <ThemeContextProvider>
                <Navbar/>
                <Container>
                    <BasicContextProvider>
                        <Upload/>
                        <Basic/>
                        <PlottingsContextProvider>
                            <Plottings/>
                        </PlottingsContextProvider>
                        <MlContextProvider>
                            <Ml/>
                        </MlContextProvider>
                    </BasicContextProvider>
                </Container>
            </ThemeContextProvider>

        </>
    );
}

export default App;
