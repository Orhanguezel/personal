import { toDetail } from '@vps/shared-backend/modules/_shared';
import { createHash, randomBytes } from 'node:crypto';
import { site, workspaceSchema } from './config';
import { getContentPool } from './routing';
import { byKind, type ContentKind } from './definitions';
import { readAggregate } from './repository';
const hash = (value: string) => createHash('sha256').update(value).digest('hex');
export async function createPreview(
  kind: string,
  id: string,
  target: string,
  locale: string,
  actor: string,
) {
  const token = randomBytes(32).toString('base64url');
  await getContentPool().query(
    'INSERT INTO `' +
      workspaceSchema +
      '`.content_preview_sessions (token_hash,site_id,kind,entity_id,locale,actor_id,expires_at) VALUES (?,?,?,?,?,?,DATE_ADD(NOW(3),INTERVAL 15 MINUTE))',
    [hash(token), target, kind, id, locale, actor],
  );
  return token;
}
export async function readPreview(token: string) {
  if (!/^[\w-]{43}$/.test(token))
    throw Object.assign(Error('invalid_preview'), { statusCode: 401 });
  const [rows]: any = await getContentPool().query(
    'SELECT kind,entity_id,locale,expires_at FROM `' +
      workspaceSchema +
      '`.content_preview_sessions WHERE token_hash=? AND site_id=? AND expires_at>NOW(3)',
    [hash(token), site],
  );
  const row = rows[0];
  if (!row) throw Object.assign(Error('invalid_preview'), { statusCode: 401 });
  const d = byKind.get(row.kind as ContentKind)!;
  const aggregate = await readAggregate(getContentPool(), d, row.entity_id);
  const parent = aggregate.tables[d.table]?.[0];
  const translated = d.translations
    ? aggregate.tables[d.translations.table]?.find((r) => r.locale === row.locale)
    : {};
  if (!parent || !translated)
    throw Object.assign(Error('preview_translation_missing'), { statusCode: 422 });
  // IDs in translations identify the translation; parent ID remains the public content ID.
  let data: any = {
    ...parent,
    ...translated,
    id: parent.id,
    locale: row.locale,
    [d.publishedField]: 1,
    _preview: true,
  };
  if (d.kind === 'projects') data = { ...toDetail(data), _preview: true, is_published: 1 };
  if (d.commercial?.length) {
    const [offers]: any = await getContentPool().query(
      'SELECT offer FROM `' +
        workspaceSchema +
        '`.content_offers WHERE site_id=? AND kind=? AND entity_id=?',
      [site, d.kind, row.entity_id],
    );
    const offer =
      typeof offers[0]?.offer === 'string' ? JSON.parse(offers[0].offer) : offers[0]?.offer;
    for (const field of d.commercial)
      if (field in data)
        data[field] = offer?.[field] ?? (field === 'is_purchasable' ? false : null);
    data.country_offer_available = !!offer;
    data.is_purchasable = false;
  }
  for (const child of d.children.filter((ch) => ch.table.endsWith('_images'))) {
    data.images = (aggregate.tables[child.table] || []).map((image) => {
      const translated = child.nested
        ? (aggregate.tables[child.nested.table] || []).find(
            (t) => t[child.nested!.fk] === image.id && t.locale === row.locale,
          )
        : {};
      return { ...image, ...translated, id: image.id };
    });
  }
  return { ...row, data };
}
