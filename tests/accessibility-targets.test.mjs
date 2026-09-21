import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('product-card and newsletter icon actions keep a 44px target', () => {
  const quickAdd = read('snippets/quick-add-styles.liquid');
  const emailSignup = read('blocks/email-signup.liquid');

  assert.match(
    quickAdd,
    /\.quick-add__button\s*\{[\s\S]*?min-width:\s*var\(--minimum-touch-target\);[\s\S]*?min-height:\s*var\(--minimum-touch-target\);/,
  );
  assert.match(emailSignup, /--arrow-button-size-integrated:\s*var\(--minimum-touch-target\);/);
});

test('Judge.me review actions keep a 44px target without replacing app markup', () => {
  const reviews = read('sections/relivanow-reviews.liquid');

  assert.match(
    reviews,
    /\.jdgm-horizon-widget\s+\.jdgm-prev-badge,[\s\S]*?\.relivanow-reviews\s+\.jm-button\s*\{[\s\S]*?min-height:\s*var\(--minimum-touch-target\)\s*!important;/,
  );
});

test('secondary collection, payment, and footer links keep a 44px target', () => {
  const productList = read('sections/product-list.liquid');
  const buyButtons = read('snippets/buy-buttons-styles.liquid');
  const footerUtilities = read('sections/footer-utilities.liquid');

  assert.match(
    productList,
    /\.section-resource-list__header\s+a\s*\{[\s\S]*?min-height:\s*var\(--minimum-touch-target\);/,
  );
  assert.match(
    buyButtons,
    /more-payment-options-link\s+a\s*\{[\s\S]*?min-height:\s*var\(--minimum-touch-target\);/,
  );
  assert.match(
    footerUtilities,
    /\.utilities\s+a,[\s\S]*?\.utilities\s+button\s*\{[\s\S]*?min-height:\s*var\(--minimum-touch-target\);/,
  );
});
