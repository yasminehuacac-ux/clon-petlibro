# TASK-005 — Cart Drawer audit

**Status:** READY

**Audit date:** 2026-09-13

**Baseline:** `2a3f975 feat: complete RELIVANOW product data model and PDP`

**Scope:** Local architecture and documentation only. No theme code, Shopify data, theme upload, publication, staging or commit.

## Executive conclusion

Horizon 4.1.1 already provides the correct foundation for the RELIVANOW Cart Drawer: one native dialog, one cart-items component, Shopify Cart API routes, standard cart events, section rendering with morphing, cart-count announcements, native checkout and conditional accelerated checkout. TASK-005 must extend that system; it must not create a parallel cart, event bus or client-side price store.

The presentation can be brought to the approved premium, mobile-first direction within the existing drawer. Before implementation is considered complete, the native mutation path needs explicit protection for failed removals, user-visible network/server errors with retry, and concurrent requests. The header also needs a real `/cart` destination when JavaScript is unavailable. These are implementation requirements, not changes made during this audit.

One adjacent PDP risk was found: the RELIVANOW multi-item add-on JSON path in `product-form.js` rebuilds items from IDs and quantities, so Product form properties or a selling plan could be omitted when add-ons are selected. The Cart Drawer itself correctly preserves and renders existing properties and selling plans. Because TASK-005 forbids changing `product-form.js`, this finding is documented as a protected boundary for separate authorization and is not silently absorbed into drawer work.

## 1. Current files responsible for the cart

### Render and composition

| File | Current responsibility |
|---|---|
| `layout/theme.liquid` | Mounts the global cart drawer on non-cart pages. |
| `sections/cart-drawer-section.liquid` | Section Rendering API target for the drawer. |
| `sections/main-cart.liquid` | Full `/cart` page and server-rendered fallback surface. |
| `templates/cart.json` | Composes the cart page. |
| `snippets/cart-drawer.liquid` | Owns `#cart-drawer`, the native dialog shell and hydrated drawer interior. |
| `snippets/theme-drawer.liquid` | Shared drawer/dialog wrapper and close control. |
| `snippets/header-actions.liquid` | Header cart trigger, count and drawer relationship. |
| `snippets/cart-items-component.liquid` | Shared custom-element host for cart lines and summary. |
| `snippets/cart-products.liquid` | Line-item rendering, quantity/remove controls, properties, selling plans, prices, discounts and bundle relationships. |
| `snippets/cart-summary.liquid` | Discounts, note, totals, standard checkout and conditional accelerated checkout. |
| `snippets/cart-bubble.liquid` | Header and drawer item count. |
| `snippets/cart-disclosure-tooltip.liquid` | Accessible disclosure content used by cart lines. |
| `snippets/quantity-selector.liquid` | Native quantity-control markup and constraints. |
| `blocks/_cart-products.liquid` | Native cart-products block boundary. |
| `blocks/_cart-summary.liquid` | Native cart-summary block boundary. |
| `blocks/_cart-title.liquid` | Native cart heading block. |

### Runtime and events

| File | Current responsibility |
|---|---|
| `assets/cart-drawer.js` | Opens the drawer after eligible cart updates and coordinates quick-add modal timing. |
| `assets/theme-drawer.js` | Native dialog lifecycle, responsive modal/squeeze behavior, focus containment, Escape/backdrop close and focus return. |
| `assets/dialog.js` | Shared dialog base behavior. |
| `assets/component-cart-items.js` | `/cart/change` mutations, section requests, morphing, loading state and cart error/event handling. |
| `assets/component-cart-quantity-selector.js` | Quantity and remove intent from a cart line. |
| `assets/component-quantity-selector.js` | Shared quantity validation and control behavior. |
| `assets/cart-discount.js` | `/cart/update` discount mutation and cart refresh. |
| `assets/cart-note.js` | Debounced `/cart/update` note mutation. |
| `assets/cart-icon.js` | Cart icon/count behavior. |
| `assets/header-actions.js` | Header action behavior around the cart trigger. |
| `assets/standard-actions-override.js` | Refreshes native cart sections after compatible standard actions. |
| `assets/events.js` | Standard Shopify cart event names and event classes. |
| `assets/standard-events.d.ts` | Event payload contracts. |
| `assets/section-renderer.js` | Section fetching and rendering support. |
| `assets/morph.js` | DOM morphing while preserving declared nodes. |
| `assets/component.js` | Base component/ref lifecycle used by cart custom elements. |
| `snippets/scripts.liquid` | Imports the modules and publishes localized Cart API route values. |

### Configuration

