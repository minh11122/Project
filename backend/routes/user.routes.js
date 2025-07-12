const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { authenticateToken } = require('../middleware/auth.middeware');

router.get('/user/me', authenticateToken, userController.getUserById);

module.exports = router;
