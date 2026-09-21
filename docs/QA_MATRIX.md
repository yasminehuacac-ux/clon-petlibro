# QA matrix

## TASK-010 Release Gates Batch 1 — 2026-09-21

| Case | Result | Evidence / remaining gate |
|---|---|---|
| Intake and scope | PASS | Began from clean `main` at `ab5125ee7c392c3a18a4e6304e66ddf265f608fa`, nine commits ahead of `origin/main`. Changes are limited to six accessibility styling surfaces, one regression test and the seven authorized control documents. |
| P2 target inventory | PASS AFTER CORRECTION | Home Choose was 36×36, newsletter 42×42, Judge.me CTA 34 px high, and View all/payment/footer utilities were text-height targets. Each actual interactive target now resolves to at least 44 px via `--minimum-touch-target`; noninteractive text and approved component geometry were not expanded. |
| Input methods | PASS | Mouse opens the quick-add dialog and Close/Escape returns to the trigger; keyboard Enter opens/closes the policy popover with focus retained; a 390×844 pointer activation opens/closes the 44 px policy target; Judge.me opens its provider dialog and closes without submission. |
| Exact responsive matrix | PASS | Home and PDP targets measure at least 44 px at 1440×900, 1024×768, 768×1024, 390×844 and 360×800. Home, PDP and Search report zero positive horizontal overflow at every viewport. Desktop/tablet quick-add targets are 44×44; their mobile-hidden state is unchanged. |
| Regression surfaces | PASS READ-ONLY | Home, PDP, Search (`feeder`, two Products, one H1), Judge.me authentic zero-review dialog, and Cart Drawer with its unchanged 17-item state pass. No newsletter/review/checkout submission or cart mutation occurred. |
| Payment discovery | PASS READ-ONLY / CHECKOUT BLOCKED | Legal country is Peru. Actual Admin options inspected: Mercado Pago Tarjetas, Mercado Pago Checkout Pro and PayPal Express. Tarjetas is integrated; Checkout Pro redirects externally; PayPal Express is active and USD-only in Admin. Cross-border acceptance and the effective charge/settlement currency for all six markets are not proven without real checkout. |
| Provider fees | PASS VISIBLE STATE | Mercado Pago configuration shows 3.49% + S/1 for immediate settlement and an unselected 14-day 3.29% + S/1 alternative; Shopify shows an additional 2% transaction fee for both Mercado Pago routes and PayPal. PayPal's provider fee and settlement timing are not displayed in the inspected Shopify detail and were not invented. |
| Recommendation | CONDITIONAL | Prefer Mercado Pago Tarjetas + PayPal Express for the least disruptive integrated card/PayPal UX; retain Checkout Pro only as a fallback candidate. Do not connect or rely on this combination until Visa/Mastercard and real US/Canada/EU payer tests confirm currency, authorization, settlement and fees. |
| Markets and languages | PASS SAFE BASELINE | United States remains active in inherited USD. Canada and the four-region EU market (Germany, Belgium, Spain, France) remain draft; legacy UK and Australia/New Zealand also remain draft. English is published; German, Spanish, French and Dutch are unpublished with no domains. |
| Variants | PASS NO MUTATION / SUPPLIER BLOCKED | White/Black and Single/Dual are recorded only as supplier-reference requirements. No Product, Variant, ID, SKU, price, inventory or media mutation occurred; current product remains unapproved for publication until its real launch inventory matches. |
| Static validation | PASS | 26/26 Node tests; 90 JavaScript files via `node --check`; all repository JSON/JSONC, 51 locale JSON/JSONC files, Liquid schemas and setting IDs; zero new tracker matches; `git diff --check`. |
| Theme Check | PASS CODE / KNOWN TOOL FALSE POSITIVE | Fresh raw run: 359 files, one known `JSONMissingBlock` false positive for the valid Judge.me app URI and six inherited Horizon warnings. Diagnostic run disabling only that check: zero errors and the same six warnings; temporary config removed. |
| Theme destination and live safety | PASS | Only the six accessibility implementation files were uploaded to development theme `193260781938`. Theme list still reports `192527597938` as live and `193260781938` as development. The live `settings_data.json`, `theme.liquid` and `product.json` sizes/SHA-256 values exactly match the protected TASK-007 baseline. |
| Task gate | IN PROGRESS | Six blockers remain: supplier variant confirmation; authorized card-gateway connection; authorized PayPal Business connection; real checkout; policies/shipping/consent/final six-market QA; password removal and sitemap validation. |

## TASK-010 release-candidate checkpoint — 2026-09-21

| Case | Result | Evidence / remaining gate |
|---|---|---|
| Scope and destination safety | PASS | Work began from clean `main` at `c171ee0`; TASK-007 closure is commit `53e6065`. Only the scoped PDP navigation asset was uploaded to development theme `193260781938`; no live publish, Product/Variant/commercial mutation or Git push occurred. |
| Full static suite | PASS | 23/23 Node tests, all 89 JavaScript syntax checks, repository JSON/JSONC/locales/Liquid schemas/setting-ID contracts, prohibited tracker/claim scans and `git diff --check` pass. |
| Theme Check | PASS CODE / KNOWN TOOL FALSE POSITIVE | Raw: 359 files, one `JSONMissingBlock` finding for the valid nested Judge.me app URI and six inherited Horizon warnings. Diagnostic run disabling only that false-positive check: zero errors, the same six warnings. Temporary config removed. |
| Home, Search, header/footer/newsletter | PASS AVAILABLE STATE / LOCALIZATION GATE | Fresh Home/Search structure has one H1, expected landmarks, no root overflow, broken image, missing alt, placeholder, prohibited claim or console error. Newsletter was not submitted. English pages currently expose some Spanish merchant navigation/filter labels; human translation/publication remains an administrative release gate. |
| PDP and Purchase Panel | PASS CURRENT DATA | One H1, real price, six Style values, two Color values, quantity, ATC, gallery, payment and confirmed long-form content render. Variant switch updates URL/price/selection; gallery and zoom/Escape pass. Missing optional sections fail closed. |
| Cart and checkout handoff | PASS CURRENT FLOW / CARRIED CHECKOUT | Fresh Add to Cart, increment, decrement and exact-line removal passed; shared cart returned from 17 to 17 items. Drawer initial focus, Escape and trigger restoration pass. Prior unchanged checkout handoff on the same development theme remains valid and no purchase was completed. |
| PDP sticky navigation | PASS AFTER CORRECTION | A reproducible defect was fixed: bind/rebind to the real responsive scroll owner, scroll against stable section offsets while preserving the Product Information hash, include the CSS anchor gap plus subpixel tolerance, and recognize the final destination at the scroll limit. Fresh Purchase/Overview/Reviews hash and `aria-current` checks pass. |
| Judge.me | PASS ZERO STATE | Official output shows `No reviews`, first-review CTA and a keyboard-operable review dialog. No fabricated count/review/verified state exists; Product JSON-LD has zero `AggregateRating` and Review nodes. |
| Theme Editor | PASS READ-ONLY | Admin identifies `Development (bfe2c0-DESKTOP-EHRJHE7)` / theme `193260781938` as draft, exposes the ordered Home sections and has Save disabled. No setting was persisted. |
| Responsive | PASS | Fresh authenticated sticky-navigation checks pass at exact 1440×900, 1024×768, 768×1024, 390×844 and 360×800: Purchase/Overview/Reviews each reach the matching hash and active state with zero root/page-wrapper overflow. A live 1024→768 transition validates listener rebinding across the 990 px breakpoint. |
| Accessibility | PASS CORE / OPEN P2 | H1/heading/landmark/alt structure, keyboard focus, dialogs, Escape/restoration, live commerce state, reduced-motion contracts and sampled contrast (4.59:1 minimum among sampled primary controls) pass. Some secondary controls remain under the project 44 px target. |
| Performance | PASS EQUIVALENT / LAB METRICS UNAVAILABLE | Lighthouse/field LCP, CLS and INP were not available in the controlled authenticated preview and no score is claimed. Hero priority/lazy strategy, image dimensions/reserved layout, broken media, script ownership and console were inspected. Four RELIVANOW runtime modules total 14,878 bytes raw / 5,118 bytes gzip; duplicate high-priority responsive PDP image URLs are a non-blocking optimization observation. |
| SEO, analytics and fail-closed behavior | PASS AVAILABLE STATE | Canonical, one-H1 contracts, Product/Offer/Breadcrumb/Organization schema, zero-review schema, tracker absence, single-install custom events and unsupported-module omission pass. Sitemap HTTP 200, real regional consent and localized Market behavior remain external gates. |
| Defect status | PASS RELEASE-CANDIDATE CODE | One P1 sticky-navigation regression corrected; zero open P0/P1. Remaining P2 observations and data/admin gates are explicit and were not hidden or fabricated. |
| Publication decision | BLOCKED EXTERNALLY | TASK-010 stays `IN PROGRESS`: CAD/EUR, approved variants/Markets, translations/publication, legal/shipping/returns, regional consent, sitemap after password removal, Merchant onboarding, authentic-review follow-up and post-launch verification remain. |

