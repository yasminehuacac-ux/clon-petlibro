# Task registry

| ID | Task | Status | Prerequisite | Gate owner |
|---|---|---|---|---|
| TASK-001 | Baseline audit and reuse map | DONE | Project control pack | Work |
| TASK-002 | RELIVANOW design system | DONE | TASK-001 approved + local toolchain verified | Work |
| TASK-003 | Shopify data model | DONE | TASK-001/002 + commercial data | Work |
| TASK-004 | PDP purchase area | DONE | TASK-002/003 + product assets | Work |
| TASK-005 | Cart drawer and AOV | DRAFT | TASK-004 + offer rules | Work |
| TASK-006 | PDP storytelling | DRAFT | TASK-004 + approved content | Work |
| TASK-007 | Reviews integration | DRAFT | Provider selected | Work |
| TASK-008 | Home | DRAFT | Shared systems approved | Work |
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

Work approved the documentation-only Shopify data model and TASK-003 is `DONE`. Work then approved TASK-004 validation against the current Product through unpublished development theme `193260781938`. The complete purchase panel and 16 long-form modules passed static, Theme Editor, real-data, fail-closed, and exact-width development-preview validation. Five confirmed Product metafield definitions/values were added after preserving the prior state; no price, variant, inventory, handle, SEO, media, live-theme, or publication change occurred. TASK-004 is `DONE`; unavailable approved assets and third-party/merchandising data remain separate follow-up gates. TASK-005 remains `DRAFT` and unstarted.
