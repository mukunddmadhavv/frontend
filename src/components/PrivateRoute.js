import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const owner = localStorage.getItem('businessOwner');

  // ✅ Check for valid logged-in owner (no token check anymore)
  if (!owner) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