## TASK-009 analytics, SEO, and Markets closure — 2026-09-20

| Case | Result | Evidence / remaining gate |
|---|---|---|
| Intake and scope safety | PASS WITH DISCLOSED DEVIATION | External closure began at `112386f` with a clean tree. TASK-007 was still `IN PROGRESS` at that historical checkpoint and is now `DONE`; no Product, Variant, price, inventory, live-theme file, publish, cart, paid plan, campaign, or charge mutation was performed. Shopify installed free first-party Translate & Adapt immediately when its install control was selected, before permissions or a separate confirmation appeared; no translation/publication followed and this is not treated as retrospective authorization. |
| Analytics event boundary | PASS local | Shopify standard events remain authoritative for Product, Variant and confirmed cart state. `GalleryInteraction`, `AddOnSelected`, and `FAQOpened` emit once through one provider-neutral DOM hook with no transport or storage; unsupported bundle/upsell/review behavior was not fabricated. |
| Payload and privacy | PASS local | Event-specific allowlists admit only primitive values and drop unknown or nested fields. No email, phone, address, customer/order object, free-form input, identifier, cookie, storage, endpoint, account, token, or provider ID was added. |
| Checkout, purchase, and consent | PARTIAL / LAUNCH VALIDATION GATE | Theme click proxies were deliberately not created and no analytics/advertising provider was enabled. Admin settings expose Manage preferences plus equal-access Accept/Decline and editable categories. Network Intelligence remains active by Work decision, Judge.me is `Always active`, and regional storefront cookies/requests require release QA. |
| Canonical, robots, and sitemap | PASS | Native `canonical_url` remains authoritative on Home, PDP, Search, Collection, and Page; no custom robots or sitemap implementation was added. |
| Metadata and social tags | PASS local | Existing native title/description/image sources now expose active Open Graph locale, image alt, Twitter image and Twitter image alt. Generic social-network homepage URLs were removed from footer defaults. |
| Structured data | PASS local / FUTURE POPULATED CHECK | Route-aware breadcrumbs, stable Organization context/origin, and guarded Product JSON-LD are present. FAQ records share the visible confirmed source. Judge.me remains the only review authority; zero-state consistency passes and populated-rating consistency is future operational QA after authentic reviews exist. |
| Headings and media SEO | PASS local / ADMIN DATA PENDING | Search now owns an H1 and current Home/PDP contracts retain one H1. Final Product/media alt completeness depends on approved administrative assets and values and was not fabricated. |
| Markets and localization | PASS SAFE BASELINE / LAUNCH GATES | US remains active; Canada and the four-country EU market are draft; UK and Australia/New Zealand are draft. English is published; German, Spanish, French, and Dutch are untranslated, unassigned, and unpublished. The former Shopify Payments path is superseded by D-073; alternative-gateway currency and checkout behavior require real regional regression. |
| Search Console / Merchant Center | PASS OWNERSHIP / LAUNCH GATES | `relivanow.com` is DNS-verified in Search Console and its sitemap is submitted. `/sitemap.xml` returned HTTP 404 while `/` redirected to `/password`; Google's initial fetch fails, causation is unproven, and a post-release retest is required. Merchant account `5857724399` exists with no products, feed, free listings, Ads, remarketing, campaign, plan, or charge. |
| Duplication and static quality | PASS | No manual GA/Meta/TikTok/Clarity/GTM transport was introduced; Judge.me ownership is unchanged. Node contracts, full JSON/JSONC/Liquid schema validation, unique setting IDs, JavaScript syntax, hardcoded-ID/URL scans, diff whitespace, and fresh Theme Check pass locally. |
| Historical development preview | PASS before external configuration | Only the exact 13 affected theme files were uploaded to development theme `193260781938`. Home/PDP passed five exact viewports with one H1, zero root overflow, zero broken images, and clean console; Search H1, breadcrumbs, Theme Editor, Judge.me zero-review state, and read-only Cart Drawer also passed. Theme list retained `192527597938` as `live`. |
| Post-configuration storefront regression | NOT RUN / RELEASE GATE | Administrative state was inspected, but selectors, localized URLs/currency, regional consent cookies/requests, console, Judge.me, Home, PDP, and Cart Drawer were not freshly exercised because the target Markets/languages remain draft/unpublished and the storefront remains gated. No known technical defect is asserted from these unexecuted checks. |

TASK-009 is `DONE`. The full criterion, event/schema, external-configuration, safety, and launch-gate reconciliation is in `reports/TASK-009-RESULT.md`; TASK-007 is now `DONE`, while TASK-010 remains gated by launch prerequisites.

## TASK-007 Judge.me acceptance matrix — 2026-09-20

| Case | Result | Evidence / remaining gate |
|---|---|---|
| Destination and live safety | PASS | Integration targets unpublished development theme `193260781938` only. Before/after SHA-256 values for live theme `192527597938` are identical for `layout/theme.liquid`, `config/settings_data.json`, and `templates/product.json`; no publish or `--live` action occurred. |
| Installation and plan | PASS existing install / PLAN UNVERIFIED | Judge.me was already installed before TASK-007 and exposes four active extensions. No permission, credential, plan, or charge acceptance occurred in this session; onboarding still exposes a Plan step that was not entered. |
| Single review authority | PASS | One official Star Ratings block, one official Review Widget, and the core embed are active in development. The native Horizon rating block is disabled; no manual rating/review store or Liquid-injected provider script exists. |
| Authentic zero-review state | PASS | The current real Product shows provider-owned `No reviews`, `Be the first to write a review`, and `Write a review` output. No sample review, false count, fabricated media, or public admin placeholder appears. |
| Populated review behavior | FUTURE OPERATIONAL CHECK | Work approved launch without reviews. Rating/count values, filters, customer media, pagination, verified-buyer output, and populated schema must be exercised only after authentic buyer reviews exist; absence at launch is not a defect. |
| Visual tokens | PASS launch baseline / FUTURE POPULATED CHECK | Runtime stars resolve to `rgb(255, 98, 1)` (`#FF6201`). Verified-buyer selectors consume `--color-verified` (`#3897F0`); visual output will be checked when an authentic verified review exists. |
| Structured data | PASS zero state | PDP JSON-LD contains Organization and ProductGroup only for reviews: zero `AggregateRating` and zero review nodes, consistent with the visible real zero state. Populated consistency becomes a future operational check. |
| Scripts and loading | PASS | PDP loads two unique Judge.me resources: one deferred core loader and one async module review-widget script. Home loads only the deferred core loader and no widget. No duplicate widget/script instance or manual injection was found. |
| Keyboard and dialog | PASS available state | The first-review dialog exposes `role=dialog`, `aria-modal=true`, a named heading, initial focus on Close, keyboard progression to the one-star control, and five named star buttons. No review was submitted. |
| Heading/accessibility boundary | PASS | The long-form section exposes one visible `Customer reviews` H2; Judge.me's nested widget title is visually suppressed without hiding the widget controls. PDP retains one H1. |
| Responsive | PASS | 1440×900, 768×1024, 390×844, and 360×800 show the rating and long-form widget with no positive horizontal overflow or clipped CTA. |
| Theme Editor | PASS | Star Ratings and Review Widget app blocks are visible and editable; Review Widget hide/show persisted. The approved Save affected the development theme only. |
| PDP/Home/Cart regressions | PASS read-only | PDP commerce controls remained present; Home retained one H1, no review widget, and no overflow; the native Cart Drawer opened with its existing 17 items and `$1,519.23 USD` total and was closed without mutation. Stable PDP/Home console inspection showed no warnings/errors. |
| Theme Check | PASS code, known tool false positive documented | Raw Theme Check inspected 358 files and reported one `JSONMissingBlock` error for the valid nested Judge.me `shopify://apps/...` URI plus six inherited warnings. Re-running with only that known false-positive check disabled produced zero errors and the same six warnings. |
| Task gate | DONE | Work approved the authentic zero-review launch baseline. Technical infrastructure and all applicable zero-state criteria pass; populated behavior is future operational QA and must never be fabricated. |

