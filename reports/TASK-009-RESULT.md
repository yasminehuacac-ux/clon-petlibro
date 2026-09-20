# TASK-009 result — analytics, SEO, and Markets

**Status:** IN PROGRESS
**Checkpoint date:** 2026-09-20
**Intake:** `main` at `0225a535d9bf3e7e08dc6139c65f4a0eae6121d9`, five commits ahead of `origin/main`, clean working tree
**Development target:** unpublished theme `193260781938`
**Protected live theme:** `192527597938`

## Outcome

The repository now has the smallest safe theme-owned foundation for TASK-009: Shopify/Horizon remains authoritative for commerce events and state; three missing interaction events use one provider-neutral, transport-free DOM boundary; and SEO/structured-data defects that can be corrected without merchant or business data are corrected. No provider, ID, account, domain, consent rule, Market, currency, language, Product/Variant, price, inventory, app, plan, credential, order, checkout outcome, review, or commercial fact was invented.

TASK-009 is not complete. The theme-owned implementation and development-preview gate pass, but provider mapping, consent enforcement, platform verification/feed work, and operational Markets configuration require external decisions or access. TASK-007 remains independently `IN PROGRESS` and unchanged in status.

## Official acceptance reconciliation

Only the official classification values are used below.

| Acceptance criterion | Classification | Evidence / remaining gate |
|---|---|---|
| Events fire once and only after the defined successful action | PARTIAL | The custom hook installs once and its three interactions are user-state driven. Shopify's standard cart event remains the successful Add-to-Cart source. Checkout/purchase/provider delivery cannot be completed inside the theme. |
| Currency/value/item payloads match Shopify state | PARTIAL | No duplicate commerce payload is constructed. Future mappings must consume resolved Shopify standard/Customer Events data. No external mapping exists yet. |
| Consent prevents non-essential trackers when required | BLOCKED BY BUSINESS DECISION | The theme is fail-closed and loads no non-essential tracker, but legal categories, regional defaults, consent platform, and provider behavior are not approved. |
| Visible Product/FAQ/rating information matches structured data | PARTIAL | Product entities are guarded against blank/duplicate featured output; FAQ schema uses the same confirmed records; the authentic zero-review state has no false aggregate rating. Populated rating evidence remains TASK-007-gated. |
| No hardcoded Market data leaks across locales | COVERED | Native active currency, localization forms, canonical URLs, money filters, and `routes.*` remain authoritative; the final literal cart fallback was removed. No Market promise/configuration was added. |
| SEO and accessibility heading requirements pass | COVERED | Home/PDP retain one visible H1 across all five exact viewports and Search exposes its page title as H1. Visible images have alt attributes and no asset description was invented. Final administrative alt quality remains merchant-owned. |

## Required 18-area audit

