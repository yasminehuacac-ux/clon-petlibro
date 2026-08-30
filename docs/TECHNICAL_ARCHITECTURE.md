# Technical architecture

**Status:** Initial blueprint; TASK-001 must validate it against the repository.

## Platform

- Shopify Online Store 2.0.
- Horizon 4.1.1 base.
- Shopify Liquid, JSON templates, CSS, and modular JavaScript.
- Shopify CLI and Theme Check in the local developer environment.

## Architectural layers

1. Horizon settings and semantic CSS tokens.
2. Shared primitives: button, icon, badge, price, rating, forms, quantity, modal/drawer.
3. Commerce components: product card, trust item, add-on card, bundle card, specs, FAQ, reviews adapter.
4. Systems: header, search, media gallery, product form, cart drawer, analytics.
5. Thin page sections composed from shared components.
6. JSON templates and Shopify data sources.

## Decision sequence

For every requested feature:

1. Reuse an existing Horizon capability unchanged.
2. Extend it additively through settings, blocks, or small hooks.
3. Compose existing components.
4. Create a new component only after documenting why the prior options fail.

## Initial reuse hypotheses

| System | Initial direction | TASK-001 must verify |
|---|---|---|
| Product gallery | Reuse + extend | Variant media, slideshow, zoom, editor behavior |
| Product form | Reuse | Events, errors, section rendering, quick add |
| Variant picker | Reuse + style | Swatches, option states, event consumers |
| Price/availability/SKU | Reuse | Single source and live updates |
| Sticky ATC | Reuse + extend | Variant synchronization and mobile safe area |
| Cart drawer | Extend | Quantity/remove, discount, shipping progress, cross-sells |
| Product cards | Extend | Badges and quick add |
| Header/search/footer | Reuse + extend | Visual mega-menu and responsive behavior |
| Slideshow | Reuse | Hero and testimonial/press modules |
| Reviews | Provider adapter | Lazy load and rating/schema consistency |
| Add-ons/bundles | Compose | Products/metafields plus approved discount engine |
| PDP anchor nav | New lightweight behavior | Sticky offsets and IntersectionObserver |

## JavaScript boundaries

- No jQuery.
- Prefer native Horizon components and events.
- One behavior module per responsibility, not per page.
- Clean up listeners according to Horizon component lifecycle.
- Support Section Rendering API and Theme Editor reloads.
- Keep commercial data in Shopify/Liquid, not duplicated in browser state.

## CSS boundaries

- Mobile-first styles.
- Existing breakpoint/token pipeline first.
- Semantic component variables.
- No separate desktop and mobile stylesheets.
- Motion only when meaningful and gated by reduced-motion preferences.

## Performance budget

- One gallery and one variant source in the DOM.
- LCP resource eager/high priority; non-critical media lazy.
- Responsive AVIF/WebP where supported by Shopify CDN.
- Explicit image dimensions.
- Reviews, chat, and non-critical apps deferred.
- Initial custom compressed JS target below 120 KB.

## Pending from TASK-001

- Exact Horizon component graph.
- Existing customizations versus pristine 4.1.1.
- Available scripts and versions of local Shopify tooling.
- Actual test/lint/theme-check commands.
- Protected files and extension points.
- Static versus live validation boundaries.

