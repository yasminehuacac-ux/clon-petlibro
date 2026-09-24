# TASK-014 — Development-theme section configuration

**Status:** PARTIAL — configuration and Save completed safely; authenticated post-Save visual QA remains blocked

**Date:** 2026-09-24

**Store:** `relivanow.myshopify.com`

**Branch:** `feat/relivanow-reference-sections`

**Starting HEAD:** `4fc69c049f03249bc515f0a7e95beca1bf8d5727`

**Development theme:** `193260781938` — `Development (bfe2c0-DESKTOP-EHRJHE7)` — role `development`

**Protected live theme:** `192527597938` — `Dawn` — role `live`

## Outcome

The 15 RELIVANOW reference sections were audited and classified before Save. Seven complete, evidence-backed sections were configured and enabled exclusively in development theme `193260781938`. Four partial sections were configured where useful but left disabled, and four unsupported sections remain disabled. No theme was published.

The Theme Editor Save was invoked only after the owner replied `LISTOS`. The browser-control call timed out immediately after the click, so Save success was verified authoritatively by downloading the development templates into a separate temporary directory. Only `templates/index.json` and `templates/product.json` changed in development. `layout/theme.liquid` and `config/settings_data.json` did not change.

The protected live theme was downloaded again after Save. Its four protected files are byte-identical to their pre-Save snapshot.

## Read-only inventory used

The inventory was inspected in the authenticated Shopify environment before configuration. No Product, Variant, Collection, price, inventory, file, Market, policy or app data was modified.

### Products and relationships

The configuration uses only these existing Shopify Product handles:

- `automatic-pet-feeder-with-remote-control-and-timed-feeding`
- `smart-pet-paw-cleaning-cup`
- `pet-nail-grinder`
- `portable-pet-water-bottle-with-bowl`
- `car-mounted-pet-safety-seat`

Variants, prices and availability remain native Shopify data. No price, compare-at price, availability or discount was copied into editorial text or hardcoded into a section. The water bottle and paw-cleaning cup were used as real complementary Products in Complete the Look.

### Collections

- `pet-clean`
- `spare-parts`

Both collections were public, contained published Products and had suitable collection media when inspected. No Collection was created or edited.

### Media and approved content

- Existing feeder Product media supplied all nine configured images: one slideshow fallback, four gallery images and four PDP highlight images.
- No legitimate Shopify video was available for the configured slideshow; the section uses its supported image fallback with autoplay disabled.
- No owned community/UGC video, authorized expert identity, verified campaign/countdown, attributed editorial proof or UGC rights evidence was found.
- Feeder specifications used in Product Highlights were limited to information already verified in the Product material: `1–10 meals per day`, `1–12 portions per meal`, remote app control for compatible WiFi models, and suitability for cats and dogs.
- No campaign, discount, urgency, review, UGC, expert, award, certification, statistic, medical benefit, guarantee, shipping promise or inventory claim was invented.

A later unauthenticated request to the public Products JSON endpoint returned HTTP 401 because the storefront is protected. Authentication was not bypassed, and the authenticated pre-Save inventory was not replaced with simulated data.

## Final 15-section mapping

| # | Template | Section | Status | Enabled after Save | Evidence / decision |
|---:|---|---|---|---|---|
| 1 | Home | Promotion marquee | READY | Yes | Neutral approved brand message; no discount, shipping or urgency promise; no link |
| 2 | Home | Video slideshow | READY | Yes | Existing feeder image through the supported fallback; no fabricated video; autoplay off |
| 3 | Home | Image gallery | READY | Yes | Four distinct existing feeder images; no artificial repetition |
| 4 | Home | Campaign grid | BLOCKED | No | No verified active campaign or countdown |
| 5 | Home | Category carousel | READY | Yes | Two real, published collections with media and Products |
| 6 | Home | Community videos | BLOCKED | No | No owned/authorized community video or UGC rights evidence |
| 7 | Home | Expert recommendations | BLOCKED | No | No real authorized expert, portrait or attributable copy |
| 8 | Home | Trending grid | READY | Yes | Four real Products under neutral heading `Explore RELIVANOW`; no popularity claim |
| 9 | Home | Product offers | PARTIAL | No | Four real Products configured, but the section requires a confirmed campaign contract; no campaign exists |
| 10 | PDP | UGC | BLOCKED | No | No owned/authorized UGC |
| 11 | PDP | Hotspots | PARTIAL | No | Real Product media exists, but sufficient approved hotspot copy/placement evidence was not completed |
| 12 | PDP | Editorial proof | PARTIAL | No | Real media exists, but the section contract requires three attributable confirmations not present |
| 13 | PDP | Product Highlights | READY | Yes | Exactly four complete, confirmed feeder facts and four existing Product images |
| 14 | PDP | Offerings | PARTIAL | No | Real Products exist, but the required complete benefits/offers contract would imply an unapproved bundle or offer |
| 15 | PDP | Complete the Look | READY | Yes | Two distinct, available complementary Products with native forms and dynamic commerce data |

