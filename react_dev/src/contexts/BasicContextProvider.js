import React from 'react';
import basicReducer from '../reducers/basicReducer';

export const BasicContext = React.createContext();

const BasicContextProvider = (props) => {
    const [basic, dispatch] = React.useReducer(basicReducer, {
        channels: ["FSC-A", "SSC-A", "FITC-A"],
        channel1: 'FITC-H',
        channel2: 'PE-H',
        transformation: 'hlog',
        bins: 199
    });
    return (
        <BasicContext.Provider value={{basic, dispatch}}>
            {props.children}
        </BasicContext.Provider>
    )
};

export default BasicContextProvider;
