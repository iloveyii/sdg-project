import React, {useEffect, useContext, useState} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import models from '../store/models';
import Plot from './Plot';
import {apiServer} from "../settings/constants";
import Loading from "./Loading";


class Plots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel1: 0,
            channel2: 0,
            transformation: 'hlog',
            bins: 0,
            plot: models.plots, // Basic is an Object of class Basic, while basic is array of objects from json/db
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps');
        const {readAction} = this.props;
        const {channel1, channel2, transformation, bins, plot} = this.state;
        console.log(channel1, channel2, transformation, bins);
        if (
            channel1 === nextProps.basics.form.channel1 &&
            channel2 === nextProps.basics.form.channel2 &&
            transformation === nextProps.basics.form.transformation &&
            bins === nextProps.basics.form.bins
        ) {
            console.log('Same');
            plot.list = nextProps.plots.list;
            this.setState({plot});
        } else {
            console.log('Diff');
            const data = {
                channel1: nextProps.basics.form.channel1,
                channel2: nextProps.basics.form.channel2,
                transformation: nextProps.basics.form.transformation,
                bins: nextProps.basics.form.bins,
            };
            readAction(data);
            this.setState({...data});
        }

    }


    render() {
        const {plot} = this.state;
        const image_url = apiServer + '/static/plots/plotting/';
        if (Object.keys(plot.list).length < 1) return <Loading/>;
        console.log('Plots', plot.list)

        return (
            <div className="row py-3">
                <div className="col-sm-12">
                    <h1>Plots</h1>
                </div>
                {
                    Object.keys(plot.list).map(key => <Plot key={key}
                                                            image={{id: key, src: image_url + plot.list[key]}}
                                                            data_section="data_plots"/>)
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
    plots: state.plots,
    basics: state.basics,
});


/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    readAction: models.plots.actions.read,
    deleteAction: models.plots.actions.delete,
    createAction: models.plots.actions.create,
    createSuccessAction: models.plots.actions.create_success,
    updateAction: models.plots.actions.update,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Plots));
