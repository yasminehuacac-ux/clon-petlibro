# RELIVANOW Home Reference Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add nine disabled-by-default, editor-configurable RELIVANOW Home reference experiences while preserving the currently approved Home and all existing section instances.

**Architecture:** Use eight scoped RELIVANOW sections plus one native `collection-list` instance. Reuse theme primitives where safe, isolate new styles and scripts, and require explicit confirmation for any campaign, community, or expert content. The existing marquee runtime receives an opt-in branch only; its legacy path remains the default.

**Tech Stack:** Shopify Online Store 2.0, Liquid, JSON templates, scoped CSS, vanilla custom elements, Node.js built-in test runner, Shopify Theme Check

**Spec:** `docs/superpowers/specs/2026-09-24-relivanow-home-reference-sections-design.md`

## Global Constraints

- Keep the approved Home section settings, ordering, enabled state, and content unchanged.
- Append exactly nine new `templates/index.json` entries and set every one to `"disabled": true`.
- Do not modify `sections/collection-list.liquid`; preserve existing marquee behavior unless opt-in data attributes are present.
- Sections 4, 6, and 7 fail closed outside Theme Editor.
- Do not invent campaigns, discounts, experts, UGC, reviews, claims, deadlines, or commercial content.
- Reference inputs remain local-only through `.git/info/exclude` and are absent from the commit.
- Use one final local commit named `feat: integrate RELIVANOW Home reference sections`; no intermediate commits.
- Do not push, save in Theme Editor, upload a theme, publish, or modify theme `192527597938`.

## Review Focus

- Empty/unconfirmed content must produce no public wrapper for campaign, community, and expert sections; Task 5 exercises this contract.
- Malformed or expired countdown timestamps must not create a timer or expose campaign content; Task 5 exercises timestamp parsing and fail-closed markup.
- Missing opt-in marquee attributes must preserve the legacy speed formula and hover behavior; Task 2 exercises both runtime paths.
- Empty product/collection selections must not generate broken links, fake cards, or placeholder commerce content publicly; Task 7 exercises native-source filtering.
- Reduced-motion users must not receive autoplay or forced marquee animation; Tasks 2, 3, and 6 exercise reduced-motion hooks.

---

### Task 1: Repository contract and red tests

**Files:**
- Create: `tests/home-reference-sections.test.mjs`
- Modify locally only: `.git/info/exclude`

**Interfaces:**
- Consumes: current `templates/index.json`, section schema JSON, and committed file inventory.
- Produces: behavioral contract tests for the nine disabled instances, compatibility boundaries, schemas, fail-closed markers, and source hygiene.

- [ ] **Step 1: Exclude the two local reference inputs**

Add these exact repository-relative lines to `.git/info/exclude` if absent:

```text
/RELIVANOW_SECTION_REFERENCES.pdf
/RELIVANOW_SECTION_SPECS_MINUCIOSAS.md
```

- [ ] **Step 2: Write the failing template and section contract tests**

Create Node tests that snapshot the eight existing Home entries before the first reference entry, assert the nine literal IDs/types in their specified order, assert `disabled === true`, parse every new schema, and verify required source settings (`product`, `collection`, `video`, `image`, status, alt, CTA, responsive layout) exist.

- [ ] **Step 3: Add behavior-oriented compatibility tests**

Execute the marquee class in a controlled DOM fixture and assert the legacy duration formula/hover listeners when opt-in attributes are absent, the distance-based duration when present, and no hover listeners when `data-pause-on-hover="false"`. Assert `collection-list.liquid` remains identical to the recorded SHA-256 fixture value taken before implementation.

- [ ] **Step 4: Run the focused tests and verify failure**

Run: `node --test tests/home-reference-sections.test.mjs`

Expected: FAIL because the new section files and nine template entries do not exist.

### Task 2: Promotion marquee with opt-in runtime controls

**Files:**
- Create: `sections/relivanow-promotion-marquee.liquid`
- Modify: `assets/marquee.js`
- Test: `tests/home-reference-sections.test.mjs`

**Interfaces:**
- Consumes: the existing `<marquee-component>` contract and CSS custom properties.
- Produces: optional `data-speed-mode="distance"`, `data-seconds-per-100`, and `data-pause-on-hover` attributes; the no-attribute legacy path remains unchanged.

- [ ] **Step 1: Add failing runtime tests**

Use a minimal fake custom-element environment to import `assets/marquee.js`, control wrapper width, capture CSS duration, and capture pointer listeners. Expected distance duration is literal `6s` for a 300px loop at 2 seconds per 100px.

- [ ] **Step 2: Run the focused test and observe the missing opt-in behavior**

Run: `node --test tests/home-reference-sections.test.mjs --test-name-pattern="marquee"`

Expected: FAIL on the distance calculation and opt-out hover listener assertion.

- [ ] **Step 3: Implement the opt-in runtime branch and section**

