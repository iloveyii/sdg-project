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
        const [channels, setChannels ] = useState([]);
        this._channels = channels;
        this.setChannels = setChannels;
    }

    set basic(basic) {
        this.channels = basic.channels ? basic.channels : basic;
        this.channel1 = basic[0];
        this.channel2 = basic[1];
    }

    set channels(channels) {
        console.log('useEffect 4', channels);
        this.setChannels(channels);
        this._channels = channels;
    };

    get channels() {
        console.log('useEffect 3', this._channels);
        return this._channels;
    };

    set channel1(channel1) {
        console.log('Setting channel 1', channel1)
        this._channel1 = channel1;
    }

    get channel1() {
        return this._channel1;
    }

    set channel2(channel2) {
        this._channel2 = channel2;
    }

    get channel2() {
        return this._channel2;
    }

    set transformation(transformation) {
        this._transformation = transformation;
    }

    get transformation() {
        return this._transformation;
    }

    set bins(bins) {
        console.log('Setting bins to : ', bins);
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
    console.log('componentOptions: ', props)
    if (!channels || !Array.isArray(channels)) return <option value="1">Loading...</option>
    return (
        channels.map(ch => <option key={ch} value={ch}>{ch}</option>)
    )
};

const Basic = () => {
    const {basic, dispatch} = useContext(BasicContext);
    const model = new Model();

    // componentDidMount
    useEffect(() => {
        console.log('componentDidMount', basic);
        model.basic = basic;

        setTimeout(() =>
            api.read().then(basic => {
                if (basic && basic.length > 0) {
                    model.basic = basic;
                    dispatch({
                        type: 'ADD_BASIC',
                        payload: {model}
                    });
                }
            }), 5000
        )
    }, []);

    // componentWillReceive props
    useEffect(() => {
        console.log('componentWillReceive props', basic);
        model.basic = basic;
    }, [basic]);

    const setContextAttributes = () => {
        console.log('setContextAttributes', model.attributes);
        dispatch({type: 'SET_ATTRIBUTES', payload: {attributes: model.attributes}});
    };

    //if (model.channels.length === 0) return <p>Loading...</p>;

    return (
        <div className="row" id="basic-div">
            <div className="col-md-12 order-md-0">
                <h1>Basic info  </h1>
                <p className="lead" id="basic-info"></p>

                <select className="form-control" id="channel-name-1"
                        onChange={(e) => model.channel1 = e.target.value}>
                    <Options channels={model.channels}/>
                </select>
                <br/>
                <select className="form-control" id="channel-name-2"
                        onChange={(e) => model.channel2 = e.target.value}>
                    <Options channels={model.channels.slice(1)}/>
                </select>
                <br/>

                <div className="row">
                    <div className="col-md-6">
                        <select className="form-control" id="transformations"
                                onChange={(e) => model.transformation = e.target.value}>
                            <Options channels={['hlog', 'tlog']}/>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <input type="number" defaultValue={100} className="form-control" id="bins"
                               onChange={(e) => model.bins = e.target.value}/>
                    </div>
                </div>

                <br/>
                <button onClick={() => setContextAttributes()} className="btn btn-lg btn-success">
                    <i className="fas fa-chart-line"></i> Display
                </button>

                <hr className="mb-4"/>
            </div>
        </div>
    )
};

export default Basic;
