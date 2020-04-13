import axios from 'axios';
import {apiServer} from '../settings/constants';
const endPoint = '/api/basic';
const server = apiServer + endPoint;

const api = {
    read: () =>
        axios.get(server)
            .then(res => res.data)
            .catch(error =>
                console.error(error)
            )
};
export default api;
