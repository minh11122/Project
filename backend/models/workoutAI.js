const Exercise = require('../models/exerciseSchema');
const FitnessProfile = require('../models/fitnessProfileSchema');
const User = require('../models/userSchema');
const Workout = require('../models/workoutSchema');

class WorkoutAI {
  constructor() {
    // Cấu hình mapping cho các mục tiêu tập luyện
    this.goalMuscleMapping = {
      'giảm cân': ['cardio', 'full body', 'core'],
      'tăng cơ': ['chest', 'back', 'shoulders', 'arms', 'legs'],
      'tăng sức mạnh': ['chest', 'back', 'legs', 'shoulders'],
      'duy trì sức khỏe': ['full body', 'cardio', 'core'],
      'cải thiện vóc dáng': ['core', 'legs', 'glutes', 'arms']
    };

    // Cấu hình equipment theo level
    this.equipmentByLevel = {
      'beginner': ['bodyweight', 'dumbbell', 'resistance band'],
      'intermediate': ['bodyweight', 'dumbbell', 'barbell', 'cable', 'machine'],
      'advanced': ['bodyweight', 'dumbbell', 'barbell', 'cable', 'machine', 'kettlebell']
    };

    // Cấu hình volume theo level
    this.volumeByLevel = {
      'beginner': { sets: 2, reps: 10, restTime: 60 },
      'intermediate': { sets: 3, reps: 12, restTime: 45 },
      'advanced': { sets: 4, reps: 15, restTime: 30 }
    };
  }

  // Lấy profile và tạo gợi ý workout
  async generateWorkoutPlan(userId) {
    try {
      // Lấy thông tin user và fitness profile
      const user = await User.findById(userId);
      const fitnessProfile = await FitnessProfile.findOne({ userId });

      if (!user || !fitnessProfile) {
        throw new Error('Không tìm thấy thông tin user hoặc fitness profile');
      }

      // Tạo workout plan
      const workoutPlan = await this.createWorkoutPlan(fitnessProfile);

      return {
        user: {
          name: user.fullname,
          email: user.email
        },
        profile: fitnessProfile,
        workoutPlan: workoutPlan
      };

    } catch (error) {
      console.error('Lỗi khi tạo workout plan:', error);
      throw error;
    }
  }

  // Lưu workout plan vào database
  async saveWorkoutPlan(userId, workoutPlan, nutritionPlan = null) {
    try {
      const fitnessProfile = await FitnessProfile.findOne({ userId });

      if (!fitnessProfile) {
        throw new Error('Không tìm thấy fitness profile');
      }

      // Validate workout plan structure trước khi lưu
      this.validateWorkoutPlanStructure(workoutPlan);

      // Kiểm tra xem đã có workout plan active chưa
      const existingWorkout = await Workout.findOne({
        userId,
        status: 'active'
      });

      if (existingWorkout) {
        // Cập nhật workout plan hiện tại
        existingWorkout.overview = workoutPlan.overview;
        existingWorkout.weeklySchedule = workoutPlan.weeklySchedule;
        if (nutritionPlan) {
          existingWorkout.nutritionPlan = nutritionPlan;
        }
        existingWorkout.updatedAt = new Date();

        await existingWorkout.save();
        return existingWorkout;
      } else {
        // Tạo workout plan mới
        const newWorkout = new Workout({
          userId,
          fitnessProfileId: fitnessProfile._id,
          overview: workoutPlan.overview,
          weeklySchedule: workoutPlan.weeklySchedule,
          nutritionPlan: nutritionPlan || {},
          status: 'active'
        });

        await newWorkout.save();
        return newWorkout;
      }
    } catch (error) {
      console.error('Lỗi khi lưu workout plan:', error);
      throw error;
    }
  }

  // Validate workout plan structure
  validateWorkoutPlanStructure(workoutPlan) {
    if (!workoutPlan || !workoutPlan.overview || !workoutPlan.weeklySchedule) {
      throw new Error('Workout plan structure không hợp lệ');
    }

    // Kiểm tra từng ngày trong weekly schedule
    for (const [day, dayWorkout] of Object.entries(workoutPlan.weeklySchedule)) {
      if (!dayWorkout.focusMuscle) {
        throw new Error(`Ngày ${day} thiếu focusMuscle`);
      }

      if (!dayWorkout.mainWorkout || !Array.isArray(dayWorkout.mainWorkout)) {
        throw new Error(`Ngày ${day} có mainWorkout không hợp lệ`);
      }

      // Kiểm tra từng exercise trong mainWorkout - chỉ cần exerciseId theo schema
      dayWorkout.mainWorkout.forEach((exercise, index) => {
        if (!exercise.exerciseId) {
          throw new Error(`Exercise ${index} trong ngày ${day} thiếu exerciseId`);
        }
      });
    }
  }

