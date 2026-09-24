# RELIVANOW PDP Reference Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the six approved PDP reference patterns as disabled, merchant-configurable Shopify OS 2.0 sections without changing the currently approved PDP, commerce components, app output, or live theme.

**Architecture:** Keep the existing default Product template and all nineteen active entries byte-stable at the JSON-object level, then append six disabled RELIVANOW instances. Implement five isolated section systems and one isolated Complete-the-Look system; reuse native Shopify Product data, money, forms, cart events, image filters and Horizon primitives. The only shared runtime extension is an explicit `data-variant-source="form"` policy for Complete the Look, leaving every current Product form on the legacy path.

**Tech Stack:** Shopify Online Store 2.0, Liquid, JSON templates, scoped `{% stylesheet %}`, native `<dialog>`, Horizon custom elements, vanilla ES modules, Node.js built-in test runner, Shopify Theme Check.

**Spec:** `RELIVANOW_SECTION_SPECS_MINUCIOSAS.md` lines 781-1245, `RELIVANOW_SECTION_REFERENCES.pdf` pages 18-21, and the user-authored TASK-012 brief supplied on 2026-09-24.

## Global Constraints

- Work only on `feat/relivanow-reference-sections` from `50b8db3bd3f8f856b82e0e2f22246b4c5cdcbb67`.
- Create exactly one final local commit: `feat: integrate RELIVANOW PDP reference sections`.
- Do not push, merge, open a PR, upload a theme, save Theme Editor state, publish, or modify live theme `192527597938`.
- Preserve the existing Product gallery, Product information, variants, prices, purchase form, sticky navigation, Judge.me, Cart Drawer, structured data and narrative sections.
- Append six instances to the confirmed default Product template only; all six start with `disabled: true` and empty commercial/editorial content.
- Do not invent reviews, ratings, verified buyers, experts, credentials, awards, statistics, medical benefits, discounts, urgency, comparisons, claims, UGC, campaigns or remote URLs.
- Content requiring rights, identity, authority, evidence, Product relationships, media or commercial approval must fail closed outside `request.design_mode`.
- Keep placeholders editor-only; public output must be absent when the contract is incomplete.
- Important interactive targets must be at least 44 px; keyboard, visible focus, semantics and `prefers-reduced-motion` are required.
- Use responsive native images with reserved aspect ratios; no unexpected horizontal overflow, distorted media, external dependency or tracker is permitted.
- Keep both reference documents local-only via `.git/info/exclude`; never stage them or modify shared `.gitignore`.

## Confirmed target and protected baseline

- The preserved read-only Product snapshot records `Theme template: default product` for handle `automatic-pet-feeder-with-remote-control-and-timed-feeding` in `reports/TASK-004-PRODUCT-SNAPSHOT-2026-09-12.md`.
- The theme contains only `templates/product.json`; prior authenticated development-theme evidence renders that file for the same Product.
- `templates/product.json` currently contains nineteen active entries. Stable payload SHA-256: `c20b497611c8b463d5860285d8acbdda745016cbfb9d7a3c58a057ffd57d0200`.
- File SHA-256 before TASK-012: `templates/product.json` = `79A1D0F5C46C025DABA89905AE6925DCEADF316BF2D8FABA62B198C35C063A97`.
- Critical implementation hashes captured before work: `sections/product-information.liquid`, `_product-media-gallery`, `_product-details`, `assets/product-form.js`, `assets/media-gallery.js`, PDP navigation Liquid/JS, reviews, Cart Drawer Liquid/JS. Only `assets/product-form.js` may change, and only through a tested opt-in branch.

## Six-section architecture map

