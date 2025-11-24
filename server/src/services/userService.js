const User = require('../models/userModel');

// Get all users with pagination and filters
const getAllUsers = async ({ page = 1, limit = 10, role, search }) => {
    const query = {};

    // Filter by role
    if (role) {
        query.role = role;
    }

    // Search by name or email
    if (search) {
        query.$or = [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
        User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        User.countDocuments(query)
    ]);

    return {
        users,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    };
}

// Get user by ID
const getUserById = async (userId) => {
    const user = await User.findById(userId).select('-password');

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

// Update user
const updateUser = async (userId, updates) => {
    // Remove fields that shouldn't be updated this way
    delete updates.password;
    delete updates.role; // Role should be updated separately with proper authorization
    delete updates.isEmailVerified;

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

// Delete user
const deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

// Get users by role
const getUsersByRole = async (role) => {
    return await User.find({ role, isActive: true }).select('-password');
}

// Get user statistics
const getUserStats = async () => {
    const stats = await User.aggregate([
        {
            $group: {
                _id: '$role',
                count: { $sum: 1 }
            }
        }
    ]);

    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const verifiedUsers = await User.countDocuments({ isEmailVerified: true });

    return {
        total: totalUsers,
        active: activeUsers,
        verified: verifiedUsers,
        byRole: stats
    };
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUsersByRole,
    getUserStats
};