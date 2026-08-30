# TASK-005 — Cart drawer and AOV

**Status:** DRAFT  
**Depends on:** TASK-004 approved; offers, compatibility, margins, and discount engine frozen  
**Gate owner:** ChatGPT Work

## Objective

Complete a reliable AJAX cart drawer and implement approved add-ons, bundles, free-shipping progress, and relevant cross-sells without breaking Shopify line-item or discount behavior.

## Read first

- `AGENTS.md`
- Approved reports for TASK-001–004
- `docs/CONVERSION_BLUEPRINT.md`
- `docs/DATA_MODEL.md`
- `docs/CONTENT_MATRIX.md`
- `docs/QA_MATRIX.md`
- `docs/DECISIONS.md`

## Scope

- Product line, variant, quantity, remove, price, discount, savings, subtotal, and checkout.
- AJAX updates without PDP redirects.
- Real free-shipping progress by the approved market logic.
- Up to three compatible product cross-sells.
- Approved PDP add-ons/bundle line behavior and duplicate prevention.
- Error, race, stale section, empty cart, and recovery states.
- One dominant checkout CTA; mobile viewport discipline.

## Out of scope

- Fake urgency or countdowns.
- Unsupported checkout customization.
- Unapproved discount/subscription apps.
- Home or reviews implementation.

## Acceptance criteria

- [ ] Add, increment, decrement, remove, empty, upsell, and checkout flows work without reload/redirection bugs.
- [ ] Totals, savings, discounts, and shipping progress use real cart/market data.
- [ ] Rapid interactions do not create stale or duplicate state.
- [ ] Cross-sells do not hide the checkout summary on mobile.
- [ ] Focus and announcements are accessible after updates.
- [ ] End-to-end QA passes for every approved variant/offer combination.

## Required handoff

Create `reports/TASK-005-RESULT.md` with an end-to-end purchase-flow matrix. Do not begin TASK-006.

