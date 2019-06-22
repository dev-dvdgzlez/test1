import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:44360/'
});

export default instance;