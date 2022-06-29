import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "customHooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { auth } = useAuth();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
