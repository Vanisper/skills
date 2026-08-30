// plantuml.mjs 纯函数测试（零依赖，node:test + node:assert）。不联网：只测 encode/buildUrl/validate。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import {
  encode,
  encodeHex,
  buildUrl,
  validate,
  FORMATS,
} from '../skills/plantuml/scripts/plantuml.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const CLI = join(HERE, '..', 'skills', 'plantuml', 'scripts', 'plantuml.mjs');
const SOURCE = 'Bob -> Alice : hello';
const GOLDEN = 'SyfFKj2rKt3CoKnELR1Io4ZDoSa70000';

test('encode: golden 编码与 PlantUML 官方参考一致', () => {
  assert.equal(encode(SOURCE), GOLDEN);
});

test('buildUrl: plantuml 后端 svg 生成官方 server 完整 URL', () => {
  assert.equal(
    buildUrl(SOURCE, 'svg', 'plantuml', null, false),
    `https://www.plantuml.com/plantuml/svg/${GOLDEN}`,
  );
});

test('buildUrl: kroki 后端 svg 使用相同编码', () => {
  assert.equal(
    buildUrl(SOURCE, 'svg', 'kroki', null, false),
    `https://kroki.io/plantuml/svg/${GOLDEN}`,
  );
});

test('buildUrl: --base 覆盖 plantuml 基址', () => {
  assert.equal(
    buildUrl(SOURCE, 'svg', 'plantuml', 'http://localhost:8080/plantuml', false),
    `http://localhost:8080/plantuml/svg/${GOLDEN}`,
  );
});

test('encodeHex / buildUrl --hex: 生成 ~h 无压缩十六进制编码', () => {
  const hex = encodeHex(SOURCE);
  assert.ok(hex.startsWith('~h'), '应以 ~h 开头');
  assert.equal(hex, '~h' + Buffer.from(SOURCE, 'utf8').toString('hex'));
  const url = buildUrl(SOURCE, 'svg', 'plantuml', null, true);
  assert.equal(url, `https://www.plantuml.com/plantuml/svg/${hex}`);
  assert.ok(url.includes('/svg/~h'));
});

test('guard: kroki + hex 被拒绝（CLI 以退出码 2 显式失败）', () => {
  let status = 0;
  let stderr = '';
  try {
    execFileSync('node', [CLI, 'url', '-', '--backend', 'kroki', '--hex'], {
      input: SOURCE,
      encoding: 'utf8',
    });
  } catch (e) {
    status = e.status;
    stderr = String(e.stderr || '');
  }
  assert.equal(status, 2, 'kroki + hex 应以退出码 2 失败');
  assert.match(stderr, /--hex 仅 plantuml 后端可用/);
});

test('validate: svg 正文以 <svg / <?xml 开头通过', () => {
  assert.equal(validate('svg', Buffer.from('<svg xmlns="...">')), true);
  assert.equal(validate('svg', Buffer.from('<?xml version="1.0"?><svg></svg>')), true);
});

test('validate: 广告层 HTML 正文对 svg / txt 失败', () => {
  const html = Buffer.from('<!DOCTYPE html><html><head><script>ads</script></head></html>');
  assert.equal(validate('svg', html), false);
  assert.equal(validate('txt', html), false);
  assert.equal(validate('utxt', html), false);
});

test('validate: png magic bytes 通过、非 png 失败', () => {
  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);
  assert.equal(validate('png', png), true);
  assert.equal(validate('png', Buffer.from('not a png')), false);
  assert.equal(validate('png', Buffer.from([0x89, 0x50])), false, '过短应失败');
});

test('validate: txt 非 HTML 正文通过', () => {
  assert.equal(validate('txt', Buffer.from('+-----+\n| Bob |\n+-----+')), true);
});

test('FORMATS 白名单：支持 svg/png/txt/utxt，不含 gif 等未知格式', () => {
  for (const f of ['svg', 'png', 'txt', 'utxt', 'pdf', 'eps', 'latex']) {
    assert.ok(FORMATS.has(f), `应支持 ${f}`);
  }
  assert.equal(FORMATS.has('gif'), false);
  assert.equal(FORMATS.has('jpeg'), false);
});
