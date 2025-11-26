import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, ArrowLeft } from 'lucide-react';
import { authAPI } from '../services/api';
import { useToast } from '../components/Toast';

const ForgotPasswordPage = () => {
    const toast = useToast();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authAPI.forgotPassword(email);
            setSent(true);
            toast.success('Reset instructions sent to your email');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-onyx flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <Calendar className="w-10 h-10 text-strawberry_red" />
                        <span className="text-2xl font-semibold text-white_smoke">Timetable System</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white_smoke mb-2">Reset Password</h1>
                    <p className="text-silver">Enter your email to receive reset instructions</p>
                </div>

                <div className="bg-carbon_black border border-silver-900/20 rounded-lg p-8">
                    {!sent ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-white_smoke mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-onyx border border-silver-900/20 rounded-lg text-white_smoke focus:outline-none focus:border-strawberry_red transition-all duration-300"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-mahogany_red-500 text-white_smoke rounded-lg font-medium hover:bg-mahogany_red-600 transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-mahogany_red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-white_smoke" />
                            </div>
                            <h3 className="text-xl font-semibold text-white_smoke mb-2">Check Your Email</h3>
                            <p className="text-silver mb-6">
                                Reset instructions have been sent to <span className="text-white_smoke">{email}</span>
                            </p>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-strawberry_red hover:opacity-80">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;