| File | Current responsibility |
|---|---|
| `config/settings_schema.json` | Global cart type, auto-open, note, discount, installments, accelerated checkout, empty link, thumbnail and drawer-color controls. |
| `config/settings_data.json` | Current local setting values. Effective cart type is `drawer`; discount entry is enabled and cart note is disabled. |

## 2. Current data and event flow

```text
Header cart trigger
  -> theme-drawer / native dialog
  -> cart-drawer-component
  -> cart-items-component

Quantity or remove intent
  -> cart-quantity-selector event
  -> POST routes.cart_change_url
     with line key/line, quantity and every mounted cart section ID
  -> Shopify section HTML
  -> morph the matching cart-items-component
  -> CartUpdateEvent (shopify:cart:lines-update)
  -> drawer/count/other mounted cart surfaces synchronize

Discount or note intent
  -> POST routes.cart_update_url
  -> section HTML and/or standard cart event
  -> the same native render/event path

PDP, quick add, app or standard action
  -> CartUpdateEvent or CartErrorEvent
  -> cart-drawer-component and cart-items-component react
  -> optional configured drawer open after successful add
```

The drawer section is requested as `cart-drawer-section`. Its inner node uses `data-hydration-key="cart-drawer-inner"`; the outer drawer uses `data-skip-node-update`, allowing the contents to morph without replacing the open dialog shell. This is the required update boundary.

The cart bubble consumes the native cart update event and maintains a back-forward-cache correction through session storage. It displays absolute `cart.item_count`; no independent count calculation is needed.

## 3. Native components to reuse

- `theme-drawer` and the native `dialog` as the only drawer shell.
- `cart-drawer-component` for open-after-add behavior.
- `cart-items-component` as the single line and summary refresh owner.
- The existing quantity selector, line-key mutation and Section Rendering API flow.
- Standard `shopify:cart:lines-update`, cart error, note, discount and cart-view events.
- The existing hydration key, morphing and skip-node-update contract.
- Native line rendering for public line-item properties, selling-plan names, parent/nested lines, bundle components and application-controlled instructions.
- Shopify-calculated original/final prices, line/cart discounts, unit price, subtotal/estimated total, tax/shipping text and localized money.
- The native cart form, standard Checkout and Shopify-rendered accelerated checkout.
- Existing global cart Theme Editor settings and locale system.
- Native cart page `/cart` as the progressive fallback.

## 4. Problems and risks found

| Priority | Finding | Impact | Required treatment |
|---|---|---|---|
| Critical | Remove currently deletes the row optimistically before Shopify confirms the mutation. | A rejection can leave the authoritative line absent from the DOM; the error path may no longer find its input, and removing the final line can show a false empty state. | Do not destructively remove the row before success. Preserve or restore authoritative content on every failure. |
| High | Network errors, non-OK responses and invalid JSON emit an error event but have no reliable drawer-level visible recovery UI. | A shopper can see a stale cart with no actionable explanation. | Provide localized inline error plus explicit Retry, assertive announcement and complete pending-state cleanup. Do not hide Shopify messages. |
| High | Cart mutations are not one serialized transaction stream. Section responses from quantity, discount, note, PDP, quick add, apps or standard actions can overlap. | An older response may overwrite a newer cart state; aborting a fetch cannot guarantee Shopify did not receive a mutation. | Coalesce undispatched same-line intent and serialize dispatched mutations; never treat abort as rollback. Reconcile through the authoritative section response. |
| High | The header drawer trigger is a button with JavaScript-only behavior. | Without JavaScript, the shopper cannot reach the otherwise functional `/cart` page from that action. | Make the cart action navigate to `routes.cart_url` without JS while enhancing it into the native drawer when JS is available. |
| Medium | Mobile cart media uses `clamp(2.5rem, 15cqi, 7.5rem)`, approximately 53 px in the 25rem drawer. | It does not meet the target hierarchy of approximately 80×80 px. | Adjust drawer-scoped media sizing without changing Product media behavior elsewhere. |
| Medium | Empty drawer currently exposes Continue shopping. | Conflicts with the approved minimal empty state. | Remove it from drawer output while preserving heading, close control and accessibility. Do not remove useful fallback navigation from the cart page unless separately approved. |
| Medium | Pending state relies mainly on pointer-event suppression and shimmer treatment. | Keyboard, assistive technology and cross-source mutation protection are incomplete. | Add semantic disabled/`aria-busy` behavior and guarantee cleanup on success, error and exception. |
| Medium | New retry/error wording is not present in the inspected locale keys. | Hardcoded text would break localization. | Add locale keys only if implementation requires new shopper-facing text, across every supported locale. |
| Boundary | The add-on batch path in `product-form.js` constructs JSON line items from IDs and quantities only. | Product-form properties or selling-plan values may be lost when add-ons are selected. | Keep drawer line identity lossless. Resolve the originating PDP path only under separate authorization because `product-form.js` is excluded from this phase. |

