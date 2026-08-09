# Bionluk İlanları — EN Çeviri Kalite Denetimi ve Düzeltilmiş Çeviriler (WP-7.2)

Tarih: 2026-07-10 · Kaynaklar: `docs/bionluk/gigs-raw.json` (orijinal TR), `backend/src/db/seed/sql/027_bionluk_services_seed.sql` (mevcut EN), `docs/bionluk/CEVIRI_GEREKLI.md`, `docs/bionluk/overrides.json`.

## 1. Denetim özeti

Mevcut durumda 16 ilanın TAMAMINDA EN içerik, seed generator'ın otomatik stub'ı: başlık `I provide <TR başlık>` (yarı Türkçe), özet/meta jenerik placeholder ("Custom digital service by GZL Technology..."), gövde `English translation required for ...`, paket başlık/açıklamaları TR fallback. Yani ortada düzeltilecek bir makine çevirisi bile yok; 16 ilanın 16'sı sıfırdan yazıldı. Kaynak TR metinlerdeki pazaryeri tonu ("Merhaba!", birinci tekil, ✅🛠️🚀 emojileri) EN'de kurumsal çoğul tona çevrildi; teknik kapsam maddeleri, teknoloji listeleri ve KPI rakamları birebir korundu.

| # | Gig ID | EN slug | Mevcut EN durumu | Ana sorunlar / notlar |
|---|--------|---------|------------------|------------------------|
| 1 | 861468 | `lead-generation-competitor-monitoring-dashboard` | yeniden yazıldı | Yarı-Türkçe stub başlık + placeholder özet; içerik gövdesi hiç çevrilmemiş; paket EN = TR fallback |
| 2 | 861494 | `social-media-automation-dashboard` | yeniden yazıldı | Aynı stub kalıbı; pazaryeri tonu ("Merhaba.", birinci tekil) kaynak TR'de; EN sıfırdan yazıldı |
| 3 | 850998 | `geo-seo-lighthouse-audit` | yeniden yazıldı | Stub; TR'deki "Google'da değil" ifadesi "not only on Google" olarak amaca göre çevrildi |
| 4 | 861502 | `ai-ml-data-forecasting-platform` | yeniden yazıldı | Stub; teknik terimler (GEBV, GWAS, MLflow, sommer) aynen korundu |
| 5 | 861509 | `amazon-price-scraping-system` | yeniden yazıldı | Stub; AL/TAKİP/UZAK DUR → BUY/WATCH/AVOID; "confidence honesty" terimi korundu |
| 6 | 861515 | `generative-engine-optimization-geo` | yeniden yazıldı | Stub; emoji ve ✅/► işaretleri kaldırıldı, kapsam maddeleri birebir korundu |
| 7 | 861532 | `ga4-gtm-conversion-tracking` | yeniden yazıldı | Stub; KVKK/GDPR, sGTM, Consent Mode v2 teknik kapsamı aynen korundu |
| 8 | 861536 | `google-maps-data-scraping-bot` | yeniden yazıldı | Stub; yasal kullanım notu (herkese açık veri) EN'de de korundu |
| 9 | 861114 | `custom-erp-software` | yeniden yazıldı | Stub; birinci tekil → kurumsal çoğul, tüm modül listesi korundu |
| 10 | 796863 | `online-ordering-system` | yeniden yazıldı | Stub; kısa TR metin madde yapısıyla EN'e taşındı |
| 11 | 800224 | `ubuntu-vps-setup-deployment` | yeniden yazıldı | Stub; kişisel tanıtım ("Ben Orhan Güzel...") kurumsal girişle değiştirildi, tüm KPI/SLA rakamları korundu |
| 12 | 825066 | `quotation-reporting-web-page` | yeniden yazıldı | Stub; TR kaynakta yazım hataları vardı ("Iletmeye"), EN'de düzeltilmiş anlamla yazıldı |
| 13 | 825070 | `real-estate-listing-website` | yeniden yazıldı | Stub; "sarı sitelerin bütün özellikleri" → "leading real estate listing portals" olarak markasız çevrildi |
| 14 | 825076 | `seo-service` | yeniden yazıldı | Stub; 20 maddelik teknik SEO listesi birebir çevrildi, giriş cümlesi eklendi |
| 15 | 840180 | `modern-ecommerce-website` | yeniden yazıldı | Stub; kısa kurumsal metin, birinci tekil → çoğul |
| 16 | 840182 | `appointment-corporate-website` | yeniden yazıldı | Stub; kısa kurumsal metin, birinci tekil → çoğul |

