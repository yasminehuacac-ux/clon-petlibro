import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const json = (path) => JSON.parse(read(path).slice(read(path).indexOf('{')));

test('Judge.me widgets inherit the approved RELIVANOW review colors', () => {
  const source = read('sections/relivanow-reviews.liquid');

  assert.match(source, /\.jdgm-star\.jdgm-star[\s\S]*?color:\s*var\(--color-rating\)\s*!important/);
  assert.match(
    source,
    /\.jdgm-rev\[data-verified-buyer=['"]?true['"]?\][\s\S]*?background-color:\s*var\(--color-verified\)\s*!important/,
  );
});

test('The RELIVANOW section heading remains the only exposed long-form review title', () => {
  const source = read('sections/relivanow-reviews.liquid');

  assert.match(
    source,
    /\.relivanow-reviews\s+\.jm-review-widget-minimal-header__title\s*\{[^}]*display:\s*none\s*!important/,
  );
});

test('Product template has one Judge.me rating source and one real-data review widget', () => {
  const template = json('templates/product.json');
  const details = template.sections.main.blocks['product-details'];
  const header = details.blocks.group_icgrde;
  const judgeBadgeId = header.block_order.find((id) => id.startsWith('judge_me_reviews_preview_badge_'));
  const reviews = template.sections.reviews_RELI04;
  const judgeWidgetId = reviews.block_order.find((id) => id.startsWith('judge_me_reviews_review_widget_'));

  assert.equal(header.blocks[judgeBadgeId].type, 'shopify://apps/judge-me-reviews/blocks/preview_badge/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8');
  assert.equal(header.block_order[0], judgeBadgeId);
  assert.equal(header.blocks.review_RELI04.disabled, true);
  assert.equal(reviews.blocks[judgeWidgetId].type, 'shopify://apps/judge-me-reviews/blocks/review_widget/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8');
  assert.deepEqual(reviews.blocks[judgeWidgetId].settings, {
    review_data: 'real_data',
    max_width: 1200,
    show_shop_reviews: false,
    empty_state: 'empty_widget',
  });
});

test('Only the Judge.me core embed is enabled by TASK-007', () => {
  const settings = json('config/settings_data.json').current;
  const appBlocks = Object.values(settings.blocks ?? {});

  assert.deepEqual(appBlocks, [{
    type: 'shopify://apps/judge-me-reviews/blocks/judgeme_core/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8',
    disabled: false,
    settings: {},
  }]);
});
