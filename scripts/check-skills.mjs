#!/usr/bin/env node
// 校验 skills 仓库的结构与一致性（零第三方依赖）。
// 用法：node scripts/check-skills.mjs
// 检查项：每个 skill 目录有 SKILL.md 且 frontmatter 可解析、name 合法、description 非空；
//        frontmatter / openai.yaml 不含超出解析器支持子集的行（列表、块标量等会显式报错，不静默跳过）；
//        有 agents/openai.yaml；SKILL.md 的 metadata.short-description
//        与 openai.yaml 的 interface.short_description 文本一致；
//        非 internal skill 须登记到 README「当前 Skills」、internal 不应出现；
//        README 列出的 skill 须有对应目录。

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS_DIR = join(ROOT, 'skills');
const README = join(ROOT, 'README.md');

const failures = [];
const log = (mark, msg) => console.log(`  ${mark}  ${msg}`);
const ok = (m) => log('ok  ', m);
const fail = (m) => { failures.push(m); log('FAIL', m); };

// 极简 YAML 子集解析：顶层 key: value，以及一层嵌套 mapping（metadata / interface / policy）。
// 超出子集的行（列表项、块标量 > / |、无 key 的裸文本、孤儿缩进行）记入 bad，
// 由主流程报错——宁可显式失败，不可静默漏检。
function parseYamlSubset(text) {
  const top = {};
  const nested = {};
  const bad = [];
  let current = null;
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    if (!raw.startsWith(' ')) {
      const m = raw.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (!m) { bad.push(`第 ${i + 1} 行: ${raw.trim()}`); continue; }
      const [, k, v] = m;
      if (v.trim() === '') {
        current = k;
        nested[current] = {};
      } else {
        current = null;
        const val = scalarValue(v);
        if (val === null) bad.push(`第 ${i + 1} 行: ${raw.trim()}（块标量 > / | 不在支持子集内）`);
        else top[k] = val;
      }
    } else if (current) {
      const m = raw.match(/^\s+([A-Za-z0-9_-]+):\s*(.*)$/);
      if (!m) { bad.push(`第 ${i + 1} 行: ${raw.trim()}`); continue; }
      const val = scalarValue(m[2]);
      if (val === null) bad.push(`第 ${i + 1} 行: ${raw.trim()}（块标量 > / | 不在支持子集内）`);
      else nested[current][m[1]] = val;
    } else {
      bad.push(`第 ${i + 1} 行: ${raw.trim()}（缩进行不在任何 mapping 下）`);
    }
  }
  return { top, nested, bad };
}

function stripValue(v) {
  const s = v.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

// 块标量指示符（>/| 开头）返回 null，表示不支持
function scalarValue(v) {
  const s = stripValue(v);
  return /^[>|][+-]?\d*$/.test(s) ? null : s;
}

function readFrontmatter(filePath) {
  const text = readFileSync(filePath, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? parseYamlSubset(m[1]) : null;
}

function readReadmeCurrentSkills() {
  const text = readFileSync(README, 'utf8');
  const section = text.match(/## 当前 Skills\r?\n([\s\S]*?)(\r?\n## |$)/);
  if (!section) return [];
  return [...section[1].matchAll(/### `([a-z0-9-]+)`/g)].map((m) => m[1]);
}

const skillDirs = readdirSync(SKILLS_DIR)
  .map((d) => join(SKILLS_DIR, d))
  .filter((p) => statSync(p).isDirectory());
const readmeSkills = readReadmeCurrentSkills();

for (const dir of skillDirs) {
  const name = basename(dir);
  console.log(`\n• ${name}`);

  const skillMd = join(dir, 'SKILL.md');
  if (!existsSync(skillMd)) { fail(`${name}: 缺 SKILL.md`); continue; }
  const fm = readFrontmatter(skillMd);
  if (!fm) { fail(`${name}: SKILL.md frontmatter 不可解析`); continue; }

  if (fm.bad.length) fail(`${name}: SKILL.md frontmatter 含无法解析的行（改写为支持的 key: value 子集）:\n        ${fm.bad.join('\n        ')}`);

  const fmNameValue = fm.top.name ?? null;
  if (!fmNameValue) fail(`${name}: frontmatter 缺 name`);
  else if (!/^[a-z][a-z0-9-]*$/.test(fmNameValue)) fail(`${name}: name "${fmNameValue}" 不合规（小写字母与连字符）`);
  else ok(`name = ${fmNameValue}`);

  if (!fm.top.description) fail(`${name}: frontmatter 缺 description（参与 skill 发现，必填）`);

  const meta = fm.nested.metadata || {};
  const internal = meta.internal === true || meta.internal === 'true';
  const shortDesc = meta['short-description'];

  const openai = join(dir, 'agents/openai.yaml');
  if (!existsSync(openai)) {
    fail(`${name}: 缺 agents/openai.yaml`);
  } else {
    const oai = parseYamlSubset(readFileSync(openai, 'utf8'));
    if (oai.bad.length) fail(`${name}: openai.yaml 含无法解析的行:\n        ${oai.bad.join('\n        ')}`);
    const oaiShort = oai.nested.interface?.short_description;
    if (!shortDesc) fail(`${name}: SKILL.md 缺 metadata.short-description`);
    else if (!oaiShort) fail(`${name}: openai.yaml 缺 interface.short_description`);
    else if (shortDesc !== oaiShort) {
      fail(`${name}: short-description 不一致\n        SKILL.md    : ${shortDesc}\n        openai.yaml : ${oaiShort}`);
    } else {
      ok('short-description 两处一致');
    }
  }

  const inReadme = readmeSkills.includes(name);
  if (internal && inReadme) fail(`${name}: internal skill 不应出现在 README「当前 Skills」`);
  else if (!internal && !inReadme) fail(`${name}: 非 internal skill 未登记到 README「当前 Skills」`);
  else ok(internal ? 'internal，未进 README 当前 Skills' : '已登记到 README');
}

for (const n of readmeSkills) {
  if (!skillDirs.some((d) => basename(d) === n)) fail(`README 列出「${n}」但无对应目录`);
}

console.log(`\n${failures.length === 0 ? '✓ 全部通过' : `✗ ${failures.length} 项失败`}`);
process.exit(failures.length === 0 ? 0 : 1);
