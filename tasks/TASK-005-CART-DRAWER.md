# TASK-005 — RELIVANOW cart drawer

**Status:** DONE

**Depends on:** TASK-004 approved and complete

**Gate owner:** ChatGPT Work

## Objective

Refine Horizon 4.1.1's existing cart drawer into a mobile-first, premium RELIVANOW experience without creating another cart, another Cart API client, or another source of commerce state. This implementation phase is limited to drawer reliability, presentation, accessibility, and recovery. AOV features remain gated.

## Read first

- `AGENTS.md`
- `reports/TASK-005-AUDIT.md`
- `reports/TASK-004-RESULT.md`
- `docs/TECHNICAL_ARCHITECTURE.md`
- `docs/DATA_MODEL.md`
- `docs/CONVERSION_BLUEPRINT.md`
- `docs/QA_MATRIX.md`
- `docs/DECISIONS.md`

## Frozen architecture

- Keep `theme-drawer`, the native `dialog`, `cart-items-component`, Shopify standard cart events, AJAX Cart routes, Section Rendering, and morphing as the only cart system.
- Treat `cart.items`, native line keys, Variant data, line-item properties, selling-plan allocation, bundle components, discount allocations, totals, and availability as authoritative.
- Keep the main Product and every add-on as independent cart lines. Never infer a bundle relationship or merge lines in theme code.
- Serialize/coalesce shopper quantity and remove intents inside the existing cart-items component. Do not abort a mutation after it may have reached Shopify, and do not allow an older response to overwrite a newer rendered state.
- A rejected mutation must retain or restore the affected line, show Shopify's error visibly, clear loading state, and offer an accessible retry using the same intended operation.
- Preserve the cart-page form as the progressive fallback. The header cart action must still reach `routes.cart_url` when JavaScript is unavailable.

## Implementation scope

- Restyle the existing drawer with a white surface, black/neutral text, subtle dividers, approximately 80×80 px mobile product media, clear product/variant/price/quantity hierarchy, and a full-width black Checkout button.
- Remove the Continue shopping action from the drawer empty state only; retain the localized empty-cart heading and a usable close action.
- Add explicit pending semantics for quantity and remove operations without hiding controls or changing values before Shopify confirms success.
- Add a drawer-level/line-level visible error and retry path for invalid JSON, non-OK HTTP responses, Shopify validation errors, and network failure.
- Preserve native product links, option values, public line-item properties, selling-plan names, bundle component/nested-line presentation, line and cart discounts, compare-at prices, subtotal/estimated total, tax/shipping text, checkout, and cart count.
- Preserve native accelerated checkout only when Shopify supplies it and the existing setting enables it; the ordinary black Checkout action remains first and dominant.
- Preserve Theme Editor global cart settings and all existing locale-backed labels. Any genuinely new public string requires locale keys rather than hardcoded copy.
- Keep JavaScript module-loaded through Horizon's existing dependency graph; introduce no library, global store, polling, or independent cart fetch loop.

## Explicitly out of scope

- Free-shipping progress until the threshold and market policy are confirmed.
- Recommendations, cross-sells, upsells, gifts, bundles, bundle builders, or a parallel add-on system.
- New discounts, promotional claims, urgency, countdowns, savings claims, or timers.
- PDP, Variant Picker, gallery, sticky ATC, Product/Variant data, inventory, pricing, metafields, metaobjects, media, apps, checkout customization, analytics, and Shopify remote configuration.
- Changes to `assets/product-form.js` in this phase. Its add-on batch property/selling-plan risk is a separately gated correction if representative forms can submit those fields.
- Copy, code, media, reviews, or claims from PETLIBRO.

## Planned implementation files

Expected minimum:

- `snippets/cart-drawer.liquid`
- `snippets/cart-products.liquid`
- `snippets/cart-summary.liquid`
- `snippets/header-actions.liquid`
- `assets/component-cart-items.js`
- `assets/cart-drawer.js`

Only if a new customer-facing error/retry label cannot reuse a precise existing translation:

- `locales/en.default.json`
- other locale files required by the repository's localization policy

Protected dependencies to reuse, not fork: `assets/theme-drawer.js`, `assets/section-renderer.js`, `assets/morph.js`, `assets/cart-discount.js`, `assets/cart-note.js`, `assets/cart-icon.js`, `assets/header-actions.js`, `assets/standard-actions-override.js`, `snippets/cart-items-component.liquid`, `snippets/theme-drawer*.liquid`, and `sections/cart-drawer-section.liquid`.

`assets/product-form.js` is audit-only for this task unless Work separately authorizes the documented properties/selling-plan correction.

## Required states

