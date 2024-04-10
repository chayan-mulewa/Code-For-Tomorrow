// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.get('/profile', authMiddleware, userController.getUserProfile);

// router.post('/profile', userController.getUserProfile);

module.exports = router;
