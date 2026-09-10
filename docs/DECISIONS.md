# Decision register

| ID | Decision | Status | Rationale |
|---|---|---|---|
| D-001 | Brand is RELIVANOW | FROZEN | Approved brand identity |
| D-002 | Descriptor is Smart Pet Care | FROZEN | Defines category clearly |
| D-003 | Tagline is “Smart care for life together.” | FROZEN | Approved positioning |
| D-004 | PETLIBRO is a UX/conversion benchmark only | FROZEN | Maintain quality without protected-content copying |
| D-005 | Horizon 4.1.1 is the intake base | VERIFIED | Declared by theme settings schema |
| D-006 | Inter is the implementation font; Söhne only with license | FROZEN | Legal and practical typography |
| D-007 | Warm white + charcoal + deep green palette | FROZEN | RELIVANOW identity |
| D-008 | PDP and cart precede Home implementation | FROZEN | Conversion systems establish reusable foundation |
| D-009 | Shopify data is the source for price, variants, inventory, and SKU | FROZEN | Avoid inconsistent browser state |
| D-010 | FAQ and rating schema share their visible source | FROZEN | Trust and SEO consistency |
| D-011 | Existing Horizon behavior is reused before new code | FROZEN | Performance and maintainability |
| D-012 | Original intake ZIP remains untouched; output is a separate copy | FROZEN | Recovery and provenance |
| D-013 | Intake provenance is metadata-verified Horizon 4.1.1, not upstream-diff-proven pristine Horizon | VERIFIED | The repository has one intake snapshot and no trusted upstream comparison |
| D-014 | Core Horizon events, section rendering, product form, variant state, and AJAX cart flows are protected reuse surfaces | FROZEN | Local dependency tracing shows these systems coordinate multiple commerce consumers |
| D-015 | The current intake repository is the official RELIVANOW project baseline; exact upstream Horizon 4.1.1 comparison is not required before implementation; existing tracked theme files are preserved unless an active task explicitly authorizes modification | FROZEN | Work approved TASK-001 and accepted the audited repository and reuse map |
| D-016 | RELIVANOW design tokens extend Horizon's settings-to-CSS-variable pipeline; the four-slot palette retains canvas, ink, brand, and border while additional semantic roles use additive settings | IMPLEMENTED | Preserves dynamic palette references and merchant state without creating a parallel design system |
| D-017 | TASK-002 design system is approved; browser coverage deferred for reduced motion, sale/rating states, and the full semantic palette moves to TASK-010 | APPROVED | Work accepted the development-theme, responsive, commerce-flow, keyboard/focus, Theme Editor, and static evidence; deferred cases lacked representative data or browser emulation and do not block the design-system gate |
| D-018 | English is the initial primary language; United States, Canada, Australia, Germany, Spain, and Belgium are the six planned Shopify Markets; USD is the base currency | APPROVED | Work supplied the TASK-003 commercial model; local prices/conversion and future translations remain market launch actions |
| D-019 | Cloud White and Graphite are the only confirmed launch colors; Sky Blue is deferred | APPROVED | Supplier confirms white and black only; Sky Blue lacks supplier confirmation, SKU, inventory, price, and media |
| D-020 | Single Bowl is the initial commercial configuration at USD 129; Dual Bowl remains unpublished with a provisional USD 159 price | APPROVED | Dual Bowl lacks a confirmed physical SKU, cost, inventory, media, and supplier availability |
| D-021 | Judge.me is the planned single source for ratings, counts, verified reviews, customer media, and review structured data | APPROVED | Prevents contradictory visible data and duplicate structured data; installation remains separately authorized |
| D-022 | Shopify Bundles is the planned fixed-bundle solution | APPROVED | Preserves native component inventory; bundle products wait for real SKUs and profitability approval |
| D-023 | Every technical claim requires verification status and source; UNVERIFIED facts cannot render publicly | APPROVED | Prevents supplier/reference assumptions from becoming product claims |
| D-024 | Missing metafields/metaobjects degrade gracefully; private definitions and explicit Liquid output allowlists protect procurement/evidence data | APPROVED | Metaobjects have definition-level rather than field-level access, so templates must never serialize governance fields |
| D-025 | Germany and Belgium delivery remains unverified; keep each Market inactive and/or without a shipping zone until operational validation | APPROVED | No supplier delivery times exist, and storefront copy alone cannot enforce checkout eligibility |
| D-026 | USD 99 free shipping, calculated sub-threshold shipping, 30-day returns, and 24-month limited warranty remain provisional | APPROVED | These follow a benchmark commercial pattern but require RELIVANOW operational/legal approval before publication |
| D-027 | Shopify `product.media` is the sole PDP gallery/media source; variant images use native associations and primary images never live in metafields | APPROVED | Preserves Horizon gallery behavior, Shopify CDN, alt text, ordering, and variant synchronization |
| D-028 | TASK-003 produces no media; final original RELIVANOW assets must preserve product geometry and be approved before TASK-004 | APPROVED | Avoids unsupported visual claims, PETLIBRO copying, and supplier URL dependency |
| D-029 | TASK-003 Shopify data model is approved; TASK-004 remains unstarted until final assets, hero/default variant choices, and native media associations are approved | APPROVED | Work approved the documented native ownership, metafields, metaobjects, Markets, reviews, bundles, fallbacks, and media model |

## Pending decisions

- Final manual verification of supplier-asset features, care instructions, material, dimensions, certifications, app compatibility, and portion weight.
- Local fixed prices versus automatic currency conversion for non-USD Markets.
- Operational approval of shipping thresholds, carriers, tracking, taxes/duties, returns, and warranty.
- Germany and Belgium delivery eligibility/timing.
- Real accessory/fountain/Dual Bowl products, SKUs, inventory, compatibility, cost, and bundle profitability.
- Judge.me installation/configuration and structured-data ownership authorization.
- Consumable subscription in V1.
- Financing providers by market.
- Analytics/pixel stack and consent requirements.

Add decisions; do not silently rewrite prior entries. Superseded decisions must point to their replacement.
