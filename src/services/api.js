import axios from 'axios';  

const Api = axios.create({
    baseURL: 'https://backend-gasta-pouco.onrender.com', 
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default Api;
