# Style Specification: Talent Card Component

This document provides exact CSS/styling specifications for the Talent Card component to ensure pixel-perfect reproduction of the design.

## 1. Main Card Container (`.talent-card`)
- **Background**: `#ffffff`
- **Border**: `1px solid #e5e7eb`
- **Border Radius**: `12px`
- **Padding**: `24px`
- **Box Shadow**: Subtle `0 1px 3px rgba(0,0,0,0.05)`
- **Layout**: Flex column with `gap: 16px`

## 2. Top Header Row (`.card-header`)
- **Layout**: Flex justify-between, align-center
- **Badge Group (Left)**: Flex row with `gap: 8px`
  - **"Good Match" Pill**: 
    - BG: `#fff7ed` (Light Orange)
    - Text: `#c2410c` (Dark Orange)
    - Font-size: `12px`, Weight: `600`
    - Icon: Thumbs up (Lucide: `ThumbsUp`)
  - **"Trusted" Pill**:
    - BG: `#f0fdf4` (Light Green)
    - Text: `#15803d` (Dark Green)
    - Font-size: `12px`, Weight: `600`
    - Icon: Star (Lucide: `Star`)
  - **"Collaborations" Pill**:
    - BG: `#f9fafb` (Light Gray)
    - Text: `#6b7280` (Gray)
    - Font-size: `12px`, Weight: `500`
- **Action Icons (Right)**:
    - Color: `#9ca3af`
    - Icons: Compare, Favorite, Bookmark (Lucide: `UserRound`, `Star`, `Bookmark`)
    - Layout: Flex row with `gap: 12px`

## 3. Profile Identity Section (`.profile-info`)
- **Layout**: Flex row with `gap: 16px`, align-items: `center`
- **Avatar**: 
    - Size: `48px` diameter
    - Border-radius: `50%`
- **Name & Title**:
    - **Name**: Font-size: `18px`, Weight: `700`, Color: `#111827`
    - **Title/Role**: Font-size: `14px`, Color: `#6b7280` (Gray)
    - **Separator**: Bullet point `·` with extra margin

## 4. Quick Stats Highlight Bar (`.stats-highlight`)
- **Background**: `#f0f9ff` (Very Light Blue / Azure)
- **Border-radius**: `8px`
- **Padding**: `10px 16px`
- **Layout**: Flex row justifying items evenly or with `gap: 24px`
- **Items**:
    - **Icon Color**: `#3b82f6` (System Blue)
    - **Text Color**: `#1e40af` (Dark Blue)
    - **Font-size**: `13px`, Weight: `500`

## 5. Domain & Skill Tags (`.skill-tags`)
- **Layout**: Flex row, `flex-wrap: wrap`, `gap: 8px`
- **Tag Style**:
    - BG: `#f9fafb`
    - Border: `1px solid #e5e7eb`
    - Border-radius: `20px` (Capsule/Pill)
    - Padding: `4px 12px`
    - Font-size: `12px`, Color: `#4b5563`

## 6. Card Footer (`.card-footer`)
- **Layout**: Flex justify-between, align-items: `flex-end`, border-top: `1px solid #f3f4f6` (optional, based on spacing)
- **Activity Text**:
    - Font-size: `11px`, Color: `#9ca3af`, Margin-bottom: `4px`
- **Action Group (Right)**:
    - **"Start Conversation"**: Link style (no bg), font-size `14px`, weight `600`, color `#111827`, underline on hover.
    - **"View Portfolio"**: 
        - BG: `transparent`
        - Border: `1px solid #e5e7eb`
        - Border-radius: `8px`
        - Padding: `8px 16px`
        - Font-size: `14px`, Weight: `600`
        - Hover: Background `#f9fafb`
