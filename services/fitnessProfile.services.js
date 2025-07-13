import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://project-xnuq.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const fitnessProfileServices = {
  createFitnessProfile: async (profileData) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Chưa đăng nhập');
      }

      const response = await api.post('/fitness-profile', profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo hồ sơ:', error.response?.data || error.message);
      throw error.response?.data || { message: 'Lỗi không xác định' };
    }
  },
};

export default fitnessProfileServices;
