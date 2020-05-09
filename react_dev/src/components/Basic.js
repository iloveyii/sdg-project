import React, {useContext, useEffect, useState} from 'react';
import {BasicContext} from "../contexts/BasicContextProvider";
import api from "../api/basic";


class Model {
    _channels = [];
    _channel1 = 'ch1';
    _channel2 = 'ch2';
    _transformation = 'hlog';
    _bins = 100;
    setChannels = null;

    constructor() {
        const [channels, setChannels] = useState([]);
        this._channels = channels;
        this.setChannels = setChannels;
    }

    set basic(basic) {
        this.channels = basic.channels ? basic.channels : basic;
        this.channel1 = basic[0];
        this.channel2 = basic[1];
    }

    set channels(channels) {
        this.setChannels(channels);
        this._channels = channels;
    };

    get channels() {
        return this._channels;
    };

    set channel1(channel1) {
        console.log('Basic_ Setting channel 1', channel1)
        this._channel1 = channel1;
    }

    get channel1() {
        return this._channel1;
    }

    set channel2(channel2) {
        console.log('Basic_ Setting channel 2', channel2)
        this._channel2 = channel2;
    }

    get channel2() {
        return this._channel2;
    }

    set transformation(transformation) {
        console.log('Basic_ Setting transformation', transformation)
        this._transformation = transformation;
    }

    get transformation() {
        return this._transformation;
    }

    set bins(bins) {
        console.log('Basic_ Setting bins to : ', bins);
        this._bins = bins;
    }

    get bins() {
        return this._bins;
    }

    get attributes() {
        return {
            channels: this.channels,
            channel1: this.channel1,
            channel2: this.channel2,
            transformation: this.transformation,
            bins: this.bins
        }
    }
}

const Options = (props) => {
    let {channels} = props;
    channels = channels && channels.channels ? channels.channels : channels;
    console.log('Basic_ componentOptions: ', props)
    if (!channels || !Array.isArray(channels)) return <option value="1">Loading...</option>
    return (
        channels.map(ch => <option key={ch} value={ch}>{ch}</option>)
    )
};

const Basic = () => {
    const {basic, dispatch} = useContext(BasicContext);
    const [values, setValues] = useState({
        channels: [],
        channel1: '',
        channel2: '',
        transformations: [],
        transformation: '',
        bins: '',
    });

    // componentDidMount
    useEffect(() => {
        console.log('Basic_ componentDidMount', basic);

        setTimeout(() =>
            api.read().then(channels => {
                if (channels && channels.length > 0) {
                    // This will trigger render
                    dispatch({
                        type: 'ADD_CHANNELS',
                        payload: {channels}
                    });
                    setValues(basic.attributes);
                }
            }), 2000
        )
    }, []);

    // componentWillReceive props
    useEffect(() => {
        // if (basic.bins === -1) return;
        console.log('Basic_ componentWillReceive props', basic);
    }, [values]);

    const setContextAttributes = () => {
        console.log('Basic_ setContextAttributes', basic.attributes);
        dispatch({type: 'SET_ATTRIBUTES', payload: {attributes: values}});
    };

    //if (model.channels.length === 0) return <p>Loading...</p>;
    console.log('Basic_ calling return');

    return (
        <>
            <div className="row" id="basic-div">
                <div className="col-md-12 order-md-0">
                    <h1>Basic {Date.now()} info {JSON.stringify(basic.attributes)} </h1>
                    <p className="lead" id="basic-info"></p>

                    <select className="form-control" id="channel-name-1" value={values.channel1}
                            onChange={(e) => setValues({...values, channel1: e.target.value})}>
                        <Options channels={values.channels}/>
                    </select>
                    <br/>
                    <select className="form-control" id="channel-name-2" value={values.channel2}
                            onChange={(e) => setValues({...values, channel2: e.target.value})}>
                        <Options channels={values.channels.slice(1)}/>
                    </select>
                    <br/>

                    <div className="row">
                        <div className="col-md-6">
                            <select className="form-control" id="transformations" value={values.transformation}
                                    onChange={(e) => setValues({...values, transformation: e.target.value})}>
                                <Options channels={values.transformations}/>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <input type="number" defaultValue={values.bins} className="form-control" id="bins"
                                   onChange={(e) => setValues({...values, bins: e.target.value})}/>
                        </div>
                    </div>

                    <br/>
                    <button onClick={() => setContextAttributes()} className="btn btn-lg btn-success">
                        <i className="fas fa-chart-line"></i> Display
                    </button>

                    <hr className="mb-4"/>
                </div>
            </div>
        </>
    )
};

export default Basic;
