import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if the user is logged in (based on your Login logic)
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  if (!isAuthenticated) {
    // If not logged in, redirect to the Login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the page
  return children;
};

export default ProtectedRoute;