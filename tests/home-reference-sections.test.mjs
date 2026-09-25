import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const sha256 = (value) => createHash('sha256').update(value).digest('hex');

const jsonTemplate = (path) => {
  const source = read(path);
  return JSON.parse(source.slice(source.indexOf('{')));
};

const schemaFor = (path) => {
  assert.ok(existsSync(new URL(`../${path}`, import.meta.url)), `${path} must exist`);
  const match = read(path).match(/{% schema %}\s*([\s\S]*?)\s*{% endschema %}/);
  assert.ok(match, `${path} must contain a schema`);
  return JSON.parse(match[1]);
};

const settingIds = (settings = []) => new Set(settings.flatMap(({ id }) => (id ? [id] : [])));

const expectedReferences = [
  ['reference_promotion_marquee', 'relivanow-promotion-marquee'],
  ['reference_video_slideshow', 'relivanow-video-slideshow'],
  ['reference_image_gallery', 'relivanow-image-gallery'],
  ['reference_campaign_grid', 'relivanow-campaign-grid'],
  ['reference_category_carousel', 'collection-list'],
  ['reference_community_videos', 'relivanow-community-videos'],
  ['reference_expert_cards', 'relivanow-expert-cards'],
  ['reference_trending_grid', 'relivanow-trending-grid'],
  ['reference_product_offers', 'relivanow-product-offers'],
];

test('Home preserves unaffected approved entries and saves the remediated reference configuration', () => {
  const template = jsonTemplate('templates/index.json');
  const approvedIds = ['home_hero', 'home_benefits', 'home_categories', 'home_reviews', 'home_final_cta'];
  const approvedPayload = approvedIds.map((id) => [id, template.sections[id]]);

  assert.equal(
    sha256(JSON.stringify(approvedPayload)),
    '810672d6d25c0e0b088f2327538ae6ac34bb4553ce1db8c833b616944ecb442e',
    'an unaffected approved Home entry changed',
  );
  assert.deepEqual(template.order.slice(8), expectedReferences.map(([id]) => id));

  const enabledReferences = new Set([
    'reference_promotion_marquee',
  ]);

  for (const [id, type] of expectedReferences) {
    assert.equal(template.sections[id]?.type, type, `${id} must use ${type}`);
    assert.equal(Boolean(template.sections[id]?.disabled), !enabledReferences.has(id), `${id} activation state changed`);
  }

  assert.equal(template.sections.reference_campaign_grid.settings.campaign_status, '');
  assert.equal(template.sections.reference_community_videos.settings.heading, '');
  assert.equal(template.sections.reference_expert_cards.settings.heading, '');
  assert.equal(template.sections.reference_product_offers.settings.campaign_status, '');

  for (const id of ['home_products', 'home_story_routine', 'home_story_connected']) {
    assert.equal(template.sections[id]?.disabled, true, `${id} must remain in JSON but stay publicly disabled`);
  }
  assert.equal(Boolean(template.sections.home_final_cta.disabled), false, 'the remediated dark CTA remains active');
  assert.equal(template.sections.reference_category_carousel.settings.columns, 2);
  assert.equal(template.sections.reference_category_carousel.settings.collection_list.length, 2);
});