Keep `speedFactor = 25` and default hover listeners for legacy instances. For the new branch, calculate `loopDistance / 100 * secondsPer100`, apply direction, expose desktop/mobile gap and padding CSS variables, render linked text blocks, and stop animation under `prefers-reduced-motion`.

- [ ] **Step 4: Run the focused tests**

Run: `node --test tests/home-reference-sections.test.mjs --test-name-pattern="marquee"`

Expected: PASS.

### Task 3: Video slideshow and image gallery

**Files:**
- Create: `sections/relivanow-video-slideshow.liquid`
- Create: `sections/relivanow-image-gallery.liquid`
- Test: `tests/home-reference-sections.test.mjs`

**Interfaces:**
- Consumes: native Shopify `video`, `video_url`, `image_picker`, and theme slideshow elements/snippets.
- Produces: responsive video slides with safe segmented headings and a 3:4 scroll-snapping gallery with optional hover art.

- [ ] **Step 1: Add failing schema and rendering-contract tests**

Assert the video schema caps slides at four, defaults heading level to `h2`, separates highlighted text from surrounding heading text, requires confirmation status, and supports desktop/mobile poster art. Assert gallery cards expose primary/hover images, alt, label, link, and new-tab choice; assert 3:4 aspect ratio and reduced-motion CSS are present.

- [ ] **Step 2: Run the focused tests and verify failure**

Run: `node --test tests/home-reference-sections.test.mjs --test-name-pattern="video slideshow|image gallery"`

Expected: FAIL because both sections are absent.

- [ ] **Step 3: Implement both sections**

Render only confirmed, configured video slides outside design mode; keep video muted/inline and avoid loading unconfigured media. Render gallery cards only for selected images, use responsive `image_url`/`image_tag`, and provide Theme Editor-only configuration guidance for empty sections.

- [ ] **Step 4: Run the focused tests**

Run the same name-pattern command. Expected: PASS.

### Task 4: Campaign grid and safe countdown lifecycle

**Files:**
- Create: `sections/relivanow-campaign-grid.liquid`
- Create: `assets/relivanow-countdown.js`
- Test: `tests/home-reference-sections.test.mjs`

**Interfaces:**
- Consumes: a merchant-entered ISO-8601 timestamp and confirmed image/video campaign-card blocks.
- Produces: `<relivanow-countdown data-end-at>` with four labeled units and a timer that removes itself at expiration.

- [ ] **Step 1: Add failing countdown and fail-closed tests**

Import the custom element with a fake clock/attributes and assert blank, malformed, and past timestamps never start an interval; a future timestamp renders hand-derived day/hour/minute/second values; disconnect clears the interval. Assert Liquid requires `campaign_status == 'CONFIRMED'`, a heading, a future timestamp, and at least two confirmed media blocks before public output.

- [ ] **Step 2: Run focused tests and verify failure**

Run: `node --test tests/home-reference-sections.test.mjs --test-name-pattern="campaign|countdown"`

Expected: FAIL because the component and section are absent.

- [ ] **Step 3: Implement the timer and campaign section**

Build an idempotent custom element with `connectedCallback`, `disconnectedCallback`, strict `Date.parse` validation, one-second updates, and an `expired` event/state. Scope the asymmetric grid, video/image rendering, and design-mode guidance to the section.

- [ ] **Step 4: Run focused tests**

Run the same name-pattern command. Expected: PASS.

### Task 5: Community videos and expert cards

**Files:**
- Create: `sections/relivanow-community-videos.liquid`
- Create: `sections/relivanow-expert-cards.liquid`
- Create: `assets/relivanow-video-card.js`
- Test: `tests/home-reference-sections.test.mjs`

**Interfaces:**
- Consumes: explicitly confirmed card blocks with media, alt text, and identity fields.
- Produces: keyboard-operable community video cards and linked expert media cards with no default endorsement language.

- [ ] **Step 1: Add failing fail-closed and media-control tests**

Assert public wrappers require nonblank headings and at least two fully confirmed blocks. Import the video-card custom element and verify its button toggles the real video `play()`/`pause()`, updates `aria-label`, and handles rejected playback without claiming an active state.

- [ ] **Step 2: Run focused tests and verify failure**

Run: `node --test tests/home-reference-sections.test.mjs --test-name-pattern="community|expert|video card"`

Expected: FAIL because the files are absent.

- [ ] **Step 3: Implement both fail-closed sections and the video controller**

Use strict `CONFIRMED` checks, minimum valid-card counts, editor-only empty guidance, responsive five/two-card layouts, responsive images, and visible focus styles. Keep all default headings and identities empty.

- [ ] **Step 4: Run focused tests**

Run the same name-pattern command. Expected: PASS.

### Task 6: Native category carousel and trending grid

**Files:**
- Create: `sections/relivanow-trending-grid.liquid`
- Modify: `templates/index.json`
- Test: `tests/home-reference-sections.test.mjs`

