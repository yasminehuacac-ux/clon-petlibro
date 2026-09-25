# TASK-017 — RELIVANOW Home visual remediation

**Status:** PARTIAL — code/configuration remediation deployed and verified; fresh authenticated manual visual QA remains pending

**Date:** 2026-09-24

**Store:** `relivanow.myshopify.com`

**Branch:** `feat/relivanow-reference-sections`

**Starting HEAD:** `f325ab23682f1b68cde3faad64398a64d54ad3f1`

**Technical commit:** `e20ea6082aa03774c00216a0d695e893d59a35d1` — `fix: refine RELIVANOW Home visual quality`

**Documentation commit subject:** `docs: record RELIVANOW Home visual remediation` — exact hash is reported in the final Git handoff

**390×844 follow-up fix:** `4e813b5c2702319ae1fd1ef47862c220c9413979` — `fix: disable incomplete RELIVANOW Home asset section`

**Development theme:** `193260781938` — `Development (bfe2c0-DESKTOP-EHRJHE7)` — role `development`

**Protected live theme:** `192527597938` — `Dawn` — role `live`

**Preview:** `https://relivanow.myshopify.com?preview_theme_id=193260781938`

## Outcome

The owner-provided desktop defects were traced to exact Home section IDs and separated into code/layout, configuration and asset/content causes. Sparse custom grids now fill their desktop rows, Trending uses a balanced 2×2 tablet/mobile grid, Product Offers keeps horizontal peeking only on mobile, and the dark story consumes its configured foreground color with 17.80:1 contrast and 48–104 px bottom CTA space.

No Product title, price, Variant, global Product media, review, campaign, expert, UGC or commercial record was changed. Sections that depend on supplier overlays, repeated media or incomplete evidence remain in JSON but are disabled. The native `collection-list.liquid` is byte-identical. The reference category carousel retained its two real Collections and two-column configuration, but is now disabled after manual 390×844 evidence confirmed that their current supplier media is incomplete.

The initial remediation uploaded five theme files to development with an explicit allowlist and `--nodelete`. Readback proved the four Liquid files matched local byte for byte and the Home template contained exactly the seven intended state changes. A later one-file follow-up uploaded only `templates/index.json` to disable the category reference; its readback has exactly one semantic delta. The live theme retained all four protected hashes across both deployments.

This report does not claim real post-remediation visual QA. The five-width evidence below is an isolated local CSS/DOM fixture; authenticated Shopify storefront and Theme Editor inspection must be repeated manually.

## Defect diagnosis and disposition

| Observation | Responsible ID | Classification | Disposition |
|---|---|---|---|
| Supplier imagery in `New & Popular` | `home_products` (`product-list`) | ASSET/CONTENT + old equivalent | Preserved in JSON and disabled; no Product media/title/price mutation. |
| Repeated feeder/cat/phone image | `home_story_routine`, `home_story_connected`, `home_final_cta` | CONFIGURATION / ASSET | Routine and Connected stories disabled; only the best narrative instance, `home_final_cta`, remains active. |
| Dark eyebrow/body contrast | `home_final_cta` via `relivanow-home-product-story` | CODE/LAYOUT | Eyebrow and supporting text now use `--home-story-text`; configured white on `#171817` measures 17.80:1. |
| CTA too close to dark section edge | `home_final_cta` | CODE/LAYOUT | Added responsive 48–104 px bottom content padding. |
| Post-marquee hero with embedded `4L` / supplier instructions | `reference_video_slideshow` | ASSET/CONTENT | Disabled until a clean approved poster/video exists. |
| Tiny embedded copy, duplicates and generic detail labels | `reference_image_gallery` | ASSET/CONTENT | Component layout corrected; current instance disabled until four clean media items and verified descriptions exist. |
| Two supplier-media cards remain visible/cropped at 390×844 immediately above the footer | `reference_category_carousel` | ASSET/CONTENT | Exact ID/type proven from Home order and its two saved Collections (`pet-clean`, `spare-parts`). Section retained in JSON but disabled; native section, Collections and media records unchanged. |
| Four cards use roughly half the viewport | `reference_trending_grid` | CODE/LAYOUT + ASSET/CONTENT | Adaptive four-column desktop and balanced 2×2 tablet/mobile layout implemented; instance remains disabled because current Product imagery has overlays/inconsistent quality. |
| Inconsistent Product card ratios/titles/media | `home_products`, `reference_trending_grid` | ASSET/CONTENT | Both public surfaces disabled; no global Product record or media changed. |
| Desktop rails could expose partial cards or empty columns | `reference_image_gallery`, `reference_trending_grid`, `reference_product_offers` | CODE/LAYOUT | Desktop grids fill available columns; mobile-only gallery/offers rails retain contained horizontal scroll and peek. |

