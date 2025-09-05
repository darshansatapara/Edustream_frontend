import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { user, token, checkingAuth } = useAuthStore();

  if (checkingAuth) return null; // wait until auth check completes

  if (!user || !token) return <Navigate to="/login" />;

  return children;
};
