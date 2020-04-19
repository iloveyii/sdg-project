import React, {useEffect, useContext} from 'react';
import Plot from './Plot';
import {MlContext} from '../contexts/MlContextProvider';
import api from '../api/ml';
import {BasicContext} from "../contexts/BasicContextProvider";
import {apiServer} from "../settings/constants";

const Ml = () => {
    const {ml, dispatch} = useContext(MlContext);
    const {basic} = useContext(BasicContext);
    console.log('ML basic', basic)

    const image_url = apiServer + '/static/plots/machinelearning/';

    useEffect(() => {
        api.read(basic.current_channels).then(ml => dispatch({type: 'ADD_ML', payload: {ml}}))
    }, [basic]);

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
