# TASK-010 — Final QA, performance, and release candidate

**Status:** DRAFT  
**Depends on:** TASK-001–009 approved; release data and access available  
**Gate owner:** ChatGPT Work

## Objective

Run the full technical, functional, responsive, accessibility, SEO, analytics, performance, Theme Editor, and regression matrix; fix in-scope defects; prepare a release candidate without publishing it.

## Read first

- `AGENTS.md`
- All approved task reports
- `docs/QA_MATRIX.md`
- `docs/RELEASE_CHECKLIST.md`
- `docs/DECISIONS.md`
- `PROJECT_STATUS.md`
- `CHANGELOG.md`

## Scope

- Verify Git state and release scope.
- Run Theme Check and available static validation.
- Test all variants, gallery, product form, cart, offers, reviews, navigation, search, Home, and checkout handoff.
- Test Theme Editor add/remove/reorder/reload.
- Test baseline viewports and agreed browsers/devices.
- Audit keyboard, focus, live regions, labels, contrast, touch, and reduced motion.
- Validate structured data, analytics, localization, and market copy.
- Measure LCP, CLS, INP, media payload, custom JS, and third-party behavior.
- Fix P0/P1 and approved P2 regressions without expanding scope.
- Prepare release notes, archive/version/tag recommendation, rollback plan, and unresolved-defect list.

## Out of scope

- Publishing or pushing the live theme without separate explicit authorization.
- New features or design exploration.
- Hiding failed checks or lowering acceptance thresholds silently.

## Acceptance criteria

- [ ] Zero open P0/P1 defects.
- [ ] Every release-checklist item is pass, fail, blocked, or not applicable with evidence.
- [ ] Core purchase flow passes for all approved variants and markets.
- [ ] Theme Editor and responsive matrix pass.
- [ ] Performance results and remaining gaps are reported honestly.
- [ ] Git diff is reviewed, project docs are current, and rollback is defined.
- [ ] No production deployment occurred.

## Required handoff

Create `reports/TASK-010-RESULT.md`, finalize `PROJECT_STATUS.md` and `CHANGELOG.md`, and stop for explicit release approval.

