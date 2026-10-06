# Zinc Bank Framework
UI automation for the [Zinc Bank](https://zincbank.cydeo.io/login) practice app. Built with **Playwright**, **Cucumber.js**, and **TypeScript** using the Page Object Model (POM).
Playwright + Cucumber.js + TypeScript UI automation for Zinc Bank, using the Page Object Model.
This is a focused teaching / interview portfolio slice—not an enterprise suite. Today it covers two Zinc Bank login scenarios (happy path + invalid credentials). ZincTM page objects exist but are not wired into features yet.
Current coverage: two scenarios in `features/step-definitions/zincbank.feature` (valid login → dashboard, invalid login → error). ZincTM page objects live under `src/pages/` but have no feature scenarios yet.
## Stack
| Layer | Choice |
|-------|--------|
| Language | TypeScript |
| Browser automation | Playwright |
| BDD | Cucumber.js (Gherkin features + step definitions) |
| Pattern | Page Object Model |
| Config | `dotenv` + typed `src/config/config.ts` |
| Reports | Cucumber HTML + JSON under `reports/` |
- **TypeScript** — `tsconfig.json`, compiled on the fly via `ts-node`
- **Playwright** — browser automation (`@playwright/test`)
- **Cucumber.js** — BDD features + steps (`cucumber.js`)
- **dotenv** — local config from `.env`
- **Page Object Model** — `src/pages/`
## Setup

[3 lines collapsed]

cp .env.example .env
```
Edit `.env` and set the values your team provides. **Never commit `.env`.**
Fill `.env` with your credentials. Do not commit `.env` (it is gitignored).
### Required environment variables
### Environment variables (from `.env.example`)
For the current Zinc Bank login scenarios:
| Variable | Required for current Zinc Bank scenarios | Notes |
|----------|------------------------------------------|--------|
| `VALID_USERNAME` | Yes | Fail-fast if missing (`src/utils/testData.ts`) |
| `VALID_PASSWORD` | Yes | Fail-fast if missing |
| `BASE_URL` | No | Defaults in `src/config/config.ts` if empty |
| `BROWSER` | No | Default `chromium` (`firefox` / `webkit` also supported) |
| `HEADLESS` | No | Default `true`; set `false` for headed |
| `ZINCTM_BASE_URL` | No | For ZincTM (not used by current feature) |
| `ZINCTM_USERNAME` / `ZINCTM_PASSWORD` | No | Fail-fast only if a ZincTM scenario reads them |
| `OWNER_USERNAME` / `OWNER_PASSWORD` | No | Optional owner account |
| Variable | Purpose |
|----------|---------|
| `VALID_USERNAME` | Valid Zinc Bank login email |
| `VALID_PASSWORD` | Valid Zinc Bank password |
### Optional / other accounts
| Variable | Purpose |
|----------|---------|
| `BASE_URL` | Zinc Bank login URL (defaults to `https://zincbank.cydeo.io/login` if unset) |
| `BROWSER` | `chromium` (default), `firefox`, or `webkit` |
| `HEADLESS` | `true` (default) or `false` for a visible browser |
| `ZINCTM_BASE_URL` | ZincTM practice site URL |
| `ZINCTM_USERNAME` / `ZINCTM_PASSWORD` | ZincTM credentials (needed when ZincTM scenarios are added) |
| `OWNER_USERNAME` / `OWNER_PASSWORD` | Optional owner account |
`.env.example` lists every key with empty placeholders. Real credentials belong only in a local `.env` or CI secret store.
## How to run
```bash
# All scenarios (default)
npm test
Scripts from `package.json`:
# Headed browser
npm run test:headed
# Chromium explicitly
npm run test:chromium
# Tag filters (examples from the current feature file)
```bash
npm test                 # all scenarios (cucumber-js)
npm run test:headed      # HEADLESS=false
npm run test:chromium    # BROWSER=chromium
npm run test:feature     # same as npm test
npm run test:tag -- @smoke
npm run test:tag -- @negative
npm run test:tag -- @zincbank
npm run test:tag -- "@smoke and @positive"
# Typecheck only
npm run typecheck
npm run typecheck        # tsc --noEmit
npm run report           # prints reports/cucumber-report.html path
```
### Reports
Tags in `zincbank.feature`: `@zincbank`, `@smoke`, `@positive`, `@negative`.
After a run, Cucumber writes:
### Reports & screenshots
- `reports/cucumber-report.html` — open in a browser
- `reports/cucumber-report.json` — machine-readable
Configured in `cucumber.js`:
- `reports/cucumber-report.html`
- `reports/cucumber-report.json`
- Failure screenshots → `screenshots/` (gitignored; directory kept via `.gitkeep`)
Open the HTML report after a run:
```bash
npm run report   # prints the HTML report path
# macOS: open reports/cucumber-report.html
# Linux:  xdg-open reports/cucumber-report.html
# macOS
open reports/cucumber-report.html
# Linux
xdg-open reports/cucumber-report.html
```
Failed scenarios also save screenshots under `screenshots/` (gitignored).
## Project layout (what is in this folder)
## Folder map
```