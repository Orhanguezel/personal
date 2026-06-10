export type FaqItem = { question: string; answer: string };

export const faqByLocale: Record<string, FaqItem[]> = {
  de: [
    {
      question: 'Was kostet eine professionelle Webseite?',
      answer:
        'Der Preis hängt von Umfang, Integrationen und Zeitplan ab. Nach einem kurzen Discovery-Call erhalten Sie ein Festpreis- oder Sprint-Angebot mit klarer Scope-Definition.',
    },
    {
      question: 'Wie lange dauert die Entwicklung?',
      answer:
        'Marketing-Sites oft 3–6 Wochen, Plattformen mit Admin und API typischerweise 8–16 Wochen. Meilensteine und Releases werden vorab vereinbart.',
    },
    {
      question: 'Welche Technologien verwenden Sie?',
      answer:
        'Next.js, React, TypeScript, Fastify oder Laravel auf dem Server, MySQL/Drizzle oder Eloquent, Flutter für Mobile, Docker/Nginx in Produktion.',
    },
    {
      question: 'Bieten Sie Wartung an?',
      answer:
        'Ja — Monitoring, Security-Patches, Dependency-Updates und kleine Features im Retainer oder auf Ticketbasis.',
    },
    {
      question: 'Können Sie bestehende Webseiten überarbeiten?',
      answer:
        'Bestandsübernahme, Refactor und schrittweise Modernisierung sind Kernangebot — inklusive Datenmigration und SEO-sicherer Umstellung.',
    },
    {
      question: 'Welche Branchen bedienen Sie?',
      answer:
        'Von E-Commerce über Industrie, Gastronomie, Immobilien bis Landwirtschaft — die Lösung wird individuell an Ihre Branche angepasst.',
    },
    {
      question: 'Erstellen Sie auch mobile Apps?',
      answer:
        'Ja, mit Flutter entwickle ich plattformübergreifende mobile Apps für Android und iOS aus einer Codebasis — perfekt als Ergänzung zur Web-Plattform.',
    },
    {
      question: 'In welchen Sprachen liefern Sie Webseiten?',
      answer:
        'Deutsch, Englisch und Türkisch sind Standard. Weitere Sprachen lassen sich dank next-intl und i18n-Architektur problemlos ergänzen.',
    },
    {
      question: 'Wie läuft die Zusammenarbeit ab?',
      answer:
        'Discovery-Call, Angebot, Meilensteinplan. Sie erhalten regelmäßige Updates, Staging-Links und Feedback-Runden. Kommunikation per E-Mail, Slack oder Videocall.',
    },
    {
      question: 'Bieten Sie SEO-Optimierung an?',
      answer:
        'Technisches SEO — Server-Side Rendering, strukturierte Daten, Core Web Vitals, Meta-Tags und Sitemap — ist bei jeder Lieferung inklusive.',
    },
    {
      question: 'Wo hosten Sie die Projekte?',
      answer:
        'Auf europäischen VPS-Servern mit Docker, Nginx und PM2. DSGVO-konforme Infrastruktur ist Standard.',
    },
    {
      question: 'Kann ich nach dem Launch selbst Inhalte pflegen?',
      answer:
        'Ja — jedes Projekt erhält ein Admin-Panel, über das Texte, Bilder, Blog-Beiträge und SEO-Meta ohne Programmierkenntnisse gepflegt werden können.',
    },
    {
      question: 'Welche Zahlungsmethoden integrieren Sie?',
      answer:
        'Stripe, Iyzipay, PayPal und weitere Gateways — je nach Markt und Anforderung. PCI-konforme Implementierung.',
    },
    {
      question: 'Gibt es eine Geld-zurück-Garantie?',
      answer:
        'Meilensteinbasierte Abrechnung schützt beide Seiten: Sie zahlen erst nach Abnahme des jeweiligen Meilensteins.',
    },
  ],
  en: [
    {
      question: 'What does a professional website cost?',
      answer:
        'Pricing depends on scope, integrations, and timeline. After a short discovery call you receive a fixed-price or sprint quote with a clear scope.',
    },
    {
      question: 'How long does development take?',
      answer:
        'Marketing sites often 3–6 weeks; platforms with admin and API typically 8–16 weeks. Milestones and releases are agreed upfront.',
    },
    {
      question: 'What technologies do you use?',
      answer:
        'Next.js, React, TypeScript, Fastify or Laravel on the server, MySQL with Drizzle or Eloquent, Flutter for mobile, Docker/Nginx in production.',
    },
    {
      question: 'Do you offer maintenance?',
      answer:
        'Yes — monitoring, security patches, dependency updates, and small features on retainer or ticket basis.',
    },
    {
      question: 'Can you redesign existing websites?',
      answer:
        'Legacy takeover, refactoring, and incremental modernization are a core offer — including data migration and SEO-safe cutovers.',
    },
    {
      question: 'Which industries do you serve?',
      answer:
        'From e-commerce, industry, gastronomy, and real estate to agriculture — every solution is tailored to your specific industry needs.',
    },
    {
      question: 'Do you build mobile apps?',
      answer:
        'Yes, with Flutter I develop cross-platform mobile apps for Android and iOS from a single codebase — a perfect companion to your web platform.',
    },
    {
      question: 'In which languages can you deliver websites?',
      answer:
        'German, English, and Turkish are standard. Additional languages can be added seamlessly thanks to next-intl and our i18n architecture.',
    },
    {
      question: 'How does the collaboration process work?',
      answer:
        'Discovery call, proposal, milestone plan. You receive regular updates, staging links, and feedback rounds. Communication via email, Slack, or video call.',
    },
    {
      question: 'Do you provide SEO optimization?',
      answer:
        'Technical SEO — server-side rendering, structured data, Core Web Vitals, meta tags, and sitemaps — is included with every delivery.',
    },
    {
      question: 'Where do you host the projects?',
      answer:
        'On European VPS servers with Docker, Nginx, and PM2. GDPR-compliant infrastructure is standard.',
    },
    {
      question: 'Can I manage content myself after launch?',
      answer:
        'Yes — every project comes with an admin panel where you can manage texts, images, blog posts, and SEO metadata without any coding skills.',
    },
    {
      question: 'Which payment methods do you integrate?',
      answer:
        'Stripe, Iyzipay, PayPal, and other gateways — depending on your market and requirements. PCI-compliant implementation.',
    },
    {
      question: 'Is there a money-back guarantee?',
      answer:
        'Milestone-based billing protects both sides: you only pay after acceptance of the respective milestone deliverable.',
    },
  ],
  tr: [
    {
      question: 'Profesyonel bir web sitesi ne kadar tutar?',
      answer:
        'Kapsam, entegrasyonlar ve takvime göre değişir. Kısa bir keşif görüşmesinden sonra net kapsamlı sabit fiyat veya sprint teklifi paylaşılır.',
    },
    {
      question: 'Geliştirme ne kadar sürer?',
      answer:
        'Tanıtım siteleri genelde 3–6 hafta; admin ve API içeren platformlar tipik olarak 8–16 hafta. Kilometre taşları önceden planlanır.',
    },
    {
      question: 'Hangi teknolojileri kullanıyorsunuz?',
      answer:
        'Next.js, React, TypeScript, sunucuda Fastify veya Laravel, MySQL (Drizzle/Eloquent), mobilde Flutter, üretimde Docker/Nginx.',
    },
    {
      question: 'Bakım sunuyor musunuz?',
      answer:
        'Evet — izleme, güvenlik yamaları, bağımlılık güncellemeleri ve küçük özellikler retainer veya bilet bazlı.',
    },
    {
      question: 'Mevcut web sitelerini yenileyebilir misiniz?',
      answer:
        'Miras kod devralma, refactor ve kademeli modernizasyon ana hizmetlerden — veri göçü ve SEO güvenli geçişler dahil.',
    },
    {
      question: 'Hangi sektörlere hizmet veriyorsunuz?',
      answer:
        'E-ticaretten sanayiye, gastronomi, gayrimenkul ve tarıma kadar — çözüm sektörünüze özel olarak şekillendirilir.',
    },
    {
      question: 'Mobil uygulama da geliştiriyor musunuz?',
      answer:
        'Evet, Flutter ile tek kod tabanından Android ve iOS için platformlar arası mobil uygulamalar geliştiriyorum — web platformunuzla mükemmel entegre.',
    },
    {
      question: 'Web sitelerini hangi dillerde teslim edebilirsiniz?',
      answer:
        'Almanca, İngilizce ve Türkçe standarttır. next-intl ve i18n mimarimiz sayesinde ek diller sorunsuzca eklenebilir.',
    },
    {
      question: 'İş birliği süreci nasıl işliyor?',
      answer:
        'Keşif görüşmesi, teklif, kilometre taşı planı. Düzenli güncellemeler, staging linkleri ve geri bildirim turları alırsınız. İletişim e-posta, Slack veya video görüşme ile.',
    },
    {
      question: 'SEO optimizasyonu sunuyor musunuz?',
      answer:
        'Teknik SEO — sunucu taraflı render, yapısal veri, Core Web Vitals, meta etiketler ve site haritası — her teslimatın parçasıdır.',
    },
    {
      question: 'Projeleri nerede barındırıyorsunuz?',
      answer:
        'Docker, Nginx ve PM2 ile Avrupa VPS sunucularında. KVKK/GDPR uyumlu altyapı standarttır.',
    },
    {
      question: 'Yayından sonra içerikleri kendim yönetebilir miyim?',
      answer:
        'Evet — her proje bir admin paneli ile gelir; metinler, görseller, blog yazıları ve SEO verileri kodlama bilgisi gerektirmeden yönetilebilir.',
    },
    {
      question: 'Hangi ödeme yöntemlerini entegre ediyorsunuz?',
      answer:
        'Stripe, Iyzipay, PayPal ve diğer ödeme geçitleri — pazarınıza ve gereksinimlerinize göre. PCI uyumlu implementasyon.',
    },
    {
      question: 'Para iade garantisi var mı?',
      answer:
        'Kilometre taşı bazlı faturalandırma her iki tarafı korur: ilgili kilometre taşı teslimatının kabulünden sonra ödeme yapılır.',
    },
  ],
};
