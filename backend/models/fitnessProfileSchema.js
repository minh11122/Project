const mongoose = require('mongoose');

const fitnessProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gender: { type: String, enum: ['Nam', 'Nữ'], required: true },
  groupmuscle: { type: String, required: true },
  goal: { type: String, required: true },
  motivation: { type: String, required: true },
  workoutDaysPerWeek: { type: Number, min: 1, max: 7 },
  activityLevel: { type: String, required: true, enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'] },
  level: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  weight: { type: Number, min: 0 },
  height: { type: Number, min: 0 }
},
  { timestamps: true }
);
module.exports = mongoose.model('FitnessProfile', fitnessProfileSchema);
