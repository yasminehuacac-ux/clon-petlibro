# RELIVANOW Theme — Codex instructions

## Mission

Build a production-ready Shopify Online Store 2.0 theme for RELIVANOW using Horizon 4.1.1 as the base and PETLIBRO only as a UX and conversion benchmark. Never copy PETLIBRO code, branding, copy, media, reviews, claims, or protected assets.

## Instruction order

Before changing code:

1. Read this file.
2. Read `PROJECT_STATUS.md`, `TASKS.md`, and the active task in `tasks/`.
3. Read every document listed by that task.
4. Inspect the relevant Horizon implementation before proposing new code.
5. State a short technical plan and identify blockers or conflicting instructions.

The active task defines scope. Do not implement later tasks early.

## Frozen priorities

1. Conversion reliability.
2. Performance and Core Web Vitals.
3. Maintainability and Theme Editor safety.
4. Reusability.
5. Responsive visual fidelity.
6. Clean code.

Mobile first. Architecture over speed. Reuse before extension; extend before composition; compose before creating a new component.

## Source of truth

- Brand and visual direction: `docs/BRANDING_DESIGN_SYSTEM.md`.
- Benchmark findings: `docs/PETLIBRO_AUDIT.md`.
- Commercial funnel: `docs/CONVERSION_BLUEPRINT.md`.
- Technical decisions: `docs/TECHNICAL_ARCHITECTURE.md` and `docs/DECISIONS.md`.
- Shopify data: `docs/DATA_MODEL.md`.
- Approved copy/data: `docs/CONTENT_MATRIX.md`.
- Approved media: `docs/ASSET_MANIFEST.md`.
- Acceptance: `docs/QA_MATRIX.md` and the active task.

If a value is `TBD`, do not infer it from PETLIBRO. Report it as a blocker or use an explicit Theme Editor placeholder only when the task permits it.

## Engineering rules

- Preserve Horizon conventions and native functionality.
- No duplicated Liquid, CSS, JavaScript, galleries, media, or commercial data.
- Use sections, blocks, snippets, settings, metafields, and metaobjects appropriately.
- Use CSS variables and semantic component tokens; avoid hardcoded repeated values.
- Do not add jQuery, a framework, app, package, CDN, or production dependency without explicit approval.
- No inline JavaScript except minimal serialized data that cannot be represented safely otherwise.
- Variant changes must keep media, price, compare-at price, SKU, availability, product form ID, add-ons, and sticky ATC consistent.
- Quantity and remove operations must update the cart through the established AJAX flow without returning to the PDP.
- Preserve accessibility: semantic HTML, keyboard support, visible focus, accessible names, live regions where needed, 44px touch targets, and reduced motion.
- Preserve Theme Editor behavior during section add, remove, reorder, and reload.
- Do not edit checkout capabilities beyond the store plan or Shopify platform support.
- Never deploy, push a live theme, install an app, change store data, or alter the Git remote without explicit authorization.
- Preserve user changes and unrelated files. Never use destructive Git operations.

## Required verification

Run the checks relevant to the active task. At minimum:

- inspect `git diff --check`;
- validate modified JSON and section schemas;
- run Shopify Theme Check when available;
- test the functional states named in the task;
- review the diff for regressions and duplication.

If live Shopify authentication, browser access, products, apps, or assets are unavailable, perform static verification and state the exact unverified items. Never claim live validation that did not occur.

## Completion protocol

Before declaring a task complete:

1. Satisfy every acceptance criterion or mark the task blocked.
2. Update `TASKS.md` and `PROJECT_STATUS.md`.
3. Add a concise entry to `CHANGELOG.md` for material changes.
4. Create `reports/TASK-XXX-RESULT.md` using the report template.
5. Include files changed, tests run, evidence, risks, Shopify configuration, and recommended next step.
6. Do not mark the next task `READY` unless its prerequisites are actually resolved.

Do not create commits unless the active task or user explicitly asks. When requested, create focused, reversible commits and report the hash.

