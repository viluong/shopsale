import axios from 'axios';
import { store } from '../store/index';


const instance = axios.create({
    baseURL: 'http://localhost:8001/api'
});

instance.interceptors.request.use(function (config) {
    const token = store.getState().auth.token;

    if (token) {
        config.headers.Authorization =  'Bearer ' + token;
    }
    return config;
});


export default instance;