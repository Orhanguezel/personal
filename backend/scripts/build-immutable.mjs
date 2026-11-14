import path from 'node:path';
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
const root = path.resolve(import.meta.dirname, '..');
const shared = path.resolve(root, '../../packages/shared-backend');
const shim = path.join(root, 'src/modules/shared-content/routing.ts');
const test = process.argv.includes('--test');
const result = await Bun.build({
  entrypoints: [path.join(root, test ? 'test/shared-content/app.ts' : 'src/index.ts')],
  outdir: path.join(root, 'dist'),
  naming: test ? 'test-app.js' : 'index.js',
  target: 'bun',
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  packages: 'external',
  sourcemap: 'none',
  plugins: [
    {
      name: 'immutable-shared-backend',
      setup(build) {
        build.onResolve({ filter: /^@\// }, async (args) => {
          const suffix = args.path.slice(2);
          for (const p of [
            path.join(root, 'src', suffix + '.ts'),
            path.join(root, 'src', suffix + '.json'),
            path.join(root, 'src', suffix, 'index.ts'),
          ]) {
            try {
              await fs.access(p);
              return { path: p, external: false };
            } catch {}
          }
          throw Error('Unresolved local import ' + args.path);
        });
        build.onResolve({ filter: /^@vps\/shared-backend(?:\/|$)/ }, (args) => {
          let suffix = args.path.replace(/^@vps\/shared-backend\/?/, '');
          const possibilities = [
            path.join(shared, suffix + '.ts'),
            path.join(shared, suffix, 'index.ts'),
          ];
          return fs
            .access(possibilities[0])
            .then(() => ({ path: possibilities[0], external: false }))
            .catch(() => ({ path: possibilities[1], external: false }));
        });
        build.onLoad(
          { filter: /\/packages\/shared-backend\/modules\/projects\/admin.controller.ts$/ },
          async (args) => ({
            contents: (await fs.readFile(args.path, 'utf8'))
              .replace(
                "if (process.env.LINKEDIN_ENABLED !== 'true' || !isPublished) return;",
                "if (process.env.CONTENT_SHARED_ENABLED === '1' || process.env.LINKEDIN_ENABLED !== 'true' || !isPublished) return;",
              )
              .replaceAll(
                '((req as any).locale, DEFAULT_LOCALE,',
                '((req as any).locale, (req as any).locale,',
              )
              .replaceAll('defaultLocale: DEFAULT_LOCALE,', 'defaultLocale: (req as any).locale,'),
            loader: 'ts',
          }),
        );
        build.onLoad(
          { filter: /\/packages\/shared-backend\/modules\/storage\/cloudinary.ts$/ },
          async (args) => {
            let source = await fs.readFile(args.path, 'utf8');
            source = "import {createHash as contentHash} from 'node:crypto';\n" + source;
            const changes = [
              [
                'localRoot: settings?.localRoot ?? null,',
                "localRoot: process.env.CONTENT_SHARED_ENABLED==='1'?process.env.CONTENT_MEDIA_ROOT:settings?.localRoot ?? null,",
              ],
              [
                'const folder = (opts.folder ?? cfg.defaultFolder ?? "").replace',
                'const folder = process.env.CONTENT_SHARED_ENABLED===\'1\'?"content":(opts.folder ?? cfg.defaultFolder ?? "").replace',
              ],
              [
                'let baseName =\n    (opts.publicId',
                "let baseName =\n    process.env.CONTENT_SHARED_ENABLED==='1'?contentHash('sha256').update(buffer).digest('hex'):(opts.publicId",
              ],
              [
                'await fs.writeFile(absFile, buffer);',
                "await fs.writeFile(absFile, buffer, process.env.CONTENT_SHARED_ENABLED==='1'?{flag:'wx'}:{}).catch(error=>{if(process.env.CONTENT_SHARED_ENABLED==='1'&&error.code==='EEXIST')return;throw error;});",
              ],
              [
                '    etag: null,',
                "    etag: process.env.CONTENT_SHARED_ENABLED==='1'?contentHash('sha256').update(buffer).digest('hex'):null,",
              ],
              [
                'root = fallbackRoot;',
                "if(process.env.CONTENT_SHARED_ENABLED==='1')throw err;\n      root = fallbackRoot;",
              ],
            ];
            for (const [before, after] of changes) {
              if (!source.includes(before))
                throw Error('Shared media adapter source changed: ' + before);
              source = source.replace(before, after);
            }
            return { contents: source, loader: 'ts' };
          },
        );
        build.onLoad(
          {
            filter:
              /\/packages\/shared-backend\/modules\/(projects|services|faqs|customPages|categories)\/repository.ts$/,
          },
          async (args) => {
            let source = await fs.readFile(args.path, 'utf8');
            const module = path.basename(path.dirname(args.path));
            const parent = { projects: 'projects', services: 'services', faqs: 'faqs' }[module];
            if (parent)
              source = source.replaceAll(
                '.orderBy(orderBy)',
                `.orderBy(orderBy, asc(${parent}.id))`,
              );
            source = source
              .replaceAll(
                'asc(projectImages.created_at))',
                'asc(projectImages.created_at), asc(projectImages.id))',
              )
              .replaceAll(
                'asc(serviceImages.created_at))',
                'asc(serviceImages.created_at), asc(serviceImages.id))',
              )
              .replaceAll(
                'asc(customPagesI18n.title))',
                'asc(customPagesI18n.title), asc(customPages.id))',
              )
              .replaceAll('asc(categoryI18n.name))', 'asc(categoryI18n.name), asc(categories.id))');
            return { contents: source, loader: 'ts' };
          },
        );
        build.onLoad(
          {
            filter:
              /\/packages\/shared-backend\/modules\/products\/(controller|admin.controller).ts$/,
          },
          async (args) => ({
            contents: (await fs.readFile(args.path, 'utf8'))
              .replaceAll('.orderBy(orderExpr)', '.orderBy(orderExpr, asc(products.id))')
              .replaceAll(
                'asc(productImages.created_at))',
                'asc(productImages.created_at), asc(productImages.id))',
              )
              .replaceAll(
                'asc(productSpecs.order_num))',
                'asc(productSpecs.order_num), asc(productSpecs.id))',
              ),
            loader: 'ts',
          }),
        );
        build.onLoad(
          { filter: /\/packages\/shared-backend\/modules\/storage\/helpers\/admin.helpers.ts$/ },
          async (args) => ({
            contents: (await fs.readFile(args.path, 'utf8')).replace(
              'const path = input.folder ? `${input.folder}/${input.name}` : input.name;',
              "const path = process.env.CONTENT_SHARED_ENABLED==='1'&&input.provider==='local'?input.upload.public_id:(input.folder ? `${input.folder}/${input.name}` : input.name);",
            ),
            loader: 'ts',
          }),
        );
        build.onLoad({ filter: /\/packages\/shared-backend\/db\/client\.ts$/ }, () => ({
          contents: 'export {db,getPool} from ' + JSON.stringify(shim) + ';',
          loader: 'ts',
        }));
      },
    },
  ],
});
if (!result.success) {
  for (const log of result.logs) console.error(log);
  process.exit(1);
}
async function sourceFingerprint(dir) {
  const h = createHash('sha256');
  const visit = async (current) => {
    for (const entry of (await fs.readdir(current, { withFileTypes: true })).sort((a, b) =>
      a.name.localeCompare(b.name),
    )) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      const filename = path.join(current, entry.name);
      if (entry.isDirectory()) await visit(filename);
      else if (/\.(ts|json)$/.test(entry.name)) {
        h.update(path.relative(dir, filename) + '\0');
        h.update(await fs.readFile(filename));
      }
    }
  };
  await visit(dir);
  return h.digest('hex');
}
const sourceCommit = Bun.spawnSync(['git', '-C', root, 'rev-parse', 'HEAD'])
  .stdout.toString()
  .trim();
