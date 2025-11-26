import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, LogOut, User, Clock, BookOpen } from 'lucide-react';
import { useToast } from '../components/Toast';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogout = async () => {
        await logout();
        toast.info('Logged out successfully');
        navigate('/login');
    };

    const getRoleColor = (role) => {
        const colors = {
            admin: 'bg-dark_garnet text-white_smoke',
            lecturer: 'bg-mahogany_red-500 text-white_smoke',
            student: 'bg-strawberry_red text-white_smoke'
        };
        return colors[role] || colors.student;
    };

    return (
        <div className="min-h-screen bg-onyx">
            {/* Header */}
            <header className="bg-carbon_black border-b border-silver-900/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-8 h-8 text-strawberry_red" />
                        <span className="text-xl font-semibold text-white_smoke">Timetable System</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 border border-silver-400 rounded-lg text-white_smoke hover:border-strawberry_red transition-all duration-300"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Welcome Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white_smoke mb-2">
                        Welcome back, {user?.firstName}!
                    </h1>
                    <p className="text-silver">Manage your academic schedules efficiently</p>
                </div>

                {/* User Info Card */}
                <div className="bg-carbon_black border border-silver-900/20 rounded-lg p-8 mb-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-onyx flex items-center justify-center">
                                <User className="w-8 h-8 text-strawberry_red" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-white_smoke">
                                    {user?.firstName} {user?.lastName}
                                </h2>
                                <p className="text-silver">{user?.email}</p>
                            </div>
                        </div>
                        <span className={`px-4 py-2 rounded-lg text-sm font-medium ${getRoleColor(user?.role)}`}>
                            {user?.role?.toUpperCase()}
                        </span>
                    </div>

                    {user?.department && (
                        <div className="pt-6 border-t border-silver-900/20">
                            <p className="text-silver text-sm mb-1">Department</p>
                            <p className="text-white_smoke font-medium">{user.department}</p>
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        icon={<Calendar className="w-6 h-6 text-strawberry_red" />}
                        title="Timetables"
                        value="0"
                        description="Active schedules"
                    />
                    <StatCard
                        icon={<Clock className="w-6 h-6 text-strawberry_red" />}
                        title="Sessions"
                        value="0"
                        description="This week"
                    />
                    <StatCard
                        icon={<BookOpen className="w-6 h-6 text-strawberry_red" />}
                        title="Courses"
                        value="0"
                        description="Enrolled"
                    />
                </div>

                {/* Coming Soon Section */}
                <div className="bg-carbon_black border border-silver-900/20 rounded-lg p-12 text-center">
                    <Calendar className="w-16 h-16 text-strawberry_red mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-white_smoke mb-2">
                        Full Dashboard Coming Soon
                    </h3>
                    <p className="text-silver max-w-md mx-auto">
                        Timetable management, conflict detection, and scheduling features are under development.
                    </p>
                </div>
            </main>
        </div>
    );
};

const StatCard = ({ icon, title, value, description }) => (
    <div className="bg-carbon_black border border-silver-900/20 rounded-lg p-6 hover:border-mahogany_red transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h3 className="text-lg font-semibold text-white_smoke">{title}</h3>
        </div>
        <p className="text-3xl font-bold text-white_smoke mb-1">{value}</p>
        <p className="text-silver text-sm">{description}</p>
    </div>
);

export default DashboardPage;