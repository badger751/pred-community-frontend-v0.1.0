import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthRedirector() {
  const navigate = useNavigate();
  const location = useLocation();
  const resolvingRef = useRef(false);

  useEffect(() => {
    const resolveAuthFlow = async () => {
      if (resolvingRef.current) return;
      resolvingRef.current = true;

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) return;

        const userId = session.user.id;
        const currentPath = location.pathname.toLowerCase();

        /* --------------------------------------------------
           1. Resolve role (authoritative)
        -------------------------------------------------- */

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userId)
          .single();

        if (error || !profile?.role) return;

        const role = profile.role.toLowerCase() as "talent" | "organization";

        /* --------------------------------------------------
           2. Canonical routes (MATCH App.tsx)
        -------------------------------------------------- */

        const onboardingRoot =
          role === "organization"
            ? "/organization-onboarding"
            : "/talent-onboarding";

        const dashboardRoute =
          role === "organization"
            ? "/organization-dashboard"
            : "/talent-dashboard-v2";

        const talentOnboardingRoutes = [
          "/talent-onboarding",
          "/talent-onboarding-2",
          "/talent-onboarding-3",
        ];

        const orgOnboardingRoutes = [
          "/organization-onboarding",
          "/organization-onboarding-2",
          "/organization-onboarding-3",
        ];

        const isOnboardingRoute =
          role === "organization"
            ? orgOnboardingRoutes.includes(currentPath)
            : talentOnboardingRoutes.includes(currentPath);

        /* --------------------------------------------------
           3. Onboarding completion state
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

        const onboardingCompleted =
          onboardingRow?.onboarding_completed === true;

        /* --------------------------------------------------
           4. Routing rules (NO STEP RESET)
        -------------------------------------------------- */

        if (!onboardingCompleted && !isOnboardingRoute) {
          navigate(onboardingRoot, { replace: true });
          return;
        }

        if (onboardingCompleted && isOnboardingRoute) {
          navigate(dashboardRoute, { replace: true });
        }
      } finally {
        resolvingRef.current = false;
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
