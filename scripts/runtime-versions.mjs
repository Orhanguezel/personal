import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const directory = path.resolve(process.argv[2]);
const file = process.argv[3] || path.join(directory, 'runtime-versions.json');
const expected = JSON.parse(fs.readFileSync(file, 'utf8'));
const require = createRequire(path.join(directory, 'package.json'));
const errors = [];
for (const [name, version] of Object.entries(expected)) {
  try {
    let current = path.dirname(require.resolve(name));
    let actual;
    while (current !== path.dirname(current)) {
      const filename = path.join(current, 'package.json');
      if (fs.existsSync(filename)) {
        const p = JSON.parse(fs.readFileSync(filename, 'utf8'));
        if (p.name === name) {
          actual = p.version;
          break;
        }
      }
      current = path.dirname(current);
    }
    if (actual !== version) errors.push(name + ': expected ' + version + ', found ' + actual);
  } catch {
    errors.push(name + ': missing');
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Runtime versions verified: ' + Object.keys(expected).length + ' packages');
