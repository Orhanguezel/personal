"""Portfolyo 2026-10: yeni projeler (tr/en/de) + kapak normalizasyonu + rakip projelerin yayindan alinmasi.

Kaynaklar: her projenin project.portfolio.json manifesti, canli sitenin gorunur metni
ve (TeklifRota icin) GZL CRM portfoy kaydi. Sayisal iddialar yalniz bu kaynaklardan.
Cikti: iki seed dosyasi — gwd (sql/226) ve gzl (content/gzl/055); fark yalniz meta_title eki.
"""
import json, uuid, sys

NS = uuid.UUID('6f1c2a4e-2026-4a10-9c00-000000000001')

def uid(*parts):
    return str(uuid.uuid5(NS, '/'.join(parts)))

COVER = '/uploads/portfolio/{d}/kapak-1600x900.webp'

# ---------------------------------------------------------------------------
# Yeni projeler
# ---------------------------------------------------------------------------
P = []

P.append(dict(
    key='ihracatradari', dir='ihracatradari', order=200, featured=1,
    category='SaaS / Dış Ticaret', client='İhracat Radarı', url='https://ihracatradari.com.tr',
    services=['SaaS Ürün Geliştirme', 'Veri Toplama ve Zenginleştirme', 'İhracat CRM', 'Yapay Zekâ Entegrasyonu'],
    techs=['Next.js 16', 'React 19', 'TypeScript', 'Fastify 5', 'Bun', 'Drizzle ORM', 'MariaDB', 'Python', 'Tailwind CSS 4', 'Groq LLM'],
    slug='ihracat-radari-dis-ticaret-istihbarati-saas',
    i18n={
        'tr': dict(
            title='İhracat Radarı — Dış Ticaret İstihbaratı ve İhracat CRM SaaS',
            summary='Gerçek sevkiyat kayıtlarından alıcı bulma, ihracat evrakı üretimi ve alıcıyla temas süreçlerini tek panelde toplayan çok kiracılı SaaS.',
            intro='<p><strong>İhracat Radarı</strong>, Türk KOBİ ve sanayi firmalarının dış ticaret operasyonunu tek panelde toplar. HS/GTİP koduyla arama yapılır; gümrük kayıtlarından alıcı firmalar, miktarlar ve işlem geçmişi çıkarılır.</p>',
            sections=[('Gerçek veriden alıcı bulma', '<p>Gümrük beyanlarına dayanan sevkiyat kayıtları ülke, ürün ve firma bazında analiz edilir. Her aday firma, eşleşme nedeni ve kaynağıyla birlikte sunulur.</p>'),
                      ('İhracat CRM ve evrak', '<p>Firma kartı, fırsat hattı ve görev takibinin yanında proforma fatura, ticari fatura ve çeki listesi aynı sistemde üretilir.</p>'),
                      ('Yapay zekâ destekli arama planı', '<p>Ülke, sektör ve firma türü netleştirilir; kredi ve süre önizlemesi kullanıcı onayından sonra çalışır. Sonuçlar puanlanır ve onay akışından geçer.</p>')],
            features=['HS/GTİP kodu bazlı alıcı ve rakip istihbaratı', 'Gümrük kayıtlarından sevkiyat analizi', 'Proforma, ticari fatura ve çeki listesi üretimi', 'Alıcı listelerine toplu e-posta ve yanıt takibi', 'Aday firma puanlama ve onay akışı', 'Çok kiracılı yapı ve kredi tabanlı kullanım'],
            alt='İhracat Radarı ana sayfası: HS kodu ile alıcı arama',
            meta_title='İhracat Radarı — Dış Ticaret İstihbaratı SaaS',
            meta_description='HS/GTİP koduyla gerçek sevkiyat kayıtlarından alıcı bulan, ihracat evrakı üreten ve alıcı temasını yöneten çok kiracılı dış ticaret SaaS platformu.'),
        'en': dict(
            title='İhracat Radarı — Trade Intelligence and Export CRM SaaS',
            summary='A multi-tenant SaaS that finds buyers from real shipment records, generates export documents and manages buyer outreach in a single panel.',
            intro='<p><strong>İhracat Radarı</strong> brings the foreign trade operations of Turkish SMEs and manufacturers into one panel. Users search by HS code and see buyer companies, volumes and transaction history extracted from customs records.</p>',
            sections=[('Buyer discovery from real data', '<p>Customs-based shipment records are analysed by country, product and company. Every candidate comes with its source and the reason it matched.</p>'),
                      ('Export CRM and documents', '<p>Company cards, an opportunity pipeline and task tracking sit next to proforma invoices, commercial invoices and packing lists generated in the same system.</p>'),
                      ('AI-assisted search planning', '<p>Country, sector and company type are clarified first; credit and duration previews run only after user approval. Results are scored and pass through an approval flow.</p>')],
            features=['HS-code based buyer and competitor intelligence', 'Shipment analysis from customs records', 'Proforma, commercial invoice and packing list generation', 'Bulk email outreach with reply tracking', 'Candidate scoring and approval flow', 'Multi-tenant, credit-based usage'],
            alt='İhracat Radarı homepage: buyer search by HS code',
            meta_title='İhracat Radarı — Trade Intelligence SaaS',
            meta_description='Multi-tenant foreign trade SaaS that finds buyers from real shipment records by HS code, generates export documents and manages buyer outreach.'),
        'de': dict(
            title='İhracat Radarı — Außenhandels-Intelligence und Export-CRM als SaaS',
            summary='Eine mandantenfähige SaaS, die Käufer aus realen Lieferdaten findet, Exportdokumente erstellt und die Käuferansprache in einem Panel bündelt.',
            intro='<p><strong>İhracat Radarı</strong> bündelt den Außenhandel türkischer KMU und Industrieunternehmen in einem Panel. Gesucht wird per HS-Code; Käuferfirmen, Mengen und Transaktionsverläufe stammen aus Zolldaten.</p>',
            sections=[('Käufersuche auf Basis realer Daten', '<p>Lieferdaten aus Zollanmeldungen werden nach Land, Produkt und Unternehmen ausgewertet. Jeder Kandidat erscheint mit Quelle und Begründung des Treffers.</p>'),
                      ('Export-CRM und Dokumente', '<p>Firmenkarten, Opportunity-Pipeline und Aufgaben stehen neben Proforma-Rechnung, Handelsrechnung und Packliste, die im selben System erzeugt werden.</p>'),
                      ('KI-gestützte Suchplanung', '<p>Land, Branche und Firmentyp werden zuerst geschärft; Kredit- und Zeitvorschau laufen erst nach Freigabe durch den Nutzer. Ergebnisse werden bewertet und freigegeben.</p>')],
            features=['Käufer- und Wettbewerbsanalyse per HS-Code', 'Lieferanalyse aus Zolldaten', 'Proforma, Handelsrechnung und Packliste', 'Massen-E-Mails mit Antwortverfolgung', 'Kandidatenbewertung mit Freigabeprozess', 'Mandantenfähig mit Credit-Modell'],
            alt='İhracat Radarı Startseite: Käufersuche per HS-Code',
            meta_title='İhracat Radarı — Außenhandels-Intelligence SaaS',
            meta_description='Mandantenfähige Außenhandels-SaaS: findet Käufer per HS-Code aus realen Lieferdaten, erstellt Exportdokumente und steuert die Käuferansprache.'),
    }))

