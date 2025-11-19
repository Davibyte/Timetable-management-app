const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// Get user profile
router.get('/profile', userController.getProfile);

// Update user profile
router.put('/profile', userController.updateProfile);

// Admin only routes
router.get('/', restrictTo('admin'), userController.getAllUsers);
router.get('/:id', restrictTo('admin'), userController.getUserById);
router.put('/:id', restrictTo('admin'), userController.updateUser);
router.delete('/:id', restrictTo('admin'), userController.deleteUser);
router.patch('/:id/activate', restrictTo('admin'), userController.activateUser);
router.patch('/:id/deactivate', restrictTo('admin'), userController.deactivateUser);

module.exports = router;