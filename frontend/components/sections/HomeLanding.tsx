import Image from 'next/image';
import Link from 'next/link';
import type { Project, ServiceDto, ProductDto, UiHomeCopy } from '@/integrations/shared';
import { sanitizeHtml } from '@/integrations/shared';
import { localizePath } from '@/i18n/routes';
import styles from './HomeLanding.module.css';

const COPY = {
  tr: {
    services: 'Hizmetlerimiz', servicesIntro: 'İhtiyacınıza uygun yazılım ve dijital çözümü birlikte tasarlıyoruz.',
    allServices: 'Tüm hizmetler', products: 'SaaS ürünlerimiz', productsIntro: 'İş süreçlerini hızlandıran, ölçülebilir ve ölçeklenebilir platformlar.',
    allProducts: 'Tüm ürünler', detail: 'Detayları incele', projects: 'Seçili projeler', projectsIntro: 'Üretime aldığımız platformlardan ve dijital çalışmalardan seçkiler.',
    allProjects: 'Tüm projeler', projectDetail: 'Projeyi incele', contactTitle: 'Projenizi birlikte netleştirelim.',
    contactText: 'İhtiyacınızı anlatın; kapsam, süre ve sonraki adımları açıkça paylaşalım.', contact: 'Projenizi anlatın', productsCta: 'SaaS ürünlerini keşfedin',
  },
  de: {
    services: 'Unsere Leistungen', servicesIntro: 'Software und digitale Lösungen, passend zu Ihren Abläufen.',
    allServices: 'Alle Leistungen', products: 'Unsere SaaS-Produkte', productsIntro: 'Messbare und skalierbare Plattformen für effizientere Prozesse.',
    allProducts: 'Alle Produkte', detail: 'Details ansehen', projects: 'Ausgewählte Projekte', projectsIntro: 'Eine Auswahl produktiver Plattformen und digitaler Projekte.',
    allProjects: 'Alle Projekte', projectDetail: 'Projekt ansehen', contactTitle: 'Lassen Sie uns Ihr Projekt konkretisieren.',
    contactText: 'Schildern Sie Ihren Bedarf; wir klären Umfang, Zeitrahmen und nächste Schritte.', contact: 'Projekt besprechen', productsCta: 'SaaS-Produkte entdecken',
  },
  en: {
    services: 'Our services', servicesIntro: 'Software and digital solutions shaped around your workflows.',
    allServices: 'All services', products: 'Our SaaS products', productsIntro: 'Measurable, scalable platforms that make operations faster.',
    allProducts: 'All products', detail: 'View details', projects: 'Selected projects', projectsIntro: 'A selection of platforms and digital products delivered to production.',
    allProjects: 'All projects', projectDetail: 'View project', contactTitle: 'Let’s make your project concrete.',
    contactText: 'Tell us what you need and we will clarify scope, timing, and next steps.', contact: 'Discuss your project', productsCta: 'Explore SaaS products',
  },
} as const;

