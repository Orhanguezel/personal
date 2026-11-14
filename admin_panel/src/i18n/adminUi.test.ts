import { expect, test } from 'bun:test';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getAdminTranslations } from './adminUi';

test('every literal admin UI translation used by a screen has a Turkish value', () => {
  const t = getAdminTranslations('tr');
  const missing = new Set<string>();
  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith('.tsx')) {
        for (const match of readFileSync(path, 'utf8').matchAll(/\bt\(['"](admin\.[^'"]+)['"]/g)) {
          if (t(match[1]) === match[1]) missing.add(match[1]);
        }
      }
    }
  }
  walk(join(import.meta.dir, '..'));
  expect([...missing]).toEqual([]);
  expect(t('admin.users.list.table.totalRecords', { count: 3 })).toBe('3 kayıt');
});
