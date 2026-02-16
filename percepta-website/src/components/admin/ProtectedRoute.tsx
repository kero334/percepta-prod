import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = sessionStorage.getItem("adminAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