  // Lấy workout plan từ database - FIXED
  async getWorkoutPlan(userId) {
    try {
      const workout = await Workout.findOne({
        userId,
        status: 'active'
      })
      if (workout) {
        // Populate sau khi query
        await workout.populate('weeklySchedule.$*.mainWorkout.exerciseId');
      }

      if (!workout) {
        return null;
      }

      return workout;
    } catch (error) {
      console.error('Lỗi khi lấy workout plan:', error);
      throw error;
    }
  }

  // Tạo kế hoạch tập luyện
  async createWorkoutPlan(profile) {
    const { goal, level, groupmuscle, workoutDays, activityLevel } = profile;

    // Lấy danh sách bài tập phù hợp
    const suitableExercises = await this.getSuitableExercises(profile);

    // Tạo lịch tập cho từng ngày
    const weeklySchedule = await this.createWeeklySchedule(
      workoutDays,
      suitableExercises,
      profile
    );

    return {
      overview: {
        goal,
        level,
        targetMuscle: groupmuscle,
        workoutDaysPerWeek: workoutDays.length,
        estimatedDuration: this.calculateTotalDuration(weeklySchedule)
      },
      weeklySchedule
    };
  }

  // Lấy bài tập phù hợp
  async getSuitableExercises(profile) {
    const { goal, level, groupmuscle, activityLevel } = profile;

    // Xác định muscle groups cần tập
    const targetMuscles = this.goalMuscleMapping[goal.toLowerCase()] || [groupmuscle];

    // Xác định equipment phù hợp
    const suitableEquipment = this.equipmentByLevel[level];

    // Query exercises
    const exercises = await Exercise.find({
      level: level,
      equipment: { $in: suitableEquipment },
      $or: [
        { category: { $in: targetMuscles } },
        { category: groupmuscle }
      ]
    });

    // Kiểm tra nếu không tìm thấy exercises
    if (!exercises || exercises.length === 0) {
      console.warn(`Không tìm thấy exercises cho: goal=${goal}, level=${level}, groupmuscle=${groupmuscle}`);

      // Thử tìm exercises với điều kiện ít nghiêm ngặt hơn
      const fallbackExercises = await Exercise.find({
        level: level,
        $or: [
          { category: { $in: targetMuscles } },
          { category: groupmuscle }
        ]
      });

      if (!fallbackExercises || fallbackExercises.length === 0) {
        throw new Error(`Không tìm thấy bài tập phù hợp cho profile: goal=${goal}, level=${level}, groupmuscle=${groupmuscle}`);
      }

      return this.categorizeExercises(fallbackExercises);
    }

    return this.categorizeExercises(exercises);
  }

  // Phân loại bài tập theo muscle group
  categorizeExercises(exercises) {
    const categorized = {};

    if (!exercises || exercises.length === 0) {
      throw new Error('Không có exercises để phân loại');
    }

    exercises.forEach(exercise => {
      if (!exercise.category) {
        console.warn(`Exercise ${exercise.name || exercise._id} không có category`);
        return; // Bỏ qua exercise không có category
      }

      const category = exercise.category.toLowerCase();
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(exercise);
    });

    // Kiểm tra nếu không có category nào
    if (Object.keys(categorized).length === 0) {
      throw new Error('Không có exercises hợp lệ sau khi phân loại');
    }

    return categorized;
  }

  // Tạo lịch tập hàng tuần
  async createWeeklySchedule(workoutDays, exercisesByCategory, profile) {
    const schedule = {};
    const muscleGroups = Object.keys(exercisesByCategory);

    // Kiểm tra nếu không có muscle groups
    if (muscleGroups.length === 0) {
      throw new Error('Không tìm thấy bài tập phù hợp cho profile này');
    }

    for (let i = 0; i < workoutDays.length; i++) {
      const day = workoutDays[i];
      const focusMuscle = muscleGroups[i % muscleGroups.length];

      // Đảm bảo focusMuscle không undefined
      if (!focusMuscle) {
        throw new Error(`Không thể xác định muscle group cho ngày ${day}`);
      }

      schedule[day] = await this.createDayWorkout(
        focusMuscle,
        exercisesByCategory,
        profile
      );
    }

    return schedule;
  }

