# TASK-005 — Cart drawer local implementation result

**Date:** 2026-09-16
**Status:** DONE — development-theme and isolated real empty-cart validation complete
**Theme baseline:** Horizon 4.1.1
**Remote operations:** working tree uploaded only to unpublished development theme `193260781938`; no publish or active-theme mutation

## 1. Native architecture reused

The implementation retains Horizon's single cart graph: global `theme-drawer` and native `dialog`, `cart-drawer-component`, `cart-items-component`, Shopify standard cart events, `Theme.routes.cart_change_url`, `/cart.json`, Section Rendering, hydration morphing, native line keys, server totals, cart form, Checkout and cart-count consumers. It adds no global cart store, second API wrapper, pricing calculator, polling loop or external dependency.

Unchanged native owners include `assets/theme-drawer.js`, `assets/cart-drawer.js`, `assets/section-renderer.js`, `assets/morph.js`, `assets/cart-discount.js`, `assets/cart-note.js`, `assets/cart-icon.js`, `sections/cart-drawer-section.liquid`, `sections/main-cart.liquid` and `templates/cart.json`.

## 2. Files created and modified

Created:

- `reports/TASK-005-RESULT.md`.

Implementation modified:

- `assets/component-cart-items.js`;
- `assets/header-actions.js`;
- `snippets/cart-drawer.liquid`;
- `snippets/cart-products.liquid`;
- `snippets/cart-summary.liquid`;
- `snippets/header-actions.liquid`;
- `snippets/scripts.liquid`;
- all 31 storefront `locales/*.json` files (the default English file plus 30 translations; schema-locale files are unchanged).

Project records updated:

- `CHANGELOG.md`, `PROJECT_STATUS.md`, `TASKS.md`;
- `docs/DECISIONS.md`, `docs/QA_MATRIX.md`, `docs/TECHNICAL_ARCHITECTURE.md`;
- `tasks/TASK-005-CART-DRAWER.md`.

The seven pre-existing TASK-005 audit document changes were preserved. `assets/product-form.js`, the PDP, variants, swatches, gallery, sticky ATC and long-form sections were not modified.

## 3. Visual changes

The existing drawer is namespaced to a white RELIVANOW canvas with charcoal/neutral text, fine semantic borders, restrained shadows and token-based spacing. Drawer line layout uses an 80×80 px non-distorting `object-fit: contain` media box; title, options/properties, unit/line price and quantity are separated into a compact two-column hierarchy. Remove is a clear localized text action with a 44 px minimum target but lower visual weight than Checkout.

The summary retains native totals/tax/shipping output, adds a fine divider, soft elevation and safe-area padding, and keeps the standard Checkout first, black, full-width and at least 52 px tall. Shopify-provided accelerated checkout remains in its native conditional position after the standard action. Continue shopping is removed only from the drawer empty state; the server cart page retains it.

## 4. Concurrent mutation strategy

`CartItemsComponent` now owns one minimal FIFO coordinator:

1. quantity intents coalesce independently per native line key for 300 ms;
2. requests use absolute `{ id: lineKey, quantity }` payloads;
3. dispatched `/cart/change` requests execute one at a time and are never aborted after they may have reached Shopify;
4. another intent for a queued line replaces that queued absolute intent without duplicating its queue slot;
5. standard line, discount and note promises are versioned and tracked;
6. any overlap or response-order ambiguity suppresses direct stale rendering, waits for known operations, then performs one uncached native Section Rendering request plus `/cart.json` readback and rebroadcasts the standard cart event.

This keeps different lines consistent and prevents an older response from owning final markup without introducing parallel commerce state.

## 5. Failed remove behavior

Remove no longer deletes, animates away or replaces a row with false empty state before Shopify confirms success. The affected row remains connected and `aria-busy`; only its buttons/input are temporarily disabled. On rejection the same row, quantity, properties, selling-plan/price markup and product link remain authoritative, the pending state clears and Retry is shown. Empty state can appear only in server-confirmed section markup.

