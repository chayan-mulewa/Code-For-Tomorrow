// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/reset-password', authController.resetPassword);
// router.post('/logout', authController.logout);

module.exports = router;