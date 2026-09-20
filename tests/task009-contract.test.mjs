import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  RELIVANOW_ANALYTICS_EVENT,
  createSemanticEvent,
  installSemanticAnalytics,
} from '../assets/relivanow-analytics.js';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const json = (path) => JSON.parse(read(path).slice(read(path).indexOf('{')));

test('search exposes its page title as an H1', () => {
  const source = read('sections/search-header.liquid');

  assert.match(source, /<h1>\{\{ heading_text \}\}<\/h1>/);
  assert.doesNotMatch(source, /<h3>\{\{ heading_text \}\}<\/h3>/);
});

test('global structured data uses a stable Organization URL and one breadcrumb renderer', () => {
  const header = read('sections/header.liquid');
  const layout = read('layout/theme.liquid');
  const breadcrumbs = read('snippets/breadcrumb-schema.liquid');

  assert.match(header, /"@context": "https:\/\/schema\.org"/);
  assert.match(header, /"url": \{\{ request\.origin \| json \}\}/);
  assert.doesNotMatch(header, /append: page\.url/);
  assert.equal((layout.match(/render 'breadcrumb-schema'/g) ?? []).length, 1);
  assert.match(breadcrumbs, /"@type": "BreadcrumbList"/);
  assert.match(breadcrumbs, /canonical_url \| json/);
});

test('social metadata follows the active locale and native page image', () => {
  const source = read('snippets/meta-tags.liquid');

  assert.match(source, /property="og:locale"/);
  assert.match(source, /property="og:image:alt"/);
  assert.match(source, /name="twitter:image"/);
  assert.match(source, /name="twitter:image:alt"/);
});

test('Product JSON-LD is omitted for blank or duplicate featured products', () => {
  for (const path of ['sections/featured-product.liquid', 'sections/featured-product-information.liquid']) {
    const source = read(path);
    assert.match(source, /section\.settings\.product != blank/);
    assert.match(source, /request\.page_type != 'product'/);
    assert.match(source, /section\.settings\.product\.id != product\.id/);
  }
});

test('market-aware fallbacks never hardcode the root cart path', () => {
  const source = read('assets/standard-actions-override.js');

  assert.doesNotMatch(source, /['"]\/cart['"]/);
  assert.match(source, /Theme\.routes\.cart_url/);
});

test('footer does not publish generic social-network homepages', () => {
  const footer = json('sections/footer-group.json');
  const socialBlock = Object.values(footer.sections)
    .flatMap(({ blocks = {} }) => Object.values(blocks))
    .find(({ type }) => type === 'social-links');

  assert.ok(socialBlock, 'footer social-links block must remain merchant-editable');
  assert.deepEqual(socialBlock.settings, {
    facebook_url: '',
    instagram_url: '',
    youtube_url: '',
    tiktok_url: '',
    twitter_url: '',
  });
});

test('semantic interaction events strip unapproved fields and contain no transport', () => {
  const event = createSemanticEvent('FAQOpened', {
    productId: 'gid://shopify/Product/123',
    faqId: 'feeding-schedule',
    category: 'feeding',
    email: 'must-not-ship@example.com',
  });

  assert.equal(event.type, RELIVANOW_ANALYTICS_EVENT);
  assert.deepEqual(event.detail, {
    event: 'FAQOpened',
    payload: {
      productId: 'gid://shopify/Product/123',
      faqId: 'feeding-schedule',
      category: 'feeding',
    },
  });

  const source = read('assets/relivanow-analytics.js');
  assert.doesNotMatch(source, /fetch\(|sendBeacon|localStorage|sessionStorage|document\.cookie|https?:\/\//);
});

test('semantic payloads reject nested values that could conceal personal data', () => {
  const event = createSemanticEvent('FAQOpened', {
    productId: 'gid://shopify/Product/123',
    faqId: 'feeding-schedule',
    category: { email: 'must-not-ship@example.com' },
  });

  assert.deepEqual(event.detail.payload, {
    productId: 'gid://shopify/Product/123',
    faqId: 'feeding-schedule',
  });
});

test('analytics listeners install once and emit one AddOnSelected event per change', () => {
  class FakeElement {
    constructor() {
      this.dataset = {};
    }
  }
  class FakeInput extends FakeElement {
    matches(selector) {
      return selector === '[data-addon-variant-id]';
    }

    closest(selector) {
      return selector === 'product-component'
        ? {
            getAttribute(attribute) {
              return attribute === 'view-event-payload' ? JSON.stringify({ product: { id: '123' } }) : null;
            },
          }
        : null;
    }
  }
  class FakeDetails extends FakeElement {}

  const previousGlobals = {
    Element: globalThis.Element,
    HTMLInputElement: globalThis.HTMLInputElement,
    HTMLDetailsElement: globalThis.HTMLDetailsElement,
  };
  globalThis.Element = FakeElement;
  globalThis.HTMLInputElement = FakeInput;
  globalThis.HTMLDetailsElement = FakeDetails;

  const listeners = new Map();
  const emitted = [];
  const target = {
    addEventListener(type, listener) {
      const registered = listeners.get(type) ?? [];
      registered.push(listener);
      listeners.set(type, registered);
    },
    dispatchEvent(event) {
      emitted.push(event);
      return true;
    },
  };

  try {
    installSemanticAnalytics(target);
    installSemanticAnalytics(target);

    assert.equal(listeners.get('change').length, 1);
    const input = new FakeInput();
    input.dataset.addonVariantId = '456';
    input.checked = true;
    listeners.get('change')[0]({ target: input });

    assert.equal(emitted.length, 1);
    assert.deepEqual(emitted[0].detail, {
      event: 'AddOnSelected',
      payload: {
        productId: '123',
        addOnVariantId: '456',
        selected: true,
      },
    });
  } finally {
    for (const [name, value] of Object.entries(previousGlobals)) {
      if (value === undefined) delete globalThis[name];
      else globalThis[name] = value;
    }
  }
});