P.append(dict(
    key='mezar-tasi', dir='mezarisim', order=210, featured=0,
    category='Web Platformu / Katalog', client='mezarisim.com', url='https://mezarisim.com',
    services=['Frontend Geliştirme', 'Backend Geliştirme', 'Yönetim Paneli', 'SEO'],
    techs=['React', 'TypeScript', 'Vite', 'Redux Toolkit', 'React Query', 'Shadcn UI', 'Tailwind CSS', 'Fastify', 'Drizzle ORM', 'MySQL'],
    slug='mezarisim-mezar-yapimi-katalog-ve-teklif-platformu',
    i18n={
        'tr': dict(
            title='mezarisim.com — Mezar Yapımı Katalog ve Teklif Platformu',
            summary='İstanbul pazarı için mezar modelleri kataloğu, hizmet sayfaları, teklif akışı ve yönetim paneli içeren mezar yapımı ve bakım platformu.',
            intro='<p><strong>mezarisim.com</strong>, mezar yapımı ve mezar bakımı hizmeti veren bir işletme için geliştirilen katalog ve teklif platformudur. Ziyaretçi modeli seçer, hizmeti inceler ve doğrudan teklif ister.</p>',
            sections=[('Model ve hizmet kataloğu', '<p>Tek ve iki kişilik mermer ve granit modeller, baş taşı modelleri ve mezar aksesuarları kategorilere ayrılmış bir katalogda sunulur.</p>'),
                      ('Teklif ve iletişim akışı', '<p>Ürün aramasından teklif formuna kadar her adım ziyaretçiyi işletmeyle buluşturacak şekilde kurgulandı; hızlı arama ve telefon bağlantıları her sayfada görünür.</p>'),
                      ('Yönetim paneli', '<p>Modeller, kategoriler, görseller ve sayfa içerikleri yönetim panelinden güncellenir; medya Cloudinary üzerinden servis edilir.</p>')],
            features=['Model ve hizmet kataloğu', 'Ürün arama', 'Teklif ve iletişim akışları', 'Yönetim paneli', 'Cloudinary medya yönetimi', 'E-posta bildirimleri ve SEO uyumu'],
            alt='mezarisim.com ana sayfası: mezar modelleri ve kategori menüsü',
            meta_title='mezarisim.com — Mezar Yapımı Katalog ve Teklif Platformu',
            meta_description='Mezar modelleri kataloğu, hizmet sayfaları, teklif akışı ve yönetim paneli ile geliştirilen mezar yapımı ve bakım platformu: React, Fastify, MySQL.'),
        'en': dict(
            title='mezarisim.com — Memorial Construction Catalog and Quote Platform',
            summary='A memorial construction and grave care platform for the Istanbul market with a model catalog, service pages, quote flows and an admin panel.',
            intro='<p><strong>mezarisim.com</strong> is a catalog and quote platform built for a business offering memorial construction and grave care. Visitors choose a model, review the service and request a quote directly.</p>',
            sections=[('Model and service catalog', '<p>Single and double marble and granite models, headstone designs and accessories are organised into a categorised catalog.</p>'),
                      ('Quote and contact flow', '<p>Every step from product search to the quote form is designed to connect the visitor with the business; quick search and call links are visible on every page.</p>'),
                      ('Admin panel', '<p>Models, categories, images and page content are managed from the admin panel; media is served through Cloudinary.</p>')],
            features=['Model and service catalog', 'Product search', 'Quote and contact flows', 'Admin panel', 'Cloudinary media management', 'Email notifications and SEO'],
            alt='mezarisim.com homepage with memorial models and category menu',
            meta_title='mezarisim.com — Memorial Catalog and Quote Platform',
            meta_description='Memorial construction and grave care platform with a model catalog, service pages, quote flow and admin panel, built with React, Fastify and MySQL.'),
        'de': dict(
            title='mezarisim.com — Katalog- und Angebotsplattform für Grabgestaltung',
            summary='Eine Plattform für Grabbau und Grabpflege im Istanbuler Markt mit Modellkatalog, Leistungsseiten, Angebotsprozess und Verwaltungsbereich.',
            intro='<p><strong>mezarisim.com</strong> ist eine Katalog- und Angebotsplattform für ein Unternehmen, das Grabanlagen errichtet und pflegt. Besucher wählen ein Modell, prüfen die Leistung und fordern direkt ein Angebot an.</p>',
            sections=[('Modell- und Leistungskatalog', '<p>Ein- und Zweipersonen-Modelle aus Marmor und Granit, Grabsteine und Zubehör sind in einem kategorisierten Katalog geordnet.</p>'),
                      ('Angebots- und Kontaktprozess', '<p>Von der Produktsuche bis zum Angebotsformular führt jeder Schritt zum Unternehmen; Schnellsuche und Anruf-Links sind auf jeder Seite sichtbar.</p>'),
                      ('Verwaltungsbereich', '<p>Modelle, Kategorien, Bilder und Seiteninhalte werden im Admin-Panel gepflegt; Medien laufen über Cloudinary.</p>')],
            features=['Modell- und Leistungskatalog', 'Produktsuche', 'Angebots- und Kontaktprozesse', 'Admin-Panel', 'Medienverwaltung mit Cloudinary', 'E-Mail-Benachrichtigungen und SEO'],
            alt='mezarisim.com Startseite mit Grabmodellen und Kategoriemenü',
            meta_title='mezarisim.com — Katalog- und Angebotsplattform',
            meta_description='Plattform für Grabbau und Grabpflege mit Modellkatalog, Leistungsseiten, Angebotsprozess und Admin-Panel, umgesetzt mit React, Fastify und MySQL.'),
    }))

