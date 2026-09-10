# Asset manifest

**Status:** TASK-003 media model approved; final asset production and approval remain pending. Do not substitute PETLIBRO media or alter the physical product.

The product-specific source of truth is the ordered manifest in `docs/CONTENT_MATRIX.md`. TASK-003 creates or uploads no media. Final assets must be approved before TASK-004 and entered through Shopify `product.media` with native variant associations.

TASK-004 remains `DRAFT` until Work approves the final assets, primary hero color, default color/variant, and final native `product.media`-to-variant associations.

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
| FEEDER-MEDIA-01 | 1. Product hero | Confirmed Cloud White or Graphite Single Bowl; 4:5 | PENDING |
| FEEDER-MEDIA-02 | 2. Cat lifestyle | Confirmed Single Bowl color; 4:5 | PENDING |
| FEEDER-MEDIA-03 | 3. Dog lifestyle | Confirmed Single Bowl color; 4:5 | PENDING |
| FEEDER-MEDIA-04 | 4. App scheduling | Single Bowl; 4:5; workflow pending manual review | NEEDS_REDESIGN |
| FEEDER-MEDIA-05 | 5. Anti-stuck mechanism and secure lid | Single Bowl; 4:5; supplier-asset evidence pending manual review | NEEDS_REDESIGN |
| FEEDER-MEDIA-06 | 6. Dual power supply | Single Bowl; 4:5; no battery-runtime claim | NEEDS_REDESIGN |
| FEEDER-MEDIA-07 | 7. Box contents | Confirmed Single Bowl contents; 4:5 | NEEDS_REDESIGN |
| FEEDER-MEDIA-08 | 8. Cloud White and Graphite comparison | Confirmed Single Bowl colors only; 4:5; no Sky Blue or Dual Bowl | NEEDS_REDESIGN |

## Required Home assets

| ID | Asset | Requirement | Status |
|---|---|---|---|
| HOME-01 | Hero campaign 1 | Desktop + mobile independent crop | PENDING |
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
- Do not use permanent external supplier URLs or assign media to Sky Blue/Dual Bowl before supplier and SKU approval.
- Important headings stay as HTML rather than baked into media.
- Every file records dimensions, format, usage rights, source, and mobile crop.
- Shopify/CDN output uses responsive sizing; source masters remain separate from optimized exports.