| # | Area | Classification | Finding |
|---:|---|---|---|
| 1 | Existing analytics / pixels | COVERED | No manual GA4, Meta, TikTok, Clarity, GTM, Google Ads, Bing, or other tracker transport was found or added. Judge.me remains the existing app-owned third party. |
| 2 | Duplicate firing | COVERED | The custom listener set installs once. Native Product/Variant/cart events are reused rather than re-emitted; no theme checkout/purchase proxy exists. |
| 3 | Checkout / Purchase source | BLOCKED BY EXTERNAL CONFIGURATION | These must come from Shopify Customer Events/custom pixels after provider and consent approval. |
| 4 | Payload quality / privacy | COVERED | Event-specific allowlists retain only primitive values. Unknown and nested data is dropped; no PII/customer/order object is accepted. |
| 5 | Titles / descriptions / canonical | COVERED | Native Shopify title, description, and canonical sources remain in place. No administrative SEO value was fabricated. |
| 6 | Robots / sitemap | COVERED | Shopify remains authoritative; no custom robots or sitemap override was created. |
| 7 | Open Graph / social metadata | COVERED | Active locale, image alt, Twitter image, and Twitter image alt are supplied from native page/image data. Generic social homepages were removed from footer defaults. |
| 8 | Product structured data | COVERED | Native Product JSON-LD remains authoritative and is suppressed for blank featured products and same-Product duplication on a PDP. |
| 9 | Organization / Website schema | COVERED | Existing Organization output now uses the HTTPS schema context and stable shop origin. Website search-action output remains native. |
| 10 | Breadcrumb schema | COVERED | One route-aware BreadcrumbList is rendered for Product, Collection, and Page routes from native URLs and titles. |
| 11 | FAQ consistency | COVERED | Visible and optional JSON-LD FAQ content share the same confirmed metaobject records; analytics identifiers derive from the rendered confirmed record. |
| 12 | Review / rating consistency | PARTIAL | Judge.me remains the sole review authority and zero-review output is honest. Authentic populated review/schema behavior is still blocked under TASK-007. |
| 13 | Heading hierarchy | COVERED | The known Search H3 defect is corrected to H1; existing Home/PDP single-H1 contracts remain. |
| 14 | Media alt / crawlability | PARTIAL | Existing native/configurable alt sources are preserved. Final asset assignments and administrative alt completeness require approved Product/media data. |
| 15 | Performance / third-party cost | COVERED | The new module is local, deferred through the existing module loader path, delegated, transport-free, and storage-free. No new third-party request is introduced. |
| 16 | Markets / localization | PARTIAL | Theme behavior is native and localized; actual Market availability, price lists, currencies, languages, domains, shipping, warranty, and delivery decisions are outside the authorized code scope. |
| 17 | Consent / regional behavior | BLOCKED BY BUSINESS DECISION | The current no-tracker state is safe; affirmative rules cannot be invented. |
| 18 | Search Console / Merchant Center | BLOCKED BY EXTERNAL CONFIGURATION | Account access, domain verification, feeds, and platform configuration are unavailable and unchanged. |

Summary: 12 `COVERED`, 3 `PARTIAL`, 1 `BLOCKED BY BUSINESS DECISION`, 2 `BLOCKED BY EXTERNAL CONFIGURATION`. There are no `MISSING` code items within the authorized theme-only scope.

## Event ownership and test matrix

| Planned event | Source of truth | Theme action | Status |
|---|---|---|---|
| `ViewItem` | `shopify:product:view` / Shopify standard data | No duplicate event | PARTIAL — provider mapping pending |
| `GalleryInteraction` | User slideshow select or media zoom inside Product media | Emit allowlisted `relivanow:analytics` detail | COVERED |
| `VariantSelected` | `shopify:product:select` resolved Variant promise | No duplicate event | PARTIAL — provider mapping pending |
| `AddOnSelected` | Eligible add-on checkbox change | Emit Product ID, add-on Variant ID, selected boolean | COVERED |
| `BundleSelected` | Real approved bundle selector | No selector or event fabricated | BLOCKED BY BUSINESS DECISION |
| `AddToCart` | `shopify:cart:lines-update` resolved success | No button-click proxy | PARTIAL — provider mapping pending |
| `CartUpsellAdded` | Real approved cart upsell | No upsell or event fabricated | BLOCKED BY BUSINESS DECISION |
| `BeginCheckout` | Shopify Customer Events checkout start | No theme click proxy | BLOCKED BY EXTERNAL CONFIGURATION |
| `Purchase` | Shopify Customer Events completed checkout/order | No theme purchase fabrication | BLOCKED BY EXTERNAL CONFIGURATION |
| `FAQOpened` | Confirmed RELIVANOW FAQ disclosure changing to open | Emit Product ID plus FAQ ID/category | COVERED |
| `ReviewInteraction` | Judge.me-approved integration | No provider UI scraping | BLOCKED BY EXTERNAL CONFIGURATION |

## Structured-data and SEO matrix

| Surface | Local result | Authority / rule |
|---|---|---|
| Canonical | Preserved | Shopify `canonical_url` |
| Robots / sitemap | Preserved | Shopify platform |
| Product / Offer | Guarded | Native `structured_data`; no blank or duplicate featured entity |
| AggregateRating / Review | Preserved | Judge.me/authentic data only; no parallel theme schema |
| FAQPage | Consistent when enabled | Same confirmed records as visible FAQ |
| Organization | Corrected | HTTPS schema context and stable shop origin |
| WebSite | Preserved | Existing native search-action schema |
| BreadcrumbList | Added once | Native route object, title, and canonical URL |
| Open Graph / Twitter | Extended | Native title, description, image, alt, locale |
| Headings | Corrected | Search title is H1; Home/PDP contracts preserved |

