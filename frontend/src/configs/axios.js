import axios from 'axios';
import cookie from 'react-cookies'

const instance = axios.create({
    baseURL: process.env.API_URL
});

instance.interceptors.request.use(function (config) {
    const token = cookie.load('token');
    if (token) {
        config.headers.Authorization =  'Bearer ' + token;
    }
    return config;
});


export default instance;