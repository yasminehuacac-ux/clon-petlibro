# Shopify data model

**Status:** TASK-003 approved architecture. No remote definitions or records were created.

## Data authority and classification

Every technical or commercial value must carry one of these statuses:

- `CONFIRMED`: supplied and approved as factual.
- `PROVISIONAL`: intentionally modeled but not publishable as a promise until operational or commercial approval.
- `UNVERIFIED`: unsupported or incomplete; never render as a public claim.
- `NOT APPLICABLE`: deliberately absent from this product/model.

`CONFIRMED BY SUPPLIER ASSET` is an evidence qualifier, not a fifth verification enum: store the qualifier in `source_reference` and keep `verification_status=PROVISIONAL` until the manual confirms it. Asset workflow uses its own separate statuses (`EXISTING`, `NEEDS_REDESIGN`, `PENDING`, `APPROVED`) defined in `docs/CONTENT_MATRIX.md`.

Source priority is supplier-confirmed evidence, approved RELIVANOW decisions, Shopify native data, and then original provisional copy. PETLIBRO is a UX/information-architecture benchmark only and is never a source of RELIVANOW facts, media, reviews, or proprietary copy.

## Native Shopify ownership

| Native object | Authoritative fields | Rule |
|---|---|---|
| Product | Title, handle, description, vendor, type/category, status, SEO, tags, collections, `product.media` | Do not duplicate these in metafields. Product descriptions are editorial summaries, not the structured fact store. |
| Variant | Option values, price, compare-at price, SKU, barcode, inventory, packaged shipping weight, availability, featured media | Variant price, inventory, SKU, URL selection, and media association stay native. The supplier's 1,200 g product-weight value is not assumed to be packaged shipping weight. |
| Product media | Gallery files, order, alt text, media type, variant featured-media association | Sole source for the PDP gallery. Do not store primary images in metafields or use permanent supplier URLs. |
| Shopify Markets | Market membership, catalog availability, currency/display pricing, language/domain configuration | No invented converted prices. Decide fixed local pricing versus automatic conversion before launch. |
| Shopify Bundles | Fixed bundle product and component inventory relationships | Create only after every component product/SKU exists and commercial approval is recorded. |
| Judge.me | Average rating, review count, verified reviews, customer photos/videos, review structured data | Planned single review authority. Do not create parallel manual rating/count metafields or duplicate Product review schema. |

## Product metafield definitions

Namespace: `relivanow`. Translatable text uses Shopify's translation workflow; reference fields rely on translations of the referenced record. Definition validations enforce only constraints Shopify can express directly. Cross-field comparisons, evidence review, file MIME checks, policy-kind matching, and "not in the future" checks are procedural validation in the merchant checklist.

The copy examples below are staging values, not live values. A simple text metafield whose row is `PROVISIONAL` or `UNVERIFIED` remains blank in Shopify until that individual value is approved; product-level `relivanow.verification_status` records overall product evidence and is not a substitute for per-value approval.