The active promotion marquee was not the source of a confirmed defect. Its continuous-motion, opt-in duration and `prefers-reduced-motion` contracts remain covered and unchanged.

## Home section readiness after remediation

Only `READY` entries remain active. A READY fail-closed host can be active while emitting no public wrapper when its app/data input is absent.

| Section ID | State | Template status | Reason |
|---|---|---|---|
| `home_hero` | READY | Active | Approved existing hero retained. |
| `home_benefits` | READY | Active | Approved existing benefits retained. |
| `home_categories` | BLOCKED | Disabled | Superseded legacy category surface retained only for editability/history. |
| `home_products` | BLOCKED | Disabled | Old equivalent and supplier-overlay Product imagery. |
| `home_story_routine` | PARTIAL | Disabled | Copy/configuration retained; distinct approved media required. |
| `home_story_connected` | PARTIAL | Disabled | Copy/configuration retained; distinct approved media required. |
| `home_reviews` | READY fail-closed | Active | Existing app-block host emits no public wrapper without a real app block. |
| `home_final_cta` | READY | Active | Best narrative use of current feeder media; contrast/spacing corrected. |
| `reference_promotion_marquee` | READY | Active | Approved single message; motion/reduced-motion contracts pass. |
| `reference_video_slideshow` | BLOCKED | Disabled | Clean approved poster/video missing. |
| `reference_image_gallery` | BLOCKED | Disabled | Four clean media items and verified descriptions missing. |
| `reference_campaign_grid` | BLOCKED | Disabled | No confirmed campaign, dates, offer or campaign media. |
| `reference_category_carousel` | BLOCKED | Disabled | Manual 390×844 QA confirmed incomplete/cropped supplier media for both saved Collections. |
| `reference_community_videos` | BLOCKED | Disabled | No approved UGC/video evidence. |
| `reference_expert_cards` | BLOCKED | Disabled | No approved experts/attributions. |
| `reference_trending_grid` | PARTIAL | Disabled | Layout ready; clean consistent image overrides or Product media still missing. |
| `reference_product_offers` | BLOCKED | Disabled | No confirmed campaign tile/offer evidence; fail-closed contract retained. |

## Code and configuration files

Technical commit files:

- `sections/relivanow-home-product-story.liquid`
- `sections/relivanow-image-gallery.liquid`
- `sections/relivanow-product-offers.liquid`
- `sections/relivanow-trending-grid.liquid`
- `templates/index.json`
- `tests/home-reference-sections.test.mjs`

The deployment allowlist excluded tests and documentation and contained only the first five theme paths.

Home configuration changes were limited to:

- disable `home_products`;
- disable `home_story_routine`;
- disable `home_story_connected`;
- disable `reference_video_slideshow`;
- disable `reference_image_gallery`;
- change `reference_category_carousel.settings.columns` from `5` to `2`;
- disable `reference_trending_grid`.

The 390×844 follow-up adds one further configuration change only: disable `reference_category_carousel` while preserving its ID, type, blocks, Collection handles, settings and order.

No Home order entry was added, removed or moved.

## TDD and validation

