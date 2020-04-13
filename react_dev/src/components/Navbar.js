import React from 'react'
import {ThemeContext} from '../contexts/ThemeContextProvider'

const Navbar = () => {
    const {isLightTheme, light, dark, toggleTheme} = React.useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    return (
        <nav style={{background: theme.bg, color: theme.syntax}}>
            <ul className="inline">
                <li style={{background: theme.ui}} className="list-inline-item">
                    <h1>CELL ANALYSIS</h1>
                </li>
                <li style={{background: theme.ui}} className="list-inline-item"><button onClick={toggleTheme}>C</button></li>
            </ul>
        </nav>
    )
}

export default Navbar;
