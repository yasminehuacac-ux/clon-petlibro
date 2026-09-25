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
  ['reference_pdp_ugc', 'relivanow-pdp-ugc'],
  ['reference_pdp_hotspots', 'relivanow-shoppable-hotspots'],
  ['reference_pdp_editorial_proof', 'relivanow-editorial-proof'],
  ['reference_pdp_highlights', 'relivanow-product-highlights'],
  ['reference_pdp_offerings', 'relivanow-offerings'],
  ['reference_pdp_complete_look', 'relivanow-complete-look'],
];

const sectionPaths = expectedReferences.map(([, type]) => `sections/${type}.liquid`);

test('default Product template preserves all nineteen approved entries and saves the approved reference configuration', () => {
  const template = jsonTemplate('templates/product.json');
  const approvedIds = template.order.slice(0, 19);
  const approvedPayload = approvedIds.map((id) => [id, template.sections[id]]);

  assert.equal(
    sha256(JSON.stringify(approvedPayload)),
    'c20b497611c8b463d5860285d8acbdda745016cbfb9d7a3c58a057ffd57d0200',
    'the approved Product payload changed',
  );
  assert.deepEqual(template.order.slice(19), expectedReferences.map(([id]) => id));

  const enabledReferences = new Set(['reference_pdp_highlights', 'reference_pdp_complete_look']);

  for (const [id, type] of expectedReferences) {
    assert.equal(template.sections[id]?.type, type, `${id} must use ${type}`);
    assert.equal(Boolean(template.sections[id]?.disabled), !enabledReferences.has(id), `${id} activation state changed`);
  }

  assert.equal(template.sections.reference_pdp_ugc.settings.heading, '');
  assert.equal(template.sections.reference_pdp_hotspots.settings.verification_status, 'UNCONFIRMED');
  assert.equal(template.sections.reference_pdp_editorial_proof.settings.verification_status, 'UNCONFIRMED');
  assert.equal(template.sections.reference_pdp_offerings.settings.heading, '');
  assert.equal(template.sections.reference_pdp_highlights.block_order.length, 4);
  assert.equal(template.sections.reference_pdp_complete_look.block_order.length, 2);
});

test('all six PDP reference sections expose merchant-owned schemas without presets containing content', () => {
  for (const path of sectionPaths) {
    const schema = schemaFor(path);
    assert.ok(schema.name.startsWith('RELIVANOW'), `${path} needs a RELIVANOW editor name`);
    assert.deepEqual(schema.disabled_on, { groups: ['header', 'footer'] });
    assert.ok(Array.isArray(schema.settings));
    assert.ok(Array.isArray(schema.blocks));
  }
});

test('UGC is a three-item confirmed media contract with a native accessible modal', () => {
  const path = 'sections/relivanow-pdp-ugc.liquid';
  const schema = schemaFor(path);
  const source = read(path);
  const item = schema.blocks.find(({ type }) => type === 'ugc_item');
  const ids = settingIds(item?.settings);

  for (const id of ['verification_status', 'creator_handle', 'image', 'video', 'media_alt', 'product_one', 'product_two']) {
    assert.ok(ids.has(id), `UGC item is missing ${id}`);
  }
  assert.match(source, /valid_item_count\s*>=\s*3/);
  assert.match(source, /verification_status\s*==\s*'CONFIRMED'/);
  assert.match(source, /<dialog/);
  assert.match(source, /request\.design_mode/);
});

test('shoppable image requires approved panoramic media and two distinct confirmed Products', () => {
  const path = 'sections/relivanow-shoppable-hotspots.liquid';
  const schema = schemaFor(path);
  const source = read(path);
  const hotspot = schema.blocks.find(({ type }) => type === 'hotspot');
  const ids = settingIds(hotspot?.settings);

  for (const id of ['verification_status', 'product', 'x_position', 'y_position']) {
    assert.ok(ids.has(id), `hotspot is missing ${id}`);
  }
  assert.match(source, /section\.settings\.verification_status\s*==\s*'CONFIRMED'/);
  assert.match(source, /valid_product_count\s*>=\s*2/);
  assert.match(source, /seen_product_ids/);
  assert.match(source, /product-hotspot\.js/);
  assert.match(source, /request\.design_mode/);
});

