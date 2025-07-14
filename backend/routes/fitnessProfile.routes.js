const express = require('express');
const router = express.Router();
const fitnessProfileController = require('../controller/fitnessProfile.controller');
const { authenticateToken } = require('../middleware/auth.middeware');

// POST /api/fitness-profile
router.post('/fitness-profile', authenticateToken, fitnessProfileController.createFitnessProfile);

// GET /api/fitness-profile/:userId
router.get('/get-fitness-profile', authenticateToken, fitnessProfileController.getFitnessProfileByUserId);

module.exports = router;