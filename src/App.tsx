import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import OrgProfilePage from "./pages/OrgProfilePage";
import OrganizationProfile from './pages/OrganizationProfile';
import OrganizationOpportunities from './pages/OrganizationOpportunities';
import OrgPostOpportunity from './pages/OrgPostOpportunity';
import OrgWorkScope from './pages/OrgWorkScope';
import OrgReviewOpportunity from './pages/OrgReviewOpportunity';
// --- Components ---
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        {/* These must be open so users can log in or sign up */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/organization-signup" element={<OrgSignup />} />
        <Route path="/organization-signin" element={<OrgSignIn />} />
        
        {/* If 'Home' is a public landing page, keep it here. 
            If it's a private user home, move it to Protected below. */}
        <Route path="/home" element={<Home />} />


        {/* ================= PROTECTED ROUTES ================= */}
        {/* Users cannot see these unless isLoggedIn = true */}
        
        {/* Role Selection */}
        <Route 
          path="/select-role" 
          element={
            <ProtectedRoute>
              <SelectRole />
            </ProtectedRoute>
          } 
        />

        {/* Talent Routes */}
        <Route 
          path="/talent" 
          element={
            <ProtectedRoute>
              <TalentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/TalentOnboarding" 
          element={
            <ProtectedRoute>
              <TalentOnboarding />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/talent-onboarding-2" 
          element={
            <ProtectedRoute>
              <TalentOnboardingStep2 />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/talent-onboarding-3" 
          element={
            <ProtectedRoute>
              <TalentOnboardingStep3 />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/talent-dashboard-v2" 
          element={
            <ProtectedRoute>
              <TalentDashboardV2 />
            </ProtectedRoute>
          } 
        />

        {/* Organization Routes */}
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

        {/* General User Routes */}
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
        <Route
  path="/org/profile"
  element={
    <ProtectedRoute>
      <OrgProfilePage />
    </ProtectedRoute>
  }
/>
        <Route
  path="/organization/profile"
  element={
    <ProtectedRoute>
      <OrganizationProfile />
    </ProtectedRoute>
  }
/>
        <Route
  path="/organization/opportunities"
  element={
    <ProtectedRoute>
      <OrganizationOpportunities />
    </ProtectedRoute>
  }
/>
        <Route
  path="/organization/post-opportunity"
  element={
    <ProtectedRoute>
      <OrgPostOpportunity />
    </ProtectedRoute>
  }
/>
        <Route
  path="/organization/work-scope"
  element={
    <ProtectedRoute>
      <OrgWorkScope />
    </ProtectedRoute>
  }
/>
        <Route
  path="/organization/review-opportunity"
  element={
    <ProtectedRoute>
      <OrgReviewOpportunity />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;