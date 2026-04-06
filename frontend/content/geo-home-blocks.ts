/**
 * Homepage GEO blocks (FAZ 2.1): stats + tech stack + mini FAQ — server-rendered copy per locale.
 */

export type HomeStat = { value: string; label: string };

export type HomeTechCategory = { category: string; items: string[] };

export type HomeMiniFaq = { question: string; answer: string };

export type HomeGeoBlocksCopy = {
  statsHeading: string;
  stats: HomeStat[];
  techHeading: string;
  techIntro: string;
  tech: HomeTechCategory[];
  whyHeading: string;
  faqs: HomeMiniFaq[];
};

export const homeGeoBlocks: Record<string, HomeGeoBlocksCopy> = {
  de: {
    statsHeading: 'Zahlen, die für Klarheit im Projekt stehen',
    stats: [
      { value: '11+', label: 'Referenzprojekte & Live-Systeme' },
      { value: '9+', label: 'Langjährige Kundenbeziehungen' },
      { value: '3', label: 'Sprachen: DE / EN / TR' },
      { value: '5+', label: 'Jahre Fokus auf Next.js & React' },
    ],
    techHeading: 'Technologie-Stack (ausgewählt)',
    techIntro:
      'Statt Mode-Buzzwords setze ich auf bewährte, gut betreute Ökosysteme — von typisierten APIs bis zu skalierbaren Frontends.',
    tech: [
      {
        category: 'Frontend & Experience',
        items: ['Next.js (App Router)', 'React 19', 'TypeScript (strict)', 'Tailwind CSS', 'Framer Motion'],
      },
      {
        category: 'Backend & APIs',
        items: ['Fastify', 'Laravel 12', 'REST/OpenAPI', 'JWT & Refresh', 'MySQL'],
      },
      {
        category: 'Mobile & Delivery',
        items: ['Flutter', 'Docker', 'Nginx', 'GitHub Actions / CI'],
      },
    ],
    whyHeading: 'Warum mit mir arbeiten?',
    faqs: [
      {
        question: 'Arbeiten Sie remote oder vor Ort?',
        answer:
          'Überwiegend remote mit klaren Sprint-Zielen und wöchentlichen Check-ins. Bei Bedarf sind Workshops oder Reviews in NRW möglich — Absprache im Projekt.',
      },
      {
        question: 'Wie sieht ein typisches Vorgehen aus?',
        answer:
          'Kurze Discovery (Ziele, Risiken, bestehende Systeme), dann Architektur & API-Verträge, iterative Lieferung mit sichtbaren Meilensteinen und dokumentierter Übergabe.',
      },
      {
        question: 'Übernehmen Sie Bestandsprojekte?',
        answer:
          'Ja. Ich analysiere Legacy-Code, priorisiere technische Schulden und plane Migrationen (z. B. schrittweise Next.js-Einführung oder API-Entkopplung) ohne unnötige Big-Bang-Rewrites.',
      },
      {
        question: 'Welche Branchen betreuen Sie?',
        answer:
          'Schwerpunkt: E-Commerce, B2B-Portale, Buchung/Service-Ops, interne Admin-Tools und mehrsprachige Marketing-Sites für Teams in Deutschland und Europa.',
      },
    ],
  },
  en: {
    statsHeading: 'Numbers that keep delivery predictable',
    stats: [
      { value: '11+', label: 'Live projects & references' },
      { value: '9+', label: 'Long-term client relationships' },
      { value: '3', label: 'Languages: DE / EN / TR' },
      { value: '5+', label: 'Years focused on Next.js & React' },
    ],
    techHeading: 'Technology stack (selected)',
    techIntro:
      'I rely on mature, well-maintained ecosystems—from typed APIs to scalable frontends—instead of chasing hype.',
    tech: [
      {
        category: 'Frontend & experience',
        items: ['Next.js (App Router)', 'React 19', 'TypeScript (strict)', 'Tailwind CSS', 'Framer Motion'],
      },
      {
        category: 'Backend & APIs',
        items: ['Fastify', 'Laravel 12', 'REST/OpenAPI', 'JWT & refresh tokens', 'MySQL'],
      },
      {
        category: 'Mobile & delivery',
        items: ['Flutter', 'Docker', 'Nginx', 'GitHub Actions / CI'],
      },
    ],
    whyHeading: 'Why work with me?',
    faqs: [
      {
        question: 'Do you work remotely or on-site?',
        answer:
          'Mostly remote with clear sprint goals and weekly checkpoints. Workshops or reviews in NRW are possible when it helps—aligned per project.',
      },
      {
        question: 'What does a typical engagement look like?',
        answer:
          'Short discovery (goals, risks, existing systems), then architecture & API contracts, iterative delivery with visible milestones, and a documented handover.',
      },
      {
        question: 'Do you take over legacy projects?',
        answer:
          'Yes. I review existing code, prioritize technical debt, and plan migrations (e.g. incremental Next.js adoption or API decoupling) without risky big-bang rewrites.',
      },
      {
        question: 'Which industries do you serve?',
        answer:
          'Focus areas: e-commerce, B2B portals, booking/service operations, internal admin tools, and multilingual marketing sites for teams in Germany and Europe.',
      },
    ],
  },
  tr: {
    statsHeading: 'Teslimatı öngörülebilir kılan rakamlar',
    stats: [
      { value: '11+', label: 'Canlı proje ve referans' },
      { value: '9+', label: 'Uzun soluklu müşteri ilişkisi' },
      { value: '3', label: 'Dil: DE / EN / TR' },
      { value: '5+', label: 'Next.js ve React odağı (yıl)' },
    ],
    techHeading: 'Teknoloji yığını (seçilmiş)',
    techIntro:
      'Moda terimleri yerine; tip güvenli API’lerden ölçeklenebilir arayüzlere kadar olgun ve iyi bakılan ekosistemlere yatırım yapıyorum.',
    tech: [
      {
        category: 'Frontend ve deneyim',
        items: ['Next.js (App Router)', 'React 19', 'TypeScript (strict)', 'Tailwind CSS', 'Framer Motion'],
      },
      {
        category: 'Backend ve API',
        items: ['Fastify', 'Laravel 12', 'REST/OpenAPI', 'JWT ve yenileme', 'MySQL'],
      },
      {
        category: 'Mobil ve yayın',
        items: ['Flutter', 'Docker', 'Nginx', 'GitHub Actions / CI'],
      },
    ],
    whyHeading: 'Neden birlikte çalışalım?',
    faqs: [
      {
        question: 'Uzaktan mı çalışıyorsunuz, yüz yüze mi?',
        answer:
          'Ağırlıklı olarak uzaktan; net sprint hedefleri ve haftalık kontrollerle ilerliyoruz. Gerekirse NRW bölgesinde workshop veya review mümkün — proje bazında netleşir.',
      },
      {
        question: 'Tipik süreç nasıl işler?',
        answer:
          'Kısa keşif (hedefler, riskler, mevcut sistemler), ardından mimari ve API sözleşmeleri, görünür kilometre taşlarıyla iteratif teslim ve dokümante devir.',
      },
      {
        question: 'Mevcut projeleri devralıyor musunuz?',
        answer:
          'Evet. Legacy kodu inceler, teknik borcu önceliklendirir ve riskli tek seferde rewrite yerine aşamalı geçiş (ör. kademeli Next.js veya API ayrıştırma) planlarım.',
      },
      {
        question: 'Hangi sektörlere hizmet veriyorsunuz?',
        answer:
          'Odak: e-ticaret, B2B portallar, rezervasyon/servis operasyonları, iç yönetim araçları ve Almanya ile Avrupa ekipleri için çok dilli kurumsal siteler.',
      },
    ],
  },
};
