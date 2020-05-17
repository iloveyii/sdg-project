import React, {useEffect, useContext, useState} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import models from '../store/models';
import Plot from './Plot';
import {apiServer} from "../settings/constants";
import Loading from "./Loading";


class Cls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            channel1: 0,
            channel2: 0,
            transformation: 'hlog',
            bins: 0,
            cl: models.cls, // Basic is an Object of class Basic, while basic is array of objects from json/db
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {readAction, cls} = nextProps;
        console.log('Cls componentWillReceiveProps', cls);
        const {cl} = this.state;
        cl.list = cls.list;
        this.setState({cl, loading: false});
    }


    render() {
        const {cl, loading} = this.state;
        const image_url = apiServer + '/static/plots/classification/';
        if (Object.keys(cl.list).length < 1 || loading) return <Loading/>;
        console.log('Classification', cl.list);

        return (
            <div className="row py-3">
                <div className="col-sm-12">
                    <h1>Classification</h1>
                </div>
                <div className="col-sm-12">
                {
                    Object.keys(cl.list).map(key =>
                        <div className="jumbotron" key={key}>
                            <h2 className="display-6">{key}</h2>
                            <h3 className="display-8 mt-4">Test Score</h3>
                            {
                                Object.keys(cl.list[key].test_score).map(k =>
                                    <strong>{k} : {JSON.stringify(cl.list[key].test_score[k])}<br/></strong>
                                )
                            }


                            <h3 className="display-8 mt-4">Number of Malignant and Benign cells</h3>
                            <table className="table">
                                <thead>
                                <tr>
                                    {
                                        Object.keys(cl.list[key].predictions.counts).map(model =>
                                            <th>{model}</th>
                                        )
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    {
                                        Object.keys(cl.list[key].predictions.counts).map(m =>
                                            <td>
                                                <strong>Benign : </strong>
                                                {JSON.stringify(cl.list[key].predictions.counts[m]['0'])}
                                                <br/>
                                                <strong>Malignant : </strong>
                                                {JSON.stringify(cl.list[key].predictions.counts[m]['1'])}
                                            </td>
                                        )
                                    }
                                </tr>
                                </tbody>
                            </table>
                            <hr className="my-4"/>
                        </div>)
                }
                </div>
            </div>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    cls: state.cls,
    basics: state.basics,
});


/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    readAction: models.cls.actions.read,
    deleteAction: models.cls.actions.delete,
    createAction: models.cls.actions.create,
    createSuccessAction: models.cls.actions.create_success,
    updateAction: models.cls.actions.update,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Cls));
