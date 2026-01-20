# Mission Control: Space Missions Data Explorer

A responsive, accessible data exploration application for browsing space missions. Built with React, TypeScript, and Material UI.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for production:**
   ```sh
   npm run build
   ```

4. **Run tests:**
   ```sh
   npm test
   ```

## Live Demo

The application is deployed and available at: **[https://mission-control-data-explorer.netlify.app/](https://mission-control-data-explorer.netlify.app/)**

## Design Decisions

### Layout Choice

The desktop layout uses a two-column approach: filters on the left (280px fixed width) and results on the right. This pattern is familiar from e-commerce and data tools, making filters immediately discoverable without overwhelming the primary content area. On mobile, filters move to a drawer to prioritise screen real estate for mission data.

For the mission list, a table layout on desktop provides excellent scannability for structured data with multiple attributes. Cards on mobile improve readability and touch interactions, with comfortable spacing and clear hierarchy.

### Filtering UX Approach

Filters update immediately on desktop (no Apply button) to provide instant feedback—users can quickly iterate on their search. The active filter chips above the results serve as both a summary and quick removal mechanism. All filters combine with AND logic, which feels predictable for data exploration.

The "Favourites only" filter sits alongside other filters rather than in a separate section, treating favourites as first-class filtering criteria. This keeps the filter panel consistent and reduces cognitive load.

### Navigation Pattern

Mission details open in a drawer (desktop) or full-screen dialog (mobile) rather than routing to a separate page. This preserves the browsing context—users can see their filtered list remains visible on desktop, and on mobile, the full-screen experience provides focus without feeling "lost" in navigation.

Next/Previous navigation within the detail view respects the current filtered and sorted results, enabling users to browse through their specific subset of missions without returning to the list.

### Responsive Strategy

The breakpoint at 960px (MUI's `md`) separates mobile from desktop experiences. On mobile, touch targets are at least 44px to meet accessibility guidelines, and the filter drawer provides a comfortable full-screen experience for complex filtering interactions.

Cards use optimised spacing with reduced padding (p: 2) on mobile for better information density. The card layout features a clean hierarchy: mission name and star icon on the first row, year displayed below with a dash prefix and right alignment, and metadata (Agency, Type, Status) organised in a two-column layout with dividers. The favourite toggle uses smaller icons (size="small") appropriate for thumb interaction. The table layout would be cramped on mobile, so cards provide better information density and readability.

### Accessibility Considerations

All interactive elements are keyboard accessible with clear focus indicators. Icon-only buttons (favourites, close) include ARIA labels. Status chips use both colour and icons to communicate state, not relying on colour alone.

Focus management in the detail drawer/dialog moves focus to the close button on open, providing clear entry and exit points. The table rows and cards are keyboard accessible with Enter/Space activation.

### MUI Component Choices

- **Table** for desktop list: Enhanced with zebra striping, improved header styling (fontWeight 600), and smooth hover transitions for better structured data scanning
- **Card** for mobile list: Optimised layout with reduced padding, clear information hierarchy using dividers, and improved spacing between sections
- **Drawer/Dialog** for details: MUI's built-in focus trapping and accessibility features
- **Chip** for status and filters: Enhanced with hover effects, improved font weights, and smooth transitions for clear visual distinction with icon + text
- **Slider** for year range: Styled with thicker track (4px), improved hover effects on thumb, and better visual feedback—more intuitive than dual inputs for range selection
- **Badge** on mobile filter button: Clear indicator of active filter count
- **TextField** inputs: Enhanced with rounded corners (8px), improved hover/focus states, and smooth transitions

## Visual Design Choices

The colour palette is restrained with a space-themed primary colour (#1a4d8c) that provides depth while maintaining a calm SaaS aesthetic. Status chips use semantic colours (success=green, error=red, warning=amber) to communicate at a glance. Favourite stars use the warning colour (amber) to provide warmth without being distracting.

Typography follows MUI's scale with enhanced hierarchy: headings use refined font weights (700 for h1, 600 for h2/h3) and subtle letter spacing. Mission names use appropriate sizing (h4 on mobile cards, body2 with fontWeight 600 in tables) for optimal readability. Metadata uses body2 with muted colours and consistent font weights (500) for labels.

Spacing uses the 8px base unit throughout, with responsive padding adjustments on mobile (reduced container padding) to optimise screen real estate. Border radius is consistently 8px (2 units) for a modern, cohesive feel.

Visual depth is created through subtle shadows (boxShadow on containers, cards, and panels), elevation on interactive elements, and careful layering. The header features a very subtle gradient using the space-themed primary colour, adding depth while maintaining readability. The header title and subtitle are centre-aligned for a balanced, prominent presentation. The filter panel uses a border and shadow to clearly separate it from content, while the results container has elevated styling.

Micro-interactions enhance the user experience: hover states include smooth transitions (0.2s ease-in-out), favourite star buttons scale on hover, table rows have smooth background transitions, and cards lift slightly on hover. All interactive elements provide clear visual feedback.

## What You'd Improve

Given more time, I'd add:

- **Pagination or virtualisation** for very large datasets (currently handles 50 missions easily, but would need optimisation for 1000+)
- **Bulk operations** for favourites (select multiple, favourite/unfavourite all)
- **Filter presets** or saved filter combinations for common queries
- **Export functionality** to download filtered results as CSV
- **Keyboard shortcuts** (e.g., `/` to focus search, `f` to toggle favourites filter)
- ~~**Animation polish** for transitions and state changes~~ (Implemented: smooth transitions on interactive elements, hover effects, and micro-interactions)
- **User testing** to validate filter discoverability and mobile interaction patterns
- **Performance optimisations** like memoisation for expensive filter operations if dataset grows

## Project Structure

```
src/
  components/
    ActiveFilterChips.tsx    # Active filter display with remove actions
    EmptyState.tsx            # Empty state messaging
    ExplorerPage.tsx          # Main page component
    FiltersPanel.tsx          # Filter controls (desktop/mobile)
    MissionCards.tsx          # Mobile card list view
    MissionDetail.tsx         # Detail drawer/dialog
    MissionsTable.tsx        # Desktop table view
    ResultsHeader.tsx         # Results count and sort control
  hooks/
    useFavourites.ts         # Favourites state + localStorage
    useMissions.ts           # Filtering and sorting logic
  types/
    mission.ts               # TypeScript interfaces
  utils/
    missionUtils.ts          # Formatting helpers
    statusUtils.tsx          # Status chip component
  data/
    missionData.json         # Mission dataset
  App.tsx                    # Root component
  main.tsx                   # Entry point
  theme.ts                   # MUI theme configuration
```

## Technical Notes

- Favourites are persisted to localStorage using the key `mission-favourites`
- Default sort is Year (newest first) as per product requirements
- All date formatting uses British locale (en-GB)
- Code comments use British spelling conventions

## Tests

Run `npm test` to execute the test suite. Tests cover:
- Filtering logic (combined filters)
- Favourites persistence (localStorage)
- Sorting behaviour
