import axios from 'axios';
import {apiServer} from '../settings/constants';

const endPoint = '/api/machine-learning';
const server = apiServer + endPoint

const api = {
    read: (current_channels = {channel1: 'HDR-T', channel2: 'FSC-A'}) =>
        axios.get(server + '?' + 'ch1=' + current_channels.channel1 + '&ch2=' + current_channels.channel2)
            .then(res => res.data)
            .catch(error =>
                console.error(error)
            )
};
export default api;