## TASK-006 reconciliation acceptance matrix — 2026-09-20

| Case | Result | Evidence / remaining gate |
|---|---|---|
| Traceability | PASS | 30 official/explicit criteria reconciled: 25 `COVERED`, 0 `PARTIAL`, 0 `MISSING`, 5 `BLOCKED BY CONTENT`; full matrix is in `reports/TASK-006-RESULT.md`. |
| Existing long-form PDP | PASS | All 16 TASK-004 RELIVANOW sections plus native Product Recommendations remain in their approved order and were not rewritten or duplicated. |
| Navigation | PASS | Purchase/Overview/Specifications/FAQ/Reviews navigation is directly after Product Information, hides missing destinations, requires at least two real targets, exposes one `aria-current="location"`, and uses dynamic header/navigation offsets. TASK-010 additionally corrected the desktop scroll listener, anchor-gap threshold and `Purchase` destination after a fresh runtime regression exposed them. |
| Fail-closed claims/content | PASS | Missing video, camera/monitoring, freshness/reliability, cleaning/compatibility, ecosystem, reviews and secondary media remain absent publicly; no claim, image, interface or relationship was invented. |
| Static validation | PASS | TASK-006 tests, repository JSON/JSONC and Liquid schema/setting-ID checks, JavaScript syntax, prohibited-claim/ID/URL scans and whitespace validation pass. |
| Theme Editor | PASS | Navigation enablement, accessible label, background and five reorderable target/label blocks are exposed; existing long-form controls remain unchanged. |
| Development preview | PASS | Only theme `193260781938` received the affected files. Navigation, active state, missing-target omission, responsive overflow and section anchors passed targeted real-preview checks. |
| Regression | PASS read-only | Purchase panel and Cart Drawer retained their existing controls/behavior; no Product form, Variant Picker, cart line or commercial data was changed. |

## TASK-008 Home acceptance matrix — 2026-09-20

| Case | Result | Evidence / remaining gate |
|---|---|---|
| Destination safety | PASS | All storefront uploads targeted development theme `193260781938`. Theme list retained active theme `192527597938`; no `--live`, publish, push, Product/Variant, Market, app, or commercial-data mutation occurred. |
| Public composition | PASS | Announcement, hero, confirmed benefits, native New & Popular grid, daily-routine story, connected-care story, final CTA, newsletter, and footer render in sequence. Category and Judge.me sections remain editor-visible but public fail-closed; no placeholder text leaks. |
| Exact responsive preview | PASS | 1440x900, 1024x768, 768x1024, 390x844, and 360x800 all reported root width equal to client width, zero clipped non-skip controls, zero broken images, and zero public placeholder matches. Desktop/tablet/mobile screenshots were visually inspected. |
| Accessibility | PASS for available UI | Exactly one visible H1 (`Smart care for life together.`), every visible Home image has an `alt` attribute, the section has an accessible label, CTA targets remain real links, and reduced-motion CSS disables slideshow smooth scrolling. |
| Performance | PASS | Hero image is the only `loading="eager"` / `fetchpriority="high"` Home image. Product-card first media and every editorial image are lazy; responsive `srcset`/`sizes`, intrinsic dimensions, object-fit, and reserved section geometry are present. |
| Claims/data | PASS | Public manual claims are restricted to 1–10 meals/day, 1–12 portions/meal, 2 L, dogs/cats, generic app support, and 2.4 GHz. Product image/URL/price/availability come from real Shopify Products. The active safe crop keeps embedded supplier copy outside hero/story frames. Prohibited-claim and added hardcoded remote ID/URL scans are clean. |
| Theme Editor | PASS | Development editor shows the complete ordered Home section list. Hero enablement, fallback collection, height, pagination, autoplay, colors, spacing, Product/media, mobile focus, safe crop, copy, CTA, position, overlay and verification controls are accessible. Save stayed disabled after read-only inspection. |
| Local contracts/structure | PASS | 7 Node tests pass: Home contract/order/gates, native card deferral, shell/newsletter, all repository JSON/JSONC, all Liquid schemas, and setting-ID uniqueness. Modified test JavaScript passes `node --check`; `git diff --check` passes. |
| Home runtime console | PASS | Stable Home preview produced no console warnings or errors. |
| PDP regression | PASS read-only | Feeder PDP retained one H1, 11 Product images with no broken media, native price, Color group, quantity input, two Product forms, and Add to cart. No form submission or commerce mutation was performed. |
| Cart Drawer regression | PASS read-only | Existing cart trigger expanded the native dialog with 17 pre-existing items, native line labels/quantities/totals, and `$1,519.23 USD` cart total. Drawer closed normally; no line, quantity, cart or checkout change was made. |
| Secondary assets/data | PASS fail-closed / BACKLOG | HOME-01 remains external/not uploaded; existing Product media supplies the usable fallback. Real collections/category media, Judge.me output, promotion/bundle, ecosystem, UGC, press/testimonial, and dedicated manifesto assets remain pending and were not fabricated. |

## Baseline viewports

- 360px mobile.
- 390px mobile.
- 768px tablet.
- 1024px small desktop/tablet landscape.
- 1440px desktop.

## Required areas

| Area | Cases |
|---|---|
| Variants | Single/Dual, each real color, available, sold out, unavailable combination |
| Media | Featured-media sync, thumbnail, swipe, zoom, video, keyboard, lazy loading |
| Product form | Price, compare-at, SKU, availability, quantity, errors, ATC success |
| Cart | Add, increase, decrease, remove, empty, refresh, server error, checkout |
| AOV | Compatible add-on, bundle, duplicate line, discount, variant change |
| Sticky UI | Header, PDP nav, ATC, safe area, cookies/chat overlap |
| Theme Editor | Add/remove/reorder/hide, reload, placeholder, block limits |
| Accessibility | Keyboard, focus, labels, live region, contrast, 44px targets, reduced motion |
| SEO | H1, headings, canonical, alt, Product/Offer/FAQ/rating schema |
| Performance | LCP, CLS, INP, JS, media, duplicate DOM, third parties |
| Markets | Currency, translations, availability, shipping/warranty copy |

## Defect priorities

- `P0`: purchase, cart, checkout, data loss, or major legal issue. Blocks all progress.
- `P1`: central function or responsive layout seriously broken. Blocks the gate.
- `P2`: meaningful UX/visual defect with workaround.
- `P3`: enhancement or minor detail.

## Evidence format

Every defect includes viewport/device, route, state/data, reproduction steps, expected result, actual result, screenshot/video, console/network evidence when relevant, and priority.

## TASK-010 carried verification

The following TASK-002 states lacked representative browser data and are explicitly deferred to TASK-010 without blocking the approved design-system gate:

- Emulated `prefers-reduced-motion: reduce` across cards, variants, controls, drawers/dialogs, cart transitions, and scrolling. Static inspection confirms TASK-002's changed shared timing variables collapse to `0.01ms`, while transform-based card and variant motion remains gated by `prefers-reduced-motion: no-preference`.
- Compare-at price and sale badge rendering with a real discounted product. Static wiring confirms both sale presentation paths consume the native `badge_sale_background_color` setting through `--color-sale`.
- Review stars with representative review metafields and merchant color override. Static wiring confirms `--color-rating` / `--color-rating-rgb` feed the SVG star variables.
- Visual coverage of all eight semantic color settings across controlled components and relevant color schemes.

