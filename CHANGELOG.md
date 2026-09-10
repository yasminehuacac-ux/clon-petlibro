# Changelog

All notable project changes are recorded here.

## Unreleased

### Added

- TASK-003 Shopify-native Product/Variant/metafield/metaobject, Markets, reviews, bundles, migration, fallback, and media-manifest documentation.
- Original provisional English feeder content based only on confirmed supplier functions, with explicit claim-status gates.
- RELIVANOW semantic color, spacing, motion, state, and layout aliases in Horizon's shared token pipeline.
- Merchant-editable semantic colors for warm/surface, state, and rating roles.
- Project control pack for ChatGPT Work + Codex.
- Repository-level `AGENTS.md`.
- Architecture, workflow, data, analytics, content, asset, QA, and release documentation.
- Ten-task execution roadmap with TASK-001 ready for audit.
- Standard Codex result-report format.
- TASK-001 verified baseline report, component dependency graph, and reuse/extend/compose/create map.
- Environment-gate result documenting the verified local Shopify development setup.

### Changed

- Work approved TASK-003; the Shopify data model moved from `REVIEW` to `DONE`. TASK-004 remains `DRAFT` pending final assets, hero/default variant decisions, and native media associations.
- TASK-003 moved from `BLOCKED` to `REVIEW` after Work supplied the required commercial/content decisions; TASK-004 remains `DRAFT`.
- Work approved TASK-002 after responsive storefront, commerce-flow, keyboard/focus, Theme Editor, and static validation; TASK-003 was initially blocked pending commercial and content decisions later supplied by Work.
- Reduced-motion mode now collapses all timing variables changed by TASK-002 at the root, covering every consumer of those shared motion tokens.
- Applied the approved RELIVANOW palette, Inter typography, restrained radii, borders, and hover treatment to the development configuration and shared primitives.
- Styled sale prices, form errors, ratings, and shared states while preserving Horizon's dynamic button hover, custom-button, and adaptive focus behavior.
- Project status and architecture now reflect the completed static baseline audit and its live-validation limits.
- Work approved TASK-001 and accepted the current repository as the official RELIVANOW baseline.
- TASK-001 moved to `DONE`; TASK-002 was held at `BLOCKED` pending local development-toolchain verification.
- Verified Windows AMD64 tooling with Node.js v24.20.0, Shopify CLI 4.7.0, and Theme Check passing across 327 files with zero offenses.
- Verified Shopify authentication, development-theme connection, local preview, and Theme Editor access; TASK-002 moved from `BLOCKED` to `READY`.
- Documented the two-terminal Windows workflow and the prohibition on storing credentials, preview URLs, or temporary theme IDs.

### Preserved

- Horizon 4.1.1 theme implementation.
- Existing Git history, branch, remote configuration, and intake settings.