P.append(dict(
    key='bayramozukoyu', dir='bayramozukoyu', order=220, featured=0,
    category='Web Platformu / Dijital Arşiv', client='Bayramözü Köyü', url='https://bayramozukoyu.com',
    services=['Frontend Geliştirme', 'Backend Geliştirme', 'UI/UX Tasarım', 'Arşiv ve İçerik Araştırması', 'SEO'],
    techs=['Next.js 16', 'React 19', 'TypeScript', 'Fastify', 'Drizzle ORM', 'MySQL', 'Bun', 'Nginx'],
    slug='bayramozu-koyu-dijital-arsiv-ve-koy-platformu',
    i18n={
        'tr': dict(
            title='Bayramözü Köyü — Kaynaklı Köy Tarihi ve Dijital Arşiv Platformu',
            summary='Kaman/Kırşehir\'e bağlı Bayramözü köyünün tarihini, arşiv belgelerini, haberlerini ve şehir dışındaki köylüleri tek dijital çatıda buluşturan platform.',
            intro='<p><strong>Bayramözü Köyü</strong> platformu, eski adı Merdeşe olan köyün hafızasını birincil kaynaklara dayanarak dijital ortama taşır. Defterler, belgeler ve anlatılar kaynak künyeleriyle bir araya gelir.</p>',
            sections=[('Kaynaklı köy tarihi', '<p>Köy tarihi birincil ve akademik kaynaklara dayalı, künyeli metinlerle anlatılır. Osmanlı nüfus defterlerinden çıkarılan hane kayıtları çözümlenerek sunulur.</p>'),
                      ('Arşiv ve soy kütüğü', '<p>Nüfus defteri arşivi, hane çözümlemeleri ve sülale ağacı birbirine bağlıdır; fotoğraf ve belge galerisi aynı yapıdan beslenir.</p>'),
                      ('Köy haberleri ve iletişim', '<p>Haberler, duyurular ve şehir dışında yaşayan köylüler için bir iletişim ve dayanışma alanı sunulur. Okunabilirlik için yazı boyutu ayarı vardır.</p>')],
            features=['Kaynak künyeli köy tarihi', 'Osmanlı nüfus defteri arşivi ve hane çözümlemeleri', 'Soy kütüğü ve sülale ağacı', 'Köy haberleri ve duyurular', 'Fotoğraf ve belge galerisi', 'Erişilebilir yazı boyutu seçenekleri'],
            alt='Bayramözü Köyü ana sayfası: köyün hafızası, kaynaklarıyla',
            meta_title='Bayramözü Köyü — Köy Tarihi ve Dijital Arşiv Platformu',
            meta_description='Bayramözü (Merdeşe) köyünün kaynaklı tarihi, Osmanlı nüfus defteri arşivi, soy kütüğü ve köy haberlerini bir araya getiren dijital platform.'),
        'en': dict(
            title='Bayramözü Village — Source-Based Village History and Digital Archive',
            summary='A platform that brings together the history, archive documents and news of Bayramözü village in Kaman/Kırşehir, and connects villagers living elsewhere.',
            intro='<p>The <strong>Bayramözü Village</strong> platform carries the memory of the village, formerly known as Merdeşe, into a digital space based on primary sources. Registers, documents and oral accounts are brought together with full citations.</p>',
            sections=[('Source-based village history', '<p>The history of the village is told through cited texts based on primary and academic sources. Household records extracted from Ottoman population registers are analysed and presented.</p>'),
                      ('Archive and family tree', '<p>The population register archive, household analyses and family tree are linked to each other; the photo and document gallery is built on the same structure.</p>'),
                      ('Village news and community', '<p>News, announcements and a space for villagers living in cities are provided. Adjustable text size supports readability.</p>')],
            features=['Village history with full citations', 'Ottoman population register archive and household analyses', 'Family tree and lineage records', 'Village news and announcements', 'Photo and document gallery', 'Accessible text size options'],
            alt='Bayramözü Village homepage: the village memory, with its sources',
            meta_title='Bayramözü Village — Village History and Digital Archive',
            meta_description='Digital platform combining the cited history of Bayramözü (Merdeşe) village, an Ottoman population register archive, family trees and village news.'),
        'de': dict(
            title='Dorf Bayramözü — Quellenbasierte Dorfgeschichte und digitales Archiv',
            summary='Eine Plattform, die Geschichte, Archivdokumente und Nachrichten des Dorfes Bayramözü (Kaman/Kırşehir) bündelt und auswärts lebende Dorfbewohner verbindet.',
            intro='<p>Die Plattform <strong>Dorf Bayramözü</strong> überträgt das Gedächtnis des früher Merdeşe genannten Dorfes auf Grundlage von Primärquellen in den digitalen Raum. Register, Dokumente und Erzählungen erscheinen mit vollständigen Quellenangaben.</p>',
            sections=[('Quellenbasierte Dorfgeschichte', '<p>Die Dorfgeschichte wird in belegten Texten auf Basis von Primär- und Fachquellen erzählt. Haushaltseinträge aus osmanischen Bevölkerungsregistern werden ausgewertet und dargestellt.</p>'),
                      ('Archiv und Stammbaum', '<p>Registerarchiv, Haushaltsanalysen und Stammbaum sind miteinander verknüpft; die Foto- und Dokumentengalerie nutzt dieselbe Struktur.</p>'),
                      ('Dorfnachrichten und Gemeinschaft', '<p>Nachrichten, Mitteilungen und ein Austauschbereich für auswärts lebende Dorfbewohner. Eine anpassbare Schriftgröße unterstützt die Lesbarkeit.</p>')],
            features=['Dorfgeschichte mit Quellenangaben', 'Osmanisches Bevölkerungsregister und Haushaltsanalysen', 'Stammbaum und Familienlinien', 'Dorfnachrichten und Mitteilungen', 'Foto- und Dokumentengalerie', 'Barrierearme Schriftgrößen'],
            alt='Startseite Dorf Bayramözü: das Gedächtnis des Dorfes, mit Quellen',
            meta_title='Dorf Bayramözü — Dorfgeschichte und digitales Archiv',
            meta_description='Digitale Plattform mit belegter Geschichte des Dorfes Bayramözü (Merdeşe), osmanischem Registerarchiv, Stammbäumen und Dorfnachrichten.'),
    }))

P.append(dict(
    key='sportoflow', dir='sportoflow', order=230, featured=1,
    category='SaaS / Sağlık ve Spor', client='SportoFlow', url='https://sportoflow.com',
    services=['SaaS Platform Geliştirme', 'Backend Geliştirme', 'Panel Geliştirme', 'Yapay Zekâ Koçluk', 'Mimari ve Sistem Tasarımı'],
    techs=['Next.js 16', 'React 19', 'TypeScript', 'Shadcn UI', 'React Query', 'Bun', 'Fastify', 'Drizzle ORM', 'MySQL', 'Zod', 'Stripe'],
    slug='sportoflow-yapay-zeka-destekli-longevity-platformu',
    i18n={
        'tr': dict(
            title='SportoFlow — Yapay Zekâ Destekli Kişisel Longevity Platformu',
            summary='Egzersiz, beslenme, uyku, takviye ve biyobelirteç takibini insan onaylı bir bilgi motoru ve yapay zekâ koçla birleştiren çok kiracılı SaaS.',
            intro='<p><strong>SportoFlow</strong>, uzun ve sağlıklı yaşam için kişisel bir işletim sistemi olarak tasarlandı. Bilimsel bilgiyi, ölçümleri ve günlük alışkanlıkları bir araya getirir; öneriler insan onayından geçer.</p>',
            sections=[('İnsan onaylı bilgi motoru', '<p>Longevity alanındaki yayınlar toplanır, iddialar kanıt düzeyiyle çıkarılır ve editör onayından sonra kişisel protokole yansır.</p>'),
                      ('Deterministik antrenman motoru', '<p>Koşu, bisiklet, yüzme, triatlon ve kuvvet programları kurallarla üretilir; hacim artışı, yük oranı ve dinlenme haftası denetlenir. Yapay zekâ yalnız açıklar ve ince ayar yapar.</p>'),
                      ('Biyobelirteç ve ölçüm takibi', '<p>Kan paneli değerleri normal ve optimal aralıklarla izlenir; yapılan ve kaçırılan antrenmanlar sonraki haftanın planını yeniden hesaplar.</p>')],
            features=['Çok kiracılı SaaS çekirdeği ve abonelik', 'İnsan onaylı longevity bilgi motoru', 'Branşa özel antrenman programları', 'Biyobelirteç ve kan paneli takibi', 'Uyarlanabilir haftalık plan', 'Giyilebilir cihaz entegrasyonu için adaptör yapısı'],
            alt='SportoFlow ana sayfası: sağlıklı yaşamınız yapay zekâ ile güçlensin',
            meta_title='SportoFlow — Yapay Zekâ Destekli Longevity Platformu',
            meta_description='Egzersiz, beslenme, uyku ve biyobelirteç takibini insan onaylı bilgi motoru ve yapay zekâ koçla birleştiren çok kiracılı longevity SaaS platformu.'),
        'en': dict(
            title='SportoFlow — AI-Assisted Personal Longevity Platform',
            summary='A multi-tenant SaaS combining exercise, nutrition, sleep, supplement and biomarker tracking with a human-approved knowledge engine and an AI coach.',
            intro='<p><strong>SportoFlow</strong> is designed as a personal operating system for a long and healthy life. It brings scientific knowledge, measurements and daily habits together; recommendations pass human review.</p>',
            sections=[('Human-approved knowledge engine', '<p>Longevity publications are collected, claims are extracted with their level of evidence and reach the personal protocol only after editorial approval.</p>'),
                      ('Deterministic training engine', '<p>Running, cycling, swimming, triathlon and strength programmes are generated by rules; volume ramps, load ratios and deload weeks are checked. AI only explains and fine-tunes.</p>'),
                      ('Biomarker and measurement tracking', '<p>Blood panel values are tracked against normal and optimal ranges; completed and missed workouts recalculate the following week.</p>')],
            features=['Multi-tenant SaaS core with subscriptions', 'Human-approved longevity knowledge engine', 'Sport-specific training programmes', 'Biomarker and blood panel tracking', 'Adaptive weekly plan', 'Adapter-based wearable integration'],
            alt='SportoFlow homepage: empower your healthy life with AI',
            meta_title='SportoFlow — AI-Assisted Longevity Platform',
            meta_description='Multi-tenant longevity SaaS combining exercise, nutrition, sleep and biomarker tracking with a human-approved knowledge engine and an AI coach.'),
        'de': dict(
            title='SportoFlow — KI-gestützte persönliche Longevity-Plattform',
            summary='Eine mandantenfähige SaaS, die Training, Ernährung, Schlaf, Supplements und Biomarker mit einer menschlich geprüften Wissensbasis und einem KI-Coach verbindet.',
            intro='<p><strong>SportoFlow</strong> ist als persönliches Betriebssystem für ein langes, gesundes Leben konzipiert. Es verbindet wissenschaftliches Wissen, Messwerte und Alltagsgewohnheiten; Empfehlungen werden menschlich geprüft.</p>',
            sections=[('Menschlich geprüfte Wissensbasis', '<p>Veröffentlichungen aus der Longevity-Forschung werden gesammelt, Aussagen mit Evidenzgrad extrahiert und erst nach redaktioneller Freigabe ins persönliche Protokoll übernommen.</p>'),
                      ('Deterministischer Trainingsplaner', '<p>Lauf-, Rad-, Schwimm-, Triathlon- und Kraftprogramme entstehen regelbasiert; Umfangssteigerung, Belastungsverhältnis und Entlastungswochen werden geprüft. Die KI erklärt und justiert nur.</p>'),
                      ('Biomarker und Messwerte', '<p>Blutwerte werden gegen Normal- und Optimalbereiche verfolgt; absolvierte und ausgelassene Einheiten berechnen die Folgewoche neu.</p>')],
            features=['Mandantenfähiger SaaS-Kern mit Abonnements', 'Menschlich geprüfte Longevity-Wissensbasis', 'Sportartspezifische Trainingspläne', 'Biomarker- und Blutwerttracking', 'Adaptiver Wochenplan', 'Adapter-Architektur für Wearables'],
            alt='SportoFlow Startseite: gesünder leben mit KI',
            meta_title='SportoFlow — KI-gestützte Longevity-Plattform',
            meta_description='Mandantenfähige Longevity-SaaS: Training, Ernährung, Schlaf und Biomarker mit menschlich geprüfter Wissensbasis und KI-Coach verbunden.'),
    }))

