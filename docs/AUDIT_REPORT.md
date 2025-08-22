# Frontend & Project Style Audit

Date: 2025-08-16
Auditor: Automated audit (GitHub Copilot)

## Scope

Frontend (Angular) files and repo tooling, plus brief backend review for QA alignment. Key files inspected:

- `frontend/src/global_styles.css`
- `frontend/src/custom-theme.scss`
- `frontend/package.json`
- `frontend/angular.json`
- `backend/build.gradle`
- `docs/STYLE_GUIDE.md`
- `docs/architecture/004-angular-material-apple-design.md`

## High-level summary

The project has a strong design ADR and a freshly added `STYLE_GUIDE.md`. However, enforcement and infrastructure for the guide are incomplete: theming tokens live in a runtime CSS file, `custom-theme.scss` is not mapped to SCSS tokens and likely misconfigured, and essential developer tooling (ESLint, Prettier, Stylelint, CI workflows, Storybook, accessibility checks) is missing or minimal. Backend has basic test tooling but code-quality gates are weak.

## Principal findings (priority)

1. Tooling & CI missing (P0)

   - No lint/format configs (`.eslintrc`, `.prettierrc`, `.stylelintrc`) and no CI workflows in the repo.
   - `package.json` lacks lint/test/storybook scripts and devDependencies.

2. Theming/tokenization mismatch (P1)

   - Design tokens are in `global_styles.css` (runtime) but not in SCSS token file.
   - `custom-theme.scss` contains invalid/untested constructs and does not import centralized tokens.

3. Accessibility & visual regression not enforced (P1)

   - STYLE_GUIDE requires WCAG 2.1 AA but no axe/storybook tests configured.

4. Inconsistent styling frameworks (P1)

   - Bootstrap and Angular Material coexist; acceptable if deliberate but must be governed in the style guide.

5. Backend QA configuration gaps (P1)

   - JaCoCo exists but coverage threshold is `0.0`. Missing Checkstyle/SpotBugs configuration.

6. Governance & repo hygiene (P2)
   - Missing `.editorconfig`, `.gitattributes`, CONTRIBUTING.md, `.github/PULL_REQUEST_TEMPLATE.md`, and lockfile evidence for package manager.

## Quick actionable recommendations (order by priority)

1. Add frontend linting/formatting and commit hooks (P0)

   - Install and configure: `@angular-eslint`, `prettier`, `stylelint`, `lint-staged`, `husky`, `commitlint`.
   - Add `npm run lint`, `npm run format` scripts and pre-commit hooks.

2. Add minimal CI workflow (P0)

   - GitHub Actions pipeline: install, `npm ci`, `npm run lint`, `npm run build`, `npm test`.

3. Centralize tokens (P1)

   - Create `frontend/src/styles/_tokens.scss` from `global_styles.css` variables.
   - Update `custom-theme.scss` to import `_tokens.scss` and create a valid Angular Material theme mapping.

4. Enable accessibility & Storybook (P1)

   - Add Storybook, `@storybook/addon-a11y`, and `jest-axe`/axe checks in CI for critical stories.

5. Backend QA improvements (P1)

   - Add Checkstyle or Spotless + google-java-format; configure SpotBugs/PMD; set JaCoCo thresholds to a sensible baseline.

6. Governance files and PR template (P2)
   - Add `.editorconfig`, `.gitattributes`, CONTRIBUTING.md and `.github/PULL_REQUEST_TEMPLATE.md` that references `docs/STYLE_GUIDE.md`.

## Files to create / change (recommended starter list)

- `frontend/src/styles/_tokens.scss` (new)
- `frontend/src/styles/_material-mapping.scss` (new)
- `frontend/src/custom-theme.scss` (update to import tokens and define Material theme)
- `.eslintrc.json`, `.prettierrc`, `.stylelintrc` (new)
- `package.json` scripts and devDependencies update
- `.github/workflows/frontend-ci.yml` (new)
- `docs/CONTRIBUTING.md` and `.github/PULL_REQUEST_TEMPLATE.md` (new)
- `frontend/.storybook/main.js` and initial stories (new)
- `backend/config/checkstyle.xml` or Spotless config (new)

## Estimates (rough)

- Lint + CI bootstrap: 1–2 days
- Tokens + theme mapping: 0.5–1 day
- Storybook + a11y checks: 1–2 days
- Backend static analysis onboarding: 0.5–1 day

## Suggested next step (automatable)

I can create the SCSS token files and convert `custom-theme.scss` to a valid Angular Material theme mapping, then update `angular.json` styles order as needed. Alternatively I can scaffold frontend linting configs and a basic GitHub Actions CI workflow.

Choose one to implement and I will apply the changes.

---

End of report.
