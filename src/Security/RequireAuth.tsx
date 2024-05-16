import { useAuth } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: JSX.Element;
  roles?: string[];
};
export default function RequireAuth({ children, roles }: Props) {
  const auth = useAuth();

  const location = useLocation();
  if (roles) {
    if (!auth.isLoggedInAs(roles)) {
      return <Navigate to="/log-ind" state={{ from: location }} replace />;
    }
  }
  if (!auth.username) {
    return <Navigate to="/log-ind" state={{ from: location }} replace />;
  }
  return children;
}
