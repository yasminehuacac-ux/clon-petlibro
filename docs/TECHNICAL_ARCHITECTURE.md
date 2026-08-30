# Technical architecture

**Status:** Repository-validated static baseline; live Shopify behavior remains unverified.

## Platform

- Shopify Online Store 2.0.
- Horizon 4.1.1 base.
- Shopify Liquid, JSON templates, CSS, and modular JavaScript.
- Shopify CLI and Theme Check are expected release tools but were unavailable in the TASK-001 environment.

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

## Verified Horizon component graph

- `layout/theme.liquid` loads shared styles/scripts, Theme Editor support in design mode, header/footer section groups, and the global cart drawer.
- `config/settings_schema.json` and `config/settings_data.json` feed Liquid/CSS variables through shared style snippets and `assets/base.css`.
- `assets/component.js` supplies the custom-element base and lifecycle cleanup; `assets/events.js` plus Shopify standard events provide shared event contracts.
- `templates/product.json` composes `sections/product-information.liquid`, `_product-media-gallery`, `_product-details`, and product recommendations.
- `assets/variant-picker.js` obtains server-rendered product markup and dispatches product-selection state consumed by gallery, form, price, inventory, SKU, quantity, and sticky-ATC components.
- `assets/product-form.js` submits to Shopify cart routes, requests affected sections, exposes error/live-region states, and synchronizes cart quantities.
- `snippets/cart-drawer.liquid`, `assets/component-cart-items.js`, and `assets/cart-discount.js` use Shopify AJAX cart routes plus section morphing for add, quantity, remove, note, and discount state.
- Header/menu/drawer and predictive search compose `sections/header.liquid`, `_header-menu`, shared drawer/dialog primitives, and Section Rendering requests.
- Product cards, quick add, and recommendations reuse the same product-selection, product-form, and section-rendering architecture.
- `assets/theme-editor.js`, `assets/section-renderer.js`, `assets/section-hydration.js`, and component disconnect handling cover section/block lifecycle and abort stale rendering requests.

## Validated reuse directions

| System | Direction | Verified extension boundary |
|---|---|---|
| Product gallery | Reuse + extend | Preserve one gallery and variant media selection; add styling/settings only before proven behavioral need |
| Product form | Reuse | Preserve standard events, server-rendered state, errors, live regions, and section requests |
| Variant picker | Reuse + style | Preserve option availability and product-selection contract; style via tokens/settings |
| Price/availability/SKU/quantity | Reuse | Keep Shopify/server markup as the source consumed on product selection |
| Sticky ATC | Reuse + extend | Preserve main-form lookup and variant state; later validate safe-area/collision behavior |
| Cart drawer | Extend | Preserve AJAX quantity/remove/discount morphing; compose shipping progress and cross-sells around it |
| Product cards/quick add | Extend | Preserve card gallery, quick-add dialog/form, and standard event path |
| Header/search/footer | Reuse + extend | Preserve header groups, responsive drawer, and predictive Section Rendering; compose visual menu content |
| Slideshow | Reuse | Use existing section/snippet/custom element for campaign and proof carousels |
| Dialog/modal/drawer | Reuse | Use shared focus, open/close, persistence, and lifecycle primitives |
| Reviews | Create provider adapter | Provider remains unknown; keep rating UI/schema from one lazy-loaded source |
| Add-ons/bundles | Compose | Use product forms/lists and metafields after offer and discount rules are approved |
| PDP anchor nav | Create lightweight behavior | No matching native system found; use anchors, sticky offsets, and IntersectionObserver later |

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

## Provenance and protection boundary

- Theme metadata verifies the name Horizon, version 4.1.1, and Shopify authorship.
- Git contains one intake snapshot commit, so upstream equivalence and pre-intake customization history are unknown.
- No RELIVANOW or PETLIBRO strings were found in implementation directories; this supports, but does not prove, a generic intake.
- Treat settings schema/data, layouts, JSON templates and section groups, event/component bases, section renderer/morphing, product form/variant pipeline, and cart mutation code as protected high-risk surfaces.
- Prefer settings and semantic-token changes, existing block composition, and small additive hooks over edits to core event or rendering contracts.
- Static JSON/JSONC parsing succeeded. Theme Check, Shopify authentication, Theme Editor, browser, and live cart/product validation were unavailable.
