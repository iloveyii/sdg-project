import React, {useEffect, useContext} from 'react';
import Plot from './Plot';
import {PlottingsContext} from '../contexts/PlottingsContextProvider';
import api from '../api/plottings';


const Plottings = () => {
    const {plottings, dispatch} = useContext(PlottingsContext);
    const image_url = 'http://localhost/static/plots/plotting/';
    useEffect(() => {
        api.read().then(plottings => dispatch({type: 'ADD_PLOTTINGS', payload: {plottings}}))
    }, []);

    if (Object.keys(plottings).length === 0) return null;

    return (

        <div className="row py-3">
            <div className="col-sm-12">
                <h1>Plottings</h1>
            </div>
            {
                Object.keys(plottings).map(key => <Plot key={key} image={{id: key, src: image_url + plottings[key]}}
                                                        data_section="data_plottings"/>)
            }
        </div>
    )
}

export default Plottings;
