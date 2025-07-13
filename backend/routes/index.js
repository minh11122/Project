const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const exerciseRoutes = require('./exercise.routes');
const fitnessProfileRoutes = require('./fitnessProfile.routes');

router.use(userRoutes);
router.use(authRoutes); 
router.use(exerciseRoutes);
router.use(fitnessProfileRoutes);

module.exports = router;