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
            attributes: {},
            plot: models.plots, // Basic is an Object of class Basic, while basic is array of objects from json/db
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let {plot, attributes} = this.state;
        const {basics, readAction} = nextProps;
        plot.list = nextProps.plots.list;
        const pre = JSON.stringify(attributes);
        const curr = JSON.stringify(nextProps.basics.form);

        if (attributes.bins !== nextProps.basics.form.bins) {
            console.group('Attributes NOT Eq');
            console.log(attributes.bins);
            console.log(nextProps.basics.form.bins);
            console.groupEnd();
            attributes = nextProps.basics.form;
            // readAction();
            setTimeout(() => this.setState({plot, attributes}), 4000)
        } else {
            console.group('Attributes Eq');
            console.log(attributes.bins);
            console.log(nextProps.basics.form.bins);
            console.groupEnd();
            this.setState({plot});
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
