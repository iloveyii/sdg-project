import React, {useContext, useEffect, useState} from 'react';
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


class Basic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basic: models.basics, // Basic is an Object of class Basic, while basic is array of objects from json/db
            attributes: {
                channels: [],
                channel1: '',
                channel2: '',
                transformation: 'hlog',
                bins: 100,
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {basic, attributes} = this.state;
        basic.list = nextProps.basics.list;
        if (!attributes.channel1 || !attributes.channel2) {
            attributes.channel1 = basic.list[0];
            attributes.channel2 = basic.list[1];
        }
        this.setState({basic});
    }

    onChange = (e) => {
        const {attributes} = this.state;
        attributes[e.target.id] = e.target.value;
        this.setState({attributes});
    };

    onClick = (e) => {
        e.preventDefault();
        const {attributes} = this.state;
        const {createSuccessAction} = this.props;
        const data = {
            actions: {status: 'success', ok: 1},
            form: attributes
        };
        createSuccessAction(data)
        console.log('Firing actions');
    };

    render() {
        const {basic, attributes} = this.state;

        return (
            <>
                <div className="row" id="basic-div">
                    <div className="col-md-12 order-md-0">
                        <h1>Basic info</h1>
                        <p className="lead" id="basic-info"></p>

                        <select className="form-control" id="channel-name-1" value={attributes.channel1}
                                id="channel1"
                                onChange={(e) => this.onChange(e)}>
                            <Options channels={basic.list}/>
                        </select>
                        <br/>
                        <select className="form-control" id="channel-name-2" value={attributes.channel2}
                                id="channel2"
                                onChange={(e) => this.onChange(e)}>
                            <Options channels={basic.list.slice(1)}/>
                        </select>
                        <br/>

                        <div className="row">
                            <div className="col-md-6">
                                <select className="form-control" id="transformations" value={attributes.transformation}
                                        id="transformation"
                                        onChange={(e) => this.onChange(e)}>
                                    <Options channels={basic.form.transformations}/>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <input type="number" defaultValue={attributes.bins} className="form-control" id="bins"
                                       onChange={e => this.onChange(e)}/>
                            </div>
                        </div>

                        <br/>
                        <button onClick={e => this.onClick(e)} className="btn btn-lg btn-success">
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
    basics: state.basics,
});


/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    readAction: models.basics.actions.read,
    deleteAction: models.basics.actions.delete,
    createAction: models.basics.actions.create,
    createSuccessAction: models.basics.actions.create_success,
    updateAction: models.basics.actions.update,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Basic));
