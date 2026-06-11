'use client';

import dynamic from 'next/dynamic';

import type {
  BrandsGroupedResponse,
  ResumeGroupedResponse,
  ServiceDto,
} from '@/integrations/shared';

type Props = {
  locale: string;
  initialServices?: ServiceDto[];
  initialResume?: ResumeGroupedResponse | null;
  initialBrands?: BrandsGroupedResponse | null;
};

const SectionPlaceholder = ({ minHeight }: { minHeight: number }) => (
  <div style={{ minHeight }} aria-hidden="true" />
);

const Static1 = dynamic(() => import('@/components/sections/Static1'), {
  ssr: false,
  loading: () => <SectionPlaceholder minHeight={260} />,
});
const Service1 = dynamic(() => import('@/components/sections/Service1'), {
  loading: () => <SectionPlaceholder minHeight={280} />,
});
const Projects1 = dynamic(() => import('@/components/sections/Projects1'), {
  loading: () => <SectionPlaceholder minHeight={360} />,
});
const Resume1 = dynamic(() => import('@/components/sections/Resume1'), {
  loading: () => <SectionPlaceholder minHeight={320} />,
});
const Skills1 = dynamic(() => import('@/components/sections/Skills1'), {
  ssr: false,
  loading: () => <SectionPlaceholder minHeight={240} />,
});
const Brands1 = dynamic(() => import('@/components/sections/Brands1'), {
  loading: () => <SectionPlaceholder minHeight={200} />,
});
const Blog1 = dynamic(() => import('@/components/sections/Blog1'), {
  loading: () => <SectionPlaceholder minHeight={280} />,
});
const Contact1 = dynamic(() => import('@/components/sections/Contact1'), {
  ssr: false,
  loading: () => <SectionPlaceholder minHeight={220} />,
});

export default function HomeSections({
  locale,
  initialServices,
  initialResume,
  initialBrands,
}: Props) {
  return (
    <>
      <Static1 locale={locale} />
      <Service1 locale={locale} initialData={initialServices} />
      <Projects1 locale={locale} />
      <Resume1 locale={locale} initialData={initialResume} />
      <Skills1 locale={locale} />
      <Brands1 locale={locale} initialData={initialBrands} />
      <Blog1 locale={locale} />
      <Contact1 />
    </>
  );
}
