import React from 'react';
import mlReducer from '../reducers/mlReducer';

export const MlContext = React.createContext();


const MlContextProvider = (props) => {
    const [ml, dispatch] = React.useReducer(mlReducer, {});
    return (
        <MlContext.Provider value={{ml, dispatch}}>
            {props.children}
        </MlContext.Provider>
    )
};

export default MlContextProvider;
