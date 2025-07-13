import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://project-xnuq.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers before each request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Get user by ID from token
const getUserById = async () => {
  try {
    const response = await api.get('/user/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export default {
  getUserById,
};
