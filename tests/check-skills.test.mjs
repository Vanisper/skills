// check-skills.mjs 纯函数测试（零依赖，node:test + node:assert）。
// 重点覆盖 parseYamlSubset 的支持子集与「显式失败」的 bad 记录行为。
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  parseYamlSubset,
  extractRelLinks,
} from '../scripts/check-skills.mjs';

test('parseYamlSubset: 解析顶层 key: value', () => {
  const { top, nested, bad } = parseYamlSubset('name: my-skill\ndescription: "一句话"\n');
  assert.equal(top.name, 'my-skill');
  assert.equal(top.description, '一句话');
  assert.deepEqual(nested, {});
  assert.deepEqual(bad, []);
});

test('parseYamlSubset: 解析一层嵌套 metadata / interface mapping', () => {
  const yaml = [
    'metadata:',
    '  internal: true',
    '  short-description: "简短"',
    'interface:',
    '  display_name: "展示名"',
    '  default_prompt: "使用 $my-skill"',
  ].join('\n');
  const { nested, bad } = parseYamlSubset(yaml);
  assert.equal(nested.metadata.internal, 'true');
  assert.equal(nested.metadata['short-description'], '简短');
  assert.equal(nested.interface.display_name, '展示名');
  assert.equal(nested.interface.default_prompt, '使用 $my-skill');
  assert.deepEqual(bad, []);
});

test('parseYamlSubset: 块标量 | 与 > 记入 bad（不在支持子集内）', () => {
  const pipe = parseYamlSubset('x: |\n  line\n');
  assert.equal(pipe.bad.length >= 1, true);
  assert.match(pipe.bad[0], /块标量/);

  const fold = parseYamlSubset('desc: >\n  折叠\n');
  assert.equal(fold.bad.some((b) => /块标量/.test(b)), true);
});

test('parseYamlSubset: 孤儿缩进行（无父 mapping）记入 bad', () => {
  const { bad } = parseYamlSubset('name: x\n  orphan: 1\n');
  assert.equal(bad.length, 1);
  assert.match(bad[0], /不在任何 mapping 下/);
});

test('parseYamlSubset: 注释与空行被忽略', () => {
  const yaml = '# 注释\n\nname: x\n\n# 另一条注释\n';
  const { top, bad } = parseYamlSubset(yaml);
  assert.equal(top.name, 'x');
  assert.deepEqual(bad, []);
});

test('parseYamlSubset: 列表项等非 key: value 顶层行记入 bad', () => {
  const { bad } = parseYamlSubset('- item\n');
  assert.equal(bad.length, 1);
});

test('extractRelLinks: 抽取 references/ 与 scripts/ 相对链接并去锚点', () => {
  const md = [
    '见 [规则](references/rules.md) 与 [模板](references/lang-ts.md#tags)。',
    '脚本 [plantuml](scripts/plantuml.mjs)。',
    '外链 [CONTRIBUTING](../../CONTRIBUTING.md) 不计入。',
  ].join('\n');
  const links = extractRelLinks(md);
  assert.deepEqual(links, ['references/rules.md', 'references/lang-ts.md', 'scripts/plantuml.mjs']);
});
