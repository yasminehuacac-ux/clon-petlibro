# TASK-001 — Horizon baseline audit and reuse map

**Status:** READY  
**Depends on:** Project control pack installed  
**Gate owner:** ChatGPT Work

## Objective

Audit the actual repository and establish a verified technical baseline for RELIVANOW before implementing storefront changes. Determine what is native Horizon 4.1.1, what is already customized, what must be preserved, and how each planned system should be reused, extended, composed, or created.

## Read first

- `AGENTS.md`
- `PROJECT_STATUS.md`
- `TASKS.md`
- `docs/PROJECT_BRIEF.md`
- `docs/BRANDING_DESIGN_SYSTEM.md`
- `docs/PETLIBRO_AUDIT.md`
- `docs/TECHNICAL_ARCHITECTURE.md`
- `docs/ENGINEERING_RULES.md`
- `docs/CONVERSION_BLUEPRINT.md`
- `docs/DECISIONS.md`

## Scope

1. Inspect Git branch, status, log, tracked files, remote metadata, and repository root.
2. Confirm the declared theme/version and identify any reliable provenance indicators.
3. Inventory assets, sections, blocks, snippets, templates, settings, locales, layouts, and documentation.
4. Identify existing customizations or suspicious deviations using repository evidence. Do not claim a pristine-Horizon comparison unless a trustworthy baseline is available.
5. Trace these Horizon systems end-to-end:
   - settings/token pipeline;
   - component/event base;
   - product media gallery;
   - product form and errors;
   - variant picker and variant-change consumers;
   - price, availability, SKU, and quantity;
   - sticky add to cart;
   - cart drawer, cart items, quantity, remove, discount;
   - product cards, quick add, recommendations;
   - header, header drawer, predictive search;
   - slideshow, modal/dialog/drawer;
   - Theme Editor and Section Rendering behavior.
6. Inspect current templates and saved theme settings without rewriting them.
7. Determine available local validation commands and authentication boundaries.
8. Produce a `reuse / extend / compose / create` map for the planned RELIVANOW systems.
9. Identify performance, accessibility, data consistency, app, and maintenance risks.
10. Recommend concrete adjustments to TASK-002 and later tasks.

## Out of scope

- No storefront implementation or visual redesign.
- No theme-setting migration.
- No dependency/app installation.
- No Shopify data creation.
- No store authentication, theme push, publish, or deployment unless separately authorized.
- No mass formatting or mechanical rewrite.
- No changes to existing Liquid, CSS, JavaScript, JSON templates, settings, or locales.

## Required deliverables

Create `reports/TASK-001-RESULT.md` containing:

- verified baseline facts and uncertainty;
- existing customization findings with file evidence;
- system/component dependency map;
- reuse/extend/compose/create table;
- data and Theme Editor implications;
- protected/high-risk files;
- tooling and authentication status;
- prioritized risks;
- recommended scope for TASK-002;
- exact verification performed.

Update only when supported by findings:

- `PROJECT_STATUS.md`;
- `TASKS.md`;
- `docs/TECHNICAL_ARCHITECTURE.md`;
- `docs/DECISIONS.md`;
- `CHANGELOG.md`.

## Acceptance criteria

- [ ] No storefront implementation files were modified.
- [ ] The report distinguishes facts, inferences, and unverified assumptions.
- [ ] Every planned P0 system has a reuse decision backed by repository evidence.
- [ ] Existing intake customizations are identified or explicitly marked not provable.
- [ ] Theme Editor and Section Rendering risks are covered.
- [ ] Local validation/authentication limits are recorded accurately.
- [ ] TASK-002 recommendations are concrete and bounded.
- [ ] Git diff contains only documentation/control-file changes.

## Verification

- Inspect `git status` before and after.
- Validate modified Markdown structure manually.
- Run non-mutating theme/tool version checks when available.
- Run Theme Check only if already available and it does not require changing project dependencies.
- Use `git diff --check`.

## Stop conditions

Stop and report instead of guessing if the repository is not the intended theme, the worktree contains unexplained user changes, the base/version conflicts with project documentation, or accurate auditing would require an unapproved network/download/authentication step.