## TASK-003 data-model acceptance

- Confirm native Product/Variant fields are not duplicated by RELIVANOW metafields.
- Confirm specification records resolve through the documented `value_source` allowlist; validate localized volume/weight/list/boolean output and both min/max range branches, and fail if a record contains a copied display value.
- Confirm metaobject definitions use Storefront API access `NONE` plus publishable/translatable capabilities; `DRAFT` records resolve to no public section and only confirmed, approved `ACTIVE` records render.
- Inspect rendered HTML/JSON to confirm governance/source fields and private product/variant metafields are absent. Test unknown status strings and blank dates/sources fail closed.
- Confirm Judge.me's `reviews.rating` and `reviews.rating_count` are the only rating/review inputs before enabling review output. Test missing, true zero, malformed, and non-five-point values, and audit Horizon plus Judge.me JSON-LD for one aggregate source.
- Confirm UNVERIFIED claims and unavailable variants cannot render. Keep Dual Bowl and Sky Blue variants uncreated rather than relying on variant-level catalog exclusion.
- Confirm Germany and Belgium have no invented delivery estimate and remain inactive Markets and/or outside all shipping zones; test country selection, delivery-copy suppression, cart and checkout rejection.
- Confirm empty metafields and missing/unpublished metaobject references produce no placeholder, `undefined`, empty interactive control, or broken schema.
- Confirm reference lists that become empty after filtering omit their section/anchor, specification groups with no rows disappear, and empty `product.media` uses only Horizon's design-mode placeholder while blocking production publication.
- Confirm provisional simple text remains blank until approved; policy PDP summaries match and link to native policies/rates; bundle cards match the native bundle parent price, component variant quantities, and inventory.
- Confirm bundle `INACTIVE`/invalid records hide, `ACTIVE` uses native availability, and an unavailable native bundle exposes no enabled purchase action; confirm incomplete market min/max pairs render no estimate.
- Confirm the add-on list is empty until every referenced product is compatible with both Cloud White/Single Bowl and Graphite/Single Bowl; fail closed on missing, unavailable, or unapproved references.
- Before publication/final TASK-010 acceptance, confirm all publication candidates are approved Shopify `product.media`, have final alt text and responsive crops, preserve physical product geometry, and use native variant associations. Their absence may remain `BLOCKED BY TEST DATA` at the TASK-004 local-review gate.
- When adding Bowl Configuration, verify `productOptionsCreate` with first value `Single Bowl` and `LEAVE_AS_IS` preserves existing variant IDs; then regression-test URLs, media, price, SKU, inventory, availability, ATC/cart, Markets, and analytics labels.
- Confirm the English manual link is omitted outside English until a localized-file model is approved; an absent manual must not create a blank link.

## TASK-004 purchase-area validation

| Area | Required TASK-004 evidence |
|---|---|
| Native state | Cloud White is first when no variant query exists; a valid direct `?variant=` selection wins; Graphite stays enabled. |
| Variant synchronization | Cloud White and Graphite update native variant ID, URL, price, compare-at price, SKU, inventory/availability, product form, delivery override, and sticky ATC from one Horizon server-rendered selection event. |
| Gallery | One carousel DOM consumes only `product.media`; native featured media moves first; a variant without featured media receives the full general gallery; zoom/video and keyboard controls remain operational. |
| Media performance | The first gallery medium is eager/high priority; every later gallery medium is lazy; image dimensions/aspect ratio reserve space and no horizontal overflow or meaningful CLS appears at baseline viewports. |
| Purchase form | Available, sold-out, unavailable, quantity-rule, validation, cart-error, and rapid double-interaction states add the selected variant/quantity exactly once. |
| Data gates | Empty/DRAFT benefits, policies, delivery, ratings, financing, SKU, or media omit cleanly; no governance/private fields or UNVERIFIED claims appear in HTML. |
| Accessibility | Fieldset/legend/radio semantics, 44px targets, keyboard selection, focus visibility, live inventory/delivery/error updates, zoom focus restoration, and reduced-motion behavior pass. |
| Theme Editor | Product blocks add/remove/reorder/reload without duplicate listeners, forms, galleries, or stale content. |
| Markets | Money/payment terms use Shopify output; delivery renders only a confirmed, eligible country record with valid min/max plus a translated approved note, or a confirmed variant override. Germany and Belgium render no invented estimate. |

Static inspection cannot replace executable browser tests. For the final local gate, TASK-004 may move to `REVIEW` when every locally executable case passes, no critical functional defect remains, and every unexecuted state is isolated as `BLOCKED BY TEST DATA` because it requires approved remote Shopify data that must not be fabricated.

### TASK-004 development-theme gate — 2026-09-10

Preview used: `http://127.0.0.1:9292`, backed by development theme `193260781938`. Browser: Chrome.

| Case | Result | Evidence / unblock action |
|---|---|---|
| 1440×900, 768×1024, 390×844, 360×800 | PASS | Gallery and purchase layout reflowed without overlap or horizontal overflow; mobile indicators and sticky ATC remained usable. |
| Gallery navigation and zoom | PASS | Ten current native slides rendered; the selected indicator changed from slide 1 to slide 2, zoom focused Close, and Escape dismissed with prior focus restoration in the interactive run. |
| First/later media loading | PASS | First gallery image rendered eager/high-priority; subsequent images rendered lazy with width/height attributes. |
| URL-less and direct variant URL | PASS with legacy data | Native first variant selected without query; `?variant=62294853222770` took priority. |
| Variant synchronization | PASS with legacy data | Two-way change updated resource ID, URL, $129.99/$115.99 price, SKU, availability, ATC and featured media. |
| Cloud White / Graphite | BLOCKED BY TEST DATA | Replace/map the six remote legacy `Style` variants with the approved Cloud White/Graphite model; keep Cloud White first. |
| Compare-at | BLOCKED BY TEST DATA | Every current feeder variant has `compare_at_price: null`; provide a commercially valid discounted state. |
| Available and sold out | PASS | All feeder variants passed available behavior; existing sold-out sample rendered `Out of stock` and disabled `Sold out` ATC. |
| Unavailable combination | BLOCKED BY TEST DATA | Provide a real unavailable option combination; do not fabricate or publish one solely for QA. |
| Missing featured media | PASS generically / BLOCKED for Graphite | Existing sample variant without featured media rendered general product media; create the approved Graphite variant without association to prove its exact fallback. |
| Add to Cart and drawer | PASS after correction | Correct variant/quantity/price, accessible busy state, single addition under rapid double click, `Added` live announcement and Horizon drawer passed. |
| Server cart error | PASS by local interception | Controlled 422 and 500 responses never reached Shopify. Error/live messages, `aria-busy` reset, button re-enable, retry, one-request double click and main/sticky synchronization passed. |
| Benefits, policies and delivery | PASS fail-closed / BLOCKED populated | Empty current data omitted cleanly. Create approved ACTIVE records and eligible market data to validate populated rendering; Germany/Belgium must remain empty. |
| Keyboard/focus/contrast | PASS where executable | Radio ArrowRight selection, visible focus, named controls, live regions, zoom focus/Escape and #171817/#FFFFFF plus #315800/#FFFFFF states passed. |
| Forced reduced motion | PASS | Forced `reduce` matched; gallery, zoom, swatches, Style cards, variant change and sticky ATC retained function with transitions/animations collapsed. |
| Accessibility tree / screen reader | PASS tree / NOT EXECUTED app | Chrome exposed named Style/Color groups, eight named radios with checked state and status/live nodes. A dedicated screen-reader application session remains future QA. |
| Theme Editor | PASS | Full reload, hide/show, one-column preview, keyboard reorder/restore and temporary mapping edit/restore passed. Unsaved changes were discarded and reload left Save disabled. |
| JavaScript console | PASS for TASK-004 | No TASK-004 file error; only Shopify account-menu fallback and Shopify editor infrastructure warnings/reconnections appeared. |

Reproduced and corrected during this gate: missing remote metafield dynamic-source upload failures, overlong block schema name, blank hydrated variant-ID fallback, concurrent double-submit behavior, main/sticky pending-state desynchronization, and narrow-screen wrapping of legacy Style names. Every executable local case now passes; remaining gaps depend on absent approved remote data.