P.append(dict(
    key='ensotek-com-tr', dir='ensotek-com-tr', order=240, featured=0,
    category='B2B Web Platformu / Endüstri', client='Ensotek', url='https://www.ensotek.com.tr',
    services=['Frontend Geliştirme', 'Backend Geliştirme', 'Mimari ve Optimizasyon', 'DevOps ve Yayın'],
    techs=['Next.js', 'React', 'TypeScript', 'Fastify', 'Drizzle ORM', 'MySQL', 'Bun', 'Zod', 'next-intl', 'Tailwind CSS', 'React Query', 'Redux Toolkit'],
    slug='ensotek-com-tr-sogutma-kulesi-b2b-platformu',
    i18n={
        'tr': dict(
            title='Ensotek Türkiye — Endüstriyel Soğutma Kulesi B2B Platformu',
            summary='Türkiye pazarı için ürün kataloğu, doküman kütüphanesi ve çok dilli içerik yönetimi sunan endüstriyel soğutma kulesi B2B platformu.',
            intro='<p><strong>ensotek.com.tr</strong>, açık devre, kapalı devre ve evaporatif soğutma sistemleri üreten Ensotek\'in Türkiye pazarına yönelik B2B platformudur. Ürün grupları, teknik dokümanlar ve teklif akışı tek yerde toplanır.</p>',
            sections=[('Ürün grupları ve katalog', '<p>Kapalı ve açık devre soğutma kuleleri ile yedek parçalar ürün gruplarına ayrılmış bir katalogda sunulur; katalog ve teklif çağrıları her sayfada erişilebilir.</p>'),
                      ('Doküman kütüphanesi', '<p>Teknik dokümanlar ve kataloglar yönetim panelinden yüklenir ve ürünlerle ilişkilendirilir.</p>'),
                      ('Ortak altyapı', '<p>Platform, Ensotek\'in diğer siteleriyle ortak backend paketlerini paylaşır; içerik çok dillidir ve tamamı yönetim panelinden yönetilir.</p>')],
            features=['Yönetim paneli', 'Ürün ve katalog yönetimi', 'Doküman kütüphanesi', 'Çok dilli içerik', 'Teklif talebi akışı', 'Ortak backend paketleri'],
            alt='Ensotek Türkiye ana sayfası: endüstriyel soğutma sistemleri',
            meta_title='Ensotek Türkiye — Soğutma Kulesi B2B Platformu',
            meta_description='Ensotek için geliştirilen Türkiye B2B platformu: soğutma kulesi ürün kataloğu, doküman kütüphanesi, teklif akışı ve çok dilli içerik yönetimi.'),
        'en': dict(
            title='Ensotek Turkey — Industrial Cooling Tower B2B Platform',
            summary='An industrial cooling tower B2B platform for the Turkish market with a product catalog, document library and multilingual content management.',
            intro='<p><strong>ensotek.com.tr</strong> is the B2B platform for the Turkish market of Ensotek, a manufacturer of open circuit, closed circuit and evaporative cooling systems. Product groups, technical documents and the quote flow live in one place.</p>',
            sections=[('Product groups and catalog', '<p>Closed and open circuit cooling towers and spare parts are presented in a catalog organised by product group; catalog and quote calls to action are available on every page.</p>'),
                      ('Document library', '<p>Technical documents and catalogs are uploaded from the admin panel and linked to products.</p>'),
                      ('Shared foundation', '<p>The platform shares backend packages with Ensotek\'s other sites; content is multilingual and fully managed from the admin panel.</p>')],
            features=['Admin panel', 'Product and catalog management', 'Document library', 'Multilingual content', 'Quote request flow', 'Shared backend packages'],
            alt='Ensotek Turkey homepage: industrial cooling systems',
            meta_title='Ensotek Turkey — Cooling Tower B2B Platform',
            meta_description='Turkish B2B platform built for Ensotek: cooling tower product catalog, document library, quote flow and multilingual content management.'),
        'de': dict(
            title='Ensotek Türkei — B2B-Plattform für industrielle Kühltürme',
            summary='Eine B2B-Plattform für industrielle Kühltürme im türkischen Markt mit Produktkatalog, Dokumentenbibliothek und mehrsprachiger Inhaltsverwaltung.',
            intro='<p><strong>ensotek.com.tr</strong> ist die B2B-Plattform von Ensotek für den türkischen Markt — einem Hersteller offener, geschlossener und evaporativer Kühlsysteme. Produktgruppen, technische Dokumente und der Angebotsprozess sind an einem Ort gebündelt.</p>',
            sections=[('Produktgruppen und Katalog', '<p>Offene und geschlossene Kühltürme sowie Ersatzteile erscheinen in einem nach Produktgruppen gegliederten Katalog; Katalog- und Angebotsaufrufe sind auf jeder Seite erreichbar.</p>'),
                      ('Dokumentenbibliothek', '<p>Technische Unterlagen und Kataloge werden im Admin-Panel hochgeladen und mit Produkten verknüpft.</p>'),
                      ('Gemeinsame Basis', '<p>Die Plattform teilt Backend-Pakete mit den übrigen Ensotek-Sites; Inhalte sind mehrsprachig und vollständig im Admin-Panel pflegbar.</p>')],
            features=['Admin-Panel', 'Produkt- und Katalogverwaltung', 'Dokumentenbibliothek', 'Mehrsprachige Inhalte', 'Angebotsanfragen', 'Gemeinsame Backend-Pakete'],
            alt='Ensotek Türkei Startseite: industrielle Kühlsysteme',
            meta_title='Ensotek Türkei — B2B-Plattform für Kühltürme',
            meta_description='Türkische B2B-Plattform für Ensotek: Kühlturm-Produktkatalog, Dokumentenbibliothek, Angebotsprozess und mehrsprachige Inhaltsverwaltung.'),
    }))

