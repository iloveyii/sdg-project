import React from 'react';
import Navbar from './components/Navbar'
import Container from './components/Container'
import ThemeContextProvider from './contexts/ThemeContextProvider'

function App() {
    return (
        <>
            <ThemeContextProvider>
                <Navbar/>
                <Container/>
            </ThemeContextProvider>

        </>
    );
}

export default App;
