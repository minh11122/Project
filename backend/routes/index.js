const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const fitnessProfileRoutes = require('./fitnessProfile.routes');


router.use(authRoutes); 
router.use(fitnessProfileRoutes);


module.exports = router;