P.append(dict(
    key='kuhlturm', dir='kuhlturm', order=250, featured=0,
    category='B2B Web Platformu / Endüstri', client='Kühlturm (Ensotek)', url='https://kuhlturm.com',
    services=['Frontend Geliştirme', 'Backend Geliştirme', 'Mimari ve Optimizasyon', 'DevOps ve Yayın'],
    techs=['Next.js', 'React', 'TypeScript', 'Fastify', 'Drizzle ORM', 'MySQL', 'Bun', 'Zod', 'next-intl', 'Tailwind CSS'],
    slug='kuhlturm-sogutma-kulesi-b2b-platformu',
    i18n={
        'tr': dict(
            title='Kühlturm — Almanca ve İngilizce Soğutma Kulesi B2B Platformu',
            summary='Ensotek alt markası Kühlturm için bağımsız API, yönetim paneli ve veri alanına sahip Almanca/İngilizce B2B soğutma kulesi platformu.',
            intro='<p><strong>Kühlturm</strong>, Ensotek\'in Almanca konuşulan pazarlara yönelik alt markasıdır. Platform; elektrik santralleri, sanayi tesisleri ve ticari binalar için soğutma kulesi çözümlerini katalog ve teklif akışıyla sunar.</p>',
            sections=[('Bağımsız marka altyapısı', '<p>Kühlturm, Ensotek ile kod tabanını paylaşırken kendi API\'sine, yönetim paneline ve veritabanına sahiptir; markalar birbirinin verisini görmez.</p>'),
                      ('Katalog ve teklif', '<p>Ürünler, referanslar ve teknik kütüphane Almanca ve İngilizce sunulur; katalog talebi ve teklif formu her sayfada görünür.</p>'),
                      ('API dokümantasyonu', '<p>Arka uç Swagger ile belgelenmiştir; içerik ve müşteri dokümanları yönetim panelinden yönetilir.</p>')],
            features=['Almanca/İngilizce içerik', 'Bağımsız API ve veritabanı', 'Yönetim paneli', 'Katalog ve teklif talebi', 'Müşteri doküman yönetimi', 'Swagger API dokümantasyonu'],
            alt='Kühlturm ana sayfası: endüstriyel soğutma kulesi çözümleri',
            meta_title='Kühlturm — Soğutma Kulesi B2B Platformu',
            meta_description='Ensotek alt markası Kühlturm için Almanca ve İngilizce B2B soğutma kulesi platformu: bağımsız API, yönetim paneli, katalog ve teklif akışı.'),
        'en': dict(
            title='Kühlturm — German and English Cooling Tower B2B Platform',
            summary='A German/English B2B cooling tower platform for the Ensotek sub-brand Kühlturm, with its own API, admin panel and data store.',
            intro='<p><strong>Kühlturm</strong> is Ensotek\'s sub-brand for German-speaking markets. The platform presents cooling tower solutions for power plants, industrial facilities and commercial buildings with a catalog and quote flow.</p>',
            sections=[('Independent brand foundation', '<p>Kühlturm shares its codebase with Ensotek but has its own API, admin panel and database; the brands never see each other\'s data.</p>'),
                      ('Catalog and quote', '<p>Products, references and the technical library are available in German and English; catalog requests and the quote form are visible on every page.</p>'),
                      ('API documentation', '<p>The backend is documented with Swagger; content and customer documents are managed from the admin panel.</p>')],
            features=['German/English content', 'Independent API and database', 'Admin panel', 'Catalog and quote requests', 'Customer document management', 'Swagger API documentation'],
            alt='Kühlturm homepage: industrial cooling tower solutions',
            meta_title='Kühlturm — Cooling Tower B2B Platform',
            meta_description='German and English B2B cooling tower platform for the Ensotek sub-brand Kühlturm: independent API, admin panel, catalog and quote flow.'),
        'de': dict(
            title='Kühlturm — B2B-Plattform für Kühltürme auf Deutsch und Englisch',
            summary='Eine deutsch-englische B2B-Plattform für Kühltürme der Ensotek-Tochtermarke Kühlturm mit eigener API, eigenem Admin-Panel und eigenem Datenbestand.',
            intro='<p><strong>Kühlturm</strong> ist die Ensotek-Marke für den deutschsprachigen Raum. Die Plattform präsentiert Kühlturmlösungen für Kraftwerke, Industrieanlagen und Gewerbegebäude mit Katalog und Angebotsprozess.</p>',
            sections=[('Eigenständige Markenbasis', '<p>Kühlturm teilt die Codebasis mit Ensotek, verfügt aber über eigene API, eigenes Admin-Panel und eigene Datenbank; die Marken sehen die Daten der jeweils anderen nicht.</p>'),
                      ('Katalog und Angebot', '<p>Produkte, Referenzen und die technische Bibliothek liegen auf Deutsch und Englisch vor; Katalogwunsch und Angebotsformular sind auf jeder Seite sichtbar.</p>'),
                      ('API-Dokumentation', '<p>Das Backend ist mit Swagger dokumentiert; Inhalte und Kundendokumente werden im Admin-Panel verwaltet.</p>')],
            features=['Inhalte auf Deutsch und Englisch', 'Eigenständige API und Datenbank', 'Admin-Panel', 'Katalog- und Angebotsanfragen', 'Verwaltung von Kundendokumenten', 'Swagger-API-Dokumentation'],
            alt='Kühlturm Startseite: industrielle Kühlturmlösungen',
            meta_title='Kühlturm — B2B-Plattform für Kühltürme',
            meta_description='Deutsch-englische B2B-Plattform für die Ensotek-Marke Kühlturm: eigenständige API, Admin-Panel, Katalog und Angebotsprozess.'),
    }))

