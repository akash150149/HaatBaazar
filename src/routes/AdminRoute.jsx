import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context";

export default function AdminRoute() {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}
