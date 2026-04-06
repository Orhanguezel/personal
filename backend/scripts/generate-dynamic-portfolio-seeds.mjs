import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, '..');
// monorepoRoot = vps-guezel/, projectsRoot = Projeler/
const monorepoRoot = path.resolve(repoRoot, '..', '..');
const projectsRoot = path.resolve(monorepoRoot, '..');
const screenshotsDir = path.join(repoRoot, '..', 'frontend', 'public', 'assets', 'imgs', 'work', 'projects');
const profileRepoRoot = fs.existsSync(path.join(monorepoRoot, 'Orhanguezel', 'README.md'))
  ? path.join(monorepoRoot, 'Orhanguezel')
  : path.join(projectsRoot, 'Orhanguezel');
const profileReadmePath = path.join(profileRepoRoot, 'README.md');
const careerRoot = path.join(profileRepoRoot, 'career');
const sqlDir = path.join(repoRoot, 'src/db/seed/sql');
const metadataFileName = 'project.portfolio.json';

const EXCLUDED_DIRS = new Set([
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

const LOCALES = ['en', 'tr', 'de'];
const REQUIRED_METADATA_FIELDS = ['title', 'summary', 'category', 'services', 'techs'];

const KNOWN_TECHS = [
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
  ['HTML5', [/html5/i]],
  ['CSS3', [/css3/i]],
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
  ['WebSockets', [/websockets?/i]],
  ['Framer Motion', [/framer motion/i]],
];

function log(message) {
  console.log(`[portfolio-seed] ${message}`);
}

function warn(message) {
  console.warn(`[portfolio-seed][warn] ${message}`);
}

function readTextIfExists(filePath) {
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf8');
}

function escapeSql(value) {
  return String(value).replaceAll('\\', '\\\\').replaceAll("'", "''");
}

function sqlString(value) {
  return `'${escapeSql(value)}'`;
}

function sqlNullable(value) {
  if (value === null || value === undefined || value === '') return 'NULL';
  return sqlString(value);
}

function sqlJson(value) {
  return `CAST('${escapeSql(JSON.stringify(value))}' AS CHAR)`;
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function listCandidateProjectDirs() {
  return fs
    .readdirSync(projectsRoot, { withFileTypes: true })
    .filter((entry) => {
      if (EXCLUDED_DIRS.has(entry.name) || entry.name.startsWith('.')) return false;
      if (entry.isDirectory()) return true;
      if (entry.isSymbolicLink()) {
        try {
          return fs.statSync(path.join(projectsRoot, entry.name)).isDirectory();
        } catch { return false; }
      }
      return false;
    })
    .map((entry) => path.join(projectsRoot, entry.name));
}

function findFiles(rootDir, maxDepth, names) {
  const results = [];
  function walk(currentDir, depth) {
    if (depth > maxDepth) return;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (EXCLUDED_DIRS.has(entry.name) || entry.name.startsWith('.')) continue;
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
  for (const [label, patterns] of KNOWN_TECHS) {
    if (patterns.some((pattern) => pattern.test(text))) hits.add(label);
  }
  return Array.from(hits);
}

function collectTechsFromPackageJson(filePath) {
  const json = JSON.parse(readTextIfExists(filePath) || '{}');
  const keys = [
    ...Object.keys(json.dependencies || {}),
    ...Object.keys(json.devDependencies || {}),
    ...Object.keys(json.peerDependencies || {}),
  ].join('\n');
  return collectTechsFromText(keys);
}

function collectTechsFromComposer(filePath) {
  const json = JSON.parse(readTextIfExists(filePath) || '{}');
  const keys = [...Object.keys(json.require || {}), ...Object.keys(json['require-dev'] || {})].join('\n');
  return collectTechsFromText(keys);
}

function collectTechsFromPubspec(filePath) {
  return collectTechsFromText(readTextIfExists(filePath));
}

function parseGlobalSkillTitles(readme) {
  const titles = [];
  for (const match of readme.matchAll(/title="([^"]+)"/g)) titles.push(match[1].trim());
  for (const match of readme.matchAll(/\*\*([^*]+)\*\*\s*-/g)) titles.push(match[1].trim());
  return Array.from(new Set(titles.filter(Boolean)));
}

function loadMetadata(projectDir) {
  const metadataPath = path.join(projectDir, metadataFileName);
  if (!fs.existsSync(metadataPath)) {
    warn(`${path.basename(projectDir)} icin ${metadataFileName} eksik. Proje seed'e alinmayacak.`);
    return null;
  }

  const raw = readTextIfExists(metadataPath);
  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    warn(`${path.basename(projectDir)} metadata JSON parse hatasi: ${error.message}`);
    return null;
  }

  const missing = REQUIRED_METADATA_FIELDS.filter((field) => {
    const value = data[field];
    if (Array.isArray(value)) return value.length === 0;
    return value === undefined || value === null || value === '';
  });

  if (missing.length) {
    warn(`${path.basename(projectDir)} metadata eksik alanlar: ${missing.join(', ')}`);
    return null;
  }

  return data;
}

function collectAutoTechs(projectDir) {
  const techSet = new Set();
  const readmeText = readTextIfExists(path.join(projectDir, 'README.md'));
  collectTechsFromText(readmeText).forEach((tech) => techSet.add(tech));
  findFiles(projectDir, 2, ['package.json']).forEach((file) =>
    collectTechsFromPackageJson(file).forEach((tech) => techSet.add(tech)),
  );
  findFiles(projectDir, 2, ['composer.json']).forEach((file) =>
    collectTechsFromComposer(file).forEach((tech) => techSet.add(tech)),
  );
  findFiles(projectDir, 2, ['pubspec.yaml']).forEach((file) =>
    collectTechsFromPubspec(file).forEach((tech) => techSet.add(tech)),
  );
  return Array.from(techSet);
}

function resolveFeaturedImage(metadata, dirName, order) {
  if (metadata.featuredImage) return metadata.featuredImage;
  const slug = metadata.slug || slugify(metadata.title);
  const candidates = [
    `${slug}.png`,
    `${slug}.jpg`,
    `${slug}.webp`,
    `${dirName.toLowerCase()}.png`,
    `${dirName.toLowerCase()}.jpg`,
  ];
  for (const filename of candidates) {
    if (fs.existsSync(path.join(screenshotsDir, filename))) {
      return `/assets/imgs/work/projects/${filename}`;
    }
  }
  return `/assets/imgs/work/img-${((order - 1) % 4) + 1}.png`;
}

function normalizeProject(projectDir, metadata, order) {
  const dirName = path.basename(projectDir);
  const autoTechs = collectAutoTechs(projectDir);
  const mergedTechs = Array.from(new Set([...(metadata.techs || []), ...autoTechs]));
  const services = Array.from(new Set(metadata.services || []));
  const features = Array.from(new Set(metadata.features || mergedTechs.slice(0, 5).map((tech) => `${tech} implementation`)));
  const designHighlights = Array.from(
    new Set(
      metadata.designHighlights || [
        'Portfolio metadata standard is enforced',
        'Tech stack is merged with repository scan results',
        'Content is generated dynamically for portfolio seeds',
      ],
    ),
  );

  return {
    dirName,
    title: metadata.title,
    slug: metadata.slug || slugify(metadata.title),
    summary: metadata.summary,
    description: metadata.description || metadata.summary,
    repoUrl: metadata.repoUrl || null,
    websiteUrl: metadata.websiteUrl || null,
    demoUrl: metadata.demoUrl || metadata.websiteUrl || null,
    category: metadata.category,
    clientName: metadata.clientName || 'Own Project',
    startDate: metadata.startDate || '2025-01-01',
    completeDate: metadata.completeDate || null,
    completionTimeLabel: metadata.completionTimeLabel || (metadata.completeDate ? 'Completed' : 'Ongoing'),
    isFeatured: metadata.featured ? 1 : 0,
    displayOrder: typeof metadata.displayOrder === 'number' ? metadata.displayOrder : order,
    techs: mergedTechs,
    services,
    features,
    designHighlights,
    featuredImage: resolveFeaturedImage(metadata, dirName, order),
    featuredImageAlt: metadata.featuredImageAlt || `${metadata.title} cover image`,
    resumeTitle: metadata.resumeTitle || metadata.title,
    resumeSubtitle: metadata.resumeSubtitle || metadata.category,
    status: metadata.status || 'active',
    excludeFromPortfolio: Boolean(metadata.excludeFromPortfolio),
  };
}

/** Ayni slug birden fazla klasorden gelirse (or. VistaSeed + bereketfide) tek satirda birlestir — DB unique (locale, slug). */
function dedupeProjectsBySlug(projects) {
  const bySlug = new Map();
  const isGenericPlaceholder = (url) => /\/work\/img-[1-4]\.png$/.test(String(url || ''));

  for (const p of projects) {
    const prev = bySlug.get(p.slug);
    if (!prev) {
      bySlug.set(p.slug, p);
      continue;
    }
    if (isGenericPlaceholder(prev.featuredImage) && !isGenericPlaceholder(p.featuredImage)) {
      bySlug.set(p.slug, p);
    }
  }

  const ordered = [];
  const seen = new Set();
  for (const p of projects) {
    if (seen.has(p.slug)) continue;
    ordered.push(bySlug.get(p.slug));
    seen.add(p.slug);
  }
  return ordered.map((project, index) => ({ ...project, displayOrder: index + 1 }));
}

function buildProjects() {
  const candidates = listCandidateProjectDirs().sort((a, b) => path.basename(a).localeCompare(path.basename(b)));
  const projects = [];

  candidates.forEach((dir, index) => {
    const metadata = loadMetadata(dir);
    if (!metadata) return;
    const project = normalizeProject(dir, metadata, index + 1);
    if (project.excludeFromPortfolio) {
      log(`${project.dirName} metadata ile portfolio disi birakildi.`);
      return;
    }
    projects.push(project);
  });

  const sorted = projects
    .sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) return b.isFeatured - a.isFeatured;
      return a.displayOrder - b.displayOrder;
    })
    .map((project, index) => ({ ...project, displayOrder: index + 1 }));

  return dedupeProjectsBySlug(sorted);
}