P.append(dict(
    key='teklifrota', dir='teklifrota', order=260, featured=0,
    category='SaaS / İhracat ve Lojistik', client='TeklifRota', url='https://teklifrota.com',
    services=['SaaS Ürün Geliştirme', 'İş Akışı Tasarımı', 'Belge Üretimi', 'DevOps ve Yayın'],
    techs=['Next.js', 'React', 'TypeScript', 'Fastify', 'MySQL', 'Drizzle ORM', 'Docker', 'Nginx'],
    slug='teklifrota-ihracat-teklif-ve-lojistik-saas',
    i18n={
        'tr': dict(
            title='TeklifRota — İhracat Teklifi ve Lojistik SaaS',
            summary='İhracat tekliflerini, revizyonları, proforma ve çeki listesini, navlun, onay ve sevkiyat süreçlerini tek denetlenebilir akışta yöneten çok kiracılı B2B platform.',
            intro='<p><strong>TeklifRota</strong>, ihracat ekiplerinin alıcıdan sevkiyata kadar tüm süreci tek rotada yürütmesi için geliştirildi. Tekliflerin ve lojistik belgelerinin elektronik tablolar ile kopuk dosyalarda hazırlanmasından doğan tutarsızlıkları ortadan kaldırır.</p>',
            sections=[('Adımlı teklif hazırlama', '<p>Müşteri ve ürün kayıtlarından teklif üretilir; döviz ve teslim şekilleri, revizyon geçmişi ve onay adımları aynı kayıtta tutulur.</p>'),
                      ('Belge üretimi', '<p>Proforma fatura ve çeki listesi tekliften türetilir; aynı müşteri ve ürün bilgisi her aşamada korunur.</p>'),
                      ('Navlun ve sevkiyat', '<p>Navlun teklifleri kanıtlanır, sevkiyat açılır ve operasyon takibi teslimata kadar tek ekrandan izlenir.</p>')],
            features=['Çok kiracılı B2B SaaS', 'Adımlı teklif iş akışı', 'Revizyon geçmişi ve onay', 'Proforma ve çeki listesi üretimi', 'Navlun karşılaştırma ve sevkiyat takibi', 'Gümrük kaydı tabanlı alıcı araması'],
            alt='TeklifRota ana sayfası: ihracatta alıcıdan sevkiyata tek rota',
            meta_title='TeklifRota — İhracat Teklifi ve Lojistik SaaS',
            meta_description='İhracat teklifleri, revizyonlar, proforma, çeki listesi, navlun ve sevkiyat süreçlerini tek denetlenebilir akışta yöneten çok kiracılı B2B SaaS.'),
        'en': dict(
            title='TeklifRota — Export Quotation and Logistics SaaS',
            summary='A multi-tenant B2B platform managing export quotes, revisions, proforma invoices, packing lists, freight, approvals and shipments in one auditable flow.',
            intro='<p><strong>TeklifRota</strong> lets export teams run the whole process from buyer to shipment on one route. It removes the inconsistencies caused by preparing quotes and logistics documents in spreadsheets and scattered files.</p>',
            sections=[('Step-by-step quoting', '<p>Quotes are generated from customer and product records; currencies, Incoterms, revision history and approval steps stay on the same record.</p>'),
                      ('Document generation', '<p>Proforma invoices and packing lists are derived from the quote; the same customer and product data is preserved at every stage.</p>'),
                      ('Freight and shipment', '<p>Freight quotes are documented, shipments are opened and operations are tracked from a single screen until delivery.</p>')],
            features=['Multi-tenant B2B SaaS', 'Step-by-step quote workflow', 'Revision history and approvals', 'Proforma and packing list generation', 'Freight comparison and shipment tracking', 'Buyer search based on customs records'],
            alt='TeklifRota homepage: one route from buyer to shipment',
            meta_title='TeklifRota — Export Quotation and Logistics SaaS',
            meta_description='Multi-tenant B2B SaaS managing export quotes, revisions, proforma invoices, packing lists, freight and shipments in one auditable workflow.'),
        'de': dict(
            title='TeklifRota — SaaS für Exportangebote und Logistik',
            summary='Eine mandantenfähige B2B-Plattform für Exportangebote, Revisionen, Proforma-Rechnungen, Packlisten, Fracht, Freigaben und Versand in einem nachvollziehbaren Ablauf.',
            intro='<p><strong>TeklifRota</strong> ermöglicht Exportteams, den gesamten Prozess vom Käufer bis zum Versand auf einer Route abzuwickeln. Die Plattform beseitigt Inkonsistenzen aus Tabellen und verstreuten Dateien.</p>',
            sections=[('Angebotserstellung in Schritten', '<p>Angebote entstehen aus Kunden- und Produktdaten; Währungen, Incoterms, Revisionsverlauf und Freigaben bleiben am selben Datensatz.</p>'),
                      ('Dokumentenerstellung', '<p>Proforma-Rechnung und Packliste werden aus dem Angebot abgeleitet; Kunden- und Produktdaten bleiben in jeder Phase konsistent.</p>'),
                      ('Fracht und Versand', '<p>Frachtangebote werden belegt, Sendungen eröffnet und bis zur Zustellung auf einem Bildschirm verfolgt.</p>')],
            features=['Mandantenfähige B2B-SaaS', 'Schrittweiser Angebotsprozess', 'Revisionsverlauf und Freigaben', 'Proforma- und Packlistenerstellung', 'Frachtvergleich und Sendungsverfolgung', 'Käufersuche auf Basis von Zolldaten'],
            alt='TeklifRota Startseite: eine Route vom Käufer bis zum Versand',
            meta_title='TeklifRota — SaaS für Exportangebote und Logistik',
            meta_description='Mandantenfähige B2B-SaaS für Exportangebote, Revisionen, Proforma, Packlisten, Fracht und Versand in einem nachvollziehbaren Ablauf.'),
    }))

