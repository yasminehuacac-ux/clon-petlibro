# Changelog

All notable project changes are recorded here.

## Unreleased

### Added

- TASK-007 Judge.me infrastructure on unpublished development theme `193260781938`: official top rating and long-form review app blocks, the core app embed, an honest provider-owned zero-review state, and persistent contract tests for single-source configuration and RELIVANOW review colors.
- TASK-007 safety and QA evidence covering live-theme before/after checksums, four responsive PDP viewports, keyboard/dialog behavior, Theme Editor hide/show, script/schema duplication, Home/PDP/Cart regressions, and the authentic-content gate.
- TASK-006 reconciliation against the completed TASK-004 long-form PDP, including a fail-closed, merchant-editable sticky anchor navigation with active-location state and dynamic omission of unavailable destinations.
- Persistent TASK-006 contract tests for navigation structure, accessibility state, fail-closed targets, and placement immediately after Product Information.
- TASK-008 premium Home composition with a claim-gated responsive hero, confirmed-benefit strip, native New & Popular product grid, two Product-backed editorial stories, fail-closed reviews host, final CTA, announcement, newsletter, and footer copy.
- Home-specific OS 2.0 sections for campaign media/copy and Product-backed storytelling, including independent desktop/mobile media, mobile focal control, an editor-controlled safe crop for fallback media with embedded supplier copy, first-image LCP priority, editor-only missing-data guidance, and public fail-closed output.
- Persistent Node contract/structure tests for the Home sequence, editor controls, Product ownership, native product-card deferral, JSON/JSONC parsing, Liquid schema parsing, and setting-ID uniqueness.
- TASK-008 development-theme evidence on theme `193260781938`: five exact responsive viewports, one-H1 semantics, image priority/alt/broken-media checks, Theme Editor controls/order, clean Home/PDP console, PDP read-only regression, and read-only Cart Drawer regression.
- TASK-005 development-theme validation evidence on unpublished theme `193260781938`: real PDP add, distinct valid Variants, quantity/remove mutations, FIFO cross-line concurrency, cart count/subtotal, native `/cart`, Checkout handoff without purchase, accessibility, and exact 1440×900, 768×1024, 390×844, and 360×800 measurements.
- TASK-005 local cart-drawer reliability layer inside Horizon's existing `CartItemsComponent`: per-line intent coalescing, FIFO server mutation serialization, authoritative overlap reconciliation, affected-row pending semantics, localized visible errors and one retained Retry action.
- Matching error and Retry copy across all 31 storefront locales.
- Exact-width isolated cart fixtures covering error/retry, failed removal, external update races, no-JavaScript/module fallback, native drawer focus lifecycle, 80×80 media, RTL and responsive Checkout visibility.
- Authorized TASK-004 Shopify closure evidence: a pre-change Product snapshot, five confirmed Product metafield definitions/values, authenticated Liquid readback, and real unpublished-development-theme viewport measurements.
- TASK-004 long-form Phase 2 with Precise Feeding, Feeding Insights, Remote Control, Product Comparison, Why Choose Smart Feeding, App Experience, Reviews / Social Proof, and Final CTA as eight independent Online Store 2.0 sections.
- A real-Product comparison table with native Product media, price, URL and availability, verification-gated rows, an allowlisted badge, accessible horizontal scrolling, and a sticky feature column.
- A Judge.me-ready `@app` block host that emits no manual rating, review content, or review JSON-LD, plus a reduced-motion-aware final-CTA focus/scroll enhancement with a native anchor fallback.
- TASK-004 long-form Phase 1 with eight reorderable, fail-closed PDP sections: trust bar, two feeding modes, features, steps, lifestyle, specifications, box contents, and FAQ.
- Typed `relivanow_box_item` planning model and Product `relivanow.box_items` references for optional item-level box media, quantity, and alt text; the existing confirmed text list remains a safe fallback.
- TASK-004 purchase composition using Horizon-native product media, variants, price/compare-at, quantity, Add to Cart, accelerated checkout, payment, and sticky-ATC systems.
- Confirmed-data RELIVANOW blocks for key benefits, policy trust summaries, and market/variant delivery without duplicating commerce state.
- Fail-closed Product subtitle, optional promotion, editor-preview placeholder, and `relivanow.add_on_products` purchase blocks for the complete PDP purchase panel.
- Approved add-ons submit as real separate line items in one cart request; the implementation rejects self-references, unconfirmed or multi-Variant Products and duplicate Variant IDs.
- Native visual Color swatches and a fail-closed related-Product model selector for the TASK-004 purchase area.
- Validated Cloud White asset handoff manifest with five approved-visual and three provisional files.
- TASK-003 Shopify-native Product/Variant/metafield/metaobject, Markets, reviews, bundles, migration, fallback, and media-manifest documentation.
- Original provisional English feeder content based only on confirmed supplier functions, with explicit claim-status gates.
- RELIVANOW semantic color, spacing, motion, state, and layout aliases in Horizon's shared token pipeline.
- Merchant-editable semantic colors for warm/surface, state, and rating roles.
- Project control pack for ChatGPT Work + Codex.
- Repository-level `AGENTS.md`.
- Architecture, workflow, data, analytics, content, asset, QA, and release documentation.
- Ten-task execution roadmap with TASK-001 ready for audit.
- Standard Codex result-report format.
- TASK-001 verified baseline report, component dependency graph, and reuse/extend/compose/create map.
- Environment-gate result documenting the verified local Shopify development setup.

