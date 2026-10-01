"""gzlteknoloji.com /urunler — gelir urunleri one cikarilir (2026-10-01). Uretir: content/gzl/057_urunler_2026_10.sql

Kaynaklar (uydurma ozellik/rakam/fiyat YOK):
- Tanitio: tanitio.com, /fiyatlandirma, public plans API, ekosistem-sosyal-medya/project.portfolio.json
- TeklifRota: teklifrota.com, /pricing, fuar-teklif/README.md + CLAUDE.md, GZL CRM portfoy kaydi
- ERP: sablon_erp README (hazir cekirdek) + canli referans (uretim/stok/siparis/musteri, Excel'den tasima).
  Paket urun DEGIL: "hazir cekirdek uzerine firmaya ozel kurulum" olarak anlatilir; fiyat yazilmaz.
- CRM: daima-lift manifest yetenekleri + TeklifRota ihracat CRM'i. Ayri paket urun DEGIL; ayni cerceve.
Musteri adi kullanilmaz. Fiyatlar degisirse bu dosya guncellenir (Tanitio TRY+KDV, TeklifRota USD).

Kullanim: URUN_KAPAK_DIR=<dir> python3 backend/scripts/urunler-2026-10.py <cikti.sql>
"""
import json, os, sys, uuid

NS = uuid.UUID('6f1c2a4e-2026-4a10-9c00-000000000003')
CATEGORY = '30000000-0000-4000-8000-000000000001'      # "SaaS Urunleri"
SUBCATEGORY = '30000000-0000-4000-8000-000000000101'


def q(v):
    if v is None:
        return 'NULL'
    if isinstance(v, (int, float)):
        return str(v)
    return "'" + str(v).replace('\\', '\\\\').replace("'", "''") + "'"


def j(v):
    return json.dumps(v, ensure_ascii=False)


URUN = []

