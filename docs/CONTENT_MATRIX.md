# Content matrix

**Status:** Draft. `TBD` values cannot be invented or copied from PETLIBRO.

## Global

| Field | Approved value/status | Owner |
|---|---|---|
| Brand | RELIVANOW | Work |
| Descriptor | Smart Pet Care | Work |
| Main tagline | Smart care for life together. | Work |
| Primary language | TBD | Work |
| Launch markets | TBD | Work |
| Free-shipping threshold | TBD by market | Operations |
| Return window | 30 days, operational confirmation required | Operations |
| Warranty | TBD: 12 or 24 months | Operations |
| Support route | TBD | Operations |

## Product purchase content

| Field | Working value/status |
|---|---|
| Product name | RELIVANOW Smart Automatic Pet Feeder |
| Tagline | TBD final copy |
| Single Bowl price | Working USD 129; confirm in Shopify |
| Dual Bowl price | Working USD 159; confirm in Shopify |
| Cloud White | Confirm physical availability and media |
| Graphite | Confirm physical availability and media |
| Sky Blue | Confirm physical availability and media |
| Key benefits | Draft from verified product functions only |
| Delivery estimate | TBD source and market logic |
| Financing | TBD by market/provider |

## Product facts requiring validation

- Capacity.
- Camera resolution and angle.
- Night vision.
- Meal and portion limits.
- Kibble size.
- Power input and battery backup.
- Wi-Fi bands.
- App/platform compatibility.
- Dimensions and net weight by bowl style.
- Cleaning and material claims.

## Home campaigns

| Module | Content status |
|---|---|
| Hero campaign 1 | TBD |
| Hero campaign 2 | TBD |
| Hero campaign 3 | TBD |
| Categories | Feeders, fountains, accessories; final catalog TBD |
| New & Popular | TBD Shopify product list |
| Promotion/bundle | TBD after margin validation |
| Ecosystem | Draft required |
| Social/UGC | Real approved assets required |
| Press/testimonials | Evidence and usage rights required |
| Manifesto | Draft required |

## Reviews

- Provider: TBD.
- Rating/count source: TBD.
- Verified-buyer policy: TBD.
- Real reviews and media only.
- Stars: `#FF6201`.
- Verified Buyer: `#3897F0`.

## Content incidents

### CONTENT-ALT-001 — Description image alternative text

- **Status:** Open Shopify product-content issue; pending correction by the content owner. Confirmed by static theme tracing during TASK-002 closure on 2026-09-09; does not block TASK-002 and does not start TASK-003.
- **Product:** Portable Pet Water Bottle with Bowl. Product URL/ID and affected image URLs were not supplied.
- **Evidence:** User-supplied external review of development theme `#193260781938` at 1440×900 and 390×844 reports four description images with `alt="undefined"`. Codex did not run that browser review; screenshots and raw HTML were not supplied.
- **Local diagnosis:** `templates/product.json:281` binds the description text block to `closest.product.description`; `snippets/text.liquid:97` outputs that Shopify-managed HTML directly. The formatter only wraps tables and neither constructs image tags nor assigns alt attributes. No theme path was found that manufactures the literal value `undefined` for description images.
- **Pending action — Shopify content owner:** Correct the four affected alt attributes in the saved product description using approved, image-specific text; use an empty alt only for confirmed decorative images. Retest both viewports and preserve all valid existing alts.
- **Changes made:** Tracking only. No remote content edited, no alternative text invented, and no global substitution added. This content correction is pending outside the theme implementation.
