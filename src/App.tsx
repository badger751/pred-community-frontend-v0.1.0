import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { type ReactNode } from "react";

import { useAuthStore } from "./stores/authStore";

// --- Pages ---
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SelectRole from "./pages/SelectRole";
import TalentDashboard from "./pages/TalentDashboard";
import OrgDashboard from "./pages/OrgDashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import TalentOnboarding from "./pages/TalentOnboarding";
import TalentOnboardingStep2 from "./pages/TalentOnboardingStep2";
import TalentOnboardingStep3 from "./pages/TalentOnboardingStep3";
import OrgSignup from "./pages/OrgSignup";
import OrgOnboarding1 from "./pages/OrgOnboarding1";
import OrgOnboarding2 from "./pages/OrgOnboarding2";
import OrgOnboarding3 from "./pages/OrgOnboarding3";
import OrgSignIn from "./pages/OrgSignIn";
import TalentDashboardV2 from "./pages/TalentDashboardV2";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword"; // <-- import the new page
import ConfirmEmail from "./pages/ConfirmEmail";
import OrgConfirmEmail from "./pages/OrgConfirmEmail";

// --- Components ---
import ProtectedRoute from "./components/ProtectedRoute";
import AuthListener from "./components/AuthListener";
import PageTransition from "./components/PageTransition";

/* ---------------------------------------------
   App Bootstrap Layer (Session Rehydration)
---------------------------------------------- */
function AppBootstrap({ children }: { children: ReactNode }) {
  const isHydrated = useAuthStore((s) => s.isHydrated);

  // useEffect(() => {
  //   bootstrapAuth();
  // }, []);

  if (!isHydrated) {
    return null; // or global spinner
  }

  return children;
}
function App() {
  return (
    <AppBootstrap>
      <BrowserRouter>
        <AuthListener />
        <AnimatedRoutes />
      </BrowserRouter>
    </AppBootstrap>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <PageTransition locationKey={location.pathname}>
      <Routes location={location} key={location.pathname}>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/organization-signup" element={<OrgSignup />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/organization-confirm-email" element={<OrgConfirmEmail />} />
        <Route path="/organization-signin" element={<OrgSignIn />} />
        <Route path="/home" element={<Home />} />

        {/* ================= PROTECTED ROUTES ================= */}

        <Route
          path="/select-role"
          element={
            <ProtectedRoute>
              <SelectRole />
            </ProtectedRoute>
          }
        />

        {/* -------- Talent -------- */}
        <Route
          path="/talent"
          element={
            <ProtectedRoute>
              <TalentDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/talent-onboarding" element={<TalentOnboarding />} />
        <Route path="/talent-onboarding-2" element={<TalentOnboardingStep2 />} />
        <Route path="/talent-onboarding-3" element={<TalentOnboardingStep3 />} />
        <Route
          path="/talent-dashboard-v2"
          element={
            <ProtectedRoute>
              <TalentDashboardV2 />
            </ProtectedRoute>
          }
        />

        {/* -------- Organization -------- */}
        <Route
          path="/organization"
          element={
            <ProtectedRoute>
              <OrgDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization-onboarding"
          element={
            <ProtectedRoute>
              <OrgOnboarding1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization-onboarding-2"
          element={
            <ProtectedRoute>
              <OrgOnboarding2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization-onboarding-3"
          element={
            <ProtectedRoute>
              <OrgOnboarding3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/org"
          element={
            <ProtectedRoute>
              <OrganizationDashboard />
            </ProtectedRoute>
          }
        />

        {/* -------- Shared -------- */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />



        














      </Routes>
    </PageTransition>
  );
}

export default App;