| Visible name | Namespace and key | Owner | Shopify type | Cardinality | Validation | Feeder example | Source status | Future storefront use | Translatable |
|---|---|---|---|---|---|---|---|---|---|
| Product subtitle | `relivanow.subtitle` | Product | `single_line_text_field` | Single | 1–120 chars | Smart feeding for a more predictable daily routine. | PROVISIONAL | PDP subtitle/cards; keep blank until approved | Yes |
| Short value proposition | `relivanow.short_value_proposition` | Product | `multi_line_text_field` | Single | 1–300 chars | Set 1 to 10 meals a day, choose 1 to 12 portions per meal, and use supported mobile app controls. | PROVISIONAL COPY | PDP purchase summary; keep blank until approved | Yes |
| Key benefits | `relivanow.key_benefits` | Product | `list.metaobject_reference` | List, max 6 | Definition `relivanow_feature`; only ACTIVE, confirmed records | Portion control, app support, dual power | Mixed; per record | Benefit strip/overview | Via records |
| Capacity | `relivanow.capacity` | Product | `volume` | Single | > 0; display unit L | 2 L | CONFIRMED | Specs and comparison | No |
| Net product weight | `relivanow.net_product_weight` | Product | `weight` | Single | > 0; not shipping/package weight | 1,200 g | CONFIRMED supplier product-weight value | Specs | No |
| Wi-Fi band | `relivanow.wifi_band` | Product | `list.single_line_text_field` | List, max 3 | Controlled values; no unsupported band | 2.4 GHz | CONFIRMED | Specs/compatibility | No |
| Generic app support | `relivanow.app_control` | Product | `boolean` | Single | Boolean; does not prove a particular remote feeding/scheduling workflow | true | CONFIRMED | Generic app-support gate | No |
| Suitable pets | `relivanow.suitable_pets` | Product | `list.single_line_text_field` | List, max 4 | Controlled labels | Dogs; Cats | CONFIRMED | Specs/filtering | Yes |
| Meals/day minimum | `relivanow.meals_per_day_min` | Product | `number_integer` | Single | 1–50 | 1 | CONFIRMED | Specs/range sentence | No |
| Meals/day maximum | `relivanow.meals_per_day_max` | Product | `number_integer` | Single | 1–50; ≥ minimum | 10 | CONFIRMED | Specs/range sentence | No |
| Portions/meal minimum | `relivanow.portions_per_meal_min` | Product | `number_integer` | Single | 1–100 | 1 | CONFIRMED | Specs/range sentence | No |
| Portions/meal maximum | `relivanow.portions_per_meal_max` | Product | `number_integer` | Single | 1–100; ≥ minimum | 12 | CONFIRMED | Specs/range sentence | No |
| Construction | `relivanow.construction` | Product | `single_line_text_field` | Single | Controlled approved label | Detachable | CONFIRMED | Specs/care summary | Yes |
| Power source | `relivanow.power_source` | Product | `list.single_line_text_field` | List, max 3 | Approved sources only | Power adapter | CONFIRMED | Specs | Yes |
| Backup power | `relivanow.backup_power` | Product | `single_line_text_field` | Single | No battery-life implication | Three batteries | CONFIRMED | Specs | Yes |
| Box contents | `relivanow.box_contents` | Product | `list.single_line_text_field` | List, max 20 | One item per entry | Pet feeder ×1; Power adapter ×1; Instruction manual ×1 | CONFIRMED | Accessible box-contents list | Yes |
| Care instructions | `relivanow.care_instructions` | Product | `rich_text_field` | Single | Approved manual-based instructions only | [No live value until manual review] | PROVISIONAL | Care section; keep blank until approved | Yes |
| Compatibility notes | `relivanow.compatibility_notes` | Product | `rich_text_field` | Single | Must not imply 5 GHz support | Requires a 2.4 GHz Wi-Fi network for connected controls. | CONFIRMED | PDP compatibility notice | Yes |
| App name | `relivanow.app_name` | Product | `single_line_text_field` | Single | Render only after official-name verification | [No value] | UNVERIFIED | App download module | Yes |
| iOS app link | `relivanow.ios_app_url` | Product | `url` | Single | HTTPS App Store URL; render only after platform verification | [No value] | UNVERIFIED | App download module | No |
| Android app link | `relivanow.android_app_url` | Product | `url` | Single | HTTPS Google Play URL; render only after platform verification | [No value] | UNVERIFIED | App download module | No |
| User manual (English) | `relivanow.user_manual` | Product | `file_reference` | Single | Approved current English PDF; MIME/type checked procedurally | [No file assigned] | UNVERIFIED | English download/support link; omit elsewhere until a localized-file model is approved | No |
| Specification groups | `relivanow.specification_groups` | Product | `list.metaobject_reference` | List, max 12 | Definition `relivanow_specification_group`; ACTIVE records only | Feeding; Connectivity; Power | Mixed; per record | Specs table | Via records |
| Feature references | `relivanow.features` | Product | `list.metaobject_reference` | List, max 12 | Definition `relivanow_feature`; ACTIVE, confirmed records only | Portion range; app support | Mixed; per record | Overview stories | Via records |
| FAQ references | `relivanow.faqs` | Product | `list.metaobject_reference` | List, max 12 | Definition `relivanow_faq`; only approved answers may become ACTIVE | 8 initial FAQs | PROVISIONAL copy | FAQ UI and schema from same list | Via records |
| Shipping policy | `relivanow.shipping_policy` | Product | `metaobject_reference` | Single | Definition `relivanow_policy`; procedural `policy_kind=shipping` check | Free shipping USD 99+ | PROVISIONAL | PDP policy summary | Via record |
| Return policy | `relivanow.return_policy` | Product | `metaobject_reference` | Single | Definition `relivanow_policy`; procedural `policy_kind=return` check | 30-day return window | PROVISIONAL | PDP policy summary | Via record |
| Warranty policy | `relivanow.warranty_policy` | Product | `metaobject_reference` | Single | Definition `relivanow_policy`; procedural `policy_kind=warranty` check | 24-month limited warranty | PROVISIONAL | PDP policy summary | Via record |
| Bundle offers | `relivanow.bundle_offers` | Product | `list.metaobject_reference` | List, max 8 | Definition `relivanow_bundle_offer`; ACTIVE confirmed offers only | Daily Feeding; Complete Feeding | PROVISIONAL | Bundle selector/upsell | Via records |
| Compatible add-ons | `relivanow.compatible_addons` | Product | `list.product_reference` | List, max 12 | Real active products only; every listed product must be approved for all current Single Bowl color variants | [No products linked] | UNVERIFIED | PDP add-ons/cart cross-sell | Product content translates normally |
| Verification status | `relivanow.verification_status` | Product | `single_line_text_field` | Single | Enum: CONFIRMED, PROVISIONAL, UNVERIFIED, NOT APPLICABLE | CONFIRMED | CONFIRMED | Internal overall governance; never use it to approve every field | No |
| Last verification date | `relivanow.last_verification_date` | Product | `date` | Single | ISO date; not future | [Date of evidence review] | UNVERIFIED until entered | Internal governance | No |
| Source reference | `relivanow.source_reference` | Product | `multi_line_text_field` | Single | Internal citation/version; no credentials | [No source revision entered] | UNVERIFIED until entered | Internal provenance | No |

