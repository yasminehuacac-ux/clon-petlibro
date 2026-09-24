# TASK-013 — Controlled development-theme deployment

**Status:** DONE

**Date:** 2026-09-24

**Store:** `relivanow.myshopify.com`

**Branch:** `feat/relivanow-reference-sections`

**Deployed commit:** `49693c95df3d2ccba44da207abb9bfc7dba904c3`

**Development theme:** `193260781938` — `Development (bfe2c0-DESKTOP-EHRJHE7)` — role `development`

**Protected live theme:** `192527597938` — `Dawn` — role `live`

## Git gate

- The working tree was clean before deployment.
- Local `HEAD` and `origin/feat/relivanow-reference-sections` both resolved to `49693c95df3d2ccba44da207abb9bfc7dba904c3` after `git fetch origin`.
- The conditional implementation push was therefore unnecessary.
- No push or merge targeted `main`.

## Exact deployment allowlist

The range `71618d5b4d77931aa29ec8469e6cde1b2be1da17..49693c95df3d2ccba44da207abb9bfc7dba904c3` was filtered to valid Shopify theme roots and manually reviewed. Documentation, reports, tests, task files and both references were excluded.

1. `assets/marquee.js`
2. `assets/product-form.js`
3. `assets/relivanow-complete-look.js`
4. `assets/relivanow-countdown.js`
5. `assets/relivanow-marquee-policy.js`
6. `assets/relivanow-offerings.js`
7. `assets/relivanow-pdp-ugc.js`
8. `assets/relivanow-product-form-policy.js`
9. `assets/relivanow-video-card.js`
10. `sections/relivanow-campaign-grid.liquid`
11. `sections/relivanow-community-videos.liquid`
12. `sections/relivanow-complete-look.liquid`
13. `sections/relivanow-editorial-proof.liquid`
14. `sections/relivanow-expert-cards.liquid`
15. `sections/relivanow-image-gallery.liquid`
16. `sections/relivanow-offerings.liquid`
17. `sections/relivanow-pdp-ugc.liquid`
18. `sections/relivanow-product-highlights.liquid`
19. `sections/relivanow-product-offers.liquid`
20. `sections/relivanow-promotion-marquee.liquid`
21. `sections/relivanow-shoppable-hotspots.liquid`
22. `sections/relivanow-trending-grid.liquid`
23. `sections/relivanow-video-slideshow.liquid`
24. `templates/index.json`
25. `templates/product.json`

## Upload command

Shopify CLI help confirmed support for exact `--theme`, repeatable `--only`, `--nodelete`, `--json` and `--store` flags. The command contained no token or password. It is shown below with `\` only as a visual line-wrap marker:

```text
shopify theme push --store relivanow.myshopify.com --theme 193260781938 --nodelete --json --no-color \
  --only assets/marquee.js \
  --only assets/product-form.js \
  --only assets/relivanow-complete-look.js \
  --only assets/relivanow-countdown.js \
  --only assets/relivanow-marquee-policy.js \
  --only assets/relivanow-offerings.js \
  --only assets/relivanow-pdp-ugc.js \
  --only assets/relivanow-product-form-policy.js \
  --only assets/relivanow-video-card.js \
  --only sections/relivanow-campaign-grid.liquid \
  --only sections/relivanow-community-videos.liquid \
  --only sections/relivanow-complete-look.liquid \
  --only sections/relivanow-editorial-proof.liquid \
  --only sections/relivanow-expert-cards.liquid \
  --only sections/relivanow-image-gallery.liquid \
  --only sections/relivanow-offerings.liquid \
  --only sections/relivanow-pdp-ugc.liquid \
  --only sections/relivanow-product-highlights.liquid \
  --only sections/relivanow-product-offers.liquid \
  --only sections/relivanow-promotion-marquee.liquid \
  --only sections/relivanow-shoppable-hotspots.liquid \
  --only sections/relivanow-trending-grid.liquid \
  --only sections/relivanow-video-slideshow.liquid \
  --only templates/index.json \
  --only templates/product.json
