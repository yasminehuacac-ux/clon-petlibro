# TASK-004 — PDP purchase area

**Status:** DONE
**Depends on:** TASK-002/003 approved; current Product data preserved; authorized unpublished development-theme validation completed
**Gate owner:** ChatGPT Work

## Objective

Build the conversion-critical Purchase area for the RELIVANOW Smart Automatic Pet Feeder using Horizon-native commerce systems and the approved data model.

## Read first

- `AGENTS.md`
- Approved reports for TASK-001–003
- `docs/CONVERSION_BLUEPRINT.md`
- `docs/DATA_MODEL.md`
- `docs/CONTENT_MATRIX.md`
- `docs/ASSET_MANIFEST.md`
- `docs/QA_MATRIX.md`

## Scope

- Product gallery with one DOM instance, responsive behavior, zoom/video, and variant media synchronization.
- Configurable first purchase panel: rating hook, title, Product subtitle, native price/compare-at, confirmed trust chips, confirmed short features, optional promotion, existing Style/Color picker, fail-closed add-ons, native quantity/ATC/accelerated checkout, delivery, and payment icons.
- Accessible Style and Color option controls.
- Dynamic delivery message from an approved source.
- Quantity and Add to Cart.
- Payment/trust messaging.
- Sticky mobile/desktop ATC only through the audited Horizon path.
- Skeleton of Purchase/Overview/Specs/FAQ/Reviews anchor navigation if approved by the TASK-001 architecture.
- Correct loading, sold-out, unavailable, validation, and cart-error states.
- Visual Color swatches built on Horizon's native radio/variant-picker path, with non-color selected and unavailable cues.
- Fail-closed related-model selector backed by real Shopify Product references, never Color variants or duplicated commerce fields.

## Out of scope

- Bundles, automatic discounts, multi-Variant add-on choice, and cart-page/drawer cross-sells.
- Full storytelling sections, reviews provider, Home, analytics providers.
- Unverified product claims or PETLIBRO content.

## Long-form Phase 1 addendum — 2026-09-12

Work explicitly extended TASK-004 to include the first long-form PDP phase immediately after Product Information, without changing the completed purchase panel. The ordered modules are Trust / Benefits Bar, Two Ways to Feed, Product Features, How It Works, Lifestyle / Product in Use, Product Specifications, What’s in the Box, and FAQ.

- Every module is an independent Online Store 2.0 section with a show toggle, width/background/spacing controls, and Theme Editor reorder support.
- Product-owned facts use confirmed structured references and typed metafields. Manual editorial cards require an explicit `CONFIRMED` status. Invalid or incomplete content emits no public wrapper, heading, placeholder, or spacing.
- The four default How It Works blocks and both Two Ways blocks remain `PROVISIONAL`; they are visible only as configuration guidance in Theme Editor until the scheduling/app/manual claims are approved.
- Lifestyle uses only `image_picker` assets and hides publicly without an approved image. FAQ requires six confirmed records, reuses native details/Horizon accordion behavior, and leaves schema disabled by default.
- At the Phase 1 checkpoint, comparison, app-experience, insight, review-host, and final-CTA work was still deferred; the Phase 2 addendum below now completes those PDP modules. Footer work remains untouched and TASK-005 remains `DRAFT`.

## Long-form Phase 2 addendum — 2026-09-12

Work explicitly extended TASK-004 again to complete the remaining long-form PDP modules without changing the gallery, purchase panel, Judge.me rating hook, selectors, add-ons, product form, checkout, delivery, payment icons, sticky ATC, `product-form.js`, or Phase 1 section implementations.

