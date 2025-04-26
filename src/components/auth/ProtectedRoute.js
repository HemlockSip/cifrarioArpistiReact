// src/components/auth/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Component that wraps protected content
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // If still loading, show a loading indicator
  if (loading) {
    return (
      <div className="loading">
        <div className="loading-icon"></div>
        <p>Caricamento...</p>
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!user) {
    // Pass the current location they were trying to access to the login page
    // so after login they can be redirected back
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in, show the protected content
  return children;
}

export default ProtectedRoute;