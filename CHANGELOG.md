# Changelog

All notable project changes are recorded here.

## Unreleased

### Added

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
