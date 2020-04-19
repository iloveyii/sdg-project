import React, {useEffect, useContext, useState} from 'react';
import Plot from './Plot';
import {MlContext} from '../contexts/MlContextProvider';
import api from '../api/ml';
import {BasicContext} from "../contexts/BasicContextProvider";
import Loading from './Loading';
import {apiServer} from "../settings/constants";

const Ml = () => {
    const {ml, dispatch} = useContext(MlContext);
    const {basic} = useContext(BasicContext);
    const [loading, setLoading] = useState(false);
    console.log('ML basic', basic)

    const image_url = apiServer + '/static/plots/machinelearning/';

    useEffect(() => {
        setLoading(true);
        api.read(basic.current_channels).then(ml => dispatch({type: 'ADD_ML', payload: {ml}}))
    }, [basic]);

    useEffect(() => {
        setLoading(false);
    }, [ml])

    if (Object.keys(ml).length === 0) return <Loading />;

    return (

        <div className="row py-3">
            <div className="col-sm-12">
                <h1>ML Plots</h1>
            </div>
            {
                loading
                    ? <Loading/>
                    : Object.keys(ml).map(key => <Plot key={key} image={{id: key, src: image_url + ml[key]}}
                                                 data_section="data_ml"/>)
            }
        </div>
    )
}

export default Ml;
