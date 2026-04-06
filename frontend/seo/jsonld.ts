// src/seo/jsonld.ts
export type Thing = Record<string, unknown>;

export function graph(items: Thing[]): Thing {
  // Google, @graph formatını sever; çoklu schema objesini tek scriptte basmak için idealdir.
  return {
    '@context': 'https://schema.org',
    '@graph': Array.isArray(items) ? items : [],
  };
}

export function sameAsFromSocials(socials?: Record<string, unknown> | null): string[] {
  const s = socials && typeof socials === 'object' ? socials : {};
  const urls: string[] = [];

  for (const key of Object.keys(s)) {
    const raw = (s as any)[key];
    const v = typeof raw === 'string' ? raw.trim() : String(raw ?? '').trim();
    if (!v) continue;

    // Sadece http(s) olanları al
    if (!/^https?:\/\//i.test(v)) continue;

    urls.push(v);
  }

  // uniq
  return Array.from(new Set(urls));
}

export function org(input: {
  id?: string; // e.g. "https://site.com/#org"
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  description?: string;
  founderId?: string;
  foundingDate?: string;
  areaServed?: string[];
  knowsAbout?: string[];
  email?: string;
  telephone?: string;
}): Thing {
  return {
    '@type': 'Organization',
    ...(input.id ? { '@id': input.id } : {}),
    name: input.name,
    url: input.url,
    ...(input.logo ? { logo: input.logo } : {}),
    ...(input.sameAs?.length ? { sameAs: input.sameAs } : {}),
    ...(input.description ? { description: input.description } : {}),
    ...(input.founderId ? { founder: { '@id': input.founderId } } : {}),
    ...(input.foundingDate ? { foundingDate: input.foundingDate } : {}),
    ...(input.areaServed?.length ? { areaServed: input.areaServed } : {}),
    ...(input.knowsAbout?.length ? { knowsAbout: input.knowsAbout } : {}),
    ...(input.email ? { email: input.email } : {}),
    ...(input.telephone ? { telephone: input.telephone } : {}),
  };
}

export function website(input: {
  id?: string; // e.g. "https://site.com/#website"
  name: string;
  url: string;
  publisherId?: string; // org @id reference
  searchUrlTemplate?: string;
}): Thing {
  const base: Thing = {
    '@type': 'WebSite',
    ...(input.id ? { '@id': input.id } : {}),
    name: input.name,
    url: input.url,
    ...(input.publisherId ? { publisher: { '@id': input.publisherId } } : {}),
  };

  if (input.searchUrlTemplate) {
    (base as any).potentialAction = {
      '@type': 'SearchAction',
      target: input.searchUrlTemplate,
      'query-input': 'required name=q',
    };
  }

  return base;
}

export function product(input: {
  name: string;
  description?: string;
  image?: string | string[];
  sku?: string;
  brand?: string;
  offers?:
    | {
        price: number;
        priceCurrency: string;
        availability?: string;
        url?: string;
      }
    | Array<{
        price: number;
        priceCurrency: string;
        availability?: string;
        url?: string;
      }>;
}): Thing {
  return { '@context': 'https://schema.org', '@type': 'Product', ...input };
}

export function article(input: {
  headline: string;
  description?: string;
  image?: string | string[];
  url?: string;
  datePublished?: string;
  dateModified?: string;
  author?: { name: string; url?: string };
  publisher?: { '@id': string; name?: string };
}): Thing {
  const authorBlock =
    input.author && input.author.name
      ? {
          '@type': 'Person',
          name: input.author.name,
          ...(input.author.url ? { url: input.author.url } : {}),
        }
      : undefined;

  const publisherBlock = input.publisher
    ? {
        '@type': 'Organization',
        '@id': input.publisher['@id'],
        ...(input.publisher.name ? { name: input.publisher.name } : {}),
      }
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    ...(input.description ? { description: input.description } : {}),
    ...(input.url
      ? {
          url: input.url,
          mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
        }
      : {}),
    ...(input.image ? { image: input.image } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(authorBlock ? { author: authorBlock } : {}),
    ...(publisherBlock ? { publisher: publisherBlock } : {}),
  };
}

export function creativeWork(input: {
  name: string;
  description?: string;
  url: string;
  image?: string | string[];
  datePublished?: string;
  creatorId?: string;
}): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    url: input.url,
    ...(input.image ? { image: input.image } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.creatorId ? { creator: { '@id': input.creatorId } } : {}),
  };
}

