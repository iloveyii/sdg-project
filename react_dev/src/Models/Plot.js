import ActiveRecord from './ActiveRecord';
import axios from 'axios';

class Plot extends ActiveRecord {
    constructor(name) {
        super(name);
        this.form = {
            plots: {},
        };
        console.log('Plots', this.types);
    }

    newApiRead = ({data}) => {
        console.log('Inside api newApiRead', data);
        if(!data.channel1){
            console.log('Inside api newApiRead undef', data.channel1);
            return {};
        }
        let suffix = '?';
        Object.keys(data).forEach(key => suffix += (`${key}=${data[key]}&`));
        suffix += '&params=' + suffix;
        return axios.get(this.server + suffix).then(res => res.data).catch(error => {
            throw new Error(error);
            console.dir(error);
        });
    };

    get api() {
        const newApi = super.api;
        newApi.read = this.newApiRead;
        return newApi;
    }
}

export default Plot;
