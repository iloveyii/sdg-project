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
        api.read().then(basic => dispatch({type: 'ADD_BASIC', payload: {basic}}))
    }, []);

    if (basic.length === 0) return <p>Loading...</p>;
    const basic2 = [...basic];
    basic2.shift();
    return (
        <div className="row" id="basic-div">
            <div className="col-md-12 order-md-0">
                <h1>Basic info</h1>
                <p className="lead" id="basic-info"></p>

                <select className="form-control" id="channel-names-1">
                    <Options basic={basic}/>
                </select>
                <br/>
                <select className="form-control" id="channel-names-2">
                    <Options basic={basic2}/>
                </select>
                <br/>
                <button onClick={() => null} className="btn btn-success">Display</button>
                <hr className="mb-4"/>
            </div>
        </div>
    )
};

export default Basic;
