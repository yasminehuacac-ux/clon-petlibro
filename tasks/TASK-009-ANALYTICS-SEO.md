# TASK-009 — Analytics, SEO, and markets

**Status:** IN PROGRESS
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

## Technical checkpoint â€” 2026-09-20

| Criterion | Status | Evidence / remaining gate |
|---|---|---|
| Native titles and descriptions | COVERED | `page_title` and `page_description` remain the native sources in `meta-tags`; no administrative SEO value was fabricated. |
| Canonical, robots and sitemap | COVERED | `canonical_url` remains authoritative; no custom `robots.txt.liquid` or sitemap replacement was added, so Shopify owns crawl directives and sitemap generation. |
| Open Graph and social metadata | COVERED | Native page title/description/image now include active locale plus image alt and Twitter image metadata. Generic social-network homepage links were removed from the footer configuration. |
| Product / Organization / breadcrumb schema | COVERED | Native Product JSON-LD is guarded against blank/duplicate featured Products; Organization uses a stable HTTPS schema context and shop origin; route-aware BreadcrumbList output uses native canonical URLs. |
| FAQ and review schema consistency | PARTIAL | FAQ JSON-LD remains off by default and reads the same confirmed records when enabled. Judge.me remains the only review authority; the authentic zero-review state emits no `AggregateRating`. Populated review consistency remains owned by TASK-007's authentic-content gate. |
| Headings and media SEO | PARTIAL | Current Home/PDP/core templates retain one H1, and Search now has an H1. Theme image paths preserve native/approved alt sources; final Product/media alt administration is still pending approved assets and is not changed here. |
| Markets/localization compatibility | PARTIAL | Native localization forms, `routes.*`, active currency output and canonical URLs are preserved; the last `/cart` fallback is now localized. Actual Markets, currencies, domains and languages remain unmodified and require approved remote configuration. |
| Semantic analytics hooks | PARTIAL | Shopify standard storefront events cover page/Product/Variant/cart views and successful cart results. Provider-neutral `GalleryInteraction`, `AddOnSelected` and `FAQOpened` hooks emit only allowlisted primitive values and have no network/storage transport. Bundle/upsell UI does not exist; provider mapping is pending. |
| Checkout and Purchase | BLOCKED BY EXTERNAL CONFIGURATION | Map Shopify Customer Events/custom pixels only after provider and consent approval; no theme click proxy or purchase event was invented. |
| Consent and third parties | BLOCKED BY BUSINESS DECISION | No advertising/analytics script, ID, cookie or provider transport was added. Consent platform, legal mode and provider permissions remain undecided. |
| Script/schema duplication | COVERED | No manual tracker exists. Judge.me retains one core loader and one PDP widget script; no parallel review JSON-LD was introduced. |
| Search Console / Merchant Center | BLOCKED BY EXTERNAL CONFIGURATION | Domain verification, feeds, account access and platform setup are outside the repository and remain untouched. |
| Development preview | COVERED | Only the 13 TASK-009 theme files were uploaded to development theme `193260781938`. Home/PDP/Search/Collection/Page, responsive layouts, metadata/schema, console/resources, Theme Editor, Judge.me, and read-only Cart Drawer regressions pass; theme `192527597938` remains `live`. |

TASK-009 remains `IN PROGRESS`; TASK-010 must not begin.

## Required handoff

Create `reports/TASK-009-RESULT.md` with an event and schema test matrix. Do not begin TASK-010.
