import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-onyx flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-strawberry_red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-silver">Loading...</p>
                </div>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;