test('editorial proof requires three attributed confirmations and emits no rating vocabulary', () => {
  const path = 'sections/relivanow-editorial-proof.liquid';
  const schema = schemaFor(path);
  const source = read(path);
  const proof = schema.blocks.find(({ type }) => type === 'proof');
  const ids = settingIds(proof?.settings);

  for (const id of ['verification_status', 'quote', 'source_name', 'source_role', 'avatar', 'source_link']) {
    assert.ok(ids.has(id), `proof block is missing ${id}`);
  }
  assert.match(source, /valid_proof_count\s*==\s*3/);
  assert.match(source, /section\.settings\.verification_status\s*==\s*'CONFIRMED'/);
  assert.doesNotMatch(source, /aggregateRating|reviewRating|ratingValue/i);
  assert.match(source, /request\.design_mode/);
});

test('Product Highlights requires exactly four complete full-bleed cards', () => {
  const path = 'sections/relivanow-product-highlights.liquid';
  const schema = schemaFor(path);
  const source = read(path);
  const highlight = schema.blocks.find(({ type }) => type === 'highlight');
  const ids = settingIds(highlight?.settings);

  assert.equal(schema.max_blocks, 4);
  for (const id of ['verification_status', 'image', 'image_alt', 'title', 'text']) {
    assert.ok(ids.has(id), `highlight is missing ${id}`);
  }
  assert.match(source, /valid_highlight_count\s*==\s*4/);
  assert.match(source, /scroll-snap-type:\s*x mandatory/);
  assert.match(source, /request\.design_mode/);
});

test('Offerings requires four benefits and two approved offers without default promotions', () => {
  const path = 'sections/relivanow-offerings.liquid';
  const schema = schemaFor(path);
  const source = read(path);
  const benefit = schema.blocks.find(({ type }) => type === 'benefit');
  const offer = schema.blocks.find(({ type }) => type === 'offer');

  for (const id of ['verification_status', 'icon', 'label']) assert.ok(settingIds(benefit?.settings).has(id));
  for (const id of ['verification_status', 'benefit_slot', 'image', 'image_alt', 'title', 'terms', 'link', 'link_label']) {
    assert.ok(settingIds(offer?.settings).has(id), `offer is missing ${id}`);
  }
  assert.match(source, /valid_benefit_count\s*==\s*4/);
  assert.match(source, /valid_offer_count\s*>=\s*2/);
  assert.match(source, /role="tablist"/);
  assert.match(source, /role="tabpanel"/);
  assert.match(read('assets/relivanow-offerings.js'), /aria-labelledby/);
  assert.match(source, /request\.design_mode/);
  assert.doesNotMatch(source, /unless block\.settings\.benefit_slot == '1'.*hidden/);
  assert.match(read('assets/relivanow-offerings.js'), /firstOffer.*data-offer-slot/s);
});

test('Complete the Look requires two distinct real Products and native Product forms', () => {
  const path = 'sections/relivanow-complete-look.liquid';
  const schema = schemaFor(path);
  const source = read(path);
  const productBlock = schema.blocks.find(({ type }) => type === 'product');
  const ids = settingIds(productBlock?.settings);

  for (const id of ['verification_status', 'product', 'image_override', 'image_alt']) {
    assert.ok(ids.has(id), `Complete the Look Product is missing ${id}`);
  }
  assert.equal(schema.max_blocks, 2);
  assert.match(source, /valid_product_count\s*==\s*2/);
  assert.match(source, /seen_product_ids/);
  assert.match(source, /data-variant-source="form"/);
  assert.match(source, /form 'product'/);
  assert.match(source, /product\.price\s*\|\s*money/);
  assert.match(source, /request\.design_mode/);
});

