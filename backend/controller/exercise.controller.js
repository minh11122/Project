const Exercise = require('../models/exerciseSchema');

const getAllExercises = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};
    if (category) {
      filter.category = category;
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





module.exports = {
  getAllExercises,
  listDetailExercises
};
