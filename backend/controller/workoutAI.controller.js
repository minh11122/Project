const WorkoutAI = require('../models/workoutAI');
const FitnessProfile = require('../models/fitnessProfileSchema');
const User = require('../models/userSchema');
const Exercise = require('../models/exerciseSchema');
const Workout = require('../models/workoutSchema');

class WorkoutController {
  constructor() {
    this.workoutAI = new WorkoutAI();
  }

  // Lấy gợi ý workout plan đầy đủ
  async getCompleteRecommendation(req, res) {
    try {
      const { userId } = req.params;
      
      // Validate userId
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      const recommendation = await this.workoutAI.getCompleteRecommendation(userId);
      
      if (!recommendation.success) {
        return res.status(404).json({
          success: false,
          message: recommendation.error
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Workout recommendation generated and saved successfully',
        data: recommendation.data
      });

    } catch (error) {
      console.error('Error in getCompleteRecommendation:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Lấy workout plan từ database
  async getWorkoutPlan(req, res) {
    try {
      const { userId } = req.params;
      
      // Validate userId
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      let workout = await this.workoutAI.getWorkoutPlan(userId);
      if (!workout) {
        return res.status(404).json({
          success: false,
          message: 'No active workout plan found'
        });
      }

      // Populate mainWorkout for each day
      const schedule = workout.weeklySchedule || (workout.workoutPlan && workout.workoutPlan.weeklySchedule);
      if (schedule) {
        for (const day of Object.keys(schedule)) {
          if (schedule[day] && Array.isArray(schedule[day].mainWorkout)) {
            schedule[day].mainWorkout = await Promise.all(
              schedule[day].mainWorkout.map(async (item) => {
                const exerciseId = item.exerciseId?._id || item.exerciseId || item._id;
                const ex = await Exercise.findById(exerciseId);
                if (!ex) return { exerciseId };
                return {
                  exerciseId,
                  name: ex.name,
                  imageUrl: ex.imageUrl,
                  description: ex.description,
                  category: ex.category,
                  equipment: ex.equipment,
                  level: ex.level,
                  huongDan: ex.huongDan,
                  set: ex.set,
                  rep: ex.rep,
                  duration: ex.duration,
                  videoUrl: ex.videoUrl
                };
              })
            );
          }
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Workout plan retrieved successfully',
        data: workout
      });

    } catch (error) {
      console.error('Error in getWorkoutPlan:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Tạo workout plan mới
  async generateWorkoutPlan(req, res) {
    try {
      const { userId } = req.params;
      
      // Validate userId
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      const result = await this.workoutAI.createAndSaveWorkoutPlan(userId);
      
      if (!result.success) {
        return res.status(404).json({
          success: false,
          message: result.error
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Workout plan generated and saved successfully',
        data: result.data
      });

    } catch (error) {
      console.error('Error in generateWorkoutPlan:', error);
      
      if (error.message.includes('Không tìm thấy')) {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Lấy gợi ý dinh dưỡng
  async getNutritionSuggestions(req, res) {
    try {
      const { userId } = req.params;
      
      // Validate userId
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      const fitnessProfile = await FitnessProfile.findOne({ userId });
      
      if (!fitnessProfile) {
        return res.status(404).json({
          success: false,
          message: 'Fitness profile not found'
        });
      }

      const nutritionPlan = await this.workoutAI.getNutritionSuggestions(fitnessProfile);
      
      return res.status(200).json({
        success: true,
        message: 'Nutrition suggestions generated successfully',
        data: nutritionPlan
      });

    } catch (error) {
      console.error('Error in getNutritionSuggestions:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Lấy workout cho ngày cụ thể
  async getDayWorkout(req, res) {
    try {
      const { userId, day } = req.params;
      
      // Validate input
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      const validDays = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];
      if (!validDays.includes(day.toUpperCase())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid day format. Use: CHỦ NHẬT, THỨ HAI, THỨ BA, THỨ TƯ, THỨ NĂM, THỨ SÁU, THỨ BẢY'
        });
      }

      const workoutPlan = await this.workoutAI.generateWorkoutPlan(userId);
      const dayWorkout = workoutPlan.workoutPlan.weeklySchedule[day.toUpperCase()];
      
      if (!dayWorkout) {
        return res.status(404).json({
          success: false,
          message: `No workout scheduled for ${day}`
        });
      }

      return res.status(200).json({
        success: true,
        message: `Workout for ${day} retrieved successfully`,
        data: {
          day: day.toUpperCase(),
          workout: dayWorkout
        }
      });

    } catch (error) {
      console.error('Error in getDayWorkout:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Lấy danh sách exercises phù hợp
  async getSuitableExercises(req, res) {
    try {
      const { userId } = req.params;
      const { category, level, equipment } = req.query;
      
      // Validate userId
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      const fitnessProfile = await FitnessProfile.findOne({ userId });
      
      if (!fitnessProfile) {
        return res.status(404).json({
          success: false,
          message: 'Fitness profile not found'
        });
      }

      const suitableExercises = await this.workoutAI.getSuitableExercises(fitnessProfile);
      
      // Filter theo query params nếu có
      let filteredExercises = suitableExercises;
      
      if (category) {
        filteredExercises = { [category]: suitableExercises[category] || [] };
      }

      return res.status(200).json({
        success: true,
        message: 'Suitable exercises retrieved successfully',
        data: {
          profile: {
            level: fitnessProfile.level,
            goal: fitnessProfile.goal,
            targetMuscle: fitnessProfile.groupmuscle
          },
          exercises: filteredExercises
        }
      });

    } catch (error) {
      console.error('Error in getSuitableExercises:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Cập nhật workout plan với custom exercises
  async updateWorkoutPlan(req, res) {
    try {
      const { userId } = req.params;
      const { day, exercises } = req.body;
      
      // Validate input
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      if (!day || !exercises || !Array.isArray(exercises)) {
        return res.status(400).json({
          success: false,
          message: 'Day and exercises array are required'
        });
      }

      const fitnessProfile = await FitnessProfile.findOne({ userId });
      
      if (!fitnessProfile) {
        return res.status(404).json({
          success: false,
          message: 'Fitness profile not found'
        });
      }

      // Tạo custom workout cho ngày đó
      const volumeConfig = this.workoutAI.volumeByLevel[fitnessProfile.level];
      
      const customWorkout = {
        focusMuscle: 'custom',
        warmUp: await this.workoutAI.getWarmUpExercises(),
        mainWorkout: exercises.map(exerciseId => {
          // Tìm exercise trong database
          return Exercise.findById(exerciseId);
        }),
        coolDown: await this.workoutAI.getCoolDownExercises(),
        totalDuration: 0
      };

      // Resolve promises
      customWorkout.mainWorkout = await Promise.all(customWorkout.mainWorkout);
      
      // Tính toán sets, reps, weight
      customWorkout.mainWorkout = customWorkout.mainWorkout.map(exercise => ({
        ...exercise.toObject(),
        sets: this.workoutAI.calculateSets(exercise, volumeConfig, fitnessProfile.goal),
        reps: this.workoutAI.calculateReps(exercise, volumeConfig, fitnessProfile.goal),
        restTime: volumeConfig.restTime,
        weight: this.workoutAI.suggestWeight(exercise, fitnessProfile)
      }));

      // Tính tổng thời gian
      customWorkout.totalDuration = this.workoutAI.calculateWorkoutDuration(customWorkout);

      return res.status(200).json({
        success: true,
        message: 'Custom workout created successfully',
        data: {
          day: day.toUpperCase(),
          workout: customWorkout
        }
      });

    } catch (error) {
      console.error('Error in updateWorkoutPlan:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Lấy thống kê workout
  async getWorkoutStats(req, res) {
    try {
      const { userId } = req.params;
      
      // Validate userId
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      const user = await User.findById(userId);
      const fitnessProfile = await FitnessProfile.findOne({ userId });
      
      if (!user || !fitnessProfile) {
        return res.status(404).json({
          success: false,
          message: 'User or fitness profile not found'
        });
      }

      const workoutPlan = await this.workoutAI.generateWorkoutPlan(userId);
      
      // Tính toán stats
      const stats = {
        profile: {
          name: user.fullname,
          goal: fitnessProfile.goal,
          level: fitnessProfile.level,
          workoutDaysPerWeek: fitnessProfile.workoutDays.length
        },
        weekly: {
          totalWorkouts: Object.keys(workoutPlan.workoutPlan.weeklySchedule).length,
          totalDuration: workoutPlan.workoutPlan.overview.estimatedDuration,
          averageDurationPerWorkout: Math.round(
            workoutPlan.workoutPlan.overview.estimatedDuration / 
            Object.keys(workoutPlan.workoutPlan.weeklySchedule).length
          )
        },
        exercises: {
          totalExercises: Object.values(workoutPlan.workoutPlan.weeklySchedule)
            .reduce((total, day) => total + day.mainWorkout.length, 0),
          muscleGroups: [...new Set(
            Object.values(workoutPlan.workoutPlan.weeklySchedule)
              .map(day => day.focusMuscle)
          )]
        }
      };

      return res.status(200).json({
        success: true,
        message: 'Workout statistics retrieved successfully',
        data: stats
      });

    } catch (error) {
      console.error('Error in getWorkoutStats:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Regenerate workout plan
  async regenerateWorkoutPlan(req, res) {
    try {
      const { userId } = req.params;
      const { preferences } = req.body;
      
      // Validate userId
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      // Tạo workout plan mới
      const newWorkoutPlan = await this.workoutAI.generateWorkoutPlan(userId);
      
      return res.status(200).json({
        success: true,
        message: 'Workout plan regenerated successfully',
        data: newWorkoutPlan
      });

    } catch (error) {
      console.error('Error in regenerateWorkoutPlan:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Validate workout completion
  async validateWorkoutCompletion(req, res) {
    try {
      const { userId } = req.params;
      const { day, completedExercises, duration } = req.body;
      
      // Validate input
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      if (!day || !completedExercises || !Array.isArray(completedExercises)) {
        return res.status(400).json({
          success: false,
          message: 'Day and completed exercises are required'
        });
      }

      const workoutPlan = await this.workoutAI.generateWorkoutPlan(userId);
      const dayWorkout = workoutPlan.workoutPlan.weeklySchedule[day.toUpperCase()];
      
      if (!dayWorkout) {
        return res.status(404).json({
          success: false,
          message: `No workout scheduled for ${day}`
        });
      }

      // Tính toán completion stats
      const totalExercises = dayWorkout.mainWorkout.length;
      const completedCount = completedExercises.length;
      const completionRate = Math.round((completedCount / totalExercises) * 100);
      
      const result = {
        day: day.toUpperCase(),
        completionRate,
        totalExercises,
        completedExercises: completedCount,
        plannedDuration: dayWorkout.totalDuration,
        actualDuration: duration || 0,
        status: completionRate >= 80 ? 'completed' : 'partial'
      };

      return res.status(200).json({
        success: true,
        message: 'Workout completion validated successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in validateWorkoutCompletion:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Cập nhật trạng thái workout plan
  async updateWorkoutStatus(req, res) {
    try {
      const { userId } = req.params;
      const { status } = req.body;
      
      // Validate input
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      if (!status || !['active', 'completed', 'paused'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Use: active, completed, or paused'
        });
      }

      const workout = await Workout.findOne({ userId, status: 'active' });
      
      if (!workout) {
        return res.status(404).json({
          success: false,
          message: 'No active workout plan found'
        });
      }

      workout.status = status;
      await workout.save();

      return res.status(200).json({
        success: true,
        message: 'Workout status updated successfully',
        data: { status: workout.status }
      });

    } catch (error) {
      console.error('Error in updateWorkoutStatus:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Lấy lịch sử workout plans
  async getWorkoutHistory(req, res) {
    try {
      const { userId } = req.params;
      
      // Validate userId
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      const workouts = await Workout.find({ userId })
        .sort({ createdAt: -1 })
        .populate('fitnessProfileId');

      return res.status(200).json({
        success: true,
        message: 'Workout history retrieved successfully',
        data: workouts
      });

    } catch (error) {
      console.error('Error in getWorkoutHistory:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
}

// Export the class, not an instance
module.exports = WorkoutController;