## 6. Error and Retry

Line-level and component fallback alert regions handle Shopify validation errors, non-OK 4xx/5xx responses, network rejection, invalid JSON and absent/unexpected cart sections. A safe Shopify string is shown when supplied; malformed/technical failures use the localized generic message. Retry retains only the last recoverable absolute line intent, is single-flight, and cannot modify a different line. The retained error is reapplied if another queued or external morph occurs and is cleared when the user retries or begins a new operation.

New public labels are locale-backed through `actions.retry` and `content.cart_update_error`; matching entries are present in all 31 storefront locales.

## 7. Properties, selling plans and discounts

Native `cart.items` and line keys remain the source of truth. `snippets/cart-products.liquid` still owns Variant options, Product/Variant URLs/media, public line properties, upload properties, underscore-prefixed private-property suppression, selling-plan allocation names, nested/bundle relationships, `item.instructions`, unit prices, compare-at/original/final prices and line discounts. `snippets/cart-summary.liquid` still owns cart discounts, subtotal/estimated total, tax/shipping information and localized money.

The isolated morph fixture verified public property, private-property hiding, selling-plan text and discount text. Real upload properties, bundle parents/components, app-controlled lines, same-Variant/different-property lines and compare-at/Markets combinations remain representative development-data cases.

## 8. `/cart` fallback

The header drawer action is now a real `<a href="{{ routes.cart_url }}">`. `HeaderActions.openCartDrawer()` intercepts only an ordinary unmodified primary click and only after `#cart-drawer` upgrades and exposes `toggle()`. If JavaScript is disabled, a module fails or the drawer is absent, navigation is not prevented. The existing server-rendered `/cart` form and its native Checkout submit remain unchanged.

## 9. Accessibility

Pending state is exposed on the component, affected row and quantity selector with `aria-busy`; only affected controls are disabled and unrelated links remain available. Error output uses `role="alert"`; Retry and Remove are named localized controls with minimum touch targets. Native focus-visible and reduced-motion infrastructure remains unchanged.

An isolated browser fixture importing the real `assets/theme-drawer.js` and `assets/focus.js` passed:

- desktop open/dialog synchronization, initial close-button focus, forward Tab wrap, outside-focus redirection, Escape, original-trigger restoration and restoration to a fresh Section Rendering replacement;
- mobile modal open/focus, Escape, original/fresh-trigger restoration and backdrop close.

Nested live app/bundle dialogs still require representative development-theme validation.

## 10. Responsive result

Exact CSS iframe viewports were used to avoid Chromium's Windows minimum outer-window width. The 1440×900, 1024×768, 768×1024, 390×844 and 360×800 LTR cases plus 390×844 RTL all reported:

- root positive horizontal overflow: 0;
- drawer positive horizontal overflow: 0;
- media box: 80×80 px;
- standard Checkout fully inside the viewport;
- no Continue shopping text in the drawer;
- private test property not visible.

Long Product/property text wraps and the quantity/Remove controls wrap without widening the drawer.

## 11. Theme Editor

No new setting or commercial state was added. Existing global cart settings continue to own drawer type, auto-open, note, discount, installments, accelerated checkout, media sizing and colors. Hydration fixtures exercised repeated inner markup replacement without creating a new cart component/store and verified fresh-trigger focus restoration.

Actual Theme Editor reloads, setting toggles, design-mode lifecycle and hide/show behavior are **not executed** because uploading to development theme `193260781938` was explicitly prohibited. They remain acceptance gates.

## 12. Functional tests

The final isolated functional browser run passed 23 assertions:

- rapid same-line coalescing and correct line-key payload;
- two-line FIFO serialization with maximum one active request;
- active/queued `aria-busy` states;
- Shopify 422 message and Retry;
- single-flight Retry;
- recoverable HTTP 500, network, invalid JSON and missing-section failures;
- local/external overlap reconciliation;
- protection against an older external response;
- survival of separate external lines and public line data;
- failed remove retention and server-confirmed successful remove;
- enhanced drawer click and missing-module native cart fallback.

