# TASK-012 — PDP reference sections, Phase 2

**Status:** DONE locally

**Date:** 2026-09-24

**Branch:** `feat/relivanow-reference-sections`

**Base:** `50b8db3bd3f8f856b82e0e2f22246b4c5cdcbb67`

**Commit message:** `feat: integrate RELIVANOW PDP reference sections`

## Delivered inventory

| # | Theme Editor section | Type / file | Public contract |
|---:|---|---|---|
| 1 | RELIVANOW PDP UGC | `relivanow-pdp-ugc` | Heading plus at least three complete permissioned `CONFIRMED` media blocks; native dialog and real optional Product rows |
| 2 | RELIVANOW hotspots | `relivanow-shoppable-hotspots` | Section-approved panoramic media plus at least two distinct `CONFIRMED` Shopify Products |
| 3 | RELIVANOW editorial | `relivanow-editorial-proof` | Approved hero/editorial content plus exactly three complete attributed `CONFIRMED` proof records |
| 4 | RELIVANOW highlights | `relivanow-product-highlights` | Heading plus exactly four complete `CONFIRMED` full-bleed cards |
| 5 | RELIVANOW offerings | `relivanow-offerings` | Exactly four approved benefits plus at least two approved offers; no default promotion logic |
| 6 | RELIVANOW complete look | `relivanow-complete-look` | Heading plus exactly two distinct, available, `CONFIRMED` native Shopify Products with featured media |

All six instances are appended to the confirmed default Product template after its nineteen approved entries with `disabled: true`, empty `blocks` and empty `settings`. The approved active order is unchanged.

## Architecture and PDP integration

- Five new isolated presentation systems avoid changing existing narrative/Judge.me sections. The hotspot section reuses Horizon's `product-hotspot-component`, quick-add and native price output behind a stricter fail-closed wrapper.
- Complete the Look consumes native Product/Variant/image/money/availability objects and `{% form 'product' %}` with the existing Product form/cart event path. It never writes main-PDP URL or Variant state.
- `assets/product-form.js` has one shared extension: `data-variant-source="form"` opts a secondary form into form-first Variant resolution. Instances without that attribute retain the exact URL → form → selected-radio priority.
- The first nineteen Product IDs/objects retain SHA-256 `c20b497611c8b463d5860285d8acbdda745016cbfb9d7a3c58a057ffd57d0200`.
- `templates/index.json` retains SHA-256 `4AA78C5B53401617462A21E6DF9948729089AC804F0CA90A56C58ED5774B3007`.
- Product Information, details/gallery, media-gallery runtime, sticky navigation, Judge.me host and Cart Drawer files are unchanged.

## Theme Editor controls and fail-closed behavior

- Every identity, authority, media, copy, link, relationship and commercial record is merchant-editable and unconfirmed by default.
- UGC requires rights/content status, attribution, media and alt text. Editorial proof requires section approval and exactly three attributed sources. Offer links and optional UGC upload links require both label and URL.
- Hotspots and Complete the Look reject blank and duplicate Product relationships. Complete the Look also requires availability and native featured media.
- Highlights requires exactly four complete cards. Offerings requires four approved benefit icons/labels and at least two approved title/terms records; an optional image is accepted only with alt text.
- Incomplete sections emit no public wrapper. Guidance exists only under `request.design_mode`.
- No review, rating, verified buyer, UGC identity, expert, credential, certification, award, statistic, medical benefit, discount, urgency, comparison, campaign, claim or remote URL was invented.

## Files created

- `sections/relivanow-pdp-ugc.liquid`
- `sections/relivanow-shoppable-hotspots.liquid`
- `sections/relivanow-editorial-proof.liquid`
- `sections/relivanow-product-highlights.liquid`
- `sections/relivanow-offerings.liquid`
- `sections/relivanow-complete-look.liquid`
- `assets/relivanow-pdp-ugc.js`
- `assets/relivanow-offerings.js`
- `assets/relivanow-complete-look.js`
- `assets/relivanow-product-form-policy.js`
- `tests/pdp-reference-sections.test.mjs`
- `tasks/TASK-012-PDP-REFERENCE-SECTIONS.md`
- `docs/superpowers/plans/2026-09-24-relivanow-pdp-reference-sections.md`
- `reports/TASK-012-RESULT.md`

