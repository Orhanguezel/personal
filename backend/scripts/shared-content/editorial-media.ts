/** Only public media referenced by shared editorial records enters the shared store. */
export function selectEditorialMedia(chosen: Record<string, any[]>) {
  const ids = new Set<string>(),
    paths = new Set<string>();
  const scan = (value: any) => {
    if (Array.isArray(value)) {
      value.forEach(scan);
      return;
    }
    if (value && typeof value === 'object') {
      Object.values(value).forEach(scan);
      return;
    }
    if (typeof value !== 'string') return;
    if (/^[a-f0-9-]{36}$/i.test(value)) ids.add(value);
    const plain = value.replace(/\\\//g, '/');
    for (const match of plain.matchAll(/\/uploads\/([^"'\\\s<>?#)]+)/g)) {
      try {
        const path = decodeURIComponent(match[1]);
        if (!path.split('/').includes('..')) paths.add(path);
      } catch {}
    }
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === 'object') scan(parsed);
    } catch {}
  };
  for (const [table, rows] of Object.entries(chosen))
    if (!['storage_assets', 'storage_assets_i18n'].includes(table)) scan(rows);
  const original = chosen.storage_assets || [];
  const pathOf = (a: any) => {
    const match = String(a.url || '').match(/\/uploads\/([^?#]+)/);
    return match ? decodeURIComponent(match[1]) : String(a.path || '');
  };
  chosen.storage_assets = original.filter(
    (a) => ['media', 'public'].includes(a.bucket) && (ids.has(a.id) || paths.has(pathOf(a))),
  );
  const selected = new Set(chosen.storage_assets.map((a) => a.id));
  chosen.storage_assets_i18n = (chosen.storage_assets_i18n || []).filter((a) =>
    selected.has(a.asset_id),
  );
  for (const a of chosen.storage_assets) {
    const path = pathOf(a);
    if (path) paths.add(path);
    a.user_id = null;
  }
  const rewrite = (value: any): any => {
    if (Array.isArray(value)) return value.map(rewrite);
    if (value && typeof value === 'object')
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, rewrite(v)]));
    if (typeof value !== 'string') return value;
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === 'object') return JSON.stringify(rewrite(parsed));
    } catch {}
    return value.replace(
      /(?:https?:\/\/(?:www\.)?(?:guezelwebdesign|gzlteknoloji)\.com)?\/uploads\/([^"'\\\s<>?#)]+)/g,
      (full, path) => (paths.has(decodeURIComponent(path)) ? '/media/shared/' + path : full),
    );
  };
  for (const table of Object.keys(chosen)) chosen[table] = chosen[table].map(rewrite);
  return {
    assetIds: [...selected].sort(),
    paths: [...paths].sort(),
    excludedLocalAssets: original.length - selected.size,
  };
}
