import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const schemaFor = (path) => {
  assert.ok(existsSync(new URL(`../${path}`, import.meta.url)), `${path} must exist`);
  const source = read(path);
  const match = source.match(/{% schema %}\s*([\s\S]*?)\s*{% endschema %}/);
  assert.ok(match, `${path} must contain a schema`);
  return JSON.parse(match[1]);
};

const jsonTemplate = (path) => {
  const source = read(path);
  return JSON.parse(source.slice(source.indexOf('{')));
};

test('Home hero exposes approved responsive campaign controls', () => {
  const source = read('sections/relivanow-home-hero.liquid');
  const schema = schemaFor('sections/relivanow-home-hero.liquid');
  const settingIds = new Set(schema.settings.filter(({ id }) => id).map(({ id }) => id));
  const slide = schema.blocks.find(({ type }) => type === 'slide');
  const slideSettingIds = new Set(slide.settings.filter(({ id }) => id).map(({ id }) => id));

  for (const id of ['enable_section', 'fallback_collection', 'section_height', 'autoplay', 'autoplay_speed', 'controls_style']) {
    assert.ok(settingIds.has(id), `hero section is missing ${id}`);
  }

  for (const id of [
    'verification_status',
    'product',
    'desktop_image',
    'mobile_image',
    'mobile_object_position',
    'crop_embedded_copy',
    'image_alt',
    'eyebrow',
    'heading',
    'text',
    'primary_label',
    'primary_link',
    'secondary_label',
    'secondary_link',
    'content_position',
    'overlay_opacity',
  ]) {
    assert.ok(slideSettingIds.has(id), `hero slide is missing ${id}`);
  }

  assert.match(
    source,
    /@media screen and \(max-width: 749px\)[\s\S]*?\.relivanow-home-hero__copy\s*\{[^}]*background:/,
    'mobile hero copy needs an opaque-enough surface when fallback product art contains embedded text',
  );
});

test('Home product story consumes native Product data and approved media', () => {
  const schema = schemaFor('sections/relivanow-home-product-story.liquid');
  const settingIds = new Set(schema.settings.filter(({ id }) => id).map(({ id }) => id));

  for (const id of [
    'enable_section',
    'fallback_collection',
    'verification_status',
    'product',
    'image',
    'product_media_position',
    'crop_embedded_copy',
    'image_alt',
    'eyebrow',
    'heading',
    'text',
    'cta_label',
    'cta_link',
    'media_position',
    'section_width',
    'background_color',
  ]) {
    assert.ok(settingIds.has(id), `product story is missing ${id}`);
  }
});

test('Home template follows the conversion sequence and keeps one H1 owner', () => {
  const template = jsonTemplate('templates/index.json');
  const approvedHomeIds = template.order.filter((id) => !template.sections[id].disabled);
  const types = approvedHomeIds.map((id) => template.sections[id].type);
  const feederHandle = 'automatic-pet-feeder-with-remote-control-and-timed-feeding';

  assert.deepEqual(approvedHomeIds, [
    'reference_promotion_marquee',
    'home_hero',
    'home_story_routine',
    'reference_image_gallery',
  ]);
  assert.deepEqual(types, [
    'relivanow-promotion-marquee',
    'relivanow-home-hero',
    'relivanow-home-product-story',
    'relivanow-image-gallery',
  ]);

  assert.equal(types.filter((type) => type === 'relivanow-home-hero').length, 1);
  assert.equal(template.sections.home_hero.blocks.campaign_primary.settings.product, feederHandle);
  assert.equal(template.sections.home_hero.blocks.campaign_primary.settings.mobile_object_position, 'left center');
  assert.equal(template.sections.home_hero.blocks.campaign_primary.settings.crop_embedded_copy, false);
  assert.equal(template.sections.home_hero.blocks.campaign_primary.settings.approved_asset_fallback, '01-relivanow-home-hero-16x9.png');
  assert.equal(template.sections.home_story_routine.settings.product, feederHandle);
  assert.equal(template.sections.home_story_connected.settings.product, feederHandle);
  assert.equal(template.sections.home_final_cta.settings.product, feederHandle);
  assert.equal(template.sections.home_story_routine.settings.crop_embedded_copy, false);
  assert.equal(template.sections.home_story_routine.settings.approved_asset_fallback, '02-relivanow-cat-feeding-16x9.png');
  assert.equal(template.sections.home_story_connected.settings.crop_embedded_copy, true);
  assert.equal(template.sections.home_final_cta.settings.crop_embedded_copy, true);
  assert.equal(template.sections.home_products.settings.defer_card_images, true);
  assert.equal(
    template.sections.home_categories.disabled,
    true,
    'category placeholders must stay fail-closed until real collections are selected',
  );
});

test('Home can defer native product-card media below the LCP hero', () => {
  const productListSchema = schemaFor('sections/product-list.liquid');
  assert.ok(
    productListSchema.settings.some(({ id }) => id === 'defer_card_images'),
    'native product list must expose defer_card_images',
  );

  const cardGallery = read('snippets/card-gallery.liquid');
  assert.match(cardGallery, /section\.settings\.defer_card_images/);
});

test('Global Home shell uses claim-safe announcement and native newsletter', () => {
  const header = jsonTemplate('sections/header-group.json');
  const announcementSection = Object.values(header.sections).find(({ type }) => type === 'header-announcements');
  const announcement = Object.values(announcementSection.blocks).find(({ type }) => type === '_announcement');
  assert.equal(announcement.settings.text, 'Smart care for life together.');

  const footer = jsonTemplate('sections/footer-group.json');
  const footerSection = Object.values(footer.sections).find(({ type }) => type === 'footer');
  assert.ok(Object.values(footerSection.blocks).some(({ type }) => type === 'email-signup'));

  const headerLiquid = read('sections/header.liquid');
  assert.doesNotMatch(
    headerLiquid,
    /<h1 class="visually-hidden">\{\{ shop\.name \}\}<\/h1>/,
    'the visible Home hero, not the global header, owns the single H1',
  );
});
