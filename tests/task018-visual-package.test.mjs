import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const rootUrl = new URL('../', import.meta.url);
const fileUrl = (path) => new URL(path, rootUrl);
const read = (path) => readFileSync(fileUrl(path), 'utf8');
const readBuffer = (path) => readFileSync(fileUrl(path));
const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');

const jsonTemplate = (path) => {
  const source = read(path);
  return JSON.parse(source.slice(source.indexOf('{')));
};

const schemaFor = (path) => {
  const match = read(path).match(/{% schema %}\s*([\s\S]*?)\s*{% endschema %}/);
  assert.ok(match, `${path} must contain a schema`);
  return JSON.parse(match[1]);
};

const approvedAssets = [
  ['01-relivanow-home-hero-16x9.png', 1672, 941, '05a9efa36fcdb629d528d9f29239b690ad1bd9540296a21d5526362834ba7555'],
  ['02-relivanow-cat-feeding-16x9.png', 1672, 941, 'bedcb400443718296a0a0957f08f5ff8b9b111d499c40ac757a3fd495c6fe927'],
  ['03-relivanow-editorial-cat-4x5.png', 1122, 1402, '0e1412091b9f2313e7120915bd54c8ca9355bcb2973b26454da5a26c1c080bb6'],
  ['04-relivanow-camera-detail-4x5.png', 1122, 1402, '2bfb9c0388aae85de9c07a979da925911ba01e92ce447d5c6e6cbc41067a2816'],
  ['05-relivanow-cat-dog-3x4.png', 1086, 1448, '6c443aade8556fcdb6d52d03598558dcbaa9d902376244dbc252c6362d23e75c'],
  ['06-relivanow-product-studio-1x1.png', 1254, 1254, 'f3f8bc10936422753127463180c8cbeb08bd135ee67627dbb75fe3ecbb2f9c07'],
];

const expectedFallbacks = new Map([
  ['01-relivanow-home-hero-16x9.png', ['home_hero', 'campaign_primary']],
  ['02-relivanow-cat-feeding-16x9.png', ['home_story_routine']],
  ['03-relivanow-editorial-cat-4x5.png', ['reference_image_gallery', 'card_w8xXHn']],
  ['04-relivanow-camera-detail-4x5.png', ['reference_image_gallery', 'card_EYBDWc']],
  ['05-relivanow-cat-dog-3x4.png', ['reference_image_gallery', 'card_rqkqMX']],
  ['06-relivanow-product-studio-1x1.png', ['reference_image_gallery', 'card_KEe4PJ']],
]);

const fallbackAt = (template, location) => {
  const [sectionId, blockId] = location;
  return blockId
    ? template.sections[sectionId]?.blocks?.[blockId]?.settings?.approved_asset_fallback
    : template.sections[sectionId]?.settings?.approved_asset_fallback;
};

test('approved visual inventory keeps the exact reviewed bytes and intrinsic dimensions', () => {
  for (const [name, width, height, expectedHash] of approvedAssets) {
    const path = `assets/${name}`;
    assert.ok(existsSync(fileUrl(path)), `${name} is missing`);
    const png = readBuffer(path);
    assert.equal(png.subarray(1, 4).toString('ascii'), 'PNG', `${name} is not a PNG`);
    assert.equal(png.readUInt32BE(16), width, `${name} width changed`);
    assert.equal(png.readUInt32BE(20), height, `${name} height changed`);
    assert.equal(sha256(png), expectedHash, `${name} bytes changed`);
  }
});

test('every approved asset has one controlled Home fallback assignment', () => {
  const template = jsonTemplate('templates/index.json');
  for (const [name] of approvedAssets) {
    assert.equal(fallbackAt(template, expectedFallbacks.get(name)), name, `${name} is not assigned to its intended Home surface`);
  }
});

