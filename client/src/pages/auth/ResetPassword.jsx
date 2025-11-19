import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `http://localhost:5000/api/auth/reset-password/${token}`,
                { password: formData.password }
            );

            if (response.data.success) {
                toast.success('Password reset successful! You can now login with your new password.');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Password reset failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const passwordStrength = () => {
        const password = formData.password;
        if (password.length === 0) return { strength: 0, label: '' };
        if (password.length < 6) return { strength: 25, label: 'Weak', color: '#660116' };
        if (password.length < 10) return { strength: 50, label: 'Fair', color: '#8D888B' };
        if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
            return { strength: 100, label: 'Strong', color: '#66C7F4' };
        }
        return { strength: 75, label: 'Good', color: '#66C7F4' };
    };

    const strength = passwordStrength();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] relative overflow-hidden font-['Poppins']">
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wMyIgZD0iTTAgMGgyMHYyMEgweiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-50"></div>

            <div className="w-full max-w-md px-6 relative z-10">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#660116] rounded-2xl mb-4 shadow-md">
                        <span className="text-white text-2xl font-bold font-['Manrope']">TM</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#051D41] mb-2 font-['Manrope']">Reset Password</h1>
                    <p className="text-[#8D888B]">Create a new secure password</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#051D41] mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-[#8D888B]" size={18} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66C7F4] focus:border-transparent transition-all text-[#051D41]"
                                    placeholder="Enter new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="text-[#8D888B] hover:text-[#051D41] transition-colors" size={18} />
                                    ) : (
                                        <FiEye className="text-[#8D888B] hover:text-[#051D41] transition-colors" size={18} />
                                    )}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-[#8D888B]">Password strength:</span>
                                        <span className="text-xs font-medium" style={{ color: strength.color }}>
                                            {strength.label}
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full transition-all duration-300 rounded-full"
                                            style={{
                                                width: `${strength.strength}%`,
                                                backgroundColor: strength.color
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#051D41] mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-[#8D888B]" size={18} />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66C7F4] focus:border-transparent transition-all text-[#051D41]"
                                    placeholder="Confirm new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirmPassword ? (
                                        <FiEyeOff className="text-[#8D888B] hover:text-[#051D41] transition-colors" size={18} />
                                    ) : (
                                        <FiEye className="text-[#8D888B] hover:text-[#051D41] transition-colors" size={18} />
                                    )}
                                </button>
                            </div>

                            {/* Password Match Indicator */}
                            {formData.confirmPassword && (
                                <div className="mt-2 flex items-center">
                                    {formData.password === formData.confirmPassword ? (
                                        <>
                                            <FiCheck className="text-[#66C7F4] mr-2" size={16} />
                                            <span className="text-xs text-[#66C7F4]">Passwords match</span>
                                        </>
                                    ) : (
                                        <span className="text-xs text-[#660116]">Passwords do not match</span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-[#FFD6DA] rounded-lg p-4">
                            <p className="text-sm text-[#660116] font-medium mb-2">Password Requirements:</p>
                            <ul className="text-xs text-[#660116] space-y-1">
                                <li className="flex items-center">
                                    <span className="mr-2">•</span>
                                    At least 6 characters long
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">•</span>
                                    Mix of uppercase and lowercase letters (recommended)
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">•</span>
                                    Include numbers (recommended)
                                </li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#660116] text-white py-3 rounded-lg font-semibold hover:bg-[#4d010f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                            {loading ? 'Resetting Password...' : 'Reset Password'}
                        </button>
                    </form>

                    {/* Back to Login Link */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-[#66C7F4] hover:text-[#051D41] font-semibold transition-colors"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-sm text-[#8D888B]">
                    © 2025 Timetable Management System
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;