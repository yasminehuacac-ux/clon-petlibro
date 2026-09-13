# Technical architecture

**Status:** Repository-validated Horizon baseline with TASK-004 purchase composition in progress; task-specific live commerce evidence remains pending.

## Platform

- Shopify Online Store 2.0.
- Horizon 4.1.1 base.
- Shopify Liquid, JSON templates, CSS, and modular JavaScript.
- Verified Windows AMD64 toolchain: Node.js v24.20.0, Shopify CLI 4.7.0, and operational Shopify Theme Check.
- Live runtime validation is available through an authenticated Shopify development theme, including local preview and Theme Editor access.

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
| Reviews | Create provider adapter | Judge.me is the planned single rating/review/schema source; integration remains separately authorized |
| Add-ons/bundles | Compose | Use native product references, Shopify product forms/lists, and Shopify Bundles after compatibility, inventory, offer, and discount rules are approved |
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

## RELIVANOW shared design-token layer

- `config/settings_schema.json` exposes only semantic colors that cannot be represented by Horizon's four-slot dynamic palette.
- Canvas, ink, brand, and border remain aliases of `settings.color_palette`; warm white, surface, muted, brand hover/soft, success, information/verified, and rating are eight additive merchant settings. Sale reuses Horizon's native `badge_sale_background_color` setting as its single editable source.
- `snippets/theme-styles-variables.liquid` is the single emission point for RELIVANOW semantic aliases, spacing scale, 1440px container target, and 180–240ms motion family. The success token is emitted once in Horizon's existing color group, and rating provides both color and RGB forms for SVG opacity. Under reduced-motion preference, every shared duration changed by TASK-002 is overridden at `:root` to `0.01ms`; transform-based card and variant motion remains gated by `no-preference`.
- Existing Horizon component variables and contrast-resolution snippets remain authoritative for buttons, custom-button hover, focus, inputs, variants, badges, drawers, and popovers. Shared CSS consumes semantic aliases only where controlled markup has a named brand or state role; no speculative global status selectors are introduced.
- No product, cart, section composition, event, ref, or Theme Editor lifecycle contract is changed by TASK-002.

## Performance budget

- One gallery and one variant source in the DOM.
- LCP resource eager/high priority; non-critical media lazy.
- Responsive AVIF/WebP where supported by Shopify CDN.
- Explicit image dimensions.
- Reviews, chat, and non-critical apps deferred.
- Initial custom compressed JS target below 120 KB.

## Shopify data and media layer

