"""Hizmetler 2026-10 (b): e-ticaret vitrin gorselleri + yeni "B2B Urun Katalogu ve Teklif Talep Sistemi" hizmeti.

Uretir: sql/228_hizmetler_2026_10b.sql (gwd) ve content/gzl/058_hizmetler_2026_10b.sql (gzl).
Fark yalniz tr/en meta_title eki (de basliklarinda marka eki yok — mevcut kayitlarla ayni duzen).

Gorseller: gercek proje ekranlari tarayici + telefon cercevesinde (Sportoonline; B2B icin
Kiremitci Metal, Aurora Global, Karbonkompozit). Yeni dosya adi (vitrin-*): optimizer onbellegi
eski gorseli 30 gun tutar.
B2B metni: kendi B2B projelerimizin manifestlerindeki ortak yetenekler; fiyat/sure rakami yok
(kaynak yok). Kullanim: python3 backend/scripts/hizmetler-2026-10b.py <gwd.sql> <gzl.sql>
"""
import json, sys, uuid

NS = uuid.UUID('6f1c2a4e-2026-4a10-9c00-000000000004')
uid = lambda *p: str(uuid.uuid5(NS, '/'.join(p)))


def q(v):
    if v is None:
        return 'NULL'
    if isinstance(v, (int, float)):
        return str(v)
    return "'" + str(v).replace('\\', '\\\\').replace("'", "''") + "'"


SLUG = {'services': {'tr': 'hizmetler', 'de': 'leistungen', 'en': 'services'},
        'work': {'tr': 'portfolyo', 'de': 'projekte', 'en': 'work'},
        'contact': {'tr': 'iletisim', 'de': 'kontakt', 'en': 'contact'}}
link = lambda loc, route, rest='': f"/{loc}/{SLUG[route][loc]}{rest}"

VITRIN = {'modern-e-ticaret-sitesi': 'eticaret-a', 'e-ticaret-sitesi': 'eticaret-b'}

B2B_SLUG = {'tr': 'b2b-urun-katalogu-teklif-talep-sistemi', 'en': 'b2b-product-catalog-quote-request-system',
            'de': 'b2b-produktkatalog-angebotsanfrage-system'}


