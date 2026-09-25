# RELIVANOW Phase 3C Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Synchronize the saved development-theme configuration into Git, diagnose and correct the PDP color-setting warning only if proven local, and complete authenticated post-Save QA without touching the live theme.

**Architecture:** Treat Shopify development theme `193260781938` as the authoritative source only for the two saved JSON templates, then preserve the repository's JSONC formatting while applying the verified semantic delta. Diagnose the editor warning across schema, stored template value, Horizon native color model and rendered editor behavior; any local repair follows RED→GREEN and deploys through an explicit allowlist. Browser QA remains read-only and records only states actually observed.

**Tech Stack:** Shopify Online Store 2.0, Liquid, JSON/JSONC, Node.js test runner, Shopify CLI 4.x, Chrome/Theme Editor automation.

**Spec:** `C:/Users/Usuario/.codex/attachments/43b1c5ba-463d-40dd-93c2-2d21a89103ca/Pasted text.txt`

## Global Constraints

- Development theme: `193260781938`; protected live theme: `192527597938`.
- Work only on `feat/relivanow-reference-sections`; never modify `main`.
- Never publish, activate PARTIAL/BLOCKED sections, or mutate Products, prices, inventory, Markets, apps or cart state.
- Never invent content or bypass authentication.
- Remote downloads and snapshots stay outside the repository.
- Theme uploads use exact `--only` paths plus `--nodelete`; never upload the complete theme.
- The two reference documents remain excluded only by `.git/info/exclude`.

## Review Focus

- Remote JSON may contain unrelated editor changes: semantic comparison must reject anything outside the 15 documented reference instances.
- Shopify may canonicalize JSON order/defaults: comparisons must distinguish formatting from merchant state.
- Empty stored color values may differ from schema defaults: the test must cover both the schema contract and saved template values.
- Desktop success may hide narrow-width overflow or inaccessible controls: all five required viewports and keyboard/touch states must be observed.
- Preview cookies may silently fall back to live: every browser assertion must prove theme `193260781938` is selected.

---

### Task 1: Synchronize the two saved templates

**Files:**
- Modify: `templates/index.json`
- Modify: `templates/product.json`
- Test: `tests/home-reference-sections.test.mjs`
- Test: `tests/pdp-reference-sections.test.mjs`

**Interfaces:**
- Consumes: TASK-014 development snapshots and the remote state of theme `193260781938`.
- Produces: repository templates semantically identical to the approved post-Save reference-section state.

- [ ] **Step 1: Pull only the two templates to a new temporary directory**

Run Shopify CLI with `--theme 193260781938`, two explicit `--only` options and a temporary `--path`. Do not pull into the repository.

- [ ] **Step 2: Compare the JSONC documents semantically**

Parse from the first `{`, recursively compare all sections, blocks, settings and order entries, and confirm the delta is limited to the nine Home and six PDP reference IDs documented in TASK-014.

- [ ] **Step 3: Apply only the approved semantic delta**

Use controlled patches to retain the existing comment header, indentation and unrelated entries in `templates/index.json` and `templates/product.json`.

- [ ] **Step 4: Verify template contracts**

Run:

```text
node --test tests/home-reference-sections.test.mjs tests/pdp-reference-sections.test.mjs tests/theme-structure.test.mjs
git diff --check
```

Expected: all tests pass; no whitespace errors; semantic local/remote comparison reports equality for the 15 reference entries.

- [ ] **Step 5: Commit and push the synchronization**

```text
git commit -m "chore: sync RELIVANOW section configuration"
git push origin feat/relivanow-reference-sections
```

Expected: the commit contains only the two templates and the branch is synchronized with its feature remote.

### Task 2: Establish the `color_scheme` root cause

**Files:**
- Inspect: `sections/relivanow-pdp-ugc.liquid`
- Inspect: `sections/relivanow-shoppable-hotspots.liquid`
- Inspect: `sections/relivanow-editorial-proof.liquid`
- Inspect: `sections/relivanow-product-highlights.liquid`
- Inspect: `sections/relivanow-offerings.liquid`
- Inspect: `sections/relivanow-complete-look.liquid`
- Inspect: `sections/custom-liquid.liquid`
- Inspect: `config/settings_schema.json`
- Inspect: `config/settings_data.json`
- Test: `tests/pdp-reference-sections.test.mjs`

**Interfaces:**
- Consumes: the synchronized Product template and an authenticated Theme Editor reproduction.
- Produces: exact warning text, affected settings/values/defaults, one evidence-backed hypothesis and a failing regression test if the defect is local.

- [ ] **Step 1: Start a fresh authorized browser session**

Open Theme Editor for theme `193260781938`, prove the development theme identity visually, and reproduce the warning without saving.

- [ ] **Step 2: Capture the complete warning contract**

Record the exact warning, affected section, `color_scheme` setting, saved value, schema default, available options and the exact editor interaction that triggers it.

- [ ] **Step 3: Compare full implementations**