### TASK-004 visual-selector addendum

| Case | Required result | Current evidence |
|---|---|---|
| Color resolution: native image/color | `option_value.swatch.image`, then `option_value.swatch.color` | BLOCKED BY TEST DATA for live precedence; current Black/White values have no native swatch data. Liquid order reviewed. |
| Color resolution: Product metaobject | First valid `strip + handleize` match in `relivanow.color_swatches`; record image wins over record color | BLOCKED BY TEST DATA remotely; definitions/records intentionally do not exist. Local branch/schema inspection and safe DOM fixture cover image/color rendering. Duplicate records cannot create duplicate radios. |
| Color resolution: Variant metafield | Current combination's `relivanow.swatch_color` follows Product-specific data | BLOCKED BY TEST DATA; definition/value does not exist remotely. |
| Color resolution: Theme Editor mapping | Matching normalized name is the final configured fallback | PASS. Empty Product metafields on the real route fell through to White `#FFFFFF` and Black `#000000`; all eight mappings remain editable. |
| Color display mode: Product | `color_display_mode` accepts `swatch_only` or `swatch_and_name` | BLOCKED BY TEST DATA remotely; definition/value intentionally absent. Liquid allowlist and precedence reviewed. |
| Color display mode: fallback | Blank/invalid Product value → Variant Picker default → `swatch_only` | PASS for blank Product metafield and both local development modes. No remote value was saved. |
| Color unconfigured | Neutral diagonal pattern, real `title`, `aria-label`, hidden name and no invented hex | PASS static fallback branch; current Black/White values now intentionally resolve through template mappings. |
| Two configured colors | Visually distinct swatches from real data | PASS. Server output emits distinct `#FFFFFF`/`#000000` variables; desktop screenshot shows White with a gray boundary and Black as black with the selected green border/check. |
| Color selected/sold out | Check plus green boundary; native `aria-disabled` and sold-out accessible name | Selected markup/CSS present; sold-out Color BLOCKED because every current combination is available. |
| Style cards | Real Style/Model/Configuration radios render one full-width row with image, native name/price, compare-at, optional badge and availability | PASS for current data. Six radio-label cards, six native featured images, six native prices and zero Product links rendered; desktop screenshot confirms one full-width card per row, and Theme Editor mobile mode loaded the same one-column list. CSS contains one column at every breakpoint and no column-count variable. |
| Style image override | `relivanow.style_card_image`, then native featured media, then placeholder | Native featured-media branch PASS; metafield and placeholder branches BLOCKED BY TEST DATA. |
| Style compare-at / badge / sold out | Native compare-at and availability; approved `style_badge` only | BLOCKED BY TEST DATA; current variants have no compare-at, badge, or sold-out state. |
| Color + Style | Both fieldsets use the same Horizon picker and currently resolved `option_value.variant` | PASS. Current product exposes Choose Style cards and Choose Color swatches together in server and browser output. |
| Keyboard/focus and state synchronization | Arrow navigation updates URL, ID, price, compare-at, SKU, availability, media, ATC and other options | PASS for current Black/White data. Focused Black → ArrowRight selected White and changed the variant URL; ArrowLeft restored Black and its URL. The same native server-rendered variant path remained active. Compare-at is still blocked by empty source data. |
| Responsive Color + Style cards | One full-width card per row and no overflow at 1440, 768, 390 and 360 px | PASS. Fresh 1440×900, 768×1024, 390×844 and 360×800 captures confirmed six distinct full-width rows, no horizontal overflow, aligned content and wrapped long names. |
| Empty related models | Entire block omitted | PASS fail-closed: real feeder route returned HTTP 200 and emitted zero selector containers or “Choose Model” headings. |
| Current/available/sold-out model cards | Current uses `aria-current="page"`; each public Product exposes native title, URL, availability and price | BLOCKED BY TEST DATA; no related Product list exists. |
| Missing model image | Reserved square placeholder; no external URL and no CLS | BLOCKED BY TEST DATA for browser proof; static fallback present. |
| Model compare-at absent/present | Current native price remains; compare-at appears only when greater than price and enabled | BLOCKED BY TEST DATA; no related Product list exists. |
| Approved badge | Only Recommended, Coming soon, or Best value from `relivanow.model_badge`; blank/unknown omits | BLOCKED BY TEST DATA; no approved badge values exist. |
| Responsive model cards | One full-width card per row at every breakpoint; no overflow at 1440/768/390/360 | BLOCKED BY TEST DATA while the fail-closed block is empty; static two-column rule was removed. |
| Theme Editor | Default Color display mode plus eight global fallback mappings are editable | PASS schema/local instance. The help text states that Product `color_display_mode` overrides the setting; existing Style controls and mappings remain intact. No remote setting was saved. |

The executable local gate is complete, but TASK-004 remains `IN PROGRESS` under Work's latest status instruction. Populated related-model, compare-at, unavailable Color, optional Style-metafield and approved Graphite/media cases remain `BLOCKED BY TEST DATA`. Do not create camera products, placeholder relations, prices, availability, media or badges solely for QA; rerun those rows when real approved data exists.

### TASK-004 complete purchase-panel addendum — 2026-09-11

| Case | Result | Evidence / remaining gate |
|---|---|---|
| Default block order | PASS | Theme Editor exposed Header (rating, title, subtitle, price), trust, benefits, promotion, the existing Variant Picker, add-ons, Buy buttons, delivery and payment methods in the approved order. Style and Color remain one native picker; quantity, ATC and accelerated checkout remain one native product form. |
| Public fail-closed output | PASS | The HTTP 200 storefront rendered zero purchase-panel preview placeholders and omitted absent rating, subtitle, trust, benefits, promotion and add-ons without empty wrappers. |
| Editor-only missing-data previews | PASS | Customize rendered six clearly labelled previews, each containing the exact text `Preview only — configure product data`; the public storefront rendered none. |
| Rating and subtitle | PASS fail-closed / BLOCKED populated | Rating reads only Shopify's standard review metafields reserved for Judge.me; subtitle reads only `relivanow.product_subtitle`. Neither source exists on the tested Product. |
| Trust and short features | PASS fail-closed / BLOCKED populated | Only confirmed, correctly typed policy/benefit records can render. The tested Product has no approved records; no policy promise or product claim was invented. |
| Promotion | PASS disabled/default/schema / BLOCKED configured interaction | The block is disabled and blank by default. Enable, label, message, code, supporting-text and copy-button controls were visible in Customize. A live configured promotion/copy interaction was not fabricated because no approved offer exists. |
| Add-on relationship | PASS fail-closed / BLOCKED populated | Exact source is Product `relivanow.add_on_products`. Missing/self/unconfirmed/multi-Variant references are omitted; sold-out single-Variant Products are disabled; no approved referenced Product exists for browser card validation. |
| Add-on cart batch | PASS isolated | Actual `product-form.js` modules ran in a temporary local harness. One main line plus one unique add-on produced one JSON cart request; a duplicate checked Variant ID was removed. No Shopify cart or remote Product was mutated. |
| Native quantity and rapid submit | PASS isolated | The same harness confirmed native quantity rejection before fetch and a single in-flight request under rapid double submit. Main and sticky ATC became disabled/`aria-busy` together and recovered together. |
| 422 and network failure | PASS isolated | Both branches produced an assertive accessible message, cleared busy state, re-enabled controls and allowed a successful retry. |
| Accelerated checkout | PASS isolated | Selecting an add-on suppressed accelerated checkout; clearing all add-ons restored it. This prevents a checkout path that would silently omit selected add-ons. |
| Responsive purchase panel | PASS | Exact 1440×900, 768×1024, 390×844 and 360×800 viewports had zero horizontal-overflow delta, one full-width Style card per row, 48×48 White/Black swatches, stable nonzero gallery dimensions and usable native purchase controls. |
| Accessibility and reduced motion | PASS static/executable states | Native fieldset/legend/radios, accessible swatch names, focus styles, 44px+ targets, status/live messages and existing reduced-motion gates remain intact. Optional populated add-on/promotion screen-reader cases remain blocked by absent approved data. |
| Theme Editor lifecycle | PASS for structure/settings | Full editor reload exposed the intended block hierarchy and promotion/add-on settings; Save remained disabled because no persistent remote setting was changed. Existing editor infrastructure warnings were unrelated to TASK-004 files. |
| Final Shopify Theme Check | PASS | One post-implementation run inspected 337 files with no offenses. No duplicate run was started. |
| Populated add-on, review, trust, feature and subtitle states | BLOCKED BY TEST DATA | Requires approved remote values/products; none were created solely for QA. |