The native drawer suites added seven desktop and six mobile assertions. The visual suite added five exact LTR viewport cases and one exact RTL case. These fixtures mocked Shopify responses; they did not mutate a store.

## 13. Theme Check and technical validation

- JSON/JSONC: **PASS**, 67 files parsed.
- Liquid `{% schema %}` JSON: **PASS**, 158 schemas parsed.
- Duplicate setting IDs: **PASS**, 0 found.
- Modified JavaScript `node --check`: **PASS**.
- New hardcoded Product/Variant IDs, price/currency or market/cart URLs: **PASS**, none introduced.
- Excluded feature/claim scan: **PASS**.
- `git diff --check`: **PASS**.
- Shopify Theme Check: **EXECUTED ONCE; RUN FAILED, THEN SOURCE CORRECTED WITHOUT A SECOND RUN**. The sole run inspected 355 files and reported 62 offenses across 30 files: 56 `MatchingTranslations` errors because the two new keys were absent from 28 locales, plus the six inherited Horizon warnings (one `ExcessiveSettingsCount` in `sections/header.liquid` and five `UnusedDocParam` warnings in `snippets/divider.liquid`). The 28 missing locale pairs were added immediately afterward. Direct post-correction checks confirm both keys in all 31 storefront locales and successful strict JSON parsing of all 30 non-default storefront locale files; the default JSONC file had already passed the full parser. Theme Check was not repeated because this task explicitly required one run only.

## 14. Regression checks

Diff isolation confirms no change to `assets/product-form.js`, Product form/add-on batching, PDP composition, Variant Picker, swatches, gallery, sticky ATC, long-form sections, Product/Variant data, pricing, inventory, media or checkout implementation. Native cart note, discount, accelerated checkout, cart icon/count, Section Renderer and theme drawer modules were reused rather than forked. No free-shipping bar, promotion, timer, recommendation, upsell, gift, new bundle, testimonial or external library was added.

Real end-to-end PDP add, quick add, app standard action, Checkout and bfcache/cart-count regression remains development-theme evidence rather than a local mock claim.

## 15. Data-dependent coverage boundaries

Development-theme validation and final isolated empty-cart closure are complete. The following combinations were not present in the approved store data and remain documented conditional scenarios rather than TASK-005 blockers:

- one/multiple lines, main Product plus real add-ons and same-Variant/different-property lines;
- upload properties, selling plan, bundle parent/components, nested/app-controlled line instructions;
- compare-at, line/cart discounts, note settings, accelerated checkout absent/present;
- PDP, quick add and external app overlap, cart-count/live-region and bfcache behavior;
- Theme Editor reload/toggles and nested dialog stacking;
- English, Spanish/German long content, RTL, Markets money and optional currency codes;
- real server Checkout preservation of every line/property.

The separately documented `assets/product-form.js` multi-item add-on JSON boundary for Product-form properties/selling plan remains out of TASK-005 and was not changed.

## 16. Local implementation-phase Git status snapshot — 2026-09-14

The final `git status --short` is:

```text
 M CHANGELOG.md
 M PROJECT_STATUS.md
 M TASKS.md
 M assets/component-cart-items.js
 M assets/header-actions.js
 M docs/DECISIONS.md
 M docs/QA_MATRIX.md
 M docs/TECHNICAL_ARCHITECTURE.md
 M locales/bg.json
 M locales/cs.json
 M locales/da.json
 M locales/de.json
 M locales/el.json
 M locales/en.default.json
 M locales/es.json
 M locales/fi.json
 M locales/fr.json
 M locales/hr.json
 M locales/hu.json
 M locales/id.json
 M locales/it.json
 M locales/ja.json
 M locales/ko.json
 M locales/lt.json
 M locales/nb.json
 M locales/nl.json
 M locales/pl.json
 M locales/pt-BR.json
 M locales/pt-PT.json
 M locales/ro.json
 M locales/ru.json
 M locales/sk.json
 M locales/sl.json
 M locales/sv.json
 M locales/th.json
 M locales/tr.json
 M locales/vi.json
 M locales/zh-CN.json
 M locales/zh-TW.json
 M snippets/cart-drawer.liquid
 M snippets/cart-products.liquid
 M snippets/cart-summary.liquid
 M snippets/header-actions.liquid
 M snippets/scripts.liquid
 M tasks/TASK-005-CART-DRAWER.md
?? reports/TASK-005-AUDIT.md
?? reports/TASK-005-RESULT.md
```

