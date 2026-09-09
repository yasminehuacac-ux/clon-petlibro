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

## Pending decisions

- Final verified product specifications.
- Shopify plan, primary language, launch markets, currencies, final prices, and available variants.
- Shipping table and free-shipping threshold.
- Warranty duration.
- Reviews provider.
- Bundle and discount engine.
- Consumable subscription in V1.
- Financing providers by market.
- Delivery-estimate source.
- Analytics/pixel stack and consent requirements.

Add decisions; do not silently rewrite prior entries. Superseded decisions must point to their replacement.
