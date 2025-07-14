const express = require('express');
const router = express.Router();
const exercisesController = require('../controller/exercise.controller');

router.get('/exercises', exercisesController.getAllExercises);
router.get('/exercises/category/:category/level/:level', exercisesController.getExercisesByCategoryAndLevel);
router.get('/exercises/:id', exercisesController.getExerciseById);
router.get('/exercises/detail', exercisesController.listDetailExercises);

module.exports = router;