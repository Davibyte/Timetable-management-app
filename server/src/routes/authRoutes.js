const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

// Protected routes
router.post('/logout', protect, authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.get('/me', protect, authController.getCurrentUser);
router.put('/update-password', protect, authController.updatePassword);

module.exports = router;