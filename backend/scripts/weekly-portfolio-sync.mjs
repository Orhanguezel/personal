import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

const generatedFiles = [
  'backend/src/db/seed/sql/221_projects_seeder_en.sql',
  'backend/src/db/seed/sql/222_projects_seeder_tr.sql',
  'backend/src/db/seed/sql/223_projects_seeder_de.sql',
  'backend/src/db/seed/sql/241_resume_seeder.sql',
  'backend/src/db/seed/sql/251_skill_seeder.sql',
];

function run(command, args, options = {}) {
  const result = execFileSync(command, args, {
    cwd: repoRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
    ...options,
  });

  if (typeof result !== 'string') return '';
  return result.trim();
}

function log(message) {
  console.log(`[weekly-sync] ${message}`);
}

function ensureGeneratedFilesExist() {
  const missing = generatedFiles.filter((relativePath) => !fs.existsSync(path.join(repoRoot, relativePath)));
  if (missing.length > 0) {
    throw new Error(`Missing generated files: ${missing.join(', ')}`);
  }
}

function getChangedGeneratedFiles() {
  const output = run('git', ['status', '--porcelain', '--', ...generatedFiles]);
  if (!output) return [];
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function configureGitIdentity() {
  const userName = process.env.GIT_AUTHOR_NAME || 'guezelwebdesign-bot';
  const userEmail = process.env.GIT_AUTHOR_EMAIL || '41898282+github-actions[bot]@users.noreply.github.com';
  run('git', ['config', 'user.name', userName]);
  run('git', ['config', 'user.email', userEmail]);
}

function main() {
  log('Running portfolio validator');
  run('node', ['backend/scripts/validate-project-portfolios.mjs'], { stdio: 'inherit' });

  log('Generating portfolio seed files');
  run('node', ['backend/scripts/generate-dynamic-portfolio-seeds.mjs'], { stdio: 'inherit' });

  ensureGeneratedFilesExist();

  const changedFiles = getChangedGeneratedFiles();
  if (changedFiles.length === 0) {
    log('No generated seed changes detected');
    return;
  }

  log(`Detected ${changedFiles.length} changed generated file(s)`);

  if (process.env.AUTO_COMMIT !== '1') {
    log('AUTO_COMMIT is disabled; stopping after generation');
    return;
  }

  configureGitIdentity();
  run('git', ['add', '--', ...generatedFiles], { stdio: 'inherit' });

  const stagedDiff = run('git', ['diff', '--cached', '--name-only', '--', ...generatedFiles]);
  if (!stagedDiff) {
    log('No staged generated changes after git add');
    return;
  }

  const commitDate = new Date().toISOString().slice(0, 10);
  run('git', ['commit', '-m', `chore: weekly portfolio seed sync (${commitDate})`], { stdio: 'inherit' });
  log('Commit created');

  if (process.env.AUTO_PUSH === '1') {
    run('git', ['push', 'origin', 'HEAD:main'], { stdio: 'inherit' });
    log('Changes pushed to origin/main');
  } else {
    log('AUTO_PUSH is disabled; commit was created locally only');
  }
}

try {
  main();
} catch (error) {
  console.error(`[weekly-sync][error] ${error.message}`);
  process.exitCode = 1;
}
