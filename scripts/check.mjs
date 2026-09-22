import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import katex from 'katex';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = await readFile(path.join(root, 'site/slides.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context);
const slides = context.window.SLIDES;
if (!Array.isArray(slides) || !slides.length) throw new Error('Nenhum slide encontrado.');
let equations = 0;
const assets = new Set();
for (const [index, slide] of slides.entries()) {
  if (!slide.title || !slide.section || !slide.content || !slide.notes) throw new Error(`Slide ${index + 1} incompleto.`);
  for (const match of slide.content.matchAll(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g)) {
    const expression = (match[1] ?? match[2]).replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
    katex.renderToString(expression, { throwOnError: true, displayMode: match[2] !== undefined, trust: false });
    equations += 1;
  }
  for (const match of slide.content.matchAll(/(?:src|data-gif)="([^"]+)"/g)) {
    if (/^(?:https?:)?\/\//.test(match[1])) throw new Error(`Recurso externo no slide ${index + 1}.`);
    await access(path.join(root, 'site', match[1]));
    assets.add(match[1]);
  }
}
console.log(`${slides.length} slides, ${equations} expressões matemáticas e ${assets.size} recursos locais verificados.`);
