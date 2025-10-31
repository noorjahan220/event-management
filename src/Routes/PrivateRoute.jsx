import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './../Pages/Hooks/UseAuth';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // 1. Show a loading spinner while checking auth status
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // 2. If the user is logged in, allow them to see the page
    if (user) {
        return children;
    }

    // 3. If the user is NOT logged in, redirect them to the login page
    // We save the location they were trying to go to in the `state`.
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;