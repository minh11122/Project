const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const fitnessProfileRoutes = require('./fitnessProfile.routes');

router.use(userRoutes);
router.use(authRoutes); 
router.use(fitnessProfileRoutes);

module.exports = router;