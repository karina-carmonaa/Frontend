import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://agemed.test',
    //withCredentials: true,
    headers: {'Content-Type': 'application/vnd.api+json'}
});


export default apiClient;