test('approved fallback renderer is responsive, intrinsic, allowlisted, and fail closed', () => {
  const path = 'snippets/relivanow-approved-image.liquid';
  assert.ok(existsSync(fileUrl(path)), 'approved fallback renderer is missing');
  const source = read(path);

  for (const [name, width, height] of approvedAssets) {
    assert.match(source, new RegExp(`when '${name.replaceAll('.', '\\.')}'`), `${name} is not allowlisted`);
    assert.match(source, new RegExp(`assign asset_width = ${width}`), `${name} width metadata is missing`);
    assert.match(source, new RegExp(`assign asset_height = ${height}`), `${name} height metadata is missing`);
  }

  assert.equal((source.match(/when '\d{2}-relivanow-[^']+\.png'/g) ?? []).length, 6, 'renderer must allowlist exactly six images');
  assert.match(source, /asset_filename != blank/);
  assert.match(source, /srcset=/);
  assert.match(source, /sizes=/);
  assert.match(source, /width="\{\{ asset_width \}\}"/);
  assert.match(source, /height="\{\{ asset_height \}\}"/);
  assert.doesNotMatch(source, /https?:\/\//);
});

test('picker-first sections expose controlled fallback and truthful loading contracts', () => {
  const hero = read('sections/relivanow-home-hero.liquid');
  const story = read('sections/relivanow-home-product-story.liquid');
  const gallery = read('sections/relivanow-image-gallery.liquid');
  const heroSchema = schemaFor('sections/relivanow-home-hero.liquid');
  const storySchema = schemaFor('sections/relivanow-home-product-story.liquid');
  const gallerySchema = schemaFor('sections/relivanow-image-gallery.liquid');

  const heroSettings = new Set(heroSchema.blocks.find(({ type }) => type === 'slide').settings.map(({ id }) => id));
  const storySettings = new Set(storySchema.settings.map(({ id }) => id));
  const gallerySettings = new Set(gallerySchema.blocks.find(({ type }) => type === 'card').settings.map(({ id }) => id));

  for (const [label, settings] of [['hero', heroSettings], ['story', storySettings], ['gallery', gallerySettings]]) {
    assert.ok(settings.has('image_alt'), `${label} alt must remain configurable`);
    assert.ok(settings.has('approved_asset_fallback'), `${label} fallback must be configurable`);
  }

  assert.match(hero, /desktop_image == blank[\s\S]*approved_asset_fallback/);
  assert.match(story, /story_image == blank[\s\S]*approved_asset_fallback/);
  assert.match(gallery, /block\.settings\.image != blank or block\.settings\.approved_asset_fallback != blank/);
  assert.match(hero, /slide_index == 0 and section\.index <= 2[\s\S]*assign image_loading = 'eager'[\s\S]*assign image_priority = 'high'/);
  assert.match(story, /loading:\s*'lazy'|loading: image_loading/);
  assert.match(gallery, /loading:\s*'lazy'/);
  assert.doesNotMatch(story, /fetchpriority:\s*'high'/);
  assert.doesNotMatch(gallery, /fetchpriority:\s*'high'/);
});

test('hero and editorial layouts reserve stable crops without empty columns or fake controls', () => {
  const hero = read('sections/relivanow-home-hero.liquid');
  const story = read('sections/relivanow-home-product-story.liquid');
  const gallery = read('sections/relivanow-image-gallery.liquid');

  assert.match(hero, /rendered_slide_count > 1[\s\S]*render 'slideshow-controls'/);
  assert.match(hero, /object-fit:\s*cover/);
  assert.match(story, /object-fit:\s*cover/);
  assert.match(gallery, /object-fit:\s*cover/);
  assert.match(gallery, /--relivanow-gallery-columns:\s*\{\{ desktop_columns \}\}/);
  assert.match(gallery, /grid-template-columns:\s*repeat\(var\(--relivanow-gallery-columns\), minmax\(0, 1fr\)\)/);
  assert.match(gallery, /@media screen and \(max-width: 749px\)[\s\S]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.doesNotMatch(gallery, /@media screen and \(max-width: 749px\)[\s\S]*overflow-x:\s*auto/);
  assert.doesNotMatch(gallery, /slideshow-controls|carousel/);
});

test('Home publishes only the approved four-surface visual composition', () => {
  const template = jsonTemplate('templates/index.json');
  const activeIds = template.order.filter((id) => !template.sections[id].disabled);
  assert.deepEqual(activeIds, [
    'reference_promotion_marquee',
    'home_hero',
    'home_story_routine',
    'reference_image_gallery',
  ]);

  const disabledIds = [
    'home_benefits',
    'home_categories',
    'home_products',
    'home_story_connected',
    'home_reviews',
    'home_final_cta',
    'reference_video_slideshow',
    'reference_campaign_grid',
    'reference_category_carousel',
    'reference_community_videos',
    'reference_expert_cards',
    'reference_trending_grid',
    'reference_product_offers',
  ];
  for (const id of disabledIds) {
    assert.ok(template.sections[id], `${id} must remain editable in the template`);
    assert.equal(template.sections[id].disabled, true, `${id} must remain fail closed`);
  }
});

test('active TASK-018 copy is neutral and the editorial gallery adds no overlay text', () => {
  const template = jsonTemplate('templates/index.json');
  const hero = template.sections.home_hero.blocks.campaign_primary.settings;
  const story = template.sections.home_story_routine.settings;
  const gallery = template.sections.reference_image_gallery;
  const copy = [
    hero.eyebrow,
    hero.heading,
    hero.text,
    hero.primary_label,
    story.eyebrow,
    story.heading,
    story.text,
    story.cta_label,
    gallery.settings.heading,
    ...gallery.block_order.flatMap((id) => [gallery.blocks[id].settings.label, gallery.blocks[id].settings.link]),
  ].filter(Boolean).join(' ');

  assert.doesNotMatch(copy, /https?:\/\//i);
  assert.doesNotMatch(copy, /\d|discount|sale|review|rating|expert|ugc|community|testimonial|certif|capacity|camera/iu);
  assert.equal(gallery.settings.heading, '');
  for (const id of gallery.block_order) {
    assert.equal(gallery.blocks[id].settings.label, '');
    assert.equal(gallery.blocks[id].settings.link, '');
  }
});