| # | Theme Editor name | Liquid file | Reused components | Dynamic data | Required assets | Desktop behavior | Mobile behavior | Editable controls | Fail-closed contract | Existing PDP relationship |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | RELIVANOW PDP UGC | `sections/relivanow-pdp-ugc.liquid` | Native `<dialog>`, Shopify image/video filters, Product title/price/URL | Up to two real Product references per approved UGC item | Approved portrait image or Shopify-hosted video per item, meaningful alt, approved creator handle | Three-card horizontal rail; header/actions left; circular rail controls; selected item opens a roughly 58/42 media/Product-row modal | Horizontal snap rail; modal stacks media above compact Product rows; 44 px close/previous/next controls | Heading/support text/upload label+URL, colors/gaps, blocks with status, media, handle, two Products | Public output requires a nonblank heading and at least three `CONFIRMED` items with creator handle, alt text and approved image/video; upload CTA requires both label and URL; Product rows render only for real Products | New isolated section; does not replace Judge.me or existing reviews/social-proof host |
| 2 | RELIVANOW shoppable image | `sections/relivanow-shoppable-hotspots.liquid` | Horizon `product-hotspot-component`, `product-hotspot.js`, native quick-add, price and Product media | Real Product references and their native title, price, URL, availability and featured media | One approved panoramic lifestyle image and alt text | Wide 21:9 image, small discrete hotspots, compact white Product popovers inside the composition | Taller responsive crop; 44 px hotspots invoke Horizon quick-add behavior | Image, alt, section ratio/colors, hotspot Product and x/y position, confirmation status | Public output requires section `CONFIRMED`, approved image+alt, and at least two distinct `CONFIRMED` Product hotspots | Structurally matches native Product Hotspots but remains isolated because the native section publishes placeholders when unconfigured; native runtime/snippets are reused |
| 3 | RELIVANOW editorial proof | `sections/relivanow-editorial-proof.liquid` | Native responsive images and links | Merchant-approved editorial copy plus verified source details | Approved hero image, alt text and optional approved avatars | Approximately 50/50 emotional image/editorial split; three compact source cards under copy | Image and copy stack; proof cards become a snap rail without changing reading order | Section verification, eyebrow, heading, rich text, CTA, image, colors; proof blocks with quote/source/role/avatar/link | Public output requires section `CONFIRMED`, image+alt, heading+body and exactly three `CONFIRMED` proof blocks with quote and source | New isolated authority surface; it does not alter Judge.me, structured data or `relivanow-reviews` |
| 4 | RELIVANOW Product Highlights | `sections/relivanow-product-highlights.liquid` | Native responsive image filters and semantic heading controls | Merchant-approved benefit copy only | Four approved full-bleed images with meaningful alt text | Header/divider followed by four equal compact cards with lower gradient and white overlay copy | One-card-plus-peek horizontal snap rail with accessible scroll region | Heading, optional intro, colors/gap, four blocks with status/image/alt/title/text | Public output requires a nonblank heading and exactly four `CONFIRMED` complete cards | Visually related to `relivanow-product-features` but isolated because existing feature records use a different media/card anatomy and remain untouched |
| 5 | RELIVANOW offerings | `sections/relivanow-offerings.liquid` | Native buttons/links, Shopify image filters, progressive horizontal scrolling | Approved benefit and offer content; no automatic promotion logic | Approved line icon/image per benefit and approved offer thumbnail where used | Compact light panel; four equal benefit tabs; horizontal offer rail with next-item peek, arrows and dots | Four compact benefits remain readable; offer rail preserves peek and touch scrolling | Heading/colors; four benefit blocks; offer blocks with category slot, status, image, title, terms and optional link | Public output requires heading, exactly four `CONFIRMED` benefits with icon+label, and at least two `CONFIRMED` offers with title+terms; links require approved label/URL pair | New isolated commercial surface; does not change purchase-panel promotion or Cart Drawer offers |
| 6 | RELIVANOW Complete the Look | `sections/relivanow-complete-look.liquid` | Native Shopify Product/Variant objects, money/image filters, `{% form 'product' %}`, `product-form-component`, `add-to-cart-button`, cart events | Two distinct real Products, native variants/options/prices/availability/media | Native Product media and native swatches when configured | Two borderless mini-PDP columns with aligned image/title/price/options/full-width ATC | Preserve the reference's two-column density at 390/360 widths; option controls wrap within each card without root overflow | Heading, colors/gap; exactly two Product blocks with relationship status and optional approved image override/alt | Public output requires heading and exactly two distinct `CONFIRMED`, available real Products with featured media; no placeholder Product card | New isolated cross-sell surface; existing Product Recommendations and add-ons stay active and unchanged. `assets/product-form.js` gets only an opt-in form-variant priority policy for this section |