`relivanow.last_verification_date` and `relivanow.source_reference` are admin-only definitions with Storefront API access disabled. `relivanow.verification_status` is also governance data and is never customer-facing. `key_benefits` is an optional ordered subset of the same `relivanow_feature` records linked by `features`; never clone a feature record merely to place it in both lists.

### Required fields deliberately kept native

| Requested concept | Source | Reason |
|---|---|---|
| Packaged shipping weight | Native `Variant.weight` | Shopify owns shipping calculations. Enter it only after the packaged weight is verified for each SKU; do not copy the supplier's 1,200 g net product-weight value into this field automatically. |
| Product/variant media | Native `Product.media` and variant featured media | Preserves Horizon gallery, variant selection, Shopify CDN, alt text, and editor behavior. |
| Price and compare-at price | Native Variant fields | Prevents price divergence and supports Markets/catalogs. |
| Finish display label | Native `Color` option value | `Cloud White` and `Graphite` are already the customer-facing option values; a `finish_display_label` metafield would duplicate them and could drift. |
| Title, handle, description, SKU, barcode, inventory, option values | Native Product/Variant fields | Existing Shopify responsibilities; no duplicate metafields. |

## Variant metafield definitions

These fields exist only when the value genuinely differs by SKU. Internal fields must have storefront access disabled.

| Visible name | Namespace and key | Owner | Shopify type | Cardinality | Validation/example | Source status | Access | Translatable |
|---|---|---|---|---|---|---|---|---|
| Supplier SKU | `relivanow.supplier_sku` | Product variant | `single_line_text_field` | Single | Only when different from native SKU | UNVERIFIED | Internal only | No |
| Supplier cost | `relivanow.supplier_cost` | Product variant | `money` | Single | ≥ 0; procurement currency explicit | UNVERIFIED | Internal only | No |
| Supplier color name | `relivanow.supplier_color_name` | Product variant | `single_line_text_field` | Single | `white` or `black` for confirmed launch colors | CONFIRMED | Internal only | No |
| Bowl configuration status | `relivanow.bowl_configuration_status` | Product variant | `single_line_text_field` | Single | Enum: CONFIRMED, PROVISIONAL, UNVERIFIED, NOT APPLICABLE | Single Bowl: CONFIRMED; Dual Bowl: UNVERIFIED | Internal render gate | No |
| Variant box contents | `relivanow.box_contents_override` | Product variant | `list.single_line_text_field` | List, max 20 | Populate only if contents differ | NOT APPLICABLE until a difference is confirmed | Storefront when approved | Yes |
| Variant delivery note | `relivanow.delivery_note_override` | Product variant | `rich_text_field` | Single | Populate only for a real SKU-specific exception | NOT APPLICABLE until an exception is confirmed | Storefront when approved | Yes |
| Verification status | `relivanow.verification_status` | Product variant | `single_line_text_field` | Single | Controlled status enum | Cloud White/Graphite Single Bowl: CONFIRMED | Internal render gate | No |
| Verification source | `relivanow.verification_source` | Product variant | `multi_line_text_field` | Single | Internal evidence reference; e.g. supplier color sheet with recorded revision | UNVERIFIED until entered | Internal only | No |
| Last verification date | `relivanow.last_verification_date` | Product variant | `date` | Single | ISO date, not future; enter final verification date | UNVERIFIED until entered | Internal only | No |