At that dated checkpoint, the purchase-panel completion introduced no new critical local defect; TASK-004 still remained `IN PROGRESS` and TASK-005 was `DRAFT` and unstarted. The current project state is recorded in `PROJECT_STATUS.md` and the TASK-005 matrix below.

### TASK-004 long-form Phase 1 addendum — 2026-09-12

| Case | Result | Evidence / remaining gate |
|---|---|---|
| Section order | PASS static | `templates/product.json` contains Trust, Two Ways, Features, How It Works, Lifestyle, Specifications, Box Contents, and FAQ directly after `main` and before recommendations. |
| Independent Theme Editor modules | PASS schema / NOT EXECUTED live | Eight independent section schemas expose show, width, background, spacing, and relevant alignment/content controls. Live add/reorder/hide/save was not run because `theme dev` could not be started without an external development-theme sync. |
| Public fail-closed gates | PASS static / BLOCKED live data | Each section encloses its public wrapper in its own validated-content condition. Missing/invalid data reaches only `request.design_mode` preview markup. No remote confirmed records or media were created for a live populated test. |
| Trust / Benefits Bar | PASS static / BLOCKED populated | Maximum four blocks; confirmed matching policy records or explicitly confirmed complete manual items only. Provisional shipping/returns/warranty records cannot render. |
| Two Ways to Feed | PASS static / BLOCKED populated | Requires a heading, approved image, and exactly two complete `CONFIRMED` cards. Both default scheduling/app cards remain `PROVISIONAL`. |
| Product Features | PASS static / BLOCKED populated | Ordered `relivanow.features`; requires 3–6 confirmed title/body records; only public title/body/media/icon/accessibility/link fields render. |
| How It Works | PASS static / BLOCKED populated | Requires 3–4 complete confirmed steps. Desktop/tablet timeline and mobile vertical list are CSS-only; current default steps remain provisional. |
| Lifestyle | PASS static / BLOCKED approved images | Requires at least one Theme Editor image. No external URL or storefront placeholder fallback exists; optional overlay, position, alignment, ratio, copy, and CTA are typed settings. |
| Specifications | PASS static / BLOCKED populated | Confirmed groups/items dispatch through the documented allowlist; invalid source or missing typed value emits no row; groups without rows disappear; net-weight clarification is conditional. |
| Box Contents | PASS static / BLOCKED populated | Confirmed `box_items` records take priority; the confirmed `box_contents` list is a text-only fallback. Sources never merge and no extra item is inferred. |
| FAQ data and schema | PASS static / BLOCKED populated | Requires 6–10 confirmed question/answer records. FAQ JSON-LD is disabled by default and, when enabled, reads the same visible records. |
| FAQ keyboard / single-open | PASS isolated browser fixture | Native summary buttons exposed collapsed/expanded state. Enter opened item 1; Space on item 2 moved visible focus, opened item 2, and closed item 1 through the native shared `name`. |
| Responsive 1440×900 | PASS isolated browser fixture | Eight representative sections; no positive horizontal overflow; benefits 4 columns, features 3, steps 4, specs 2, box cards 2. |
| Responsive 768×1024 | PASS isolated browser fixture | No positive horizontal overflow; benefits/features 2 columns, steps 4, specs 2, box cards 2. |
| Responsive 390×844 and 360×800 | PASS isolated browser fixture | No positive horizontal overflow; benefits/features/steps/specs 1 column and box cards 2 columns. Text wrapping and native FAQ controls remained exposed. |
| Reduced motion | PASS static / fixture rule detected | New section code introduces no required motion. FAQ icon transition exists only inside `prefers-reduced-motion: no-preference`; the isolated fixture exposed its `reduce` rule. Full browser emulation against rendered Shopify Liquid was not run. |
| Prohibited claims / external assets | PASS | Storefront-source search found none of the blocked camera/monitoring/AI/5 GHz/policy claims and no external content/media URLs; the FAQ schema.org context is the sole HTTPS literal. |
| Purchase-panel regression | PASS diff isolation / NOT EXECUTED live | Phase 1 changed no purchase-panel, gallery, Variant Picker, swatch, add-on, product-form, sticky-ATC, delivery JS, or buy-button file. Existing executable evidence remains valid; a fresh live commerce run was not possible without development-theme sync. |
| JSON/schema/IDs/JS | PASS | All JSON/JSONC parsed; 150 Liquid schema payloads parsed; schema names are valid; no per-schema setting IDs are duplicated; accumulated JavaScript passes `node --check`. |
| Final Theme Check | PASS | One final run with the documented process-local `SHELL` workaround inspected **347 files with no offenses found**. |

The responsive and FAQ results above are explicitly isolated CSS/DOM fixture evidence, not Shopify data or Theme Editor evidence. The temporary fixture/server were removed, viewport override was reset, and no test artifact remains. The first local `theme dev` attempt stopped before starting because Shopify CLI could not write its user config under the sandbox; the required elevated retry was rejected before execution. No development theme, product, media, or store data was changed.

### TASK-004 long-form Phase 2 addendum — 2026-09-12

| Case | Result | Evidence / remaining gate |
|---|---|---|
| Complete long-form order | PASS static | All 16 Phase 1–2 modules follow `main` in the required order; native Product Recommendations remains after Final CTA. |
| Independent Theme Editor modules | PASS schema / NOT EXECUTED live | Eight new section schemas expose their own enablement, layout, background, spacing, and typed content controls. No development-theme sync or remote save was authorized. |
| Phase 2 public fail-closed gates | PASS static / BLOCKED populated | Complete wrappers render only after each section's minimum confirmed Product data, editorial blocks, images, or app output resolves. Missing/unverified data is design-mode guidance only. |
| Precise Feeding | PASS static / BLOCKED populated | Only complete typed Product meal/portion ranges or complete `CONFIRMED` manual metrics can render. No gram or tracking fact is inferred. |
| Feeding Insights | PASS static / BLOCKED populated | Requires confirmed screenshot media plus 2–4 confirmed complete insight cards; no invented graph, dashboard, or percentage exists. |
| Remote Control | PASS static / BLOCKED populated | Requires confirmed product media and 2–4 confirmed benefits; app media has its own confirmation gate. |
| Product Comparison | PASS static / BLOCKED populated | Requires 2–4 distinct confirmed real Products and confirmed rows. Image/title/URL/price/availability are native; no Product ID or URL is hardcoded. |
| Comparison accessibility | PASS isolated browser fixture | Focusable horizontal scroller retained `overflow-x: auto`, its instruction relationship, and a sticky feature column at all four viewports. |
| Why Choose Smart Feeding | PASS static / BLOCKED populated | Requires 3–6 complete confirmed rows; no comparison claim ships in defaults. |
| App Experience | PASS static / BLOCKED approved images | Requires 1–3 independently confirmed screenshot blocks with real `image_picker` media. No tab script or synthetic UI exists. |
| Reviews / Social Proof | PASS schema / BLOCKED app data | Accepts `@app` blocks only. No manual reviews, ratings, testimonials, customer media, or review JSON-LD were added. |
| Final CTA | PASS static + isolated browser fixture / BLOCKED final media | No Product form or Variant ID. Native `#MainContent` fallback remains; the enhancement focused `ProductInformation-*`, retained a 44px target, and supports reduced-motion automatic scrolling. |
| Responsive 1440×900 | PASS isolated browser fixture | Exact CSS viewport; two-column media layouts, 3-column app grid, no positive root overflow, no unexpected overflowing element. |
| Responsive 768×1024 | PASS isolated browser fixture | Exact CSS viewport; two-column media layouts and 2-column app grid; comparison scroll is contained; no positive root overflow. |
| Responsive 390×844 and 360×800 | PASS isolated browser fixture | Exact CSS viewports; media, metrics, insight and app grids collapse to one column; comparison remains contained and scrollable; no unexpected overflow. |
| Prohibited claims / hardcoded commerce | PASS | Phase 2 source contains no blocked camera/monitoring/AI/5 GHz/policy claim, hardcoded Product/Variant ID, comparison URL, or external content/media URL. |
| Purchase and Phase 1 regression | PASS diff isolation / NOT EXECUTED live | Phase 2 changed no purchase-panel, gallery, picker, swatch, add-on, delivery, product-form, sticky-ATC, or Phase 1 implementation file. |
| JSON/schema/IDs/JS | PASS | 68 JSON/JSONC files and 158 Liquid schema payloads parsed; schema names and setting IDs passed; accumulated modified JavaScript passed `node --check`. |
| Final Theme Check | PASS | The single post-implementation run inspected **355 files with no offenses found**. It was intentionally not repeated. |