URUN.append(dict(
    id='30000000-0000-4000-8000-000000000202',   # eski "Sozial" kaydi Tanitio olarak yeniden yazilir
    code='TANITIO', order=1, featured=1, status='live', pricing='subscription',
    demo='https://panel.tanitio.com/demo', docs='https://tanitio.com/fiyatlandirma', image='tanitio',
    i18n={
        'tr': dict(
            title='Tanitio — Yapay Zekâ Destekli Pazarlama Operasyon Merkezi', slug='tanitio',
            subtitle='Sosyal medya, reklam, ölçümleme ve ekip onayı tek panelde. Yapay zekâ önerir, karar sizde kalır. 14 gün ücretsiz deneyin.',
            description=('Tanitio; Instagram, Facebook, LinkedIn, X ve Telegram paylaşımlarınızı tek takvimden planlayan, markanızın dilinde '
                         'içerik üreten ve Google ile Meta reklamlarınızı onaylı bir akışla yöneten çok kiracılı pazarlama platformudur. '
                         'İşletmeler, ajanslar ve içerik üreticileri için tasarlandı. 14 gün ücretsiz deneme; Başlangıç paketi aylık ₺990 + KDV.'),
            features=['Instagram, Facebook, LinkedIn, X ve Telegram için zamanlanmış paylaşım ve görsel içerik takvimi',
                      'Markanızın dilinde yapay zekâ içerik stüdyosu: tek tıkla 10 parçalık içerik paketi (başlık, açıklama, CTA, reklam metni, video senaryosu)',
                      'Ham videodan otomatik dikey Reels kurgusu: altyazı, kapak karesi, orijinali bozmayan sürümler',
                      'Google Ads ve Meta Ads yönetimi: taslak → deneme → onay → uygulama zinciri; otomatik optimizasyon varsayılan kapalı ve geri alınabilir',
                      'Yapay zekâ reklam analisti ve 0–100 kreatif puanlaması',
                      'GA4, Search Console, Tag Manager, Merchant Center ve Meta Pixel/CAPI kontrolleri tek ekranda',
                      '30+ site sağlığı kontrolü, Lighthouse/CrUX ve yapay zekâ aramalarında görünürlük (GEO, llms.txt)',
                      'Rakip keşfi (arama sonuçları ve Meta Reklam Kütüphanesi) ve strateji raporu',
                      'Ekip onayları, günlük iş listesi, müşteri izleme portalı ve PDF/CSV dönem raporları'],
            tags=['Sosyal Medya', 'Yapay Zekâ İçerik', 'Google Ads', 'Meta Ads', 'SEO ve GEO', 'Ajanslar için'],
            cta='Ücretsiz dene',
            meta_title='Tanitio — Yapay Zekâ Destekli Pazarlama Platformu | GZL Teknoloji'),
        'en': dict(
            title='Tanitio — AI-Assisted Marketing Operations Hub', slug='tanitio',
            subtitle='Social media, ads, measurement and team approvals in one panel. AI suggests, you decide. Try it free for 14 days.',
            description=('Tanitio is a multi-tenant marketing platform that schedules your Instagram, Facebook, LinkedIn, X and Telegram posts '
                         'from one calendar, writes content in your brand voice and runs your Google and Meta ads through an approval flow. '
                         'Built for businesses, agencies and creators. 14-day free trial; the Starter plan is ₺990 per month plus VAT.'),
            features=['Scheduled publishing and a visual content calendar for Instagram, Facebook, LinkedIn, X and Telegram',
                      'AI content studio in your brand voice: a 10-piece content pack in one click (title, caption, CTA, ad copy, video script)',
                      'Automatic vertical Reels editing from raw video: subtitles, cover frame, versions that never overwrite the original',
                      'Google Ads and Meta Ads management: draft → dry run → approval → apply; autonomous optimisation is off by default and reversible',
                      'AI ad analyst and creative scoring from 0 to 100',
                      'GA4, Search Console, Tag Manager, Merchant Center and Meta Pixel/CAPI checks on one screen',
                      '30+ site health checks, Lighthouse/CrUX and visibility in AI search (GEO, llms.txt)',
                      'Competitor discovery (search results and Meta Ad Library) with a strategy report',
                      'Team approvals, a daily task list, a client viewer portal and PDF/CSV period reports'],
            tags=['Social Media', 'AI Content', 'Google Ads', 'Meta Ads', 'SEO & GEO', 'For Agencies'],
            cta='Start free trial',
            meta_title='Tanitio — AI-Assisted Marketing Platform | GZL Technology'),
        'de': dict(
            title='Tanitio — KI-gestützte Zentrale für Marketing-Operations', slug='tanitio',
            subtitle='Social Media, Anzeigen, Messung und Team-Freigaben in einem Panel. Die KI schlägt vor, Sie entscheiden. 14 Tage kostenlos testen.',
            description=('Tanitio ist eine mandantenfähige Marketingplattform: Sie plant Beiträge für Instagram, Facebook, LinkedIn, X und Telegram '
                         'in einem Kalender, erstellt Inhalte in Ihrer Markensprache und steuert Google- und Meta-Anzeigen über einen Freigabeprozess. '
                         'Für Unternehmen, Agenturen und Creator. 14 Tage kostenlos testen; der Starter-Tarif kostet 990 ₺ pro Monat zzgl. MwSt.'),
            features=['Geplante Veröffentlichung und visueller Redaktionskalender für Instagram, Facebook, LinkedIn, X und Telegram',
                      'KI-Content-Studio in Ihrer Markensprache: ein 10-teiliges Content-Paket per Klick (Titel, Text, CTA, Anzeigentext, Videoskript)',
                      'Automatischer Hochformat-Reels-Schnitt aus Rohvideo: Untertitel, Titelbild, Versionen ohne Überschreiben des Originals',
                      'Google-Ads- und Meta-Ads-Verwaltung: Entwurf → Testlauf → Freigabe → Umsetzung; autonome Optimierung standardmäßig aus und umkehrbar',
                      'KI-Anzeigenanalyst und Kreativ-Bewertung von 0 bis 100',
                      'GA4-, Search-Console-, Tag-Manager-, Merchant-Center- und Meta-Pixel/CAPI-Prüfungen auf einem Bildschirm',
                      'Über 30 Website-Checks, Lighthouse/CrUX und Sichtbarkeit in KI-Suchen (GEO, llms.txt)',
                      'Wettbewerbsanalyse (Suchergebnisse und Meta-Werbebibliothek) mit Strategiebericht',
                      'Team-Freigaben, tägliche Aufgabenliste, Kundenportal und PDF/CSV-Periodenberichte'],
            tags=['Social Media', 'KI-Inhalte', 'Google Ads', 'Meta Ads', 'SEO & GEO', 'Für Agenturen'],
            cta='Kostenlos testen',
            meta_title='Tanitio — KI-gestützte Marketingplattform | GZL Technologie'),
    }))