- Added Precise Feeding, Feeding Insights, Remote Control, Product Comparison, Why Choose Smart Feeding, App Experience, Reviews / Social Proof, and Final CTA as independent OS 2.0 sections.
- Precise Feeding can read only the approved typed meal/portion ranges or a complete manual metric explicitly marked `CONFIRMED`; it has no gram, remaining-food, percentage, or monitoring source.
- Feeding Insights, app screenshots, remote-control copy/images, smart-feeding differences and final media require their own `CONFIRMED` setting. Empty or unverified configuration renders only design-mode guidance.
- Product Comparison requires two to four distinct real Products whose Product-level and relationship statuses are both `CONFIRMED`. Native image, URL, price and availability remain Product-owned; row values are separately verified section content.
- Reviews / Social Proof accepts native `@app` blocks only. Judge.me remains the sole planned source for ratings, counts, reviews, customer media and review structured data; no parallel review content or schema was added.
- Final CTA creates no product form, Variant ID or add-to-cart path. Its honest default label is `Choose your feeder`; a small progressive enhancement focuses/scrolls to the existing purchase panel, respects reduced motion, and leaves a native `#MainContent` fallback.
- The complete required 16-module order is configured immediately after `main`; the existing native Product Recommendations section is preserved after Final CTA. The footer remains untouched and TASK-005 remains `DRAFT`.

## Acceptance criteria

- [x] Style/color changes synchronize variant ID, media, price, SKU, availability and sticky ATC without reload for current representative values; compare-at/add-on remain blocked by absent approved data.
- [x] Add to Cart adds the selected variant/quantity exactly once and recovers accessibly from intercepted 422/500 responses.
- [x] Gallery and product controls work by touch/mouse-equivalent browser interaction and keyboard.
- [x] No duplicate product form, gallery, variant source, or commercial state.
- [x] Mobile and desktop match the approved composition at 1440×900, 768×1024, 390×844 and 360×800.
- [x] Theme Editor reload, reorder/restore, hide/show and mapping edit/restore behavior works without saving remote changes.
- [x] Relevant executable QA, Theme Check, JSON/schema, JavaScript and diff checks pass; absent remote-data states are explicitly blocked.

## Purchase-panel completion addendum — 2026-09-11

- Default order: rating/reviews; native title; `relivanow.product_subtitle`; native price/compare-at; confirmed compact policy chips; three or four confirmed feature records; optional disabled-by-default promotion; the unchanged native Style/Color picker; `relivanow.add_on_products`; the native quantity/ATC/accelerated-checkout group; delivery; native payment icons.
- Rating/count remain Judge.me-owned. Missing standard review metafields hide publicly and show only the clearly labelled Theme Editor preview.
- Subtitle, policy chips, features and add-ons render no public wrapper when their typed data is absent or unapproved. Every editor-only placeholder contains “Preview only — configure product data”.
- Promotion uses only typed block settings, requires enable + label + message + code, and never claims a configured Shopify discount or automatic checkout application.
- Add-ons are separate Shopify cart line items. Current checkbox quick-add accepts only CONFIRMED, non-self Products with one default Variant; unavailable Products stay disabled, duplicate Variant IDs are filtered, and accelerated checkout is unavailable while add-ons are selected.
- One Variant Picker and one buy-buttons block are intentionally indivisible technical units: Style/Color share one native variant state; quantity/ATC/accelerated checkout share one native product form. All other panel blocks remain reorderable in Theme Editor.
- Related-model selection remains a separate fail-closed component from the prior visual addendum and is not instantiated in the default purchase panel.
- Remote definitions/records, discounts, Products, inventory, media, Judge.me, and Shopify Bundles were not created or changed.

## Visual addendum