At that local checkpoint, the index was empty (`git diff --cached --name-only` returned no paths), the pre-existing audit changes remained present, and no remote Shopify operation had yet occurred. Section 18 supersedes the remote-validation status.

## 17. TASK-005 status confirmation

- TASK-002: `DONE`.
- TASK-003: `DONE`.
- TASK-004: `DONE`.
- TASK-005: `DONE`.
- TASK-006: `DRAFT`, not started.

Local implementation and development-theme validation are complete. The final isolated empty-cart closure recorded below moves TASK-005 to `DONE`.

## 18. Final development-theme validation — 2026-09-16

### Static and destination gates

- Final-phase Theme Check ran once after the locale correction: 355 files inspected, zero errors, and only the six unchanged Horizon warnings (one `ExcessiveSettingsCount` in `sections/header.liquid`, five `UnusedDocParam` in `snippets/divider.liquid`).
- `actions.retry` and `content.cart_update_error` are present in all 31 storefront locales. All 30 strict locale JSON files and `en.default.json` as JSONC parse successfully.
- Theme list verification showed `193260781938` as `development` and protected theme `192527597938` as `live`. The working tree was pushed only to `193260781938`; the later runtime correction uploaded only `assets/component-cart-items.js` and `snippets/cart-products.liquid` to that same development theme.

### Real preview evidence

- The current feeder was added from the PDP. A second valid Variant (`62294853222770`) rendered as a separate line from Variant `62294853190002`, with distinct native line keys and readable Variant titles.
- Increment, decrement, and server-confirmed remove passed. Rapid same-line increments converged on the final intended quantity; consecutive changes across two lines remained FIFO-serialized, exposed `aria-busy`, produced no duplicate or stale lines, and left no stuck controls.
- Real count, subtotal, 80×80 media, product links, black full-width Checkout, accelerated PayPal output, native `/cart`, and the native cart form passed. Checkout opened with `preview_theme_id=193260781938`; the summary was present and no order was completed.
- Drawer Close received initial focus; Escape closed the drawer and returned focus to the cart trigger; reverse traversal remained contained. Desktop used the nonmodal drawer behavior and 768 px and below used modal behavior.
- Exact preview measurements passed at 1440×900, 768×1024, 390×844, and 360×800 with no positive horizontal overflow, undistorted 80×80 media, and visible 52 px Checkout. Mobile transition completion required a longer automation wait before measurement but reached the correct stable geometry.
- PDP gallery navigation, Style and Color radios, Variant URL/price updates, Add to Cart, Product form, accelerated checkout, and the two real data-backed long-form sections remained functional. Missing add-ons, delivery, properties, selling plans, discounts, bundle/app lines, compare-at, and remaining long-form content were correctly not invented.
- Browser-console inspection on a fresh preview load produced no warnings or errors. The real rendered error attribute initially exposed a double-escaped apostrophe; the scoped two-file correction was uploaded and the DOM then rendered `We couldn't update your cart. Please try again.` correctly.

### Isolated empty-cart closure and definitive status

A managed named Chrome tab was first discarded after read-only DOM evidence showed five rows and count 17, exactly the shared cart. A genuinely new visible Chrome profile was then launched with a unique temporary `--user-data-dir`; the user manually completed the normal storefront password step without exposing the password to automation. No cookie, credential, or primary-browser profile data was read, copied, or saved.