URUN.append(dict(
    id=None, code='TEKLIFROTA', order=2, featured=1, status='live', pricing='subscription',
    demo='https://teklifrota.com/login?demo=1', docs='https://teklifrota.com/pricing', image='teklifrota',
    i18n={
        'tr': dict(
            title='TeklifRota — İhracat Teklifi, Evrak ve Navlun Yönetimi', slug='teklifrota',
            subtitle='İhracatta alıcıdan sevkiyata tek rota: alıcıyı bul, teklifi ver, evrakı hazırla, navlunu kanıtla.',
            description=('TeklifRota, ihracat yapan üreticilerin alıcı bulma, teklif, proforma, çeki listesi ve navlun süreçlerini tek, denetlenebilir '
                         'akışta yöneten çok kiracılı B2B platformudur. Elektronik tablolarda dağılan teklifler biter; her revizyon ve onay kayıt altında kalır. '
                         '14 gün ücretsiz deneme; Starter paketi aylık 29 $.'),
            features=['19,5 milyon+ gümrük kaydında firma ve GTİP ile alıcı arama (Türkiye, ABD, Rusya, Ukrayna)',
                      'Arama sonucunu tek adımda müşteri adayı olarak CRM\'e aktarma',
                      'Revizyon geçmişi ve müşteri onayıyla teklif hazırlama',
                      '5 belge türü: teklif, proforma, ticari fatura, çeki listesi, yükleme talimatı — Türkçe, İngilizce, Almanca',
                      'Belge setini tek bağlantı, PDF veya ZIP olarak e-posta, WhatsApp ya da QR ile paylaşma',
                      'TL, USD, EUR ve GBP ile dönüşümsüz çalışma',
                      'Açıklanabilir navlun: 92 açık parametreyle tekrarlanabilir hesap; karayolu, deniz ve havayolu aynı yükte karşılaştırma',
                      '51 ülkenin resmî tatil takvimi',
                      'Rol ve yetkiler, değişiklik geçmişi, firma bazında ayrılmış veri'],
            tags=['İhracat', 'Teklif ve Proforma', 'Navlun', 'Gümrük Verisi', 'İhracat CRM'],
            cta='Ücretsiz dene',
            meta_title='TeklifRota — İhracat Teklifi ve Navlun Yönetimi | GZL Teknoloji'),
        'en': dict(
            title='TeklifRota — Export Quotes, Documents and Freight', slug='teklifrota',
            subtitle='One route from buyer to shipment: find the buyer, send the quote, prepare the documents, prove the freight.',
            description=('TeklifRota is a multi-tenant B2B platform where exporting manufacturers run buyer search, quotes, proforma invoices, '
                         'packing lists and freight in one auditable flow. No more quotes scattered across spreadsheets: every revision and approval '
                         'is on record. 14-day free trial; the Starter plan is $29 per month.'),
            features=['Buyer search by company or HS code across 19.5M+ customs records (Türkiye, USA, Russia, Ukraine)',
                      'Move a search result into the CRM as a lead in one step',
                      'Quotes with revision history and customer approval',
                      '5 document types: quote, proforma, commercial invoice, packing list, loading instruction — in Turkish, English and German',
                      'Share the document set as one link, PDF or ZIP via email, WhatsApp or QR code',
                      'TRY, USD, EUR and GBP without conversion',
                      'Explainable freight: a reproducible calculation with 92 disclosed parameters; road, sea and air compared on the same load',
                      'Public holiday calendars for 51 countries',
                      'Roles and permissions, change history, data isolated per company'],
            tags=['Export', 'Quotes & Proforma', 'Freight', 'Customs Data', 'Export CRM'],
            cta='Start free trial',
            meta_title='TeklifRota — Export Quotes and Freight Management | GZL Technology'),
        'de': dict(
            title='TeklifRota — Exportangebote, Dokumente und Fracht', slug='teklifrota',
            subtitle='Eine Route vom Käufer bis zum Versand: Käufer finden, Angebot senden, Dokumente erstellen, Fracht belegen.',
            description=('TeklifRota ist eine mandantenfähige B2B-Plattform, auf der exportierende Hersteller Käufersuche, Angebote, Proforma-Rechnungen, '
                         'Packlisten und Fracht in einem nachvollziehbaren Ablauf steuern. Schluss mit verstreuten Tabellen: Jede Revision und Freigabe '
                         'ist dokumentiert. 14 Tage kostenlos testen; der Starter-Tarif kostet 29 $ pro Monat.'),
            features=['Käufersuche nach Firma oder Zolltarifnummer in über 19,5 Mio. Zolldatensätzen (Türkei, USA, Russland, Ukraine)',
                      'Suchergebnis mit einem Schritt als Lead ins CRM übernehmen',
                      'Angebote mit Revisionsverlauf und Kundenfreigabe',
                      '5 Dokumenttypen: Angebot, Proforma, Handelsrechnung, Packliste, Verladeanweisung — auf Türkisch, Englisch und Deutsch',
                      'Dokumentensatz als Link, PDF oder ZIP per E-Mail, WhatsApp oder QR-Code teilen',
                      'TRY, USD, EUR und GBP ohne Umrechnung',
                      'Nachvollziehbare Frachtkalkulation mit 92 offengelegten Parametern; Straße, See und Luft für dieselbe Ladung im Vergleich',
                      'Feiertagskalender für 51 Länder',
                      'Rollen und Berechtigungen, Änderungsverlauf, nach Firma getrennte Daten'],
            tags=['Export', 'Angebote & Proforma', 'Fracht', 'Zolldaten', 'Export-CRM'],
            cta='Kostenlos testen',
            meta_title='TeklifRota — Exportangebote und Frachtmanagement | GZL Technologie'),
    }))

