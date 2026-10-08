---
name: zinctm-web-workflow
description: Drive the ZincTM web app via the zinctm MCP — sign in, rewrite a requirement's acceptance criteria, create a linked test case, and link an automation script to a test case
source: auto-skill
extracted_at: '2026-08-20T22:11:28.900Z'
---

# Driving ZincTM via the `zinctm` MCP

ZincTM (https://zinctm.cydeo.io) is the QA workspace for ZincBank. You can drive
it end-to-end through the `mcp__zinctm__*` browser tools. This is the workflow
for the common task: sign in → analyze/rewrite a requirement → create a test
case so the requirement counts as covered.

## Sign in
Credentials are read from `ZINCTM_USERNAME` / `ZINCTM_PASSWORD` when a scenario
asks for them (`src/utils/testData.ts`). A missing value fails that scenario.
The login page
has test-ids `login-email`, `login-password`, `login-submit`. After submit you
land on `/dashboard`.

## Rewriting a requirement's acceptance criteria
1. Open the requirement page. Each requirement has a stable UUID URL, e.g.
   `https://zinctm.cydeo.io/requirements/<uuid>` (grab it from the dashboard's
   "Weakest coverage" links).
2. The editable requirement text is `requirement-ac-input` (test-id). Fill it
   with the rewritten, testable acceptance criteria. Because it is a `<textarea>`
   and the "Save my version" button stays disabled until an `input` event fires,
   use `browser_evaluate` with the native value setter + a bubbled `input` event
   (a plain `fill` may not enable the button):
   ```js
   const el = document.querySelector('[data-testid="requirement-ac-input"]');
   const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
   setter.call(el, 'AC1: ...\nAC2: ...');
   el.dispatchEvent(new Event('input', { bubbles: true }));
   ```
3. Click `requirement-save` ("Save my version"). A note appears: *"Saved. Your
   version is the one your test cases are written against."* and the field is
   marked **Rewritten**.
4. **Gotcha:** after saving, the page may bounce back to `/dashboard`. Re-navigate
   to the requirement URL before continuing.

## Creating a test case (this is what raises coverage)
Rewriting a requirement does **NOT** change coverage. Coverage only increments
when a test case is created **and linked** to the requirement.

On the requirement page, the "Add a test case" form uses these test-ids:
- `test-case-title`
- `test-case-preconditions`
- `test-case-steps` (one step per line)
- `test-case-expected` (state a checkable value: status code, error code, exact amount)
- `test-case-labels` (comma separated)
- `test-case-type` (select: functional/negative/boundary/e2e/api/regression/security)
- `test-case-submit` ("Save test case")

The "Requirement" dropdown is pre-selected to the current requirement (D1 etc.),
so you don't need to change it. After saving, the requirement's "Your test cases"
count goes from 0 → 1 and the dashboard shows e.g. **1/46 (2%)**.

Fill the text fields with `browser_fill_form` (title/preconditions/steps/expected/
labels), set the type with `browser_select_option` on `test-case-type` when the
case is not the default `functional` (e.g. `negative`), then click
`test-case-submit`. Confirm the save via the "Created ZTM-<n>." note and the
"Your test cases (1)" heading.

## Linking an automation script to a test case ("Link a script")
This is how a test case gets related to its automated test / page object and is
marked **automated** (the list page says: *"Attach a script to a case to mark it
automated — that is what the coverage board counts"*).

**Where it lives — gotcha:** the test-case **detail** page shows
"Automation: No script" but has NO edit control for it. The "Link a script"
button is only on the **test-cases list page** (`/test-cases`), one per case row.
1. Navigate to `https://zinctm.cydeo.io/test-cases` and click the row's
   "Link a script" button (test-id `script-toggle-ZTM-<n>`).
2. An inline form opens with:
   - `Framework` — default `playwright` (keep unless the script is selenium/api/other)
   - `Automation status` — defaults to `automated`
   - `File path` (test-id `script-path-ZTM-<n>`) — the automation file, e.g.
     `src/pages/ZincBankMoveMoneyPage.ts` (relative repo path works)
   - `Spec / test name` — the test/scenario name, e.g. the Cucumber scenario title
   - `Save script link` (test-id `script-save-ZTM-<n>`)
3. Fill `File path` and `Spec / test name` (plain `browser_fill_form` works here —
   no native-setter hack needed, unlike the requirement textarea), then click save.
4. Verify with `browser_find "<file path>"` — the path now renders in the card and
   the button reads "Edit script link" instead of "Link a script".

## Verifying coverage
After creating the cases, navigate to `/dashboard` and check the "Requirements
covered" stat (e.g. `5/46`, `11%`). Coverage counts requirements with ≥1 linked
test case, so it should equal the number of distinct requirements you added a
case to (plus any pre-existing ones).

## Stale-ref gotcha (important)
Playwright MCP element refs (e.g. `f1e115`) are tied to the last snapshot and go
stale after any page mutation (a save, a navigation, a form fill). If a tool
errors with `Ref ... not found in the current page snapshot`, take a **fresh
`browser_snapshot`** and re-resolve the target refs before acting. Do not reuse
old refs across mutations.

## How to apply
- Use this whenever the user asks to sign into ZincTM, analyze/rewrite a
  requirement, add test cases to raise coverage, or relate/link a test case to
  an automation file (e.g. "make ZTM-x relate to file Y").
- Always re-snapshot after a mutation before the next action.
- Remember: coverage = requirements with ≥1 linked test case, not rewritten text.
