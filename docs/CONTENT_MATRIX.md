# Content matrix

**Status:** TASK-003 model approved. Individual content and media may be published only when their source status and operational gate permit it.

## Global commercial decisions

| Field | Value | Status / owner |
|---|---|---|
| Brand | RELIVANOW | CONFIRMED / Work |
| Descriptor | Smart Pet Care | CONFIRMED / Work |
| Main tagline | Smart care for life together. | CONFIRMED / Work |
| Initial primary language | English | CONFIRMED / Work |
| Planned markets | United States, Canada, Australia, Germany, Spain, Belgium | CONFIRMED plan / Work |
| Base currency | USD | CONFIRMED / Work |
| Free shipping | USD 99 or more | PROVISIONAL / Operations |
| Shipping below threshold | Calculated at checkout | PROVISIONAL / Operations |
| Return window | 30 days | PROVISIONAL / Operations/legal |
| Limited warranty | 24 months | PROVISIONAL / Operations/legal |
| Reviews provider | Judge.me | CONFIRMED direction; installation not authorized |
| Fixed bundles | Shopify Bundles | CONFIRMED direction; products not created |
| Primary product visual | Cloud White | CONFIRMED / Work |
| Default available variant | Cloud White / Single Bowl | CONFIRMED / Work; must be first in Shopify's native variant order when no `?variant=` is requested |

## Product and variant matrix

| Field | Value | Status |
|---|---|---|
| Product title | RELIVANOW Smart Automatic Pet Feeder | CONFIRMED |
| Initial option | Color | CONFIRMED |
| Cloud White | Supplier white; Single Bowl; USD 129 | CONFIRMED launch model |
| Graphite | Supplier black; Single Bowl; USD 129 | CONFIRMED launch model |
| Sky Blue | No supplier confirmation, price, SKU, inventory, or media | UNVERIFIED; do not create or publish |
| Single Bowl | Initial commercial configuration | CONFIRMED |
| Dual Bowl | USD 159 working price; physical SKU, cost, inventory, media, and availability absent | UNVERIFIED with PROVISIONAL price; do not create or publish |

## TASK-004 purchase selectors

| UI content/data | Source | Status / rule |
|---|---|---|
| Choose Color | Theme interface copy above the native `Color` radio group | APPROVED; color names remain available to assistive technology but are not visible inside swatch buttons |
| Product Color swatches | Product `relivanow.color_swatches` → ordered `relivanow_color_swatch` references | PENDING remote definitions/data; per-Product source after native swatch data, matched to the real option value with `strip + handleize`; first valid duplicate wins and duplication is a configuration error |
| Product Color display mode | Product `relivanow.color_display_mode` | PENDING remote definition/data; allowed values `swatch_only` and `swatch_and_name`; blank/invalid falls back to the Variant Picker default, then `swatch_only` |
| Global Color swatch mapping | Eight Theme Editor name/color pairs on Variant Picker | APPROVED legacy fallback only; typed Shopify colors, normalized names, used after native/Product/Variant data |
| White / Cloud White swatch | Native swatch, Product Color Swatch metaobject, Variant `relivanow.swatch_color`, or global fallback | Current template defaults remain `#FFFFFF`; visible gray boundary comes from component styling |
| Black / Graphite swatch | Same priority; global defaults Black `#000000`, Graphite `#323433` | Merchant can configure Product-owned color/image after definitions exist without Liquid/CSS/JavaScript changes |
| Unconfigured Color | No native swatch, valid Product record, Variant color, or matching global mapping | APPROVED fail-safe: neutral diagonal pattern, real value in `aria-label`, visually hidden text and `title` |
| Choose Style cards | Real native option named by the configured Style/Model/Configuration allowlist | APPROVED architecture; one full-width card per row at every breakpoint, each remaining the label for its native radio and reading the currently resolved `option_value.variant` |
| Style card image | Variant `relivanow.style_card_image`, then native `featured_media`, then Shopify placeholder | PENDING optional override; no hardcoded image or external URL |
| Style price and availability | Native resolved Variant | REQUIRED; do not copy into metafields |
| Style badge | Variant `relivanow.style_badge` | PENDING per variant; only Recommended, Coming soon, or Best value after explicit approval |
| Choose Model | Theme Editor heading | APPROVED interface copy |
| Compare all models | Optional Theme Editor link label and destination | PENDING until a real comparison destination is approved |
| Related model cards | `relivanow.related_models` ordered Product references | PENDING remote definition and real product relationships; hide with fewer than two public, CONFIRMED references or when the current product is absent |
| Model badge | Referenced Product `relivanow.model_badge` | PENDING per product; only Recommended, Coming soon, or Best value may render after explicit merchandising approval |

