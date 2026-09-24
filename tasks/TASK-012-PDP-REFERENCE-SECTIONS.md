# TASK-012 — PDP reference sections, Phase 2

**Status:** DONE — local implementation only

**Date:** 2026-09-24

**Branch:** `feat/relivanow-reference-sections`

**Base:** `50b8db3bd3f8f856b82e0e2f22246b4c5cdcbb67`

## Objective

Implement the six supplied PDP/Product Information reference patterns as safe Shopify OS 2.0 sections appended disabled to the real RELIVANOW Product template. Preserve every approved active PDP and commerce surface.

## Required references

- `RELIVANOW_SECTION_SPECS_MINUCIOSAS.md`, lines 781-1245.
- `RELIVANOW_SECTION_REFERENCES.pdf`, pages 18-21.
- `docs/superpowers/plans/2026-09-24-relivanow-pdp-reference-sections.md`.
- `reports/TASK-004-PRODUCT-SNAPSHOT-2026-09-12.md`, which identifies the assigned template as `default product`.

The two supplied reference documents are local inputs only and remain excluded through `.git/info/exclude`.

## Protected baseline

- Real template: `templates/product.json`.
- Existing Product order: 19 entries.
- Existing Product payload SHA-256: `c20b497611c8b463d5860285d8acbdda745016cbfb9d7a3c58a057ffd57d0200`.
- Product template file SHA-256: `79A1D0F5C46C025DABA89905AE6925DCEADF316BF2D8FABA62B198C35C063A97`.
- Home template file SHA-256: `4AA78C5B53401617462A21E6DF9948729089AC804F0CA90A56C58ED5774B3007`.
- Product Information, media gallery, details, gallery JS, sticky navigation, Judge.me host and Cart Drawer are protected from modification.
- `assets/product-form.js` may receive only the explicit Complete-the-Look opt-in Variant-source branch described by the plan.

## Sections

1. RELIVANOW PDP UGC.
2. RELIVANOW shoppable image.
3. RELIVANOW editorial proof.
4. RELIVANOW Product Highlights.
5. RELIVANOW offerings.
6. RELIVANOW Complete the Look.

## Acceptance

- [x] Six isolated section contracts implemented with merchant-editable content.
- [x] Evidence/identity/media/commercial surfaces fail closed publicly.
- [x] Six instances appended to the confirmed default Product template with `disabled: true`.
- [x] First nineteen Product entries and their active order remain unchanged.
- [x] No Home, gallery, primary variants/prices/form, sticky navigation, Judge.me, Cart Drawer, structured data or existing narrative behavior regresses.
- [x] Exact-width isolated geometry checks pass at 1440×900, 1024×768, 768×1024, 390×844 and 360×800; rendered visual QA remains explicitly pending.
- [x] Full tests, schemas, JavaScript syntax, scans, diff checks and Theme Check complete with exact results recorded.
- [x] Exactly one local commit is created and the working tree is clean at handoff.

## Prohibited actions

- No fabricated reviews, ratings, UGC, experts, credentials, claims, discounts, urgency, comparison or campaign content.
- No tracker, remote URL, package, CDN or new production dependency.
- No reference-document commit and no shared `.gitignore` change.
- No push, PR, merge, theme upload, Theme Editor Save, publication or live-theme `192527597938` mutation.