  // Tạo workout cho 1 ngày
  async createDayWorkout(focusMuscle, exercisesByCategory, profile) {
    const { level, goal, activityLevel } = profile;

    // Đảm bảo focusMuscle có giá trị
    if (!focusMuscle) {
      throw new Error('focusMuscle không được để trống');
    }

    // Chọn exercises cho ngày này
    const mainExercises = this.selectExercisesForDay(
      focusMuscle,
      exercisesByCategory,
      profile
    );

    // Tạo workout structure theo đúng schema
    const workout = {
      focusMuscle: focusMuscle,
      warmUp: await this.getWarmUpExercises(),
      mainWorkout: mainExercises.map(exercise => ({
        exerciseId: exercise._id // Chỉ cần exerciseId theo schema
      })),
      coolDown: await this.getCoolDownExercises(),
      totalDuration: 0
    };

    // Tính tổng thời gian
    workout.totalDuration = this.calculateWorkoutDuration(workout, mainExercises);

    return workout;
  }

  // Thêm method selectExercisesForDay để tránh lỗi
  selectExercisesForDay(focusMuscle, exercisesByCategory, profile) {
    const availableExercises = exercisesByCategory[focusMuscle] || [];

    if (availableExercises.length === 0) {
      // Nếu không có exercises cho muscle group này, lấy từ muscle group khác
      const allExercises = Object.values(exercisesByCategory).flat();
      return this.shuffleArray(allExercises).slice(0, 4);
    }

    // Chọn 4-6 exercises tùy theo level
    const numberOfExercises = {
      'beginner': 4,
      'intermediate': 5,
      'advanced': 6
    };

    const count = numberOfExercises[profile.level] || 4;
    return this.shuffleArray(availableExercises).slice(0, count);
  }

  // Tính số sets
  calculateSets(exercise, volumeConfig, goal) {
    let baseSets = exercise.set || volumeConfig.sets;

    // Điều chỉnh theo goal
    if (goal === 'tăng cơ') baseSets += 1;
    if (goal === 'giảm cân') baseSets -= 1;

    return Math.max(1, baseSets);
  }

  // Tính số reps
  calculateReps(exercise, volumeConfig, goal) {
    let baseReps = exercise.rep || volumeConfig.reps;

    // Điều chỉnh theo goal
    if (goal === 'tăng sức mạnh') baseReps = Math.max(6, baseReps - 3);
    if (goal === 'giảm cân') baseReps += 3;

    return baseReps;
  }

  // Gợi ý trọng lượng
  suggestWeight(exercise, profile) {
    const { level, weight, goal } = profile;

    if (exercise.equipment === 'bodyweight') {
      return 'Trọng lượng cơ thể';
    }

    // Gợi ý trọng lượng cơ bản theo level
    const baseWeight = {
      'beginner': weight * 0.3,
      'intermediate': weight * 0.5,
      'advanced': weight * 0.7
    };

    return `${Math.round(baseWeight[level])}kg (điều chỉnh theo khả năng)`;
  }

  // Lấy bài tập khởi động
  async getWarmUpExercises() {
    // Trả về mảng các bài tập warmup theo schema
    return [
      {
        name: "Xoay khớp vai",
        description: "Xoay tròn hai vai để làm nóng khớp vai.",
        duration: 30
      },
      {
        name: "Xoay cổ tay",
        description: "Xoay cổ tay để làm nóng khớp cổ tay.",
        duration: 30
      }
    ];
  }

  // Lấy bài tập thư giãn
  async getCoolDownExercises() {
    // Trả về mảng các bài tập cooldown theo schema
    return [
      {
        name: "Giãn cơ tay sau",
        description: "Giãn cơ tay sau khi tập luyện.",
        duration: 30
      },
      {
        name: "Giãn cơ vai",
        description: "Giãn cơ vai sau khi tập luyện.",
        duration: 30
      }
    ];
  }

  // Tính thời gian workout - cập nhật để phù hợp với schema
  calculateWorkoutDuration(workout, mainExercises = []) {
    const warmUpTime = workout.warmUp.reduce((sum, ex) => sum + ex.duration, 0);
    const coolDownTime = workout.coolDown.reduce((sum, ex) => sum + ex.duration, 0);

    // Tính thời gian mainWorkout dựa trên exercises
    const mainWorkoutTime = mainExercises.reduce((sum, exercise) => {
      const sets = exercise.set || 3;
      const reps = exercise.rep || 12;
      const restTime = 60; // giây
      const exerciseTime = (sets * reps * 3) + (sets * restTime);
      return sum + Math.round(exerciseTime / 60);
    }, 0);

    return warmUpTime + mainWorkoutTime + coolDownTime;
  }

