import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export const PublicRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}
