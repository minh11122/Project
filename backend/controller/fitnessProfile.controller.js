const FitnessProfile = require('../models/fitnessProfileSchema');

const createFitnessProfile = async (req, res) => {
  try {
    const {
      gender,
      groupmuscle,
      goal,
      motivation,
      workoutDaysPerWeek,
      activityLevel,
      level,
      weight,
      height,
    } = req.body;

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Chưa xác thực người dùng' });
    }

    if (
      !gender || !groupmuscle || !goal || !motivation ||
      workoutDaysPerWeek == null || !activityLevel || !level
    ) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ thông tin' });
    }

    const existingProfile = await FitnessProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ success: false, message: 'Bạn đã tạo hồ sơ trước đó' });
    }

    const newProfile = new FitnessProfile({
      userId,
      gender,
      groupmuscle,
      goal,
      motivation,
      workoutDaysPerWeek,
      activityLevel: activityLevel.toLowerCase(),
      level: level.toLowerCase(),
      weight,
      height,
    });

    await newProfile.save();

    return res.status(201).json({
      success: true,
      message: 'Tạo hồ sơ thành công',
      profile: newProfile,
    });
  } catch (error) {
    console.error('Lỗi tạo fitness profile:', error);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
};

module.exports = {
  createFitnessProfile,
};