## Metaobject definitions

All definitions use `access.storefront=NONE`, `capabilities.publishable.enabled=true`, and `capabilities.translatable.enabled=true`. Liquid themes can read referenced entries with storefront access `NONE`; `PUBLIC_READ` is reserved for a future headless Storefront API use case and requires a separate privacy audit. Access is definition-level, not field-level: every field is Liquid-addressable, so TASK-004 must serialize only the explicit public fields named below and never output provenance/governance fields. Only records with `verification_status=CONFIRMED` may be set `ACTIVE`; `PROVISIONAL`, `UNVERIFIED`, and supplier-asset-only records remain `DRAFT`, which resolves to `nil` in Liquid. The merchant-controlled order of product reference lists is authoritative; no duplicate `sort_order` field is used.

### `relivanow_feature`

- Display name: `title`.
- Translation: title, eyebrow, body, accessibility label.
- Public fields: `title` (`single_line_text_field`, required, 1–80 chars); `eyebrow` (`single_line_text_field`, optional); `body` (`rich_text_field`, required); `icon` (`file_reference`, optional); `media` (`file_reference`, optional supporting media only); `accessibility_label` (`single_line_text_field`, optional).
- Governance fields, never serialized: `verification_status` (`single_line_text_field`, required enum); `source_reference` (`multi_line_text_field`, no credentials).
- Product relationship: referenced by `relivanow.key_benefits` and `relivanow.features`.
- Example: “Plan up to 10 meals a day” uses `verification_status=PROVISIONAL` and a `CONFIRMED BY SUPPLIER ASSET` source qualifier until manual review. Anti-stuck mechanism records use the same gate.

### `relivanow_specification` (supporting presentation item)

- Display name: `label`.
- Translation: label and note.
- Public fields: `label` (`single_line_text_field`, required); `value_source` (`single_line_text_field`, required controlled enum from the renderer map below); `note` (`multi_line_text_field`, optional).
- Governance fields, never serialized: `verification_status` (`single_line_text_field`, required enum); `source_reference` (`multi_line_text_field`, no credentials).
- Relationship: referenced only from a `relivanow_specification_group`.
- Example: Capacity / `capacity` / CONFIRMED. The item never stores a second textual value such as "2 L." If a future fact has no typed source mapping, add and approve its typed product metafield and renderer branch first.

#### Specification renderer allowlist

TASK-004 implements an explicit Liquid `case` on `value_source`; arbitrary dynamic keys are rejected. A missing/invalid source yields no row.

| `value_source` | Authoritative field(s) | Output rule |
|---|---|---|
| `capacity` | `relivanow.capacity` | Format Shopify volume in the active locale/unit system |
| `net_product_weight` | `relivanow.net_product_weight` | Format Shopify weight; label it product weight, never shipping weight |
| `wifi_band` | `relivanow.wifi_band` | Join approved text values with localized separators |
| `app_control` | `relivanow.app_control` | Render localized Yes/No only when the boolean exists |
| `suitable_pets` | `relivanow.suitable_pets` | Join translated controlled labels |
| `meals_per_day_range` | `relivanow.meals_per_day_min` + `relivanow.meals_per_day_max` | Render localized `min–max meals per day` only when both integers exist and max ≥ min |
| `portions_per_meal_range` | `relivanow.portions_per_meal_min` + `relivanow.portions_per_meal_max` | Render localized `min–max portions per meal` only when both integers exist and max ≥ min |
| `construction` | `relivanow.construction` | Render translated approved label |
| `power_source` | `relivanow.power_source` | Join translated approved values |
| `backup_power` | `relivanow.backup_power` | Render translated approved label without duration inference |
| `box_contents` | `relivanow.box_contents` | Render as an accessible list, not a comma-flattened spec |

### `relivanow_specification_group`

- Display name: `title`.
- Translation: title and note; child specifications translate independently.
- Public fields: `title` (`single_line_text_field`, required); `items` (`list.metaobject_reference`, required, max 20, definition `relivanow_specification`); `note` (`rich_text_field`, optional).
- Governance fields, never serialized: `verification_status` (`single_line_text_field`, required enum); `source_reference` (`multi_line_text_field`, no credentials).
- Product relationship: referenced by `relivanow.specification_groups`.
- Example: “Feeding” containing Capacity 2 L, Meals/day 1–10, Portions/meal 1–12.

