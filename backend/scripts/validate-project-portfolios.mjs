import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsRoot = '/home/orhan/Documents/Projeler';
const profileRepoRoot = path.join(projectsRoot, 'Orhanguezel');
const standardizationPlanPath = path.join(profileRepoRoot, 'career', 'PROJECT_STANDARDIZATION_PLAN.md');
const profileReadmePath = path.join(profileRepoRoot, 'README.md');
const metadataFileName = 'project.portfolio.json';
const readmeFileName = 'README.md';
const claudeFileName = 'CLAUDE.md';
const excluded = new Set([
  '.claude',
  '.git',
  '.github',
  '.stfolder',
  '.vscode',
  'Orhanguezel',
  'guezelwebdesign',
  'ayarlar',
  'node_modules',
  'dist',
  'build',
  '.next',
]);
const requiredFields = ['title', 'summary', 'category', 'services', 'techs'];
const scanFileNames = ['package.json', 'composer.json', 'pubspec.yaml'];

const knownTechPatterns = new Map([
  ['Laravel', [/laravel/i]],
  ['PHP', [/\bphp\b/i]],
  ['Next.js', [/next\.?js/i, /\bnext\b/i]],
  ['React', [/\breact\b/i]],
  ['TypeScript', [/typescript/i]],
  ['JavaScript', [/javascript/i]],
  ['Flutter', [/flutter/i]],
  ['Node.js', [/node\.?js/i]],
  ['Express', [/express/i]],
  ['Fastify', [/fastify/i]],
  ['MySQL', [/mysql/i]],
  ['MongoDB', [/mongodb/i]],
  ['PostgreSQL', [/postgres/i]],
  ['Drizzle ORM', [/drizzle/i]],
  ['Redux Toolkit', [/redux toolkit/i]],
  ['React Query', [/react query/i, /tanstack query/i]],
  ['Zustand', [/zustand/i]],
  ['Tailwind CSS', [/tailwind/i]],
  ['Shadcn UI', [/shadcn/i]],
  ['Radix UI', [/radix/i]],
  ['Styled Components', [/styled-?components/i]],
  ['Sass', [/\bsass\b/i]],
  ['JWT', [/\bjwt\b/i]],
  ['Zod', [/\bzod\b/i]],
  ['Cloudinary', [/cloudinary/i]],
  ['Nodemailer', [/nodemailer/i]],
  ['Docker', [/docker/i]],
  ['PM2', [/\bpm2\b/i]],
  ['Nginx', [/nginx/i]],
  ['CI/CD', [/\bci\/cd\b/i, /\bci cd\b/i]],
  ['i18n', [/next-intl/i, /\bi18n\b/i]],
  ['SEO', [/\bseo\b/i]],
  ['Bun', [/\bbun\b/i]],
  ['GitHub Actions', [/github actions/i]],
  ['Framer Motion', [/framer motion/i]],
  ['Google OAuth', [/google oauth/i, /google_sign_in/i, /socialiteproviders\/google/i]],
  ['Stripe', [/stripe/i]],
  ['Iyzipay', [/iyzipay/i]],
  ['Mongoose', [/mongoose/i]],
]);

function readTextIfExists(filePath) {
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf8');
}

function normalizeText(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/gi, '')
    .toLowerCase();
}

function findFiles(rootDir, maxDepth, names) {
  const results = [];

  function walk(currentDir, depth) {
    if (depth > maxDepth) return;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (excluded.has(entry.name) || entry.name.startsWith('.')) continue;
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath, depth + 1);
        continue;
      }

      if (names.includes(entry.name)) results.push(fullPath);
    }
  }

  walk(rootDir, 0);
  return results;
}

function collectTechsFromText(text) {
  const hits = new Set();

  for (const [label, patterns] of knownTechPatterns.entries()) {
    if (patterns.some((pattern) => pattern.test(text))) hits.add(label);
  }

  return hits;
}

function collectDetectedTechs(projectDir) {
  const hits = new Set();

  for (const filePath of findFiles(projectDir, 2, scanFileNames)) {
    const text = readTextIfExists(filePath);
    for (const tech of collectTechsFromText(text)) hits.add(tech);
  }

  const readmeText = readTextIfExists(path.join(projectDir, readmeFileName));
  for (const tech of collectTechsFromText(readmeText)) hits.add(tech);

  return hits;
}