| Gate | Result |
|---|---|
| Initial focused RED | PASS evidence — 10/14 passed and four new assertions failed for the active bad-media states, five-column category configuration, five-slot gallery rail and dark-story contrast/spacing. |
| Fixture-discovered tablet RED | PASS evidence — 13/14 passed; the new 768 px 2×2 Trending contract failed before correction. |
| Focused GREEN | PASS — 14/14. |
| 390×844 follow-up RED→GREEN | PASS — 13/14 failed only on `reference_category_carousel` still active; after the one-line template fix, focused tests pass 14/14. |
| Full Node suite | PASS — 55/55, including TASK-011/TASK-012, JSON/JSONC, Liquid schemas and setting-ID uniqueness. |
| JavaScript syntax | PASS — 99/99. |
| Dark-section contrast | PASS — `#FFFFFF` on `#171817` = 17.80:1. |
| Tracker / remote runtime URL scan in added production lines | PASS — zero hits. |
| Fabricated commercial/default-content scan in added production lines | PASS — zero hits. |
| `git diff --check` | PASS. |
| Raw Theme Check | EXPECTED KNOWN FINDING — 373 files, inherited Judge.me app-URI `JSONMissingBlock` false positive and six inherited Horizon warnings. |
| Diagnostic Theme Check | PASS — 373 files, zero errors and the same six inherited warnings after disabling only `JSONMissingBlock` in an ignored diagnostic config. |

The six inherited warnings are one `ExcessiveSettingsCount` in `sections/header.liquid` and five `UnusedDocParam` warnings in `snippets/divider.liquid`; TASK-017 modifies neither file.

### Isolated responsive fixture

| Viewport | Result |
|---|---|
| 1440×900 | PASS fixture — four equal Gallery/Trending columns, Offers 2+1+1, no document or component overflow, CTA bottom space 100.8 px. |
| 1024×768 | PASS fixture — same balanced desktop distribution, no overflow, CTA bottom space 71.67 px. |
| 768×1024 | PASS fixture — Trending 2×2, Gallery/Offers contained without overflow, CTA bottom space 53.75 px. |
| 390×844 | PASS fixture — Trending 2×2; Gallery/Offers have intentional contained horizontal scroll; no document overflow; CTA bottom space 48 px. |
| 360×800 | PASS fixture — same mobile contract; no document overflow; CTA bottom space 48 px. |

The fixture used exact Chrome DevTools CSS viewport emulation. It validates component geometry only, not Shopify Liquid output, real CDN crops, Theme Editor lifecycle, app output, console state or authenticated interaction.

## Controlled development deployment

Command shape, without credentials:

```text
shopify theme push --store relivanow.myshopify.com --theme 193260781938 --nodelete --json \
  --only sections/relivanow-home-product-story.liquid \
  --only sections/relivanow-image-gallery.liquid \
  --only sections/relivanow-product-offers.liquid \
  --only sections/relivanow-trending-grid.liquid \
  --only templates/index.json
```

Shopify returned theme ID `193260781938`, shop `relivanow.myshopify.com` and role `development`. No `--live`, `--allow-live`, `--publish` or `--unpublished` option was used.

### Development hashes

| File | Before | Local / readback after | Result |
|---|---|---|---|
| `sections/relivanow-home-product-story.liquid` | `FE320DD0CC011B14FB6A89CB0E29CDE39D0F730FC7CF7EC010763E36F90E3FAA` | `DDF9A66E3AEA386316453A85AC121BF8DBE88E285BEE47F09BE71EE7325A012C` | BYTE MATCH |
| `sections/relivanow-image-gallery.liquid` | `B445523F6E2DD9F5B1958CF441E59F3FAFEE93322C9F2ED716130C43D4C4BC07` | `E0C95FB4F4FA315F918FB825AAF6D24977662C094B0934387E662A26DD4EAE61` | BYTE MATCH |
| `sections/relivanow-product-offers.liquid` | `472CE17D5208A44214D36A4BDDA17959CE9F1942198C708A542CC569AF9DFCF9` | `FBDBD34E8BDF39B5620F6B63C0E1271BEC6B561C242C6DD8AE68054CA6DC321B` | BYTE MATCH |
| `sections/relivanow-trending-grid.liquid` | `3B60BC6F92BABFF710329B5FE924F81F01F39CAD018AAC435FFC1DB7DA07A808` | `19A67A281B7AE44ADB3494B23A0C2559D542FA9C00D56AF249C5760DF65869FE` | BYTE MATCH |
| `templates/index.json` | `9D4CBD45CD191FC533BFFB5265F860D02E3B2779C50B3A53D4B1B4B158A9C04A` | remote `0F5DE19398C5F02C797A096FEE5C938738B7D6EF5F00B7022D5E91E49B7BBBD0` | SEMANTIC MATCH |

