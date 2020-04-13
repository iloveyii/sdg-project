import React from 'react';
import basicReducer from '../reducers/basicReducer';

export const BasicContext = React.createContext();


const BasicContextProvider = (props) => {
    const [basic, dispatch] = React.useReducer(basicReducer, {});
    return (
        <BasicContext.Provider value={{basic, dispatch}}>
            {props.children}
        </BasicContext.Provider>
    )
};

export default BasicContextProvider;
