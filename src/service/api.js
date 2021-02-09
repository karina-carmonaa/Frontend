import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
    headers: {'Content-Type': 'application/vnd.api+json'
    }//, 'X-CSRF-TOKEN': response.data.csrfToken }
});


export default apiClient;