For `index.json`, before/after recursive review found exactly seven intended differences and 122 Shopify canonicalizations of empty/default schema values and hex color casing. The reviewed difference payload hash is `93A874561155EFBE88C49CAC4FCB9CBF21ADEDD43E947DF37EB79D90897A59CB`. Home order is unchanged; the intended local settings match the remote readback.

### 390×844 follow-up deployment

The follow-up command was limited to:

```text
shopify theme push --store relivanow.myshopify.com --theme 193260781938 --nodelete --json \
  --only templates/index.json
```

- Development `index.json` before: `0F5DE19398C5F02C797A096FEE5C938738B7D6EF5F00B7022D5E91E49B7BBBD0`.
- Local `index.json`: `0CD52B9CBEAF8A565A0D0C12ADEA9B1ACC4E10BCA0797EAB5F1C94641B016CB5`.
- Development readback after: `69D56EC804A3271BF8178B2B163EEC2FE2ACBB8D1A5C21FFDE9CB3F856EC13EF`.
- Recursive before/after comparison: exactly one semantic difference, `sections.reference_category_carousel.disabled = true`.
- Remote ID remains `reference_category_carousel`, type remains `collection-list`, Collections remain `pet-clean` and `spare-parts`, columns remain `2`, and Home order is unchanged.
- The only active Home `reference_*` instance after readback is `reference_promotion_marquee`.

## Protected live verification

| File | Before | After | Result |
|---|---|---|---|
| `layout/theme.liquid` | `E4031BAEDE898D36EA61915FFD0B4F35FBD902F8C39A0A58495935D90062E22E` | same | MATCH |
| `config/settings_data.json` | `52D81EC4F7798765904DB1CFA3A662BCD569C1814383F8AD013851D93B899694` | same | MATCH |
| `templates/index.json` | `16E646CB779FCC2BA0E9397F4AC39F2078A12F5F83374BD31C14F0CC22A4F60A` | same | MATCH |
| `templates/product.json` | `B0B21B6A15BB16841960EE0B8402C9BBAC6A7D463C960B7345FB1C05AACE4798` | same | MATCH |

The post-upload theme list still reports `193260781938` as `development` and `192527597938` as `live`.

## Assets/content still required

- A clean approved poster or video for `reference_video_slideshow`, without supplier copy or unverified claims.
- Four distinct clean gallery media items with meaningful approved labels/descriptions and alts.
- Distinct approved story media for Routine and Connected Care if those stories are reactivated.
- Consistent clean image overrides or approved global Product media before reactivating Trending/Product discovery.
- Confirmed campaign/offer data and media before Campaign Grid or Product Offers can render.
- Authentic UGC/videos and attributable expert records before those sections can render.

No placeholders were made public and no missing content was invented.

## Manual QA to repeat

On authenticated preview `193260781938`, validate Home at 1440×900, 1024×768, 768×1024, 390×844 and 360×800:

1. Visually confirm the theme ID/role is development, never live.
2. Confirm active Home output is limited to READY surfaces and that the disabled supplier-media/story/gallery/trending surfaces are absent.
3. Check final CTA contrast, CTA lower spacing, responsive crop and focus target.
4. Confirm the two-Collection category carousel and its orange-container/device supplier media are absent at every viewport, especially 390×844.
5. Check marquee continuity, no broken fragments, pause behavior and reduced motion.
6. Confirm no root overflow, clipped card, stretched image, empty column or unintended desktop peek.
7. Inspect keyboard order, visible focus and 44 px touch targets.
8. Confirm console/network cleanliness and no broken images.
9. Recheck feeder PDP, a non-feeder PDP, Search, Judge.me `No reviews` and Cart Drawer open/close read-only as regressions.
10. Open Theme Editor read-only, confirm all sections remain editable and no `color_scheme` warning appears; do not Save.

## Safety and remaining gate

- No Theme Editor Save occurred.
- No publication, live push, Product/Variant/media mutation, cart mutation, form submission, app configuration, PR or merge occurred.
- Only the feature branch was pushed.
- Live theme `192527597938` was never a push target and remains byte-identical across its protected snapshot.
- Fresh authenticated visual QA is the only TASK-017 completion gate. Asset-dependent sections remain intentionally PARTIAL/BLOCKED until real approved inputs exist.
