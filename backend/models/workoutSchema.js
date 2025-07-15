const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  fitnessProfileId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'FitnessProfile', 
    required: true 
  },
  overview: {
    goal: { type: String, required: true },
    level: { type: String, required: true },
    targetMuscle: { type: String, required: true },
    workoutDaysPerWeek: { type: Number, required: true },
    estimatedDuration: { type: Number, required: true }
  },
  weeklySchedule: {
    type: Map,
    of: {
      focusMuscle: { type: String, required: true },
      warmUp: [{
        name: { type: String, required: true },
        duration: { type: Number, required: true },
        description: { type: String, default: '' }
      }],
      mainWorkout: [{
        exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true }
      }],
      coolDown: [{
        name: { type: String, required: true },
        duration: { type: Number, required: true },
        description: { type: String, default: '' }
      }],
      totalDuration: { type: Number, required: true }
    }
  },
  nutritionPlan: {
    bmr: { type: Number },
    tdee: { type: Number },
    targetCalories: { type: Number },
    macros: {
      protein: { type: Number },
      carbs: { type: Number },
      fat: { type: Number }
    },
    suggestions: [{ type: String }]
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused'],
    default: 'active'
  },
  completionStats: {
    totalWorkouts: { type: Number, default: 0 },
    completedWorkouts: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 },
    averageCompletionRate: { type: Number, default: 0 }
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Workout', workoutSchema); 