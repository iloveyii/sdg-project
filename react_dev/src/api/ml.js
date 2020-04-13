import axios from 'axios';
import {apiServer} from '../settings/constants';
const endPoint = '';
const server = 'http://localhost:9091/ml.php';

const api = {
    read: () =>
        axios.get(server)
            .then(res => res.data)
            .catch(error =>
                console.error(error)
            )
};
export default api;
