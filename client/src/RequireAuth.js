import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "context/AuthProvider";

export const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { auth } = useAuthContext();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
