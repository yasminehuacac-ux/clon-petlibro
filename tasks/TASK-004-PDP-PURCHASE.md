# TASK-004 — PDP purchase area

**Status:** DRAFT  
**Depends on:** TASK-002/003 approved; product variants, media, copy, and policies available  
**Gate owner:** ChatGPT Work

## Objective

Build the conversion-critical Purchase area for the RELIVANOW Smart Automatic Pet Feeder using Horizon-native commerce systems and the approved data model.

## Read first

- `AGENTS.md`
- Approved reports for TASK-001–003
- `docs/CONVERSION_BLUEPRINT.md`
- `docs/DATA_MODEL.md`
- `docs/CONTENT_MATRIX.md`
- `docs/ASSET_MANIFEST.md`
- `docs/QA_MATRIX.md`

## Scope

- Product gallery with one DOM instance, responsive behavior, zoom/video, and variant media synchronization.
- Rating hook, name, tagline, price/saving, trust benefits, financing block, and key benefits.
- Accessible Style and Color option controls.
- Dynamic delivery message from an approved source.
- Quantity and Add to Cart.
- Payment/trust messaging.
- Sticky mobile/desktop ATC only through the audited Horizon path.
- Skeleton of Purchase/Overview/Specs/FAQ/Reviews anchor navigation if approved by the TASK-001 architecture.
- Correct loading, sold-out, unavailable, validation, and cart-error states.

## Out of scope

- Advanced add-ons/bundles and cart cross-sells.
- Full storytelling sections, reviews provider, Home, analytics providers.
- Unverified product claims or PETLIBRO content.

## Acceptance criteria

- [ ] Style/color changes synchronize variant ID, media, price, compare-at, SKU, availability, add-on eligibility, and sticky ATC without reload.
- [ ] Add to Cart adds the selected variant/quantity exactly once.
- [ ] Gallery and product controls work by touch, mouse, and keyboard.
- [ ] No duplicate product form, gallery, variant source, or commercial state.
- [ ] Mobile and desktop match the approved composition.
- [ ] Theme Editor reload/reorder behavior works.
- [ ] Relevant QA matrix, Theme Check, and performance checks pass.

## Required handoff

Create `reports/TASK-004-RESULT.md` with screenshots/evidence for every variant state. Do not begin TASK-005.