- Closed; opening; open; closing; restored desktop drawer.
- Empty; one line; multiple lines; main Product plus one or more separate add-ons.
- Variant options; public line properties; private underscore properties hidden; selling plan; bundle parent/components; nested/app-controlled lines.
- Quantity pending/success/Shopify validation error/network error/retry.
- Remove pending/success/Shopify validation error/network error/retry; remove last line to empty.
- Line discount; cart discount; compare-at absent/present; currency-code setting; localized money.
- Checkout enabled; accelerated checkout absent/present; note/discount setting off/on.
- Add from PDP, quick add, external standard action, browser back-forward cache, and concurrent external update.
- JavaScript unavailable or module-load failure: `/cart` remains reachable and checkout remains server-submittable.

## Acceptance criteria

- [x] No independent cart object, custom pricing state, duplicated Cart API client, hardcoded ID, price, URL, or currency is introduced.
- [x] Header click, quantity, remove and standard event/section paths pass locally and on the development theme; real PDP add, count and Checkout pass, while unavailable quick-add/app/discount/note inputs remain correctly data-dependent.
- [x] Static/fixture coverage preserves Product links, options, public properties, private-property hiding, selling-plan and discount presentation; unavailable bundle/app/compare-at/Markets cases are documented and were not fabricated.
- [x] Main Products and add-ons remain separate native cart lines; no theme-side bundle or line merge is created.
- [x] Rapid quantity intents coalesce by line key; dispatched mutations serialize and out-of-order external responses trigger one authoritative reconciliation.
- [x] Pending rows expose `aria-busy`, block only their controls, retain layout and return to an operable state after success or failure.
- [x] Shopify validation/4xx/5xx, invalid JSON, missing section and network errors are visible, honest and single-flight retryable; failed remove retains the authoritative row.
- [x] Empty drawer contains no Continue shopping action and retains the native labelled close lifecycle without empty summary markup.
- [x] Product media is 80×80 px; exact 360, 390, 768, 1024 and 1440 px isolated viewports have no positive horizontal overflow or checkout obstruction.
- [x] The standard Checkout is black, full-width, first and dominant in the real preview; platform-supplied accelerated checkout remains native and was present when Shopify supplied it.
- [x] Native open/close, backdrop, Escape, Tab containment, initial focus and trigger/fresh-trigger restoration pass locally and in real preview; absent nested live dialogs were not fabricated.
- [x] Standard cart event promises and existing error/count regions are preserved; real cart count, totals, mutation announcements and return to zero passed.
- [x] Locale keys, long representative text and RTL layout pass locally; all 31 locales have parity, while absent Markets combinations remain data-dependent.
- [x] Section morph fixtures and real cart morphs retain one connected component and correct trigger restoration; no duplicate lifecycle state appeared.
- [x] Without JavaScript or a usable drawer module, the real header link reaches `routes.cart_url`; the existing native cart form/Checkout server fallback is unchanged.
- [x] No free-shipping bar, recommendation, upsell, gift, bundle UI, fabricated discount, unconfirmed claim or external dependency ships.
- [x] Static validation, executable local fixtures, `git diff --check`, the single final Theme Check and real development-theme acceptance pass.

## Required handoff

Create `reports/TASK-005-RESULT.md` with the implementation diff, an end-to-end state matrix, failure/retry evidence, responsive/accessibility evidence, no-JavaScript behavior, Theme Editor behavior, and exact blocked remote-data cases. Do not begin TASK-006.

## Development-theme validation — 2026-09-16

- Theme Check passed after locale correction: 355 files, zero errors, and only the six unchanged Horizon warnings in `sections/header.liquid` and `snippets/divider.liquid`.
- All 31 storefront locales contain `actions.retry` and `content.cart_update_error`; all 30 strict JSON locale files and the default JSONC locale parse.
- The working tree was uploaded only to unpublished development theme `193260781938`; active theme `192527597938` remained live and untouched.
- Real preview checks passed drawer open/close, PDP add, two distinct valid Variants, separate line keys, increment/decrement/remove, rapid same-line and consecutive two-line mutations, authoritative item count/subtotal, `/cart`, Checkout handoff without purchase, focus/Escape restoration, and exact 1440×900, 768×1024, 390×844, and 360×800 layouts.
- A runtime escaping defect found during preview validation was corrected in `assets/component-cart-items.js` and `snippets/cart-products.liquid`, uploaded to the same development theme, and verified in the rendered DOM.
- Final isolated empty-state closure passed after the user manually authenticated a genuinely new temporary Chrome profile. The cart began at zero, one valid feeder Variant was added, only its recorded native line key was removed, and Shopify returned to zero items/zero total. The drawer passed 1440×900, 390×844, and 360×800, Close/Escape/focus restoration, residue/error/busy checks, the empty `/cart` page, and settled console/network inspection. The shared cart was untouched, the profile/processes were removed, and TASK-005 is `DONE`.
