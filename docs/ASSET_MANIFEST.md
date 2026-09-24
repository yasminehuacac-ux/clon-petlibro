# Asset manifest

**Status:** TASK-004 Cloud White handoff validated. Five files have `APPROVED VISUAL` status and three remain `PROVISIONAL`; no handoff file has been uploaded to Shopify or added to this repository. TASK-008 uses existing Shopify Product media as its fail-safe runtime fallback.

The product-specific source of truth is the ordered manifest in `docs/CONTENT_MATRIX.md`. Shopify `product.media` remains the sole runtime gallery source, with native variant associations. The external handoff is an approval/input record only and must never become a parallel URL or metafield gallery.

Cloud White is the approved primary visual and default variant. Graphite remains enabled as the second confirmed variant and uses the general product gallery whenever it has no native featured media. Sky Blue and Dual Bowl remain unverified and have no media assignments.

`APPROVED VISUAL` confirms visual direction, product geometry, crop, and claim-safe presentation for the named use. It does not mean uploaded, assigned, or publication-approved in Shopify. `PROVISIONAL` files remain layout references until their listed factual gates pass.

## Cloud White handoff

The requested extracted directory was not present during local validation. The same handoff was inspected read-only from `RELIVANOW-CLOUD-WHITE-ASSETS.zip`; all eight PNGs decoded successfully. No image was copied into the theme or repository.

| File | Dimensions | Intended use | Status | Publication gate |
|---|---:|---|---|---|
| `01-pdp-product-cloud-white.png` | 1254×1254 | PDP product hero / Cloud White featured media | APPROVED VISUAL | Final alt and native Shopify assignment |
| `02-home-hero-desktop-cloud-white.png` | 1672×941 | Home hero desktop crop | APPROVED VISUAL | TASK-008 composition and Shopify upload |
| `03-home-hero-mobile-cloud-white.png` | 1122×1402 | Home hero mobile crop | APPROVED VISUAL | TASK-008 composition and Shopify upload |
| `04-pdp-dog-lifestyle-cloud-white.png` | 1254×1254 | PDP dog lifestyle | APPROVED VISUAL | Final alt and Shopify upload |
| `05-pdp-product-detail-cloud-white.png` | 1254×1254 | PDP physical product detail | APPROVED VISUAL | Does not itself verify anti-stuck or camera capability |
| `06-pdp-app-scheduling-cloud-white.png` | 1254×1254 | Conceptual app scheduling | PROVISIONAL | Verify the official app interface |
| `07-pdp-dual-power-provisional.png` | 1254×1254 | Adapter and three-battery backup | PROVISIONAL | Verify adapter by market, exact three-battery type, and real accessory appearance |
| `08-pdp-box-contents-provisional.png` | 1254×1254 | Feeder, adapter, and manual | PROVISIONAL | Verify real adapter and manual appearance |

## Naming convention

```text
relivanow-[product]-[purpose]-[variant]-[ratio]-vNN.ext
```

Example:

```text
relivanow-smart-feeder-lifestyle-cloud-white-4x5-v01.webp
```

## Required initial product gallery

This summary deliberately matches the eight-row source manifest in `docs/CONTENT_MATRIX.md`; that matrix owns the complete alt, source, responsive, technical-data, and prohibited-claim fields.

| ID | Position and asset | Variant/ratio | Status |
|---|---|---|---|
| FEEDER-MEDIA-01 | 1. Product hero | Cloud White Single Bowl; square | APPROVED VISUAL (`01`) |
| FEEDER-MEDIA-02 | 2. Cat lifestyle | Confirmed Single Bowl color; final PDP-specific file absent | PENDING |
| FEEDER-MEDIA-03 | 3. Dog lifestyle | Cloud White Single Bowl; square | APPROVED VISUAL (`04`) |
| FEEDER-MEDIA-04 | 4. App scheduling | Cloud White Single Bowl; conceptual UI | PROVISIONAL (`06`) |
| FEEDER-MEDIA-05 | 5. Physical detail / future approved mechanism view | Cloud White Single Bowl; square; current file proves appearance only | APPROVED VISUAL (`05`); mechanism claim still PENDING |
| FEEDER-MEDIA-06 | 6. Dual power supply | Single Bowl; exact adapter and battery type pending | PROVISIONAL (`07`) |
| FEEDER-MEDIA-07 | 7. Box contents | Cloud White Single Bowl; actual adapter/manual appearance pending | PROVISIONAL (`08`) |
| FEEDER-MEDIA-08 | 8. Cloud White and Graphite comparison | Final comparison file absent; no Sky Blue or Dual Bowl | PENDING |

