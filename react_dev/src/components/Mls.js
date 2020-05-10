import React, {useEffect, useContext, useState} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import models from '../store/models';
import Plot from './Plot';
import {apiServer} from "../settings/constants";
import Loading from "./Loading";


class Mls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            channel1: 0,
            channel2: 0,
            transformation: 'hlog',
            bins: 0,
            ml: models.mls, // Basic is an Object of class Basic, while basic is array of objects from json/db
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps');
        const {readAction} = this.props;
        const {channel1, channel2, transformation, bins, ml} = this.state;
        console.log(channel1, channel2, transformation, bins);
        if (
            channel1 === nextProps.basics.form.channel1 &&
            channel2 === nextProps.basics.form.channel2 &&
            transformation === nextProps.basics.form.transformation &&
            bins === nextProps.basics.form.bins
        ) {
            console.log('Same');
            ml.list = nextProps.mls.list;
            this.setState({ml, loading: false});
        } else {
            console.log('Diff');
            const data = {
                channel1: nextProps.basics.form.channel1,
                channel2: nextProps.basics.form.channel2,
                transformation: nextProps.basics.form.transformation,
                bins: nextProps.basics.form.bins,
            };
            readAction(data);
            this.setState({...data, loading: true});
        }
    }


    render() {
        const {ml, loading} = this.state;
        const image_url = apiServer + '/static/plots/machinelearning/';
        if (Object.keys(ml.list).length < 1 || loading) return <Loading/>;
        console.log('Plots', ml.list);

        return (
            <div className="row py-3">
                <div className="col-sm-12">
                    <h1>ML</h1>
                </div>
                {
                    Object.keys(ml.list).map(key => <Plot key={key}
                                                            image={{id: key, src: image_url + ml.list[key]}}
                                                            data_section="data_ml"/>)
                }
            </div>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    mls: state.mls,
    basics: state.basics,
});


/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    readAction: models.mls.actions.read,
    deleteAction: models.mls.actions.delete,
    createAction: models.mls.actions.create,
    createSuccessAction: models.mls.actions.create_success,
    updateAction: models.mls.actions.update,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Mls));