```

Shopify returned theme ID `193260781938`, role `development`, store `relivanow.myshopify.com` and a successful completion. No `--live` or `--publish` flag was used, no theme was created and `--nodelete` prevented remote deletions.

## Snapshot and hash verification

Four separate temporary directories outside the repository held live-before, development-before, development-after and live-after downloads. Nothing was copied into the repository.

### Protected live files

| File | SHA-256 before | SHA-256 after | Result |
|---|---|---|---|
| `layout/theme.liquid` | `e4031baede898d36ea61915ffd0b4f35fbd902f8c39a0a58495935d90062e22e` | `e4031baede898d36ea61915ffd0b4f35fbd902f8c39a0a58495935d90062e22e` | MATCH |
| `config/settings_data.json` | `52d81ec4f7798765904db1cfa3a662bcd569c1814383f8ad013851d93b899694` | `52d81ec4f7798765904db1cfa3a662bcd569c1814383f8ad013851d93b899694` | MATCH |
| `templates/index.json` | `16e646cb779fcc2ba0e9397f4ac39f2078a12f5f83374bd31c14f0cc22a4f60a` | `16e646cb779fcc2ba0e9397f4ac39f2078a12f5f83374bd31c14f0cc22a4f60a` | MATCH |
| `templates/product.json` | `b0b21b6a15bb16841960ee0b8402c9bbac6a7d463c960b7345fb1c05aace4798` | `b0b21b6a15bb16841960ee0b8402c9bbac6a7d463c960b7345fb1c05aace4798` | MATCH |

The protected live snapshot is byte-identical before and after deployment.

### Protected development files

| File | SHA-256 before | SHA-256 after | Interpretation |
|---|---|---|---|
| `layout/theme.liquid` | `faf39505d66e1fd501edfeff5c420cf95b295d648d2856fed67b1da67e0827b2` | `faf39505d66e1fd501edfeff5c420cf95b295d648d2856fed67b1da67e0827b2` | Unchanged |
| `config/settings_data.json` | `d3e557d42f650c867c3fdb6519f68a78e200ceda9cc4cdee6fce9c37968a5bc4` | `d3e557d42f650c867c3fdb6519f68a78e200ceda9cc4cdee6fce9c37968a5bc4` | Unchanged |
| `templates/index.json` | `dc17d57d3abcab02108011ed868b1f05961ad6e10583130938c3bc932daa34e3` | `18ca529683c95f1aba1ea1132159df4ddde530466037f7495e48077e1c9dea93` | Expected deployed template, Shopify-canonicalized |
| `templates/product.json` | `6204e542d8785e0e7d53fd5e4c3d416bdf3d8c26f9187d62f6e933e362c98857` | `c7fbdbc08e364503ba8bfbf8ea679fba0865fd431eef98bff2bd800db09bd3b9` | Expected deployed template, Shopify-canonicalized |

### Local-to-development allowlist

All 23 JavaScript/Liquid files matched the downloaded development files byte for byte. Their SHA-256 values were:

| File | SHA-256 |
|---|---|
| `assets/marquee.js` | `8244a127dd33d5dda58c79f938f5c0f093d07e49ee8cfc386602bcfef0980a17` |
| `assets/product-form.js` | `31728cb8295d8610f593faf35de0b0bf4f2ae6e76b8890cf239d29ab1d0a47bf` |
| `assets/relivanow-complete-look.js` | `03d4010a390562173bd0b7be717784c95e218e36313dc2f378ea4187f89406e7` |
| `assets/relivanow-countdown.js` | `0b95c6e62745a6d0dd04817e8a4c43e4e0fbd92fca1d98062d5a0636cd6de648` |
| `assets/relivanow-marquee-policy.js` | `3054cc2bf2f95b65acaff8c4ff97cdfda618fafc4a3e78c0420de6e51884593b` |
| `assets/relivanow-offerings.js` | `39eb6be4fccf687614f8fb338569546b25adb6cc7bd3fd75cbbcbb667e5d8f64` |
| `assets/relivanow-pdp-ugc.js` | `6ad71e02591cc7f15b6d92fb89fde6c89a4e3ed75e2f378613a1ab90e2ffe128` |
| `assets/relivanow-product-form-policy.js` | `a109199e9bc259782a5f43159e63a63cb225db0f2e2f7cdecf6656a484024fd5` |
| `assets/relivanow-video-card.js` | `e01a8b0249299dec0adf6cc26e5a8a05bb49f9883c33254e7bee89108151fc0d` |
| `sections/relivanow-campaign-grid.liquid` | `67303b779fbec40a0bf0c397a2511678174c62def923918188d0ef3d0a710f34` |
| `sections/relivanow-community-videos.liquid` | `9906dfcdb8848ad089894d69a9fd523538bdceee57bc2994cd9b97c54e970253` |
| `sections/relivanow-complete-look.liquid` | `3b42975b31f1ebc2ad453823f7af02971d6c76fc12a5eb00963db04fcb31785f` |
| `sections/relivanow-editorial-proof.liquid` | `baee4c564862ca454f4c9de547c5fb33d86ae470f53a744368d5ca32d89838e3` |
| `sections/relivanow-expert-cards.liquid` | `28894ff9aabea8daa43b1161dd110fbe2f982f759e1d44deb8b06cbc6ec719c8` |
| `sections/relivanow-image-gallery.liquid` | `b445523f6e2dd9f5b1958cf441e59f3fafee93322c9f2ed716130c43d4c4bc07` |
| `sections/relivanow-offerings.liquid` | `febb83991699c162223e7732436a1d481a84595fdb66a5c8d3cb6085b1fceaa1` |
| `sections/relivanow-pdp-ugc.liquid` | `98bdd993cdbc74c6e1f94eb6b5f943b0f4358293948e9f906f47b6ffdf1fdb3c` |
| `sections/relivanow-product-highlights.liquid` | `c7901e990b632605eab1ea01ad1fd8f621ca8900b4222e21767a31827286cf89` |
| `sections/relivanow-product-offers.liquid` | `472ce17d5208a44214d36a4bdda17959ce9f1942198c708a542cc569af9dfcf9` |
| `sections/relivanow-promotion-marquee.liquid` | `c387c4af6fdc9ab34f0735e7c0c68b964cf038eac29164d332a5b5a80208e4e4` |
| `sections/relivanow-shoppable-hotspots.liquid` | `09f865624fb151fe5dac02c637a004a386c1a8d675076c46af956eea4989b78a` |
| `sections/relivanow-trending-grid.liquid` | `3b60bc6f92babff710329b5fe924f81f01f39cad018aac435ffc1db7da07a808` |
| `sections/relivanow-video-slideshow.liquid` | `bf8cc01d2a31faca55158ecf36e71a3c6360ce3a10f055cbb9876b05cedac67a` |

Shopify canonicalized the two JSON templates by reformatting/reordering object keys and omitting empty `blocks: {}` / `block_order: []` defaults. After recursively sorting object keys and omitting only those empty defaults, semantic SHA-256 values matched:

| File | Local semantic SHA-256 | Remote semantic SHA-256 | Result |
|---|---|---|---|
| `templates/index.json` | `78d6cf2416340c1c5b0b41caea75e768237717934834cbe19a6143e2c089377f` | `78d6cf2416340c1c5b0b41caea75e768237717934834cbe19a6143e2c089377f` | MATCH |
| `templates/product.json` | `7f711b46a7b94527b70210bdf7d1c712022c4a55bd86660011001b651208e844` | `7f711b46a7b94527b70210bdf7d1c712022c4a55bd86660011001b651208e844` | MATCH |

The downloaded development templates contain all nine Home and six PDP reference IDs with `disabled: true`.

## Validation

| Check | Result |
|---|---|
| Full Node suite | PASS — 51/51 |
| JavaScript syntax | PASS — 99/99 |
| JSON/JSONC, Liquid schemas and setting IDs | PASS — included in the full Node suite |
| `git diff --check` | PASS |
| Raw Theme Check | EXPECTED KNOWN FINDING — 373 files; inherited Judge.me app-URI `JSONMissingBlock` false positive, one inherited `ExcessiveSettingsCount`, five inherited `UnusedDocParam` warnings |
| Diagnostic Theme Check | PASS — 373 files; zero errors and the same six inherited warnings after disabling only `JSONMissingBlock` in a temporary external config |
| Theme roles after upload | PASS — `193260781938` remains `development`; `192527597938` remains `live` |

## Read-only storefront smoke test

Preview entry URL: `https://relivanow.myshopify.com?preview_theme_id=193260781938`

