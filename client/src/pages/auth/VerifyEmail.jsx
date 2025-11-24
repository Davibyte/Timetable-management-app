import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('loading'); // loading, success, error

    useEffect(() => {
        verifyEmail();
    }, [token]);

    const verifyEmail = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/verify-email/${token}`);

            if (response.data.success) {
                setVerificationStatus('success');
                toast.success('Email verified successfully!');

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            setVerificationStatus('error');
            toast.error(error.response?.data?.message || 'Email verification failed');
        }
    };

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
                    <h1 className="text-3xl font-bold text-[#051D41] mb-2 font-['Manrope']">Email Verification</h1>
                </div>

                {/* Status Card */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                    <div className="text-center py-6">
                        {verificationStatus === 'loading' && (
                            <>
                                <div className="w-20 h-20 mx-auto mb-6 relative">
                                    <FiLoader className="w-full h-full text-[#66C7F4] animate-spin" />
                                </div>
                                <h2 className="text-2xl font-semibold text-[#051D41] mb-3">
                                    Verifying Your Email
                                </h2>
                                <p className="text-[#8D888B]">
                                    Please wait while we verify your email address...
                                </p>
                            </>
                        )}

                        {verificationStatus === 'success' && (
                            <>
                                <div className="w-20 h-20 bg-[#FFD6DA] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FiCheckCircle className="text-[#66C7F4]" size={48} />
                                </div>
                                <h2 className="text-2xl font-semibold text-[#051D41] mb-3">
                                    Verification Successful!
                                </h2>
                                <p className="text-[#8D888B] mb-6">
                                    Your email has been verified successfully. You can now login to your account.
                                </p>
                                <div className="bg-[#FFD6DA] rounded-lg p-4 mb-6">
                                    <p className="text-sm text-[#660116]">
                                        You will be redirected to the login page in 3 seconds...
                                    </p>
                                </div>
                                <Link
                                    to="/login"
                                    className="inline-block bg-[#660116] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#4d010f] transition-colors shadow-sm"
                                >
                                    Go to Login
                                </Link>
                            </>
                        )}

                        {verificationStatus === 'error' && (
                            <>
                                <div className="w-20 h-20 bg-[#FFD6DA] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FiXCircle className="text-[#660116]" size={48} />
                                </div>
                                <h2 className="text-2xl font-semibold text-[#051D41] mb-3">
                                    Verification Failed
                                </h2>
                                <p className="text-[#8D888B] mb-6">
                                    We couldn't verify your email. The link may have expired or is invalid.
                                </p>
                                <div className="bg-[#FFD6DA] rounded-lg p-4 mb-6">
                                    <p className="text-sm text-[#660116]">
                                        <strong>What can you do?</strong>
                                        <br />
                                        Try registering again or contact support if the problem persists.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Link
                                        to="/register"
                                        className="inline-block bg-[#660116] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4d010f] transition-colors shadow-sm"
                                    >
                                        Register Again
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="inline-block border-2 border-[#66C7F4] text-[#051D41] px-6 py-3 rounded-lg font-semibold hover:bg-[#66C7F4] hover:text-white transition-colors"
                                    >
                                        Go to Login
                                    </Link>
                                </div>
                            </>
                        )}
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

export default VerifyEmail;