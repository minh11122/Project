const express = require('express');
const router = express.Router();
const exercisesController = require('../controller/exercise.controller');

router.use('/exercises', exercisesController.getAllExercises);

module.exports = router;