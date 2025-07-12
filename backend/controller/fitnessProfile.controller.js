const FitnessProfile = require('../models/fitnessProfileSchema');

// POST: /api/fitness-profile
const createFitnessProfile = async (req, res) => {
  try {
    const {
      userId,
      gender,
      groupmuscle,
      goal,
      motivation,
      workoutDaysPerWeek,
      activityLevel,
      level,
      weight,
      height
    } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
      !userId || !gender || !groupmuscle || !goal || !motivation ||
      !workoutDaysPerWeek || !activityLevel || !level || !weight || !height
    ) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ thông tin' });
    }

    // Tạo bản ghi mới
    const newProfile = new FitnessProfile({
      userId,
      gender,
      groupmuscle,
      goal,
      motivation,
      workoutDaysPerWeek,
      activityLevel,
      level,
      weight,
      height,
    });

    // BMI sẽ được tính trong middleware
    const savedProfile = await newProfile.save();

    return res.status(201).json({
      success: true,
      message: 'Tạo hồ sơ thể chất thành công',
      data: savedProfile,
    });
  } catch (error) {
    console.error('Lỗi tạo hồ sơ thể chất:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi tạo hồ sơ thể chất',
    });
  }
};
module.exports = {
  createFitnessProfile,
};
