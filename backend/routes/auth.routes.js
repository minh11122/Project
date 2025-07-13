const express = require('express');
const router = express.Router();
const  authController  = require('../controller/auth.controller');

// Public routes 
router.post('/auth/signin', authController.login);
router.post('/auth/signup', authController.register);

module.exports = router;