## Files changed by TASK-009

- Theme runtime: `assets/relivanow-analytics.js`, `assets/standard-actions-override.js`, `layout/theme.liquid`, `snippets/scripts.liquid`, `snippets/meta-tags.liquid`, `snippets/breadcrumb-schema.liquid`.
- Theme sections/config: `sections/header.liquid`, `sections/search-header.liquid`, `sections/product-information.liquid`, `sections/featured-product.liquid`, `sections/featured-product-information.liquid`, `sections/relivanow-faq.liquid`, `sections/footer-group.json`.
- Contracts: `tests/task009-contract.test.mjs`.
- Authorized control documents: `CHANGELOG.md`, `PROJECT_STATUS.md`, `TASKS.md`, this official task, `docs/ANALYTICS_PLAN.md`, `docs/DECISIONS.md`, `docs/QA_MATRIX.md`, and `docs/TECHNICAL_ARCHITECTURE.md`.

## Validation evidence

| Check | Result |
|---|---|
| TDD red state | PASS — the initial TASK-009 contract failed because the analytics module did not exist; the nested-payload contract then failed before the primitive-only filter was added |
| TASK-009 contracts | PASS — 9/9 |
| Full Node suite | PASS — 22/22 |
| Repository JSON / JSONC parsing | PASS through the structure contract |
| Every Liquid `{% schema %}` payload | PASS through the structure contract |
| Per-schema setting ID uniqueness | PASS through the structure contract |
| JavaScript syntax | PASS for both changed runtime modules |
| Fresh Shopify Theme Check | PASS — 359 files, zero errors, six inherited warnings after disabling only the known Judge.me nested app-URI `JSONMissingBlock` false positive in a temporary, removed config |
| Raw Theme Check | Expected known finding — the same valid nested Judge.me app URI plus the same six inherited warnings |
| Tracker / hardcoded external ID scan | PASS — no new tracker, provider ID, credential, account, Market, currency, domain, or remote endpoint |
| Whitespace / patch validity | PASS at checkpoint |
| Development-theme runtime / responsive / console / resource / Theme Editor / regressions | PASS — only the 13 affected files were uploaded to `193260781938`; Home/PDP/Search/Collection/Page, five exact viewports, metadata/schema, loaded assets, Home/PDP console, Theme Editor, Judge.me, and read-only Cart Drawer passed |

The Shopify CLI required a process-local `SHELL=cmd.exe` compatibility value because `os.userInfo()` fails with `ENOMEM` in this Windows environment. No repository or global shell setting was changed.

## Pending external decisions and evidence

- Approved analytics/advertising providers and their real account/property/pixel identifiers.
- Consent platform, legal categories, regional defaults, consent mode, and provider gating behavior.
- Attribution convention and server-side/CAPI ownership.
- Search Console and Merchant Center access, domain verification method, and feed ownership.
- Authorized Shopify Markets, price lists/conversion policy, currencies, languages, domains, availability, delivery, warranty, and shipping copy.
- Authentic populated Judge.me content for the remaining TASK-007 rating/review consistency checks.

## Safety record

- No Git push, Shopify publish, `--live`, or live-theme modification occurred.
- After explicit authorization, only the 13 TASK-009 theme files were uploaded to development theme `193260781938`; Shopify confirmed its role as `development` before and after validation, while `192527597938` remained `live`.
- Home and PDP passed 1440×900, 1024×768, 768×1024, 390×844, and 360×800 with no positive root overflow or broken image. Search, Collection, and Page route checks passed at desktop width.
- Runtime schema contained one Organization on Home/PDP, one ProductGroup and one BreadcrumbList on PDP, one BreadcrumbList on Collection/Page, zero invalid JSON-LD, and no false AggregateRating in the authentic zero-review state.
- The Theme Editor displayed `Development (bfe2c0-DESKTOP-EHRJHE7)`, the existing app-embed state, and a disabled Save button. No Theme Editor control was changed.
- The existing Cart Drawer opened with 17 items, quantities `3, 3, 3, 5, 3`, `$1,519.23 USD`, and Checkout present; it was closed without mutation.
- No credentials, preview URLs, tokens, customer data, or personal information were stored in the repository.
- TASK-010 was not started.
