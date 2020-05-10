import React, {useContext, useEffect, useState} from 'react';
import {BasicContext} from "../contexts/BasicContextProvider";
import api from "../api/basic";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import models from '../store/models';


const Options = (props) => {
    let {channels} = props;
    channels = channels && channels.channels ? channels.channels : channels;
    console.log('Basic_ componentOptions: ', props)
    if (!channels || !Array.isArray(channels)) return <option value="1">Loading...</option>
    return (
        channels.map(ch => <option key={ch} value={ch}>{ch}</option>)
    )
};

const basic = {
    channels: [],
    channel1: '',
    channel2: '',
    transformations: [],
    transformation: '',
    bins: '',
};

const values = basic;

const setValues = () => null;


class Basic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: models.shows, // Plots is an Object of class Plots, while shows is array of objects from json/db
        }
    }

    render() {
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
                        <button onClick={() => null} className="btn btn-lg btn-success">
                            <i className="fas fa-chart-line"></i> Display
                        </button>

                        <hr className="mb-4"/>
                    </div>
                </div>
            </>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    plots: state.plots,
});


/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    readAction: models.basics.actions.read,
    deleteAction: models.basics.actions.delete,
    createAction: models.basics.actions.create,
    updateAction: models.basics.actions.update,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Basic));
