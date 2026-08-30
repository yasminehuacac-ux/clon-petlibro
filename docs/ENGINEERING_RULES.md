# Engineering rules

## Shopify

- Keep schema valid and settings merchant-editable.
- Prefer native objects, dynamic sources, metafields, and metaobjects.
- Avoid hardcoded product handles, variant IDs, prices, URLs, review counts, and market copy.
- Preserve section/block IDs and Theme Editor state during rendering updates.
- Render essential specs and FAQ as accessible HTML.

## Liquid

- Keep snippets focused and pass explicit arguments.
- Avoid duplicated markup for breakpoints.
- Escape merchant content according to context.
- Use translation keys for reusable UI copy.
- Do not place business logic in unrelated presentation snippets.

## JavaScript

- Progressive enhancement first.
- Extend Horizon's event/component model.
- No global mutable state unless the theme already defines the needed store.
- Handle loading, success, empty, unavailable, and error states.
- Do not use `innerHTML` for untrusted values.
- Respect reduced motion and clean up observers/listeners.

## CSS

- Use the existing token system and logical properties when practical.
- Keep selectors low-specificity and component-scoped.
- Do not use `!important` without documenting the conflict.
- Ensure visible focus, sufficient contrast, and 44x44px touch areas.
- Avoid layout shifts by reserving media and dynamic-content space.

## Git and scope

- Inspect status before and after work.
- Preserve unrelated changes.
- No destructive reset/checkout.
- Do not change remote configuration or deploy without authorization.
- Keep tasks focused and report every modified file.

## Quality gate

A passing Theme Check is necessary but not sufficient. Functional, responsive, accessibility, performance, Theme Editor, and conversion acceptance must also pass.