Model cards always read native Product title, URL, featured media, availability, price, and compare-at price. Do not create a card, title, badge, price, or availability state solely to fill the selector. Distinct Wi-Fi, camera, hardware, or bowl models remain separate Products; camera-related cards stay absent until a real product and its supplier-confirmed functions exist.

## TASK-004 purchase-panel content

| Panel item | Authoritative source | Current state / public rule |
|---|---|---|
| Rating and count | Judge.me standard `reviews.rating` and `reviews.rating_count` metafields | BLOCKED BY REMOTE DATA/app installation; public block is absent, editor shows a labelled preview only |
| Product title | Native Product title | IMPLEMENTED and native |
| Product subtitle | Product `relivanow.product_subtitle` | PROVISIONAL copy and no remote definition/value; public block is absent until populated, editor preview only |
| Price / compare-at | Native selected Variant | IMPLEMENTED through Horizon; compare-at BLOCKED BY TEST DATA on the current Product |
| Compact trust badges | CONFIRMED `relivanow_policy` references with matching policy kind | BLOCKED BY REMOTE DATA; no provisional shipping, return, or warranty promise renders publicly |
| Short feature summary | CONFIRMED `relivanow_feature` records from `relivanow.key_benefits` | BLOCKED BY REMOTE DATA; requires at least three valid records, shows at most four |
| Promotional offer | Typed Theme Editor settings on the optional block | IMPLEMENTED, disabled/unconfigured by default; no code, percentage, expiry, or checkout application is assumed |
| Choose Style / Choose Color | Native Product options and Variants | IMPLEMENTED through the already approved Horizon picker; unchanged by purchase-panel completion |
| Choose Add-ons | Product `relivanow.add_on_products` ordered Product references | BLOCKED BY REMOTE DATA; only real CONFIRMED, non-self Products with one default Variant may render; unavailable ones remain disabled |
| Add-on badge | Referenced Product `relivanow.purchase_badge` | PENDING; only Recommended or Best value after explicit approval |
| Add-on delivery note | Referenced default Variant `relivanow.delivery_note_override` with CONFIRMED Variant status | PENDING; blank/unverified values omit |
| Quantity, Add to Cart, dynamic checkout/payment terms | Native Horizon product form | IMPLEMENTED; selected add-ons submit as separate real line items in one guarded cart request, and accelerated checkout hides while add-ons are selected because it cannot preserve that multi-item intent |
| Delivery | Existing confirmed market/Variant delivery sources | IMPLEMENTED fail-closed; Germany and Belgium remain absent |
| Payment/security icons | Native enabled Shopify payment types | IMPLEMENTED and native |
| Missing-data editor treatment | `request.design_mode` only | IMPLEMENTED; shared label is “Preview only — configure product data” and never renders in public storefront HTML |

The current default purchase-panel order is rating, title, subtitle, price, trust badges, feature summary, promotion, the single native Style/Color picker, add-ons, the native quantity/ATC/accelerated-checkout group, delivery, and payment icons. The grouped heading blocks, one Variant Picker, and one buy-buttons/product-form block remain technical composition units; merchant reordering does not split those single-source contracts.

