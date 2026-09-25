# TASK-015 — Phase 3C synchronization, color diagnosis and post-Save QA

**Status:** PARTIAL — synchronization, root-cause fix, selective deployment and live protection passed; authenticated visual QA remains blocked

**Date:** 2026-09-24

**Store:** `relivanow.myshopify.com`

**Branch:** `feat/relivanow-reference-sections`

**Starting HEAD:** `3b058fdc784c5e320f52be67ae1991b43047eabd`

**Development theme:** `193260781938` — `Development (bfe2c0-DESKTOP-EHRJHE7)` — role `development`

**Protected live theme:** `192527597938` — `Dawn` — role `live`

## Outcome

The post-Save state from development theme `193260781938` is synchronized into Git. The editor's color warning was traced to a local schema mismatch, covered by a RED→GREEN regression test, corrected with Horizon's native palette-compatible pattern and deployed through a seven-file allowlist. The protected live files are byte-identical before and after deployment.

The mandatory real browser QA is not complete. A newly requested Chrome session timed out and reset the browser helper; the single allowed recovery call also timed out and reset it. No stale session, unauthenticated response or prior TASK-013/TASK-014 observation is presented as current visual proof.

## 1. Template synchronization

Only these remote development files were downloaded into a new temporary directory outside the repository:

- `templates/index.json`
- `templates/product.json`

No general pull was run against the repository.

### Comparison method and findings

The JSONC header was removed in memory and objects were compared recursively. A direct local/remote comparison exposed Shopify Theme Editor canonicalization outside the 15 reference instances: empty schema values were materialized, empty `blocks`/`block_order` containers were omitted and hex colors were lower-cased. These generated defaults were not copied into Git.

The remote reference objects were then compared independently and reviewed against TASK-014. The approved configuration was the only material reference-state delta:

- seven READY sections enabled and configured;
- four PARTIAL sections configured or retained fail-closed and disabled;
- four BLOCKED sections retained fail-closed and disabled;
- only the documented Products, Collections, Shopify media, text and blank optional links;
- no campaign, discount, review, UGC, expert or commercial claim added.

After controlled edits, the 15 local `reference_*` entries reported `REFERENCE_DIFF_COUNT=0` against the remote state, treating only omitted empty `{}`/`[]` containers as equivalent.

### Files incorporated

- `templates/index.json`
- `templates/product.json`
- `tests/home-reference-sections.test.mjs`
- `tests/pdp-reference-sections.test.mjs`

The two contract files were updated because their previous assertions required all 15 instances to remain empty and disabled. They now pin the approved 7/8 activation state and fail-closed values.

### Synchronization commit

`9991693f02db9ed455a5398db673cd849934e96e` — `chore: sync RELIVANOW section configuration`

The commit was pushed only to `origin/feat/relivanow-reference-sections`.

## 2. `color_scheme` warning diagnosis

### Exact warning

The authenticated TASK-014 editor session displayed:

> Para previsualizar tus cambios, los esquemas de colores deben definirse en los archivos settings_data y settings_schema.

It appeared when an affected new PDP section was selected in Theme Editor. A fresh reproduction attempt in this phase was blocked by the browser-helper failure described below.

### Affected contract before correction

All six new PDP section schemas declared:

```json
{ "type": "color_scheme", "id": "color_scheme", "label": "Color scheme", "default": "scheme-1" }
```

Affected files:

- `sections/relivanow-pdp-ugc.liquid`
- `sections/relivanow-shoppable-hotspots.liquid`
- `sections/relivanow-editorial-proof.liquid`
- `sections/relivanow-product-highlights.liquid`
- `sections/relivanow-offerings.liquid`
- `sections/relivanow-complete-look.liquid`

Each synchronized template instance stored `"color_scheme": ""`. The schema default was `scheme-1`, but the number of valid scheme options was **zero** because:

- `config/settings_schema.json` contains exactly one `color_palette` and zero `color_scheme_group` settings;
- `config/settings_data.json` contains no `color_schemes` group data;
- native Horizon section/block files in this repository contain zero `color_scheme` declarations;
- Horizon's native `sections/custom-liquid.liquid` uses an optional `background_color` of type `color`, `snippets/contrast-override.liquid` and a conditional `color-custom-{{ section.id }}` class.