function buildSkillModel(projects) {
  const profileReadme = readTextIfExists(profileReadmePath);
  const profileSkillTitles = parseGlobalSkillTitles(profileReadme);
  const scoreMap = new Map();

  for (const title of profileSkillTitles) {
    scoreMap.set(title, (scoreMap.get(title) || 0) + 2);
  }

  for (const project of projects) {
    for (const tech of new Set(project.techs)) {
      scoreMap.set(tech, (scoreMap.get(tech) || 0) + 1);
    }
  }

  const ranked = Array.from(scoreMap.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([title, score], index) => ({
      title,
      slug: slugify(title),
      percent: Math.max(55, Math.min(98, 50 + score * 8)),
      displayOrder: index + 1,
    }));

  return {
    counters: ranked.slice(0, 7),
    logos: ranked.slice(0, 12).map((item, index) => ({
      ...item,
      track: index % 2 === 0 ? 'right' : 'left',
    })),
  };
}

function buildResumeEntries(projects) {
  const entries = [];
  const profileReadme = readTextIfExists(profileReadmePath);
  const focusMatch = profileReadme.match(/Current focus:\*\*\s*([^-\n]+)/i);

  if (focusMatch) {
    entries.push({
      type: 'experience',
      title: 'Full-Stack Developer',
      subtitle: 'Current focus',
      description: focusMatch[1].replace(/\*\*/g, '').trim(),
      highlights: ['Laravel', 'Next.js', 'Flutter', 'Multi-project delivery'],
      slug: 'full-stack-developer-current-focus',
      startDate: '2025-01-01',
      endDate: null,
      isCurrent: 1,
      organization: 'Orhan Guzel',
      location: 'Grevenbroich',
      scoreValue: null,
      scoreScale: 5,
      displayOrder: 10,
    });
  }

  projects.slice(0, 6).forEach((project, index) => {
    entries.push({
      type: 'experience',
      title: project.resumeTitle,
      subtitle: project.resumeSubtitle,
      description: project.summary,
      highlights: project.techs.slice(0, 5),
      slug: slugify(`${project.slug}-experience`),
      startDate: project.startDate,
      endDate: project.completeDate,
      isCurrent: project.completeDate ? 0 : 1,
      organization: project.title,
      location: 'Remote / Germany',
      scoreValue: null,
      scoreScale: 5,
      displayOrder: 20 + index * 10,
    });
  });

  const certDir = path.join(careerRoot, 'zertifikate');
  const certificateFiles = fs.existsSync(certDir)
    ? fs.readdirSync(certDir, { withFileTypes: true }).filter((entry) => entry.isFile())
    : [];

  if (certificateFiles.length) {
    entries.push({
      type: 'education',
      title: 'Web Development Certification',
      subtitle: 'FbW Weiterbildung',
      description: 'Career materials repository includes current certificates and portfolio-aligned training artifacts.',
      highlights: ['Web development training', 'Career documentation', 'Portfolio-aligned learning path'],
      slug: 'web-development-certification',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isCurrent: 0,
      organization: 'FbW',
      location: 'Germany',
      scoreValue: 5.0,
      scoreScale: 5,
      displayOrder: 100,
    });
  }

  return entries;
}

