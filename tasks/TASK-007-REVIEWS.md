# TASK-007 — Reviews integration

**Status:** DONE
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

- [x] UI and structured data are coherent for the authentic zero-review state: no false rating/count or `AggregateRating` is emitted.
- [x] Stars use `#FF6201`; the future authentic Verified Buyer treatment is mapped to `#3897F0`. The zero-review launch baseline requires no populated verified-buyer output.
- [x] Core PDP remains usable before/without provider load.
- [x] Duplicate provider scripts/widgets are prevented.
- [x] Keyboard, mobile, honest empty state, and graceful loading are verified for launch. Filters, customer media, pagination, populated schema, and verified-buyer output become post-review operational checks when authentic reviews exist.

## Technical checkpoint — 2026-09-20

- Judge.me was already installed before this session. No new permission, credential, paid-plan, or charge acceptance occurred; the exact plan tier remains unverified.
- Development theme `193260781938` contains one official Star Ratings block in the purchase header, one official Review Widget in the existing long-form app host, and the core app embed. Review data is set to `real_data`, shop reviews are off, and the official empty widget is enabled.
- The native Horizon rating block is disabled in this development template, so Judge.me is the single visible rating/review authority.
- The real Product currently has zero authentic reviews. The provider's `No reviews` and first-review CTA state is retained; no test review or false structured data was created.
- Live theme `192527597938` remained byte-identical across the protected before/after snapshot surfaces. No publish occurred.
- Work approved launch with the authentic provider-owned zero-review state. See `reports/TASK-007-RESULT.md` for the complete evidence and future populated-review checks.

## Required handoff

The launch-baseline result is recorded in `reports/TASK-007-RESULT.md`. Future populated-state verification must use authentic buyer reviews only; it is not a technical defect in this completed task.
