import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7777/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

const auServices = {
    login: async (username, password) => {
        const response = await api.post('/signin', { username, password });
        return response.data;
    },
};

export default auServices;