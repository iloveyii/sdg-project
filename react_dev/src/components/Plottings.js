import React, {useEffect, useContext, useState} from 'react';
import Plot from './Plot';
import {PlottingsContext} from '../contexts/PlottingsContextProvider';
import api from '../api/plottings';
import {BasicContext} from "../contexts/BasicContextProvider";
import {apiServer} from "../settings/constants";
import Loading from "./Loading";

const Plottings = () => {
    const {plottings, dispatch} = useContext(PlottingsContext);
    const {basic} = useContext(BasicContext);
    const [loading, setLoading] = useState(false);

    const image_url = apiServer + '/static/plots/plotting/';

    // componentDidMount
    useEffect(() => {
        console.log('PLOT_ componentDidMount');
    }, []);

    useEffect(() => {
        setLoading(true);
        api.read(basic.current_channels).then(plottings => dispatch({type: 'ADD_PLOTTINGS', payload: {plottings}}))
    }, [basic]);

    useEffect(() => {
        setLoading(false);
    }, [plottings])

    if (Object.keys(plottings).length === 0) return <Loading />;

    return (

        <div className="row py-3">
            <div className="col-sm-12">
                <h1>Plottings</h1>
            </div>
            {
                loading
                    ? <Loading/>
                    : Object.keys(plottings).map(key => <Plot key={key} image={{id: key, src: image_url + plottings[key]}}
                                                        data_section="data_plottings"/>)
            }
        </div>
    )
}

export default Plottings;
