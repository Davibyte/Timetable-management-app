const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const emailService = require('./emailService');
const { getRedisClient } = require('../config/redis');

// Generate JWT token
const generateToken = (userId, expiresIn = process.env.JWT_EXPIRE || '7d') => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });
};

// Generate refresh token
const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Verify token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

// Register new user
const register = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new Error('Email already registered');

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    const user = await User.create({
        ...userData,
        emailVerificationToken: hashedToken,
        emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
    await emailService.sendVerificationEmail(user.email, user.firstName, verificationUrl);

    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return { user, accessToken, refreshToken };
};

// Login user
const login = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error('Invalid email or password');
    if (!user.isActive) throw new Error('Your account has been deactivated. Please contact support.');

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new Error('Invalid email or password');

    user.lastLogin = new Date();
    await user.save();
    user.password = undefined;

    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return { user, accessToken, refreshToken };
};

// Logout user
const logout = async (token) => {
    try {
        const redisClient = getRedisClient();
        if (redisClient) {
            const decoded = verifyToken(token);
            const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
            if (expiresIn > 0) await redisClient.setEx(`blacklist:${token}`, expiresIn, 'true');
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
};

// Forgot password
const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) return;

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await emailService.sendPasswordResetEmail(user.email, user.firstName, resetUrl);
};

// Reset password
const resetPassword = async (token, newPassword) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) throw new Error('Invalid or expired reset token');

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    await emailService.sendPasswordChangeConfirmation(user.email, user.firstName);
};

// Verify email
const verifyEmail = async (token) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) throw new Error('Invalid or expired verification token');

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();
};

// Refresh token
const refreshToken = async (refreshTokenValue) => {
    const decoded = verifyToken(refreshTokenValue);
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) throw new Error('User not found or inactive');

    const newAccessToken = generateToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

// Get user by ID
const getUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    return user;
};

// Update password
const updatePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId).select('+password');
    if (!user) throw new Error('User not found');

    const isPasswordCorrect = await user.comparePassword(currentPassword);
    if (!isPasswordCorrect) throw new Error('Current password is incorrect');

    user.password = newPassword;
    await user.save();

    await emailService.sendPasswordChangeConfirmation(user.email, user.firstName);
};

// Check if token is blacklisted
const isTokenBlacklisted = async (token) => {
    try {
        const redisClient = getRedisClient();
        if (!redisClient) return false;
        const isBlacklisted = await redisClient.get(`blacklist:${token}`);
        return !!isBlacklisted;
    } catch (error) {
        console.error('Error checking token blacklist:', error);
        return false;
    }
};

module.exports = {
    generateToken,
    generateRefreshToken,
    verifyToken,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    refreshToken,
    getUserById,
    updatePassword,
    isTokenBlacklisted
};