function localeText(value, locale) {
  return value;
}

function renderProjectsSeed(projects, locale) {
  const lines = [];
  lines.push(`-- AUTO-GENERATED FILE. Source: ${projectsRoot} project metadata files`);
  lines.push(`-- Generated at ${new Date().toISOString()}`);
  lines.push('SET NAMES utf8mb4;');
  lines.push("SET time_zone = '+00:00';");
  lines.push('');
  lines.push('START TRANSACTION;');
  lines.push('');

  if (locale === 'en') {
    projects.forEach((project, index) => {
      const idVar = `@p${index + 1}`;
      const i18nVar = `@pi18n${index + 1}`;
      const imgVar = `@img${index + 1}`;
      const imgI18nVar = `@imgI18n${index + 1}`;
      const assetVar = `@asset${index + 1}`;
      lines.push(`SET ${idVar} := UUID();`);
      lines.push(`SET ${i18nVar} := UUID();`);
      lines.push(`SET ${imgVar} := UUID();`);
      lines.push(`SET ${imgI18nVar} := UUID();`);
      lines.push(`SET ${assetVar} := UUID();`);
      lines.push('');
      lines.push('INSERT INTO `projects` (');
      lines.push('  `id`, `is_published`, `is_featured`, `display_order`,');
      lines.push('  `price_onetime`, `currency`, `is_purchasable`,');
      lines.push('  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,');
      lines.push('  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,');
      lines.push('  `services`, `website_url`, `techs`, `created_at`, `updated_at`');
      lines.push(') VALUES (');
      lines.push(`  ${idVar}, 1, ${project.isFeatured}, ${project.displayOrder},`);
      lines.push(`  1000.00, 'USD', 1,`);
      lines.push(`  ${sqlString(project.featuredImage)}, ${assetVar}, ${sqlNullable(project.demoUrl)}, ${sqlNullable(project.repoUrl)},`);
      lines.push(`  ${sqlString(project.category)}, ${sqlString(project.clientName)}, ${sqlString(project.startDate)}, ${sqlNullable(project.completeDate)}, ${sqlString(project.completionTimeLabel)},`);
      lines.push(`  ${sqlJson(project.services)}, ${sqlNullable(project.websiteUrl)}, ${sqlJson(project.techs)}, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)`);
      lines.push(');');
      lines.push('');
      lines.push('INSERT INTO `projects_i18n` (');
      lines.push('  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,');
      lines.push('  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`');
      lines.push(') VALUES (');
      lines.push(`  ${i18nVar}, ${idVar}, 'en', ${sqlString(project.title)}, ${sqlString(project.slug)}, ${sqlString(project.summary)},`);
      lines.push(`  ${sqlJson({
        html: `<p>${project.description}</p>`,
        description: null,
        key_features: project.features,
        technologies_used: project.techs,
        design_highlights: project.designHighlights,
      })}, ${sqlString(project.featuredImageAlt)}, ${sqlString(project.title)}, ${sqlString(project.summary.slice(0, 480))}, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)`);
      lines.push(');');
      lines.push('');
      lines.push('INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES');
      lines.push(`(${imgVar}, ${idVar}, ${assetVar}, ${sqlString(project.featuredImage)}, 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));`);
      lines.push('');
      lines.push('INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES');
      lines.push(`(${imgI18nVar}, ${imgVar}, 'en', ${sqlString(project.title)}, ${sqlString('Primary project visual')}, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));`);
      lines.push('');
    });
  } else {
    projects.forEach((project, index) => {
      const idVar = `@p${index + 1}`;
      const imgVar = `@img${index + 1}`;
      const title = localeText(project.title, locale);
      const summary = localeText(project.summary, locale);
      lines.push(`SET ${idVar} := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug=${sqlString(project.slug)} LIMIT 1);`);
      lines.push(`SET ${imgVar} := (SELECT id FROM project_images WHERE project_id=${idVar} ORDER BY display_order ASC, created_at ASC LIMIT 1);`);
      lines.push('');
      lines.push('INSERT INTO `projects_i18n` (');
      lines.push('  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,');
      lines.push('  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`');
      lines.push(') VALUES (');
      lines.push(`  UUID(), ${idVar}, ${sqlString(locale)}, ${sqlString(title)}, ${sqlString(project.slug)}, ${sqlString(summary)},`);
      lines.push(`  ${sqlJson({
        html: `<p>${summary}</p>`,
        description: null,
        key_features: project.features,
        technologies_used: project.techs,
        design_highlights: project.designHighlights,
      })}, ${sqlString(`${title} cover image`)}, ${sqlString(title)}, ${sqlString(summary.slice(0, 480))}, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)`);
      lines.push(')');
      lines.push('ON DUPLICATE KEY UPDATE');
      lines.push('  title = VALUES(title),');
      lines.push('  slug = VALUES(slug),');
      lines.push('  summary = VALUES(summary),');
      lines.push('  content = VALUES(content),');
      lines.push('  featured_image_alt = VALUES(featured_image_alt),');
      lines.push('  meta_title = VALUES(meta_title),');
      lines.push('  meta_description = VALUES(meta_description),');
      lines.push('  updated_at = CURRENT_TIMESTAMP(3);');
      lines.push('');
      lines.push('INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES');
      lines.push(`(UUID(), ${imgVar}, ${sqlString(locale)}, ${sqlString(title)}, ${sqlString('Primary project visual')}, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))`);
      lines.push('ON DUPLICATE KEY UPDATE');
      lines.push('  alt = VALUES(alt),');
      lines.push('  caption = VALUES(caption),');
      lines.push('  updated_at = CURRENT_TIMESTAMP(3);');
      lines.push('');
    });
  }

  lines.push('COMMIT;');
  lines.push('');
  return lines.join('\n');
}

