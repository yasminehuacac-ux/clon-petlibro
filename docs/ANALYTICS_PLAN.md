# Analytics plan

**Status:** Technical foundation validated on development theme `193260781938`; provider stack, consent rules and remote platform configuration are pending.

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

## Theme event foundation â€” TASK-009 checkpoint

The theme does not load an analytics provider. It exposes two layers that future Shopify Customer Events/custom-pixel configuration may map only after consent and provider approval:

1. Horizon/Shopify standard storefront events remain authoritative for page, Product, Variant, collection/search and cart state.
2. `relivanow:analytics` is a provider-neutral DOM hook for interactions that Shopify's current theme event graph does not describe. It does not use cookies, browser storage, network requests, accounts, IDs or tokens.

| Planned event | Theme source | Checkpoint status | Mapping rule |
|---|---|---|---|
| `ViewItem` | `shopify:product:view` with Shopify `standard_event_data` | PARTIAL | Map in an approved pixel; do not emit a second theme Product-view event. |
| `GalleryInteraction` | User-initiated `slideshow:select` and `zoom-media:selected` inside Product media | COVERED | `relivanow:analytics`; allowlisted Product ID, media type/index and interaction type only. |
| `VariantSelected` | `shopify:product:select` plus its resolved Variant promise | PARTIAL | Map only the resolved selection; preserve Shopify amount/currency. |
| `AddOnSelected` | Confirmed eligible add-on checkbox change | COVERED | `relivanow:analytics`; Product ID, add-on Variant ID and boolean selected state only. |
| `BundleSelected` | No approved bundle selector exists | BLOCKED BY BUSINESS DECISION | Add only with a real Shopify Bundle and approved selector. |
| `AddToCart` | `shopify:cart:lines-update` action `add` plus resolved result and `didError=false` | PARTIAL | Map only after the promise resolves successfully; never use button click as success. |
| `CartUpsellAdded` | No cart upsell exists | BLOCKED BY BUSINESS DECISION | Do not fabricate an upsell event or payload. |
| `BeginCheckout` | Shopify Customer Events `checkout_started` | BLOCKED BY EXTERNAL CONFIGURATION | Configure in the approved custom/app pixel, not as an unconfirmed theme click. |
| `Purchase` | Shopify Customer Events checkout-completed event | BLOCKED BY EXTERNAL CONFIGURATION | Shopify checkout/order state is authoritative; never emit Purchase from the theme. |
| `FAQOpened` | Opening a confirmed RELIVANOW FAQ disclosure | COVERED | `relivanow:analytics`; Product ID, FAQ handle/index and category only. |
| `ReviewInteraction` | Judge.me-owned UI | BLOCKED BY EXTERNAL CONFIGURATION | Use approved provider integration; do not scrape or duplicate Judge.me behavior. Authentic populated behavior also remains gated by TASK-007. |

### Payload and privacy boundary

- `relivanow:analytics` accepts only event-specific primitive fields and drops nested/unknown values.
- No email, phone, address, customer/order object, free-form form value or browser identifier is permitted.
- The hook installs once and emits no provider request. Until an approved consent-aware mapping subscribes, it has no external side effect.
- Existing Shopify standard events retain native amount/currency/item semantics; future mapping must use their resolved server state.

### External completion gates

- Approved provider list and account/property IDs.
- Consent platform, legal categories, regional defaults and mode behavior.
- Attribution and server-side/CAPI ownership.
- Search Console and Merchant Center account/domain/feed access.
- Authorized Markets, currency/pricing, locale and domain configuration.
