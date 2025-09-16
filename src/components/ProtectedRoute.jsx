import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children,user,isAuthenticated }) => {
  if (!isAuthenticated) {
    // If no user, redirect to home
    console.log('rr',isAuthenticated)
    return <Navigate to='/' replace />;
  }

  // If authenticated, render the children (protected component)
  return children;
};

export default ProtectedRoute;
