// name, server, form, forceUpdate
import Plot from "../Models/Plot";
import Basic from "../Models/Basic";
import Ml from "../Models/Ml";
import Cl from "../Models/Cl";


const models = {
    basics: new Basic('basics'),
    plots: new Plot('plots'),
    mls: new Ml('mls'),
    cls: new Cl('cls'),
};

export default models;
