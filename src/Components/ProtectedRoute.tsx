// ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  element,
  roles,
}: {
  element: React.ReactNode;
  roles: string[];
}) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRoles = token ? JSON.parse(token).roles : [];

  const isAuthorized = roles.some((role) => userRoles.includes(role));

  return isAuthorized ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
