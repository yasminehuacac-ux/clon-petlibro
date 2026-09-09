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