### `relivanow_faq`

- Display name: `question`.
- Translation: question and answer.
- Public fields: `question` (`single_line_text_field`, required, 1–160 chars); `answer` (`rich_text_field`, required); `category` (`single_line_text_field`, controlled).
- Governance fields, never serialized: `verification_status` (`single_line_text_field`, required enum); `source_reference` (`multi_line_text_field`, no credentials).
- Product relationship: referenced by `relivanow.faqs`; the same ordered list must feed visible FAQ and FAQ structured data.
- Example: “Does it support 5 GHz Wi-Fi?” / “No confirmed 5 GHz support is available; use a 2.4 GHz network.” / CONFIRMED for the supported band, without claiming incompatibility beyond evidence.

### `relivanow_policy`

- Display name: `title`.
- Translation: title, summary, body, conditions.
- Public fields: `policy_kind` (`single_line_text_field`, required enum `shipping`, `return`, `warranty`); `title` (`single_line_text_field`, required); `summary` (`multi_line_text_field`, required); `body` (`rich_text_field`, optional); `threshold` (`money`, optional); `duration_value` (`number_integer`, optional, ≥ 0); `duration_unit` (`single_line_text_field`, optional enum `days`, `months`, `years`); `conditions` (`rich_text_field`, optional).
- Governance fields, never serialized: `verification_status` (`single_line_text_field`, required); `effective_date` (`date`, optional); `source_reference` (`multi_line_text_field`, no credentials).
- Product relationship: single references from the applicable product policy fields. Shipping and return records are approved localized PDP summaries only; native `shop.shipping_policy` and `shop.refund_policy` remain the legal sources, and TASK-004 derives their native policy URLs rather than storing a second URL. If the corresponding native policy is absent, omit its link and keep the summary `DRAFT` until legal review. The USD 99 threshold must also match active shipping-rate configuration. Warranty may use the custom record because Shopify has no equivalent native policy object.
- Examples: free shipping from USD 99; return / 30 / days; warranty / 24 / months — all PROVISIONAL, `DRAFT`, and unpublished until operations/legal approval.

### `relivanow_market_delivery`

- Display name: `market_name`.
- Translation: public delivery note and conditions.
- Public fields: `market_name` (`single_line_text_field`, required); `country_code` (`single_line_text_field`, required ISO 3166-1 alpha-2); `min_days` (`number_integer`, optional, ≥ 0); `max_days` (`number_integer`, optional); `shipping_eligible` (`boolean`, required); `delivery_note` (`multi_line_text_field`, optional).
- Governance fields, never serialized: `verification_status` (`single_line_text_field`, required enum); `source_reference` (`multi_line_text_field`, no credentials); `last_verified_at` (`date`). Merchant validation must confirm `max_days >= min_days` and that the date/evidence is current.
- Relationship: use the lower-case ISO country code (`us`, `ca`, `au`, `es`, `de`, `be`) as the metaobject handle. Future Liquid resolves `localization.country.iso_code | downcase` against `metaobjects['relivanow_market_delivery'][handle]`; it renders only an `ACTIVE`, confirmed, eligible record. This is a storefront lookup convention, not a remote Shopify Markets mutation.
- Example: Spain / ES / 6 / 10 / eligible / CONFIRMED.

### `relivanow_bundle_offer`

- Display name: `title`.
- Translation: title, summary, unavailable message.
- Public fields: `title` (`single_line_text_field`, required); `summary` (`multi_line_text_field`, optional); `bundle_variant` (`variant_reference`, required before activation); `merchandising_status` (`single_line_text_field`, required enum `INACTIVE`, `ACTIVE`); `unavailable_message` (`single_line_text_field`, optional).
- Governance fields, never serialized: `verification_status` (`single_line_text_field`, required); `source_reference` (`multi_line_text_field`, no credentials).
- Product relationship: referenced through `relivanow.bundle_offers`. This metaobject is merchandising metadata only. Its exact native bundle parent variant is the sole source for component variant IDs and quantities, sellable price/compare-at price, component-derived availability, and inventory. Planning discount ranges and measurement plans stay in project documentation, not storefront records.
- Example: Daily Feeding / approved native bundle parent variant / ACTIVE / CONFIRMED. Native variant availability always wins; never substitute a different item silently.

