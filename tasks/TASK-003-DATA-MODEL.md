# TASK-003 — Shopify product data model

**Status:** DRAFT  
**Depends on:** TASK-001 and TASK-002 approved; commercial data decisions available  
**Gate owner:** ChatGPT Work

## Objective

Finalize the Shopify-native data architecture for RELIVANOW products, benefits, specifications, feature stories, FAQs, add-ons, bundles, delivery, and app links before PDP implementation.

## Read first

- `AGENTS.md`
- `reports/TASK-001-RESULT.md`
- `docs/DATA_MODEL.md`
- `docs/CONTENT_MATRIX.md`
- `docs/ASSET_MANIFEST.md`
- `docs/TECHNICAL_ARCHITECTURE.md`
- `docs/DECISIONS.md`

## Scope

- Validate native Product/Variant responsibilities.
- Finalize metafield and metaobject definitions, localization, validation, and ownership.
- Define how variants map to media and compatible add-ons.
- Define FAQ/spec rendering from one source.
- Define bundle relationships without selecting an unapproved discount engine.
- Provide a merchant-entry guide and example records using explicitly labeled non-production placeholders.
- Implement schema/definitions only when the required Shopify access and approval are present; otherwise deliver exact configuration instructions.

## Out of scope

- Inventing or publishing unverified specifications.
- Creating fake reviews.
- Implementing the PDP, bundle discounts, or subscription billing.
- Hardcoding Shopify IDs into theme code.

## Acceptance criteria

- [ ] Every PDP data field has one documented source of truth.
- [ ] Definitions support localization and merchant editing.
- [ ] Variant/media/add-on compatibility rules are explicit.
- [ ] FAQ and specs can be accessible HTML.
- [ ] Missing commercial values remain `TBD` and are reported.
- [ ] No live data mutation occurs without authorization.

## Required handoff

Create `reports/TASK-003-RESULT.md`, update `docs/DATA_MODEL.md`, and do not begin TASK-004.