## TASK-004 long-form Phase 1

| Section | Authoritative source | Public gate |
|---|---|---|
| Trust / Benefits Bar | Confirmed Product policy references or manual section blocks explicitly marked `CONFIRMED` | Up to four complete items; provisional policies and blank manual content are omitted |
| Two Ways to Feed | Two Theme Editor cards with per-card verification plus an approved main image | Requires exactly two confirmed cards, heading, and image; scheduling/app workflow remains hidden while provisional |
| Product Features | Product `relivanow.features` → `relivanow_feature` | Requires at least three confirmed records with title/body; shows at most six; optional media/link only from allowlisted public fields |
| How It Works | Three or four Theme Editor step blocks with per-step verification | Only confirmed complete steps render; current four staging steps remain `PROVISIONAL` pending workflow/manual approval |
| Lifestyle / Product in Use | One or two Theme Editor `image_picker` assets plus optional copy/CTA | No image means no public wrapper; editor only shows source guidance; no external URL fallback |
| Product Specifications | Product `relivanow.specification_groups` and typed allowlisted Product metafields | Confirmed groups/items only; missing values and empty groups disappear; net weight is labelled separately from shipping weight |
| What’s in the Box | Confirmed `relivanow.box_items`; fallback to confirmed `relivanow.box_contents` text list | Never merges sources; no batteries, cable, extra bowl, fountain, or accessory is inferred |
| FAQ | Product `relivanow.faqs` → `relivanow_faq` | Requires 6–10 confirmed complete records; FAQ schema is disabled by default to avoid future provider duplication |

All headings, editor copy, and layout settings are original RELIVANOW interface content. The public storefront receives no preview placeholders, provisional claims, empty headings, or empty section spacing.

## TASK-004 long-form Phase 2

| Section | Authoritative source | Public gate |
|---|---|---|
| Precise Feeding | Product `relivanow.meals_per_day_min/max`, `relivanow.portions_per_meal_min/max`, or an explicitly confirmed manual metric | Requires a heading and 2–4 complete confirmed metrics; no gram, percentage, food-level, or remaining-amount output exists |
| Feeding Insights | Theme Editor image and insight blocks | Requires a confirmed approved image plus 2–4 complete blocks explicitly marked `CONFIRMED`; otherwise only the Theme Editor explains that verified insight data is missing |
| Remote Control | Theme Editor product/app images and benefit blocks | Requires a confirmed product image and 2–4 confirmed benefits; an app image renders only when separately confirmed, so no interface is synthesized |
| Product Comparison | Two to four distinct Product pickers plus verified row blocks | Both the relation block and referenced Product must be `CONFIRMED`; native Product image, URL, price and availability are read directly; at least one confirmed row is required |
| Why Choose Smart Feeding | Theme Editor comparison row blocks | Requires 3–6 complete `CONFIRMED` rows; all traditional/RELIVANOW values are editorial evidence-gated and no competitor is named |
| App Experience | One to three Theme Editor screenshot blocks | Requires a heading and at least one image block explicitly marked `CONFIRMED`; cards are CSS-only and no unsupported interface or platform claim is generated |
| Reviews / Social Proof | Native Shopify theme app blocks | Requires rendered `@app` content; intended for Judge.me after separate installation authorization; no manual reviews, rating data, customer media, or review schema are created |
| Final CTA | Approved native Product featured image or approved Theme Editor image plus section copy | Requires explicit image confirmation, heading, brief benefit and honest CTA label; optional price uses native Product output; the CTA returns to the purchase panel and never submits a form |

All Phase 2 defaults are claim-safe and fail closed. Only the two typed Precise Feeding metric blocks start with `CONFIRMED` status, and they still render nothing until their complete Product min/max pairs exist. Sections dependent on app/insight/review/comparison/final media have no publishable default records or images.

## Confirmed supplier facts

