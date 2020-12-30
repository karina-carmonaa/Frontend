import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://agemed.test',
    //withCredentials: true,
    headers: {'Content-Type': 'application/vnd.api+json',
    'X-Requested-With': 'XMLHttpRequest'
    }//, 'X-CSRF-TOKEN': response.data.csrfToken }
});


export default apiClient;