## Required Home assets

| ID | Asset | Requirement | Status |
|---|---|---|---|
| HOME-01 | Cloud White hero campaign | `02` desktop + `03` mobile independent crops | APPROVED VISUAL; binaries unavailable to TASK-008, not uploaded; existing Product media fallback active with editor-controlled safe crop |
| HOME-02 | Hero campaign 2 | Desktop + mobile independent crop | PENDING |
| HOME-03 | Category media | One per approved category | PENDING |
| HOME-04 | Featured product stories | Approved product media | RUNTIME FALLBACK: existing Shopify Product media with editor-controlled safe crop; dedicated editorial exports pending |
| HOME-05 | Ecosystem banner | Feeder/fountain relationship | PENDING |
| HOME-06 | UGC/social | Usage rights and real context | PENDING |
| HOME-07 | Brand manifesto | Emotional lifestyle scene | PENDING |
| HOME-REF-02 | Reference video slideshow | Up to four approved Shopify videos or YouTube/Vimeo sources, desktop/mobile posters, rights, alt text | PENDING; section disabled and fail-closed per slide |
| HOME-REF-03 | 3:4 image gallery | Approved primary/hover pairs, destination links, alt text | PENDING; section disabled |
| HOME-REF-04 | Campaign grid | Approved campaign media, meaningful alts, rights, future ISO-8601 end time | PENDING; section disabled and fail-closed |
| HOME-REF-06 | Community videos | Permissioned Shopify videos, posters, alts and approved captions | PENDING; section disabled and fail-closed |
| HOME-REF-07 | Expert cards | Verified identity/credentials, approved avatar/feature media, alts, links and permission | PENDING; section disabled and fail-closed |
| HOME-REF-09 | Product-offer campaign tile | Approved campaign image/alt/copy/CTA plus at least two real Shopify Products | PENDING; section disabled and fail-closed |

## TASK-012 PDP reference assets

No new binary is committed or remotely loaded. All inputs remain merchant-owned Theme Editor selections or native Shopify Product media.

| Reference section | Required approved input | Current state |
|---|---|---|
| PDP UGC | At least three permissioned portrait images or Shopify-hosted videos, creator handles and meaningful alt text | PENDING; disabled and public fail-closed |
| Shoppable image | One panoramic lifestyle image/alt plus at least two distinct confirmed real Products | PENDING; disabled and public fail-closed |
| Editorial proof | One hero image/alt plus exactly three approved, attributed source records and optional approved avatars | PENDING; disabled and public fail-closed |
| Product Highlights | Exactly four approved full-bleed images/alts with approved title/body copy | PENDING; disabled and public fail-closed |
| Offerings | Four approved icons plus approved offer thumbnails/alts where used | PENDING; disabled and public fail-closed |
| Complete the Look | Two distinct available Shopify Products with native featured media; optional approved image overrides/alts | PENDING Product relationships; disabled and public fail-closed |

## Quality rules

- Natural light, warm neutral interiors, real shadows, believable pets.
- Product geometry, buttons, bowl, lid, dispenser, colors, and proportions remain exact.
- Do not depict or claim a camera for this feeder unless the selected SKU is independently verified; never add, remove, or alter the body, buttons, lid, dispenser, or bowl.
- A visible lens-like element in approved visual files is physical appearance only and does not authorize camera, recording, night vision, cloud, AI, or recognition claims.
- Do not use permanent external supplier URLs or assign media to Sky Blue/Dual Bowl before supplier and SKU approval.
- Important headings stay as HTML rather than baked into media.
- Every file records dimensions, format, usage rights, source, and mobile crop.
- Shopify/CDN output uses responsive sizing; source masters remain separate from optimized exports.
