#!/usr/bin/env node
// plantuml.mjs — 把 PlantUML 源码编码成官方 server / Kroki 的可渲染 URL，或直接拉取渲染产物。
// 零第三方依赖；需 Node 18+（全局 fetch、内置 zlib）。被 skills/plantuml/SKILL.md 调用。
//
// 子命令：
//   url    <file|->  打印编码后的渲染 URL（不发网络请求）
//   render <file|->  拉取渲染产物并写文件（-o - 写标准输出）
//   text   <file|->  拉取 ASCII 文本图并打印（--utxt 取 Unicode 框线版）
//
// 常用选项：
//   -f, --format svg|png|txt|utxt   render 默认 svg；text 默认 txt（--utxt 强制 utxt）
//   --backend plantuml|kroki        默认 plantuml（两者 GET 编码相同，仅 base/path 不同）
//   --base URL                      覆盖 server 基址（自建 plantuml-server / 自建 kroki）
//   --hex                           仅 plantuml：~h 无压缩十六进制（仅极小图/调试）
//   -o, --out FILE                  render 输出文件（省略则写到源码旁同名 .<format>；- 表示 stdout）
//
// 注意：官方公共 server（plantuml.com）挂了 Ezoic 广告层，/utxt/ 偶尔被注入 HTML。
//      本脚本对 svg/png/txt 做 magic 校验，命中 HTML 注入或语法错会非零退出并把响应体当调试通道打印。

import { deflateRawSync } from 'node:zlib';
import { readFileSync, writeFileSync } from 'node:fs';

// PlantUML 自定义 base64 字母表（Kroki 的 /plantuml/ 端点同样用这套，与标准 base64 不可互换）：
// 数字在前、-_ 取代 +/、无 = 填充。输出全部 URL-path-safe。
const PLANTUML_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
const DEFAULT_PLANTUML_BASE = 'https://www.plantuml.com/plantuml';
const DEFAULT_KROKI_BASE = 'https://kroki.io';
const FORMATS = new Set(['svg', 'png', 'txt', 'utxt', 'pdf', 'eps', 'latex']);

const enc6 = (b) => PLANTUML_ALPHABET[b & 0x3f];

function plantumlBase64(buf) {
  let out = '';
  for (let i = 0; i < buf.length; i += 3) {
    const b1 = buf[i];
    const b2 = i + 1 < buf.length ? buf[i + 1] : 0;
    const b3 = i + 2 < buf.length ? buf[i + 2] : 0;
    out +=
      enc6(b1 >> 2) +
      enc6(((b1 & 0x3) << 4) | (b2 >> 4)) +
      enc6(((b2 & 0xf) << 2) | (b3 >> 6)) +
      enc6(b3 & 0x3f);
  }
  return out;
}

// 编码：UTF-8 → 原始 deflate（无 zlib 头 / adler）→ PlantUML 自定义 base64。官方 server 与 Kroki 通用。
const encode = (text) => plantumlBase64(deflateRawSync(Buffer.from(text, 'utf8')));
// ~h 无压缩十六进制：仅极小图 / 调试，URL 约 2 倍源码长度。
const encodeHex = (text) => '~h' + Buffer.from(text, 'utf8').toString('hex');

function buildUrl(source, format, backend, base, hex) {
  const enc = hex ? encodeHex(source) : encode(source);
  if (backend === 'kroki') return `${base || DEFAULT_KROKI_BASE}/plantuml/${format}/${enc}`;
  return `${base || DEFAULT_PLANTUML_BASE}/${format}/${enc}`;
}

const readSource = (file) => readFileSync(!file || file === '-' ? 0 : file, 'utf8');

// render 默认输出：源码旁、同名、换格式后缀（diagram.puml + svg -> diagram.svg）。stdin 无法推导。
const defaultOut = (file, format) => {
  if (!file || file === '-') return null;
  return file.replace(/\.[^/.]+$/, '') + '.' + format;
};

// magic 校验：防止把广告层 HTML / 错误页当成功产物落盘
function validate(format, body) {
  const head = body.subarray(0, 200).toString('utf8');
  const looksHtml = /^\s*<(?:!DOCTYPE|html|head|script)/i.test(head) || head.includes('<html');
  if (format === 'svg') return (head.startsWith('<svg') || head.startsWith('<?xml')) && !looksHtml;
  if (format === 'png') return body.length > 8 && body[0] === 0x89 && body[1] === 0x50 && body[2] === 0x4e && body[3] === 0x47;
  if (format === 'txt' || format === 'utxt') return !looksHtml;
  return true; // pdf/eps/latex 仅靠 HTTP 状态
}