## Review Focus

- A PDP URL containing `?variant=` must not override the selected Complete-the-Look card variant, while every legacy Product form must retain its current URL-first resolution.
- Duplicate or blank Product references must suppress Complete the Look and duplicate hotspots must not satisfy their minimum count.
- UGC/editorial blocks with media but missing confirmation, attribution or alt text must remain absent publicly.
- Very long merchant headings, handles, Product titles and option labels must wrap within 360 px without root overflow or clipped controls.
- Dialog, rail and option interactions must remain keyboard operable and motion-reduced; disabling JavaScript must leave readable Product links/content and native form semantics where possible.

---

### Task 1: Establish TASK-012 contract and RED tests

**Files:**
- Create: `tasks/TASK-012-PDP-REFERENCE-SECTIONS.md`
- Create: `tests/pdp-reference-sections.test.mjs`
- Modify later: `templates/product.json`

**Interfaces:**
- Consumes: current nineteen-entry Product payload hash `c20b4976...d0200` and the six-section table above.
- Produces: executable contracts for filenames, schemas, fail-closed gates, opt-in Product form behavior, template order and prohibited defaults.

- [ ] **Step 1: Record the active independent task and protected surfaces**

Create TASK-012 with the exact scope, reference documents, protected hashes, acceptance checks and prohibited remote actions from Global Constraints.

- [ ] **Step 2: Write failing contract tests**

Add tests that expect the six section files/assets, exact appended instance IDs/types, all six `disabled: true`, stable first-nineteen payload hash, required schema controls, exact block minima, Product/confirmation gates, editor-only placeholders, modal/hotspot/rail/form semantics, 44 px controls, reduced-motion CSS, no remote URL, and no risky content defaults.

- [ ] **Step 3: Run the new suite and verify RED**

Run: `node --test tests/pdp-reference-sections.test.mjs`

Expected: failures for missing TASK-012 section/assets/template instances and missing opt-in form policy, while the protected nineteen-entry hash assertion already passes.

### Task 2: Add opt-in form policy and Complete-the-Look variant controller

**Files:**
- Create: `assets/relivanow-product-form-policy.js`
- Create: `assets/relivanow-complete-look.js`
- Modify: `assets/product-form.js`
- Test: `tests/pdp-reference-sections.test.mjs`

**Interfaces:**
- Consumes: a URL variant ID, the form's current variant ID, an optional selected variant ID and explicit `preferFormVariant` boolean.
- Produces: `resolveProductFormVariantId(...)` preserving legacy URL-first behavior unless `data-variant-source="form"`; `findVariantByOptions(variants, selectedOptions)` and UI synchronization for Complete the Look.

- [ ] **Step 1: Add pure-policy tests and verify RED**

Test legacy URL-first resolution, opt-in form-first resolution, missing-value fallbacks, exact option-array matching and unavailable combination handling.

- [ ] **Step 2: Implement the minimal pure helpers**

Create focused ES modules. Import only the Product form policy from `product-form.js`; check `this.dataset.variantSource === 'form'` before passing inputs. Existing instances without the attribute must return the identical legacy value.

- [ ] **Step 3: Implement progressively enhanced card synchronization**

The Complete-the-Look controller updates its own hidden Variant ID, server-formatted price state, availability text/button state and approved/native image for the matched variant. It does not change URL state, main PDP variants or another card.

- [ ] **Step 4: Run targeted tests and verify GREEN**

Run: `node --test tests/pdp-reference-sections.test.mjs --test-name-pattern="form|Complete"`

Expected: all matching tests pass; unrelated missing-section tests remain RED until their tasks.

### Task 3: Implement UGC modal and shoppable hotspot sections

