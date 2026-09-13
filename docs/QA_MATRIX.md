# QA matrix

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

The purchase-panel completion introduces no new critical local defect. TASK-004 nevertheless remains `IN PROGRESS` exactly as instructed; TASK-005 remains `DRAFT` and unstarted.

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