URUN.append(dict(
    id=None, code='ERP', order=3, featured=1, status='live', pricing='one_time',
    demo=None, docs=None, image='erp',
    i18n={
        'tr': dict(
            title='Firmaya Özel ERP — Üretim, Stok, Sipariş ve İnsan Kaynakları', slug='firmaya-ozel-erp',
            subtitle='Hazır ve çalışan bir çekirdek üzerine, sizin iş akışınıza göre kurulan ERP. Paket yazılıma uymak yerine yazılım size uyar.',
            description=('Kimlik doğrulama, çok kiracılı yapı, rol ve bölüm bazlı yetkiler, iş kuyruğu, insan kaynakları, performans ve prim, '
                         'denetim kaydı ile bildirim ve dosya yönetimi çekirdekte hazır gelir. Talep, teklif, üretim, stok ve sipariş bölümleri '
                         'firmanızın gerçek akışına göre yazılır; Excel\'deki mevcut verileriniz sisteme taşınır. Üretim, stok, sipariş ve müşteri '
                         'yönetimini canlıda yürüten referans sistemlerimiz var. Kapsama göre teklif hazırlanır.'),
            features=['Rol × bölüm yetki matrisi: kim neyi görür, kim neyi değiştirir',
                      'Kokpit: herkesin önüne kendi iş kuyruğu gelir',
                      'Üretim, stok, sipariş ve teklif bölümleri sizin sürecinize göre',
                      'İnsan kaynakları, performans ve prim takibi',
                      'Her değişikliğin denetim kaydı: kim, ne zaman, neyi değiştirdi',
                      'Bildirimler ve dosya yönetimi',
                      'Çok kiracılı yapı: birden çok firma ya da şube aynı sistemde, verileri ayrı',
                      'Excel\'deki mevcut verilerin sisteme taşınması',
                      'Logo, ad ve tema verinizden gelir; sistem sizin markanızla açılır'],
            tags=['ERP', 'Üretim', 'Stok', 'Sipariş', 'İnsan Kaynakları', 'Özel Yazılım'],
            cta='Teklif al',
            meta_title='Firmaya Özel ERP Yazılımı — Üretim, Stok, Sipariş | GZL Teknoloji'),
        'en': dict(
            title='Custom ERP — Production, Stock, Orders and HR', slug='custom-erp',
            subtitle='An ERP built on a proven, working core and shaped around your workflow. Instead of bending to packaged software, the software fits you.',
            description=('Authentication, a multi-tenant structure, role- and section-based permissions, a work queue, HR, performance and bonus tracking, '
                         'an audit trail, notifications and file management come ready in the core. Request, quote, production, stock and order sections '
                         'are written around your real process, and your existing Excel data is migrated. We run reference systems in production that manage '
                         'production, stock, orders and customers. Pricing is quoted by scope.'),
            features=['Role × section permission matrix: who sees and who changes what',
                      'Cockpit: everyone gets their own work queue',
                      'Production, stock, order and quote sections shaped to your process',
                      'HR, performance and bonus tracking',
                      'Audit trail for every change: who changed what, and when',
                      'Notifications and file management',
                      'Multi-tenant: several companies or branches in one system with separated data',
                      'Migration of your existing Excel data',
                      'Logo, name and theme come from your data; the system opens with your brand'],
            tags=['ERP', 'Production', 'Inventory', 'Orders', 'HR', 'Custom Software'],
            cta='Request a quote',
            meta_title='Custom ERP Software — Production, Stock, Orders | GZL Technology'),
        'de': dict(
            title='Individuelles ERP — Produktion, Lager, Aufträge und Personal', slug='individuelles-erp',
            subtitle='Ein ERP auf einem bewährten, laufenden Kern — zugeschnitten auf Ihre Abläufe. Statt sich an Standardsoftware anzupassen, passt sich die Software Ihnen an.',
            description=('Authentifizierung, Mandantenfähigkeit, rollen- und bereichsbasierte Rechte, Arbeitswarteschlange, Personalwesen, Leistungs- und '
                         'Prämienverwaltung, Audit-Trail sowie Benachrichtigungen und Dateiverwaltung sind im Kern fertig. Anfrage-, Angebots-, Produktions-, '
                         'Lager- und Auftragsbereiche werden nach Ihrem tatsächlichen Ablauf entwickelt; vorhandene Excel-Daten werden übernommen. '
                         'Referenzsysteme für Produktion, Lager, Aufträge und Kunden laufen bereits produktiv. Das Angebot richtet sich nach dem Umfang.'),
            features=['Rollen × Bereiche-Rechtematrix: wer was sieht und wer was ändert',
                      'Cockpit: jede Person sieht ihre eigene Arbeitswarteschlange',
                      'Produktions-, Lager-, Auftrags- und Angebotsbereiche nach Ihrem Prozess',
                      'Personalwesen, Leistungs- und Prämienverwaltung',
                      'Audit-Trail für jede Änderung: wer hat was wann geändert',
                      'Benachrichtigungen und Dateiverwaltung',
                      'Mandantenfähig: mehrere Firmen oder Filialen in einem System mit getrennten Daten',
                      'Übernahme Ihrer vorhandenen Excel-Daten',
                      'Logo, Name und Design kommen aus Ihren Daten; das System startet mit Ihrer Marke'],
            tags=['ERP', 'Produktion', 'Lager', 'Aufträge', 'Personal', 'Individualsoftware'],
            cta='Angebot anfordern',
            meta_title='Individuelle ERP-Software — Produktion, Lager, Aufträge | GZL Technologie'),
    }))