- Native Product and Variant fields remain authoritative for title, description, options, SKU, barcode, price, compare-at price, inventory, availability, shipping weight, and variant selection.
- Shopify `product.media` is the only PDP gallery source. Media order, types, alt text, Shopify CDN delivery, and variant featured-media associations remain native; primary media is never duplicated in metafields.
- The `relivanow` namespace stores product-specific structured values. Variant metafields exist only for real SKU differences, and procurement/provenance fields have storefront access disabled.
- Reusable/localizable structures use publishable/translatable metaobjects: feature, specification item/group, FAQ, localized PDP policy summary, market delivery, and bundle offer. Records remain `DRAFT` until confirmed and approved; empty references are skipped cleanly.
- Specification items carry presentation labels and a controlled `value_source`; an explicit renderer allowlist reads authoritative typed product metafields, including paired min/max ranges, instead of duplicating values.
- Native Shopify shipping/refund policies and shipping-rate configuration remain legal/operational sources. Shopify Markets owns catalogs, availability, currency and localization; Judge.me's standard review metafields are the planned single rating source; Shopify Bundles owns exact component-variant quantities, bundle price, and component-derived inventory state.
- Product-level add-on references apply only when compatibility is approved uniformly across both confirmed Single Bowl colors; future bowl-specific compatibility requires an explicit variant relation.
- TASK-003 is approved and documentation-only: it created no definitions, records, products, variants, markets, bundles, app installations, or media.
- TASK-004 uses one Horizon carousel backed only by `product.media`. The first server-selected featured medium is ordered first; if the selected variant has no featured medium, the full general gallery remains visible. Cloud White's default is owned by native first-available variant order, and direct variant URLs remain authoritative.
- The default purchase panel orders Horizon's rating hook, title, price/compare-at, one Variant Picker, one buy-buttons/product form, payment terms/icons and sticky ATC around thin RELIVANOW subtitle, trust, feature, promotion, add-on and delivery blocks. Optional data blocks fail closed publicly and share one `request.design_mode` preview treatment. Variant-specific delivery replaces itself from the same `ProductSelectEvent` response as the native commerce consumers.
- The visual Color UI extends Horizon's existing `variant-picker`, real radio inputs and `swatch` renderer. Resolution is native swatch image, native swatch color, the first valid `strip | handleize` match in Product `relivanow.color_swatches` (metaobject image before color), the currently resolved Variant `relivanow.swatch_color`, a matching typed Theme Editor color, then the neutral pattern. Duplicate Product records do not create duplicate controls; the first valid match wins and the data duplication is an Admin correction. No Variant ID map exists.
- Product `relivanow.color_display_mode` chooses `swatch_only` or `swatch_and_name`; blank/invalid values fall back to Variant Picker `default_color_display_mode`, then `swatch_only`. Both modes keep the same native radio, fieldset/legend, option-value accessible name, unavailable state, focus behavior and `ProductSelectEvent` path. The eight Theme Editor mappings remain template-level legacy fallback, not Product-owned data.
- Options whose names match the Theme Editor Style/Model/Configuration list render as one full-width card per row around those same native radios at every breakpoint. Card state comes from `option_value.variant`; image priority is `relivanow.style_card_image`, native featured media, then a Shopify placeholder. Native price, compare-at, availability, URL replacement, SKU, gallery, form and sticky ATC remain downstream of the one `ProductSelectEvent` path. Distinct physical models remain independent Products, and their related-Product selector also uses one full-width card per row.
- The related-model block is server-only and fail-closed. It reads an ordered `list.product_reference`, requires at least two public references including the current Product, and reads all image/title/URL/availability/price/compare-at state from those native Product objects. No JavaScript, external media URL, or duplicated price state is introduced.
- The native product form keeps one cart request in flight, exposes its pending state through the existing main/sticky button components, validates quantity constraints, and resolves a blank hydrated variant input from the checked native radio. With no add-on selected it retains Horizon's normal single-line request. With approved add-ons selected it sends the main Variant and each unique add-on default Variant as separate items in one Shopify Ajax Cart request, rejects sold-out/disabled cards before submission, reports 422/network errors through the existing live region, and suppresses accelerated checkout until the multi-item selection is cleared. It does not introduce a second cart, variant, price, availability, or inventory state.
- The add-on block reads only `relivanow.add_on_products`. It excludes the parent Product, missing/unconfirmed Products, and any Product that requires Variant choice; native featured media, title, price, compare-at and availability remain authoritative. Optional badge and delivery text use explicit allowlists/status gates. Empty data emits no storefront markup.
- TASK-004 long-form Phase 1 is composed from eight independent OS 2.0 sections after `product-information`. The sections do not nest inside or query the purchase-panel component tree, so gallery, variant, product-form, sticky-ATC, add-on, and Theme Editor block contracts remain unchanged.
- Shared `relivanow-section-header` markup keeps optional headings compact without emitting empty tags. Product Features, Specifications, Box Contents, and FAQ read ordered Product metafield references and explicit public-field allowlists. Trust/two-way/how-it-works manual blocks require `CONFIRMED`; Lifestyle requires at least one Theme Editor image. Invalid sections render only the existing design-mode preview snippet and no public wrapper.
- Specifications dispatch through `relivanow-specification-row` and the documented `value_source` allowlist; arbitrary keys emit no row. FAQ reuses native `details` and the existing accordion custom element, with no new JavaScript and structured data disabled by default. All long-form CSS is section-namespaced and uses Horizon/RELIVANOW tokens.
- TASK-004 long-form Phase 2 adds eight more isolated OS 2.0 sections without entering the Product Information component tree. Precise Feeding reads only the two approved typed min/max pairs or confirmed manual metrics; insights, remote-control benefits, smart-feeding differences, app images and final media are section-owned and explicitly verification-gated.
- Product Comparison filters duplicate or unconfirmed Product picker references, then reads native image, title, URL, price and availability while comparison rows remain confirmed editorial data. Its focusable overflow region has an accessible instruction and a sticky feature column; Style variants remain entirely separate inside the frozen native Variant Picker.
- Reviews / Social Proof captures only native `@app` block output. Empty app output emits no public wrapper, and the section owns no review values or JSON-LD. Judge.me remains the planned single provider after separately authorized installation.
- Final CTA uses the native Product featured image or an approved `image_picker`, optional native Product price output, and no form or Variant ID. A small custom element finds the existing `ProductInformation-*` target, focuses it accessibly and scrolls smoothly only when reduced motion is not requested; the link retains `#MainContent` as its no-script/missing-target fallback.
- TASK-004 closure was validated on unpublished development theme `193260781938` against the current remote Product. The only created definitions are the four typed feeding integers and the box-content text list; their Liquid values drive Precise Feeding and Box Contents. All other long-form adapters retain their existing fail-closed boundaries. Live theme `192527597938` and native commerce/SEO/media ownership were not changed.
- Gallery images retain explicit aspect-ratio sizing; the first medium is eager/high priority and subsequent media are lazy. Native slideshow/zoom focus, keyboard, editor lifecycle, and reduced-motion behavior remain intact.

## Provenance and protection boundary

- Theme metadata verifies the name Horizon, version 4.1.1, and Shopify authorship.
- Git contains one intake snapshot commit, so upstream equivalence and pre-intake customization history are unknown.
- No RELIVANOW or PETLIBRO strings were found in implementation directories; this supports, but does not prove, a generic intake.
- Treat settings schema/data, layouts, JSON templates and section groups, event/component bases, section renderer/morphing, product form/variant pipeline, and cart mutation code as protected high-risk surfaces.
- Prefer settings and semantic-token changes, existing block composition, and small additive hooks over edits to core event or rendering contracts.
- During the historical TASK-001 audit, static JSON/JSONC parsing succeeded while Theme Check, Shopify authentication, Theme Editor, browser, and live cart/product validation were unavailable. Those audit limitations are preserved as historical evidence.
- The environment gate subsequently verified Theme Check, Shopify authentication, a development-theme connection, local preview, and Theme Editor availability. Product/cart behavior still requires task-specific runtime validation.