test('native collection-list implementation remains unchanged for the category reference', () => {
  const carousel = read('snippets/resource-list-carousel.liquid');

  assert.equal(
    sha256(read('sections/collection-list.liquid')).toUpperCase(),
    '1A80F7000E2C9BC0A33B1E67A8BF9CCA7E01E6961454B23C9E82430117ABA553',
  );

  const template = jsonTemplate('templates/index.json');
  const category = template.sections.reference_category_carousel;
  assert.equal(category.settings.layout_type, 'carousel');
  assert.equal(category.settings.columns, category.settings.collection_list.length);
  assert.equal(category.settings.mobile_card_size, '44cqw');
  assert.deepEqual(category.settings.collection_list, ['pet-clean', 'spare-parts']);
  assert.match(carousel, /\.slideshow-control\[disabled\]\s*\{\s*display:\s*none/);
});

test('promotion marquee exposes opt-in motion without changing the native section schema', () => {
  const schema = schemaFor('sections/relivanow-promotion-marquee.liquid');
  const ids = settingIds(schema.settings);
  const blockIds = settingIds(schema.blocks.find(({ type }) => type === 'item').settings);

  for (const id of ['movement_direction', 'seconds_per_100', 'pause_on_hover', 'desktop_gap', 'mobile_gap', 'background_color', 'text_color']) {
    assert.ok(ids.has(id), `promotion marquee is missing ${id}`);
  }
  for (const id of ['text', 'link', 'open_in_new_tab']) assert.ok(blockIds.has(id), `marquee item is missing ${id}`);

  const source = read('sections/relivanow-promotion-marquee.liquid');
  assert.match(source, /data-speed-mode="distance"/);
  assert.match(source, /prefers-reduced-motion:\s*reduce/);
});

test('marquee policy preserves legacy duration and makes distance controls opt-in', async () => {
  const { calculateMarqueeDuration, shouldPauseOnHover } = await import('../assets/relivanow-marquee-policy.js');

  assert.equal(calculateMarqueeDuration({ copyCount: 4, speedFactor: 25 }), 50);
  assert.equal(
    calculateMarqueeDuration({
      copyCount: 4,
      speedFactor: 25,
      speedMode: 'distance',
      loopDistance: 300,
      secondsPer100: 2,
    }),
    6,
  );
  assert.equal(shouldPauseOnHover(null), true, 'legacy marquee instances keep hover pause');
  assert.equal(shouldPauseOnHover('false'), false, 'new instances can explicitly opt out');
});

test('video slideshow supports confirmed responsive video slides and a safe heading level', () => {
  const schema = schemaFor('sections/relivanow-video-slideshow.liquid');
  const ids = settingIds(schema.settings);
  const slide = schema.blocks.find(({ type }) => type === 'slide');
  const blockIds = settingIds(slide.settings);

  assert.equal(schema.max_blocks, 4);
  assert.equal(schema.settings.find(({ id }) => id === 'heading_tag').default, 'h2');
  for (const id of ['heading_tag', 'autoplay', 'autoplay_speed', 'section_height', 'background_color']) assert.ok(ids.has(id));
  for (const id of ['verification_status', 'video', 'external_video', 'desktop_poster', 'mobile_poster', 'image_alt', 'heading_prefix', 'heading_highlight', 'heading_suffix', 'cta_label', 'cta_link']) assert.ok(blockIds.has(id), `video slide is missing ${id}`);

  const source = read('sections/relivanow-video-slideshow.liquid');
  assert.match(source, /verification_status\s*==\s*'CONFIRMED'/);
  assert.match(source, /prefers-reduced-motion:\s*reduce/);
});

test('video slideshow keeps long merchant headings inside narrow viewports', () => {
  const source = read('sections/relivanow-video-slideshow.liquid');
  assert.match(
    source,
    /\.relivanow-video-slideshow__heading\s*\{[^}]*overflow-wrap:\s*anywhere/s,
    'long unbroken heading content needs an emergency wrap boundary',
  );
});

test('image gallery exposes truthful 3:4 linked cards', () => {
  const schema = schemaFor('sections/relivanow-image-gallery.liquid');
  const card = schema.blocks.find(({ type }) => type === 'card');
  const ids = settingIds(card.settings);
  for (const id of ['image', 'hover_image', 'image_alt', 'label', 'link', 'open_in_new_tab']) assert.ok(ids.has(id), `gallery card is missing ${id}`);

  const source = read('sections/relivanow-image-gallery.liquid');
  assert.match(source, /aspect-ratio:\s*3\s*\/\s*4/);
  assert.match(source, /scroll-snap-type:\s*x mandatory/);
});

test('reference card layouts fill sparse desktop rows and reserve horizontal rails for mobile', () => {
  const gallery = read('sections/relivanow-image-gallery.liquid');
  const trending = read('sections/relivanow-trending-grid.liquid');
  const offers = read('sections/relivanow-product-offers.liquid');

  assert.match(gallery, /grid-template-columns:\s*repeat\(var\(--relivanow-gallery-columns\), minmax\(0, 1fr\)\)/);
  assert.match(gallery, /--relivanow-gallery-columns:\s*\{\{ desktop_columns \}\}/);
  assert.match(gallery, /@media screen and \(max-width: 749px\)[\s\S]*grid-auto-flow:\s*column/);
  assert.doesNotMatch(gallery, /grid-auto-columns:\s*calc\(\(100% - \(var\(--relivanow-gallery-gap\) \* 4\)\) \/ 5\)/);

  assert.match(trending, /--relivanow-trending-columns:\s*\{\{ desktop_columns \}\}/);
  assert.match(trending, /grid-template-columns:\s*repeat\(var\(--relivanow-trending-columns\), minmax\(0, 1fr\)\)/);
  assert.match(trending, /@media screen and \(max-width: 989px\)[\s\S]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(trending, /sizes:\s*'\(min-width: 990px\) 25vw, 50vw'/);
  assert.doesNotMatch(trending, /grid-template-columns:\s*repeat\(8,/);

  assert.match(offers, /grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(offers, /@media screen and \(max-width: 749px\)[\s\S]*grid-auto-flow:\s*column/);
  assert.match(offers, /@media screen and \(max-width: 749px\)[\s\S]*overflow-x:\s*auto/);
});

test('dark Home stories use configured foreground contrast and reserve CTA breathing room', () => {
  const template = jsonTemplate('templates/index.json');
  const source = read('sections/relivanow-home-product-story.liquid');
  const finalCta = template.sections.home_final_cta.settings;

  assert.equal(finalCta.background_color.toLowerCase(), '#171817');
  assert.equal(finalCta.text_color.toLowerCase(), '#ffffff');
  assert.match(source, /\.relivanow-home-story__eyebrow,[\s\S]*\.relivanow-home-story__text\s*\{\s*color:\s*var\(--home-story-text\)/);
  assert.match(source, /padding-block-end:\s*clamp\(48px, 7vw, 104px\)/);
  assert.doesNotMatch(source, /\.relivanow-home-story__eyebrow\s*\{[^}]*color:\s*var\(--color-brand\)/s);
  assert.doesNotMatch(source, /\.relivanow-home-story__text\s*\{[^}]*color:\s*var\(--color-muted\)/s);
});

test('campaign, community, and expert sections are explicit fail-closed contracts', () => {
  const cases = [
    ['sections/relivanow-campaign-grid.liquid', 'campaign_status', 'campaign_card'],
    ['sections/relivanow-community-videos.liquid', 'heading', 'video_card'],
    ['sections/relivanow-expert-cards.liquid', 'heading', 'expert'],
  ];

  for (const [path, requiredSetting, blockType] of cases) {
    const schema = schemaFor(path);
    const source = read(path);
    assert.ok(settingIds(schema.settings).has(requiredSetting), `${path} is missing ${requiredSetting}`);
    assert.ok(schema.blocks.some(({ type }) => type === blockType), `${path} is missing ${blockType}`);
    assert.match(source, /valid_block_count\s*>=\s*2/, `${path} must require two valid blocks`);
    assert.match(source, /request\.design_mode/, `${path} must keep empty guidance editor-only`);
    assert.match(source, /verification_status\s*==\s*'CONFIRMED'/, `${path} must require confirmation`);
  }

  const campaignSource = read('sections/relivanow-campaign-grid.liquid');
  assert.match(campaignSource, /timestamp_has_time/);
  assert.match(campaignSource, /timestamp_has_timezone/);
});

test('countdown policy rejects invalid targets and derives stable UTC parts', async () => {
  const { getCountdownParts, parseCountdownTarget } = await import('../assets/relivanow-countdown.js');
  const now = Date.parse('2026-09-24T12:00:00Z');

  assert.equal(parseCountdownTarget('', now), null);
  assert.equal(parseCountdownTarget('not-a-date', now), null);
  assert.equal(parseCountdownTarget('2026-09-25', now), null, 'date-only values are timezone-ambiguous');
  assert.equal(parseCountdownTarget('2026-09-25T14:03:04', now), null, 'timestamps require an explicit timezone');
  assert.equal(parseCountdownTarget('2026-09-24T11:59:59Z', now), null);
  assert.equal(parseCountdownTarget('2026-09-25T14:03:04Z', now), Date.parse('2026-09-25T14:03:04Z'));
  assert.deepEqual(getCountdownParts(Date.parse('2026-09-25T14:03:04Z') - now), {
    days: 1,
    hours: 2,
    minutes: 3,
    seconds: 4,
  });
});

test('video-card controller exposes truthful labels and conservative background autoplay', async () => {
  const { getVideoControlLabel, shouldAutoplayBackgroundVideo } = await import('../assets/relivanow-video-card.js');
  assert.equal(getVideoControlLabel(true), 'Play video');
  assert.equal(getVideoControlLabel(false), 'Pause video');
  assert.equal(shouldAutoplayBackgroundVideo({ reducedMotion: true, isIntersecting: true, isHiddenSlide: false }), false);
  assert.equal(shouldAutoplayBackgroundVideo({ reducedMotion: false, isIntersecting: false, isHiddenSlide: false }), false);
  assert.equal(shouldAutoplayBackgroundVideo({ reducedMotion: false, isIntersecting: true, isHiddenSlide: true }), false);
  assert.equal(shouldAutoplayBackgroundVideo({ reducedMotion: false, isIntersecting: true, isHiddenSlide: false }), true);
});

test('community poster and control remain visible above an unloaded video', () => {
  const source = read('sections/relivanow-community-videos.liquid');
  assert.match(source, /\.relivanow-community-videos__poster[^}]*z-index:\s*1/s);
  assert.match(source, /\.relivanow-community-videos__play[^}]*z-index:\s*2/s);
});

test('trending and offer sections consume native Shopify objects without default commerce claims', () => {
  const trending = schemaFor('sections/relivanow-trending-grid.liquid');
  assert.equal(trending.max_blocks, 16);
  const trendBlock = trending.blocks.find(({ type }) => type === 'item');
  const trendIds = settingIds(trendBlock.settings);
  assert.ok(trendIds.has('product'));
  assert.ok(trendIds.has('collection'));

  const offers = schemaFor('sections/relivanow-product-offers.liquid');
  const offerIds = settingIds(offers.settings);
  const productIds = settingIds(offers.blocks.find(({ type }) => type === 'product').settings);
  for (const id of ['campaign_status', 'campaign_heading', 'campaign_cta_label', 'campaign_link']) assert.ok(offerIds.has(id));
  for (const id of ['product', 'label_status', 'custom_label']) assert.ok(productIds.has(id));

  const offerSource = read('sections/relivanow-product-offers.liquid');
  assert.match(offerSource, /valid_product_count\s*>=\s*2/);
  assert.match(offerSource, /product\.price/);
  assert.match(offerSource, /product\.compare_at_price/);
  assert.match(offerSource, /label_status\s*==\s*'CONFIRMED'/);

  for (const path of ['sections/relivanow-trending-grid.liquid', 'sections/relivanow-product-offers.liquid']) {
    const source = read(path);
    assert.doesNotMatch(source, /https?:\/\//, `${path} must not ship remote commerce content`);
  }
});
