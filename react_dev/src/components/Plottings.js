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
    const [loading, setLoading] = useState(0);
    const image_url = apiServer + '/static/plots/plotting/';

    // componentDidMount
    useEffect(() => {
        console.log('PLOT_ componentDidMount', basic.attributes);
        setTimeout(() => {
            console.log('PLOT_ componentDidMount setTimeout', basic.attributes);
        }, 4000);
    }, []);

    useEffect(() => {
        console.log('PLOT_ componentWill', Date.now(), basic.attributes);
        if (loading === 1) {
            setLoading(2);
            console.log('PLOT2_ loading ', loading);
            api.read(basic.attributes).then(plottings => {
                dispatch({type: 'ADD_PLOTTINGS', payload: {plottings}});
                setLoading(3);
            })
        }
    }, [loading]);

    useEffect(() => {
        console.log('PLOT2_ attributes changed to', basic.attributes);
        if(basic.attributes.bins > 0 && loading !== 2){}
            //setLoading(1);
    }, [basic.attributes])

    //if (Object.keys(plottings).length === 0) return <Loading />;

    return (

        <div className="row py-3">
            <div className="col-sm-12">
                <h1>Plottings {basic.bins}</h1>
            </div>
            {
                loading
                    ? <Loading/>
                    : Object.keys(plottings).map(key => <Plot key={key}
                                                              image={{id: key, src: image_url + plottings[key]}}
                                                              data_section="data_plottings"/>)
            }
        </div>
    )
}

export default Plottings;
