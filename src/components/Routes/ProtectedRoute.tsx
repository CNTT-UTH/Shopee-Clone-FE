import { Outlet, Navigate } from "react-router-dom"

const isAuthenticated = true

export const ProtectedRoute = () =>  isAuthenticated ? <Outlet /> : <Navigate to="/login" />

export const PublicRoute = () =>  isAuthenticated ? <Navigate to="/" /> : <Outlet />