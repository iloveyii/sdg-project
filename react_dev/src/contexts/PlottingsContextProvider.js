import React from 'react';

const PlottingsContext = React.createContext();

const PlottingsContextProvider = (props) => {
    const [plottings, setPlottings] = React.useState([
        {histogram: '/path/to/image'}
    ]);
    return (
        <PlottingsContext.Provider value={{plottings}}>
            {props.children}
        </PlottingsContext.Provider>
    )
}

export default PlottingsContextProvider;
