import React from 'react'
import {ThemeContext} from '../contexts/ThemeContextProvider'

const Navbar = () => {
    const {isLightTheme, light, dark, toggleTheme} = React.useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    return (
        <nav style={{background: theme.bg, color: theme.syntax}}>
            <h1>FCS</h1>
            <ul className="inline">
                <li style={{background: theme.ui}} className="list-inline-item">Home</li>
                <li style={{background: theme.ui}} className="list-inline-item">About</li>
                <li style={{background: theme.ui}} className="list-inline-item">Contact</li>
                <li style={{background: theme.ui}} className="list-inline-item"><button onClick={toggleTheme}>Change theme</button></li>
            </ul>
        </nav>
    )
}

export default Navbar;