def b2b(loc):
    L = lambda r, rest='': link(loc, r, rest)
    if loc == 'tr':
        return dict(
            name='B2B Ürün Kataloğu ve Teklif Talep Sistemi',
            summary='Ürünlerinizi kurumsal alıcılara teknik özellikleriyle sunan, çok dilli, filtrelenebilir katalog ve teklif talebi (RFQ) akışı olan B2B web sitesi.',
            alt='B2B ürün kataloğu ve teklif talep sistemi örnekleri',
            meta_title='B2B Ürün Kataloğu ve Teklif Talep Sistemi', meta_description='Üreticiler ve tedarikçiler için çok dilli B2B ürün kataloğu: teknik özellikler, filtreleme, teklif talebi (RFQ), yönetim paneli ve SEO/GEO altyapısı.',
            keywords='b2b ürün kataloğu, teklif talep sistemi, rfq, çok dilli katalog sitesi',
            html=(f'<p>B2B alıcı fiyat listesiyle değil, teknik özellik ve teklifle karar verir. B2B ürün kataloğu, ürünlerinizi kurumsal alıcılara bu dille sunan ve her ürün sayfasını bir teklif talebine bağlayan web sitesidir. GZL Teknoloji olarak bu siteleri üretici ve tedarikçilerin gerçek satış akışına göre kuruyoruz.</p>'
                  '<h2>B2B ürün kataloğu nedir?</h2><p>Bir e-ticaret sitesinden farkı, satışın sepette değil görüşmede kapanmasıdır. Alıcı ürünü bulur, teknik değerlerini karşılaştırır, belgelerini indirir ve teklif ister. Katalog bu yolu kısaltır; teklif talepleri de e-posta kutularında kaybolmak yerine panelde toplanır.</p>'
                  '<h2>Neler teslim ediyoruz?</h2><ul><li>Kategorili, filtrelenebilir ürün kataloğu ve teknik özellik tabloları</li><li>Her ürün sayfasında teklif talebi (RFQ) formu ve talep yönetimi</li><li>Çok dilli yapı; dil başına ayrı adres ve doğru hreflang eşleşmesi</li><li>Katalog, teknik doküman ve sertifika indirme alanları</li><li>İçeriğin tamamını yöneten panel: ürün, kategori, görsel ve sayfalar</li><li>Teknik SEO ve yapay zekâ aramaları için yapılandırılmış veri, site haritası ve llms.txt</li></ul>'
                  '<h2>Nasıl çalışıyoruz?</h2><ol><li>Ürün ağacı, teknik alanlar ve alıcı profili çıkarılır.</li><li>Mevcut ürün verisi (Excel veya eski site) aktarılır.</li><li>Katalog ve teklif akışı tasarlanıp geliştirilir.</li><li>Dil, hız ve arama kontrolleriyle yayına alınır.</li></ol>'
                  '<h2>Kimler için uygun?</h2><ul><li>İhracat yapan ve çok dilli katalog isteyen üreticiler</li><li>Teknik ürün satan tedarikçi ve distribütörler</li><li>Teklif taleplerini tek yerde toplamak isteyen satış ekipleri</li></ul>'
                  f'<p>Online sepet ve ödeme gerekiyorsa e-ticaret altyapısıyla başlamak daha doğrudur: <a href="{L("services", "/modern-e-ticaret-sitesi")}">Modern e-ticaret sitesi</a>.</p>'
                  '<h2>Fiyat ve süre</h2><p>Fiyat ve süre ürün sayısına, dil sayısına ve aktarılacak veri kapsamına göre belirlenir; ihtiyacınızı dinledikten sonra yazılı teklif veriyoruz.</p>'
                  '<h2>Sıkça Sorulan Sorular</h2><h3>Fiyatları sitede göstermek zorunda mıyız?</h3><p>Hayır. Fiyat gizli kalabilir; alıcı teklif ister, talep panelinize düşer.</p><h3>Ürünleri kendimiz ekleyebilir miyiz?</h3><p>Evet. Ürün, kategori, görsel ve doküman yönetimi panelden yapılır.</p><h3>Mevcut sitemizin adresleri korunur mu?</h3><p>Evet. Adres değişiyorsa yönlendirme haritası hazırlanır; arama motorlarındaki mevcut değer korunur.</p>'
                  f'<p>İlgili sayfalar: <a href="{L("work")}">Portföy</a> · <a href="{L("services", "/kurumsal-web-sitesi")}">Kurumsal web sitesi</a> · <a href="{L("contact")}">İletişim</a></p>'))
    if loc == 'en':
        return dict(
            name='B2B Product Catalog and Quote Request System',
            summary='A multilingual B2B website that presents your products to business buyers with technical specifications, filterable catalog pages and a request-for-quote (RFQ) flow.',
            alt='Examples of B2B product catalog and quote request systems',
            meta_title='B2B Product Catalog and Quote Request System', meta_description='Multilingual B2B product catalog for manufacturers and suppliers: technical specs, filters, request for quote (RFQ), admin panel and SEO/GEO foundations.',
            keywords='b2b product catalog, quote request system, rfq, multilingual catalog website',
            html=('<p>B2B buyers decide on technical specifications and quotes, not on a price list. A B2B product catalog presents your products in that language and connects every product page to a quote request. We build these sites around the real sales process of manufacturers and suppliers.</p>'
                  '<h2>What is a B2B product catalog?</h2><p>Unlike an online shop, the sale closes in a conversation, not in a basket. Buyers find the product, compare its specifications, download documents and request a quote. The catalog shortens that path, and quote requests land in a panel instead of getting lost in inboxes.</p>'
                  '<h2>What we deliver</h2><ul><li>Categorised, filterable product catalog with specification tables</li><li>A request-for-quote (RFQ) form on every product page plus request management</li><li>Multilingual structure with separate URLs per language and correct hreflang</li><li>Downloads for catalogs, technical documents and certificates</li><li>A panel that manages all content: products, categories, images and pages</li><li>Structured data, sitemap and llms.txt for technical SEO and AI search</li></ul>'
                  '<h2>How we work</h2><ol><li>We map the product tree, technical fields and buyer profile.</li><li>Existing product data (Excel or old site) is migrated.</li><li>The catalog and quote flow are designed and built.</li><li>We launch after language, speed and search checks.</li></ol>'
                  '<h2>Who is it for?</h2><ul><li>Exporting manufacturers that need a multilingual catalog</li><li>Suppliers and distributors of technical products</li><li>Sales teams that want all quote requests in one place</li></ul>'
                  f'<p>If you need a basket and online payment, start with an e-commerce platform instead: <a href="{L("services", "/modern-e-ticaret-sitesi")}">Modern e-commerce website</a>.</p>'
                  '<h2>Pricing and timeline</h2><p>Price and timeline depend on the number of products and languages and the data to migrate; we send a written quote after we understand your needs.</p>'
                  '<h2>Frequently asked questions</h2><h3>Do we have to show prices?</h3><p>No. Prices can stay hidden; buyers request a quote and it lands in your panel.</p><h3>Can we add products ourselves?</h3><p>Yes. Products, categories, images and documents are managed in the panel.</p><h3>Will our existing URLs be kept?</h3><p>Yes. If URLs change we prepare a redirect map so existing search rankings are preserved.</p>'
                  f'<p>Related pages: <a href="{L("work")}">Portfolio</a> · <a href="{L("services", "/kurumsal-web-sitesi")}">Corporate website</a> · <a href="{L("contact")}">Contact</a></p>'))
    return dict(
        name='B2B-Produktkatalog und Angebotsanfrage-System',
        summary='Eine mehrsprachige B2B-Website, die Ihre Produkte Geschäftskunden mit technischen Daten, filterbaren Katalogseiten und einem Angebotsanfrage-Ablauf (RFQ) präsentiert.',
        alt='Beispiele für B2B-Produktkataloge mit Angebotsanfrage',
        meta_title='B2B-Produktkatalog und Angebotsanfrage-System', meta_description='Mehrsprachiger B2B-Produktkatalog für Hersteller und Lieferanten: technische Daten, Filter, Angebotsanfrage (RFQ), Admin-Panel und SEO/GEO-Grundlagen.',
        keywords='b2b produktkatalog, angebotsanfrage system, rfq, mehrsprachige katalog website',
        html=('<p>B2B-Einkäufer entscheiden nach technischen Daten und Angeboten, nicht nach einer Preisliste. Ein B2B-Produktkatalog präsentiert Ihre Produkte genau so und verbindet jede Produktseite mit einer Angebotsanfrage. Wir bauen diese Websites entlang des tatsächlichen Vertriebsprozesses von Herstellern und Lieferanten.</p>'
              '<h2>Was ist ein B2B-Produktkatalog?</h2><p>Anders als im Onlineshop schließt der Verkauf im Gespräch, nicht im Warenkorb. Einkäufer finden das Produkt, vergleichen technische Werte, laden Unterlagen herunter und fordern ein Angebot an. Der Katalog verkürzt diesen Weg, und Anfragen landen im Panel statt in Postfächern.</p>'
              '<h2>Was wir liefern</h2><ul><li>Kategorisierter, filterbarer Produktkatalog mit technischen Datentabellen</li><li>Angebotsanfrage (RFQ) auf jeder Produktseite samt Anfrageverwaltung</li><li>Mehrsprachige Struktur mit eigenen URLs je Sprache und korrektem hreflang</li><li>Downloads für Kataloge, technische Unterlagen und Zertifikate</li><li>Ein Panel für alle Inhalte: Produkte, Kategorien, Bilder und Seiten</li><li>Strukturierte Daten, Sitemap und llms.txt für technisches SEO und KI-Suche</li></ul>'
              '<h2>So arbeiten wir</h2><ol><li>Produktbaum, technische Felder und Käuferprofil werden erfasst.</li><li>Vorhandene Produktdaten (Excel oder alte Website) werden übernommen.</li><li>Katalog und Angebotsablauf werden gestaltet und entwickelt.</li><li>Livegang nach Sprach-, Geschwindigkeits- und Suchprüfungen.</li></ol>'
              '<h2>Für wen geeignet?</h2><ul><li>Exportierende Hersteller mit Bedarf an mehrsprachigen Katalogen</li><li>Lieferanten und Distributoren technischer Produkte</li><li>Vertriebsteams, die alle Angebotsanfragen an einem Ort bündeln wollen</li></ul>'
              f'<p>Wenn Sie Warenkorb und Online-Zahlung brauchen, ist ein Onlineshop der bessere Start: <a href="{L("services", "/modern-e-ticaret-sitesi")}">Moderner Onlineshop</a>.</p>'
              '<h2>Preis und Dauer</h2><p>Preis und Dauer richten sich nach Produkt- und Sprachanzahl sowie den zu übernehmenden Daten; nach einem Gespräch erhalten Sie ein schriftliches Angebot.</p>'
              '<h2>Häufige Fragen</h2><h3>Müssen wir Preise anzeigen?</h3><p>Nein. Preise können verborgen bleiben; Einkäufer fordern ein Angebot an, das in Ihrem Panel landet.</p><h3>Können wir Produkte selbst anlegen?</h3><p>Ja. Produkte, Kategorien, Bilder und Dokumente werden im Panel verwaltet.</p><h3>Bleiben unsere bisherigen URLs erhalten?</h3><p>Ja. Ändern sich Adressen, erstellen wir eine Weiterleitungstabelle, damit bestehende Rankings erhalten bleiben.</p>'
              f'<p>Verwandte Seiten: <a href="{L("work")}">Projekte</a> · <a href="{L("services", "/kurumsal-web-sitesi")}">Unternehmenswebsite</a> · <a href="{L("contact")}">Kontakt</a></p>'))


