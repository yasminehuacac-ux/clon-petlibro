# TASK-009 — Analytics, SEO, and markets

**Status:** DONE
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

- [ ] Events fire once and only after the defined successful action — PARTIAL; provider/checkout delivery is conditional future work.
- [ ] Currency/value/item payloads match Shopify state — PARTIAL; no external provider mapping is approved.
- [ ] Consent prevents non-essential trackers when required — PARTIAL; admin settings are verified, regional runtime enforcement is a release gate.
- [ ] Visible product/FAQ/rating information matches structured data — PARTIAL; populated authentic reviews remain TASK-007-gated.
- [x] No hardcoded market data leaks across locales — the code boundary passes; draft-market selectors/URLs/currency remain a separate release-validation gate.
- [x] SEO and accessibility heading requirements pass.

`DONE` records completion of the authorized safe baseline, not full public-release acceptance. Unchecked criteria are explicitly retained as conditional future or launch-validation gates below and in the result report.

## Technical checkpoint â€” 2026-09-20

| Criterion | Status | Evidence / remaining gate |
|---|---|---|
| Native titles and descriptions | COVERED | `page_title` and `page_description` remain the native sources in `meta-tags`; no administrative SEO value was fabricated. |
| Canonical, robots and sitemap | PARTIAL / LAUNCH GATE | `canonical_url` remains authoritative and no custom robots/sitemap replacement was added. The native sitemap is submitted to Search Console but returns HTTP 404 while the storefront redirects to `/password`; re-test after release. |
| Open Graph and social metadata | COVERED | Native page title/description/image now include active locale plus image alt and Twitter image metadata. Generic social-network homepage links were removed from the footer configuration. |
| Product / Organization / breadcrumb schema | COVERED | Native Product JSON-LD is guarded against blank/duplicate featured Products; Organization uses a stable HTTPS schema context and shop origin; route-aware BreadcrumbList output uses native canonical URLs. |
| FAQ and review schema consistency | PARTIAL | FAQ JSON-LD remains off by default and reads the same confirmed records when enabled. Judge.me remains the only review authority; the authentic zero-review state emits no `AggregateRating`. Populated review consistency remains owned by TASK-007's authentic-content gate. |
| Headings and media SEO | PARTIAL | Current Home/PDP/core templates retain one H1, and Search now has an H1. Theme image paths preserve native/approved alt sources; final Product/media alt administration is still pending approved assets and is not changed here. |
| Markets/localization compatibility | PARTIAL / LAUNCH GATE | `relivanow.com` is the connected primary domain. United States remains active and unchanged. Canada, European Union (restricted to Germany, Belgium, Spain, and France), United Kingdom, and Australia/New Zealand are draft. German, Spanish, French, and Dutch exist without translations, domains, or publication. CAD/EUR remain blocked by Shopify Payments multi-currency setup, so no incomplete market was activated. |
| Semantic analytics hooks | PARTIAL | Shopify standard storefront events cover page/Product/Variant/cart views and successful cart results. Provider-neutral `GalleryInteraction`, `AddOnSelected` and `FAQOpened` hooks emit only allowlisted primitive values and have no network/storage transport. Bundle/upsell UI does not exist; provider mapping is pending. |
| Checkout and Purchase | COVERED SAFE BASELINE / CONDITIONAL FUTURE | Shopify remains authoritative and no theme click proxy or purchase event was invented. Configure Customer Events/custom pixels only if a provider is approved later; none is approved for the current baseline. |
| Consent and third parties | PARTIAL / LAUNCH VALIDATION GATE | Shopify's automated privacy policy, cookie banner, equal-access Accept/Decline controls, and editable categories are active in admin. No Meta, TikTok, GA4, or Google Ads tracker is installed. Work declined Shopify's destructive Network Intelligence deactivation, and Judge.me is `Always active`; regional storefront cookie/request behavior requires release validation. |
| Script/schema duplication | COVERED | No manual tracker exists. Judge.me retains one core loader and one PDP widget script; no parallel review JSON-LD was introduced. |
| Search Console / Merchant Center | PARTIAL / LAUNCH GATE | The `relivanow.com` domain property is DNS-verified in Search Console and Shopify's sitemap was submitted. It currently returns HTTP 404 while the storefront redirects to `/password`, so Google reports that it cannot fetch it. Merchant Center account `5857724399` (`Relivanow`, Peru) exists under the approved account; address, countries, products, feed, free listings, Ads, remarketing, and campaigns remain unset. |
| Development preview | COVERED | Only the 13 TASK-009 theme files were uploaded to development theme `193260781938`. Home/PDP/Search/Collection/Page, responsive layouts, metadata/schema, console/resources, Theme Editor, Judge.me, and read-only Cart Drawer regressions pass; theme `192527597938` remains `live`. |

TASK-009 is `DONE`. TASK-007 later closed on the approved authentic zero-review launch baseline. The remaining currency, translation, legal/shipping, sitemap-fetch, Merchant onboarding, regional-runtime and populated-review items are documented launch gates for TASK-010.

## Required handoff

The final event, schema, external-configuration, safety, and launch-gate evidence is recorded in `reports/TASK-009-RESULT.md`. Do not begin TASK-010 until its prerequisites are independently satisfied.