function firstMarkdownHeading(text) {
  const match = text.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

function headingMatchesProject(heading, metadataTitle, dirName) {
  const normalizedHeading = normalizeText(heading);
  const normalizedTitle = normalizeText(metadataTitle);
  const normalizedDirName = normalizeText(dirName);

  if (!normalizedHeading) return false;
  return normalizedHeading.includes(normalizedTitle) || normalizedHeading.includes(normalizedDirName);
}

function validateMetadata(projectDir) {
  const metadataPath = path.join(projectDir, metadataFileName);
  const readmePath = path.join(projectDir, readmeFileName);
  const claudePath = path.join(projectDir, claudeFileName);
  const name = path.basename(projectDir);
  const warnings = [];

  if (!fs.existsSync(metadataPath)) {
    return { ok: false, message: `${name}: missing ${metadataFileName}`, warnings };
  }

  try {
    const data = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    const missing = requiredFields.filter((field) => {
      const value = data[field];
      if (Array.isArray(value)) return value.length === 0;
      return value === undefined || value === null || value === '';
    });

    if (missing.length) {
      return { ok: false, message: `${name}: missing fields -> ${missing.join(', ')}`, warnings };
    }

    if (!fs.existsSync(readmePath)) {
      return { ok: false, message: `${name}: missing ${readmeFileName}`, warnings };
    }

    if (!fs.existsSync(claudePath)) {
      return { ok: false, message: `${name}: missing ${claudeFileName}`, warnings };
    }

    const readmeHeading = firstMarkdownHeading(readTextIfExists(readmePath));
    const claudeHeading = firstMarkdownHeading(readTextIfExists(claudePath));

    if (!headingMatchesProject(readmeHeading, data.title, name)) {
      return {
        ok: false,
        message: `${name}: README title mismatch -> expected heading to include "${data.title}"`,
        warnings,
      };
    }

    if (!headingMatchesProject(claudeHeading, data.title, name)) {
      return {
        ok: false,
        message: `${name}: CLAUDE title mismatch -> expected heading to include "${data.title}"`,
        warnings,
      };
    }

    const detectedTechs = collectDetectedTechs(projectDir);
    const metadataTechs = new Set((data.techs || []).map((tech) => String(tech).trim()).filter(Boolean));
    const overlaps = [...metadataTechs].filter((tech) => detectedTechs.has(tech));

    if (detectedTechs.size > 0 && overlaps.length === 0) {
      warnings.push('metadata techs do not overlap with detected repository techs');
    }

    if (data.websiteUrl && typeof data.websiteUrl !== 'string') {
      warnings.push('websiteUrl should be a string');
    }

    if (typeof data.featured !== 'undefined' && typeof data.featured !== 'boolean') {
      warnings.push('featured should be boolean');
    }

    return { ok: true, message: `${name}: ok`, warnings };
  } catch (error) {
    return { ok: false, message: `${name}: invalid JSON -> ${error.message}`, warnings };
  }
}

function validateProfileReadme() {
  const warnings = [];

  if (!fs.existsSync(profileReadmePath)) {
    return {
      ok: false,
      message: `profile README missing -> ${profileReadmePath}`,
      warnings,
    };
  }

  const readmeText = readTextIfExists(profileReadmePath);
  const heading = firstMarkdownHeading(readmeText);

  if (!heading) {
    return {
      ok: false,
      message: 'profile README is missing a top-level heading',
      warnings,
    };
  }

  if (!normalizeText(readmeText).includes(normalizeText('Featured Projects'))) {
    warnings.push('profile README is missing "Featured Projects" section');
  }

  if (!normalizeText(readmeText).includes(normalizeText('Tech Stack'))) {
    warnings.push('profile README is missing "Tech Stack" section');
  }

  return {
    ok: true,
    message: 'profile README: ok',
    warnings,
  };
}

function expectedPlanReferencePaths(projectDir) {
  return [
    path.join(projectDir, readmeFileName),
    path.join(projectDir, claudeFileName),
    path.join(projectDir, metadataFileName),
  ];
}

function validateStandardizationPlan(projectDirs) {
  const warnings = [];

  if (!fs.existsSync(standardizationPlanPath)) {
    return {
      ok: false,
      message: `missing standardization plan -> ${standardizationPlanPath}`,
      warnings,
    };
  }

  const planText = readTextIfExists(standardizationPlanPath);
  const normalizedPlan = normalizeText(planText);

  if (!normalizedPlan.includes(normalizeText('## Proje Referanslari'))) {
    return {
      ok: false,
      message: 'standardization plan is missing "Proje Referanslari" section',
      warnings,
    };
  }

  for (const projectDir of projectDirs) {
    const projectName = path.basename(projectDir);
    const projectMarker = normalizeText(projectName);

    if (!normalizedPlan.includes(projectMarker)) {
      return {
        ok: false,
        message: `standardization plan is missing project section for ${projectName}`,
        warnings,
      };
    }

    for (const expectedPath of expectedPlanReferencePaths(projectDir)) {
      if (!planText.includes(expectedPath)) {
        return {
          ok: false,
          message: `standardization plan is missing reference -> ${expectedPath}`,
          warnings,
        };
      }

      if (!fs.existsSync(expectedPath)) {
        return {
          ok: false,
          message: `standardization plan references non-existent file -> ${expectedPath}`,
          warnings,
        };
      }
    }
  }

  if (!planText.includes(profileReadmePath)) {
    return {
      ok: false,
      message: `standardization plan is missing profile README reference -> ${profileReadmePath}`,
      warnings,
    };
  }

  const dateMatch = planText.match(/Son dogrulama tarihi:\s*`([^`]+)`/);
  if (!dateMatch) {
    warnings.push('standardization plan is missing "Son dogrulama tarihi" entry');
  }

  return {
    ok: true,
    message: 'standardization plan: ok',
    warnings,
  };
}

function main() {
  const projectDirs = fs
    .readdirSync(projectsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.') && !excluded.has(entry.name))
    .map((entry) => path.join(projectsRoot, entry.name))
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b)));

  const results = projectDirs.map(validateMetadata);
  results.push(validateProfileReadme());
  results.push(validateStandardizationPlan(projectDirs));
  const failed = results.filter((result) => !result.ok);

  results.forEach((result) => {
    const prefix = result.ok ? '[projects:validate]' : '[projects:validate][warn]';
    console.log(`${prefix} ${result.message}`);
    result.warnings.forEach((warning) => {
      console.log(`[projects:validate][warn] ${warning}`);
    });
  });

  if (failed.length) {
    console.warn("Ignoring validation failures during seed.");
  }
}

main();
