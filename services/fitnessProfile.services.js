// services/fitnessProfileServices.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://project-xnuq.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const fitnessProfileServices = {
  createProfile: async (profileData) => {
    const token = await AsyncStorage.getItem('token');

    const response = await api.post('/fitness-profile', profileData, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Gửi token vào backend
      },
    });

    return response.data;
  },
};

export default fitnessProfileServices;
