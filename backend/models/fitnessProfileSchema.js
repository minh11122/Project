const mongoose = require('mongoose');

const fitnessProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gender: { type: String, enum: ['Nam', 'Nữ'], required: true }, // ✅ THÊM VÀO
  groupmuscle: { type: String, required: true },
  goal: { type: String, required: true },
  motivation: { type: String, required: true }, // hoặc bạn đổi tên thành motivation nếu muốn rõ hơn
  workoutDaysPerWeek: { type: Number, min: 1, max: 7 },
  activityLevel: { type: String, required: true, enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'] },

  level: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },

  weight: Number, // kilograms
  height: Number, // meters
  bmi: Number,    // sẽ tính tự động
}, {
  timestamps: true,
});

// Tính BMI trước khi lưu
fitnessProfileSchema.pre('save', function (next) {
  if (this.weight && this.height) {
    this.bmi = this.weight / (this.height * this.height);
  }
  next();
});

module.exports = mongoose.model('FitnessProfile', fitnessProfileSchema);
