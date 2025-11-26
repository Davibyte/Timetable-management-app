import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-onyx text-white_smoke">
            {/* Navigation */}
            <nav className="border-b border-silver-900/20 bg-onyx/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-8 h-8 text-strawberry_red" />
                        <span className="text-xl font-semibold tracking-tight">Timetable System</span>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/login" className="px-6 py-2 border border-silver-400 rounded-lg hover:border-strawberry_red transition-all duration-300">
                            Login
                        </Link>
                        <Link to="/register" className="px-6 py-2 bg-mahogany_red-500 rounded-lg hover:bg-mahogany_red-600 transition-all duration-300">
                            Register
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Scheduling
                        <span className="block text-strawberry_red mt-2">Made Effortless</span>
                    </h1>
                    <p className="text-lg text-silver mb-8 leading-relaxed">
                        Automate timetable creation, detect conflicts instantly, and manage schedules with AI-powered optimization for educational institutions.
                    </p>
                    <Link to="/register" className="inline-block px-8 py-4 bg-mahogany_red-500 rounded-lg hover:bg-mahogany_red-600 transition-all duration-300 text-lg font-medium">
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<Calendar className="w-8 h-8 text-strawberry_red" />}
                        title="Automated Generation"
                        description="Create complete timetables in seconds with intelligent scheduling algorithms"
                    />
                    <FeatureCard
                        icon={<Clock className="w-8 h-8 text-strawberry_red" />}
                        title="Conflict Detection"
                        description="Real-time detection of scheduling conflicts and capacity issues"
                    />
                    <FeatureCard
                        icon={<Users className="w-8 h-8 text-strawberry_red" />}
                        title="Role Management"
                        description="Multi-role access control for admins, lecturers, and students"
                    />
                    <FeatureCard
                        icon={<CheckCircle className="w-8 h-8 text-strawberry_red" />}
                        title="AI Optimization"
                        description="Smart room assignment and load balancing with machine learning"
                    />
                </div>
            </section>

            {/* Benefits Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="bg-carbon_black border border-silver-900/20 rounded-lg p-12">
                    <h2 className="text-3xl font-bold mb-8 text-center">Built For Educational Excellence</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <BenefitItem text="Supports 500+ concurrent users" />
                        <BenefitItem text="99% uptime reliability" />
                        <BenefitItem text="Export to PDF and Excel" />
                        <BenefitItem text="Drag-and-drop scheduling" />
                        <BenefitItem text="Real-time notifications" />
                        <BenefitItem text="Mobile responsive design" />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-silver-900/20 mt-24">
                <div className="max-w-7xl mx-auto px-6 py-8 text-center text-silver text-sm">
                    <p>© 2025 Timetable Management System. Academic Project.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-carbon_black border border-silver-900/20 rounded-lg p-6 hover:border-mahogany_red transition-all duration-300">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-silver text-sm leading-relaxed">{description}</p>
    </div>
);

const BenefitItem = ({ text }) => (
    <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-strawberry_red flex-shrink-0" />
        <span className="text-silver">{text}</span>
    </div>
);

export default LandingPage;