Final count: **7 READY/enabled, 4 PARTIAL/disabled, 4 BLOCKED/disabled**.

## Values saved

### Enabled Home sections

1. **Promotion marquee** — one item: `Smart care for life together.`; blank link; dark background; pause on hover enabled.
2. **Video slideshow** — status `CONFIRMED`; feeder poster `d7385e69-c6e8-4d2e-8c47-d96e7c676e19.jpg`; neutral RELIVANOW heading and verified feeding/app-control text; no external video; no rendered CTA because the link is blank; autoplay off.
3. **Image gallery** — heading `Automatic feeder details`; four distinct feeder images: `7b5eeb4e-660c-44fa-b327-e84e764df017.jpg`, `5ba72a48-3c06-493b-aeb7-ebbbd3607d43.jpg`, `9b2ba9c5-7a3f-4e4f-b18c-96bb8062d41c.jpg`, `9be31551-5b18-47f6-9312-15250688707f.jpg`; links left blank rather than guessing destinations.
4. **Category carousel** — `pet-clean` and `spare-parts`; native `collection-list` carousel; two mobile columns.
5. **Trending grid** — heading `Explore RELIVANOW`; feeder, paw-cleaning cup, nail grinder and portable water bottle Products.

### Enabled PDP sections

6. **Product Highlights** — heading `Smart feeding highlights`; exactly four `CONFIRMED` cards using existing feeder images and the four verified facts listed in the inventory.
7. **Complete the Look** — heading `Complete the setup`; `portable-pet-water-bottle-with-bowl` and `smart-pet-paw-cleaning-cup`, both `CONFIRMED`.

### Configured but disabled

- **Product offers** — heading `Featured products`; feeder, car safety seat, portable water bottle and nail grinder. Campaign status, labels, campaign copy and campaign media remain blank.
- **Hotspots, editorial proof and offerings** retain fail-closed/unconfirmed settings and no public content.
- Campaign, community, expert and PDP UGC remain blank and disabled.

## Save and remote-file verification

- The editor visibly identified development theme `193260781938` before Save; the live theme was not being customized.
- The Save was performed once after explicit owner confirmation.
- Post-Save download shows seven enabled reference instances and eight disabled instances.
- Only the two intended development templates changed.
- No Header, Footer, Product, app, Market or commercial setting was changed.
- A Theme Editor warning reported that the new PDP sections' `color_scheme` selector cannot preview schemes because the relevant scheme definitions are not exposed through the expected settings files. No code or global setting was changed to work around it in this task.

## Snapshot and hashes

Snapshots were stored outside the repository under a dedicated temporary directory with separate `development-before`, `development-after`, `live-before` and `live-after` trees.

### Development theme `193260781938`

| File | SHA-256 before | SHA-256 after | Result |
|---|---|---|---|
| `layout/theme.liquid` | `faf39505d66e1fd501edfeff5c420cf95b295d648d2856fed67b1da67e0827b2` | `faf39505d66e1fd501edfeff5c420cf95b295d648d2856fed67b1da67e0827b2` | Unchanged |
| `config/settings_data.json` | `d3e557d42f650c867c3fdb6519f68a78e200ceda9cc4cdee6fce9c37968a5bc4` | `d3e557d42f650c867c3fdb6519f68a78e200ceda9cc4cdee6fce9c37968a5bc4` | Unchanged |
| `templates/index.json` | `18ca529683c95f1aba1ea1132159df4ddde530466037f7495e48077e1c9dea93` | `9d4cbd45cd191fc533bffb5265f860d02e3b2779c50b3a53d4b1b4b158a9c04a` | Expected Save |
| `templates/product.json` | `c7fbdbc08e364503ba8bfbf8ea679fba0865fd431eef98bff2bd800db09bd3b9` | `2bb3335568034bce8a32f2910013078194ac6794ed2349b209d3fc9025d3d7b8` | Expected Save |

### Protected live theme `192527597938`

