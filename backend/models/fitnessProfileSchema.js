const mongoose = require('mongoose');

const fitnessProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    groupmuscle: { type: String, required: true },
    goal: { type: String, required: true },
    feedback: { type: String, required: true },
    workoutDaysPerWeek: { type: Number, min: 1, max: 7 },
    level : { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    activityLevel: { type: String, required: true, enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'] },
    weight: Number, //kilograms
    height: Number, //meters
    bmi: weight / (height * height),
},
    { timestamps: true }
);

module.exports = mongoose.model('FitnessProfile', fitnessProfileSchema);