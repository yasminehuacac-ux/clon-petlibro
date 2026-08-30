# TASK-009 — Analytics, SEO, and markets

**Status:** DRAFT  
**Depends on:** Storefront stable; providers, consent, markets, currencies, and locales approved  
**Gate owner:** ChatGPT Work

## Objective

Instrument the approved semantic events, ensure structured-data consistency, and validate multi-market/localization behavior without duplicate trackers or hardcoded regional promises.

## Read first

- `AGENTS.md`
- `docs/ANALYTICS_PLAN.md`
- `docs/DATA_MODEL.md`
- `docs/CONTENT_MATRIX.md`
- `docs/QA_MATRIX.md`
- Approved provider/consent documentation

## Scope

- Semantic event layer and approved provider mapping.
- Shopify Customer Events/custom pixels when appropriate.
- Consent-aware non-essential tracking.
- Product, Offer, AggregateRating, FAQ, Organization, and Website schema validation.
- Canonical, heading, metadata, alt, and crawlable specs/FAQ checks.
- Currency, locale, market availability, shipping, warranty, and delivery-copy validation.
- Double-fire and payload-quality testing.

## Out of scope

- New marketing strategy or unapproved pixels.
- Collection-scale SEO content not included in V1.
- Sending personal/customer information in browser events.

## Acceptance criteria

- [ ] Events fire once and only after the defined successful action.
- [ ] Currency/value/item payloads match Shopify state.
- [ ] Consent prevents non-essential trackers when required.
- [ ] Visible product/FAQ/rating information matches structured data.
- [ ] No hardcoded market data leaks across locales.
- [ ] SEO and accessibility heading requirements pass.

## Required handoff

Create `reports/TASK-009-RESULT.md` with an event and schema test matrix. Do not begin TASK-010.

