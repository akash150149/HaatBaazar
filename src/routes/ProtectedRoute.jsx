import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  );
}
