import path from "@uth/constants/path";
import { useAuth } from "../../contexts/auth.context"
import { Outlet, Navigate } from "react-router-dom"

export const SellerRoute = () => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated)  return <Navigate to="/login" />
  return !user?.is_shop ?  <Navigate to={path.registerSeller} /> : <Outlet />
};


export const PublicSellerCentre = () => {
  const { isAuthenticated, user } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" />

  return user?.is_shop ? <Navigate to={path.sellerCentre} /> : <Outlet /> 
}
