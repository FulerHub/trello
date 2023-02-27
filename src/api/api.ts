import axios, {AxiosRequestConfig} from 'axios';

export const API_URL = `${process.env.REACT_APP_URL_SERVER}/api`;

const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

export default instance;