const express = require('express');
const router = express.Router();
const WorkoutController = require('../controller/workoutAI.controller');

// Create an instance of the controller
const workoutAIController = new WorkoutController();

// Lấy gợi ý workout plan đầy đủ (tạo mới và lưu vào database)
router.get('/recommendation/:userId', workoutAIController.getCompleteRecommendation.bind(workoutAIController));

// Lấy workout plan từ database
router.get('/workout/:userId', workoutAIController.getWorkoutPlan.bind(workoutAIController));

// Tạo workout plan mới (tạo và lưu vào database)
router.post('/generate/:userId', workoutAIController.generateWorkoutPlan.bind(workoutAIController));

// Lấy gợi ý dinh dưỡng
router.get('/nutrition/:userId', workoutAIController.getNutritionSuggestions.bind(workoutAIController));

// Lấy workout cho ngày cụ thể
router.get('/day/:userId/:day', workoutAIController.getDayWorkout.bind(workoutAIController));

// Lấy danh sách exercises phù hợp
router.get('/exercises/:userId', workoutAIController.getSuitableExercises.bind(workoutAIController));

// Cập nhật workout plan với custom exercises
router.put('/update/:userId', workoutAIController.updateWorkoutPlan.bind(workoutAIController));

// Lấy thống kê workout
router.get('/stats/:userId', workoutAIController.getWorkoutStats.bind(workoutAIController));

// Regenerate workout plan
router.post('/regenerate/:userId', workoutAIController.regenerateWorkoutPlan.bind(workoutAIController));

// Validate workout completion
router.post('/validate/:userId', workoutAIController.validateWorkoutCompletion.bind(workoutAIController));

// Cập nhật trạng thái workout plan
router.put('/status/:userId', workoutAIController.updateWorkoutStatus.bind(workoutAIController));

// Lấy lịch sử workout plans
router.get('/history/:userId', workoutAIController.getWorkoutHistory.bind(workoutAIController));

module.exports = router;