Shopify's official setting reference states that `color_scheme` picker entries are defined by `color_scheme_group`, and that no group data yields `nil`: [Shopify input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings). Shopify's 2026 color-palette guidance identifies Horizon as a palette-based theme and recommends individual `color`/`color_background` overrides: [Shopify color palettes changelog](https://shopify.dev/changelog/color-palettes).

### Introducing change and root cause

Commit `49693c95df3d2ccba44da207abb9bfc7dba904c3` introduced the same legacy `color_scheme` setting and `color-{{ section.settings.color_scheme }}` class in all six files.

**Root cause:** the new PDP sections used Dawn/legacy color-scheme semantics inside Horizon 4.1.1, whose configured color system is `color_palette`. Because no `color_scheme_group` exists, Shopify had no valid options to populate or preview and emitted the warning.

This is a local theme-code defect, not a Shopify/app/content-only warning.

## 3. Test and correction

### Regression test

Test added to `tests/pdp-reference-sections.test.mjs`:

`PDP reference sections use the Horizon palette-compatible background override contract`

The test verifies that:

- the theme has one `color_palette` and no `color_scheme_group`;
- none of the six sections declares `color_scheme`;
- every section declares an optional `background_color` of type `color` without a hardcoded default;
- every section calls `contrast-override` and conditionally applies `color-custom-{{ section.id }}`;
- no legacy saved `color_scheme` key remains in the Product template.

RED evidence: 13/14 tests passed; the new test failed first at `sections/relivanow-pdp-ugc.liquid` because `color_scheme` was still present.

GREEN evidence: after the minimal correction, 14/14 targeted tests passed and the complete suite passed 52/52.

### Minimal correction

Each affected section now follows Horizon's native contract:

```liquid
{% liquid
  if section.settings.background_color != blank
    render 'contrast-override', background_color: section.settings.background_color, section_id: section.id
  endif
%}
```

The wrapper receives `color-custom-{{ section.id }}` only when the optional override is set. The six obsolete blank template values were removed. Section readiness, blocks, content, Products, forms, prices and fail-closed behavior were not changed.

### Correction commit

`1ef0c93786f4d9ccb1f43b1eec059c360083da46` — `fix: resolve RELIVANOW color scheme configuration`

The commit was pushed only to `origin/feat/relivanow-reference-sections`.

### Theme Editor confirmation

**BLOCKED:** the browser helper failed before the editor could be reopened, so disappearance of the warning is not visually claimed. Static schema evidence, the RED→GREEN contract and exact development download prove the invalid dependency is absent remotely, but a fresh editor observation remains a release gate.

No Theme Editor Save was performed during TASK-015.

## 4. Selective development deployment

Command shape, without credentials:

```text
shopify theme push --store relivanow.myshopify.com --theme 193260781938 --nodelete --json --no-color \
  --only sections/relivanow-pdp-ugc.liquid \
  --only sections/relivanow-shoppable-hotspots.liquid \
  --only sections/relivanow-editorial-proof.liquid \
  --only sections/relivanow-product-highlights.liquid \
  --only sections/relivanow-offerings.liquid \
  --only sections/relivanow-complete-look.liquid \
  --only templates/product.json
```

Shopify returned theme `193260781938`, store `relivanow.myshopify.com` and role `development`. No `--live` or `--publish` option was used.

### Development hashes before/after

| File | SHA-256 before | SHA-256 after |
|---|---|---|
| `sections/relivanow-pdp-ugc.liquid` | `98bdd993cdbc74c6e1f94eb6b5f943b0f4358293948e9f906f47b6ffdf1fdb3c` | `55956011f2fd4d4dde5be8558b3b3c562a0ada931ee28a77223bf56f544ac279` |
| `sections/relivanow-shoppable-hotspots.liquid` | `09f865624fb151fe5dac02c637a004a386c1a8d675076c46af956eea4989b78a` | `ed579e0f2a67f35a0ea04d801a4c306e1f3f8da7d83993e3fc1ba41214e2e23a` |
| `sections/relivanow-editorial-proof.liquid` | `baee4c564862ca454f4c9de547c5fb33d86ae470f53a744368d5ca32d89838e3` | `e47cae4e3f4801120aac2a657e4a6797e200f5729b8c46005c9220721ddd36ea` |
| `sections/relivanow-product-highlights.liquid` | `c7901e990b632605eab1ea01ad1fd8f621ca8900b4222e21767a31827286cf89` | `5f5c67fd288dff8668ff5ba3640f44076fd4ea2c810350fd8fce9303884d0bdb` |
| `sections/relivanow-offerings.liquid` | `febb83991699c162223e7732436a1d481a84595fdb66a5c8d3cb6085b1fceaa1` | `b68d7a5f024b52f7dc12a898b8796acbb0eb2a9be5c68ec93013fc181d8b0165` |
| `sections/relivanow-complete-look.liquid` | `3b42975b31f1ebc2ad453823f7af02971d6c76fc12a5eb00963db04fcb31785f` | `fdc1be0a4733ce3031b28e3affd5c16768f8b22cfbcdb5b90565e8d80fd6e057` |
| `templates/product.json` | `2bb3335568034bce8a32f2910013078194ac6794ed2349b209d3fc9025d3d7b8` | `e453315766e15d45c7beef7053082b907e25e2b275099b4d06c60980be2ed81a` |

All six downloaded Liquid files match the local files byte for byte. The downloaded Product template has zero semantic differences from local; its raw hash differs from the local working representation only because Shopify canonicalizes JSON.

## 5. Protected live verification

| File | SHA-256 before | SHA-256 after | Result |
|---|---|---|---|
| `layout/theme.liquid` | `e4031baede898d36ea61915ffd0b4f35fbd902f8c39a0a58495935d90062e22e` | `e4031baede898d36ea61915ffd0b4f35fbd902f8c39a0a58495935d90062e22e` | MATCH |
| `config/settings_data.json` | `52d81ec4f7798765904db1cfa3a662bcd569c1814383f8ad013851d93b899694` | `52d81ec4f7798765904db1cfa3a662bcd569c1814383f8ad013851d93b899694` | MATCH |
| `templates/index.json` | `16e646cb779fcc2ba0e9397f4ac39f2078a12f5f83374bd31c14f0cc22a4f60a` | `16e646cb779fcc2ba0e9397f4ac39f2078a12f5f83374bd31c14f0cc22a4f60a` | MATCH |
| `templates/product.json` | `b0b21b6a15bb16841960ee0b8402c9bbac6a7d463c960b7345fb1c05aace4798` | `b0b21b6a15bb16841960ee0b8402c9bbac6a7d463c960b7345fb1c05aace4798` | MATCH |

The final theme list still reports `193260781938` as `development` and `192527597938` as `live`.

## 6. Technical validation

| Gate | Result |
|---|---|
| Full Node suite | PASS — 52/52 |
| TASK-011 Home reference contracts | PASS within full suite |
| TASK-012 PDP reference contracts plus new color test | PASS within full suite |
| JavaScript syntax | PASS — 99/99 |
| JSON/JSONC parsing | PASS within full suite |
| Liquid schemas and setting-ID uniqueness | PASS within full suite |
| Legacy `color_scheme` scan in affected files/template | PASS — zero matches |
| Trackers / remote runtime URL scan in affected production files | PASS — zero matches |
| Fabricated commercial/default-content scan | PASS — zero matches |
| `git diff --check` | PASS |
| Raw Theme Check | EXPECTED KNOWN FINDING — 373 files; inherited Judge.me app-URI `JSONMissingBlock` false positive and six inherited Horizon warnings |
| Diagnostic Theme Check | PASS — 373 files, zero errors and the same six inherited warnings after disabling only `JSONMissingBlock` in a temporary removed config |

The six inherited warnings remain one `ExcessiveSettingsCount` in `sections/header.liquid` and five `UnusedDocParam` findings in `snippets/divider.liquid`. TASK-015 changes neither file.

## 7. Seven enabled sections

| Section | Saved/deployed configuration | Current visual result |
|---|---|---|
| Promotion marquee | Verified in template and remote sync | BLOCKED — browser unavailable |
| Video slideshow image fallback | Verified in template and remote sync | BLOCKED — browser unavailable |
| Image gallery | Verified in template and remote sync | BLOCKED — browser unavailable |
| Category carousel | Verified in template and remote sync | BLOCKED — browser unavailable |
| Trending grid | Verified in template and remote sync | BLOCKED — browser unavailable |
| PDP Product Highlights | Verified in template and remote sync | BLOCKED — browser unavailable |
| PDP Complete the Look | Verified in template and remote sync | BLOCKED — browser unavailable |

Static/configuration verification is not substituted for render evidence.

## 8. Browser failure and viewport matrix

Preview entry URL:

`https://relivanow.myshopify.com?preview_theme_id=193260781938`

The fresh Chrome creation call timed out after 30 seconds and reset its runtime. The recovery state call also timed out after 30 seconds and reset. No login prompt or usable authenticated window was exposed.

| Viewport | Home | Feeder PDP | Console |
|---|---|---|---|
| 1440×900 | BLOCKED | BLOCKED | BLOCKED |
| 1024×768 | BLOCKED | BLOCKED | BLOCKED |
| 768×1024 | BLOCKED | BLOCKED | BLOCKED |
| 390×844 | BLOCKED | BLOCKED | BLOCKED |
| 360×800 | BLOCKED | BLOCKED | BLOCKED |

### Mandatory regression status

| Regression | Result |
|---|---|
| Existing Home | BLOCKED — not observed post-fix |
| Existing PDP | BLOCKED — not observed post-fix |
| Native gallery | BLOCKED |
| Variants | BLOCKED |
| Sticky navigation | BLOCKED |
| Judge.me `No reviews` | BLOCKED |
| Search | BLOCKED |
| Cart Drawer open/close without mutation | BLOCKED; no cart operation attempted |
| Keyboard and visible focus | BLOCKED |
| Touch targets and carousel controls | BLOCKED |
| Reduced motion | BLOCKED |
| Horizontal overflow | BLOCKED |

## 9. Exact manual QA checklist

Use a fresh authenticated browser. Do not Save, publish, submit forms, add to cart or change store data.

1. Open `https://relivanow.myshopify.com/admin/themes/193260781938/editor` and visually confirm `Development (bfe2c0-DESKTOP-EHRJHE7)` / theme ID `193260781938`; verify the live theme is not open.
2. Select each of the six new PDP sections. Confirm there is an optional **Background color** control and that the prior Spanish color-scheme warning is absent. Do not change the value.
3. Open the development preview URL and prove the preview bar/theme selector identifies development theme `193260781938` before recording any result.
4. At each exact viewport — 1440×900, 1024×768, 768×1024, 390×844 and 360×800 — inspect Home from top to bottom and the real automatic-feeder PDP from top to bottom.
5. **Promotion marquee:** confirm the single text `Smart care for life together.`, no false link, no clipping, no horizontal page overflow and motion disabled under reduced-motion emulation.
6. **Video slideshow:** confirm the approved feeder poster loads, no broken/missing video UI appears, autoplay is off, the blank CTA link emits no clickable CTA, headings wrap and controls expose visible focus/44px targets where rendered.
7. **Image gallery:** confirm four distinct feeder images, correct labels/alt behavior, no fabricated links, usable horizontal interaction on narrow screens and no root overflow.
8. **Category carousel:** confirm exactly the `pet-clean` and `spare-parts` collection cards, correct collection media/links, keyboard operation and touch targets.
9. **Trending grid:** confirm the four configured real Products, native Product links, current dynamic prices/availability, responsive cards and no visible “best seller”/popularity claim.
10. **PDP Product Highlights:** confirm exactly four cards, correct four approved images/texts, correct 4/2/horizontal responsive behavior, focus visibility where applicable and no clipping.
11. **PDP Complete the Look:** confirm the water bottle and paw-cleaning cup, native current prices/availability, Product links/forms, variant controls and 44px targets. Variant display may be inspected, but do not submit either Product form.
12. At all five sizes, measure `document.documentElement.scrollWidth <= document.documentElement.clientWidth` and inspect local carousel rails separately so intended rail scrolling is not misreported as root overflow.
13. Emulate `prefers-reduced-motion: reduce`; verify marquee/slideshow motion and transitions respect it.
14. Keyboard-test interactive controls using Tab, Shift+Tab, Enter/Space and arrow keys where supported; confirm focus is visible and never trapped.
15. Regress existing Home and PDP sections, native Product gallery, current variant UI, sticky navigation and Judge.me's authentic `No reviews` state.
16. Open Search, query `feeder` without submitting any commercial form, and verify title/results/overflow.
17. Open and close Cart Drawer without changing quantity, removing lines, applying discounts or checking out; compare item count/total before and after.
18. Record console errors/warnings and failed network responses for Home, PDP and Search. Do not claim PASS for uncaptured states.

## 10. Eight sections still disabled

### PARTIAL

- Home Product offers — Products configured, but no confirmed campaign contract.
- PDP Hotspots — insufficient approved hotspot copy/placement evidence.
- PDP Editorial proof — missing three attributable confirmed proof records.
- PDP Offerings — missing complete approved benefits/offers contract.

### BLOCKED

- Home Campaign grid — no verified campaign/countdown.
- Home Community videos — no owned/authorized UGC video.
- Home Expert recommendations — no authorized expert identity/media/copy.
- PDP UGC — no owned/authorized UGC.

All remain disabled. The color fix did not change activation state.

## 11. Remaining gates and safety confirmation

Remaining gates:

1. Recover a controllable authenticated browser.
2. Confirm the Theme Editor warning is absent on all six affected PDP sections.
3. Complete the five-viewport matrix and exact manual checklist above.
4. Record real console and regression evidence.

Safety confirmation:

- No publication, `--publish`, `--live`, theme creation, merge or Pull Request occurred.
- No Product, Variant, Collection, price, inventory, Market, app, review or cart state changed.
- No Theme Editor Save occurred in TASK-015.
- Live theme `192527597938` was not targeted for mutation and its protected hashes match.
- The reference documents remain local-only under `.git/info/exclude`; `.gitignore` was not changed.
