const mongoose = require('mongoose');

const fitnessProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gender: { type: String, required: true },
  groupmuscle: { type: String, required: true },
  goal: { type: String, required: true },
  motivation: { type: String, required: true },
  workoutDays: {
    type: [String],
    enum: ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'],
    default: [],
  },
  workoutDaysPerWeek: { type: Number, min: 1, max: 7 },
  activityLevel: { type: String, required: true },
  level: { type: String, required: true },
  weight: { type: Number, min: 0 },
  height: { type: Number, min: 0 }
},
  { timestamps: true }
);
module.exports = mongoose.model('FitnessProfile', fitnessProfileSchema);
