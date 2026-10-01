"""Portfolyo siralamasi (en yeni proje once) + gercek tarihler + hizmet gorselleri — 2026-10-01.

Uretir: sql/227_portfolyo_sira_hizmet_gorsel.sql (gwd) ve content/gzl/056_... (gzl); iki dosya ayni.

Tarih kurali (kaynak: project.portfolio.json timeline + proje reposu git gecmisi):
- manifestte gercek baslangic varsa o; manifest degeri yer tutucuysa ("YYYY-01-01") ya da
  yoksa reponun ilk commit tarihi.
- kaynak klasoru olmayan projelerde siralama icin veritabani kayit tarihi kullanilir ama
  start_date'e YAZILMAZ (kesin olmayan tarih gosterilmez).
Siralama: baslangic tarihi en yeni olan en ustte (display_order 10, 20, ...).

Hizmet gorselleri: rakibe gecen proje ekrani (GenomAI, Vista Insaat), alakasiz grafik ve
optimizer'da 400 veren Unsplash stok fotograflari; yerine kendi projelerimizin 1600x900
kapaklari ya da uretilmis grafik.

Kullanim: PORTFOLYO_TARIH_JSON=<tarihler.json> HIZMET_KAPAK_DIR=<out-hizmet> \\
  python3 backend/scripts/portfolyo-sira-hizmet-2026-10.py <gwd.sql> <gzl.sql>
"""
import json, os, sys, uuid

NS = uuid.UUID('6f1c2a4e-2026-4a10-9c00-000000000002')


def uid(*parts):
    return str(uuid.uuid5(NS, '/'.join(parts)))


def q(v):
    if v is None:
        return 'NULL'
    if isinstance(v, (int, float)):
        return str(v)
    return "'" + str(v).replace('\\', '\\\\').replace("'", "''") + "'"


# Kaynak klasoru olmayanlar: yalniz siralama icin (start_date'e yazilmaz)
SIRA_ICIN = {'socialpulse': '2026-04-23',   # Tanitio'nun onceki adi; ekosistem-sosyal-medya repo baslangici
             'promats': '2026-08-12', 'b2b-geo-seo': '2026-06-11', 'antalyadoner': '2026-06-11'}

HIZMET = ['ai-ml-veri-tahmin-platformu', 'online-siparis-sistemi', 'ubuntu-vps-kurulum-yayinlama', 'emlak-ilan-sitesi',
          'randevu-sistemli-kurumsal-site', 'kurumsal-web-sitesi', 'e-ticaret-sitesi', 'ozel-yazilim-nextjs-fastify',
          'bakim-destek', 'osgb-isletme-yonetim-sistemi']


def baslangic(r):
    m, g = r.get('manifest_start'), (r.get('git') or [None])[0]
    if m and not m.endswith('-01-01'):
        return m
    return g or m


