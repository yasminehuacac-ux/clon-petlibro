# TASK-002 — RELIVANOW design system

**Status:** DRAFT  
**Depends on:** TASK-001 approved  
**Gate owner:** ChatGPT Work

## Objective

Implement the approved RELIVANOW visual system through Horizon's existing settings-to-token pipeline and shared primitives, without building page-specific marketing sections.

## Read first

- `AGENTS.md`
- `reports/TASK-001-RESULT.md`
- `docs/BRANDING_DESIGN_SYSTEM.md`
- `docs/TECHNICAL_ARCHITECTURE.md`
- `docs/ENGINEERING_RULES.md`
- `docs/QA_MATRIX.md`
- `docs/DECISIONS.md`

## Scope

- Map approved brand colors, typography, spacing, radius, border, motion, and layout to Horizon settings/tokens.
- Use Inter as the implementation font.
- Establish semantic component tokens for buttons, badges, price, rating, inputs, variant controls, cards, and drawers.
- Align shared primitives with the brand while preserving Horizon behavior.
- Support default, hover, focus-visible, active, disabled, loading, error, sale, success, and verified states.
- Document any necessary settings migration and Theme Editor impact.

## Out of scope

- PDP/Home section construction.
- Product data/metafield creation.
- Cart upsells, reviews providers, analytics, or apps.
- Copying PETLIBRO stylesheets or exact proprietary assets.

## Acceptance criteria

- [ ] Tokens flow through Horizon's established pipeline.
- [ ] No repeated hardcoded palette/spacing values across components.
- [ ] Existing theme functionality and editor controls remain valid.
- [ ] Contrast, focus, touch target, and reduced-motion requirements pass.
- [ ] Desktop/mobile primitives are visually consistent.
- [ ] Theme Check and relevant validation pass with no new errors.

## Required handoff

Create `reports/TASK-002-RESULT.md`, update project control files, and do not begin TASK-003.

