# TASK-007 — Reviews integration

**Status:** DRAFT  
**Depends on:** Reviews provider and data policy selected; PDP stable  
**Gate owner:** ChatGPT Work

## Objective

Integrate authentic verified reviews through a provider-independent theme boundary, with deferred loading and a single rating/count source for UI and structured data.

## Read first

- `AGENTS.md`
- `docs/CONTENT_MATRIX.md`
- `docs/ANALYTICS_PLAN.md`
- `docs/QA_MATRIX.md`
- `docs/DECISIONS.md`
- Provider documentation supplied/approved for this task

## Scope

- Provider adapter or app-block integration with minimal theme coupling.
- Rating summary near the purchase block.
- Main review experience with filters/media only when supported.
- Verified-buyer visual treatment.
- Lazy/deferred loading and graceful provider failure.
- Rating and count consistency with Product schema.
- Independent A/B review sections only if Work explicitly confirms the experiment design.

## Out of scope

- Fabricating/importing reviews without evidence and rights.
- Hardcoding rating/count.
- Loading provider scripts globally when only PDPs need them.

## Acceptance criteria

- [ ] UI and structured data show the same approved rating/count.
- [ ] Stars use `#FF6201`; Verified Buyer uses `#3897F0`.
- [ ] Core PDP remains usable before/without provider load.
- [ ] Duplicate provider scripts/widgets are prevented.
- [ ] Keyboard, filters, media, mobile, and failure states are verified.

## Required handoff

Create `reports/TASK-007-RESULT.md` and do not begin TASK-008.

