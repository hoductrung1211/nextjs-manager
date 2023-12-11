import axios from 'axios';
 
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;

axios.defaults.baseURL = "https://localhost:44313/api/";

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = 'Bearer ' + token;
    return config;
});

export default axios;

export interface IErrorResponse {
    errorMessages: string[]
}