**Interfaces:**
- Consumes: native collection-list settings plus selected product/collection objects in trending blocks.
- Produces: one disabled native category-carousel instance and a responsive eight/three-column trending grid with up to sixteen entities.

- [ ] **Step 1: Add failing native-source tests**

Assert the category instance type is exactly `collection-list`, carousel layout is selected, no collection placeholders are configured, and the implementation file hash remains unchanged. Assert trending has product/collection selectors, max sixteen blocks, filters blank selections, and uses native entity title/URL/image.

- [ ] **Step 2: Run focused tests and verify failure**

Run: `node --test tests/home-reference-sections.test.mjs --test-name-pattern="category|trending"`

Expected: FAIL because the template instance and trending section are absent.

- [ ] **Step 3: Implement trending and the category configuration**

Create the scoped grid and schema, then configure the disabled native carousel without modifying `collection-list.liquid`.

- [ ] **Step 4: Run focused tests**

Run the same name-pattern command. Expected: PASS.

### Task 7: Product offer rail and complete template integration

**Files:**
- Create: `sections/relivanow-product-offers.liquid`
- Modify: `templates/index.json`
- Test: `tests/home-reference-sections.test.mjs`

**Interfaces:**
- Consumes: a confirmed campaign tile and real Shopify product blocks.
- Produces: campaign-plus-product horizontal rail using native product title, URL, image, price, and compare-at price; custom labels require separate confirmation.

- [ ] **Step 1: Add failing commerce-integrity tests**

Assert empty product selections are skipped, at least two products are required for public output, campaign fields and link are required, product price fields are read from the Shopify object, and custom label output is guarded by `label_status == 'CONFIRMED'`.

- [ ] **Step 2: Run focused tests and verify failure**

Run: `node --test tests/home-reference-sections.test.mjs --test-name-pattern="product offers|template integration"`

Expected: FAIL because the rail and final set of nine template entries are incomplete.

- [ ] **Step 3: Implement the rail and append all nine disabled instances**

Append the nine IDs in reference order after the eight existing IDs. Preserve the existing objects exactly and use empty settings/blocks where a truthful native source is unavailable.

- [ ] **Step 4: Run the complete contract file**

Run: `node --test tests/home-reference-sections.test.mjs`

Expected: PASS.

### Task 8: Documentation, complete validation, visual QA, and single commit

**Files:**
- Create: `tasks/TASK-011-HOME-REFERENCE-SECTIONS.md`
- Create: `reports/TASK-011-RESULT.md`
- Modify: `TASKS.md`
- Modify: `PROJECT_STATUS.md`
- Modify: `CHANGELOG.md`
- Modify as evidence requires: `docs/QA_MATRIX.md`, `docs/ASSET_MANIFEST.md`, `docs/CONTENT_MATRIX.md`, `docs/DECISIONS.md`

**Interfaces:**
- Consumes: completed implementation and all command output.
- Produces: reproducible release evidence, limitations, missing-asset inventory, and one local commit.

- [ ] **Step 1: Run automated validation**

Run, in order:

```powershell
node --test tests/*.test.mjs
node --check assets/marquee.js
node --check assets/relivanow-countdown.js
node --check assets/relivanow-video-card.js
shopify.cmd theme check
git diff --check
```

Record exact pass/fail counts and classify only pre-existing Theme Check warnings as inherited.

- [ ] **Step 2: Run content, privacy, and reference scans**

Search tracked diffs for trackers, third-party scripts, unconfirmed campaign/review/expert language, absolute asset URLs, broken local asset references, duplicate IDs, and both reference document names. Confirm `git check-ignore -v` resolves both inputs through `.git/info/exclude` and `git ls-files` returns neither.

- [ ] **Step 3: Perform responsive visual QA**

Render an isolated local fixture at 1440×900, 1024×768, 768×1024, 390×844, and 360×800. Inspect overflow, card proportions, focus controls, wrapping, reduced-motion fallbacks, and empty-state suppression. Record that real storefront/Theme Editor visual QA is pending because uploads and saves are explicitly prohibited.

- [ ] **Step 4: Review the complete diff and repository state**

Run `git diff --stat`, `git diff`, `git status --short`, and compare the first eight Home objects against base commit `71618d5b4d77931aa29ec8469e6cde1b2be1da17`. Confirm there is no command or change targeting theme `192527597938`.

- [ ] **Step 5: Update task/status/report documents**

Record files, exact tests, warnings, editor configuration, missing media, visual QA scope, and the no-push/no-publish guarantee. Mark TASK-011 done while leaving TASK-010's external blockers unchanged.

- [ ] **Step 6: Create the single local commit**

Stage only intended source, test, and documentation files; verify the two references are absent; then run:

```powershell
git commit -m "feat: integrate RELIVANOW Home reference sections"
```

- [ ] **Step 7: Verify the commit without external mutation**

Run `git status --short`, `git rev-parse HEAD`, and `git show --stat --oneline --decorate HEAD`. Do not push or invoke any Shopify upload/save/publish command.
