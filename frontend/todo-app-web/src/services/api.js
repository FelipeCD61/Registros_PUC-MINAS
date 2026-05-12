import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5218/api', 
});

export default api;