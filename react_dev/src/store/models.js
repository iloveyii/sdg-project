// name, server, form, forceUpdate
import Plot from "../Models/Plot";
import Basic from "../Models/Basic";
import Ml from "../Models/Ml";


const models = {
    basics: new Basic('basics'),
    plots: new Plot('plots'),
    mls: new Ml('mls'),
};

export default models;