**Files:**
- Create: `sections/relivanow-pdp-ugc.liquid`
- Create: `assets/relivanow-pdp-ugc.js`
- Create: `sections/relivanow-shoppable-hotspots.liquid`
- Test: `tests/pdp-reference-sections.test.mjs`

**Interfaces:**
- Consumes: confirmed merchant blocks, approved Shopify image/video objects and native Product references.
- Produces: three-up UGC rail with native dialogs/Product rows; fail-closed shoppable panoramic image using Horizon hotspot/quick-add runtime.

- [ ] **Step 1: Confirm section tests fail for the expected missing contracts**

Run the UGC/hotspot test-name subset and read the missing-file/schema failures.

- [ ] **Step 2: Implement UGC fail-closed Liquid and modal controller**

Require three complete confirmed UGC items. Render creator handles, media action buttons, rail arrows, one dialog per item, compact native Product rows, visible close and previous/next controls. Use native dialog focus/Escape behavior, light-dismiss backdrop handling and reduced-motion scroll policy.

- [ ] **Step 3: Implement isolated shoppable hotspots**

Require confirmed section media and at least two distinct confirmed Products. Reuse `product-hotspot.js`, `quick-add`, `price`, Shopify responsive images and Product URLs, while owning only the fail-closed wrapper/styles required to avoid the native placeholder path.

- [ ] **Step 4: Run targeted tests and verify GREEN**

Run: `node --test tests/pdp-reference-sections.test.mjs --test-name-pattern="UGC|hotspot"`

Expected: matching tests pass.

### Task 4: Implement editorial proof and Product Highlights

**Files:**
- Create: `sections/relivanow-editorial-proof.liquid`
- Create: `sections/relivanow-product-highlights.liquid`
- Test: `tests/pdp-reference-sections.test.mjs`

**Interfaces:**
- Consumes: explicit section/block confirmation plus approved media, copy and attribution.
- Produces: editorial 50/50 proof section and exact four-card full-bleed highlight rail/grid.

- [ ] **Step 1: Confirm expected RED failures**

Run the editorial/highlights test-name subset.

- [ ] **Step 2: Implement editorial proof**

Gate public output on section confirmation, hero media/alt/body and three confirmed attributed proof blocks. Keep all authority copy merchant-owned and emit no rating, review schema or professional claim by default.

- [ ] **Step 3: Implement Product Highlights**

Require exactly four confirmed image/title/text blocks; provide equal desktop cards, mobile snap rail, lower gradient, white copy, image dimensions and long-text containment.

- [ ] **Step 4: Run targeted tests and verify GREEN**

Run: `node --test tests/pdp-reference-sections.test.mjs --test-name-pattern="editorial|Highlights"`

Expected: matching tests pass.

### Task 5: Implement Offerings and Complete the Look

**Files:**
- Create: `sections/relivanow-offerings.liquid`
- Create: `assets/relivanow-offerings.js`
- Create: `sections/relivanow-complete-look.liquid`
- Modify: `tests/pdp-reference-sections.test.mjs`

**Interfaces:**
- Consumes: four confirmed benefits, at least two confirmed offers, and exactly two distinct confirmed native Products.
- Produces: accessible benefit-tab/offer rail and two compact native-data mini-PDPs using the opt-in form policy from Task 2.

- [ ] **Step 1: Confirm expected RED failures**

Run the offerings/Complete-the-Look subset.

- [ ] **Step 2: Implement Offerings**

Build the compact four-tab panel and horizontal offer rail with arrows/dots, touch scrolling, progressive fallback and reduced-motion behavior. Ship no default offer names, thresholds, discounts, gifts, shipping promise or coupon.

- [ ] **Step 3: Implement Complete the Look**

Render exactly two distinct confirmed Products from blocks. Consume native Product title, price, availability, options, variants and media. Render option groups as circular swatches only when Shopify supplies swatch data; otherwise use truthful text chips. Submit the selected ID through native Product form/cart handling with `data-variant-source="form"`.

- [ ] **Step 4: Run targeted and full contract tests**

Run: `node --test tests/pdp-reference-sections.test.mjs`

