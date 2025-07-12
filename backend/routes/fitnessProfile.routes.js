const express = require('express');
const router = express.Router();
const fitnessProfileController = require('../controller/fitnessProfile.controller');
const authMiddleware = require('../middleware/auth.middeware');

// POST /api/fitness-profile
router.post('/fitness-profile', fitnessProfileController.createFitnessProfile);

module.exports = router;