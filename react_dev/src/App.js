import React from 'react';
import Navbar from './components/Navbar'
import Container from './components/Container'
import Plottings from './components/Plottings'
import Ml from './components/Ml'
import ThemeContextProvider from './contexts/ThemeContextProvider'
import PlottingsContextProvider from './contexts/PlottingsContextProvider';
import MlContextProvider from './contexts/MlContextProvider';

function App() {
    return (
        <>
            <ThemeContextProvider>
                <Navbar/>
                <Container>
                    <PlottingsContextProvider>
                        <Plottings/>
                    </PlottingsContextProvider>
                    <MlContextProvider>
                        <Ml/>
                    </MlContextProvider>
                </Container>
            </ThemeContextProvider>

        </>
    );
}

export default App;