- The native option named `Color` renders under “Choose Color”. Resolution is native swatch image, native swatch color, the first valid normalized Product `relivanow.color_swatches` metaobject match, currently resolved Variant `relivanow.swatch_color`, one of eight global Theme Editor mappings, then a neutral diagonal pattern. Matching uses `strip + handleize`; no Variant IDs or hardcoded color names are used.
- Product `relivanow.color_display_mode` selects `swatch_only` or `swatch_and_name`. The first renders compact 48×48 circles; the second renders uniform rectangular radio-label cards at least 52px high with the circle and native option name. Blank/invalid Product data falls back to `default_color_display_mode`, then `swatch_only`.
- Selected Color uses a brand-green boundary plus a visible check; hover, focus, unavailable, and disabled semantics remain distinct. Both modes retain fieldset/legend, real radio, full accessible option name, arrow-key behavior and Horizon's `ProductSelectEvent`.
- A real option matching the configurable Style/Model/Configuration name list renders as “Choose Style” cards inside the same Horizon picker. Each card remains a native radio label and reads image override, featured media, native name, price, compare-at, availability and optional approved badge from the currently resolved `option_value.variant`.
- Variant style-card image priority is `relivanow.style_card_image`, native `featured_media`, then a Shopify placeholder. Style cards and related-Product model cards render one full-width item per row at every breakpoint. The picker exposes Theme Editor controls for enabling Color swatches/Style cards, recognized option names, price, compare-at, badges, image size, default Color display mode, and the eight legacy fallback mappings; the approved Choose Style layout is unchanged.
- `relivanow.related_models` (`list.product_reference`) is the sole relationship source for the “Choose Model” block. It hides unless at least two public, `CONFIRMED` products resolve and the current product is among them.
- Each model card reads native Product featured media, title, price, compare-at price, URL, and availability. `relivanow.model_badge` is optional and accepts only an explicitly approved Recommended, Coming soon, or Best value value.
- Physically different models are independent Products with their own native URL, SKU, price, inventory, and `product.media`. Camera-related products or copy do not render until real products and supplier verification exist.
- Remote definitions, products, relations, badges, and media are not created by this task. Missing related-model data is an intentional fail-closed state and blocks model-selector browser acceptance.

## Development-theme validation gate — 2026-09-10

The authorized local preview passed responsive checks at 1440×900, 768×1024, 390×844, and 360×800, along with native gallery controls, generic variant synchronization, available/sold-out behavior, Add to Cart, double-submit prevention, cart drawer, keyboard variant selection, focus visibility, zoom/Escape, fail-closed content blocks, and Theme Editor loading/block discovery.

The final executable local gate passed: exact-size responsive checks, intercepted 422/network recovery, rapid double-click single-flight behavior, forced reduced motion, keyboard/accessibility-tree checks, Theme Editor lifecycle/settings, JavaScript syntax, JSON/schema validation, diff review, and one final Theme Check across 337 files with no offenses. The remote feeder still contains twelve legacy combinations across six `Style` values and two `Color` values; approved Cloud White/Graphite, compare-at, unavailable Color, optional Style states, approved content/delivery, final media, add-on Products, Judge.me data and populated related Products remain `BLOCKED BY TEST DATA`. Per Work's latest instruction, TASK-004 remains `IN PROGRESS`; TASK-005 remains `DRAFT`.

## Required handoff

Create `reports/TASK-004-RESULT.md` with screenshots/evidence for every variant state. Do not begin TASK-005.

## Closure addendum — 2026-09-12

Work authorized configuration and validation on the current RELIVANOW Product through an unpublished development theme, while explicitly protecting the live theme, publication state, price, variants, inventory, handle, SEO, and unapproved claims.

- The complete pre-change Product state is preserved in `reports/TASK-004-PRODUCT-SNAPSHOT-2026-09-12.md`.
- The full theme was uploaded only to development theme `193260781938`; live theme `192527597938` was not modified or published.
- Five definitions/values were created from confirmed evidence only: meals/day 1–10, portions/meal 1–12, and box contents Pet feeder ×1 / Power adapter ×1 / Instruction manual ×1.
- Shopify Liquid console readback confirmed all five values.
- The real development preview returned HTTP 200, rendered Precise Feeding followed by What’s in the Box, omitted every unsupported long-form wrapper, and emitted zero editor-only placeholders.
- Exact viewport checks at 1440×900, 768×1024, 390×844, and 360×800 produced zero positive root overflow; both populated sections remained visible at every width.
- The final Shopify Theme Check inspected 355 files with zero errors and six pre-existing Horizon warnings in `sections/header.liquid` and `snippets/divider.liquid`.
- Approved asset binaries were not present in the supplied workspace/attachments, so no media was uploaded. Provisional assets were not used. Image-dependent modules remain correctly fail-closed.

These evidence-gated omissions satisfy the explicit fail-closed acceptance contract and do not require fabricated test data. TASK-004 is closed as `DONE`; TASK-005 remains `DRAFT`.
