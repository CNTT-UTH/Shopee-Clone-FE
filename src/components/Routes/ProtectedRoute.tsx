import { useAuth } from "../../contexts/auth.context";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export const PublicRoute = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}
