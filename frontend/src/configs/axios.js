import axios from 'axios';
import cookie from 'react-cookies'

const instance = axios.create({
    baseURL: 'http://localhost:8001/api'
});

instance.interceptors.request.use(function (config) {
    const token = cookie.load('token');
    if (token) {
        config.headers.Authorization =  'Bearer ' + token;
    }
    return config;
});


export default instance;