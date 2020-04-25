import React, {useContext, useEffect} from 'react';
import {BasicContext} from "../contexts/BasicContextProvider";
import api from "../api/basic";

const Options = (props) => {
    const {channels} = props;
    console.log('Options: ', props)
    if (!channels) return <option value="1">Loading...</option>
    return (
        channels.map(ch => <option key={ch} value={ch}>{ch}</option>)
    )
};

const Basic = () => {
    const {basic, dispatch} = useContext(BasicContext);
    const [current_channels, setCurrentChannels] = React.useState({channel1: '1', channel2: '22'});
    const [channels1, setChannels1] = React.useState([]);
    const [channels2, setChannels2] = React.useState([]);
    const [attributes, setAttributes] = React.useState({transformation: 'hlog', bins: 100});

    useEffect(() => {
        console.log('useEffect 1', basic)
        api.read().then(basic => {
            if (basic) {
                dispatch({
                    type: 'ADD_BASIC',
                    payload: {channels: basic}
                });
                setCurrentChannels({channel1: basic[0], channel2: basic[1]});
            }
        })
    }, []);

    useEffect(() => {
        console.log('useEffect 2', basic);
        if (basic && basic.channels && basic.channels.length) {
            const channels1 = [...basic.channels];
            setChannels1(channels1);
            const channels2 = [...basic.channels];
            channels2.shift();
            setChannels2(channels2);
            console.log('useEffect 2 IF ', channels1, channels2);
        }
    }, [basic]);

    const setContextChannels = () => {
        api.read().then(() => dispatch({type: 'SET_CHANNELS', payload: {current_channels}}))
    };

    const setStateAttributes = (atts) => {
        setAttributes({...attributes, ...atts});
        console.log('setStateAttributes', atts, attributes)
    };

    const setContextAttributes = () => {
        api.read().then(() => dispatch({type: 'SET_ATTRIBUTES', payload: {attributes}}))
    };

    if (Object.keys(basic).length === 0) return <p>Loading...</p>;

    return (
        <div className="row" id="basic-div">
            <div className="col-md-12 order-md-0">
                <h1>Basic info </h1>
                <p className="lead" id="basic-info"></p>

                <select className="form-control" id="channel-names-1" onChange={(e) => setStateAttributes({
                    channel1: e.target.value
                })}>
                    <Options channels={channels1}/>
                </select>
                <br/>
                <select className="form-control" id="channel-names-2" onChange={(e) => setStateAttributes({
                    channel2: e.target.value
                })}>
                    <Options channels={channels2}/>
                </select>
                <br/>

                <div className="row">
                    <div className="col-md-6">
                        <select className="form-control" id="transformations" onChange={(e) => setStateAttributes({
                            transformation: e.target.value
                        })}>
                            <Options channels={['hlog', 'tlog']}/>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <input type="number" value={attributes.bins} className="form-control" id="bins" onChange={(e) => setStateAttributes({
                            bins: e.target.value
                        })}/>
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
