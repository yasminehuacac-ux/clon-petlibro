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

