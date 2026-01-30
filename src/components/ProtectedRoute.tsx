import { Navigate, useLocation } from "react-router-dom";
import { type ReactNode, useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { devBypass } from "../lib/devBypass";

interface ProtectedRouteProps {
  children?: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isHydrated } = useAuthStore();
  const location = useLocation();

  // Dev bypass check - eliminated in production build
  if (!import.meta.env.PROD && devBypass.isEnabled) {
    console.log("[ProtectedRoute] 🔓 Dev bypass active - allowing access");
    return <>{children}</>;
  }

  // Debug logging – very helpful for role issues
  useEffect(() => {
    console.log("[ProtectedRoute]", {
      path: location.pathname,
      isHydrated,
      isAuthenticated,
      userId: user?.id || "no-user",
      userRolesRaw: user?.roles,
      userRolesNormalized: user?.roles ? (Array.isArray(user.roles) ? user.roles : [user.roles]).map(r => String(r).toLowerCase().trim()) : "no-roles",
      requiredRoles: allowedRoles || "no restriction",
    });
  }, [isHydrated, isAuthenticated, user, location.pathname, allowedRoles]);

  // 1. Still hydrating → show loader
  if (!isHydrated) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.1rem",
        color: "#666",
      }}>
        Checking authentication...
      </div>
    );
  }

  // 2. Not authenticated → redirect to login
  if (!isAuthenticated) {
    console.log("[ProtectedRoute] Not authenticated → redirect to login from", location.pathname);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 3. Role check – only if allowedRoles provided
  if (allowedRoles && allowedRoles.length > 0) {
    // Normalize user roles (handle string or array)
    const userRolesRaw = user?.roles || [];
    const userRolesNormalized = Array.isArray(userRolesRaw)
      ? userRolesRaw.map(r => String(r).toLowerCase().trim())
      : [String(userRolesRaw).toLowerCase().trim()];

    const allowedRolesNormalized = allowedRoles.map(r => r.toLowerCase().trim());

    // ADDED: Explicitly log the current role being checked
    console.log("[ProtectedRoute] Current user role check:", {
      currentRole: userRolesNormalized[0] || "no-role-found",
      normalizedRoles: userRolesNormalized,
      required: allowedRolesNormalized,
    });

    const hasRequiredRole = allowedRolesNormalized.some(required => 
      userRolesNormalized.includes(required) ||
      userRolesNormalized.includes("organization") ||
      userRolesNormalized.includes("org") ||
      userRolesNormalized.includes("organisation")
    );

    if (!hasRequiredRole) {
      console.log("[ProtectedRoute] Role mismatch → redirecting...", {
        path: location.pathname,
        requiredNormalized: allowedRolesNormalized,
        actualNormalized: userRolesNormalized,
      });

      // Smart redirect
      const actualRole = userRolesNormalized[0] || "talent";
      const isOrg = actualRole.includes("organization") || actualRole.includes("org") || actualRole.includes("organisation");
      const redirectPath = isOrg ? "/organization-onboarding" : "/talent-onboarding";

      return <Navigate to={redirectPath} replace />;
    } else {
      console.log("[ProtectedRoute] Role match OK:", {
        path: location.pathname,
        roleFound: userRolesNormalized,
      });
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;