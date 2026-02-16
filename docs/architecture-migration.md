# Architecture Migration Plan

## Objective
Establish a feature-first structure with clear ownership boundaries while keeping runtime behavior unchanged during early phases.

## Phase 1 (Scaffold)
- Create destination folders under `src/`.
- Add placeholder barrel files (`index.ts`) so paths are ready for incremental moves.
- Do not move implementation files yet.
- Do not change runtime wiring (`main.tsx`, `App.tsx`, router).

## Target Top-Level Layout

```text
src/
  app/
  pages/
  features/
  entities/
  shared/
  state/
  services/
  assets/
```

## Ownership Rules

### `app/`
Application bootstrap and provider composition.
- Examples: app providers, router assembly, store/provider wiring.

### `pages/`
Route-level screens only.
- A page composes features; it should avoid deep business logic.

### `features/`
Business capabilities and their UI/state adapters.
- Suggested features for this repo:
  - `training-session`
  - `chessboard`
  - `panel`
  - `game-info`
  - `settings`
  - `analysis-engine`

### `entities/`
Core domain models and entity-focused logic shared by multiple features.
- Examples: puzzle, player, position semantics.

### `shared/`
Reusable, feature-agnostic modules.
- `shared/ui`: generic UI components.
- `shared/lib`: generic helpers/utilities.
- `shared/config`: cross-feature constants.
- `shared/types`: global typings and enums.
- `shared/hooks`: reusable hooks not tied to one feature.
- `shared/styles`: global style primitives.

### `state/`
Global state management setup and slices/selectors.
- Keep serializable app state here.
- Organize by feature as migration proceeds.

### `services/`
External IO and integrations.
- Examples: Lichess API clients/parsers, audio services, engine adapters.

### `assets/`
Source-bundled assets (if needed). Keep static CDN-like files in `public/`.

## Move Guidelines
- Move by vertical slice (one feature at a time), not by file type.
- Keep pull requests focused:
  1. move files
  2. update imports
  3. run lint/build
- Avoid mixed concerns in same file:
  - UI rendering + heavy orchestration should be split.
  - feature-specific helpers should live in that feature.
- Only keep modules in `shared/` when used by 2+ features.

## Phase 2 Recommended Order
1. `training-session`
2. `panel`
3. `chessboard`
4. `settings`
5. `analysis-engine`
6. `game-info`
7. consolidate shared/state/services

## Definition of Done for Phase 1
- New folder scaffold exists.
- Placeholder barrels exist.
- No runtime behavior changes.
- Existing app runs unchanged.