## Initial variant model

| Color | Supplier color | Bowl configuration | Price | Publication | Media assignment | Status |
|---|---|---|---:|---|---|---|
| Cloud White | White | Single Bowl | USD 129 | Confirmed model; operationally pending actual SKU/inventory entry | Native variant featured media when approved assets exist | CONFIRMED definition; not yet a launch-ready record |
| Graphite | Black | Single Bowl | USD 129 | Confirmed model; operationally pending actual SKU/inventory entry | Native variant featured media when approved assets exist | CONFIRMED definition; not yet a launch-ready record |
| Sky Blue | Not confirmed | Single Bowl | Not set | Do not create/publish | None | UNVERIFIED |
| Cloud White | White | Dual Bowl | USD 159 | Do not create/publish until physical SKU, cost, inventory, and media are confirmed | None | UNVERIFIED; provisional price |
| Graphite | Black | Dual Bowl | USD 159 | Do not create/publish until physical SKU, cost, inventory, and media are confirmed | None | UNVERIFIED; provisional price |

Initial public Option 1 is `Color` with `Cloud White` and `Graphite`. `Single Bowl` is the only commercial configuration and therefore is not initially exposed as a redundant option.

### Add-on compatibility rule

`relivanow.compatible_addons` is executable only as an approved intersection: each referenced add-on must be compatible with both current Cloud White/Single Bowl and Graphite/Single Bowl variants. Because color does not change compatibility in the confirmed initial model, one product-level ordered list is sufficient and avoids duplicate variant data. Leave it empty until every relationship is approved and the add-on product is active. If a future Bowl Configuration changes compatibility, do not reuse this field ambiguously: introduce an approved relation metaobject containing the exact parent variant references, add-on variant reference, and verification status before exposing the new bowl option.

| Parent variant | Initial compatible-add-on source | Current state |
|---|---|---|
| Cloud White / Single Bowl | Product `relivanow.compatible_addons` | Empty; no approved add-on relationship |
| Graphite / Single Bowl | Product `relivanow.compatible_addons` | Empty; no approved add-on relationship |

### Safe migration to Color + Bowl Configuration

1. Verify Dual Bowl physically and approve its supplier SKU, native Shopify SKU, cost, price, inventory, shipping weight, box contents, media, and claims.
2. Back up/export current product and variant data; record existing variant IDs, URLs, analytics labels, and media assignments.
3. In a development copy first, use Admin GraphQL `productOptionsCreate` to add Option 2 `Bowl Configuration` with first value `Single Bowl` and `variantStrategy: LEAVE_AS_IS`. Verify the resulting payload and record that existing Cloud White and Graphite variant IDs are unchanged before repeating on the production product.
4. After the physical Dual Bowl SKU is confirmed, bulk-create only its approved Cloud White and Graphite variants. Until then, do not create them: Shopify Markets catalog publication is product-level, so an unverified created variant cannot be treated as a safely drafted market-specific record. Never delete and recreate the existing Single Bowl variants merely to reorder options.
5. Associate approved media through native variant featured media/product media; do not use a metafield gallery.
6. Validate direct `?variant=` URLs, option availability, selected media, price, compare-at price, SKU, inventory, quantity, ATC, cart, analytics variant IDs/names, and Markets catalogs.
7. Add Sky Blue later through the same gated process, never in the same migration unless its supplier evidence and assets are independently approved.

## Market model

| Market | Launch status | Initial / future language | Base/display currency | Delivery estimate | Delivery status | Shipping eligibility | Price status | Legal/policy status | Required action |
|---|---|---|---|---|---|---|---|---|---|
| United States | Planned | English / English | USD / USD | 7–15 days | CONFIRMED | Eligible after operations setup | USD 129 Single Bowl CONFIRMED; local setup pending | Policies PROVISIONAL | Validate carrier, tracking, taxes, USD 99 threshold and policy operations |
| Canada | Planned | English / future French decision | USD / CAD decision pending | 8–15 days | CONFIRMED | Eligible after operations setup | No fixed CAD price approved | Policies PROVISIONAL | Decide conversion/fixed CAD price, duties/taxes, carrier and policy operations |
| Australia | Planned | English / English | USD / AUD decision pending | 9–15 days | CONFIRMED | Eligible after operations setup | No fixed AUD price approved | Policies PROVISIONAL | Decide conversion/fixed AUD price, taxes, carrier and policy operations |
| Spain | Planned | English / Spanish | USD / EUR decision pending | 6–10 days | CONFIRMED | Eligible after operations setup | No fixed EUR price approved | Policies PROVISIONAL | Translate, decide EUR pricing, VAT/returns, carrier and policy operations |
| Germany | Hold | English / German | USD / EUR decision pending | Not available | UNVERIFIED | Inactive Market and/or no shipping zone | No fixed EUR price approved | Policies/local legal review pending | Verify supplier, cost, tracking, taxes and delivery before enabling |
| Belgium | Hold | English / future localization UNVERIFIED | USD / EUR decision pending | Not available | UNVERIFIED | Inactive Market and/or no shipping zone | No fixed EUR price approved | Policies/local legal review pending | Choose localization, verify supplier, cost, tracking, taxes and delivery before enabling |

