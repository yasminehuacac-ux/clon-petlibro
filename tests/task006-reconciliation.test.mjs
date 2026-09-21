import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

function stripJsonComments(source) {
  let result = '';
  let inString = false;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];

    if (lineComment) {
      if (character === '\n') {
        lineComment = false;
        result += character;
      }
      continue;
    }

    if (blockComment) {
      if (character === '*' && next === '/') {
        blockComment = false;
        index += 1;
      }
      continue;
    }

    if (!inString && character === '/' && next === '/') {
      lineComment = true;
      index += 1;
      continue;
    }

    if (!inString && character === '/' && next === '*') {
      blockComment = true;
      index += 1;
      continue;
    }

    result += character;

    if (inString) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === '"') inString = false;
    } else if (character === '"') {
      inString = true;
    }
  }

  return result;
}

test('PDP anchor navigation is fail-closed and exposes an accessible active location', () => {
  const section = read('sections/relivanow-pdp-navigation.liquid');
  const script = read('assets/relivanow-pdp-navigation.js');

  assert.match(section, /<relivanow-pdp-navigation[^>]+hidden/);
  assert.match(section, /data-relivanow-pdp-target=/);
  assert.match(section, /aria-label=/);
  assert.match(section, /\.shopify-section:has\(\.relivanow-pdp-navigation\)/);
  assert.match(section, /var\(--header-group-height/);
  assert.match(section, /scroll-margin-block-start/);
  assert.match(script, /querySelector\(selector\)/);
  assert.match(script, /key === 'purchase' \? matched/);
  assert.match(script, /link\.hidden = true/);
  assert.match(script, /aria-current', 'location'/);
  assert.match(script, /removeAttribute\('aria-current'\)/);
  assert.match(script, /requestAnimationFrame/);
  assert.match(
    script,
    /import \{ getScrollEventTarget, scrollContainerMediaQuery, scrollTo \} from '.\/scroll-container\.js';/
  );
  assert.match(script, /this\.#scrollTarget\.addEventListener\('scroll'/);
  assert.doesNotMatch(script, /window\.addEventListener\('scroll'/);
  assert.match(script, /scrollContainerMediaQuery\.addEventListener\('change'/);
  assert.match(script, /scrollContainerMediaQuery\.removeEventListener\('change'/);
  assert.match(script, /this\.addEventListener\('click', this\.#handleNavigation/);
  assert.match(script, /event\.preventDefault\(\)/);
  assert.match(script, /getAbsoluteOffsetTop\(destination\.target\) - this\.#getActivationLine\(\)/);
  assert.match(script, /scrollTo\(\{ top: destinationTop, behavior \}\)/);
  assert.match(script, /history\.pushState\(history\.state, '', destination\.link\.hash\)/);
  assert.match(script, /const ANCHOR_GAP = 16;/);
  assert.match(script, /const ACTIVATION_EPSILON = 1;/);
  assert.match(script, /this\.offsetHeight \+ ANCHOR_GAP \+ 1/);
  assert.match(script, /getBoundingClientRect\(\)\.top <= activationLine \+ ACTIVATION_EPSILON/);
  assert.match(script, /scrollTop \+ viewportHeight >= scrollHeight - 1/);
  assert.match(script, /pageDestinations\.at\(-1\)/);
  assert.doesNotMatch(script, /IntersectionObserver/);
});

test('PDP anchor navigation rebinds its scroll listener when the responsive scroll owner changes', async () => {
  const source = `${read('assets/relivanow-pdp-navigation.js').replace(
    /^import .*scroll-container\.js';$/m,
    'const { getScrollEventTarget, scrollContainerMediaQuery, scrollTo } = globalThis.__pdpNavigationTestDeps;'
  )}\nglobalThis.__pdpNavigationTestSort = getDestinationsInPageOrder;`;

  class TrackedTarget extends EventTarget {
    listeners = new Map();

    addEventListener(type, listener, options) {
      super.addEventListener(type, listener, options);
      const listeners = this.listeners.get(type) ?? new Set();
      listeners.add(listener);
      this.listeners.set(type, listeners);
    }

    removeEventListener(type, listener, options) {
      super.removeEventListener(type, listener, options);
      this.listeners.get(type)?.delete(listener);
    }

    listenerCount(type) {
      return this.listeners.get(type)?.size ?? 0;
    }
  }

  class FakeElement extends EventTarget {
    hidden = false;
    offsetHeight = 50;
    offsetTop = 0;
    offsetParent = null;

    querySelectorAll() {
      return [];
    }

    getBoundingClientRect() {
      return { height: 50, top: 0 };
    }
  }

  const desktopTarget = new TrackedTarget();
  const mobileTarget = new TrackedTarget();
  const mediaQuery = new TrackedTarget();
  let currentTarget = desktopTarget;
  const registry = new Map();
  const originalGlobals = {
    HTMLElement: globalThis.HTMLElement,
    HTMLAnchorElement: globalThis.HTMLAnchorElement,
    ResizeObserver: globalThis.ResizeObserver,
    customElements: globalThis.customElements,
    document: globalThis.document,
    window: globalThis.window,
    requestAnimationFrame: globalThis.requestAnimationFrame,
    cancelAnimationFrame: globalThis.cancelAnimationFrame,
    getComputedStyle: globalThis.getComputedStyle,
    deps: globalThis.__pdpNavigationTestDeps,
    sort: globalThis.__pdpNavigationTestSort,
  };

  try {
    globalThis.HTMLElement = FakeElement;
    globalThis.HTMLAnchorElement = FakeElement;
    globalThis.ResizeObserver = class {
      observe() {}
      disconnect() {}
    };
    globalThis.customElements = {
      get: (name) => registry.get(name),
      define: (name, constructor) => registry.set(name, constructor),
    };
    globalThis.document = {
      body: { style: { setProperty() {}, removeProperty() {} } },
      addEventListener() {},
      querySelector() {
        return null;
      },
    };
    globalThis.window = new EventTarget();
    globalThis.requestAnimationFrame = (callback) => {
      callback();
      return 1;
    };
    globalThis.cancelAnimationFrame = () => {};
    globalThis.getComputedStyle = () => ({ getPropertyValue: () => '0' });
    globalThis.__pdpNavigationTestDeps = {
      getScrollEventTarget: () => currentTarget,
      scrollContainerMediaQuery: mediaQuery,
      scrollTo: () => {},
    };

    const encoded = Buffer.from(source).toString('base64');
    await import(`data:text/javascript;base64,${encoded}`);
    const Navigation = registry.get('relivanow-pdp-navigation');
    const navigation = new Navigation();

    const purchaseTarget = Object.assign(new FakeElement(), { offsetTop: 100 });
    const overviewTarget = Object.assign(new FakeElement(), { offsetTop: 500 });
    const reviewsTarget = Object.assign(new FakeElement(), { offsetTop: 900 });
    const reorderedDestinations = [
      { label: 'Reviews', target: reviewsTarget },
      { label: 'Purchase', target: purchaseTarget },
      { label: 'Overview', target: overviewTarget },
    ];

    assert.deepEqual(
      globalThis.__pdpNavigationTestSort(reorderedDestinations).map((item) => item.label),
      ['Purchase', 'Overview', 'Reviews']
    );

    navigation.connectedCallback();
    assert.equal(desktopTarget.listenerCount('scroll'), 1);
    assert.equal(mobileTarget.listenerCount('scroll'), 0);

    currentTarget = mobileTarget;
    mediaQuery.dispatchEvent(new Event('change'));
    assert.equal(desktopTarget.listenerCount('scroll'), 0);
    assert.equal(mobileTarget.listenerCount('scroll'), 1);

    navigation.disconnectedCallback();
    assert.equal(mobileTarget.listenerCount('scroll'), 0);
    assert.equal(mediaQuery.listenerCount('change'), 0);
  } finally {
    for (const [name, value] of Object.entries(originalGlobals)) {
      const key =
        name === 'deps'
          ? '__pdpNavigationTestDeps'
          : name === 'sort'
            ? '__pdpNavigationTestSort'
            : name;
      if (value === undefined) delete globalThis[key];
      else globalThis[key] = value;
    }
  }
});

test('Product template places navigation after purchase and before long-form content', () => {
  const template = JSON.parse(stripJsonComments(read('templates/product.json')));
  const navigationId = template.order.find((id) => template.sections[id]?.type === 'relivanow-pdp-navigation');

  assert.ok(navigationId, 'PDP navigation section must be present');
  assert.equal(template.order.indexOf(navigationId), template.order.indexOf('main') + 1);
  assert.ok(template.order.indexOf(navigationId) < template.order.indexOf('trust_benefits_RELI04'));

  const navigation = template.sections[navigationId];
  assert.equal(navigation.settings.enable_section, true);
  assert.deepEqual(
    navigation.block_order.map((blockId) => navigation.blocks[blockId].settings.target),
    ['purchase', 'overview', 'specs', 'faq', 'reviews']
  );
});
