import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });

            if (response.data.success) {
                setEmailSent(true);
                toast.success('Password reset link sent to your email!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] relative overflow-hidden font-['Poppins']">
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wMyIgZD0iTTAgMGgyMHYyMEgweiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-50"></div>

            <div className="w-full max-w-md px-6 relative z-10">
                {/* Back Button */}
                <Link
                    to="/login"
                    className="inline-flex items-center text-[#66C7F4] hover:text-[#051D41] mb-6 transition-colors font-medium"
                >
                    <FiArrowLeft className="mr-2" size={18} />
                    Back to Login
                </Link>

                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#660116] rounded-2xl mb-4 shadow-md">
                        <span className="text-white text-2xl font-bold font-['Manrope']">TM</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#051D41] mb-2 font-['Manrope']">Forgot Password?</h1>
                    <p className="text-[#8D888B]">
                        {emailSent
                            ? 'Check your email for reset instructions'
                            : 'Enter your email to receive a reset link'}
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                    {!emailSent ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#051D41] mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="text-[#8D888B]" size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66C7F4] focus:border-transparent transition-all text-[#051D41]"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#660116] text-white py-3 rounded-lg font-semibold hover:bg-[#4d010f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-4">
                            {/* Success State */}
                            <div className="w-16 h-16 bg-[#FFD6DA] rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiMail className="text-[#660116]" size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-[#051D41] mb-2">Check Your Email</h3>
                            <p className="text-[#8D888B] mb-6">
                                We've sent a password reset link to <span className="font-semibold text-[#051D41]">{email}</span>
                            </p>
                            <div className="bg-[#FFD6DA] rounded-lg p-4 mb-6">
                                <p className="text-sm text-[#660116]">
                                    <strong>Didn't receive the email?</strong> Check your spam folder or{' '}
                                    <button
                                        onClick={() => setEmailSent(false)}
                                        className="underline hover:no-underline font-semibold"
                                    >
                                        try again
                                    </button>
                                </p>
                            </div>
                            <Link
                                to="/login"
                                className="text-[#66C7F4] hover:text-[#051D41] font-semibold transition-colors"
                            >
                                Return to Login
                            </Link>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-sm text-[#8D888B]">
                    © 2025 Timetable Management System
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;