URUN.append(dict(
    id=None, code='CRM', order=4, featured=1, status='live', pricing='one_time',
    demo=None, docs=None, image='crm',
    i18n={
        'tr': dict(
            title='Satış ve Müşteri Yönetimi (CRM) — Firmaya Özel', slug='firmaya-ozel-crm',
            subtitle='Müşteri, görüşme ve fırsat takibinden teklif ve siparişe kadar satış sürecinizi tek akışta yönetin.',
            description=('Müşteri kartları, görüşme kayıtları ve fırsat hattı; tekliften revizyona, PDF\'ten siparişe uzanan zincir; görevler, '
                         'otomasyonlar ve her adımın denetim kaydı. CRM, ERP çekirdeğimizle aynı altyapıda çalışır ve gerektiğinde sipariş, üretim, '
                         'sevkiyat ve stokla bütünleşir. İhracat yapan ekipler için TeklifRota\'daki hazır ihracat CRM\'i de kullanılabilir. '
                         'Kapsama göre teklif hazırlanır.'),
            features=['Müşteri ve iletişim kartları',
                      'Görüşme ve toplantı kayıtları',
                      'Fırsat hattı (pipeline) ile satış aşamalarını izleme',
                      'Teklif → revizyon → PDF → sipariş zinciri',
                      'Görev, hatırlatma ve otomasyonlar',
                      'Rol bazlı yetkiler ve her adımın denetim kaydı',
                      'Sipariş, üretim, sevkiyat ve stokla ERP entegrasyonu',
                      'İhracat ekipleri için TeklifRota ile hazır ihracat CRM\'i'],
            tags=['CRM', 'Satış Hattı', 'Teklif', 'Müşteri Yönetimi', 'Özel Yazılım'],
            cta='Teklif al',
            meta_title='Firmaya Özel CRM — Satış ve Müşteri Yönetimi | GZL Teknoloji'),
        'en': dict(
            title='Sales and Customer Management (CRM) — Built for You', slug='custom-crm',
            subtitle='Run your sales process in one flow, from customers, meetings and opportunities to quotes and orders.',
            description=('Customer cards, meeting logs and an opportunity pipeline; a chain from quote to revision, PDF and order; tasks, automations '
                         'and an audit trail for every step. The CRM runs on the same foundation as our ERP core and connects to orders, production, '
                         'shipping and stock when needed. Export teams can also use the ready-made export CRM in TeklifRota. Pricing is quoted by scope.'),
            features=['Customer and contact cards',
                      'Meeting and call logs',
                      'Opportunity pipeline to track sales stages',
                      'Quote → revision → PDF → order chain',
                      'Tasks, reminders and automations',
                      'Role-based permissions and an audit trail for every step',
                      'ERP integration with orders, production, shipping and stock',
                      'Ready-made export CRM for export teams with TeklifRota'],
            tags=['CRM', 'Sales Pipeline', 'Quotes', 'Customer Management', 'Custom Software'],
            cta='Request a quote',
            meta_title='Custom CRM — Sales and Customer Management | GZL Technology'),
        'de': dict(
            title='Vertrieb und Kundenmanagement (CRM) — individuell', slug='individuelles-crm',
            subtitle='Steuern Sie Ihren Vertrieb in einem Ablauf: von Kunden, Gesprächen und Chancen bis zu Angeboten und Aufträgen.',
            description=('Kundenkarten, Gesprächsprotokolle und eine Verkaufspipeline; eine Kette vom Angebot über Revision und PDF bis zum Auftrag; '
                         'Aufgaben, Automatisierungen und ein Audit-Trail für jeden Schritt. Das CRM läuft auf derselben Basis wie unser ERP-Kern und '
                         'verbindet sich bei Bedarf mit Aufträgen, Produktion, Versand und Lager. Exportteams können zudem das fertige Export-CRM in '
                         'TeklifRota nutzen. Das Angebot richtet sich nach dem Umfang.'),
            features=['Kunden- und Kontaktkarten',
                      'Gesprächs- und Terminprotokolle',
                      'Verkaufspipeline zur Verfolgung der Phasen',
                      'Kette Angebot → Revision → PDF → Auftrag',
                      'Aufgaben, Erinnerungen und Automatisierungen',
                      'Rollenbasierte Rechte und Audit-Trail für jeden Schritt',
                      'ERP-Anbindung an Aufträge, Produktion, Versand und Lager',
                      'Fertiges Export-CRM für Exportteams mit TeklifRota'],
            tags=['CRM', 'Vertriebspipeline', 'Angebote', 'Kundenmanagement', 'Individualsoftware'],
            cta='Angebot anfordern',
            meta_title='Individuelles CRM — Vertrieb und Kundenmanagement | GZL Technologie'),
    }))

