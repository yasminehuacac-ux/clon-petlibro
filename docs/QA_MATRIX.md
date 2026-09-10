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
- Before TASK-004, confirm all gallery files are approved Shopify `product.media`, have final alt text and responsive crops, preserve physical product geometry, and use native variant associations.
- When adding Bowl Configuration, verify `productOptionsCreate` with first value `Single Bowl` and `LEAVE_AS_IS` preserves existing variant IDs; then regression-test URLs, media, price, SKU, inventory, availability, ATC/cart, Markets, and analytics labels.
- Confirm the English manual link is omitted outside English until a localized-file model is approved; an absent manual must not create a blank link.
