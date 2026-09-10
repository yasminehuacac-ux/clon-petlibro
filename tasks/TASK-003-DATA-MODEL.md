# TASK-003 — Shopify product data model

**Status:** DONE
**Depends on:** TASK-001 and TASK-002 approved; commercial data decisions available  
**Gate owner:** ChatGPT Work

**Outcome:** Work approved the documented Shopify data model. No remote Shopify mutation was performed or authorized; TASK-004 remains `DRAFT` and unstarted pending its documented media/variant gates.

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

- [x] Every PDP data field has one documented source of truth.
- [x] Definitions support localization and merchant editing.
- [x] Variant/media/add-on compatibility rules are explicit.
- [x] FAQ and specs can be accessible HTML.
- [x] Missing commercial values remain explicitly PROVISIONAL or UNVERIFIED; incomplete media uses the separate PENDING asset-workflow status.
- [x] No live data mutation occurred without authorization.

## Required handoff

Create `reports/TASK-003-RESULT.md`, update `docs/DATA_MODEL.md`, and do not begin TASK-004.
