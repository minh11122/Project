import axios from 'axios';

const api = axios.create({
    baseURL: 'https://project-xnuq.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const auServices = {
    login: async (username, password) => {
        const response = await api.post('/auth/signin', { username, password });
        return response.data;
    },

    register: async ({ email, phone, fullName, password, confirmPassword }) => {
        const response = await api.post('/auth/signup', {
            email,
            phone,
            fullName,
            password,
            confirmPassword
        });
        return response.data;
    },
};

export default auServices;