export function breadcrumb(items: Array<{ name: string; item: string }>): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
}

export function person(input: {
  id: string;
  name: string;
  jobTitle?: string;
  url: string;
  image?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  worksForId?: string;
  alumniOf?: string;
  address?: { locality?: string; region?: string; country?: string };
}): Thing {
  return {
    '@type': 'Person',
    '@id': input.id,
    name: input.name,
    ...(input.jobTitle ? { jobTitle: input.jobTitle } : {}),
    url: input.url,
    ...(input.image ? { image: input.image } : {}),
    ...(input.sameAs?.length ? { sameAs: input.sameAs } : {}),
    ...(input.knowsAbout?.length ? { knowsAbout: input.knowsAbout } : {}),
    ...(input.worksForId ? { worksFor: { '@id': input.worksForId } } : {}),
    ...(input.alumniOf
      ? { alumniOf: { '@type': 'EducationalOrganization', name: input.alumniOf } }
      : {}),
    ...(input.address
      ? {
          address: {
            '@type': 'PostalAddress',
            ...(input.address.locality ? { addressLocality: input.address.locality } : {}),
            ...(input.address.region ? { addressRegion: input.address.region } : {}),
            ...(input.address.country ? { addressCountry: input.address.country } : {}),
          },
        }
      : {}),
  };
}

export function faqPage(items: Array<{ question: string; answer: string }>): Thing {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.answer,
      },
    })),
  };
}

export function professionalService(input: {
  id: string;
  name: string;
  url: string;
  founderId?: string;
  areaServed?: string[];
  knowsLanguage?: string[];
  priceRange?: string;
}): Thing {
  return {
    '@type': 'ProfessionalService',
    '@id': input.id,
    name: input.name,
    url: input.url,
    ...(input.founderId ? { founder: { '@id': input.founderId } } : {}),
    ...(input.areaServed?.length ? { areaServed: input.areaServed } : {}),
    ...(input.knowsLanguage?.length ? { knowsLanguage: input.knowsLanguage } : {}),
    ...(input.priceRange ? { priceRange: input.priceRange } : {}),
  };
}

/** ProfessionalService @id + AggregateRating + Review nodes (same @id merges with site graph). */
export function testimonialsReviewGraph(input: {
  professionalServiceId: string;
  siteName: string;
  canonicalBase: string;
  reviews: Array<{
    authorName: string;
    reviewBody: string;
    ratingValue: number;
    datePublished?: string;
  }>;
}): Thing | null {
  const { professionalServiceId, siteName, canonicalBase, reviews } = input;
  if (!reviews.length) {
    return null;
  }

  const ratingSum = reviews.reduce((s, r) => s + r.ratingValue, 0);
  const count = reviews.length;
  const avg = Math.round((ratingSum / count) * 10) / 10;

  const nodes: Thing[] = [
    {
      '@type': 'ProfessionalService',
      '@id': professionalServiceId,
      name: siteName,
      url: canonicalBase,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(avg),
        reviewCount: String(count),
        bestRating: '5',
        worstRating: '1',
      },
    },
  ];

  for (const r of reviews) {
    nodes.push({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.authorName },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.ratingValue,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.reviewBody,
      itemReviewed: { '@id': professionalServiceId },
      ...(r.datePublished ? { datePublished: r.datePublished } : {}),
    });
  }

  return graph(nodes);
}