P.append(dict(
    key='auroraglobal', dir='auroraglobal', order=270, featured=0,
    category='B2B Web Sitesi / Endüstriyel Tedarik', client='Aurora Global Ltd', url='https://www.auroraglobal.uk',
    services=['B2B Web Sitesi Tasarım ve Geliştirme', 'Çok Dilli İçerik Altyapısı', 'Ürün Kataloğu ve Teklif Akışı', 'Teknik SEO ve GEO', 'Sunucu Kurulumu ve Bakım'],
    techs=['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Fastify', 'Bun', 'Drizzle ORM', 'MySQL', 'Nginx', 'PM2'],
    slug='aurora-global-b2b-rulman-katalogu-ve-teklif-sitesi',
    i18n={
        'tr': dict(
            title='Aurora Global — B2B Rulman Kataloğu ve Teklif Sitesi',
            summary='Birleşik Krallık merkezli otomotiv ve endüstriyel yedek parça tedarikçisi için teknik rulman kataloğu ve teklif talebi akışına sahip çok dilli B2B web sitesi.',
            intro='<p><strong>Aurora Global</strong>, Avrupa sanayisine teknik olarak doğrulanmış rulman tedarik eden Birleşik Krallık merkezli bir firmadır. Site, rulman öncelikli konumlandırmayı teknik katalog ve teklif talebi akışıyla destekler.</p>',
            sections=[('Teknik rulman kataloğu', '<p>461 kayıtlı teknik rulman kataloğu marka ve teknik özelliklerle aranabilir; her ürün teklif talebine bağlanır.</p>'),
                      ('Teklif talebi (RFQ)', '<p>Teklif formu ve talepler yönetim panelinden takip edilir; içeriğin tamamı veritabanından yönetilir.</p>'),
                      ('Çok dilli yapı ve görünürlük', '<p>İngilizce ve Türkçe içerik yerelleştirilmiş URL yapısıyla sunulur; SSS yapısal verisi, llms.txt ve site haritası arama motorları ve yapay zekâ aramaları için hazırdır.</p>')],
            features=['461 kayıtlı teknik rulman kataloğu', 'Teklif talebi (RFQ) formu ve yönetimi', 'İngilizce/Türkçe yerelleştirilmiş URL yapısı', 'Veritabanından yönetilen içerik', 'SSS ve FAQPage yapısal verisi', 'llms.txt ve site haritası'],
            alt='Aurora Global ana sayfası: Avrupa sanayisi için hassas rulman tedariki',
            meta_title='Aurora Global — B2B Rulman Kataloğu ve Teklif Sitesi',
            meta_description='Birleşik Krallık merkezli yedek parça tedarikçisi için 461 kayıtlı teknik rulman kataloğu ve teklif talebi akışına sahip çok dilli B2B web sitesi.'),
        'en': dict(
            title='Aurora Global — B2B Bearing Catalog and Quote Website',
            summary='A multilingual B2B website with a technical bearing catalog and a request-for-quote flow for a UK-based automotive and industrial spare parts supplier.',
            intro='<p><strong>Aurora Global</strong> is a UK-based supplier of technically verified bearings for European industry. The website supports its bearing-first positioning with a technical catalog and a request-for-quote flow.</p>',
            sections=[('Technical bearing catalog', '<p>A technical catalog of 461 bearings is searchable by brand and specification; every product links to a quote request.</p>'),
                      ('Request for quote (RFQ)', '<p>The quote form and incoming requests are tracked in the admin panel; all content is managed from the database.</p>'),
                      ('Multilingual structure and visibility', '<p>English and Turkish content uses localised URLs; FAQ structured data, llms.txt and the sitemap prepare the site for search engines and AI search.</p>')],
            features=['Technical catalog of 461 bearings', 'RFQ form and request management', 'Localised English/Turkish URLs', 'Database-managed content', 'FAQ and FAQPage structured data', 'llms.txt and sitemap'],
            alt='Aurora Global homepage: precision bearing supply for European industry',
            meta_title='Aurora Global — B2B Bearing Catalog and Quote Website',
            meta_description='Multilingual B2B website for a UK-based spare parts supplier, with a technical catalog of 461 bearings and a request-for-quote flow.'),
        'de': dict(
            title='Aurora Global — B2B-Wälzlagerkatalog und Angebotswebsite',
            summary='Eine mehrsprachige B2B-Website mit technischem Wälzlagerkatalog und Angebotsanfrage für einen britischen Lieferanten von Automobil- und Industrieersatzteilen.',
            intro='<p><strong>Aurora Global</strong> ist ein britischer Lieferant technisch geprüfter Wälzlager für die europäische Industrie. Die Website stützt die Positionierung als Lagerspezialist mit technischem Katalog und Angebotsanfrage.</p>',
            sections=[('Technischer Wälzlagerkatalog', '<p>Ein technischer Katalog mit 461 Lagern ist nach Marke und Spezifikation durchsuchbar; jedes Produkt führt zur Angebotsanfrage.</p>'),
                      ('Angebotsanfrage (RFQ)', '<p>Formular und eingehende Anfragen werden im Admin-Panel verfolgt; sämtliche Inhalte werden aus der Datenbank verwaltet.</p>'),
                      ('Mehrsprachigkeit und Sichtbarkeit', '<p>Englische und türkische Inhalte nutzen lokalisierte URLs; FAQ-Strukturdaten, llms.txt und Sitemap bereiten die Site auf Suchmaschinen und KI-Suche vor.</p>')],
            features=['Technischer Katalog mit 461 Wälzlagern', 'RFQ-Formular und Anfrageverwaltung', 'Lokalisierte englische/türkische URLs', 'Datenbankgestützte Inhalte', 'FAQ- und FAQPage-Strukturdaten', 'llms.txt und Sitemap'],
            alt='Aurora Global Startseite: Präzisionswälzlager für die europäische Industrie',
            meta_title='Aurora Global — B2B-Wälzlagerkatalog und Angebote',
            meta_description='Mehrsprachige B2B-Website für einen britischen Ersatzteillieferanten mit technischem Katalog von 461 Wälzlagern und Angebotsanfrage.'),
    }))

# ---------------------------------------------------------------------------
# Mevcut projeler: kapak 1600x900'e cevrilir (eski klasor adi -> ayni klasor)
# ---------------------------------------------------------------------------
KAPAK_GUNCELLE = ['amozon', 'antalyadoner', 'b2b-geo-seo', 'ditcoeu', 'ensotek', 'geoserra', 'gzlteknoloji',
                  'gzltemizlik', 'hilalsever', 'kamanilan', 'karbonkompozit', 'kiremitci-metal', 'konigsmassage',
                  'marketpulse', 'misset', 'osgb', 'paketjet', 'paspas', 'promats', 'seyfibaba', 'socialpulse',
                  'sportoonline', 'sultandefense', 'sultanolive', 'tanitio', 'tarimiklim', 'trackpulse', 'wiribu', 'woody']

# Kategori = site_settings.content_categories slug'i (filtre ve dile gore etiket bunu kullanir).
# Serbest metin ("Lojistik / Marketplace") filtreye dusmuyor, DE/EN sayfada Turkce gorunuyordu.
KATEGORI = {
    'web-ecommerce': ['konigsmassage', 'sportoonline', 'misset', 'gzltemizlik', 'hilalsever', 'paketjet', 'sultanolive',
                      'woody', 'seyfibaba', 'karbonkompozit', 'kiremitci-metal', 'ditcoeu', 'sultandefense', 'promats',
                      'kamanilan', 'ensotek', 'antalyadoner', 'gzlteknoloji', 'mezarisim', 'bayramozukoyu',
                      'ensotek-com-tr', 'kuhlturm', 'auroraglobal'],
    'custom-software': ['paspas', 'osgb', 'teklifrota', 'sportoflow', 'trackpulse'],
    'data-automation': ['amozon', 'marketpulse', 'socialpulse', 'tanitio', 'tarimiklim', 'ihracatradari'],
    'seo-geo': ['b2b-geo-seo', 'wiribu', 'geoserra'],
}
KATEGORI_OF = {d: k for k, ds in KATEGORI.items() for d in ds}

# Artik bize ait olmayan (CLAUDE.md "ARTIK BIZDE DEGIL", 2026-09-27) projeler yayindan alinir.
# Kayit SILINMEZ; is_published=0 geri alinabilir.
RAKIP = ['bereketfide', 'vistainsaat', 'genomai', 'haldefiyat']


import os
# Kapaklar repoda degil (uploads'ta). Uretirken boyut icin yerel kopya gerekir:
#   PORTFOLYO_KAPAK_DIR=<dir>/out python3 backend/scripts/portfolyo-2026-10.py \
#     backend/src/db/seed/sql/226_portfolio_2026_10.sql backend/src/db/seed/content/gzl/055_portfolio_2026_10.sql
OUT_DIR = os.environ.get('PORTFOLYO_KAPAK_DIR') or os.path.join(os.path.dirname(os.path.abspath(__file__)), 'out')


def asset_id(d):
    return uid('asset', d, 'kapak-1600x900')