No evidence was found that a new cart store, external library, custom price engine, bundle engine or replacement checkout is necessary.

## 5. Proposed architecture

### Ownership

The server-rendered Shopify cart remains authoritative. `cart-items-component` remains the single UI refresh boundary, and standard cart events remain the integration contract for PDP, quick add, applications and other theme surfaces. The drawer may coordinate presentation and request ordering, but it must not duplicate cart contents, totals or prices in long-lived client state.

### Mutation lifecycle

1. Validate and identify a line by its Shopify line key and native constraints.
2. Coalesce rapid, not-yet-dispatched changes for the same line.
3. Serialize dispatched cart mutations so one authoritative response is applied at a time.
4. Mark the affected controls and cart component pending with semantic state.
5. Keep the current line in the DOM until Shopify confirms success.
6. On success, morph the native section and emit/consume the standard event once.
7. On Shopify validation, HTTP, parse, timeout or network failure, retain/restore the last authoritative view, show the real useful message and expose Retry.
8. Clear pending state in every settle path and allow a new attempt without duplicate submission.

### Presentation boundary

The drawer remains white with black and neutral-gray typography, subtle separators, approximately 80×80 px mobile thumbnails, clear product/variant/price/quantity hierarchy and a full-width black Checkout. Empty state contains no Continue shopping action. Styling is drawer-scoped so the full cart page and PDP do not regress.

### Compatibility boundary

Every successful render must preserve line key, public and upload properties, hidden underscore-property rules, selling-plan allocation/name, parent/nested relationships, component lines, `item.instructions`, discounts, compare-at/original/final/unit prices and application output. Main Products and add-ons remain separate lines. No grouping by Product or Variant ID is permitted.

### Accessibility and progressive enhancement

Retain the native dialog, initial focus, keyboard loop, Escape/backdrop handling, nested-dialog stacking and focus return. Loading, total, count, success and error announcements must not duplicate. With JavaScript disabled, the header cart action must reach `/cart`, where the server-rendered native form and Checkout remain usable.

## 6. Files planned for implementation

### Expected edit surface

- `snippets/cart-drawer.liquid`
- `snippets/cart-products.liquid`
- `snippets/cart-summary.liquid`
- `snippets/header-actions.liquid`
- `assets/component-cart-items.js`
- `assets/cart-drawer.js`
- The relevant `locales/*.json` files only if new error/retry copy is required

### Reuse and regression surface, not presumed edits

- `assets/theme-drawer.js`
- `assets/dialog.js`
- `assets/component-cart-quantity-selector.js`
- `assets/component-quantity-selector.js`
- `assets/cart-discount.js`
- `assets/cart-note.js`
- `assets/events.js`
- `assets/section-renderer.js`
- `assets/morph.js`
- `snippets/cart-items-component.liquid`
- `snippets/cart-bubble.liquid`
- `snippets/cart-disclosure-tooltip.liquid`
- `sections/cart-drawer-section.liquid`
- `sections/main-cart.liquid`
- `config/settings_schema.json`

`assets/product-form.js` is audit-only and explicitly excluded from TASK-005 implementation unless the user separately authorizes the adjacent PDP fix.

## 7. Required states and errors

| State | Required behavior |
|---|---|
| Closed | Header count remains correct; no trapped focus or hidden page interaction. |
| Opening/open | One drawer only; close receives initial focus; background interaction follows native modal/squeeze mode. |
| Editing quantity | Native min/max/increment rules and trailing debounce apply; line key remains the mutation identity. |
| Removing | Line remains visible in pending form until confirmed; final-line empty state is server-confirmed. |
| Loading | Affected controls are semantically busy/disabled; totals/row provide stable feedback; duplicate mutation is blocked. |
| Success | One authoritative section morph; count, totals and live region update once; focus lands predictably. |
| Shopify validation error | Exact useful Shopify error is visible and announced; current authoritative cart stays available. |
| HTTP or invalid-response error | Localized fallback message and Retry appear; no false success/empty state. |
| Offline, timeout or network rejection | Same recovery contract; retry creates only one new request. |
| Concurrent intent | Undispatched same-line intent coalesces; dispatched mutations serialize; stale responses do not win. |
| Empty | Clean localized message and close; no Continue shopping, recommendations, fake offer, summary or stranded loader. |
| Checkout | Standard full-width Checkout is primary; conditional accelerated checkout is platform-controlled. |

