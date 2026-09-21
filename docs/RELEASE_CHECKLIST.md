# Release checklist

**Checkpoint:** TASK-010 release candidate, 2026-09-21

**Overall:** `IN PROGRESS` — zero open P0/P1 defects; external launch gates prevent `READY TO PUBLISH`.

## Commercial

| Item | Status | Evidence / gate |
|---|---|---|
| Product names, variants, pricing, discounts, guarantees, and shipping approved | BLOCKED | Current legacy Product/Variant data is real, but approved Cloud White/Graphite, final shipping, discounts and guarantees are not fully operationally approved. |
| Claims and specifications validated against the real product/manual | BLOCKED | Published claims remain within confirmed evidence and prohibited claims are absent; complete manual/specification validation is pending. |
| Reviews are authentic and provider-approved | PASS | Judge.me owns the real `No reviews` state. No count, testimonial, verified-buyer claim or aggregate rating was fabricated. |
| Add-ons and bundles are physically and financially valid | NOT APPLICABLE | No add-on or bundle is approved for the current release candidate; corresponding modules fail closed. |

## Functional

| Item | Status | Evidence / gate |
|---|---|---|
| Variant changes synchronize price, media, SKU, availability, form, add-ons, and sticky ATC | BLOCKED | Real Black/White selections update URL, price, availability and form; Cloud White/Graphite do not yet exist as the approved remote data set. |
| Add to Cart, quantity, remove, discounts, cart upsells, and checkout work | PASS | Fresh add/increment/decrement/remove passed and restored the shared cart to 17 items. Historical checkout handoff passed without purchase; optional discounts/upsells are not applicable because none is approved. |
| Empty, loading, unavailable, sold-out, error, and recovery states work | BLOCKED | Isolated suites and earlier real empty-cart closure pass; representative unavailable/discount/app-line combinations were not fabricated. |
| Theme Editor can add, remove, hide, and reorder intended blocks | PASS | Prior targeted lifecycle checks pass; fresh read-only inspection confirms theme `193260781938`, complete section structure, draft state and disabled Save. |

## Experience

| Item | Status | Evidence / gate |
|---|---|---|
| Home and PDP match the approved hierarchy and brand system | PASS | Fresh structure/heading/media checks and exact-width preview evidence pass. |
| Mobile, tablet, and desktop have intentional composition | PASS | Fresh sticky-navigation checks pass at 1440×900, 1024×768, 768×1024, 390×844 and 360×800 with zero overflow; prior visual-composition evidence remains applicable. |
| Sticky elements do not overlap content, chat, cookies, or safe areas | PASS | PDP offsets, hashes and active state pass across both scroll owners; regional cookie presentation remains a separate activation-time gate. |
| Keyboard, focus, screen-reader names, live updates, and reduced motion verified | PASS | Cart, gallery/zoom and Judge.me dialog focus/Escape pass; major contrast samples pass AA. Some secondary controls remain below the project's 44 px target and are recorded as non-blocking P2. |

## Technical

| Item | Status | Evidence / gate |
|---|---|---|
| Theme Check has no new errors | PASS | Diagnostic run: 359 files, zero errors and six inherited Horizon warnings after disabling only the documented valid Judge.me nested app-URI false positive. |
| JSON and schemas validate | PASS | Full Node contracts cover repository JSON/JSONC, locales, Liquid schemas and duplicate setting IDs; 23 tests pass. |
| No unapproved apps, dependencies, trackers, or copied PETLIBRO content | PASS | Targeted scans are clean. Judge.me and the Shopify-installed Translate & Adapt baseline remain disclosed; Network Intelligence remains enabled by explicit Work decision. |
| LCP, CLS, INP, media, and custom-JS budgets evaluated | PASS | Direct Lighthouse/Core Web Vitals lab metrics were unavailable and no score is claimed. Equivalent checks cover priority/lazy loading, dimensions, overflow, console and script cost; four RELIVANOW modules total 14,878 bytes raw / 5,118 bytes gzip. |
| Product, Offer, FAQ, and rating structured data are consistent | PASS | Product/Offer/Breadcrumb/Organization output uses real Shopify data; zero reviews produce zero `AggregateRating`/Review nodes; absent FAQ output emits no fabricated schema. |
| Analytics events do not double fire | PASS | Custom hooks install once and remain transport-free; Shopify owns commerce events. No paid/provider mapping is active. |

## Release

| Item | Status | Evidence / gate |
|---|---|---|
| Zero P0/P1 defects | PASS | One reproducible PDP navigation regression was corrected and revalidated; none remain open. |
| Final result report approved by Work | BLOCKED | `reports/TASK-010-RESULT.md` is prepared for Work review. |
| Git state clean and release commit/tag recorded | PASS | Checkpoint commit subject is `chore: validate RELIVANOW release candidate`; no release tag is appropriate while TASK-010 remains open. |
| Backup/theme duplicate exists | BLOCKED | Development theme `193260781938` is isolated from protected live theme `192527597938` and rollback is documented, but a separately verified backup duplicate is not evidenced. |
| Production publish explicitly authorized | BLOCKED | No publish authorization was given. Do not publish or mark `READY TO PUBLISH`. |