# Mevcut urunler: yalniz sira/adres duzeltmesi (icerik korunur)
DUZELT = [
    # kod, sira, aktif, demo_url (None = degistirme)
    ('IHRACAT-RADARI', 92, 0, 'https://ihracatradari.com.tr'),    # Orhan 2026-10-01: urunlerden kaldirildi (demo adresi yine duzeltilir)
    ('SCRAPER-API', 5, 1, 'https://scraper.guezelwebdesign.com/docs'),  # eski scraper.gzltek.tech acilmiyor
    ('GEOSERRA', 90, 0, None),     # site 502 (surecler 2026-09-03'ten beri durdurulmus) — satistan kaldir
    ('KATALOGAI', 91, 0, None),    # artik bize ait degil (CLAUDE.md, 2026-09-27)
]


def build(kapak_dir):
    out = ['-- URETILMIS DOSYA — backend/scripts/urunler-2026-10.py', 'SET NAMES utf8mb4;', 'START TRANSACTION;']
    for u in URUN:
        pid = u['id'] or str(uuid.uuid5(NS, 'product/' + u['code']))
        img = f"/uploads/products/{u['image']}-1600x900.webp"
        assert os.path.exists(os.path.join(kapak_dir, f"{u['image']}-1600x900.webp")), u['image']
        out.append(f"\n-- {u['code']}")
        out.append("INSERT INTO `products` (`id`,`item_type`,`product_kind`,`demo_url`,`docs_url`,`status`,`pricing_model`,`category_id`,`sub_category_id`,`price`,`image_url`,`images`,`is_active`,`is_featured`,`order_num`,`product_code`,`created_at`,`updated_at`) VALUES "
                   f"({q(pid)},'product','saas',{q(u['demo'])},{q(u['docs'])},{q(u['status'])},{q(u['pricing'])},{q(CATEGORY)},{q(SUBCATEGORY)},0,{q(img)},{q(j([img]))},1,{u['featured']},{u['order']},{q(u['code'])},NOW(3),NOW(3))"
                   " ON DUPLICATE KEY UPDATE `demo_url`=VALUES(`demo_url`),`docs_url`=VALUES(`docs_url`),`status`=VALUES(`status`),`pricing_model`=VALUES(`pricing_model`),"
                   "`image_url`=VALUES(`image_url`),`images`=VALUES(`images`),`is_active`=1,`is_featured`=VALUES(`is_featured`),`order_num`=VALUES(`order_num`),`product_code`=VALUES(`product_code`),`updated_at`=NOW(3);")
        for loc, d in u['i18n'].items():
            spec = {'cta': d['cta'], 'demo_url': u['demo'], 'features': d['features']}
            if u['docs']:
                spec['pricing_url'] = u['docs']
            out.append("INSERT INTO `product_i18n` (`product_id`,`locale`,`title`,`slug`,`description`,`alt`,`tags`,`specifications`,`meta_title`,`meta_description`,`created_at`,`updated_at`) VALUES "
                       f"({q(pid)},{q(loc)},{q(d['title'])},{q(d['slug'])},{q(d['description'])},{q(d['title'])},{q(j(d['tags']))},{q(j(spec))},{q(d['meta_title'])},{q(d['subtitle'])},NOW(3),NOW(3))"
                       " ON DUPLICATE KEY UPDATE `title`=VALUES(`title`),`slug`=VALUES(`slug`),`description`=VALUES(`description`),`alt`=VALUES(`alt`),`tags`=VALUES(`tags`),"
                       "`specifications`=VALUES(`specifications`),`meta_title`=VALUES(`meta_title`),`meta_description`=VALUES(`meta_description`),`updated_at`=NOW(3);")
    out.append('\n-- Mevcut urunler: sira, gorunurluk, calisan demo adresi.')
    for code, order, active, demo in DUZELT:
        out.append(f"UPDATE `products` SET `order_num`={order}, `is_active`={active}, `is_featured`=IF({active}=1, `is_featured`, 0)"
                   + (f", `demo_url`={q(demo)}" if demo else '') + f", `updated_at`=NOW(3) WHERE `product_code`={q(code)};")
        if demo:
            out.append(f"UPDATE `product_i18n` SET `specifications`=JSON_SET(COALESCE(`specifications`,'{{}}'),'$.demo_url',{q(demo)}), `updated_at`=NOW(3) "
                       f"WHERE `product_id`=(SELECT `id` FROM `products` WHERE `product_code`={q(code)} LIMIT 1);")
    out.append('COMMIT;')
    return '\n'.join(out) + '\n'


if __name__ == '__main__':
    open(sys.argv[1], 'w').write(build(os.environ['URUN_KAPAK_DIR']))
    print('yazildi:', sys.argv[1])