The Phase 2 responsive results are isolated CSS/DOM fixture evidence, not Shopify Liquid, Judge.me, remote Product data, or Theme Editor evidence. The temporary fixture, CDP probe, Chrome profile, and HTTP server were removed after the run. No development theme, app, Product, Variant, price, inventory, metafield/metaobject, Market, media, or store configuration was changed.

### TASK-004 authorized Shopify closure — 2026-09-12

| Case | Result | Evidence |
|---|---|---|
| Product-state preservation | PASS | Snapshot records title, description, handle/SEO boundary, 12 variants with prices/SKUs, inventory total, and 11 media references before mutation. |
| Theme boundary | PASS | Development theme `193260781938` received the code; live theme `192527597938` was neither modified nor published. |
| Confirmed Product data | PASS | Authenticated Liquid readback returned meals/day `1` and `10`, portions/meal `1` and `12`, and the exact three-item box list. |
| Real Liquid/public gates | PASS | Development preview returned HTTP 200. Only Precise Feeding and Box Contents rendered; all unsupported long-form wrappers and editor placeholders were absent. |
| Responsive 1440×900 | PASS | Root/body width 1440; overflow delta 0; both populated sections visible. |
| Responsive 768×1024 | PASS | Root/body width 758 within viewport 768; no positive overflow; both populated sections visible. |
| Responsive 390×844 | PASS | Root/body width 380 within viewport 390; no positive overflow; both populated sections visible. |
| Responsive 360×800 | PASS | Root/body width 350 within viewport 360; no positive overflow; both populated sections visible. |
| Theme Check 4.8.0 | PASS WITH BASELINE WARNINGS | 355 files inspected, zero errors, six pre-existing Horizon warnings: one `ExcessiveSettingsCount` in `sections/header.liquid` and five `UnusedDocParam` warnings in `snippets/divider.liquid`. |
| Protected fields/assets | PASS | No price, variant, inventory, handle, SEO, Product description/title, `product.media`, live-theme, publication, or app change. Approved binaries were unavailable; provisional media was not used. |

TASK-004 is `DONE`. Image-, comparison-, specification-record-, FAQ-, and Judge.me-dependent modules remain intentionally fail-closed until their separately approved sources exist.

## TASK-005 cart-drawer acceptance matrix

This matrix applies to the READY drawer-only scope. Free-shipping progress, recommendations, upsells, cross-sells, gifts, bundle creation, and new offer logic are not test fixtures and must remain absent.

| Area | Required evidence |
|---|---|
| Native architecture | One `#cart-drawer`, one native `dialog`, one `cart-items-component`, one standard cart-event path, and no duplicated Cart API/store/price state. |
| Open and close | Header trigger, optional successful-add auto-open, quick-add-modal deferral, close button, backdrop, Escape, repeated open/close, and close during/open after animation produce one stable drawer. |
| Focus | Close button receives initial focus; Tab/Shift+Tab remain contained while opened by the user; nested disclosure dialogs stay above the drawer; close restores the connected trigger or its fresh replacement. |
| Quantity success | Plus, minus, typed value, min/max/increment, volume pricing, trailing debounce, and server-confirmed section morph produce the exact final quantity once. |
| Remove success | Remove one line, a parent with nested lines, an app-controlled non-removable line, and the final line. The empty state appears only after Shopify confirms success. |
| Pending | Affected controls expose `aria-busy`, duplicate activation is blocked, layout does not jump, unrelated product links remain understandable, and state clears on every settle path. |
| Error and retry | Shopify validation error, 4xx/5xx, invalid JSON, timeout/offline/network rejection, and stale section response preserve/restore the authoritative line, announce one useful error, expose Retry, and succeed on retry without duplicate mutation. |
| Concurrency | Rapid same-line changes coalesce before dispatch; dispatched changes serialize; add from PDP/quick add/app during a drawer mutation cannot let an older response overwrite newer state. |
| Line identity | Two lines with the same Variant but different properties remain distinct by line key. Main Product and add-ons remain separate; no Product/Variant aggregation removes properties. |
| Properties/apps | Public text and upload properties render; underscore-prefixed properties stay hidden; `item.instructions.can_update_quantity/can_remove`, parent relationships, nested lines, disclosures, and bundle components remain intact. |
| Selling plans | Existing selling-plan allocation/name survives quantity/remove and morphing. No selling-plan selector is invented; the current theme has display support only. |
| Prices/discounts | Native original/final/compare-at prices, line discounts, cart discounts, unit prices, subtotal/estimated total, optional currency code, tax/shipping text, and Markets money output agree with Shopify. |
| Discount/note | Existing settings off/on, apply, invalid, shipping-only, remove, typing preservation, note debounce, failure and external standard-action refresh do not clobber current form input. |
| Checkout | Full-width black standard Checkout is first and dominant, submits the native cart form once, and preserves all lines/properties. Shopify accelerated checkout is absent/present only according to platform output and the existing setting. |
| Empty cart | Localized heading and close control render; no Continue shopping, summary, fake offer, recommendation, or stranded loading/error markup appears. |
| Count/live regions | Header bubble and drawer badge show the absolute `cart.item_count`; cart-count, total, add success and error announcements are correct and not duplicated. Back-forward cache correction passes. |
| Theme Editor | `cart_type`, auto-open, note, discount, installments, accelerated checkout, empty link, thumbnail and drawer colors reload safely; no duplicate listeners, IDs, forms, dialogs, or stale hydration targets. |
| Localization | English plus representative long German/Spanish strings, RTL locale, localized money, optional currency code, and 100+ count do not clip or reorder semantics incorrectly. |
| Performance | Cart modules remain low-priority/module-loaded, no external library or polling is added, no duplicate Product media is fetched, and drawer interactions meet the existing INP objective. |
| No JavaScript | Header cart action reaches `routes.cart_url`; the server-rendered cart form exposes items and Checkout. Document any quantity/remove limitation that remains instead of claiming full AJAX behavior. |

### Responsive and accessibility matrix

| Viewport/state | Layout requirement | Interaction/accessibility requirement |
|---|---|---|
| 360×800 | Overlay drawer fits width; ~80×80 media; title/options/price wrap; summary/Checkout remain visible without horizontal overflow. | 44px controls, visible focus, no background focus/scroll, Escape and close restore the trigger. |
| 390×844 | Same mobile hierarchy with multiple properties, discount pill, and long translated content. | Quantity/remove/error/retry remain named and announced once. |
| 768×1024 | Modal drawer remains usable with multiple lines and tall summary; item list scrolls independently when needed. | Keyboard traversal reaches header, lines, disclosures, summary and Checkout in logical order. |
| 1024×768 | Native squeeze mode starts at 990 px; page and 25rem drawer do not overlap or create root overflow. | Custom focus trap cycles inside the open drawer; nested modal and Escape priority pass. |
| 1440×900 | 25rem drawer, subtle dividers and sticky/static summary threshold behave without obscuring the last line. | Opening, closing, restored-session state, focus restoration, and multiple-drawer stack pass. |
| Reduced motion | No row/drawer/view-transition motion is required to understand state; durations collapse according to existing gates. | Focus, loading, error and retry remain fully functional with `reduce`. |

### Implementation gate