Shopify Markets owns actual catalogs, availability, currencies, domains, and translations. This documentation does not authorize changes to remote Markets.

## Delivery and policy rules

- Confirmed supplier delivery: US 7–15 days; Canada 8–15 days; Australia 9–15 days; Spain 6–10 days.
- Germany and Belgium remain UNVERIFIED. Keep each Market inactive and/or omit its shipping zone until supplier, cost, tracking, tax, and delivery evidence is approved; informational copy is not an enforcement mechanism.
- Free shipping at USD 99+, shipping below USD 99 calculated at checkout, 30-day returns, and a 24-month limited warranty are PROVISIONAL. Do not publish them as promises until operations confirms fulfillment and legal compliance.
- Native Shopify shipping/refund policy pages and shipping-rate configuration are authoritative. `relivanow_policy` supplies only synchronized, localized PDP summaries plus their canonical native-policy link; it must not diverge from the native legal/configured source.

## Reviews authority

- Judge.me is the planned sole future source for average rating, review count, verified reviews, customer media, and review structured data.
- The adapter must read Judge.me's standard `reviews.rating` rating object and `reviews.rating_count` integer. Render only when count is a non-negative integer and rating has numeric `value`, `scale_min`, and `scale_max` with `scale_max > scale_min` and value inside that range; use the supplied scale rather than assuming five. Missing or malformed input hides rating UI/schema. A true zero count may show a neutral no-reviews state without stars or AggregateRating.
- Audit Horizon's existing `product | structured_data` output and Judge.me JSON-LD together. Enable exactly one aggregate-rating/review schema source; visible stars/count and schema must resolve from the same Judge.me values.
- Do not create manual rating or review-count metafields, invent reviews, import PETLIBRO reviews, or enable duplicate Product/review schema.
- Installation and configuration require separate authorization. Until then, review-dependent UI must hide or degrade gracefully.
- If the provider changes, disable Judge.me output and structured data before enabling the replacement; verify a single visible and schema source.

## Bundle model

| Offer | Required products/SKUs | Discount | Availability | Eligibility and missing-component behavior | Measurement |
|---|---|---:|---|---|---|
| Daily Feeding | Feeder + mat | 10% | PROVISIONAL | Activate only with real compatible SKUs; suppress/unavailable if one component lacks inventory | Attach rate, AOV, margin, CVR |
| Complete Feeding | Feeder + bowl set + mat | 12–15% | PROVISIONAL | Requires compatible bowl set and mat; no silent substitution | Attach rate, AOV, gross margin, CPA payback, CVR |
| Smart Care | Feeder + fountain | 15% | PROVISIONAL | Requires approved fountain compatibility and inventory | Attach rate, AOV, margin, repeat purchase, CVR |
| Multi-Pet | Confirmed Dual Bowl feeder + fountain + accessories | 15–18% | UNVERIFIED | Must remain inactive until Dual Bowl and every accessory SKU exist | Attach rate, AOV, margin, CVR by household intent |

Use Shopify Bundles for fixed bundles after product/SKU creation and profitability approval. The documented discount ranges are planning inputs only; the approved native bundle parent variant price and compare-at price become authoritative. Exact component variant IDs and quantities live in Shopify Bundles, while component variants own inventory. No remote bundle products are created by TASK-003.

## Fallback and migration rules

