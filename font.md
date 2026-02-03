# Implementation Plan: Inter Font Integration

This document outlines the steps to install and implement the **Inter** typeface from Google Fonts as the primary font family for the Predulive application.

## 1. Font Selection (Google Fonts)
We will use the Inter variable font or the following specific weights to match the dashboard aesthetics:
- **400 (Regular)**: For body text, descriptions, and metadata.
- **500 (Medium)**: For interactive elements, buttons, and navigation items.
- **600 (Semi-Bold)**: For sub-headers and card titles.
- **700 (Bold)**: For main titles and emphasis.

## 2. Installation Methods

### Option A: HTML Head (Recommended for Performance)
Add the following snippet to the `<head>` of `/index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Option B: CSS Import
Alternatively, add this to the top of `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

## 3. Global CSS Implementation
Update `src/index.css` to set Inter as the default font for the entire application.

```css
:root {
  --font-primary: 'Inter', system-ui, -apple-system, sans-serif;
}

body {
  font-family: var(--font-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Ensure all input/buttons inherit the font */
button, input, textarea, select {
  font-family: inherit;
}
```

## 4. Verification Check
After implementation, verify that:
1. All dashboard headers reflect the new typeface weights.
2. The `TalentCard` components (per `style.md`) use the Semi-Bold (600) and Bold (700) weights correctly.
3. There are no layout shifts (layout jumps) during font loading by checking the `display=swap` parameter.

## 5. Cleanup
- Remove any existing hardcoded `font-family: Arial, Helvetica, sans-serif;` declarations from `src/index.css` and `src/App.css`.
- Ensure `tailwindcss` (if active) is configured to use Inter in `tailwind.config.js` if custom themes are being used.