### Changed

- TASK-007 moved from `DRAFT` to `IN PROGRESS`. The validated technical integration is retained, while populated-review filters, media, pagination, verified-buyer presentation, and populated rating/schema consistency remain `BLOCKED BY AUTHENTIC CONTENT`.
- The native Product rating block is disabled in the development template so Judge.me is the single visible review authority; the existing Reviews / Social Proof app host remains the only long-form review section.
- TASK-006 moved from `DRAFT` to `DONE` after reconciling all official criteria with the 16 existing TASK-004 long-form sections, native Product Recommendations and Horizon media system. Installation video, camera/monitoring, freshness/reliability, cleaning/compatibility and ecosystem publication remain content-gated rather than fabricated.
- TASK-008 moved from `DRAFT` through `IN PROGRESS` to `DONE`; TASK-006 remains `DRAFT` and its PDP scope/files were not changed.
- The Home selects the real automatic-feeder Product for hero/story data instead of a collection-order fallback. Missing category collections, Judge.me output, promotion/bundle, ecosystem, UGC, press/testimonial, and dedicated manifesto assets remain fail-closed and documented rather than fabricated.
- Horizon's Home-only hidden shop-name H1 was removed so the visible campaign heading is the single H1. Native product-list cards now expose an optional `defer_card_images` control; Home uses it so only the hero image is eager/high priority.
- TASK-005 moved from `IN PROGRESS` to `DONE` after the final empty-cart closure passed in a manually authenticated, clean temporary Chrome profile. The isolated cart began at zero, received one valid feeder Variant, removed only that test line by its native line key, returned to authoritative zero state, and passed drawer, `/cart`, accessibility, console/network, and 1440×900, 390×844, and 360×800 checks. The shared cart was untouched and all temporary processes/profile data were removed.
- Runtime fallback error copy now prefers the already-decoded locale value and uses single HTML escaping, preventing an apostrophe from appearing as a literal entity after section morphing.
- TASK-005 moved from `READY` to `IN PROGRESS`: local implementation and isolated/static validation are complete; unpublished-development-theme, Theme Editor and representative real-cart validation remain pending.
- The drawer now uses the existing RELIVANOW semantic tokens for a white/neutral premium hierarchy, restrained dividers, fixed 80×80 media, a sticky safe-area summary and a dominant full-width black native Checkout button.
- The header drawer action is a real localized cart-route link progressively enhanced into the native drawer; failed JavaScript/module loading retains Shopify's server-rendered `/cart` fallback.
- Destructive optimistic row removal was replaced by server-confirmed Section Rendering. Public properties, selling plans, bundle/nested/app line markup, discounts, totals and accelerated checkout continue to be rendered by native snippets.
- TASK-004 moved from `IN PROGRESS` to `DONE` after the current Product passed real-data and fail-closed validation through development theme `193260781938`. The live theme and protected commerce/SEO/media fields were untouched; TASK-005 remains `DRAFT`.
- Shopify CLI auto-updated from 4.7.0 to 4.8.0 during the authorized development-theme upload. The final 4.8.0 Theme Check inspected 355 files with zero errors and six pre-existing Horizon warnings.
- The Product template now places all 16 approved long-form modules after Product Information in the required Phase 1–2 sequence; the existing native Product Recommendations section remains after the final CTA.
- Phase 2 sensitive modules require explicit `CONFIRMED` content/image/relationship status and omit their complete wrapper publicly when minimum data is absent. Precise Feeding alone can resolve the approved typed meal and portion ranges directly from Product metafields.
- Long-form PDP content now reads confirmed Product references or explicitly confirmed Theme Editor blocks, emits editor-only source guidance when data is absent, and renders no empty public wrappers or provisional claims.
- FAQ reuses native `details`/Horizon accordion behavior, defaults structured data off, and supports native single-open or multi-open behavior without a new script.
- TASK-004 moved from `DRAFT` to `IN PROGRESS` after Cloud White became the approved primary/default direction; TASK-005 remains `DRAFT`.
- The PDP gallery now uses a single Horizon carousel instance, reserves a square media area, prioritizes the first medium, lazily loads later media, and retains the native no-featured-media fallback.
- Development-theme validation replaced invalid optional metafield dynamic sources with a fail-closed Liquid block and added a single-flight, accessible Add to Cart guard with native selected-variant fallback.
- TASK-004's visual addendum keeps Color on Horizon's radio/swatch path and models as independent Product references with native media and commerce fields.
- Color swatches now resolve native image, a safe Theme Editor mapping, native color, and Variant `swatch_color` before an explicit neutral pattern; White/Black/Cloud White/Graphite defaults are present in the current template.
- Native Style/Model/Configuration radios and related-Product model cards now use one full-width column at every breakpoint.
- The default Product template now follows the approved purchase order while preserving the existing Style/Color selector as one native block and quantity/ATC/accelerated checkout as one native product-form unit.
- Product-form pending/error handling now covers the optional multi-line add-on request, keeps main/sticky ATC synchronized, restores retry after 422/network failures, and hides accelerated checkout whenever an add-on is selected.
- The single final post-panel Shopify Theme Check inspected 337 files with no offenses.
- Work approved TASK-003; the Shopify data model moved from `REVIEW` to `DONE`. TASK-004 remains `DRAFT` pending final assets, hero/default variant decisions, and native media associations.
- TASK-003 moved from `BLOCKED` to `REVIEW` after Work supplied the required commercial/content decisions; TASK-004 remains `DRAFT`.
- Work approved TASK-002 after responsive storefront, commerce-flow, keyboard/focus, Theme Editor, and static validation; TASK-003 was initially blocked pending commercial and content decisions later supplied by Work.
- Reduced-motion mode now collapses all timing variables changed by TASK-002 at the root, covering every consumer of those shared motion tokens.
- Applied the approved RELIVANOW palette, Inter typography, restrained radii, borders, and hover treatment to the development configuration and shared primitives.
- Styled sale prices, form errors, ratings, and shared states while preserving Horizon's dynamic button hover, custom-button, and adaptive focus behavior.
- Project status and architecture now reflect the completed static baseline audit and its live-validation limits.
- Work approved TASK-001 and accepted the current repository as the official RELIVANOW baseline.
- TASK-001 moved to `DONE`; TASK-002 was held at `BLOCKED` pending local development-toolchain verification.
- Verified Windows AMD64 tooling with Node.js v24.20.0, Shopify CLI 4.7.0, and Theme Check passing across 327 files with zero offenses.
- Verified Shopify authentication, development-theme connection, local preview, and Theme Editor access; TASK-002 moved from `BLOCKED` to `READY`.
- Documented the two-terminal Windows workflow and the prohibition on storing credentials, preview URLs, or temporary theme IDs.

### Preserved

- Horizon 4.1.1 theme implementation.
- Existing Git history, branch, remote configuration, and intake settings.