function renderResumeSeed(entries) {
  const lines = [];
  lines.push(`-- AUTO-GENERATED FILE. Source: ${profileRepoRoot}`);
  lines.push(`-- Generated at ${new Date().toISOString()}`);
  lines.push('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;');
  lines.push("SET collation_connection = 'utf8mb4_unicode_ci';");
  lines.push("SET time_zone = '+00:00';");
  lines.push('');
  lines.push('START TRANSACTION;');
  lines.push('');

  entries.forEach((entry, index) => {
    const idVar = `@r${index + 1}`;
    lines.push(`SET ${idVar} := UUID();`);
    lines.push('INSERT INTO `resume_entries`');
    lines.push('(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)');
    lines.push('VALUES');
    lines.push(`(${idVar},${sqlString(entry.type)},1,${entry.displayOrder},${sqlString(entry.startDate)},${sqlNullable(entry.endDate)},${entry.isCurrent},${sqlNullable(entry.location)},${sqlNullable(entry.organization)},${entry.scoreValue === null ? 'NULL' : entry.scoreValue},${entry.scoreScale},NOW(3),NOW(3));`);
    lines.push('');
    for (const locale of LOCALES) {
      lines.push('INSERT INTO `resume_entries_i18n`');
      lines.push('(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)');
      lines.push('VALUES');
      lines.push(`(UUID(),${idVar},${sqlString(locale)},${sqlString(localeText(entry.title, locale))},${sqlString(localeText(entry.subtitle, locale))},${sqlString(localeText(entry.description, locale))},${sqlJson(entry.highlights)},${sqlString(entry.slug)},NOW(3),NOW(3));`);
      lines.push('');
    }
  });

  lines.push('COMMIT;');
  lines.push('');
  return lines.join('\n');
}

