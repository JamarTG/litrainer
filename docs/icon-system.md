# Icon System Guide

## Goal
Create a consistent, native-feeling icon language across the app while keeping chess-specific visuals unique to Litrainer.

## Principles
- Use one primary icon style for UI controls (`lucide-react` outline style).
- Keep chess-domain identity with custom glyphs/icons only where product-specific meaning is needed.
- Prefer semantic icon names in code (purpose-based) over direct icon component imports.
- Keep sizing constrained to app tokens in `ICON_SIZES`.

## Visual spec
- Stroke style: rounded outline
- Stroke width: 2px
- Sizes: 16, 20, 24 (mapped from existing size tokens)
- States: default, hover, disabled, active
- Do not mix filled and outline styles for the same control group

## Source policy
- Primary source: `lucide-react`
- Keep existing custom icons where domain-specific:
  - `GameSpeedIcon` (`TimeControlIcons`) in `src/components/shared/GameSpeedIcon.tsx`
  - `LichessIcon` in `src/components/shared/LichessIcon.tsx`
  - puzzle phase icons from `/phases/*.svg`
- Legacy `/icons/*.svg` UI controls should be gradually replaced by Lucide equivalents where possible.

## Semantic icon map

### Global / Navigation
- Theme toggle: `Sun` / `Moon`
- External repository link: `Github` (replace static github SVG where desired)

### Panel actions
- Game info: `Info`
- New session: `PlusCircle`
- Settings: `Settings`
- Previous puzzle: `ChevronLeft` (candidate replacement for `/icons/prev.svg`)
- Redo puzzle: `RotateCcw` (candidate replacement for `/icons/retry.svg`)
- Next puzzle: `ChevronRight` (candidate replacement for `/icons/next.svg`)

### Game info
- Opening study link: `BookOpen`
- External game link: `ExternalLink` + optional `LichessIcon`
- Phase indicator: keep `/phases/*.svg` as branded domain visuals

### Engine / analysis
- Engine state: `Cpu` (candidate for future engine-running indicator)
- Depth control: `SlidersHorizontal` (candidate for future heading/icon pair)

### Generic controls
- Dropdown affordance: `ChevronDown`
- Back/close in overlays: `ArrowLeft` and `X` (replace where appropriate)

## Current usage inventory (observed)

### Lucide currently used
- `SettingsIcon` in `src/features/settings/ui/index.tsx`
- `ArrowBigLeftDash` in `src/features/settings/ui/SettingsDisplay.tsx`
- `PlusCircle` in `src/features/training-session/ui/new-session/index.tsx`
- `Info` in `src/features/game-info/ui/GameInfoButton.tsx`
- `BookOpen` in `src/features/game-info/ui/OpeningToPractice.tsx`
- `ChevronDown` in `src/components/shared/GenericChooser.tsx`

### SVG assets currently used
- `/icons/moon.svg`, `/icons/sun.svg` in `src/components/common/ThemeChanger.tsx`
- `/icons/github.svg` in `src/components/layout/NavbarLayout.tsx`
- `/icons/prev.svg`, `/icons/retry.svg`, `/icons/next.svg` in `src/features/panel/ui/body/NavigatePuzzle.tsx`
- `/phases/*.svg` in `src/features/game-info/ui/GameInfoPopup.tsx` and `src/features/game-info/ui/PuzzlePhaseIcon.tsx`

## Rollout plan
1. Keep all current icons functioning (no behavior changes).
2. Introduce central semantic map (`src/constants/icons.ts` extension or `src/shared/config/icons.ts`).
3. Replace panel navigation SVG icons first (`prev/retry/next`) with Lucide set.
4. Standardize back icon (`ArrowBigLeftDash` -> `ArrowLeft`) for consistency.
5. Decide whether GitHub icon should remain branded SVG or move to Lucide `Github`.
6. Keep phase and Lichess icons as product-specific visuals.

## Naming convention for icons in code
- Use semantic keys (examples):
  - `icon.panel.gameInfo`
  - `icon.panel.nextPuzzle`
  - `icon.session.new`
  - `icon.settings.open`
- Avoid direct use of icon names outside shared UI wrappers where possible.
