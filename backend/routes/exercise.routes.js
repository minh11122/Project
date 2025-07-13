const express = require('express');
const router = express.Router();
const exercisesController = require('../controller/exercise.controller');

router.get('/exercises', exercisesController.getAllExercises);
router.get('/exercises/detail', exercisesController.listDetailExercises);
module.exports = router;