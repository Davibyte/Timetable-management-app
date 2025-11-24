const authService = require('../services/authService');
const { validationResult } = require('express-validator');


// Register new user
const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, role, department, phoneNumber } = req.body;

        // Validate input
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide all required fields'
            });
        }

        const result = await authService.register({
            firstName,
            lastName,
            email,
            password,
            role,
            department,
            phoneNumber
        });

        res.status(201).json({
            status: 'success',
            message: 'Registration successful. Please check your email to verify your account.',
            data: result
        });
    } catch (error) {
        next(error);
    }
}

// Login user
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide email and password'
            });
        }

        const result = await authService.login(email, password);

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: result
        });
    } catch (error) {
        next(error);
    }
}

// Logout user
const logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            await authService.logout(token);
        }

        res.status(200).json({
            status: 'success',
            message: 'Logout successful'
        });
    } catch (error) {
        next(error);
    }
}

// Forgot password
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide your email address'
            });
        }

        await authService.forgotPassword(email);

        res.status(200).json({
            status: 'success',
            message: 'Password reset link sent to your email'
        });
    } catch (error) {
        next(error);
    }
}

// Reset password
const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide a new password'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                status: 'error',
                message: 'Password must be at least 6 characters'
            });
        }

        await authService.resetPassword(token, password);

        res.status(200).json({
            status: 'success',
            message: 'Password reset successful. Please login with your new password.'
        });
    } catch (error) {
        next(error);
    }
}

// Verify email
const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params;

        await authService.verifyEmail(token);

        res.status(200).json({
            status: 'success',
            message: 'Email verified successfully. You can now login.'
        });
    } catch (error) {
        next(error);
    }
}

// Refresh token
const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                status: 'error',
                message: 'Refresh token is required'
            });
        }

        const result = await authService.refreshToken(refreshToken);

        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        next(error);
    }
}

// Get current user
const getCurrentUser = async (req, res, next) => {
    try {
        const user = await authService.getUserById(req.user.id);

        res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
}

// Update password
const updatePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide current and new password'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                status: 'error',
                message: 'New password must be at least 6 characters'
            });
        }

        await authService.updatePassword(req.user.id, currentPassword, newPassword);

        res.status(200).json({
            status: 'success',
            message: 'Password updated successfully'
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    refreshToken,
    getCurrentUser,
    updatePassword
};