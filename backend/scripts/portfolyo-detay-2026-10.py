"""Portfolyo detay metinleri (derin vaka calismasi) — 2026-10-01.

Kaynak: backend/scripts/portfolyo-detay/
  projeler/<tr_slug>.json  — proje reposundan (README, sema, rotalar, panel) cikarilmis tr/en/de metin
  ozet-duzeltme.json       — baslik/ozet/meta duzeltmeleri (Turkce karakter, eskimis sayi)

projects_i18n.content icinde yalniz su alanlar degisir (slug ve teknolojiler korunur):
  html, key_features, design_highlights, case_study
Proje, tr slug'i uzerinden bulunur; slug bulunamazsa satir sessizce etkilenmez (iki kurulumun
proje kumesi ayni degil).

Cikti: sql/229_portfolyo_detay.sql (gwd) ve content/gzl/059_portfolyo_detay.sql (gzl); ayni icerik.
Basliktaki degisiklik meta_title'a da gecer; sitenin " | Marka" eki korunur.

Kullanim: python3 backend/scripts/portfolyo-detay-2026-10.py backend/scripts/portfolyo-detay <gwd.sql> <gzl.sql>
"""
import glob, json, os, re, sys

IZINLI = {'p', 'h2', 'h3', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br'}
LOCALES = ('tr', 'en', 'de')


def q(v):
    return "'" + str(v).replace('\\', '\\\\').replace("'", "''") + "'"


def dogrula(slug, loc, d):
    html = d['html'].strip()
    etiketler = {t.lower() for t in re.findall(r'</?([a-zA-Z0-9]+)', html)}
    fazla = etiketler - IZINLI
    assert not fazla, f'{slug}/{loc}: izinsiz etiket {fazla}'
    assert not re.search(r'\s(style|class|on\w+)=', html), f'{slug}/{loc}: style/class/olay ozniteligi'
    assert len(re.sub(r'<[^>]+>', ' ', html).split()) >= 250, f'{slug}/{loc}: metin cok kisa'
    assert 5 <= len(d['key_features']) <= 10, f'{slug}/{loc}: key_features sayisi'
    assert 2 <= len(d['design_highlights']) <= 6, f'{slug}/{loc}: design_highlights sayisi'
    cs = d['case_study']
    assert all(cs.get(k, '').strip() for k in ('challenge', 'approach', 'outcome')), f'{slug}/{loc}: case_study eksik'
    return html


def proje_sql(slug):
    return ("(SELECT z.`project_id` FROM (SELECT `project_id` FROM `projects_i18n` "
            f"WHERE `locale`='tr' AND `slug`={q(slug)} LIMIT 1) z)")


def ozet_sql(slug, loc, d):
    alan = []
    if d.get('title'):
        # once meta_title: eski basligin yerine yenisi, " | Marka" eki aynen kalir
        alan.append(f"`meta_title`=CONCAT({q(d['title'])}, IF(LOCATE(' | ', `meta_title`)>0, SUBSTRING(`meta_title`, LOCATE(' | ', `meta_title`)), ''))")
        alan.append(f"`title`={q(d['title'])}")
    for k in ('summary', 'meta_description', 'featured_image_alt'):
        if d.get(k):
            alan.append(f"`{k}`={q(d[k])}")
    return (f"UPDATE `projects_i18n` SET {', '.join(alan)}, `updated_at`=NOW(3) "
            f"WHERE `locale`={q(loc)} AND `project_id`={proje_sql(slug)};")


def build(girdi):
    out = ['-- URETILMIS DOSYA — backend/scripts/portfolyo-detay-2026-10.py (elle duzenleme)',
           '-- Portfolyo detay metinleri: proje reposundan cikarilmis vaka calismasi (tr/en/de).',
           'SET NAMES utf8mb4;', 'START TRANSACTION;']
    for path in sorted(glob.glob(os.path.join(girdi, 'projeler', '*.json'))):
        p = json.load(open(path))
        slug = p['tr_slug']
        out.append(f'\n-- {slug}')
        for loc in LOCALES:
            d = p['locales'][loc]
            html = dogrula(slug, loc, d)
            cs = d['case_study']
            proj = proje_sql(slug)
            out.append(
                "UPDATE `projects_i18n` SET `content`=CAST(JSON_SET(CAST(`content` AS JSON), "
                f"'$.html', {q(html)}, "
                f"'$.key_features', CAST({q(json.dumps(d['key_features'], ensure_ascii=False))} AS JSON), "
                f"'$.design_highlights', CAST({q(json.dumps(d['design_highlights'], ensure_ascii=False))} AS JSON), "
                f"'$.case_study', JSON_OBJECT('challenge', {q(cs['challenge'])}, 'approach', {q(cs['approach'])}, 'outcome', {q(cs['outcome'])})"
                f") AS CHAR CHARACTER SET utf8mb4), `updated_at`=NOW(3) WHERE `locale`={q(loc)} AND `project_id`={proj};")
    duzelt = json.load(open(os.path.join(girdi, 'ozet-duzeltme.json')))
    out.append('\n-- Baslik/ozet/meta duzeltmeleri')
    for slug, locs in sorted(duzelt.items()):
        for loc, d in locs.items():
            assert loc in LOCALES
            out.append(ozet_sql(slug, loc, d))
    out.append('COMMIT;')
    return '\n'.join(out) + '\n'


if __name__ == '__main__':
    girdi, *hedef = sys.argv[1:]
    sql = build(girdi)
    for h in hedef:
        open(h, 'w').write(sql)
    print('yazildi:', ', '.join(hedef))