| Fact | Value | Status |
|---|---|---|
| Capacity | 2 L | CONFIRMED |
| Net product weight | 1,200 g | CONFIRMED supplier value; do not treat as packaged shipping weight without SKU-level evidence |
| Connectivity | Wi-Fi enabled | CONFIRMED |
| Supported band | 2.4 GHz | CONFIRMED |
| Control | Generic mobile app connection/support | CONFIRMED; this does not independently confirm a specific remote feeding or scheduling workflow |
| Suitable pets | Dogs and cats | CONFIRMED |
| Construction | Detachable | CONFIRMED |
| Feeding frequency | 1–10 meals per day | CONFIRMED |
| Portion control | 1–12 portions per meal | CONFIRMED; grams per portion UNVERIFIED |
| Primary power | Power adapter | CONFIRMED |
| Backup power | Three batteries | CONFIRMED; battery duration UNVERIFIED |
| Supplier colors | White and black | CONFIRMED |
| Box contents | Pet feeder ×1; power adapter ×1; instruction manual ×1 | CONFIRMED |
| Scheduled feeding | Shown in supplier asset | PROVISIONAL publication status; evidence qualifier CONFIRMED BY SUPPLIER ASSET; manual review required |
| Remote feeding/scheduling workflow in the app | Shown in supplier asset | PROVISIONAL publication status; evidence qualifier CONFIRMED BY SUPPLIER ASSET; manual review required |
| Anti-tamper/anti-drop lid lock | Shown in supplier asset | PROVISIONAL publication status; evidence qualifier CONFIRMED BY SUPPLIER ASSET; manual review required |
| Anti-stuck grain mechanism | Shown in supplier asset | PROVISIONAL publication status; evidence qualifier CONFIRMED BY SUPPLIER ASSET; manual review required |
| Voice/intercom-related marketing | Shown in supplier asset | PROVISIONAL publication status; evidence qualifier CONFIRMED BY SUPPLIER ASSET; exact capability/copy requires manual review |

## Unverified technical claims

These claims are not public copy and must not appear in media, alt text, PDP content, schema, filters, comparisons, or FAQs until verified:

- Integrated camera, camera resolution, night vision, video recording, or cloud storage.
- AI detection or individual pet recognition.
- Permanent two-way microphone/intercom capability.
- 5 GHz Wi-Fi compatibility.
- Exact grams per portion.
- Physical dimensions or exact material.
- Electrical or food-contact certifications.
- Official app name or exact iOS/Android compatibility.
- Battery runtime.
- Dual Bowl availability as a real SKU.

The supplier PDF's generic reference to “video models” does not establish that this selected SKU includes a camera.

## Initial English content

All copy below is original RELIVANOW staging copy. It remains in documentation until the individual value is approved; PROVISIONAL text is not entered or published merely because the overall product is confirmed.

### Product title

RELIVANOW Smart Automatic Pet Feeder

### Subtitle

Smart feeding for a more predictable daily routine.

**Status:** PROVISIONAL COPY based only on confirmed functions.

### Short value proposition

Set 1 to 10 meals a day, choose 1 to 12 portions per meal, and use supported mobile app controls.

**Status:** PROVISIONAL COPY based only on the CONFIRMED meal/portion ranges and generic app support; it does not claim a specific remote scheduling workflow.

### Key benefits

1. Set from 1 to 10 meals each day.
2. Choose from 1 to 12 portions per meal.
3. Manage feeding with supported mobile app controls.
4. Connect through a 2.4 GHz Wi-Fi network.
5. Keep a backup power option ready with three batteries.
6. Detachable construction supports easier routine care.

**Status:** PROVISIONAL COPY based only on CONFIRMED meal, portion, app, Wi-Fi, power, and construction values. Do not infer a specific remote scheduling workflow, grams, battery duration, or app platform compatibility.

### Technical summary