def build(ek):
    out = ['-- URETILMIS DOSYA — backend/scripts/hizmetler-2026-10b.py', 'SET NAMES utf8mb4;', 'START TRANSACTION;']
    out.append('\n-- E-ticaret hizmetleri: gercek proje ekranlariyla vitrin gorseli.')
    for slug, ad in VITRIN.items():
        url = f'/uploads/services/{slug}/vitrin-1600x900.webp'
        sub = f"(SELECT `service_id` FROM `services_i18n` WHERE `locale`='tr' AND `slug`={q(slug)} LIMIT 1) x"
        out.append(f"UPDATE `services` s JOIN {sub} ON s.`id`=x.`service_id` SET s.`featured_image`={q(url)}, s.`image_url`={q(url)}, s.`image_asset_id`=NULL, s.`updated_at`=NOW(3);")
        out.append(f"UPDATE `service_images` si JOIN {sub} ON si.`service_id`=x.`service_id` SET si.`image_url`={q(url)}, si.`image_asset_id`=NULL, si.`updated_at`=NOW(3);")

    out.append('\n-- Yeni hizmet: B2B Urun Katalogu ve Teklif Talep Sistemi.')
    sid = uid('service', 'b2b-katalog')
    url = '/uploads/services/b2b-urun-katalogu-teklif-talep-sistemi/vitrin-1600x900.webp'
    out.append("INSERT INTO `services` (`id`,`type`,`featured`,`is_active`,`display_order`,`price_onetime`,`currency`,`is_purchasable`,`featured_image`,`image_url`,`image_asset_id`,`created_at`,`updated_at`) VALUES "
               f"({q(sid)},'web-ecommerce',1,1,22,NULL,'TRY',0,{q(url)},{q(url)},NULL,NOW(3),NOW(3))"
               " ON DUPLICATE KEY UPDATE `type`=VALUES(`type`),`featured`=VALUES(`featured`),`is_active`=1,`display_order`=VALUES(`display_order`),`featured_image`=VALUES(`featured_image`),`image_url`=VALUES(`image_url`),`updated_at`=NOW(3);")
    img = uid('service-image', 'b2b-katalog')
    out.append("INSERT INTO `service_images` (`id`,`service_id`,`image_asset_id`,`image_url`,`is_active`,`display_order`,`created_at`,`updated_at`) VALUES "
               f"({q(img)},{q(sid)},NULL,{q(url)},1,1,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE `image_url`=VALUES(`image_url`),`updated_at`=NOW(3);")
    for loc in ('tr', 'en', 'de'):
        d = b2b(loc)
        mt = d['meta_title'] + (ek[loc] if loc in ek else '')
        content = json.dumps({'html': d['html'], 'source': 'hizmetler-2026-10b'}, ensure_ascii=False)
        out.append("INSERT INTO `services_i18n` (`id`,`service_id`,`locale`,`slug`,`name`,`summary`,`content`,`image_alt`,`meta_title`,`meta_description`,`meta_keywords`,`created_at`,`updated_at`) VALUES "
                   f"({q(uid('service-i18n', 'b2b-katalog', loc))},{q(sid)},{q(loc)},{q(B2B_SLUG[loc])},{q(d['name'])},{q(d['summary'])},{q(content)},{q(d['alt'])},{q(mt)},{q(d['meta_description'])},{q(d['keywords'])},NOW(3),NOW(3))"
                   " ON DUPLICATE KEY UPDATE `slug`=VALUES(`slug`),`name`=VALUES(`name`),`summary`=VALUES(`summary`),`content`=VALUES(`content`),`image_alt`=VALUES(`image_alt`),`meta_title`=VALUES(`meta_title`),`meta_description`=VALUES(`meta_description`),`meta_keywords`=VALUES(`meta_keywords`),`updated_at`=NOW(3);")
        out.append("INSERT INTO `service_images_i18n` (`id`,`image_id`,`locale`,`title`,`alt`,`caption`,`created_at`,`updated_at`) VALUES "
                   f"({q(uid('service-image-i18n', 'b2b-katalog', loc))},{q(img)},{q(loc)},{q(d['name'])},{q(d['alt'])},NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE `title`=VALUES(`title`),`alt`=VALUES(`alt`),`updated_at`=NOW(3);")
    out.append('COMMIT;')
    return '\n'.join(out) + '\n'


if __name__ == '__main__':
    gwd, gzl = sys.argv[1], sys.argv[2]
    open(gwd, 'w').write(build({'tr': ' | Guezel Web Design', 'en': ' | Guezel Web Design'}))
    open(gzl, 'w').write(build({'tr': ' | GZL Teknoloji', 'en': ' | GZL Technology'}))
    print('yazildi:', gwd, gzl)
