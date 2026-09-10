# Task registry

| ID | Task | Status | Prerequisite | Gate owner |
|---|---|---|---|---|
| TASK-001 | Baseline audit and reuse map | DONE | Project control pack | Work |
| TASK-002 | RELIVANOW design system | DONE | TASK-001 approved + local toolchain verified | Work |
| TASK-003 | Shopify data model | DONE | TASK-001/002 + commercial data | Work |
| TASK-004 | PDP purchase area | DRAFT | TASK-002/003 + product assets | Work |
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

Work approved the documentation-only Shopify data model. TASK-003 is `DONE`; no remote Shopify data or media was changed. TASK-004 remains `DRAFT` and unstarted pending final approved assets, the primary hero color, the default color/variant, and approved final native associations between `product.media` and variants.