- Native purchase-critical data (selected variant, price, availability, SKU, quantity and media) always uses Horizon's native Shopify path; never substitute metafield placeholders.
- Empty subtitle/value proposition: omit its text block. For every reference list, filter `nil`, `DRAFT`, invalid-status, and unavailable records first; if no renderable records remain, omit the whole section and navigation anchor. Omit a specification group that has no renderable rows. Empty policy reference: omit that policy item. Empty user manual: omit the download link. Never print placeholder labels, `undefined`, blank wrappers, or invented values.
- Empty `product.media`: preserve Horizon's native Theme Editor/design-mode placeholder, but block production publication of the product until at least one approved native medium exists. Never create a metafield or external-URL fallback gallery.
- Reviews without an active Judge.me source: hide rating summary, review count, review list and review structured data together; a neutral “No reviews yet” message is allowed only if Judge.me confirms a real zero count.
- App name/links: omit the entire download module until the official name, platform compatibility, and destination URLs are verified; generic confirmed app-control copy may remain.
- Compatible add-ons: filter unavailable/missing products individually and render the remaining approved list; omit the module only when none remain. A product may enter the list only after compatibility with both confirmed Single Bowl colors is approved. Add-on cards link to the add-on PDP; quick add is allowed only for a single available variant, otherwise require native variant selection. Never infer a variant or hardcode a handle.
- Bundle offers: `INACTIVE`, missing, invalid, or `DRAFT` records are hidden. `ACTIVE` records render from the referenced native bundle variant. If that variant is unavailable, the card may remain visible with a disabled CTA and approved `unavailable_message`; if blank, use Horizon's localized sold-out label. There is no duplicated sold-out enum: native variant/component availability is authoritative.
- Market delivery: missing, `DRAFT`, ineligible, invalid-status, or incomplete min/max records render no delivery estimate. Both bounds are required and must satisfy max ≥ min. Shipping eligibility is enforced by Markets/shipping zones, never inferred from whether copy rendered.
- Status gate: merchant entry is the approval boundary for simple fields—PROVISIONAL/UNVERIFIED values remain blank, and TASK-004 may treat a valid nonblank simple value as approved for rendering. Metaobject records in those states remain `DRAFT`; only confirmed `ACTIVE` records render. Never treat overall product status as approval for a field or referenced record.
- Reference list: preserve merchant order; skip missing/unpublished records without breaking the section.
- Internal data: supplier SKU/cost definitions have Storefront API access disabled. Metaobject governance fields remain Liquid-addressable because Shopify has no field-level visibility, so templates must use an explicit public-field allowlist and never serialize provenance/governance into public HTML or JavaScript.
- Localization: translate existing text/reference records through Shopify; never duplicate metafield definitions per language.
- Future variants: preserve existing variant IDs and native relationships, then validate URLs, media, commerce state, Markets, and analytics.
- Reviews migration: one provider active at a time for UI and structured data.
- Horizon compatibility: use dynamic sources and existing blocks/components; missing data must not require forks of product, variant, gallery, or cart logic.

## Merchant entry order

1. Create definitions in a development store only after Work approval.
2. Create reusable metaobject definitions with Storefront API access `NONE`, publishable/translatable capabilities enabled, then create records as `DRAFT`; set verification/source fields before public copy and activate only confirmed records.
3. Enter native Product and confirmed Single Bowl variants; keep Dual Bowl and Sky Blue absent.
4. Upload approved media to `product.media`, order it, write final alt text, and associate variants natively.
5. Enter simple product/variant metafields; keep internal definitions private.
6. Link feature, specification, FAQ, policy, and approved bundle records. Market delivery uses the country-code handle lookup and is not linked from each product.
7. Configure Markets, translations, Judge.me, and Shopify Bundles only under separate authorization.
8. Test graceful empty states, variant/commerce synchronization, structured data uniqueness, and every market before publication.

## Implementation references

- [Shopify metaobject data modeling and storefront access](https://shopify.dev/docs/apps/build/metaobjects/data-modeling-with-metafields-and-metaobjects)
- [Shopify publishable metaobject capability](https://shopify.dev/docs/apps/build/metaobjects/use-metaobject-capabilities)
- [Shopify product option updates and `LEAVE_AS_IS`](https://shopify.dev/docs/apps/build/product-merchandising/products-and-collections/update-data)
- [Shopify fixed-bundle variant/component model](https://shopify.dev/docs/apps/build/product-merchandising/bundles/add-variant-fixed-bundle)
- [Shopify Markets architecture](https://shopify.dev/docs/apps/build/markets)
- [Judge.me standard review metafields](https://judge.me/help/en/articles/8394936-displaying-product-ratings-and-review-counts-with-judge-me-metafields)