def build(tarih_json, kapak_dir):
    raw = json.load(open(tarih_json))
    out = ['-- URETILMIS DOSYA — backend/scripts/portfolyo-sira-hizmet-2026-10.py', 'SET NAMES utf8mb4;', 'START TRANSACTION;']

    # 1) Portfolyo: tarihler + siralama
    kayit = []
    for d, r in raw.items():
        r = dict(r, manifest_start=r.get('start') if r.get('kaynak') == 'manifest' else None)
        st = baslangic(r)
        kayit.append((d, st, r.get('end'), st or SIRA_ICIN.get(d)))
    kayit.sort(key=lambda x: (x[3] or '0000-00-00', x[0]), reverse=True)
    out.append('\n-- Portfolyo: en yeni baslangic en ustte; tarih alanlari gercek kaynaktan.')
    for i, (d, st, end, _) in enumerate(kayit):
        like = q(f'/uploads/portfolio/{d}/%')
        out.append(f"UPDATE `projects` SET `display_order`={(i + 1) * 10}, `start_date`={q(st)}, `complete_date`={q(end)}, `updated_at`=NOW(3) WHERE `featured_image` LIKE {like};")

    # 2) Hizmet gorselleri
    out.append('\n-- Hizmet gorselleri: 1600x900, kendi projelerimiz / uretilmis grafik.')
    for slug in HIZMET:
        path = f'services/{slug}/kapak-1600x900.webp'
        url = '/uploads/' + path
        aid = uid('asset', 'service', slug)
        size = os.path.getsize(os.path.join(kapak_dir, slug, 'kapak-1600x900.webp'))
        out.append("INSERT INTO `storage_assets` (`id`,`user_id`,`name`,`bucket`,`path`,`folder`,`mime`,`size`,`width`,`height`,`url`,`provider`,`provider_resource_type`,`provider_format`,`metadata`) VALUES "
                   f"({q(aid)},NULL,'kapak-1600x900.webp','media',{q(path)},{q('services/' + slug)},'image/webp',{size},1600,900,{q(url)},'local','image','webp',{q(json.dumps({'source': 'services-2026-10', 'role': 'cover'}))})"
                   " ON DUPLICATE KEY UPDATE `size`=VALUES(`size`),`url`=VALUES(`url`),`updated_at`=NOW(3);")
        sub = f"(SELECT `service_id` FROM `services_i18n` WHERE `locale`='tr' AND `slug`={q(slug)} LIMIT 1) x"
        out.append(f"UPDATE `services` s JOIN {sub} ON s.`id`=x.`service_id` SET s.`featured_image`={q(url)}, s.`image_url`={q(url)}, s.`image_asset_id`={q(aid)}, s.`updated_at`=NOW(3);")
        out.append(f"UPDATE `service_images` si JOIN (SELECT `service_id` FROM `services_i18n` WHERE `locale`='tr' AND `slug`={q(slug)} LIMIT 1) x ON si.`service_id`=x.`service_id` SET si.`image_url`={q(url)}, si.`image_asset_id`={q(aid)}, si.`updated_at`=NOW(3);")
        # Galerisi olmayan hizmete tek gorsel (+ dil basina alt metin = hizmet adi)
        img = uid('service-image', slug)
        out.append("INSERT INTO `service_images` (`id`,`service_id`,`image_asset_id`,`image_url`,`is_active`,`display_order`,`created_at`,`updated_at`) "
                   f"SELECT {q(img)}, x.`service_id`, {q(aid)}, {q(url)}, 1, 1, NOW(3), NOW(3) FROM (SELECT `service_id` FROM `services_i18n` WHERE `locale`='tr' AND `slug`={q(slug)} LIMIT 1) x "
                   "WHERE NOT EXISTS (SELECT 1 FROM `service_images` si WHERE si.`service_id`=x.`service_id` AND si.`id`<>" + q(img) + ") "
                   "ON DUPLICATE KEY UPDATE `image_url`=VALUES(`image_url`),`image_asset_id`=VALUES(`image_asset_id`),`updated_at`=NOW(3);")
        out.append("INSERT INTO `service_images_i18n` (`id`,`image_id`,`locale`,`title`,`alt`,`caption`,`created_at`,`updated_at`) "
                   f"SELECT UUID(), {q(img)}, i.`locale`, i.`name`, i.`name`, NULL, NOW(3), NOW(3) FROM `services_i18n` i "
                   f"WHERE i.`service_id`=(SELECT `service_id` FROM `services_i18n` WHERE `locale`='tr' AND `slug`={q(slug)} LIMIT 1) "
                   f"AND EXISTS (SELECT 1 FROM `service_images` WHERE `id`={q(img)}) "
                   f"AND NOT EXISTS (SELECT 1 FROM `service_images_i18n` t WHERE t.`image_id`={q(img)} AND t.`locale`=i.`locale`);")
    out.append('COMMIT;')
    return '\n'.join(out) + '\n'


if __name__ == '__main__':
    sql = build(os.environ['PORTFOLYO_TARIH_JSON'], os.environ['HIZMET_KAPAK_DIR'])
    for path in sys.argv[1:]:
        open(path, 'w').write(sql)
    print('yazildi:', ', '.join(sys.argv[1:]))
