const express = require('express');
const router = express.Router();
const  authController  = require('../controller/authController');

// Public routes 
router.post('/auth/signin', authController.login);
router.post('/auth/signin-google', authController.loginWithGoogle);

module.exports = router;