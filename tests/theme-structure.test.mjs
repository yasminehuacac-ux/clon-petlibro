import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

const filesUnder = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git') return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  });

const stripJsonComments = (source) => {
  let output = '';
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
        output += character;
      }
      continue;
    }

    if (blockComment) {
      if (character === '*' && next === '/') {
        blockComment = false;
        index += 1;
      } else if (character === '\n') {
        output += character;
      }
      continue;
    }

    if (inString) {
      output += character;
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === '"') inString = false;
      continue;
    }

    if (character === '"') {
      inString = true;
      output += character;
    } else if (character === '/' && next === '/') {
      lineComment = true;
      index += 1;
    } else if (character === '/' && next === '*') {
      blockComment = true;
      index += 1;
    } else {
      output += character;
    }
  }

  return output;
};

const parseJsonc = (source, path) => {
  try {
    return JSON.parse(stripJsonComments(source));
  } catch (error) {
    throw new Error(`${relative(root, path)}: ${error.message}`);
  }
};

const assertUniqueIds = (settings = [], owner) => {
  const ids = settings.flatMap(({ id }) => (id ? [id] : []));
  assert.equal(new Set(ids).size, ids.length, `${owner} contains duplicate setting IDs`);
};

test('all JSON and JSONC files parse', () => {
  const files = filesUnder(root).filter((path) => ['.json', '.jsonc'].includes(extname(path)));
  assert.ok(files.length > 0);
  for (const path of files) parseJsonc(readFileSync(path, 'utf8'), path);
});

test('all Liquid schemas parse and setting IDs are unique within their scope', () => {
  const files = filesUnder(root).filter((path) => extname(path) === '.liquid');
  let schemaCount = 0;

  for (const path of files) {
    const source = readFileSync(path, 'utf8');
    const match = source.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/);
    if (!match) continue;

    schemaCount += 1;
    const schema = parseJsonc(match[1], path);
    const relativePath = relative(root, path);
    assertUniqueIds(schema.settings, `${relativePath} section settings`);

    for (const block of schema.blocks ?? []) {
      assertUniqueIds(block.settings, `${relativePath} block ${block.type}`);
    }
  }

  assert.ok(schemaCount > 0);
});
