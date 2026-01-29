# Implementation Plan: Organization Dashboard & Opportunity Flow Connectivity

This document outlines the steps required to connect the Organization Dashboard buttons to their respective pages and implement the full multi-step "Post an Opportunity" flow.

## 1. Route Registration (Project Bootstrap)
Update `src/App.tsx` to include routes for the newly identified organization-specific pages.

- [ ] **Path: `/organization-opportunities`** -> Import and use `OrganizationOpportunity` component.
- [ ] **Path: `/organization-post-opportunity`** -> Import and use `OrganizationPostOpportunity` (Step 1).
- [ ] **Path: `/organization-post-opportunity-step-2`** -> Import and use `OrgWorkScope` (Step 2).
- [ ] **Path: `/organization-post-opportunity-step-3`** -> Import and use `OrgReviewOpportunity` (Step 3).
- [ ] **Path: `/organization-profile`** -> Import and use `OrganizationProfile`.

## 2. Dashboard Navigation Updates (`OrganizationDashboard.tsx`)
Update the buttons and sidebar items in the main dashboard to use `react-router-dom`'s `useNavigate` instead of placeholder toasts.

- [ ] **Post an Opportunity (Header & Action Card)**:
    - Replace `onClick={showVerificationToast}` with `navigate('/organization-post-opportunity')`.
- [ ] **Sidebar - Opportunities Tab**:
    - Replace `onClick={showVerificationToast}` with `navigate('/organization-opportunities')`.
- [ ] **Sidebar - Profile Tab**:
    - Update to route to `/organization-profile`.
- [ ] **Action Card - View Profile**:
    - Connect to `/organization-profile`.

## 3. Multi-Step Opportunity Flow Implementation
Ensure users can navigate through the 3-step creation process.

### Step 1: Core Details (`OrganizationPostOpportunity.tsx`)
- [ ] **"Save & Next" Button**: Connect to `/organization-post-opportunity-step-2`.
- [ ] **Sidebar Navigation**: Ensure the active state is set to "Opportunities".
- [ ] **Active Dashboard Layout**: Verify sidebar consistency with the main dashboard.

### Step 2: Work Scope (`OrgWorkScope.tsx`)
- [ ] **"Save & Next" Button**: Connect to `/organization-post-opportunity-step-3`.
- [ ] **"Back" Button**: Connect back to `/organization-post-opportunity`.

### Step 3: Review (`OrgReviewOpportunity.tsx`)
- [ ] **"Post Opportunity" Button**: Logic to submit to Supabase and then redirect to `/organization-opportunities`.
- [ ] **"Back" Button**: Connect back to `/organization-post-opportunity-step-2`.

## 4. Sidebar Component Refactoring (Long-term)
Currently, `OrganizationDashboard`, `OrganizationOpportunity`, and `OrganizationPostOpportunity` have duplicated sidebar HTML/CSS.
- [ ] **Task**: Extract the Sidebar into a common component (e.g., `src/components/OrgSidebar.tsx`) to ensure navigation is consistent across all org-related pages.

## 5. Security & State
- [ ] **ProtectedRoute**: Wrap all new routes in `<ProtectedRoute>` in `App.tsx`.
- [ ] **Verification Logic**: Determine if the "Locked" state (`showVerificationToast`) should be permanent or conditional based on a database flag (e.g., `is_verified` in `organization_profiles`).

---
**Next Action**: Begin by updating `src/App.tsx` with the new routes.