def asset_sql(d):
    path = f'portfolio/{d}/kapak-1600x900.webp'
    size = os.path.getsize(os.path.join(OUT_DIR, d, 'kapak-1600x900.webp'))
    meta = json.dumps({'source': 'portfolio-2026-10', 'role': 'cover', 'normalized': '1600x900'})
    return ("INSERT INTO `storage_assets` (`id`,`user_id`,`name`,`bucket`,`path`,`folder`,`mime`,`size`,`width`,`height`,`url`,`provider`,`provider_resource_type`,`provider_format`,`metadata`) VALUES "
            f"({q(asset_id(d))},NULL,'kapak-1600x900.webp','media',{q(path)},{q('portfolio/' + d)},'image/webp',{size},1600,900,{q('/uploads/' + path)},'local','image','webp',{q(meta)})"
            " ON DUPLICATE KEY UPDATE `size`=VALUES(`size`),`width`=1600,`height`=900,`url`=VALUES(`url`),`updated_at`=NOW(3);")


def q(v):
    if v is None:
        return 'NULL'
    if isinstance(v, (int, float)):
        return str(v)
    return "'" + str(v).replace('\\', '\\\\').replace("'", "''") + "'"


def html_for(d):
    body = d['intro'] + ''.join(f'<h2>{h}</h2>{p}' for h, p in d['sections'])
    body += '<h2>' + {'tr': 'Öne çıkan özellikler', 'en': 'Key features', 'de': 'Wichtige Funktionen'}[d['_loc']] + '</h2><ul>'
    body += ''.join(f'<li>{f}</li>' for f in d['features']) + '</ul>'
    return body


def build(suffix):
    out = []
    out.append('-- =============================================================')
    out.append('-- Portfolyo 2026-10 — URETILMIS DOSYA, elle duzenleme.')
    out.append('-- 1) 8 yeni canli proje (tr/en/de) — kaynak: project.portfolio.json + canli site metni')
    out.append('-- 2) Tum kapaklar 1600x900 WebP (kart kutusu 16:9) — /uploads/portfolio/<d>/kapak-1600x900.webp')
    out.append('-- 3) Artik bize ait olmayan 4 proje yayindan alinir (silinmez)')
    out.append('-- Gorseller seed ile gelmez; uploads dizinine ayrica kopyalanir.')
    out.append('-- =============================================================')
    out.append('SET NAMES utf8mb4;')
    out.append('START TRANSACTION;')
    for p in P:
        pid = uid('project', p['key'])
        cover = COVER.format(d=p['dir'])
        out.append(f"\n-- {p['key']}")
        out.append(asset_sql(p['dir']))
        out.append('INSERT INTO `projects` (`id`,`is_published`,`is_featured`,`display_order`,`currency`,`is_purchasable`,`featured_image`,`featured_image_asset_id`,`category`,`client_name`,`services`,`website_url`,`techs`,`created_at`,`updated_at`) VALUES '
                   f"({q(pid)},1,{p['featured']},{p['order']},'EUR',0,{q(cover)},{q(asset_id(p['dir']))},{q(KATEGORI_OF[p['dir']])},{q(p['client'])},{q(json.dumps(p['services'], ensure_ascii=False))},{q(p['url'])},{q(json.dumps(p['techs'], ensure_ascii=False))},NOW(3),NOW(3))"
                   ' ON DUPLICATE KEY UPDATE `is_published`=VALUES(`is_published`),`display_order`=VALUES(`display_order`),`featured_image`=VALUES(`featured_image`),`featured_image_asset_id`=VALUES(`featured_image_asset_id`),`category`=VALUES(`category`),`client_name`=VALUES(`client_name`),`services`=VALUES(`services`),`website_url`=VALUES(`website_url`),`techs`=VALUES(`techs`),`updated_at`=NOW(3);')
        img_id = uid('image', p['key'], 'cover')
        out.append(f"INSERT INTO `project_images` (`id`,`project_id`,`asset_id`,`image_url`,`display_order`,`is_active`,`created_at`,`updated_at`) VALUES ({q(img_id)},{q(pid)},{q(asset_id(p['dir']))},{q(cover)},0,1,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE `image_url`=VALUES(`image_url`),`asset_id`=VALUES(`asset_id`),`updated_at`=NOW(3);")
        for loc, d in p['i18n'].items():
            d = dict(d, _loc=loc)
            content = {
                'html': html_for(d),
                'description': d['summary'],
                'key_features': d['features'],
                'technologies_used': p['techs'],
                'design_highlights': [],
            }
            out.append('INSERT INTO `projects_i18n` (`id`,`project_id`,`locale`,`title`,`slug`,`summary`,`content`,`featured_image_alt`,`meta_title`,`meta_description`,`created_at`,`updated_at`) VALUES '
                       f"({q(uid('i18n', p['key'], loc))},{q(pid)},{q(loc)},{q(d['title'])},{q(p['slug'])},{q(d['summary'])},{q(json.dumps(content, ensure_ascii=False))},{q(d['alt'])},{q(d['meta_title'] + suffix)},{q(d['meta_description'])},NOW(3),NOW(3))"
                       ' ON DUPLICATE KEY UPDATE `title`=VALUES(`title`),`slug`=VALUES(`slug`),`summary`=VALUES(`summary`),`content`=VALUES(`content`),`featured_image_alt`=VALUES(`featured_image_alt`),`meta_title`=VALUES(`meta_title`),`meta_description`=VALUES(`meta_description`),`updated_at`=NOW(3);')
            out.append(f"INSERT INTO `project_images_i18n` (`id`,`image_id`,`locale`,`alt`,`caption`,`created_at`,`updated_at`) VALUES ({q(uid('image-i18n', p['key'], loc))},{q(img_id)},{q(loc)},{q(d['alt'])},NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE `alt`=VALUES(`alt`),`updated_at`=NOW(3);")

    out.append('\n-- Mevcut projeler: kapak 1600x900. Galerinin ilk gorseli eski kapaksa o da guncellenir.')
    for d in KAPAK_GUNCELLE:
        new = COVER.format(d=d)
        like = f'/uploads/portfolio/{d}/%'
        out.append(asset_sql(d))
        out.append(f"UPDATE `project_images` pi JOIN `projects` p ON p.id = pi.project_id SET pi.`image_url`={q(new)}, pi.`asset_id`={q(asset_id(d))}, pi.`updated_at`=NOW(3) WHERE p.`featured_image` LIKE {q(like)} AND p.`featured_image` <> {q(new)} AND pi.`image_url` = p.`featured_image`;")
        out.append(f"UPDATE `projects` SET `featured_image`={q(new)}, `featured_image_asset_id`={q(asset_id(d))}, `updated_at`=NOW(3) WHERE `featured_image` LIKE {q(like)} AND `featured_image` <> {q(new)};")

    out.append('\n-- Kategori: content_categories slug\'i.')
    for d, k in sorted(KATEGORI_OF.items()):
        out.append(f"UPDATE `projects` SET `category`={q(k)}, `updated_at`=NOW(3) WHERE `featured_image` LIKE {q('/uploads/portfolio/' + d + '/%')} AND (`category` IS NULL OR `category` <> {q(k)});")
    out.append('\n-- Artik bize ait olmayan projeler: yayindan al (kayit korunur).')
    for d in RAKIP:
        out.append(f"UPDATE `projects` SET `is_published`=0, `updated_at`=NOW(3) WHERE `featured_image` LIKE {q('/uploads/portfolio/' + d + '/%')};")
    out.append('COMMIT;')
    return '\n'.join(out) + '\n'


if __name__ == '__main__':
    gwd_path, gzl_path = sys.argv[1], sys.argv[2]
    open(gwd_path, 'w').write(build(' | Guezel Web Design'))
    open(gzl_path, 'w').write(build(' | GZL Teknoloji'))
    print('yeni proje:', len(P), 'kapak guncelle:', len(KAPAK_GUNCELLE), 'yayindan al:', len(RAKIP))
