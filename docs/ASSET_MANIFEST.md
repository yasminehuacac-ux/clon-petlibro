# Asset manifest

**Status:** TASK-004 Cloud White handoff validated. Five files have `APPROVED VISUAL` status and three remain `PROVISIONAL`; no file has been uploaded to Shopify or added to this repository.

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
| HOME-01 | Cloud White hero campaign | `02` desktop + `03` mobile independent crops | APPROVED VISUAL; implementation waits for TASK-008 |
| HOME-02 | Hero campaign 2 | Desktop + mobile independent crop | PENDING |
| HOME-03 | Category media | One per approved category | PENDING |
| HOME-04 | Featured product stories | Approved product media | PENDING |
| HOME-05 | Ecosystem banner | Feeder/fountain relationship | PENDING |
| HOME-06 | UGC/social | Usage rights and real context | PENDING |
| HOME-07 | Brand manifesto | Emotional lifestyle scene | PENDING |

## Quality rules

- Natural light, warm neutral interiors, real shadows, believable pets.
- Product geometry, buttons, bowl, lid, dispenser, colors, and proportions remain exact.
- Do not depict or claim a camera for this feeder unless the selected SKU is independently verified; never add, remove, or alter the body, buttons, lid, dispenser, or bowl.
- A visible lens-like element in approved visual files is physical appearance only and does not authorize camera, recording, night vision, cloud, AI, or recognition claims.
- Do not use permanent external supplier URLs or assign media to Sky Blue/Dual Bowl before supplier and SKU approval.
- Important headings stay as HTML rather than baked into media.
- Every file records dimensions, format, usage rights, source, and mobile crop.
- Shopify/CDN output uses responsive sizing; source masters remain separate from optimized exports.
