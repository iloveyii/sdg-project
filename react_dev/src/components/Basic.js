import React, {useContext, useEffect} from 'react';
import {BasicContext} from "../contexts/BasicContextProvider";
import api from "../api/basic";

const Options = (props) => {
    const {basic} = props;
    if (!basic) return <option value="1">Loading...</option>
    return (
        basic.map(b => <option key={b} value={b}>{b}</option>)
    )
};

const Basic = () => {
    const {basic, dispatch} = useContext(BasicContext);
    useEffect(() => {
        api.read().then(basic => dispatch({type: 'ADD_BASIC', payload: {channels: basic}}))
    }, []);

    const [channels, setChannels] = React.useState({channel1: '1', channel2: '22'});

    const setContextChannels = () => {
        api.read().then(() => dispatch({type: 'SET_CHANNELS', payload: {current_channels:   channels}}))
    };

    if (Object.keys(basic).length === 0) return <p>Loading...</p>;
    const channels1 = [...basic.channels];
    const channels2 = [...basic.channels];
    channels2.shift();
    console.log('BASIC')
    return (
        <div className="row" id="basic-div">
            <div className="col-md-12 order-md-0">
                <h1>Basic info </h1>
                <p className="lead" id="basic-info"></p>

                <select className="form-control" id="channel-names-1" onChange={(e)=>setChannels({channel1:e.target.value, channel2: channels.channel2})}>
                    <Options basic={channels1}/>
                </select>
                <br/>
                <select className="form-control" id="channel-names-2" onChange={(e)=>setChannels({channel1:channels.channel1, channel2:e.target.value })}>
                    <Options basic={channels2}/>
                </select>
                <br/>
                <button onClick={() => setContextChannels()} className="btn btn-success">Display</button>
                <hr className="mb-4"/>
            </div>
        </div>
    )
};

export default Basic;