Read the six RELIVANOW sections, the complete native `sections/custom-liquid.liquid` color implementation, `snippets/contrast-override.liquid`, the global color schema/data, and the introducing commit `49693c95df3d2ccba44da207abb9bfc7dba904c3`.

- [ ] **Step 4: State and minimally test one hypothesis**

If evidence shows a local mismatch, add a test requiring RELIVANOW PDP sections to use Horizon's supported `background_color` plus `contrast-override`/`color-custom-<section.id>` contract and to contain no unsupported `color_scheme` setting/class.

- [ ] **Step 5: Verify RED**

```text
node --test tests/pdp-reference-sections.test.mjs
```

Expected: fail specifically because the six PDP reference sections still declare/use `color_scheme`. If the warning is external, do not create an artificial failure or code change; document the evidence.

### Task 3: Apply and deploy the minimum proven color fix

**Files:**
- Modify conditionally: the six RELIVANOW PDP section files listed in Task 2
- Modify conditionally: `tests/pdp-reference-sections.test.mjs`

**Interfaces:**
- Consumes: Task 2's confirmed local hypothesis and RED test.
- Produces: Horizon-native color behavior, green tests, an isolated fix commit and an allowlisted development upload.

- [ ] **Step 1: Implement the native Horizon contract**

For each affected section, replace the legacy `color_scheme` schema setting/class with:

```liquid
{% liquid
  if section.settings.background_color != blank
    render 'contrast-override', background_color: section.settings.background_color, section_id: section.id
  endif
%}
```

Apply `color-custom-{{ section.id }}` only when `background_color` is not blank, and declare the schema setting as a native optional `color` named `background_color`. Do not alter content readiness or commerce behavior.

- [ ] **Step 2: Verify GREEN and the full local suite**

```text
node --test tests/pdp-reference-sections.test.mjs
node --test
git diff --check
```

Expected: targeted and full suites pass, with the fail-closed contracts unchanged.

- [ ] **Step 3: Commit and push the isolated fix**

```text
git commit -m "fix: resolve RELIVANOW color scheme configuration"
git push origin feat/relivanow-reference-sections
```

- [ ] **Step 4: Snapshot, upload and verify only affected section files**

Use explicit `--only` paths and `--nodelete` against theme `193260781938`; download the same paths afterward and compare SHA-256. Re-hash protected live files and confirm theme roles.

- [ ] **Step 5: Confirm the editor warning is gone**

Reload the same section in the authenticated development Theme Editor. Do not Save unless Shopify requires it solely to persist a confirmed correction; never publish.

### Task 4: Perform authenticated post-Save QA

**Files:**
- Create later: `reports/TASK-015-RESULT.md`

**Interfaces:**
- Consumes: verified development theme and authenticated preview selection.
- Produces: observed QA evidence for seven READY sections and mandatory regressions.

- [ ] **Step 1: Prove preview identity and inspect five viewports**

Use 1440×900, 1024×768, 768×1024, 390×844 and 360×800 on Home and the real feeder PDP. At each width inspect visible content, correct media/copy/links/products/prices, overflow and responsive structure.

- [ ] **Step 2: Exercise non-mutating interaction/accessibility states**

Test carousel/video controls, keyboard, visible focus, 44px touch targets and reduced motion without submitting forms or adding to cart.

- [ ] **Step 3: Run regressions**

Inspect existing Home/PDP, gallery, variant presentation without selection mutation, sticky navigation, Judge.me `No reviews`, Search, and open/close Cart Drawer without cart mutation.

- [ ] **Step 4: Inspect console**

Record actual errors/warnings for Home, PDP and Search. Never mark an unobserved state PASS.

### Task 5: Final validation, report and documentation commit

**Files:**
- Create: `reports/TASK-015-RESULT.md`
- Include: this plan document

**Interfaces:**
- Consumes: Tasks 1–4 evidence.
- Produces: auditable TASK-015 record and a clean synchronized feature branch.

- [ ] **Step 1: Run all technical gates**

Run the full Node suite, TASK-011/TASK-012/new contracts, `node --check` on all JavaScript, repository JSON/JSONC/schema/setting-ID checks, raw and diagnostic Theme Check, `git diff --check`, and scans for trackers, remote runtime URLs and fabricated content.

- [ ] **Step 2: Write the result report**

Record template synchronization, commits, exact warning/root cause/test/fix decision, deployment allowlist/hashes, seven READY sections, viewport/regression/console evidence, protected-live hashes, eight disabled sections and any remaining gates.

- [ ] **Step 3: Verify documentation scope**

Confirm the staged documentation contains no reference files, credentials, screenshots with sensitive data or unrelated changes.

- [ ] **Step 4: Commit and push documentation**

```text
git commit -m "docs: record RELIVANOW post-save QA"
git push origin feat/relivanow-reference-sections
```

- [ ] **Step 5: Final clean-state verification**

Expected: local HEAD equals `origin/feat/relivanow-reference-sections`, working tree clean, development still role `development`, live still role `live`, no publication or PR.
