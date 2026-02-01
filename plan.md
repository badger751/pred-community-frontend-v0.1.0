# Master Implementation Plan: Organization Dashboard

This document outlines the layout, components, and architectural rules for the Organization Dashboard pages, specifically the **Opportunity Listing** and the **Talent Pool** screens.

## 0. Fundamental Component Reusability Rules
To maintain consistency and reduce technical debt, the following components **MUST** be reused across all screens:
1.  **Layout Wrapper**: A consistent `div.dashboard-container` that handles the high-level flex layout between the sidebar and main content.
2.  **Sidebar (`Sidebar.tsx`)**: Centralized navigation component. The active state must be driven by the current route.
3.  **Global Header (`DashboardHeader.tsx`)**: Handles the page title, notification bell, and primary action button (e.g., "Post Opportunity" vs "View Teams").
4.  **UI Atoms**:
    - `Badge/Pill`: Standardized pill components with dynamic themes (Success/Green, Warning/Orange, Neutral/Gray).
    - `FilterDropdown`: Standardized dropdown for all filter groups.
    - `SearchInput`: Reusable search bar with consistent iconography.

---

## 1. Page: Opportunity Listing (Completed Design)
*See previous plan for detailed breakdown.*
- **Layout**: Vertical list of horizontal "Row Cards".
- **Key Features**: Status-based styling (Live, Draft, Paused, Closed), Pipeline statistics, and contextual action buttons.

---

## 2. Page: Talent Pool (New)

### A. Layout Architecture
The Talent Pool page uses the same structural layout as the Opportunities page but shifts the focus to a **Grid Layout** for individual talent profiles.

- **Main Content Wrapper**: `div.talent-pool-content`.
- **Header**: Title "Talent Pool" with a "View Teams" primary button.
- **Filters**: Dual-row filter system + full-width search bar.
- **Talent Grid**: A responsive grid (typically 2 columns on desktop) displaying `TalentCard` components.

### B. Filter & Search Components
#### `TalentFilterBar.tsx`
- **Row 1 (Primary Filters)**: All Candidates, Domain, Primary Role, Skills, Years of Experience, Availability.
- **Row 2 (Secondary Filters)**: Credibility Level, Work Style, Location, Time Zone.
- **Utility**: "Clear All" button to reset state.
- **Sorting**: "Sort by Relevance" dropdown aligned to the right.
#### `TalentSearchBar.tsx`
- A large, integrated search input placed below the filters to refine results within the current talent segment.

### C. The `TalentCard.tsx` Component
This is the most complex component on the page and should be highly modular.

#### 1. Header & Quality Badges
- **Badges**:
  - `Good Match`: Orange themed pill.
  - `Trusted`: Green themed pill with star icon.
  - `Collaborations`: Gray pill showing successful history.
- **Actions**: Flex-row containing "Compare", "Favorite", and "Bookmark" icons.

#### 2. Profile Summary
- **Avatar**: Circular image with status indicator if applicable.
- **Identity**: Large bold name.
- **Bio**: Compact string: "Professional Title / Primary Role · Availability".

#### 3. Quick Stats Bar (Highlight Section)
- **Styling**: Light blue tinted background wrapper.
- **Data Points**:
  - Experience: "X YOE" with clock/calendar icon.
  - Location: "City (Timezone)" with map marker icon.
  - Work Style: "Type" (e.g., Remote/Hybrid) with briefcase icon.

#### 4. Skills & Domains
- A wrap-ready container of `Tag` components labeled "Domain/Skill".

#### 5. Footer Actions
- **Left**: "Active X mins ago" timestamp text.
- **Right**:
  - "Start Conversation": Text-link action.
  - "View Portfolio": Secondary styled button.

### D. Data Interface
```typescript
interface TalentProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  availability: string;
  isGoodMatch: boolean;
  isTrusted: boolean;
  history: string; // e.g., "4 Successful Collaborations"
  yoe: number;
  location: string;
  timezone: string;
  workStyle: string;
  skills: string[];
  lastActive: string;
}
```

---

## 3. Styling Token Reuse
- **Card Background**: `#ffffff` with subtle border `#e5e7eb`.
- **Highlight Blue**: `#f0f9ff` (for the Quick Stats bar).
- **Badge Green**: `#d1fae5` (BG), `#065f46` (Text).
- **Badge Orange**: `#ffedd5` (BG), `#9a3412` (Text).
- **Typography**: Primary font weight 600 for names/titles, 400 for metadata. 14px default size.