## 8. Responsive and accessibility matrix

| Viewport/state | Visual expectation | Interaction/accessibility expectation |
|---|---|---|
| 360×800 | Overlay drawer fits the viewport; ~80×80 media; long titles, options, properties and money wrap without horizontal overflow. | 44 px targets, visible focus, trapped modal focus, Escape/backdrop close and trigger restoration. |
| 390×844 | Stable mobile hierarchy with multiple lines, discount state and long translations. | Quantity, remove, error and Retry have accessible names and one announcement each. |
| 768×1024 | Multiple lines scroll independently from a usable summary/Checkout region. | Logical order through header, lines, disclosures, summary and checkout. |
| 1024×768 | Existing ≥990 px squeeze mode and 25rem drawer do not overlap content or create root overflow. | Custom focus loop and nested modal/Escape priority remain correct. |
| 1440×900 | Subtle dividers, fixed drawer width and summary behavior never obscure the last line. | Repeated open/close, restored-session state and fresh-trigger focus return pass. |
| Reduced motion | State never depends on motion; existing duration gates collapse transitions. | Loading, error, Retry and focus remain fully functional. |
| No JavaScript | Header cart action reaches `/cart`; page form, cart contents and Checkout remain server accessible. | Limitations in AJAX quantity/removal are documented, not disguised. |

Test with keyboard alone, visible focus, accessibility tree/live regions, browser back-forward cache, representative English/Spanish/German strings, RTL, localized money, optional currency code and item counts above 99.

## 9. Acceptance criteria

- Exactly one native cart/drawer state and one standard event path exist.
- Header click, optional auto-open, quick-add deferral, close, backdrop and Escape work without duplicate drawers or listeners.
- Focus enters, remains contained where applicable and returns to the connected trigger after close.
- Quantity and removal succeed for ordinary, nested, parent and application-controlled lines without losing identity or properties.
- Failed removal never leaves a false missing line or false empty cart.
- Validation, HTTP, parse, timeout, offline and network errors are visible, announced and retryable.
- Rapid intent and concurrent cart sources cannot allow stale section HTML to overwrite a newer result.
- Public/upload properties, selling plans, component lines, parent relationships and app instructions survive updates.
- Shopify-native prices, discounts, subtotal, tax/shipping text and checkout output remain authoritative.
- Main Product and add-ons remain separate lines; no hardcoded Product/Variant ID, price or URL is introduced.
- Mobile presentation matches the approved white/neutral direction with ~80×80 media and dominant full-width black Checkout.
- Empty drawer contains no Continue shopping, promotion, urgency, recommendations or fabricated claim.
- Cart bubble, total and error live regions update accurately without duplicate announcements.
- Global cart settings and Theme Editor reloads do not duplicate IDs, forms, dialogs, listeners or hydration targets.
- Language, currency, RTL, reduced-motion, 360/390/768/1024/1440 widths and no-JavaScript fallback pass.
- No external library, polling loop, parallel cart store or unnecessary eager JavaScript is added.

## 10. Explicitly out of scope

- Free-shipping progress or any unconfirmed shipping threshold.
- Recommendations, cross-sells, upsells, gifts or post-add offers.
- A new bundle system or merging Product/add-on lines.
- Invented discounts, urgency, timers, scarcity or commercial claims.
- Product, Variant, price, inventory, metafield, metaobject, media, Market or application changes.
- PDP changes, including `product-form.js`, without separate authorization.
- Changes to the active theme or any development-theme upload, publish or remote save.
- Code copied from Petlibro or any external cart library.

## 11. Git status at audit close

Verified local working tree after this report was written:

```text
 M PROJECT_STATUS.md
 M TASKS.md
 M docs/DECISIONS.md
 M docs/QA_MATRIX.md
 M docs/TECHNICAL_ARCHITECTURE.md
 M tasks/TASK-005-CART-DRAWER.md
?? reports/TASK-005-AUDIT.md
```

Staged files: none. HEAD remains `2a3f975`. No commit, push, theme push, publish, remote theme modification or Shopify data operation was performed. Theme Check was not repeated because this phase changes documentation only.

## Final state

- TASK-002: DONE
- TASK-003: DONE
- TASK-004: DONE
- TASK-005: READY

Implementation may begin locally from this frozen architecture. It may not claim completion until the code, isolated failure/concurrency cases, exact responsive widths, accessibility behavior, Theme Editor lifecycle and progressive fallback pass the matrix in `docs/QA_MATRIX.md`.
