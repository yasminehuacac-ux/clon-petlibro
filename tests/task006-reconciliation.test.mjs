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
  assert.match(script, /link\.hidden = true/);
  assert.match(script, /aria-current', 'location'/);
  assert.match(script, /removeAttribute\('aria-current'\)/);
  assert.match(script, /requestAnimationFrame/);
  assert.doesNotMatch(script, /IntersectionObserver/);
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
