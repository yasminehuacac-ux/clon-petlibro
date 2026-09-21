# TASK-010 — Final QA, performance, and release candidate

**Status:** IN PROGRESS — release-candidate checkpoint validated; external launch gates remain

**Depends on:** TASK-001–009 approved; release data and access available  
**Gate owner:** ChatGPT Work

## Objective

Run the full technical, functional, responsive, accessibility, SEO, analytics, performance, Theme Editor, and regression matrix; fix in-scope defects; prepare a release candidate without publishing it.

## Read first

- `AGENTS.md`
- All approved task reports
- `docs/QA_MATRIX.md`
- `docs/RELEASE_CHECKLIST.md`
- `docs/DECISIONS.md`
- `PROJECT_STATUS.md`
- `CHANGELOG.md`

## Scope

- Verify Git state and release scope.
- Run Theme Check and available static validation.
- Test all variants, gallery, product form, cart, offers, reviews, navigation, search, Home, and checkout handoff.
- Test Theme Editor add/remove/reorder/reload.
- Test baseline viewports and agreed browsers/devices.
- Audit keyboard, focus, live regions, labels, contrast, touch, and reduced motion.
- Validate structured data, analytics, localization, and market copy.
- Measure LCP, CLS, INP, media payload, custom JS, and third-party behavior.
- Fix P0/P1 and approved P2 regressions without expanding scope.
- Prepare release notes, archive/version/tag recommendation, rollback plan, and unresolved-defect list.

## Out of scope

- Publishing or pushing the live theme without separate explicit authorization.
- New features or design exploration.
- Hiding failed checks or lowering acceptance thresholds silently.

## Acceptance criteria

- [x] Zero open P0/P1 defects.
- [x] Every release-checklist item is pass, fail, blocked, or not applicable with evidence.
- [ ] Core purchase flow passes for all approved variants and markets.
- [x] Theme Editor and responsive matrix pass for the current data-backed release-candidate surfaces.
- [x] Performance results and remaining gaps are reported honestly.
- [x] Git diff is reviewed, project docs are current, and rollback is defined.
- [x] No production deployment occurred.

## Required handoff

Create `reports/TASK-010-RESULT.md`, finalize `PROJECT_STATUS.md` and `CHANGELOG.md`, and stop for explicit release approval.

## Release Gates Batch 1 — 2026-09-21

**Result:** PASS for the safe executable scope; TASK-010 remains `IN PROGRESS`.

- Corrected only the documented real secondary controls below 44×44 px: Home product-card Choose and View all, integrated newsletter submit, Judge.me rating/review actions, More payment options, and footer utility/policy actions. Existing typography, colors and layout remain unchanged.
- Mouse, keyboard, mobile-pointer and exact 1440×900, 1024×768, 768×1024, 390×844 and 360×800 checks pass on development theme `193260781938`; Home, PDP, Search, Judge.me and the read-only Cart Drawer regressions pass with zero horizontal overflow.
- Peru is the confirmed legal country. The read-only payment shortlist is Mercado Pago Tarjetas, Mercado Pago Checkout Pro and PayPal Express. No provider/account/credential/bank/contract/charge state was changed. Tarjetas + PayPal is the conditional recommendation, pending real international and currency checkout tests.
- United States remains active in USD. Canada and the Germany/Belgium/Spain/France EU market remain draft. English remains the only published language; German, Spanish, French and Dutch remain unpublished.
- White/Black and Single/Dual are supplier-reference requirements only. No Product, Variant, SKU, price, inventory or media was created or modified.
- Only the six accessibility implementation files were uploaded to the development theme. Live theme `192527597938` remains live and byte-identical across the protected snapshot files.

Authoritative remaining blockers:

1. Real supplier confirmation for White/Black and Single/Dual.
2. Authorized selection and connection of a card gateway.
3. Authorized connection of PayPal Business.
4. Real checkout testing.
5. Policies, shipping, consent and final QA for the six launch markets.
6. Later password removal and sitemap validation.