const sharedSourceSha256 = await sourceFingerprint(shared);
const bundle = await fs.readFile(path.join(root, 'dist', test ? 'test-app.js' : 'index.js'));
await fs.writeFile(
  path.join(root, 'dist/content-build.json'),
  JSON.stringify(
    {
      builtAt: new Date().toISOString(),
      sourceCommit,
      sharedSourceSha256,
      nodeEnv: 'production',
      sha256: createHash('sha256').update(bundle).digest('hex'),
      sharedBackendBundled: true,
    },
    null,
    2,
  ),
);
console.log('Immutable backend bundle:', bundle.length, 'bytes');

if (!test) {
  const migration = await Bun.build({
    entrypoints: [path.join(root, 'scripts/shared-content/merge.ts')],
    outdir: path.join(root, 'dist'),
    naming: 'shared-content-merge.js',
    target: 'bun',
    packages: 'external',
  });
  if (!migration.success) {
    for (const log of migration.logs) console.error(log);
    process.exit(1);
  }
  const verification = await Bun.build({
    entrypoints: [path.join(root, 'scripts/shared-content/verify.ts')],
    outdir: path.join(root, 'dist'),
    naming: 'shared-content-verify.js',
    target: 'bun',
    packages: 'external',
  });
  if (!verification.success) {
    for (const log of verification.logs) console.error(log);
    process.exit(1);
  }
  const rollback = await Bun.build({
    entrypoints: [path.join(root, 'scripts/shared-content/rollback.ts')],
    outdir: path.join(root, 'dist'),
    naming: 'shared-content-rollback.js',
    target: 'bun',
    packages: 'external',
  });
  if (!rollback.success) {
    for (const log of rollback.logs) console.error(log);
    process.exit(1);
  }
  await fs.copyFile(
    path.join(root, 'src/modules/shared-content/schema.sql'),
    path.join(root, 'dist/content-schema.sql'),
  );
  await fs.copyFile(
    path.join(root, 'src/db/seed/sql/225_gzl_crm_content_imports.sql'),
    path.join(root, 'dist/crm-imports.sql'),
  );
}
