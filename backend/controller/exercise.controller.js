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

module.exports = {
  getAllExercises,
};