The authenticated isolated cart began with `item_count: 0`, zero items, zero total, zero line rows, the native `/cart` link, and drawer empty markup. The drawer opened with focus on Close and contained no Continue shopping, Checkout, or subtotal. The test added exactly one valid current-product Variant, `62294853190002` (`Individual packaging / WiFi White RemoteControl / Black`), producing count 1, subtotal `$129.99 USD`, and native line key `62294853190002:b6a00faaf4df7311e236fccf9d03be13`. After explicit confirmation, only that keyed line was removed.

Shopify returned the isolated cart to `item_count: 0`, zero items, zero total, and zero rows. The still-open drawer had the correct empty heading/account message and no Continue shopping, Checkout, subtotal, product image, quantity control, visible inherited error, stale line key, or stuck `aria-busy`. Exact empty-state measurements passed at 1440×900 (480 px right drawer), 390×844 (full-width modal), and 360×800 (full-width modal), each with zero positive root/drawer overflow and visible heading/Close. On a clean reload, initial focus reached Close; keyboard focus stayed inside the modal, Close worked, and Escape closed and restored the Cart trigger.

Direct `/cart` navigation preserved zero items/zero total, count 0, no cart rows, Checkout, or subtotal, and correctly retained Continue shopping on the full cart page only. After deliberate navigation/reload activity settled, console/runtime/network inspection reported no errors, uncancelled failures, or HTTP responses ≥400. The shared cart was never mutated. All Chrome processes tied to the temporary profile were stopped and the profile directory was removed.

TASK-005 is `DONE`. This closure changed no code, repeated no Theme Check, uploaded no theme file, and made no product, Variant, price, inventory, SEO, handle, media, metafield, metaobject, app, active-theme, publication, order, stage, commit, or Git push change.

Final repository state remains branch `main` at `2a3f975`, with 45 tracked modified paths and two untracked TASK-005 reports. The index is empty; no commit or push was made. Final JavaScript syntax, 31-locale parsing/parity, and `git diff --check` pass. Line-ending notices are informational working-copy warnings only.

## 19. Fresh pre-commit verification — 2026-09-20

The final post-correction working tree was re-audited before staging. All 47 changed/untracked paths belong exclusively to TASK-005; no secret, credential, cookie, conflict marker, archive, patch, log, screenshot, trace, profile, or temporary artifact was found. The repository contains no persisted TASK-005 test runner or fixture files to rerun; the previously recorded 23 mutation/event, seven desktop drawer, six mobile drawer, and exact-viewport fixture results remain historical evidence rather than a fresh automated-suite claim.

- JSON/JSONC: **PASS**, all 68 files parsed.
- Storefront locales: **PASS**, 31 locales contain every default-locale key plus any language-specific plural extensions; `actions.retry` and `content.cart_update_error` are present and nonblank in all 31.
- Liquid schemas: **PASS**, all 158 `{% schema %}` payloads parsed.
- Duplicate setting IDs: **PASS**, zero found across schema setting arrays.
- Modified JavaScript: **PASS**, `node --check` passed for `assets/component-cart-items.js` and `assets/header-actions.js`.
- `git diff --check`: **PASS**; only informational LF-to-CRLF working-copy notices were emitted.
- Shopify Theme Check 4.8.0: **PASS WITH INHERITED WARNINGS**, one fresh run inspected 355 files with zero errors and exactly six warnings: one `ExcessiveSettingsCount` in `sections/header.liquid` and five `UnusedDocParam` warnings in `snippets/divider.liquid`.
- Warning provenance: **PASS**, `git diff --name-only -- sections/header.liquid snippets/divider.liquid` returned no paths, confirming TASK-005 neither modified those surfaces nor created their warnings.

No Git push, theme push, publish, Shopify data mutation, or other remote operation was performed during this checkpoint.