Özet: 16 incelendi · 0 iyi · 0 orta · **16 yeniden yazıldı** · 16 ilan için toplam **42 paket** başlık+açıklama çevirisi dolduruldu (850998, 825066 ve 825076'da kaynakta yalnızca basic paket dolu; standard/premium boş olduğundan generator bunları zaten atlıyor).

## 2. overrides.json bloğu

Aşağıdaki blok `docs/bionluk/overrides.json` içindeki mevcut `gigs.<id>` girdileriyle **derin birleştirilecek** (mevcut `slug` alanları korunur; bu blok yalnızca değişen/yeni alanları içerir: `title_en`, `description_en`, `packages.<tier>.title_en/description_en`). Alan adları `scripts/generate-bionluk-seeds.mjs`'in okuduğu şemayla birebir uyumludur. `description_en` düz metin + `\n` satır sonu formatındadır — generator TR tarafında `<br>`'ı `\n`'e çevirip `content.html`'e öyle yazdığı için EN alan formatı da aynıdır (generator `description_en`'i olduğu gibi kullanır).

```json
{
  "gigs": {
    "861468": {
      "title_en": "Custom B2B Lead Generation & Competitor Monitoring Dashboard",
      "description_en": "We build a custom B2B lead generation and market monitoring platform that lets you track prospects and competitors from a single dashboard. The system is tailored to your industry — automotive suppliers, plastic injection, machinery, export businesses and more.\n\nWHAT WE DELIVER\n\n- Lead Machine — automated prospect generation from Amazon seller scans, B2B directories (Europages/Kompass/Google Maps) and trade fair exhibitor lists\n- ICP (ideal customer profile) matching with 0–100 scoring\n- Lead pipeline — kanban board (New → In Contact → Quoted → Converted)\n- Churn risk score — calculated automatically from signals, activity and order data\n- Market signals — competitor website/price changes and social activity tracking (automated via scrapers)\n- Decision-maker email discovery (enrichment) plus AI-assisted outreach email drafts\n- Weekly PDF report with email notifications\n- Integration with your existing ERP/CRM\n\nTECHNOLOGY\n\nNext.js 16, React 19, TypeScript, Tailwind, Fastify, MySQL, Python scrapers, Docker. Each client gets a separate, standalone deployment — your data remains exclusively yours.\n\nHOW WE WORK\n\n1) Discovery call to define your target industry and ICP\n2) Demo dashboard and scope approval\n3) Development and scraper source setup\n4) Testing, training and go-live\n\nMarketPulse in our portfolio is a live, end-to-end deployment of this system. Message us with your scope and budget and we will prepare a clear, project-specific proposal.",
      "packages": {
        "basic": {
          "title_en": "BASIC — 20,000 ₺",
          "description_en": "Lead generation + tracking dashboard for a single industry. ICP matching from one channel of your choice (Amazon, B2B directory or trade fairs)."
        },
        "standard": {
          "title_en": "STANDARD — 30,000 ₺",
          "description_en": "Everything in BASIC + 300 prospects from 2 sources, churn risk scoring, market signals (competitor site/price tracking) and decision-maker email discovery."
        },
        "premium": {
          "title_en": "PRO — 50,000 ₺",
          "description_en": "Everything in STANDARD + 1,000 prospects from 3 sources, automated scraper signals, AI outreach email drafts and ERP/CRM integration."
        }
      }
    },
    "861494": {
      "title_en": "Custom Social Media Automation Dashboard for Your Brand",
      "description_en": "We develop a custom web platform that lets your business plan, schedule and publish social media content from a single dashboard. Prepare posts in advance, place them on a calendar and measure their performance.\n\nWHAT WE DELIVER\n\n- Instagram, Facebook, LinkedIn, X and YouTube accounts managed from one dashboard (via the platforms' official APIs)\n- Content calendar and post scheduling (drag and drop, best-time suggestions)\n- Adapting a single piece of content to different platforms, with pre-publish preview\n- AI-assisted copy and hashtag suggestions (optional)\n- Content templates and hashtag groups\n- Core performance reporting (impressions, engagement, clicks)\n- Multi-user and multi-brand usage with role management\n\nHOW WE WORK\n\n1) Defining requirements and account scope\n2) Demo dashboard and approval\n3) Development and official API connections\n4) Testing, a short training session and handover\n\nThe software is deployed as a fully independent installation dedicated to you; your data stays with you. Technology stack: Next.js, React, Fastify, MySQL. Message us for scope and pricing.",
      "packages": {
        "basic": {
          "title_en": "BASIC — 15,000 ₺",
          "description_en": "Scheduled publishing and content calendar dashboard for a single brand on 2 platforms (e.g. Instagram + Facebook)."
        },
        "standard": {
          "title_en": "STANDARD — 25,000 ₺",
          "description_en": "Everything in BASIC + 4 platforms, 3 brands/accounts and an AI content assistant (copy & hashtags)."
        },
        "premium": {
          "title_en": "PRO — 45,000 ₺",
          "description_en": "Everything in STANDARD + 6+ platforms (Ads included), unlimited brands/accounts, multi-user & role management and GA4/Ads reporting."
        }
      }
    },
    "850998": {
      "title_en": "GEO + SEO + Lighthouse Audit for Your Website",
      "description_en": "We make your website visible not only on Google, but also in ChatGPT, Gemini and Perplexity.\n\nWhat is GEO (Generative Engine Optimization)?\nUsers increasingly reach information through AI assistants. GEO measures and improves how your site is perceived by these systems — and whether it gets cited.\n\nAUDIT SCOPE\n\nGEO & AI Visibility\n- AI citability score (0–100)\n- Readiness status for ChatGPT, Gemini, Perplexity and Google AI Overviews\n- AI crawler access review (GPTBot, ClaudeBot, PerplexityBot, etc.)\n- llms.txt standard compliance\n- Schema.org / JSON-LD structured data audit\n- Brand awareness and reference visibility across AI systems\n\nTechnical SEO\n- robots.txt, sitemap.xml and canonical URL checks\n- Meta tags, Open Graph, Twitter Card\n- Internal link structure and anchor text analysis\n- Index/noindex status\n\nLighthouse & Core Web Vitals\n- Performance score (LCP, INP, CLS metrics)\n- Mobile friendliness and accessibility\n- Resource optimization (JS, CSS, images)\n\nDELIVERED REPORT\nA professional PDF including score gauges, a platform-by-platform readiness table, a prioritized action plan and technical notes you can hand directly to your developer.\n\nSites we have previously audited include energetische-massage-bonn.de, paketjet.com, sportoonline.com, guezelwebdesign.com and more.\n\nA URL is all we need — no site access required.",
      "packages": {
        "basic": {
          "title_en": "Essential Audit",
          "description_en": "The audit includes findings plus an action plan."
        }
      }
    },
    "861502": {
      "title_en": "AI & ML Data Forecasting Platform Development",
      "description_en": "We build AI/ML-powered analytics and forecasting platforms that turn your data into predictions and decisions. End-to-end setup for R&D teams, agriculture/biotechnology organizations and data-intensive businesses.\n\nWHAT WE DELIVER\n\n- Machine learning prediction engine (regression/classification) — with confidence intervals\n- Python ML service (FastAPI, scikit-learn; R/sommer integration where needed)\n- Model versioning and experiment tracking (MLflow)\n- Big data processing (Parquet/DuckDB), CSV/VCF import and data quality checks\n- Interactive visualizations — distribution, bar, Manhattan/GWAS and PCA charts\n- AI/LLM interpretation layer (Groq/OpenAI) — explains results in plain language\n- Management dashboard: predictions, reporting, ranking/selection index\n- Automated retraining loop and audit trail\n\nTECHNOLOGY\n\nFastify, Bun, TypeScript, Drizzle ORM, MySQL · Python, FastAPI, scikit-learn, MLflow · Next.js 16, Tailwind, Shadcn UI · Docker. Dedicated, standalone deployment for your organization.\n\nHOW WE WORK\n\n1) Defining your data and target metrics\n2) Demo model + scope approval\n3) Development, model training and validation\n4) Dashboard delivery, training and go-live\n\nOur reference project is GenomAI — a genomic prediction (GEBV) and GWAS platform for plant breeding. Message us for a clear, project-specific proposal.",
      "packages": {
        "basic": {
          "title_en": "Forecasting Dashboard",
          "description_en": "One ML forecasting model (regression/classification) for a single dataset + confidence intervals, results table and basic visualizations."
        },
        "standard": {
          "title_en": "ML Analytics System",
          "description_en": "Everything in BASIC + 3 models, model versioning (MLflow), advanced visualizations (Manhattan/PCA/distribution) and CSV/VCF import."
        },
        "premium": {
          "title_en": "Full AI Platform",
          "description_en": "Everything in STANDARD + unlimited models, automated retraining loop, AI/LLM interpretation layer and ranking/selection index."
        }
      }
    },
    "861509": {
      "title_en": "Amazon Product & Price Scraping System",
      "description_en": "We build dashboards for e-commerce and Amazon research that collect data (scraping), score it with AI and turn it into decisions. An end-to-end system for product research, price tracking and competitor analysis.\n\nWHAT WE DELIVER\n\n- Amazon / e-commerce scraping (Oxylabs and similar) — search results, product details, ASIN deduplication\n- Price history enrichment (Keepa) and time series\n- Multi-dimensional risk/opportunity scoring engine\n- LLM cross-dimension reasoning — combining dimensions into an explainable decision (BUY / WATCH / AVOID)\n- Confidence honesty: hedged \"estimated\" language plus coverage checks when data is thin or missing\n- Decision/thesis tracking — automatic alerts when the premise behind a decision breaks down\n- Operator dashboard: single-screen scan flow, reporting, quota visibility\n- Scan cache reuse and API quota management\n\nTECHNOLOGY\n\nTypeScript, Bun, Next.js 16, React, MySQL · Oxylabs, Keepa, Groq/OpenAI LLM. Dedicated, standalone deployment — API subscriptions remain in your own accounts.\n\nHOW WE WORK\n\n1) Defining your target market/data and decision criteria\n2) Demo scan + scope approval\n3) Scraping + scoring + dashboard development\n4) Testing, training and go-live\n\nOur reference is Amozon — Amazon Commercial Radar. Message us for a clear, project-specific proposal.",
      "packages": {
        "basic": {
          "title_en": "Scraping Dashboard",
          "description_en": "Scraping for a single site/category + a dashboard listing the results. Search, product details and ASIN deduplication."
        },
        "standard": {
          "title_en": "Scoring System",
          "description_en": "Everything in BASIC + Keepa price history, multi-dimensional risk/opportunity scoring and LLM-assisted explainable decisions."
        },
        "premium": {
          "title_en": "Full Decision Radar",
          "description_en": "Everything in STANDARD + 5-dimension scoring, coverage gate (confidence honesty), thesis tracking with degradation alerts."
        }
      }
    },
    "861515": {
      "title_en": "Generative Engine Optimization (GEO) — Get Cited by ChatGPT & AI Search",
      "description_en": "People now search with ChatGPT, Perplexity, Gemini and Google AI Overviews alongside Google. We combine GEO (Generative Engine Optimization) with classic SEO so that your site gets found — and CITED — by these AI engines.\n\nWHAT WE DELIVER\n\n- GEO + SEO audit — 6-dimension score (citability, technical SEO, schema, E-E-A-T, AI crawlers, performance)\n- AI platform readiness analysis — ChatGPT, Perplexity, Gemini, AI Overviews, Bing Copilot\n- AI crawler access (GPTBot, PerplexityBot, Google-Extended, ClaudeBot) — robots/meta configuration\n- Schema.org / JSON-LD structured data (Article, FAQ, LocalBusiness, Breadcrumb)\n- llms.txt creation and publishing\n- Citable content — clear answer blocks, TL;DR summaries, FAQs\n- Technical SEO + Core Web Vitals (LCP, CLS, INP) improvements\n- E-E-A-T trust signals and brand mention (entity) work\n- PDF report + prioritized 30/60/90-day action plan\n\nHOW WE WORK\n\n1) Free preliminary analysis + GEO/SEO score\n2) Detailed report and scope approval\n3) Implementation — technical + content\n4) Verification, monitoring and reporting\n\nWe run this work on GeoSerra, our own GEO/SEO analysis platform. Message us for a quote tailored to your site type.",
      "packages": {
        "basic": {
          "title_en": "GEO + SEO Audit",
          "description_en": "AI-search readiness analysis of your site: 6-dimension GEO+SEO score, AI platform readiness and AI crawler access review."
        },
        "standard": {
          "title_en": "Audit + Implementation",
          "description_en": "Everything in BASIC + implementation: Schema.org/JSON-LD, llms.txt, AI crawler access configuration, technical SEO and Core Web Vitals improvements."
        },
        "premium": {
          "title_en": "Full GEO + SEO + Monitoring",
          "description_en": "Everything in STANDARD + full-site coverage, E-E-A-T and brand mention (entity) work, content implementation and a 30/60/90-day roadmap."
        }
      }
    },
    "861532": {
      "title_en": "GA4, GTM & Conversion Tracking Setup",
      "description_en": "We set up accurate data collection and conversion tracking on your website, so you can see exactly how many sales or leads each channel brings in — and the real ROAS of your ads.\n\nWHAT WE DELIVER\n\n- Google Analytics 4 (GA4) setup with correct event/conversion configuration\n- Google Tag Manager (GTM) container setup and tag management\n- Meta (Facebook/Instagram) Pixel + Conversions API (server-side)\n- Google Ads conversion tracking + GA4 import\n- E-commerce purchase & revenue tracking (enhanced e-commerce / purchase event)\n- Conversion funnels and event-based tracking\n- Consent Mode v2 (KVKK/GDPR cookie consent) compliance\n- Server-side tracking (sGTM) to reduce data loss\n- Channel / attribution and ROAS reporting setup\n- Testing, verification (DebugView, Tag Assistant) and a short usage training\n\nHOW WE WORK\n\n1) Audit of the current setup + defining target conversions\n2) GTM/GA4/Pixel/Ads configuration\n3) Testing, verification and go-live\n4) Reporting setup + training\n\nWe work with WordPress, Shopify, Ticimax, Ikas, custom builds and most other platforms. Message us for a clear quote.",
      "packages": {
        "basic": {
          "title_en": "GA4 + GTM Setup",
          "description_en": "Google Analytics 4 and Google Tag Manager setup, with basic page-view tracking and configuration of 1–2 conversion events."
        },
        "standard": {
          "title_en": "Conversion Tracking",
          "description_en": "Everything in BASIC + Meta Pixel, Google Ads conversion tracking, e-commerce purchase/revenue events and up to 5 conversion events."
        },
        "premium": {
          "title_en": "Full Tracking System",
          "description_en": "Everything in STANDARD + Meta Conversions API (server-side), sGTM, Consent Mode v2 (KVKK/GDPR) and channel/attribution & ROAS reporting."
        }
      }
    },
    "861536": {
      "title_en": "Google Maps & Website Data Scraping Bot",
      "description_en": "We build web scraping systems that extract the data you need from websites, Google Maps and B2B directories — whether you need a ready-to-use API or a one-time data extraction.\n\nWHAT WE DELIVER\n\n- Web scraping API / microservice (Python · FastAPI)\n- Data extraction from dynamic (JavaScript-rendered) pages with Playwright stealth mode\n- Solutions that work on Cloudflare and bot-protected sites\n- Google Maps business data (name, phone, address, rating, URL)\n- Scan profiles for B2B directories, trade fair exhibitors and competitor sites\n- E-commerce product/price tracking and change monitoring\n- Synchronous + asynchronous job queue (arq) and webhook callbacks (HMAC-signed)\n- Redis cache, Bearer token auth and daily quota management\n- CSV / JSON / Excel output or direct API integration\n- Deployment to your own server with Docker\n\nTECHNOLOGY\n\nPython, FastAPI, Scrapling, Playwright, Redis, arq, Docker.\n\nHOW WE WORK\n\n1) Defining target sites/data and fields\n2) Sample output (demo) + scope approval\n3) Development, testing and delivery\n4) Optional server deployment + maintenance\n\nNote: we only work with publicly available data that you are entitled to collect, in accordance with the target site's terms. Message us with your scope.",
      "packages": {
        "basic": {
          "title_en": "One-Time Data Extraction",
          "description_en": "The data you need (name, phone, address, price, etc.) extracted from a single website or Google Maps search and delivered."
        },
        "standard": {
          "title_en": "Custom Scraping Bot",
          "description_en": "A re-runnable custom scraping script for 1–3 sites: dynamic (JS) page support, stealth mode and scheduling."
        },
        "premium": {
          "title_en": "Scraping API System",
          "description_en": "A multi-source, production-ready scraping API: FastAPI endpoints, async job queue (arq) + HMAC webhooks and Playwright support."
        }
      }
    },
    "861114": {
      "title_en": "Custom ERP & Business Management Software",
      "description_en": "Would you like to run your entire business from a single dashboard? We develop custom ERP software that brings inventory, orders, production, accounts, invoicing and reporting together — not an off-the-shelf template, but a system designed around your workflow that grows as you do.\n\nBecause we build production-grade, multi-user enterprise systems, we get the hardest parts of ERP right from the start: multi-user data consistency, authorization and real-time synchronization.\n\nMODULES WE BUILD (AS NEEDED)\n\n- Inventory and warehouse management (including critical stock alerts)\n- Order, sales and purchasing tracking\n- Production / work order planning\n- Accounts, invoicing and payment tracking\n- User roles and permissions (multi-user)\n- Notification system (in-app / email)\n- Reporting and Excel export\n- Admin panel and mobile-friendly interface\n\nTECHNOLOGY\n\nNext.js + React, Fastify / Node.js, Drizzle ORM, PostgreSQL / Supabase or MySQL. We also handle server setup and go-live (VPS, Nginx); the product is delivered up and running.\n\nHOW WE WORK\n\nWe start with a requirements analysis and produce a clear scope and delivery plan. During development we regularly share a working preview and move forward together. After delivery, we remain available for bug fixes and ongoing development.\n\nTell us briefly about your business and your needs, and we will prepare a scope, timeline and price tailored to you.",
      "packages": {
        "basic": {
          "title_en": "Core ERP",
          "description_en": "Inventory + orders + accounts + admin panel. Multi-user core ERP, production deployment included."
        },
        "standard": {
          "title_en": "Extended ERP",
          "description_en": "Core ERP + production/work orders + invoicing + reporting + Excel export."
        },
        "premium": {
          "title_en": "Full ERP System",
          "description_en": "Complete ERP: all modules + multi-user authorization + notification system + reporting + production deployment."
        }
      }
    },
    "796863": {
      "title_en": "Online Ordering System with QR Menu for Restaurants",
      "description_en": "We build a multilingual QR menu and online ordering platform tailored to your restaurant, using Next.js (App Router) + TypeScript + Express + MongoDB.\n\nModules: categories/products, variants & extras, cart/coupons, delivery and takeaway, courier workflow, admin panel and reports.\n\nMobile and SEO friendly, performance-focused and secure (HTTP-only cookies).\n\nDelivery: live demo, source code (GitHub), concise documentation and installation support.\n\nOptional: payment integration (iyzico/Stripe), multi-location support, WhatsApp order button.\n\n4 revisions included; requests outside the agreed scope are quoted separately.",
      "packages": {
        "basic": {
          "title_en": "Basic — QR Menu + Simple Cart",
          "description_en": "Single location, single language. QR menu, product–variant–extras management and a simple cart. Standard theme, mobile/SEO friendly."
        },
        "standard": {
          "title_en": "Standard — Cart + Coupons + Multilingual",
          "description_en": "Single/multi location, 2 languages (TR + EN/DE). Cart + coupons, delivery and takeaway settings, basic reports. Theme color customization."
        },
        "premium": {
          "title_en": "Pro — Multi-Location + Courier + Payments",
          "description_en": "Multiple locations + delivery zones, courier/delivery workflow, coupons/campaigns, advanced reports. Custom component design. Payment integration."
        }
      }
    },
    "800224": {
      "title_en": "Ubuntu VPS Setup & Production Deployment",
      "description_en": "We deliver reliable, scalable and high-performance backend development and server setup services tailored to your needs.\n\nWHAT WE OFFER\n\nBackend development\n- Modular REST APIs with Node.js & Express\n- Secure authentication with JWT/tokens + RBAC\n- MongoDB (Mongoose) schema, index and query optimization\n- Real-time features (Socket.io/WebSocket)\n- File uploads and CDN/cloud storage (Cloudinary/S3)\n- Postman/Swagger documentation, optional Jest tests\n\nDevOps / go-live\n- Nginx (1.24+) reverse proxy on Ubuntu 22.04 LTS\n- Zero-downtime deploys with PM2 (cluster mode)\n- Let's Encrypt SSL with automatic renewal\n- DNS/domain management (A/AAAA, CNAME, TXT, SPF/DKIM/DMARC)\n- Logging & monitoring (pm2/nginx), backups and .env management\n\nCONCRETE KPIs & SLA (targets/benchmarks)\n- Uptime: 99.9% SLA\n- API p95 response time: < 200–400 ms (Express + correct indexing)\n- TTFB improvement: 30–60% (Nginx cache, brotli/gzip, keep-alive)\n- Deploy downtime: 0 s (PM2 reload/graceful)\n- RPS (example 2 vCPU VPS): 1k–3k req/s on read-heavy endpoints\n- 5xx error rate: < 0.5% (health checks + rate limiting)\n- Backups: daily (7-day) + weekly (4-week) retention\n- SSL renewal check: automatic cron every 60 days\n- Cold start to live: < 5 min (optional CI/CD)\n\nSECURITY DEFAULTS\n- OWASP Top 10-focused review\n- Rate limiting: default 100 requests/min/IP (configurable)\n- Passwords: bcrypt 12+ rounds; JWT access 15 min / refresh 7 days\n- Cookies: httpOnly, secure, sameSite; domain-scoped CORS\n\nENVIRONMENT & VERSIONS\nNode.js 18/20 LTS, Express, MongoDB 6/7, Nginx 1.24+, PM2 5.x, Ubuntu 22.04 LTS, Postman/Swagger, Git/GitHub.\n\nDELIVERABLES\n- Source code + README/runbook\n- Postman collection / Swagger\n- Nginx + PM2 configurations, SSL/DNS records\n- Short-term support (Q&A / minor fixes)\n\nIf you want an end-to-end, measurable solution for backend development or a production launch with Nginx + PM2 + DNS + SSL, let's bring your project live together.",
      "packages": {
        "basic": {
          "title_en": "Server Setup & Deployment (Single App)",
          "description_en": "Ubuntu 22.04 initial setup, user/SSH keys, UFW; Nginx reverse proxy + HTTP/2 + gzip/brotli; PM2."
        },
        "standard": {
          "title_en": "Backend + Database + Deployment",
          "description_en": "Everything in Basic + MongoDB (Mongoose) schemas & indexes, JWT/RBAC authentication and 8–12 REST endpoints."
        },
        "premium": {
          "title_en": "Production-Ready Infrastructure (End-to-End)",
          "description_en": "Everything in Standard + real-time (Socket.io), file uploads + CDN/S3/Cloudinary, staging + production environments."
        }
      }
    },
    "825066": {
      "title_en": "Quotation & Reporting Web Application for Businesses",
      "description_en": "We bring quotation preparation, job tracking and reporting for manufacturing and service businesses together in a single web-based system. We set up a company-specific admin panel and make the entire process — from quote to job to report — simple and clear. After setup, we provide usage training and onboarding support.",
      "packages": {
        "basic": {
          "title_en": "Starter",
          "description_en": "For small businesses."
        }
      }
    },
    "825070": {
      "title_en": "Custom Real Estate Listing Website",
      "description_en": "A real estate listing platform built specifically for your agency, deployed on your own domain and your own server:\n\n- Unlimited listings with advanced filtering\n- Visitor/end-user sign-up and member accounts\n- \"Featured listing\" showcase\n- Unlimited categories (For Sale, For Rent, Residential, Residence, Commercial, etc.)\n- All the capabilities you would expect from the leading real estate listing portals\n- Detailed search (by region, sale/rent, residential/commercial, price, listing detail, or quick title search)\n- Future-dated listing publication\n- Approval workflow — listings created by agents are approved by an authorized user\n- Plan photos, videos and listing details in advance and attach them to the listing\n- Property location pinning on Google Maps\n- YouTube video embedding\n- Demo account available for testing\n\nPlease get in touch for details.",
      "packages": {
        "basic": {
          "title_en": "Basic",
          "description_en": "A ready-to-use setup — enter your company details and start publishing right away."
        },
        "standard": {
          "title_en": "Standard",
          "description_en": "Customized for your company, with an adapted design."
        },
        "premium": {
          "title_en": "Professional",
          "description_en": "For established agencies with large portfolios, specialized in their market."
        }
      }
    },
    "825076": {
      "title_en": "SEO Service — Move Your Website Up the Search Rankings",
      "description_en": "Our SEO service covers:\n\n- Site speed optimization\n- Title, meta description and Open Graph tag optimization\n- Heading (H tag) hierarchy optimization\n- Index & noindex optimization\n- Nofollow optimization\n- Rich snippet optimization\n- Schema structured data optimization\n- Internal linking optimization\n- Sitemap optimization\n- Image SEO optimization\n- Robots.txt optimization\n- Anchor link optimization\n- Indexing API optimization\n- Breadcrumb optimization\n- Knowledge Graph optimization\n- 404 error optimization\n- Orphan page optimization\n- Pages-with-redirect-links optimization\n- Toxic backlink blocking\n- Detailed before/after report\n\n- We deliver a growth planning report outlining the path your site should follow to grow.\n- We also provide detailed guidance on how to run keyword analysis for the articles you plan to publish.",
      "packages": {
        "basic": {
          "title_en": "Basic",
          "description_en": "Entry level."
        }
      }
    },
    "840180": {
      "title_en": "Modern E-Commerce Website Development",
      "description_en": "We develop multilingual, multi-category e-commerce platforms using Next.js, React and Node.js. Our end-to-end full-stack solutions include product management, a cart system, a coupon module, multi-store infrastructure and payment integration. We deliver SEO-friendly, fast and scalable projects.",
      "packages": {
        "basic": {
          "title_en": "Starter Package",
          "description_en": "Single-language, essential e-commerce website. Product listing, cart and payment system included."
        },
        "standard": {
          "title_en": "Professional Package",
          "description_en": "Multi-category, multilingual e-commerce website. Admin panel, coupon and store system included."
        },
        "premium": {
          "title_en": "Enterprise Package",
          "description_en": "Full-scale e-commerce platform + iOS & Android mobile apps. SEO, analytics and custom integrations included."
        }
      }
    },
    "840182": {
      "title_en": "Corporate Website with Online Appointment Booking",
      "description_en": "We develop modern corporate websites for clinics, spas, beauty centers and healthcare professionals. Our end-to-end full-stack solutions include an online appointment booking module, calendar integration, multilingual support and an AI-powered chatbot. Your customers can book appointments 24/7, while you manage the entire process from the admin panel.",
      "packages": {
        "basic": {
          "title_en": "Starter Package",
          "description_en": "Single-language corporate website. Service pages and contact form included."
        },
        "standard": {
          "title_en": "Professional Package",
          "description_en": "Multilingual corporate website + online appointment booking system and calendar management included."
        },
        "premium": {
          "title_en": "Enterprise Package",
          "description_en": "Multilingual corporate website + online appointment system + AI-powered chatbot. Admin panel included."
        }
      }
    }
  }
}
```

## 3. Çevrilmeden bırakılan / karar gereken maddeler

1. **Kaynakta kesik paket açıklamaları:** Bionluk API paket açıklamalarını ~105 karakterde kesiyor; kesikler ilan gövdesindeki karşılığından tamamlandı:
   - 861468 standard "karar" → ana metindeki "karar verici e-posta bulma" maddesine dayanarak "decision-maker email discovery"; premium "ERP/C" → "ERP/CRM integration".
   - 861502 basic "temel g" → "basic visualizations"; standard "CS" → "CSV/VCF import"; premium "sıralama/seçim" → "ranking/selection index".
   - 861515 basic "AI cra" → "AI crawler access review"; standard "iyil" → "improvements"; premium "yol h" → "roadmap".
   - 861532 standard "5'e kadar" → "up to 5 conversion events" (ana metne dayalı tahmin); premium "RO" → "ROAS reporting".
   - 861536 premium "P" → "Playwright support" (ana metindeki teknoloji listesine dayalı).
   - 800224 basic başlık kaynakta kesik: "(Tek Uy" → "(Single App)"; premium "prod or" → "production environments".
   - 796863 standard "Tema renk/" → "Theme color customization"; premium "Ödeme" → "Payment integration".
2. **Belirsiz olduğu için ATILAN kesik kelimeler:** 861509 premium sonundaki "çoklu..." (çoklu pazar? çoklu kullanıcı?) tamamlanamadı, cümle bir önceki maddede bitirildi. 861494 premium "GA4/Ads" → "GA4/Ads reporting" olarak yorumlandı (entegrasyon da olabilir) — Orhan onaylamalı.
3. **Generator sınırlamaları (Codex için):** `services_i18n` EN satırındaki `content.packages` dizisi generator'da her zaman ham TR paketlerden üretiliyor (`normalizedPackage`) — EN paket çevirileri yalnızca `service_packages_i18n`'e (032 seed) gidiyor. EN `content.packages`'ın da çevrilmesi isteniyorsa generator'a ek gerekir. Aynı şekilde `service_packages_i18n` EN `features` JSON'u TR option başlıklarından üretiliyor ("Çalışma Saati: 40 saat", "Lead Kontrolü: Yok") ve override edilemiyor; EN `meta_keywords` sabit `GZL Technology,software,service`; EN `content.category/tags` TR kalıyor. Bunlar bu blokla düzelmez, generator değişikliği ister.
4. **Fiyat/para birimi:** Paket başlıklarındaki fiyatlar (₺, TRY) kaynaktaki gibi bırakıldı (861468/861494'te başlık içinde fiyat var; binlik ayracı EN kuralına göre virgüle çevrildi: "20,000 ₺"). EN sayfada TRY gösterimi iş kararı — istenirse başlıklardan fiyat tamamen çıkarılabilir.
5. **Özel adlar çevrilmedi:** MarketPulse, GenomAI, Amozon (Amazon Commercial Radar), GeoSerra, Keepa, Oxylabs, Scrapling, Ticimax, İkas (EN'de "Ikas"), sommer (R paketi), analiz edilen site alan adları.
6. **KVKK** EN metinde korundu ("Consent Mode v2 (KVKK/GDPR ...)") — Türkiye pazarına da hizmet verildiği sinyali olarak bilinçli bırakıldı.
7. **825070 "sarı siteler"** (sahibinden.com iması) marka anmadan "leading real estate listing portals" diye çevrildi.
8. **800224 kişisel tanıtım** ("Ben Orhan Güzel (Güzel Web Design / MetaHub)") kurumsal EN metinden çıkarıldı; ayrıca kaynakta premium paket fiyatı (1.000 ₺) standard'dan (5.000 ₺) düşük — kaynak veri hatası olabilir, Bionluk tarafında kontrol edilmeli.
9. **CEVIRI_GEREKLI.md** elle güncellenmedi: generator, override'lara `title_en`+`description_en` girildikten sonra `bun scripts/generate-bionluk-seeds.mjs` çalıştırılınca bu dosyayı otomatik boşaltacak.
