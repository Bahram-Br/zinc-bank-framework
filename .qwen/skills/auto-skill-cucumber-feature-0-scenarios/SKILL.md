---
name: cucumber-feature-0-scenarios
description: Diagnose "Cucumber reports 0 scenarios" for a newly added .feature file in this Playwright + Cucumber.js framework — isolate discovery vs parsing, then re-run (often transient on Windows)
source: auto-skill
extracted_at: '2026-10-06T16:38:26.922Z'
---

# Cucumber reports 0 scenarios for a new .feature file

Symptom: the user adds a `.feature` file, `npx cucumber-js` runs, but the summary
shows `0 scenarios` (or the new file's scenario is missing while old ones run).
Worked case: `features/step-definitions/zinctm.feature` was valid Gherkin (clean
ASCII, no BOM, correct tags), yet cucumber showed 0 scenarios until a later
re-run — the cause was transient (editor still holding/writing the file), NOT
the file content.

## Diagnostic ladder (check in this order)

1. **See what is actually discovered first — dry-run, no tags.**
   `npx cucumber-js --dry-run` prints the scenario count without launching a
   browser. If a new file's scenario is absent here, it is a discovery/parse
   problem, not a tag-filter problem. Use `--dry-run --format json` to see the
   exact feature URIs cucumber found.
   Note: dry-run still writes the configured reports/ artifacts (gitignored).

2. **Isolate with an explicit path.**
   `npx cucumber-js --dry-run features/step-definitions/<file>.feature`
   - works → the file is fine; the default glob or a tag filter was the issue.
   - still 0 scenarios → file is being dropped in discovery or parsing.

3. **Rule out the tag filter (a red herring here).** Quote it:
   `npx cucumber-js --dry-run --tags "@zinctm"`. If the untagged dry-run shows
   the scenario but the tagged one doesn't, the tag expression/placement is the
   issue — otherwise move on.

4. **Verify the file on disk is byte-clean** (fast, read-only):
   - `git status --short` and `git check-ignore -v <path>` — not gitignored?
   - PowerShell: `Get-ChildItem features/step-definitions -Force | Format-List
     Name,Length,Attributes` — exact filename (no trailing space/Unicode), no
     Hidden/Offline attributes.
   - Hex-dump the first bytes: `[System.IO.File]::ReadAllBytes('<path>')` —
     expect plain ASCII/UTF-8, no BOM (`40 7A...` = `@z`).
   A clean file rules out encoding/name/gitignore causes.

5. **Test discovery directly (what cucumber uses).** cucumber-js v13 discovers
   features with Node's native `node:fs/promises` glob (`lib/paths/paths.js`,
   `expandPaths`), default pattern `features/**/*.{feature,feature.md}`. Reproduce:
   ```bash
   node -e "const {glob}=require('node:fs/promises');(async()=>{for await (const f of glob('features/**/*.{feature,feature.md}')) console.log(f)})()"
   ```
   If the file appears here, discovery is NOT the problem.

6. **Test parsing directly (what cucumber's pipeline uses).** Reproduce with the
   same stream library cucumber-js uses:
   ```bash
   node -e "const {GherkinStreams}=require('@cucumber/gherkin-streams');const m=require('@cucumber/messages');(async()=>{const es=[];for await (const e of GherkinStreams.fromPaths(['features/step-definitions/<file>.feature'],{includeSource:true,includeGherkinDocument:true,includePickles:true,relativeTo:process.cwd(),newId:m.IdGenerator.uuid()}))es.push(e);console.log(es.map(e=>Object.keys(e)[0]).join(','));const d=es.find(e=>e.gherkinDocument);console.log(d?JSON.stringify(d.gherkinDocument.feature.children.map(c=>c.scenario?.name)):'NO DOC')})()"
   ```
   Expect `source,gherkinDocument,pickle` and the scenario name. If parsing
   works, the file is valid — see step 7.

7. **Re-run cucumber.** If steps 5–6 pass but cucumber showed 0 scenarios, the
   drop is almost always transient on Windows: the file was mid-save / held open
   by the editor (or not yet flushed) when cucumber globbed and read it. Re-run
   `npx cucumber-js --dry-run features/step-definitions/<file>.feature` — it
   typically finds the scenario on the second run. Then run the real test.

## Repo-specific context
- Features and step definitions live together in `features/step-definitions/`
  (the cucumber.js config has no `paths` key; default glob covers it).
- Run a single feature/tag: `npx cucumber-js --tags @zinctm` (tags on this repo:
  `@zinctm`, `@zincbank`, `@smoke`, `@positive`, `@negative`).
- Dry-run also verifies step definitions: `undefined steps` would be reported —
  if the count is right but steps are undefined, fix the step file, not the feature.

## Hygiene
- Do NOT leave diagnostic artifacts in the repo root (e.g. a
  `reports-dryrun.json` created via shell redirect) — the root is NOT gitignored.
  Put scratch JSON in `reports/` (gitignored) or clean it up.
- These are diagnosis tasks: read-only by default; run no browser, create no
  files, until the user asks to actually execute.
