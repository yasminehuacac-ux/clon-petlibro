# Shopify data model

**Status:** Draft. TASK-003 will validate and implement definitions after TASK-001/002.

## Native Shopify objects

| Object | Source-of-truth fields |
|---|---|
| Product | Title, vendor, type, description, media, SEO, availability |
| Variant | Style, color, SKU, barcode, price, compare-at price, inventory, featured media |
| Product list | Add-ons, bundle products, related products |
| Menu | Header, mega-menu, support, footer navigation |
| Markets | Currency, locale, domain, catalog, regional availability |

## Proposed product metafields

| Namespace/key | Type | Purpose |
|---|---|---|
| `custom.tagline` | Single-line text | PDP subtitle |
| `custom.key_benefits` | Metaobject list | Compact benefit items |
| `custom.specifications` | Metaobject list | Accessible grouped specs |
| `custom.compatible_addons` | Product list | Compatible accessories |
| `custom.bundle_products` | Product list | Bundle candidates |
| `custom.delivery_note` | Rich text | Product-specific delivery message |
| `custom.feature_stories` | Metaobject list | PDP Overview content |
| `custom.installation_video` | File or URL | Installation tutorial |
| `custom.faqs` | Metaobject list | Visible FAQ and JSON-LD |
| `custom.app_links` | Metaobject reference | iOS/Android app links |

## Proposed metaobjects

### `key_benefit`

- icon;
- title;
- text;
- accessibility label;
- sort order if required.

### `specification`

- group;
- label;
- value;
- note;
- sort order.

### `feature_story`

- eyebrow;
- heading;
- body;
- desktop media;
- mobile media;
- layout;
- theme/color scheme;
- optional CTA label/link.

### `faq_item`

- question;
- answer;
- category;
- sort order.

### `app_links`

- app name;
- app icon;
- Apple App Store URL;
- Google Play URL;
- optional QR image.

## Integrity rules

- Never hardcode variant IDs, prices, SKU, inventory, or availability in section settings.
- Use `featured_media`/product media relationships for variant galleries.
- FAQ UI and FAQ schema must iterate the same records.
- Rating UI and Product structured data must use the same approved provider.
- Add-ons and bundle products must be genuine Shopify products.
- Do not create definitions until field names, ownership, localization, and migration impact are approved.