function stripHtml(value: string | null | undefined) {
  return String(value ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function short(value: string | null | undefined, max = 145) {
  const clean = stripHtml(value);
  return clean.length > max ? `${clean.slice(0, max).trimEnd()}…` : clean;
}

export default function HomeLanding({
  locale, ui, services, products, projects,
}: {
  locale: string; ui: UiHomeCopy; services: ServiceDto[]; products: ProductDto[]; projects: Project[];
}) {
  const lang = locale.startsWith('tr') ? 'tr' : locale.startsWith('de') ? 'de' : 'en';
  const copy = COPY[lang];
  const route = (path: string) => `/${locale}${localizePath(locale, path)}`;
  const hero = ui.home1;
  const heroTitle = hero.title_html.replace(
    'GZL Teknoloji —',
    '<span class="gzl-home-brandline">GZL Teknoloji —</span>',
  );
  const heroImage = hero.hero_image || '/assets/imgs/guezel-showcase/workspace_guezel_web_design.webp';
  const preferredSlugs = ['geoserra', 'sosyal-medya-platformu', 'ihracat-radari'];
  const featuredProducts = preferredSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is ProductDto => Boolean(product));

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <div className="gzl-home-herogrid">
            <div className="gzl-home-herocopy">
              <h1 dangerouslySetInnerHTML={{ __html: sanitizeHtml(heroTitle) }} />
              <p>{short(hero.description, 210)}</p>
              <div className="gzl-home-ctas">
                <Link href={`/${locale}#contact`} className="btn btn-primary">{copy.contact}</Link>
                <Link href={route('/products')} className="btn btn-outline-secondary">{copy.productsCta}</Link>
              </div>
            </div>
            <div className="gzl-home-heromedia">
              <Image src={heroImage} alt={hero.hero_image_alt || 'Software workspace'} fill priority sizes="(max-width: 991px) 100vw, 55vw" className={styles.cover} />
            </div>
          </div>
        </div>
      </section>

      {services.length > 0 && (
        <section className={styles.section}>
          <div className="container">
            <div className="gzl-home-sectionlead">
              <div><h2>{copy.services}</h2><p>{copy.servicesIntro}</p></div>
              <Link href={route('/services')}>{copy.allServices} <i className="ri-arrow-right-line" /></Link>
            </div>
            <div className="gzl-home-servicelist">
              {services.slice(0, 4).map((service, index) => (
                <Link href={route(`/services/${service.slug}`)} className="gzl-home-servicerow" key={service.id}>
                  <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{service.name}</h3>
                  <p>{short(service.summary || service.content, 125)}</p>
                  <i className="ri-arrow-right-up-line" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {featuredProducts.length > 0 && (
        <section className={`${styles.section} gzl-home-altsection`}>
          <div className="container">
            <div className="gzl-home-sectionlead">
              <div><h2>{copy.products}</h2><p>{copy.productsIntro}</p></div>
              <Link href={route('/products')}>{copy.allProducts} <i className="ri-arrow-right-line" /></Link>
            </div>
            <div className="gzl-home-productgrid">
              {featuredProducts.map((product) => (
                <article className={styles.product} key={product.id}>
                  <Link href={route(`/products/${product.slug}`)} className="gzl-home-productmedia">
                    {product.cover_image_url && <Image src={product.cover_image_url} alt={product.title || copy.products} fill sizes="(max-width: 767px) 100vw, 33vw" className={styles.cover} />}
                  </Link>
                  <div className="gzl-home-productbody">
                    <h3>{product.title}</h3><p>{short(product.description, 120)}</p>
                    <Link href={route(`/products/${product.slug}`)}>{copy.detail} <i className="ri-arrow-right-line" /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className={styles.section}>
          <div className="container">
            <div className="gzl-home-sectionlead">
              <div><h2>{copy.projects}</h2><p>{copy.projectsIntro}</p></div>
              <Link href={route('/work')}>{copy.allProjects} <i className="ri-arrow-right-line" /></Link>
            </div>
            <div className="gzl-home-projectgrid">
              {projects.slice(0, 3).map((project) => (
                <Link href={route(`/work/${project.slug}`)} className={styles.project} key={project.id}>
                  <div className="gzl-home-projectmedia">
                    {project.featured_image && <Image src={project.featured_image} alt={project.featured_image_alt || project.title} fill sizes="(max-width: 767px) 100vw, 33vw" className={styles.cover} unoptimized={/^https?:\/\//i.test(project.featured_image)} />}
                  </div>
                  <div><h3>{project.title}</h3><span>{copy.projectDetail} <i className="ri-arrow-right-line" /></span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className={styles.contact}>
        <div className="container"><div className="gzl-home-contactinner">
          <div><h2>{copy.contactTitle}</h2><p>{copy.contactText}</p></div>
          <a href="mailto:info@gzlteknoloji.com" className={styles.email}>info@gzlteknoloji.com</a>
          <Link href={route('/contact')} className="btn btn-primary">{copy.contact}</Link>
        </div></div>
      </section>
    </main>
  );
}