  // Tính tổng thời gian trong tuần
  calculateTotalDuration(weeklySchedule) {
    return Object.values(weeklySchedule).reduce((total, day) => {
      return total + day.totalDuration;
    }, 0);
  }

  // Utility function: shuffle array
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Lấy gợi ý dinh dưỡng
  async getNutritionSuggestions(profile) {
    const { goal, weight, height, activityLevel } = profile;

    // Tính BMR (Basal Metabolic Rate)
    const bmr = this.calculateBMR(weight, height, profile.gender);

    // Tính TDEE (Total Daily Energy Expenditure)
    const tdee = this.calculateTDEE(bmr, activityLevel);

    // Điều chỉnh calories theo goal
    let targetCalories = tdee;
    if (goal === 'giảm cân') targetCalories *= 0.8;
    if (goal === 'tăng cơ') targetCalories *= 1.1;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      macros: this.calculateMacros(targetCalories, goal),
      suggestions: this.getEatingTips(goal)
    };
  }

  // Tính BMR
  calculateBMR(weight, height, gender) {
    // Công thức Mifflin-St Jeor
    const age = 25; // Giả định tuổi mặc định

    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }

  // Tính TDEE
  calculateTDEE(bmr, activityLevel) {
    const multipliers = {
      'sedentary': 1.2,
      'lightly active': 1.375,
      'moderately active': 1.55,
      'very active': 1.725,
      'extremely active': 1.9
    };

    return bmr * (multipliers[activityLevel] || 1.375);
  }

  // Tính macro nutrients
  calculateMacros(calories, goal) {
    let protein, carbs, fat;

    switch (goal) {
      case 'tăng cơ':
        protein = 0.3;
        carbs = 0.4;
        fat = 0.3;
        break;
      case 'giảm cân':
        protein = 0.4;
        carbs = 0.3;
        fat = 0.3;
        break;
      default:
        protein = 0.25;
        carbs = 0.45;
        fat = 0.3;
    }

    return {
      protein: Math.round((calories * protein) / 4),
      carbs: Math.round((calories * carbs) / 4),
      fat: Math.round((calories * fat) / 9)
    };
  }

  // Gợi ý ăn uống
  getEatingTips(goal) {
    const tips = {
      'giảm cân': [
        'Ăn nhiều rau xanh và protein',
        'Hạn chế carbs vào buổi tối',
        'Uống nhiều nước',
        'Ăn nhiều bữa nhỏ trong ngày'
      ],
      'tăng cơ': [
        'Ăn đủ protein (1.6-2g/kg thể trọng)',
        'Bổ sung carbs sau tập',
        'Không bỏ bữa',
        'Ăn trước và sau khi tập'
      ],
      'duy trì sức khỏe': [
        'Ăn cân bằng các nhóm chất',
        'Hạn chế đồ ăn chế biến',
        'Ăn nhiều trái cây',
        'Uống đủ nước mỗi ngày'
      ]
    };

    return tips[goal] || tips['duy trì sức khỏe'];
  }

  // API endpoint chính
  async getCompleteRecommendation(userId) {
    try {
      const workoutPlan = await this.generateWorkoutPlan(userId);
      const nutritionPlan = await this.getNutritionSuggestions(workoutPlan.profile);

      // Debug: Kiểm tra dữ liệu trước khi lưu
      console.log('Debug - Workout Plan Structure:', {
        overview: workoutPlan.workoutPlan.overview,
        weeklyScheduleKeys: Object.keys(workoutPlan.workoutPlan.weeklySchedule),
        sampleDay: workoutPlan.workoutPlan.weeklySchedule[Object.keys(workoutPlan.workoutPlan.weeklySchedule)[0]]
      });

      // Lưu workout plan vào database
      const savedWorkout = await this.saveWorkoutPlan(userId, workoutPlan.workoutPlan, nutritionPlan);

      return {
        success: true,
        data: {
          ...workoutPlan,
          nutritionPlan,
          workoutId: savedWorkout._id
        }
      };
    } catch (error) {
      console.error('Error in getCompleteRecommendation:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Tạo và lưu workout plan mới
  async createAndSaveWorkoutPlan(userId) {
    try {
      const workoutPlan = await this.generateWorkoutPlan(userId);
      const nutritionPlan = await this.getNutritionSuggestions(workoutPlan.profile);

      // Lưu workout plan vào database
      const savedWorkout = await this.saveWorkoutPlan(userId, workoutPlan.workoutPlan, nutritionPlan);

      return {
        success: true,
        data: {
          ...workoutPlan,
          nutritionPlan,
          workoutId: savedWorkout._id
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = WorkoutAI;