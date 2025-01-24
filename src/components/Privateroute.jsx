import React from 'react';
import { Navigate } from 'react-router-dom'; // Use Navigate component for redirection

const Privateroute = ({ isLogin, children }) => {
  if (isLogin) {
    return children; // Render the children if the user is logged in
  } else {
    return <Navigate to="/login" replace />; // Redirect to the login page
  }
};

export default Privateroute;