| File | SHA-256 before | SHA-256 after | Result |
|---|---|---|---|
| `layout/theme.liquid` | `e4031baede898d36ea61915ffd0b4f35fbd902f8c39a0a58495935d90062e22e` | `e4031baede898d36ea61915ffd0b4f35fbd902f8c39a0a58495935d90062e22e` | MATCH |
| `config/settings_data.json` | `52d81ec4f7798765904db1cfa3a662bcd569c1814383f8ad013851d93b899694` | `52d81ec4f7798765904db1cfa3a662bcd569c1814383f8ad013851d93b899694` | MATCH |
| `templates/index.json` | `16e646cb779fcc2ba0e9397f4ac39f2078a12f5f83374bd31c14f0cc22a4f60a` | `16e646cb779fcc2ba0e9397f4ac39f2078a12f5f83374bd31c14f0cc22a4f60a` | MATCH |
| `templates/product.json` | `b0b21b6a15bb16841960ee0b8402c9bbac6a7d463c960b7345fb1c05aace4798` | `b0b21b6a15bb16841960ee0b8402c9bbac6a7d463c960b7345fb1c05aace4798` | MATCH |

## Validation

| Check | Result |
|---|---|
| Full Node contract suite | PASS — 51/51 |
| JavaScript syntax | PASS — 99/99 |
| JSON/JSONC, Liquid schemas and setting-ID uniqueness | PASS — included in the contract suite |
| `git diff --check` before documentation | PASS |
| Raw Theme Check | EXPECTED KNOWN FINDING — 373 files; inherited Judge.me app-URI `JSONMissingBlock` false positive, one inherited `ExcessiveSettingsCount`, five inherited `UnusedDocParam` warnings; no TASK-014 code offense |
| Diagnostic Theme Check | PASS — 373 files, zero errors and the same six inherited warnings after disabling only `JSONMissingBlock` in a temporary removed config |
| Theme roles after Save | PASS — `193260781938` remains `development`; `192527597938` remains `live` |
| Development protected-file scope | PASS — only `templates/index.json` and `templates/product.json` changed |
| Live protected hashes | PASS — all four byte-identical before/after |

## Preview and visual QA

Preview entry URL:

`https://relivanow.myshopify.com?preview_theme_id=193260781938`

The mandatory post-Save authenticated visual matrix is **not complete**. After Save, the browser automation surface repeatedly timed out while obtaining state, reopening the known preview tab, listing tabs and creating a replacement Chrome tab. `shopify theme open` produced the correct preview URL, but the browser could not be controlled. An unauthenticated HTTP request redirected correctly yet served the live theme because it lacked Shopify's authenticated preview selection; that response was not used as development-theme visual evidence.

| Required QA | Result |
|---|---|
| Home and PDP at 1440×900 | PENDING — authenticated preview unavailable |
| Home and PDP at 1024×768 | PENDING — authenticated preview unavailable |
| Home and PDP at 768×1024 | PENDING — authenticated preview unavailable |
| Home and PDP at 390×844 | PENDING — authenticated preview unavailable |
| Home and PDP at 360×800 | PENDING — authenticated preview unavailable |
| Content, images, links and dynamic prices | PENDING post-Save visual confirmation |
| Responsive, overflow and touch controls | PENDING post-Save visual confirmation |
| Keyboard, focus, carousels and video fallback | PENDING post-Save interactive confirmation |
| Console | PENDING post-Save authenticated inspection |
| Theme Editor reload/preview | PARTIAL — Save and remote files verified; editor became unavailable afterward |
| Cart Drawer read-only smoke | PENDING post-Save; no cart mutation attempted |
| Judge.me | PENDING post-Save; no review data was created or changed |

TASK-013's pre-activation smoke tests are retained as historical baseline only and are not presented as post-Save proof.

## Remaining gates

1. Restore access to an authenticated controllable browser session for development theme `193260781938`.
2. Run the full five-viewport Home/PDP matrix and the required keyboard, focus, touch, overflow, carousel, video-fallback and console checks.
3. Run read-only Cart Drawer and Judge.me smoke tests without submitting forms or mutating the cart.
4. Review the blank PDP color-scheme selector warning before relying on merchant-selectable schemes; do not change global settings without separate authorization.
5. Keep all PARTIAL and BLOCKED sections disabled until their missing evidence/content contracts are satisfied.

## Safety confirmation

- No publish, `--publish`, `--live`, theme creation or live-theme operation occurred.
- Live theme `192527597938` was not targeted and remains byte-identical for all protected files.
- No Product, Variant, Collection, price, inventory, file, policy, Market, app or review data was changed.
- No Product was added to cart and no storefront form was submitted.
- No Pull Request or merge was created, and `main` was not changed.
- The two reference documents remain local-only and excluded through `.git/info/exclude`; `.gitignore` was not changed.
