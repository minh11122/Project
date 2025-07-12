import axios from 'axios';

const api = axios.create({
    baseURL: 'https://project-xnuq.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const userServices = {

};

export default userServices;