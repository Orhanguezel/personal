import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const appRoot = process.cwd();
const assetsRoot = path.join(appRoot, 'public', 'assets', 'imgs');
const rewriteRoots = [
  'app',
  'components',
  'config',
  'content',
  'i18n',
  'integrations',
  'seo',
  'utils',
  path.join('public', 'ui'),
].map((p) => path.join(appRoot, p));

const sourceExtPattern = /\.(png|jpe?g)$/i;
const textExts = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.md']);

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  if (!(await pathExists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      return entry.isFile() ? [fullPath] : [];
    }),
  );
  return files.flat();
}

function webpPathFor(filePath) {
  return filePath.replace(sourceExtPattern, '.webp');
}

async function convertImages() {
  const imageFiles = (await walk(assetsRoot)).filter((filePath) => sourceExtPattern.test(filePath));
  let converted = 0;
  let skipped = 0;

  for (const filePath of imageFiles) {
    const outputPath = webpPathFor(filePath);
    const [sourceStat, outputExists] = await Promise.all([fs.stat(filePath), pathExists(outputPath)]);
    if (outputExists) {
      const outputStat = await fs.stat(outputPath);
      if (outputStat.mtimeMs >= sourceStat.mtimeMs) {
        skipped += 1;
        continue;
      }
    }

    await sharp(filePath).webp({ quality: 82, effort: 4 }).toFile(outputPath);
    converted += 1;
  }

  return { converted, skipped, total: imageFiles.length };
}

function toPublicAssetPath(filePath) {
  const rel = path.relative(path.join(appRoot, 'public'), filePath).split(path.sep).join('/');
  return `/${rel}`;
}

async function rewriteReferences() {
  const webpAssets = new Set(
    (await walk(assetsRoot))
      .filter((filePath) => filePath.endsWith('.webp'))
      .map(toPublicAssetPath),
  );
  const textFiles = (await Promise.all(rewriteRoots.map(walk)))
    .flat()
    .filter((filePath) => textExts.has(path.extname(filePath)));
  let touched = 0;
  let replacements = 0;

  for (const filePath of textFiles) {
    const original = await fs.readFile(filePath, 'utf8');
    const next = original.replace(/\/assets\/imgs\/[^'"`)\]\s]+?\.(?:png|jpe?g)/gi, (match) => {
      const candidate = match.replace(sourceExtPattern, '.webp');
      if (!webpAssets.has(candidate)) return match;
      replacements += 1;
      return candidate;
    });

    if (next !== original) {
      await fs.writeFile(filePath, next);
      touched += 1;
    }
  }

  return { touched, replacements };
}

const conversion = await convertImages();
const rewrite = process.argv.includes('--rewrite') ? await rewriteReferences() : { touched: 0, replacements: 0 };

console.log(
  JSON.stringify(
    {
      assetsRoot,
      conversion,
      rewrite,
    },
    null,
    2,
  ),
);
