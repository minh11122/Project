import axios from 'axios';

const API_BASE_URL = 'https://project-xnuq.onrender.com/api'; // URL backend thực tế

class ExerciseService {
  static async getExercisesByCategoryAndLevel(category, level) {
    try {
      const response = await axios.get(`${API_BASE_URL}/exercises/category/${category}/level/${level}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw error;
    }
  }

  static async getExerciseById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/exercises/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exercise:', error);
      throw error;
    }
  }

  static async getAllExercises(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.level) params.append('level', filters.level);

      const response = await axios.get(`${API_BASE_URL}/exercises?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all exercises:', error);
      throw error;
    }
  }
}

export default ExerciseService; 