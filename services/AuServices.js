import { URI_API } from '@env';

const api = axios.create({
    baseURL: URI_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

const auServices = {
    login: async (username, password) => {
        const response = await api.post('/api/auth/signin', { username, password });
        return response.data;
    },
};

export default auServices;