Shopify redirects the storefront to `https://relivanow.com/?preview_theme_id=193260781938` and stores the preview selection. The preview bar visibly identified `Development (bfe2c0-DESKTOP-EHRJHE7)` as `Draft`.

| Surface | Result |
|---|---|
| Home | PASS at 1366×633 and 390×844; one H1, main visible, zero visible reference wrappers, no horizontal overflow |
| PDP | PASS at 1366×633 and 390×844; one Product H1, gallery/purchase UI and Add to Cart visible, zero visible reference wrappers, no horizontal overflow |
| Search | PASS at 1366×633; query `feeder`, H1 `Search results`, two visible results, no horizontal overflow |
| Judge.me | PASS read-only; top rating UI and authentic `No reviews` state render on the PDP; no fabricated review data |
| Cart Drawer | PASS read-only; the existing 17-item drawer opened and closed, with no quantity, line, discount, checkout or cart mutation |
| Console | PASS; zero captured errors or warnings on Home, PDP and Search |
| Basic visual inspection | PASS; desktop and mobile Home/PDP plus desktop Search were visually inspected with no obvious clipping or broken layout |

No Product was added, no form was submitted and no commercial or storefront configuration was changed.

## Safety confirmation and remaining gates

- No theme was published and no `--publish` or `--live` operation occurred.
- No Theme Editor was opened or saved.
- Live theme `192527597938` was not targeted and its four protected files are byte-identical before/after.
- All 15 new reference instances remain disabled; their actual merchant content, Product/Collection relationships, approved media and Theme Editor activation remain future work.
- No pull request was opened or merged, and `main` was not changed.