A 2 L automatic feeder for cats and dogs with 2.4 GHz Wi-Fi connectivity, generic mobile app support, 1 to 10 meals per day, 1 to 12 portions per meal, detachable construction, adapter power, and a three-battery backup option.

**Status:** PROVISIONAL COPY based only on CONFIRMED facts.

### Box contents

- Pet feeder ×1
- Power adapter ×1
- Instruction manual ×1

**Status:** CONFIRMED.

### Care note

Disconnect the feeder from power and follow the supplied instruction manual before cleaning detachable parts. Do not immerse powered components.

**Status:** PROVISIONAL; final wording requires manual and safety review.

### Initial FAQs

| Question | Answer | Status |
|---|---|---|
| How many meals can I set each day? | The feeder supports from 1 to 10 meals per day. | PROVISIONAL COPY / CONFIRMED range |
| How many portions can I set for each meal? | You can select from 1 to 12 portions per meal. The exact weight of each portion has not yet been verified. | PROVISIONAL COPY / CONFIRMED range |
| Which Wi-Fi band does the feeder support? | The confirmed supported band is 2.4 GHz. No 5 GHz support claim is currently approved. | PROVISIONAL COPY / CONFIRMED band |
| Does the feeder support a mobile app? | Yes. Generic mobile app support is confirmed. The official app name, platform requirements, and exact remote feeding workflow will be added only after verification. | PROVISIONAL COPY / CONFIRMED generic app support |
| Is it suitable for cats and dogs? | Yes. The supplier identifies the feeder as suitable for both cats and dogs. | PROVISIONAL COPY / CONFIRMED fact |
| How is the feeder powered? | Primary power is supplied through the included adapter, with a backup option using three batteries. Battery runtime has not been verified. | PROVISIONAL COPY / CONFIRMED sources |
| What is included in the box? | The box includes one pet feeder, one power adapter, and one instruction manual. | PROVISIONAL COPY / CONFIRMED contents |
| How should I clean it? | Disconnect power and follow the instruction manual before cleaning detachable parts. Final care instructions will be confirmed against the approved manual. | PROVISIONAL |

## Product media manifest

### Gallery authority and production rules

- Shopify `product.media` is the sole native source for PDP gallery files, ordering, alt text, and media types.
- TASK-003 created no images, edited no images, uploaded no media, and changed no remote Shopify content. TASK-004 likewise does not upload or alter remote media under its current authorization.
- Primary product images must not be stored in metafields. TASK-004 must consume `product.media` and native variant featured-media associations.
- Do not retain permanent external supplier URLs. Final approved masters are uploaded to Shopify and served through the Shopify CDN.
- Do not download or copy PETLIBRO media. PETLIBRO may inform layout rhythm only.
- Product geometry must remain exact: do not alter the body shape, buttons, lid, dispenser, or bowl.
- No media is assigned to Sky Blue or Dual Bowl until those physical variants and their assets are verified.
- Five Cloud White files have approved visual direction; three handoff files remain provisional. A dedicated cat-lifestyle PDP file and final Cloud White/Graphite comparison remain pending.
- Logical media IDs are planning/QA identifiers, not a parallel runtime taxonomy. TASK-004 reads native gallery order and media type; variant selection jumps to native featured media and does not filter the remaining gallery by color.
- Work selected Cloud White as the leading hero color and default available variant. Shopify's native variant order must place Cloud White first, and `01-pdp-product-cloud-white.png` is intended as its featured media after a separately authorized upload. Neutral/shared files remain unassigned gallery media.
- Graphite remains selectable even without a final gallery. With no Graphite featured-media association, Horizon falls back to the complete general `product.media` gallery; it must not hide or disable the variant.
- Asset workflow status is separate from technical verification: `EXISTING` means a source asset is available for assessment, `NEEDS_REDESIGN` requires original RELIVANOW production/redesign, `PENDING` has no review-ready final, and `APPROVED` has passed rights, geometry, claims, alt, crop, and Shopify-upload review. `APPROVED VISUAL` is narrower: Work approved the named visual direction, but final alt, Shopify upload, and native association remain outstanding.

