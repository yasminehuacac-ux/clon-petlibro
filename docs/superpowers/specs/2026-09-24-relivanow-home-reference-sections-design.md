# RELIVANOW Home Reference Sections Design

**Date:** 2026-09-24

**Status:** Approved for Phase 1 implementation

**Source references:** `RELIVANOW_SECTION_SPECS_MINUCIOSAS.md` and `RELIVANOW_SECTION_REFERENCES.pdf` (local-only, never committed)

## Objective

Add nine opt-in Home experiences that reproduce the information architecture, proportions, interaction patterns, and responsive behavior described by the supplied references without importing third-party brands, campaigns, claims, people, reviews, media, or commercial copy.

The approved Home remains the production-safe default. Every new template instance is appended to `templates/index.json` with `"disabled": true`, so this phase changes no live storefront output until a merchant deliberately configures and enables an instance.

## Approved architecture

Use a hybrid native-first approach:

1. Build eight focused RELIVANOW sections for the patterns that do not have a safe native equivalent.
2. Use the existing native `collection-list` section for the category-carousel instance without changing its implementation.
3. Reuse the theme's slideshow primitives where they provide accessible controls and editor behavior.
4. Extend `assets/marquee.js` only through opt-in data attributes. Existing marquee instances must retain their current speed and hover behavior byte-for-behavior at runtime.
5. Keep new JavaScript limited to the marquee opt-in branch, countdown lifecycle, and accessible video-card playback.

## Nine Home instances

| # | Template ID | Section type | Responsibility |
|---|---|---|---|
| 1 | `reference_promotion_marquee` | `relivanow-promotion-marquee` | Direction, speed, responsive gap, colors, padding, links, optional hover pause |
| 2 | `reference_video_slideshow` | `relivanow-video-slideshow` | Up to four confirmed Shopify/external videos with responsive poster media and linear pagination |
| 3 | `reference_image_gallery` | `relivanow-image-gallery` | 3:4 editorial cards, five-up desktop rail, two-up mobile rail, optional hover image |
| 4 | `reference_campaign_grid` | `relivanow-campaign-grid` | Confirmed campaign heading, future countdown, and four configurable media cards |
| 5 | `reference_category_carousel` | `collection-list` | Native collection carousel configured for five desktop and roughly two mobile cards |
| 6 | `reference_community_videos` | `relivanow-community-videos` | Confirmed community video cards; no default review or UGC claims |
| 7 | `reference_expert_cards` | `relivanow-expert-cards` | Confirmed expert identity and media cards; no default endorsement claims |
| 8 | `reference_trending_grid` | `relivanow-trending-grid` | Up to sixteen real Shopify products or collections, eight columns desktop and three mobile |
| 9 | `reference_product_offers` | `relivanow-product-offers` | Confirmed campaign tile plus real Shopify products and native price data |

## Content integrity and fail-closed rules

- No invented campaign, discount, deadline, expert, UGC, review, claim, product fact, or commercial copy may ship as a default.
- Sections 4, 6, and 7 render no public wrapper until all section-level required fields and the minimum viable number of confirmed blocks are present.
- Confirmation status uses the existing exact `CONFIRMED` convention.
- Design mode may display clearly labeled configuration guidance that is never emitted on the public storefront.
- Product and collection titles, images, URLs, prices, and compare-at prices come from native Shopify objects.
- Custom offer labels render only when that label is separately marked `CONFIRMED`.
- Expired, blank, or malformed campaign deadlines produce no countdown and keep the campaign section closed.

## Existing-instance compatibility

- `sections/collection-list.liquid` is not modified.
- Existing `marquee.liquid` markup does not gain new required settings or attributes.
- `assets/marquee.js` keeps the legacy path as the default when new opt-in attributes are absent.
- No approved Home section is removed, reordered, disabled, or reconfigured.
- The existing Home hero remains the sole active H1 owner. New video-slideshow headings default to `h2` and expose an explicit heading-level choice for a future editor configuration where the current hero is disabled.

## Responsive and accessibility contract

- Validate at 1440×900, 1024×768, 768×1024, 390×844, and 360×800.
- Controls must be real buttons or links with accessible names, visible focus, and no duplicate DOM IDs.
- Decorative images use empty alt text; content images require an editor-supplied alt or fall back to their linked Shopify entity title.
- Motion respects `prefers-reduced-motion`; autoplay pauses or becomes static when reduced motion is requested.
- Videos remain muted when autoplaying, include poster support, and expose an accessible play/pause control where interaction is required.
- Mobile rails use horizontal overflow with CSS scroll snapping and preserve usable tap targets.

## Performance contract

- No new third-party library or remote runtime dependency.
- Images use Shopify responsive image URLs, `srcset`, lazy loading below the fold, explicit dimensions/aspect ratios, and conservative fetch priority.
- Video uses `preload="metadata"` or `preload="none"`; no unconfigured media loads.
- Countdown timers are created only for valid future timestamps and cleared when disconnected.
- Section CSS is scoped by section ID or a unique component class.

## Repository and release constraints

- Reference documents are local inputs only and are listed in `.git/info/exclude`, never `.gitignore` and never the commit.
- Produce one local commit only: `feat: integrate RELIVANOW Home reference sections`.
- Do not push, save in Theme Editor, run `shopify theme push`, publish, or alter live theme `192527597938`.
- A real storefront visual pass remains pending if it cannot be performed without a prohibited upload. Static responsive QA may supplement but must not be reported as live storefront QA.
