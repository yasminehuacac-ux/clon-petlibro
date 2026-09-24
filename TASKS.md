# Task registry

| ID | Task | Status | Prerequisite | Gate owner |
|---|---|---|---|---|
| TASK-001 | Baseline audit and reuse map | DONE | Project control pack | Work |
| TASK-002 | RELIVANOW design system | DONE | TASK-001 approved + local toolchain verified | Work |
| TASK-003 | Shopify data model | DONE | TASK-001/002 + commercial data | Work |
| TASK-004 | PDP purchase area | DONE | TASK-002/003 + product assets | Work |
| TASK-005 | RELIVANOW cart drawer | DONE | Approved real development-theme and isolated empty-cart validation | Work |
| TASK-006 | PDP storytelling | DONE | TASK-004 reconciliation, navigation closure, and development-theme QA complete | Work |
| TASK-007 | Reviews integration | DONE | Authentic zero-review launch baseline approved; populated behavior deferred to real-review operations | Work |
| TASK-008 | Home | DONE | Development-theme QA, Theme Editor, PDP/Cart regression, and handoff complete | Work |
| TASK-009 | Analytics and SEO | DONE | Technical baseline verified; authorized administrative baseline recorded; release gates documented | Work |
| TASK-010 | Final QA and release | IN PROGRESS | Batch 1 accessibility gates pass; six explicit external release gates remain | Work |
| TASK-011 | Home reference sections — Phase 1 | DONE | User-approved hybrid design; local-only implementation and QA | Work |
| TASK-012 | PDP reference sections — Phase 2 | DONE | User-approved hybrid design; local-only implementation and static QA | Work |

## Status meanings

- `DRAFT`: planned but not safe to execute.
- `READY`: inputs and acceptance criteria are sufficient.
- `IN PROGRESS`: Codex is actively working.
- `BLOCKED`: a required decision, asset, access, or dependency is missing.
- `REVIEW`: implemented and awaiting Work validation.
- `DONE`: technically verified and approved by Work.

Only one task may be `IN PROGRESS` at a time unless the user explicitly authorizes independent parallel work.

## TASK-002 gate

Work approved TASK-002 after desktop/mobile Home and PDP validation, commerce-flow checks, keyboard/focus checks, Theme Editor verification, and static validation. TASK-002 is `DONE`. TASK-003 was subsequently unblocked by Work's commercial and content decisions.

## TASK-003 gate

Work approved the documentation-only Shopify data model and TASK-003 is `DONE`. Work then approved TASK-004 validation against the current Product through unpublished development theme `193260781938`. The complete purchase panel and 16 long-form modules passed static, Theme Editor, real-data, fail-closed, and exact-width development-preview validation. Five confirmed Product metafield definitions/values were added after preserving the prior state; no price, variant, inventory, handle, SEO, media, live-theme, or publication change occurred. TASK-004 is `DONE`; unavailable approved assets and third-party/merchandising data remain separate follow-up gates.

## TASK-005 gate

The local Horizon 4.1.1 cart audit and implementation evidence are recorded in `reports/TASK-005-AUDIT.md` and `reports/TASK-005-RESULT.md`. The authorized working tree was uploaded only to unpublished development theme `193260781938`; active theme `192527597938` was not modified. Real add, two-Variant, quantity/remove, concurrency, `/cart`, Checkout-without-purchase, accessibility and exact-width checks pass. Final empty-cart closure also passed in a clean temporary Chrome profile after manual authentication: it began at zero, added one valid feeder Variant, removed only that keyed line, returned to zero, and passed three exact empty-state viewports, focus/Close/Escape, `/cart`, and console/network inspection. The shared cart was untouched and the temporary profile was removed. TASK-005 is `DONE`; unavailable data-dependent cases were not fabricated.

## TASK-007 gate

Judge.me's official core embed, Star Ratings block, and Review Widget are configured only on unpublished development theme `193260781938`. The native rating block is disabled there, the existing long-form `@app` host is reused, the real zero-review state is coherent, and no false rating/review schema is emitted. Live theme `192527597938` is byte-identical across the protected snapshot surfaces. Responsive, keyboard, Theme Editor, script/schema duplication, and read-only regression checks pass. Work approved launch with `No reviews`; populated filters, customer media, pagination, verified-buyer output, and populated visible/schema consistency are future operational checks that require authentic buyer reviews. TASK-007 is `DONE`.

## TASK-009 gate

Work explicitly authorized TASK-009 to proceed independently while TASK-007 was still in progress. The theme has the safe SEO/structured-data corrections, localized-route fallback, and provider-neutral interaction hooks validated on development theme `193260781938`. The authorized administrative baseline is recorded: US remains active; Canada and the approved four-country EU scope are draft; legacy UK and Australia/New Zealand markets are draft; English is published while German, Spanish, French, and Dutch remain untranslated/unassigned/unpublished; Customer Privacy settings are active; `relivanow.com` is DNS-verified in Search Console; and Merchant Center account `5857724399` exists without products, feeds, listings, Ads, campaigns, plans, or charges. CAD/EUR, delivery/legal content, post-release sitemap fetch, Merchant onboarding, regional consent/localization regression, and authentic review data are documented release gates. TASK-009 is `DONE`.

## TASK-010 gate

Release Gates Batch 1 resolves the documented sub-44 px secondary targets without redesigning approved components. The correction and fresh Home/PDP/Search/Judge.me/Cart Drawer regression pass only on development theme `193260781938`; live theme `192527597938` retains its protected hashes. Read-only Admin discovery confirms Peru as the legal country, United States active in USD, Canada and the Germany/Belgium/Spain/France EU market in draft, English published, and German/Spanish/French/Dutch unpublished. Mercado Pago Tarjetas, Mercado Pago Checkout Pro and PayPal Express are the three real payment options inspected; no connection or commercial state changed.

TASK-010 stays `IN PROGRESS`. Its authoritative blockers are exactly: (1) real supplier confirmation for White/Black and Single/Dual, (2) authorized selection and connection of a card gateway, (3) authorized PayPal Business connection, (4) real checkout testing, (5) policies, shipping, consent and final QA for all six markets, and (6) later password removal and sitemap validation.

## TASK-011 gate

Work explicitly authorized TASK-011 as independent Phase 1 work while TASK-010 remains in progress. Eight new RELIVANOW OS 2.0 sections plus one native `collection-list` instance are appended to Home with all nine instances disabled. The approved active Home is byte-stable at the JSON-object level; `collection-list.liquid` is unchanged; marquee extensions are opt-in. Campaign, community and expert modules fail closed. Local contracts, Theme Check, content/privacy/reference scans and isolated five-viewport QA pass for the implemented code. Real Theme Editor/storefront QA remains pending because no theme upload, editor save, push or publication was authorized.

## TASK-012 gate

Work explicitly authorized TASK-012 as independent Phase 2 work while TASK-010 remains in progress. Six isolated RELIVANOW PDP section types are appended to the confirmed default Product template, all disabled and empty. The first nineteen Product entries remain object-hash stable. UGC, hotspots, editorial proof, highlights, offerings and Complete the Look fail closed until merchant-owned confirmation/data requirements are satisfied. Complete the Look uses native Product/Variant/form/cart ownership and an explicit form-first opt-in that leaves legacy Product forms URL-first. Local contracts, the full Node suite, Theme Check, syntax/schema/scans and exact-width geometry checks pass; visual storefront/Theme Editor QA remains pending because no upload, save or publication was authorized and local `file://` rendering was blocked by browser policy.