| Logical media ID | Gallery position | Type | Related variant | Related color | Desktop/mobile requirement | Recommended aspect ratio | Provisional English alt text | Source | Status | Technical data allowed / gate | Claims prohibited while UNVERIFIED |
|---|---:|---|---|---|---|---|---|---|---|---|---|
| `FEEDER-MEDIA-01` | 1 | hero / product | Single Bowl only | Cloud White | One high-resolution square master; product fully visible on desktop and 390px mobile | 1:1 | Cloud White RELIVANOW automatic pet feeder with a single bowl | `01-pdp-product-cloud-white.png`; external RELIVANOW handoff | APPROVED VISUAL | Physical product appearance; 2 L only if added as HTML, not baked-in text | Camera, dimensions, material, certifications, Dual Bowl, Sky Blue |
| `FEEDER-MEDIA-02` | 2 | lifestyle | Single Bowl only | Use photographed confirmed color | Independent mobile-safe crop; cat and feeder unobstructed | 4:5 | Cat beside the RELIVANOW automatic pet feeder at home | Original licensed RELIVANOW lifestyle shoot | PENDING | Suitable for cats; physical use context | Health outcomes, pet recognition, camera/AI monitoring, exact portion grams |
| `FEEDER-MEDIA-03` | 3 | lifestyle | Single Bowl only | Cloud White | Square mobile-safe crop; dog and feeder unobstructed | 1:1 | Dog eating beside the Cloud White RELIVANOW automatic pet feeder | `04-pdp-dog-lifestyle-cloud-white.png`; external RELIVANOW handoff | APPROVED VISUAL | Suitable for dogs; physical use context | Health outcomes, pet recognition, camera/AI monitoring, exact portion grams |
| `FEEDER-MEDIA-04` | 4 | feature | Single Bowl | Cloud White | Legible UI composition on desktop and mobile; keep explanatory text in HTML where possible | 1:1 | Conceptual mobile feeding schedule beside the Cloud White RELIVANOW pet feeder | `06-pdp-app-scheduling-cloud-white.png`; external RELIVANOW handoff | PROVISIONAL | Generic app support only until the official interface and workflow are verified | Official app name/interface, iOS/Android versions, 5 GHz, exact grams, camera/cloud/AI |
| `FEEDER-MEDIA-05` | 5 | product detail; future technical feature | Single Bowl | Cloud White | Detail remains understandable at mobile width; provide descriptive alt | 1:1 | Detail of the Cloud White RELIVANOW automatic pet feeder and single bowl | `05-pdp-product-detail-cloud-white.png`; external RELIVANOW handoff | APPROVED VISUAL | Physical appearance only; a separate verified view is required before presenting an anti-stuck or secure-lid mechanism | Safety guarantees, jam-free absolute claims, material/certification claims, camera capability, altered geometry |
| `FEEDER-MEDIA-06` | 6 | technical / feature | Single Bowl | Cloud White | Desktop/mobile readable power composition; no battery-duration badge | 1:1 | Power adapter and three-battery backup shown beside the feeder | `07-pdp-dual-power-provisional.png`; external RELIVANOW handoff | PROVISIONAL | Power adapter and three-battery backup only after adapter/market and battery-type verification | Battery runtime, uninterrupted-service guarantees, unverified battery type, certifications |
| `FEEDER-MEDIA-07` | 7 | box contents | Single Bowl | Cloud White | All included items visible at mobile width; labels remain HTML if possible | 1:1 | Cloud White pet feeder, power adapter, and instruction manual | `08-pdp-box-contents-provisional.png`; external RELIVANOW handoff | PROVISIONAL | Feeder ×1; adapter ×1; manual ×1 after real accessory appearance is verified | Extra accessories, batteries included, Dual Bowl parts, unverified materials |
| `FEEDER-MEDIA-08` | 8 | product / technical comparison | Single Bowl | Cloud White and Graphite only | Side-by-side composition with mobile stack-safe crop; equal scale and lighting | 4:5 | Cloud White and Graphite RELIVANOW automatic pet feeders | No final handoff file; original RELIVANOW production still required | PENDING | Confirmed white/black finishes presented as Cloud White/Graphite | Sky Blue, Dual Bowl, color-dependent technical differences not verified |

