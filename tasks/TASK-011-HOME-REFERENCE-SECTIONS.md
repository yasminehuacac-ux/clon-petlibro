# TASK-011 — Home reference sections, Phase 1

**Status:** DONE — local implementation and isolated QA complete; real storefront/editor QA pending authorization

**Date:** 2026-09-24

**Branch:** `feat/relivanow-reference-sections`

**Base:** `71618d5b4d77931aa29ec8469e6cde1b2be1da17`

## Objective

Implement the nine supplied Home reference patterns as safe, merchant-configurable Shopify OS 2.0 sections without changing the approved active Home, inventing commercial content, or uploading/publishing a theme.

## Scope delivered

1. Promotion marquee with opt-in distance speed, direction, responsive gaps, colors, padding and hover pause.
2. Confirmed video slideshow with Shopify/external video, posters, segmented highlighted heading and native slideshow controls.
3. Responsive 3:4 image gallery with optional hover image and linked cards.
4. Fail-closed campaign grid with future countdown and confirmed image/video cards.
5. Disabled native `collection-list` carousel configured for five desktop cards and approximately two mobile cards.
6. Fail-closed community video rail with accessible play/pause controller.
7. Fail-closed verified expert card grid/rail.
8. Native Product/Collection trending grid, up to sixteen items.
9. Confirmed campaign tile plus native Shopify Product offer rail.

## Safety constraints satisfied

- The eight approved Home objects are unchanged and remain first in their original order.
- All nine new instances are appended with `disabled: true`.
- `collection-list.liquid` is byte-identical to the base.
- Existing marquee instances keep their legacy formula and default hover behavior.
- No default campaign, deadline, discount, expert, UGC, review, claim, Product, Collection or custom offer label was added.
- Reference inputs are excluded locally through `.git/info/exclude` only.
- No push, Shopify upload, Theme Editor save, publication or live-theme mutation occurred.

## Acceptance

- [x] Local contract and regression suite passes.
- [x] JavaScript syntax, JSON/JSONC, Liquid schemas and setting IDs pass.
- [x] Theme Check reports no TASK-011 offense.
- [x] Exact isolated responsive fixture passes all five required viewports.
- [x] Content/privacy/reference/asset scans pass.
- [ ] Real development-theme and Theme Editor visual QA after separate authorization and approved media assignment.