test('Product form variant resolution remains legacy by default and becomes form-first only by opt-in', async () => {
  const { resolveProductFormVariantId } = await import('../assets/relivanow-product-form-policy.js');
  const productFormSource = read('assets/product-form.js');

  assert.equal(
    resolveProductFormVariantId({ urlVariantId: 'main', formVariantId: 'cross-sell', selectedVariantId: 'radio' }),
    'main',
  );
  assert.equal(
    resolveProductFormVariantId({
      urlVariantId: 'main',
      formVariantId: 'cross-sell',
      selectedVariantId: 'radio',
      preferFormVariant: true,
    }),
    'cross-sell',
  );
  assert.equal(resolveProductFormVariantId({ formVariantId: '', selectedVariantId: 'radio', preferFormVariant: true }), 'radio');
  assert.match(productFormSource, /resolveProductFormVariantId\(\{/);
  assert.match(productFormSource, /preferFormVariant:\s*this\.dataset\.variantSource\s*===\s*'form'/);
});

test('Complete-the-Look option matching selects only an exact available variant', async () => {
  const { findVariantByOptions } = await import('../assets/relivanow-complete-look.js');
  const singleton = [{ id: 9, available: true, options: ['Default Title'] }];
  const variants = [
    { id: 1, available: true, options: ['White', 'Small'] },
    { id: 2, available: false, options: ['White', 'Large'] },
    { id: 3, available: true, options: ['Graphite', 'Large'] },
  ];

  assert.deepEqual(findVariantByOptions(variants, ['Graphite', 'Large']), variants[2]);
  assert.equal(findVariantByOptions(variants, ['White', 'Large']), null);
  assert.equal(findVariantByOptions(variants, ['White']), null);
  assert.deepEqual(findVariantByOptions(singleton, []), singleton[0]);
});

test('new PDP sections ship no remote runtime, tracker or fabricated commercial defaults', () => {
  for (const path of sectionPaths) {
    assert.ok(existsSync(new URL(`../${path}`, import.meta.url)), `${path} must exist`);
    const source = read(path);
    assert.doesNotMatch(source, /https?:\/\//i, `${path} must not ship remote URLs`);
    assert.doesNotMatch(source, /googletagmanager|gtag\(|fbq\(|dataLayer|clarity\(|ttq\(/i, `${path} must not ship trackers`);
    assert.doesNotMatch(
      source,
      /"default"\s*:\s*"[^"]*(discount|sale|save|review|verified buyer|expert|clinician|award|guarantee|free shipping|limited time)/i,
      `${path} must not ship fabricated commercial or authority defaults`,
    );
  }
});

test('new PDP interactions expose 44px targets and reduced-motion policy', () => {
  for (const path of sectionPaths) {
    const source = read(path);
    if (/button|role="tab"|product-hotspot-component/.test(source)) {
      assert.match(source, /44px|var\(--minimum-touch-target\)/, `${path} needs a 44px interaction target`);
    }
    assert.match(source, /prefers-reduced-motion:\s*reduce/, `${path} needs reduced-motion handling`);
  }
});

test('interactive enhancements cover backdrop dismissal, tab keys, responsive variant media and hotspot placement', () => {
  const ugc = read('assets/relivanow-pdp-ugc.js');
  const offerings = read('assets/relivanow-offerings.js');
  const completeLook = read('assets/relivanow-complete-look.js');
  const hotspots = read('sections/relivanow-shoppable-hotspots.liquid');

  assert.match(ugc, /event\.target instanceof HTMLDialogElement/);
  assert.match(offerings, /ArrowRight|ArrowLeft/);
  assert.match(completeLook, /image\.srcset\s*=\s*imageUrl/);
  assert.match(hotspots, /data-placement\*=['"]center['"]/);
  assert.match(hotspots, /data-placement\*=['"]left['"]/);
});
