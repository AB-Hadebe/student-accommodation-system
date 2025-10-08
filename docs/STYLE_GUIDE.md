# Student Accommodation System — Style Guide

Purpose: provide a concise, actionable style guide that aligns the frontend with the project objective (Apple‑inspired, accessible Material design). This guide references the existing files `frontend/src/global_styles.css` and `frontend/src/custom-theme.scss` and the ADR `docs/architecture/004-angular-material-apple-design.md`.

1. Where to find theme sources

- Global design tokens and utilities: `frontend/src/global_styles.css` (current canonical runtime CSS variables)
- Angular Material theming entry: `frontend/src/custom-theme.scss`
- Design decision record: `docs/architecture/004-angular-material-apple-design.md`

2. Design tokens (single source of truth)

- Purpose: tokens must be used by all components for consistent color, spacing, typography, curves and shadows.
- Current tokens (CSS variables in `global_styles.css`):
  - Colors: `--color-primary`, `--color-primary-700`, `--color-accent`, `--color-success`, `--color-error`, `--neutral-*`
  - Spacing (8dp grid): `--space-1` (8px), `--space-2` (16px), `--space-3` (24px)
  - Radii: `--radius-sm`, `--radius-md`, `--radius-lg`
  - Elevation: `--elevation-1` … `--elevation-4`
  - Motion: `--motion-fast`, `--motion-medium`, `--motion-spring`
  - Focus: `--focus-ring-color`, `--focus-ring-width`

Recommendation:

- Move tokens to SCSS entry file `frontend/src/styles/_tokens.scss` and import into `custom-theme.scss`. Keep `global_styles.css` as a built output or wrapper that re-exports the variables for non‑SCSS consumers.

3. Typography

- Use system font stack: SF Pro fallbacks via `--font-sans` (already in `global_styles.css`). Do not embed licensed fonts.
- Scale: base 16px. Use the provided h1..h6 scales in `global_styles.css` or mirror them in SCSS `--type-base` variable.
- Line-height: 1.2–1.5 depending on component; headings tighter, body relaxed.

4. Spacing and layout

- Adopt 8pt baseline grid. Multiples only: 8,16,24,32,48
- Spacing utility classes exist: `.padding-1`, `.padding-2`, `.margin-1`, `.margin-2`. Prefer component CSS using tokens rather than ad hoc margins in templates.

5. Color & contrast

- Use `--neutral-*` tokens for text and surfaces. Primary and accent for actions and highlights.
- Enforce WCAG 2.1 AA contrast: text (4.5:1 normal, 3:1 large). Validate during PRs with automated color contrast checks (stylelint plugin or axe-core test).

6. Components & patterns

- Architecture: Smart/Dumb components
  - Smart (container) components: orchestrate data, subscribe to NgRx selectors, call services. Keep minimal template logic.
  - Dumb (presentational) components: standalone, inputs/outputs only, no direct store or HTTP calls.
- Standalone components: prefer Angular standalone components for new UI atoms to improve tree-shaking.
- Wrap Angular Material components with local presentational wrappers to centralize styling/behavior (e.g., `app-button`, `app-card`, `app-form-field`).
- Use Angular CDK for accessibility behaviors and focus management.

7. Name conventions

- Component files: `feature/atom-name/atom-name.component.ts` (kebab-case)
- SCSS/Styles: `_atom-name.scss` and import in the component or central index.
- Design tokens: kebab-case, prefixed with `--`.

8. Angular Material integration

- Keep `custom-theme.scss` as the Material theme entry; map Material palettes to our tokens. Example mapping should live in `frontend/src/styles/_material-mapping.scss`.
- Use `ng add @angular/material` and enable `BrowserAnimationsModule` (document in README).
- For runtime variables (CSS custom properties) that need to change at runtime (dark mode), keep them in `global_styles.css` or generated CSS, and use CSS variables in component styles where possible.

9. Accessibility requirements

- WCAG 2.1 AA minimum.
- Keyboard navigation for all interactive elements.
- Use `:focus-visible` styles (already in `global_styles.css`) and avoid hiding focus outlines.
- All images/icons must have accessible names or be aria-hidden when decorative.
- Use aria attributes for dialogs, form errors, and navigation landmarks.
- Integrate axe-core checks in CI and run Storybook accessibility tests.

10. Motion & micro-interactions

- Use motion tokens: short, spring-like curves. Avoid long animations that trigger vestibular issues.
- Provide `prefers-reduced-motion` support — reduce or disable non-essential animations when set.

11. Theming & dark mode

- Support light and dark via `prefers-color-scheme` and optional user toggle.
- Keep color tokens dual (light/dark) in tokens file and switch via a CSS class on `<html>` when user chooses explicit theme.

12. Visual regression & component development

- Use Storybook for each atom, molecule, and page-level pattern.
- Integrate Chromatic or visual regression tooling; include stories in CI and require no visual diffs for merging without review.

13. Testing and enforcement

- Stylelint with recommended rules for SCSS/CSS; enforce in pre-commit via Husky.
- ESLint for TS and templates; Prettier for formatting.
- CI steps: lint (stylelint, eslint), unit tests, storybook build, visual regression, accessibility checks.

14. PR checklist (add to `.github/PULL_REQUEST_TEMPLATE.md`)

- Include Jira issue key in title and commits.
- Attach screenshots or storybook link for UI changes.
- Confirm accessibility checks passed (axe-core automated or manual note).
- Ensure design token usage (no hard-coded hex colors or arbitrary spacing).
- Add/Update Storybook stories for new UI.

15. Commit & branching conventions

- Conventional commits + Jira key: e.g. `feat(JRA-123): add search input component`.
- Branches: `feature/JRA-123/short-desc` from `develop`.

16. Migration notes (quick tasks)

- Create `frontend/src/styles/_tokens.scss` and move token definitions from `global_styles.css`.
- Update `custom-theme.scss` to consume `_tokens.scss` and map to Angular Material palettes.
- Make component styles use SCSS variables or CSS custom properties via `:root`.

17. Useful file map

- Tokens and runtime variables: `frontend/src/global_styles.css` (current)
- Material theme entry: `frontend/src/custom-theme.scss`
- Design ADR: `docs/architecture/004-angular-material-apple-design.md`
- New recommended locations:
  - `frontend/src/styles/_tokens.scss` (SCSS tokens)
  - `frontend/src/styles/_material-mapping.scss` (Material mapping)
  - `frontend/src/app/core/design-system/` (wrappers + module)

18. Quick governance rules (apply on every UI change)

- Use tokens, not hard-coded values.
- Add/Update Storybook stories for visible changes.
- Run accessibility checks locally before PR.
- Add unit tests for interactive behavior on complex components.

Appendix — Example token usage (SCSS)

```scss
// _tokens.scss (recommended)
$space-1: 8px;
$space-2: 16px;
$color-primary: #0a84ff;
$radius-md: 10px;

// component.scss
.button {
  padding: $space-2;
  background: $color-primary;
  border-radius: $radius-md;
}
```

If you want, I can:

- create the SCSS token files and Material mapping and update `custom-theme.scss`, or
- scaffold `frontend/src/app/core/design-system/design-system.module.ts` with two example wrapper components and Storybook stories.

Select one and I will implement it next.
