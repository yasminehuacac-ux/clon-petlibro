# Task registry

| ID | Task | Status | Prerequisite | Gate owner |
|---|---|---|---|---|
| TASK-001 | Baseline audit and reuse map | DONE | Project control pack | Work |
| TASK-002 | RELIVANOW design system | DONE | TASK-001 approved + local toolchain verified | Work |
| TASK-003 | Shopify data model | DONE | TASK-001/002 + commercial data | Work |
| TASK-004 | PDP purchase area | DONE | TASK-002/003 + product assets | Work |
| TASK-005 | RELIVANOW cart drawer | DONE | Approved real development-theme and isolated empty-cart validation | Work |
| TASK-006 | PDP storytelling | DONE | TASK-004 reconciliation, navigation closure, and development-theme QA complete | Work |
| TASK-007 | Reviews integration | IN PROGRESS | Technical integration validated; authentic populated reviews required for remaining acceptance | Work |
| TASK-008 | Home | DONE | Development-theme QA, Theme Editor, PDP/Cart regression, and handoff complete | Work |
| TASK-009 | Analytics and SEO | DRAFT | Events/providers/markets frozen | Work |
| TASK-010 | Final QA and release | DRAFT | TASK-001–009 complete | Work |

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

Judge.me's official core embed, Star Ratings block, and Review Widget are configured only on unpublished development theme `193260781938`. The native rating block is disabled there, the existing long-form `@app` host is reused, the real zero-review state is coherent, and no false rating/review schema is emitted. Live theme `192527597938` is byte-identical across the protected snapshot surfaces. Responsive, keyboard, Theme Editor, script/schema duplication, and read-only regression checks pass. TASK-007 remains `IN PROGRESS` because no authentic reviews exist to validate populated filters, customer media, pagination, verified-buyer output, and populated visible/schema consistency.
