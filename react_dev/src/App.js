import React from 'react';
import Navbar from './components/Navbar'
import Container from './components/Container'
import Plottings from './components/Plottings'
import ThemeContextProvider from './contexts/ThemeContextProvider'
import PlottingsContextProvider from './contexts/PlottingsContextProvider';

function App() {
    return (
        <>
            <ThemeContextProvider>
                <Navbar/>
                <Container>
                    <PlottingsContextProvider>
                        <Plottings/>
                    </PlottingsContextProvider>
                </Container>
            </ThemeContextProvider>

        </>
    );
}

export default App;
