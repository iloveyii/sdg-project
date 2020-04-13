import React, {useEffect, useContext} from 'react';
import Plot from './Plot';
import {MlContext} from '../contexts/MlContextProvider';
import api from '../api/ml';


const Ml = () => {
    const {ml, dispatch} = useContext(MlContext);
    const image_url = 'http://localhost/static/plots/machinelearning/';
    useEffect(() => {
        api.read().then(ml => dispatch({type: 'ADD_ML', payload: {ml}}))
    }, []);

    if (Object.keys(ml).length === 0) return null;

    return (

        <div className="row py-3">
            <div className="col-sm-12">
                <h1>ML Plots</h1>
            </div>
            {
                Object.keys(ml).map(key => <Plot key={key} image={{id: key, src: image_url + ml[key]}}
                                                 data_section="data_ml"/>)
            }
        </div>
    )
}

export default Ml;
