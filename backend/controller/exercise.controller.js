const Exercise = require('../models/exerciseSchema');

const getAllExercises = async (req, res) => {
  try {
    const { category, level } = req.query;

    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (level) {
      filter.level = level;
    }

    const exercises = await Exercise.find(filter);
    res.status(200).json({ success: true, data: exercises });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bài tập:', error);
    res.status(500).json({ success: false, message: 'Lỗi server khi lấy bài tập' });
  }
};




const listDetailExercises = async (req, res) => {
  try {
    const { categories, equipment, level } = req.query;

    const filter = {};

    // Lọc theo nhiều categories (dùng dấu phẩy ngăn cách)
    if (categories) {
      const categoryArray = categories.split(',').map(c => c.trim());
      filter.category = { $in: categoryArray };
    }

    // Lọc theo thiết bị
    if (equipment) {
      filter.equipment = equipment;
    }

    // Lọc theo trình độ
    if (level) {
      filter.level = level;
    }

    const exercises = await Exercise.find(filter);

    res.status(200).json({
      success: true,
      data: exercises,
    });
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách chi tiết bài tập:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy bài tập',
    });
  }
};





const getExercisesByCategoryAndLevel = async (req, res) => {
  try {
    const { category, level } = req.params;

    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (level) {
      filter.level = level;
    }

    const exercises = await Exercise.find(filter);
    res.status(200).json({ 
      success: true, 
      data: exercises,
      filters: { category, level }
    });
  } catch (error) {
    console.error('Lỗi khi lấy bài tập theo category và level:', error);
    res.status(500).json({ success: false, message: 'Lỗi server khi lấy bài tập' });
  }
};

const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findById(id);
    
    if (!exercise) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài tập' });
    }
    
    res.status(200).json({ success: true, data: exercise });
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết bài tập:', error);
    res.status(500).json({ success: false, message: 'Lỗi server khi lấy bài tập' });
  }
};

module.exports = {
  getAllExercises,
  getExercisesByCategoryAndLevel,
  getExerciseById,
  listDetailExercises
};
