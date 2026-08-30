# Analytics plan

**Status:** Draft; provider stack and consent rules are pending.

## Event taxonomy

| Event | Trigger | Required context |
|---|---|---|
| `ViewItem` | Meaningful PDP view | product, variant, price, currency |
| `GalleryInteraction` | Swipe, thumbnail, zoom, video | product, media type/index |
| `VariantSelected` | Valid option change | product, prior/new variant, option values |
| `AddOnSelected` | Add-on selection change | main product, add-on, selected state |
| `BundleSelected` | Bundle selection change | main product, bundle products, value |
| `AddToCart` | Confirmed cart add | product, variant, qty, value, add-ons |
| `CartUpsellAdded` | Confirmed drawer upsell | source, product, variant, value |
| `BeginCheckout` | Checkout CTA | cart value, currency, item count |
| `Purchase` | Shopify-approved purchase event | order, value, currency, items |
| `FAQOpened` | FAQ disclosure opened | product, FAQ ID/category |
| `ReviewInteraction` | Review filter/open/media | product, interaction type |

## Rules

- One semantic event per user action; no double firing across theme/app/pixel.
- Fire commerce success events only after Shopify confirms the operation.
- Do not expose personal data in event payloads.
- Respect consent and market requirements before loading non-essential trackers.
- Prefer Shopify Customer Events/custom pixels where appropriate.
- Keep provider mapping separate from semantic theme events.

## KPIs

- PDP Add-to-Cart rate.
- Checkout initiated / Add to Cart.
- Purchase CVR.
- AOV.
- Add-on and bundle attach rate.
- Cart upsell take rate.
- Refund rate.
- ROAS, CPA, CTR by campaign and creative in the marketing stack.

## Pending decisions

- GA4, Meta, TikTok, Clarity, Google Ads, Bing, or other providers.
- Consent platform/mode.
- Attribution conventions.
- Server-side/CAPI ownership.
- Market-specific restrictions.

