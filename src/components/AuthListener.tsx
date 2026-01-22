import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthRedirector() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const resolveAuthFlow = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        return;
      }

      const userId = session.user.id;
      const currentPath = location.pathname.toLowerCase();

      /* --------------------------------------------------
         1. Fetch role from profiles (authoritative)
      -------------------------------------------------- */

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileError || !profile?.role) {
        console.error("Unable to resolve user role");
        return;
      }

      const role = profile.role.toLowerCase() as "talent" | "organization";

      const onboardingRoot =
        role === "organization"
          ? "/organization-onboarding"
          : "/talent-onboarding";

      const dashboardRoute =
        role === "organization"
          ? "/organization-dashboard"
          : "/talent-dashboard-v2";

      const isOnboardingRoute = currentPath.startsWith(onboardingRoot);
      const isPublicRoute =
        currentPath === "/" ||
        currentPath === "/login" ||
        currentPath.startsWith("/signup") ||
        currentPath.startsWith("/signin") ||
        currentPath.startsWith("/forgot-password") ||
        currentPath.startsWith("/reset-password");

      /* --------------------------------------------------
         2. If user is inside onboarding → NEVER interfere
      -------------------------------------------------- */

      if (isOnboardingRoute) {
        return;
      }

      /* --------------------------------------------------
         3. Fetch onboarding status (row may NOT exist yet)
      -------------------------------------------------- */

      const onboardingTable =
        role === "organization"
          ? "organization_profiles"
          : "talent_profiles";

      const { data: onboardingRow } = await supabase
        .from(onboardingTable)
        .select("onboarding_completed")
        .eq("id", userId)
        .maybeSingle();

      const onboardingCompleted = onboardingRow?.onboarding_completed === true;

      /* --------------------------------------------------
         4. Routing decisions
      -------------------------------------------------- */

      if (!onboardingCompleted && !isPublicRoute) {
        navigate(onboardingRoot, { replace: true });
        return;
      }

      if (onboardingCompleted && (isPublicRoute || isOnboardingRoute)) {
        navigate(dashboardRoute, { replace: true });
      }
    };

    resolveAuthFlow();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        resolveAuthFlow();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  return null;
}
