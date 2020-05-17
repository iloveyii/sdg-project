import React from 'react';
import plottingsReducer from '../reducers/plottingsReducer';

export const PlottingsContext = React.createContext();


const PlottingsContextProvider = (props) => {
    const [plottings, dispatch] = React.useReducer(plottingsReducer, {});
    return (
        <PlottingsContext.Provider value={{plottings, dispatch}}>
            {props.children}
        </PlottingsContext.Provider>
    )
};

export default PlottingsContextProvider;
