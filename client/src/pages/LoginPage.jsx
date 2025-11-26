import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const toast = useToast();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(formData);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-onyx flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <Calendar className="w-10 h-10 text-strawberry_red" />
                        <span className="text-2xl font-semibold text-white_smoke">Timetable System</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white_smoke mb-2">Welcome Back</h1>
                    <p className="text-silver">Sign in to manage your schedules</p>
                </div>

                {/* Form Card */}
                <div className="bg-carbon_black border border-silver-900/20 rounded-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-white_smoke mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-onyx border border-silver-900/20 rounded-lg text-white_smoke focus:outline-none focus:border-strawberry_red transition-all duration-300"
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-white_smoke mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 bg-onyx border border-silver-900/20 rounded-lg text-white_smoke focus:outline-none focus:border-strawberry_red transition-all duration-300"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-silver hover:text-white_smoke"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <Link to="/forgot-password" className="text-sm text-strawberry_red hover:opacity-80">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-mahogany_red-500 text-white_smoke rounded-lg font-medium hover:bg-mahogany_red-600 transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-6 text-center text-sm text-silver">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-strawberry_red hover:opacity-80">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;