TASK-005 may move from `READY` to `REVIEW` only after code-level static checks, relevant isolated error/concurrency fixtures, exact-width browser evidence, keyboard/accessibility-tree inspection, Theme Editor lifecycle checks, no-JavaScript fallback inspection, `git diff --check`, and one post-change Theme Check. Any remote/store-dependent case must be labelled with the exact missing data and must not be fabricated.

### TASK-005 local implementation addendum — 2026-09-14

| Case | Result | Evidence / remaining gate |
|---|---|---|
| Native architecture/diff boundary | PASS static | Existing `theme-drawer`, `cart-items-component`, standard events, Cart routes and Section Rendering remain the only cart graph. No dependency, global store, Product-form change, AOV feature or remote mutation was added. |
| Rapid same-line quantity | PASS isolated browser | Three rapid intents coalesced into one absolute native line-key request with the final quantity. |
| Different-line concurrency | PASS isolated browser | Two dispatched line changes were FIFO serialized; measured maximum concurrent `/cart/change` requests was one. Active and queued rows exposed `aria-busy`. |
| External overlap/out-of-order responses | PASS isolated browser | A local change plus external add reconciled to the authoritative final state; an older external response could not replace a newer state. |
| Failure/retry matrix | PASS isolated browser | Shopify 422, HTTP 500, network rejection, invalid JSON and missing section all exposed recoverable UI. Retry was single-flight and repeated the retained absolute intent once. |
| Failed/successful remove | PASS isolated browser | Failed removal retained its connected row and never produced false empty state; successful retry removed it only after server confirmation. |
| Line semantics | PASS static + isolated browser / BLOCKED representative apps | Separate line keys, public properties, hidden underscore properties, selling-plan and discount markup survived morphs. Real upload properties, bundle parents/components, nested/app instructions and same-Variant property combinations remain development-data cases. |
| Progressive fallback | PASS static + isolated browser | Loaded ordinary click toggled the drawer; missing drawer/module did not prevent the real `routes.cart_url` link. Existing `/cart` form and Checkout code are unchanged. |
| Native drawer accessibility | PASS isolated browser / BLOCKED nested live dialog | Desktop sidebar passed open, initial close focus, forward Tab wrap, outside-focus redirection, Escape, original/fresh-trigger focus restoration. Mobile modal additionally passed backdrop close. Real nested disclosure/dialog stacking remains pending representative data. |
| Empty drawer | PASS static + isolated visual | Continue shopping is suppressed only for drawer context. Native localized heading/close remain; cart-page Continue shopping remains intact. |
| Premium layout | PASS isolated visual | Exact 1440×900, 1024×768, 768×1024, 390×844 and 360×800 CSS viewports plus 390×844 RTL: zero root/drawer positive overflow, 80×80 media and visible full-width Checkout. |
| Localization | PASS JSON/static + isolated RTL / BLOCKED Markets | Error and Retry keys have matching entries in all 31 storefront locales; all 30 strict storefront locale JSON files parse after the parity correction. Long fixture content and RTL do not overflow. Real localized money/currency-code/Markets output remains pending. |
| Accelerated checkout, discounts and note | PASS preservation static / BLOCKED platform output | Existing conditional accelerated checkout, cart discount and note components were not replaced. Platform-supplied accelerated buttons and real setting combinations require development-theme validation. |
| Theme Editor/lifecycle | PASS morph fixture / NOT EXECUTED remote | Hydration replacement preserved one component and focus restoration found a fresh trigger. Actual editor reload/settings changes require upload to unpublished theme `193260781938`, which was not authorized. |
| Static validation | PASS | 67 JSON/JSONC files and 158 Liquid schema payloads parsed; duplicate setting IDs: 0. Modified JavaScript passes `node --check`; hardcoded commerce scan and `git diff --check` pass. |
| Final Theme Check | EXECUTED ONCE / CORRECTED LOCALLY AFTER FAILURE | The sole run inspected 355 files and reported 56 `MatchingTranslations` errors (the two new keys missing in 28 locales) plus the six inherited Horizon warnings. The 28 locale files were then completed; a direct parity check finds both keys in all 31 storefront locales and all 30 strict locale JSON files parse. Theme Check was not repeated because the task explicitly limited it to one run. |

These are isolated local fixtures and static source checks, not claims about Liquid rendered against real Shopify data. At this local checkpoint TASK-005 remained `IN PROGRESS`; the development-theme and final isolated-empty-state addenda below supersede that status. TASK-006 has not begun.

### TASK-005 development-theme validation addendum — 2026-09-16

| Case | Result | Evidence / remaining gate |
|---|---|---|
| Destination and publication safety | PASS | Theme `193260781938` remained `development` and received the working tree; theme `192527597938` remained `live`. No publish, `--live`, order, global commerce-data, app, commit, or push action occurred. |
| Final Theme Check | PASS | One run in this final phase inspected 355 files with zero errors. The only output was the unchanged Horizon baseline: one `ExcessiveSettingsCount` warning in `sections/header.liquid` and five `UnusedDocParam` warnings in `snippets/divider.liquid`. |
| Locale parity | PASS | `actions.retry` and `content.cart_update_error` exist in all 31 storefront locales; all 30 strict JSON files and the English default JSONC parse. |
| Real basic cart flow | PASS with data-dependent omissions | The preview added the current Product, added a second valid Variant as a distinct keyed line, changed quantities, removed only test-created lines, reopened the drawer, and preserved authoritative count, subtotal, title and Variant labels. No eligible add-on/property/selling-plan/discount fixture existed, so those states were not fabricated. |
| Real concurrency | PASS | Rapid same-line increments coalesced to the final server-confirmed quantity. Consecutive mutations across two lines remained serialized, exposed row pending state, produced no duplicate/stale lines, and left no stuck drawer state. |
| Real accessibility | PASS for available UI | Initial focus reached Close; Escape closed and restored the connected cart trigger; Shift+Tab stayed within the drawer; desktop remained nonmodal and ≤768 px modal. Visible controls met the 44 px target gate, media measured 80×80, and the checkout target measured 52 px. Failure/retry and reduced-motion guarantees retain passing isolated-suite evidence because unsafe network/server failures were not forced. |
| Exact responsive preview | PASS | 1440×900: 480 px right drawer; 768×1024: 480 px modal drawer; 390×844 and 360×800: full-width modal drawer. Each had zero positive root/drawer overflow, undistorted 80×80 media, and a visible full-width black 52 px Checkout. |
| `/cart` and Checkout | PASS | The header renders a real `/cart` anchor. The full cart page loaded with native cart form and Checkout; Checkout opened with `preview_theme_id=193260781938`, preserved the cart summary, and no purchase was completed. Full JavaScript disabling was unavailable, so the HTML anchor plus direct server-page navigation are the real degradation evidence. |
| PDP regressions | PASS for available data | Gallery navigation, Style/Color radios, Variant URL/price update, Add to Cart, Product form, accelerated PayPal output, and the two currently data-backed long-form sections remained functional. Add-ons, delivery and the other fail-closed long-form modules remained absent because their real eligible data was absent. |
| Runtime error-copy correction | PASS | Preview inspection found a double-escaped apostrophe in the fallback error attribute. `Theme.translations.cart_update_error` is now preferred and Liquid uses `escape_once`; the corrected rendered attribute contains a normal apostrophe. |
| Real empty-cart state | PASS | A clean temporary Chrome profile was manually authenticated without exposing credentials. `/cart.js` began with zero items/zero total. Variant `62294853190002` was added once as native key `62294853190002:b6a00faaf4df7311e236fccf9d03be13`, count 1 and subtotal `$129.99 USD`; only that line was removed. Shopify returned count/total/rows to zero. The open drawer contained the empty heading/account message, no Continue shopping, Checkout, subtotal, image, quantity control, visible error, or busy state. 1440×900, 390×844, and 360×800 had zero root/drawer overflow with visible heading/Close. Fresh open focused Close; button close and Escape restored the Cart trigger. `/cart` showed its correct empty page; settled console/network diagnostics contained no errors, failures, or HTTP ≥400. The shared cart was untouched and the temporary profile/processes were removed. TASK-005 is `DONE`. |