## Files modified

- `assets/product-form.js`
- `templates/product.json`
- `TASKS.md`
- `PROJECT_STATUS.md`
- `CHANGELOG.md`
- `docs/ASSET_MANIFEST.md`
- `docs/CONTENT_MATRIX.md`
- `docs/DECISIONS.md`
- `docs/QA_MATRIX.md`

## Verification results

| Check | Exact result |
|---|---|
| TASK-012 contract | PASS — 13/13 |
| Full Node suite | PASS — 51/51 |
| JavaScript syntax | PASS — 99/99 (`91` asset `.js` plus `8` test `.mjs`) |
| JSON/JSONC, Liquid schema and setting IDs | PASS — full repository contract |
| Product-template preservation | PASS — first nineteen payload hash unchanged; six exact disabled append-only entries |
| Home/PDP/Variant/gallery/sticky/Judge.me/cart static regressions | PASS — full Node suite and protected-file diff/hash audit |
| Asset references | PASS — every new `asset_url` / inline asset resolves locally |
| Tracker and remote-runtime scan | PASS — zero matches in TASK-012 production files |
| Fabricated commercial/review/authority default scan | PASS — zero matches |
| Reference hygiene | PASS — both source documents are ignored only by `.git/info/exclude`, untracked and absent from the commit; `.gitignore` unchanged |
| `git diff --check` | PASS |
| Raw Theme Check | EXPECTED KNOWN FINDING — 373 files; one inherited Judge.me nested app-URI `JSONMissingBlock` false positive and six inherited warnings; zero TASK-012 offense |
| Diagnostic Theme Check | PASS — 373 files; zero errors and the same six inherited warnings after disabling only `JSONMissingBlock` in a temporary removed config |
| Exact-width local geometry | PASS — 1440×900, 1024×768, 768×1024, 390×844 and 360×800; mini-PDP columns resolve to 610/482/354/178/163 px, rail cards to 413.3/328/242.7/300.1/275.5 px, all interactive minima remain 44 px, and oversized tracks own local scrolling |

The six inherited warnings are one `ExcessiveSettingsCount` in `sections/header.liquid` and five `UnusedDocParam` findings in `snippets/divider.liquid`.

## Responsive and accessibility QA

Executable contracts cover 44 px targets, reduced motion, long-text containment, responsive native images/object fit, snap rails, dialog Escape/focus behavior, backdrop dismissal, keyboard tab selection, hotspot placement, exact available-Variant matching and responsive Variant media updates.

The isolated HTML fixture and geometry validator passed all five required sizes. Chrome rejected direct local `file://` navigation under its security policy, so screenshots and a rendered visual inspection were not produced and are not claimed.

## Pending assets, content and real QA

- The UGC media/rights/handles, panoramic lifestyle image, editorial source evidence, four highlight images/copy, four benefit icons, offer content/media and two approved cross-sell Product relationships are still merchant inputs. The disabled empty instances are intentionally not publication-ready.
- Real Shopify Liquid rendering, Product option combinations, native quick-add modal behavior, cart mutation, app coexistence, media crops, Theme Editor add/reorder/save lifecycle and five-viewport storefront visual inspection remain pending on an authorized unpublished development theme.
- No storefront or Theme Editor pass is claimed. No Lighthouse/Core Web Vital measurement is claimed.

## Safety confirmation

No Git push, pull request, merge, `shopify theme push`, Theme Editor Save, development-theme upload, publication, Product/Variant/commercial mutation or live-theme `192527597938` change occurred. The two supplied reference documents are not included in the commit.
