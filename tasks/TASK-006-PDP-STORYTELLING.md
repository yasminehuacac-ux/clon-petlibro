# TASK-006 — PDP storytelling, specs, and FAQ

**Status:** DONE
**Depends on:** TASK-004 approved; absent final copy/media/video remain documented fail-closed content gates
**Gate owner:** ChatGPT Work

## Objective

Build the post-purchase-area PDP narrative using reusable, merchant-editable components that resolve the approved customer objections.

## Read first

- `AGENTS.md`
- `docs/BRANDING_DESIGN_SYSTEM.md`
- `docs/CONVERSION_BLUEPRINT.md`
- `docs/DATA_MODEL.md`
- `docs/CONTENT_MATRIX.md`
- `docs/ASSET_MANIFEST.md`
- `docs/QA_MATRIX.md`

## Scope

- Reusable feature-story composition with desktop/mobile media.
- Emotional benefit, camera/monitoring, app/scheduling, freshness/reliability, cleaning/compatibility, and ecosystem modules.
- Installation video with poster and accessible controls.
- Accessible HTML specifications grouped by category.
- FAQ accordion and FAQ schema generated from the same source.
- Related products using the approved Horizon system.
- Complete anchor navigation behavior and active state if not completed in TASK-004.

## Out of scope

- Reviews provider implementation.
- Home sections.
- Unverified claims or specs encoded into images.

## Acceptance criteria

- [x] All content is editable through approved sources.
- [x] Feature sections reuse shared media/content components.
- [x] Desktop/mobile media do not create duplicate heavy DOM branches.
- [x] Specs and FAQ are semantic, searchable, and accessible.
- [x] FAQ UI and schema remain identical.
- [x] Sticky navigation offsets and active states work without overlap.

## Required handoff

Create `reports/TASK-006-RESULT.md` and do not begin TASK-007.

Completed through reconciliation with TASK-004. The existing 16 long-form sections, native Product Recommendations, native media/video support and fail-closed data model were retained. TASK-006 added only the missing dynamic PDP anchor navigation; content-dependent modules remain hidden until approved inputs exist. Evidence and the full traceability matrix are recorded in `reports/TASK-006-RESULT.md`.