Expected: all TASK-012 contract tests pass except the template-integration assertion until Task 6.

### Task 6: Integrate six disabled instances and document relationships

**Files:**
- Modify: `templates/product.json`
- Modify: `tests/homepage-contract.test.mjs` only if a global historical assumption requires scoping; otherwise leave unchanged.
- Modify: `TASKS.md`
- Modify: `PROJECT_STATUS.md`
- Modify: `CHANGELOG.md`
- Modify: `docs/ASSET_MANIFEST.md`
- Modify: `docs/CONTENT_MATRIX.md`
- Modify: `docs/DECISIONS.md`
- Modify: `docs/QA_MATRIX.md`
- Create: `reports/TASK-012-RESULT.md`

**Interfaces:**
- Consumes: six production section types and the protected nineteen-entry Product payload.
- Produces: six appended disabled instances and complete local handoff documentation.

- [ ] **Step 1: Append exact disabled instances**

Append, in reference order: `reference_pdp_ugc`, `reference_pdp_hotspots`, `reference_pdp_editorial_proof`, `reference_pdp_highlights`, `reference_pdp_offerings`, `reference_pdp_complete_look`. Keep the first nineteen IDs and section objects unchanged.

- [ ] **Step 2: Run the contract suite and verify GREEN**

Run: `node --test tests/pdp-reference-sections.test.mjs`

Expected: every TASK-012 contract passes, including the protected payload hash and six disabled entries.

- [ ] **Step 3: Update project documentation**

Record architecture, exact files, fail-closed requirements, missing assets/content, inherited warnings, no remote action, isolated QA scope and real Shopify QA still pending. Do not claim runtime/editor QA.

### Task 7: Isolated responsive QA, full validation, review and one commit

**Files:**
- Create temporarily under ignored `.superpowers/`: isolated fixture/screenshots/ledger/review package.
- Final tracked output: `reports/TASK-012-RESULT.md` and documentation updates from Task 6.

**Interfaces:**
- Consumes: completed tracked diff.
- Produces: exact evidence, clean review, one local commit and clean working tree.

- [ ] **Step 1: Build an isolated fixture and validate exact viewports**

Check 1440x900, 1024x768, 768x1024, 390x844 and 360x800 for root overflow, hierarchy, undistorted media, wrapping, rail navigation, dialog controls, 44 px targets and reduced motion. Label this isolated QA, not storefront/Theme Editor QA.

- [ ] **Step 2: Run every mandatory automated/static check**

Run the full Node suite; all applicable `node --check`; JSON/JSONC parsing; Liquid schema parsing; duplicate setting IDs; `git diff --check`; tracker, remote URL, fabricated content/review/claim and asset-reference scans; Home/PDP/variant/gallery/sticky-navigation/Judge.me/cart regression contracts; raw Theme Check; diagnostic Theme Check disabling only the documented Judge.me `JSONMissingBlock` false positive.

Expected: no TASK-012 error; exact inherited Theme Check findings documented.

- [ ] **Step 3: Recompute protected hashes and review the complete diff**

Require the protected first-nineteen Product payload hash and every critical-file hash to match baseline except the explicitly approved opt-in `assets/product-form.js` change. Verify Home template hash is unchanged and both reference files are untracked/ignored only locally.

- [ ] **Step 4: Perform whole-branch review and one fix pass if required**

Review security, fail-closed behavior, event scoping, Product form regression, semantics, responsive risks and content truthfulness. Any Critical/Important finding gets a failing regression test before its single fix pass; Minor findings are reported, not silently expanded.

- [ ] **Step 5: Create the one authorized local commit**

Stage only intended implementation/tests/docs. Verify the two reference documents and temporary artifacts are absent. Commit exactly:

```text
feat: integrate RELIVANOW PDP reference sections
```

- [ ] **Step 6: Verify handoff state**

Require one commit above `50b8db3bd3f8f856b82e0e2f22246b4c5cdcbb67`, clean working tree, unchanged upstream configuration, no push and no Shopify mutation.