function parseArgs(argv) {
  const opts = { format: null, backend: 'plantuml', base: null, hex: false, out: null, utxt: false, file: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-f' || a === '--format') opts.format = argv[++i];
    else if (a === '--backend') opts.backend = argv[++i];
    else if (a === '--base') opts.base = argv[++i];
    else if (a === '--hex') opts.hex = true;
    else if (a === '-o' || a === '--out') opts.out = argv[++i];
    else if (a === '--utxt') opts.utxt = true;
    else if (a === '-h' || a === '--help') opts.help = true;
    else if (!opts.file && !a.startsWith('-')) opts.file = a;
  }
  return opts;
}

function help() {
  console.log(`plantuml.mjs — PlantUML 源码 → 编码 URL / 渲染产物

用法：
  node plantuml.mjs url    <file|-> [options]   打印渲染 URL（不联网）
  node plantuml.mjs render <file|-> [options]   拉取并写文件（-o - 写 stdout）
  node plantuml.mjs text   <file|-> [--utxt]    拉取 ASCII 文本图到 stdout

options：
  -f, --format svg|png|txt|utxt   render 默认 svg；text 默认 txt（--utxt 强制 utxt）
  --backend plantuml|kroki        默认 plantuml（两者 GET 编码相同）
  --base URL                      自建 server 基址（plantuml-server：http://localhost:8080/plantuml；kroki：http://localhost:8000）
  --hex                           plantuml 专用：~h 无压缩十六进制（仅极小图/调试）
  -o, --out FILE                  render 输出文件（省略则写到源码旁同名 .<format>；- 表示 stdout）

说明：官方公共 server 与 Kroki 的 /plantuml/ 端点共用 PlantUML 自定义编码，故 --backend 只切 base/path。
     大图免编码可改用 Kroki POST：curl -X POST https://kroki.io/plantuml/svg -H 'Content-Type: text/plain' --data-binary @diagram.puml -o diagram.svg`);
}

function reportPrivacy(url) {
  let host = '';
  try {
    host = new URL(url).host;
  } catch {
    host = '?';
  }
  const local = /^(127\.|localhost)/.test(host);
  process.stderr.write(`[plantuml] host=${host} 源码离开本机=${local ? '否（本地后端）' : '是（远端）'}\n`);
  if (url.length > 7500) {
    process.stderr.write('[plantuml] 警告：URL 过长（>7500），公共 server 可能拒绝；改用 Kroki POST、自建 server，或缩减图。\n');
  }
}

function fail(format, status, body) {
  process.stderr.write(`[plantuml] 渲染失败（format=${format}, http=${status}）；响应体预览：\n`);
  process.stderr.write(body.toString('utf8').slice(0, 1200) + '\n');
  process.exit(1);
}

async function main() {
  const [sub, ...rest] = process.argv.slice(2);
  if (!sub || sub === '-h' || sub === '--help') {
    help();
    return;
  }
  const opts = parseArgs(rest);
  if (opts.help) {
    help();
    return;
  }
  const source = readSource(opts.file);
  let format = opts.format;
  if (sub === 'text') format = opts.utxt ? 'utxt' : opts.format || 'txt';
  if (!format) format = 'svg';
  if (!FORMATS.has(format)) {
    process.stderr.write(`[plantuml] 不支持的格式：${format}\n`);
    process.exit(2);
  }

  const url = buildUrl(source, format, opts.backend, opts.base, opts.hex);

  if (sub === 'url') {
    process.stdout.write(url + '\n');
    reportPrivacy(url);
    return;
  }
  if (sub !== 'render' && sub !== 'text') {
    process.stderr.write(`[plantuml] 未知子命令：${sub}\n`);
    process.exit(2);
  }

  reportPrivacy(url);
  const res = await fetch(url);
  const body = Buffer.from(await res.arrayBuffer());
  if (!res.ok || !validate(format, body)) fail(format, res.status, body);

  if (sub === 'render') {
    const out = opts.out ? opts.out : defaultOut(opts.file, format);
    if (out && out !== '-') {
      writeFileSync(out, body);
      process.stderr.write(`[plantuml] wrote ${out}\n`);
    } else {
      process.stdout.write(body);
    }
  } else {
    // text 子命令：直接打印到 stdout
    process.stdout.write(body);
  }
}

main().catch((e) => {
  process.stderr.write(`[plantuml] ${e.message}\n`);
  process.exit(1);
});