function renderSkillSeed(skillModel) {
  const lines = [];
  lines.push(`-- AUTO-GENERATED FILE. Source: ${projectsRoot} metadata + ${profileReadmePath}`);
  lines.push(`-- Generated at ${new Date().toISOString()}`);
  lines.push('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;');
  lines.push("SET collation_connection = 'utf8mb4_unicode_ci';");
  lines.push("SET time_zone = '+00:00';");
  lines.push('');
  lines.push('START TRANSACTION;');
  lines.push('');

  skillModel.counters.forEach((counter, index) => {
    const idVar = `@c${index + 1}`;
    lines.push(`SET ${idVar} := UUID();`);
    lines.push('INSERT INTO `skill_counters`');
    lines.push('(`id`,`percent`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)');
    lines.push('VALUES');
    lines.push(`(${idVar},${counter.percent},${sqlString(`/assets/imgs/skills/skills-1/icon-${(index % 7) + 1}.png`)},NULL,1,${counter.displayOrder * 10},NOW(3),NOW(3));`);
    lines.push('');
    for (const locale of LOCALES) {
      lines.push('INSERT INTO `skill_counters_i18n`');
      lines.push('(`id`,`counter_id`,`locale`,`title`,`slug`,`created_at`,`updated_at`)');
      lines.push('VALUES');
      lines.push(`(UUID(),${idVar},${sqlString(locale)},${sqlString(localeText(counter.title, locale))},${sqlString(counter.slug)},NOW(3),NOW(3));`);
      lines.push('');
    }
  });

  skillModel.logos.forEach((logo, index) => {
    const idVar = `@l${index + 1}`;
    lines.push(`SET ${idVar} := UUID();`);
    lines.push('INSERT INTO `skill_logos`');
    lines.push('(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)');
    lines.push('VALUES');
    lines.push(`(${idVar},${sqlString(logo.track)},${sqlString(`/assets/imgs/home-page-2/hero-1/icon-${(index % 9) + 1}.svg`)},NULL,1,${logo.displayOrder * 10},NOW(3),NOW(3));`);
    lines.push('');
    for (const locale of LOCALES) {
      lines.push('INSERT INTO `skill_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES');
      lines.push(`(UUID(),${idVar},${sqlString(locale)},${sqlString(localeText(logo.title, locale))},NOW(3),NOW(3));`);
      lines.push('');
    }
  });

  lines.push('COMMIT;');
  lines.push('');
  return lines.join('\n');
}

function writeFile(name, content) {
  fs.writeFileSync(path.join(sqlDir, name), content, 'utf8');
  log(`updated ${name}`);
}

function main() {
  if (!fs.existsSync(profileReadmePath)) {
    throw new Error(`Profile README not found: ${profileReadmePath}`);
  }

  const projects = buildProjects();
  const skills = buildSkillModel(projects);
  const resumeEntries = buildResumeEntries(projects);

  writeFile('221_projects_seeder_en.sql', renderProjectsSeed(projects, 'en'));
  writeFile('222_projects_seeder_tr.sql', renderProjectsSeed(projects, 'tr'));
  writeFile('223_projects_seeder_de.sql', renderProjectsSeed(projects, 'de'));
  writeFile('241_resume_seeder.sql', renderResumeSeed(resumeEntries));
  writeFile('251_skill_seeder.sql', renderSkillSeed(skills));

  log(`generated ${projects.length} projects, ${resumeEntries.length} resume entries, ${skills.counters.length} skill counters`);
}

main();
