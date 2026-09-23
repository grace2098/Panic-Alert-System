// Wraps a route element and only renders it once we know the user is
// authenticated. Two states matter here, and conflating them is a common
// bug:
//
// 1. authLoading -- we don't yet know if there's a session (initial page
//    load, before Firebase has restored it from storage). If we redirect
//    to /login during this window, a logged-in user gets a flash-redirect
//    on every refresh.
// 2. !currentUser -- we DO know, and there is no session. Redirect.
//
// `state={{ from: location }}` lets Login send the user back to wherever
// they were headed after they sign in.

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-green-700/30 border-t-green-700" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