No row has final `APPROVED` publication status yet. The three `APPROVED VISUAL` PDP rows still require final alt text, authorized Shopify upload, and native association. The visible lens-like detail in the handoff is not evidence for camera, recording, night vision, cloud, AI, or recognition claims.

## Delivery by market

| Market | Estimate | Status | Publication rule |
|---|---|---|---|
| United States | 7–15 days | CONFIRMED supplier estimate | Publish only after carrier/tracking/operations validation |
| Canada | 8–15 days | CONFIRMED supplier estimate | Publish only after carrier/duties/operations validation |
| Australia | 9–15 days | CONFIRMED supplier estimate | Publish only after carrier/tax/operations validation |
| Spain | 6–10 days | CONFIRMED supplier estimate | Publish only after carrier/VAT/operations validation |
| Germany | No estimate | UNVERIFIED | Keep the Market inactive and/or omit its shipping zone |
| Belgium | No estimate | UNVERIFIED | Keep the Market inactive and/or omit its shipping zone |

## Reviews

- Judge.me is the planned single future source for average rating, review count, verified reviews, customer photos/videos, and review structured data.
- The future adapter must consume Judge.me's standard `reviews.rating` and `reviews.rating_count` inputs and ensure Horizon/Judge.me emit only one aggregate-rating schema source.
- Do not create manual rating/count fields, invent reviews, import PETLIBRO reviews, or run two Product review schema sources.
- Integration remains pending a separately authorized installation/configuration.
- Stars use the approved RELIVANOW rating token; verified-buyer presentation uses the approved information token.

## TASK-004 closure data — 2026-09-12

- Remotely configured from confirmed evidence only: 1–10 meals/day, 1–12 portions/meal, Pet feeder ×1, Power adapter ×1, and Instruction manual ×1.
- Precise Feeding and What’s in the Box are the only long-form modules now eligible to render for the current Product.
- No approved asset binary was present in the workspace or attachment handoff. No image was uploaded, no provisional asset was promoted, and every image-dependent module remains fail-closed.
- The existing supplier description and media were preserved but were not treated as approved claim or asset sources.

## Bundle offers

| Offer | Components | Discount | Status |
|---|---|---:|---|
| Daily Feeding | Feeder + mat | 10% | PROVISIONAL |
| Complete Feeding | Feeder + bowl set + mat | 12–15% | PROVISIONAL |
| Smart Care | Feeder + fountain | 15% | PROVISIONAL |
| Multi-Pet | Dual feeder + fountain + accessories | 15–18% | UNVERIFIED because Dual Bowl is unverified |

All component variant IDs/quantities, compatibility, inventory, margin, CPA, AOV, and profitability must be validated before creating or publishing a Shopify Bundle. The native bundle parent variant owns the final price and exact components; component variants own inventory. Discount ranges here are planning values only.

## Content incident carried forward

### CONTENT-ALT-001 — Description image alternative text

- **Status:** Open Shopify product-content issue; pending correction by the content owner. It does not block TASK-002 or authorize TASK-004.
- **Product:** Portable Pet Water Bottle with Bowl. Four description images were externally reported with `alt="undefined"`.
- **Diagnosis:** The theme outputs Shopify-managed `product.description` HTML directly and does not manufacture image alt attributes.
- **Action:** Correct only the four affected saved description alts with approved image-specific text; use an empty alt only for decorative images. No global theme substitution or invented alt text.
