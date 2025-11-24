const userService = require('../services/userService');

// Get user profile
const getProfile = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.user.id);

        res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
}

// Update user profile
const updateProfile = async (req, res, next) => {
    try {
        const { firstName, lastName, phoneNumber, department } = req.body;

        const user = await userService.updateUser(req.user.id, {
            firstName,
            lastName,
            phoneNumber,
            department
        });

        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
}

// Get all users (Admin only)
const getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, role, search } = req.query;

        const result = await userService.getAllUsers({
            page: parseInt(page),
            limit: parseInt(limit),
            role,
            search
        });

        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        next(error);
    }
}

// Get user by ID (Admin only)
const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
}

// Update user (Admin only)
const updateUser = async (req, res, next) => {
    try {
        const updates = req.body;
        const user = await userService.updateUser(req.params.id, updates);

        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
}

// Delete user (Admin only)
const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

// Activate user (Admin only)
const activateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, { isActive: true });

        res.status(200).json({
            status: 'success',
            message: 'User activated successfully',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
}

// Deactivate user (Admin only)
const deactivateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, { isActive: false });

        res.status(200).json({
            status: 'success',
            message: 'User deactivated successfully',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    activateUser,
    deactivateUser
};