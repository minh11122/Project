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

const getRecommendation = async (userId) => {
  const res = await api.get(`/recommendation/${userId}`);
  return res.data;
};

const getWorkout = async (userId) => {
  const res = await api.get(`/workout/${userId}`);
  return res.data;
};

const generateWorkout = async (userId) => {
  const res = await api.post(`/generate/${userId}`);
  return res.data;
};

const getNutrition = async (userId) => {
  const res = await api.get(`/nutrition/${userId}`);
  return res.data;
};

const getDayWorkout = async (userId, day) => {
  const res = await api.get(`/day/${userId}/${encodeURIComponent(day)}`);
  return res.data;
};

const getSuitableExercises = async (userId, params = {}) => {
  const res = await api.get(`/exercises/${userId}`, { params });
  return res.data;
};

const updateWorkout = async (userId, data) => {
  const res = await api.put(`/update/${userId}`, data);
  return res.data;
};

const getStats = async (userId) => {
  const res = await api.get(`/stats/${userId}`);
  return res.data;
};

const regenerateWorkout = async (userId) => {
  const res = await api.post(`/regenerate/${userId}`);
  return res.data;
};

const validateWorkout = async (userId, data) => {
  const res = await api.post(`/validate/${userId}`, data);
  return res.data;
};

const updateStatus = async (userId, status) => {
  const res = await api.put(`/status/${userId}`, { status });
  return res.data;
};

const getHistory = async (userId) => {
  const res = await api.get(`/history/${userId}`);
  return res.data;
};

export default {
  getRecommendation,
  getWorkout,
  generateWorkout,
  getNutrition,
  getDayWorkout,
  getSuitableExercises,
  updateWorkout,
  getStats,
  regenerateWorkout,
  validateWorkout,
  updateStatus,
  getHistory,
};
