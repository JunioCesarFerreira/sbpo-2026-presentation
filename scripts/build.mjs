import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const output = path.join(root, 'dist');
await mkdir(output, { recursive: true });
await cp(path.join(root, 'site'), output, { recursive: true });
await cp(path.join(root, 'node_modules/katex/dist'), path.join(output, 'assets/vendor/katex'), { recursive: true });
await writeFile(path.join(output, '.nojekyll'), '');
const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
await cp(path.join(root, 'node_modules/katex/LICENSE'), path.join(output, 'assets/vendor/katex/LICENSE'));
console.log(`Apresentação ${packageJson.version} gerada em dist/ (inclui equações e animações locais).`);
