// frontend/components/blog/BlogCard3.tsx
import Link from 'next/link';
import type { CustomPageView } from '@/integrations/shared';

export default function BlogCard3({
  item,
  locale = 'en',
}: {
  item: CustomPageView;
  locale?: string;
}) {
  const slug = (item as any)?.slug || (item as any)?.id;
  const href = `/${locale}/blog/${encodeURIComponent(slug)}`;

  const img =
    (item as any)?.featured_image_effective_url ||
    (item as any)?.image_effective_url ||
    (item as any)?.featured_image ||
    (item as any)?.image_url ||
    (item as any)?.images_effective_urls?.[0] ||
    (item as any)?.images?.[0] ||
    '/assets/imgs/blog/blog-1/img-3.png';

  const alt = (item as any)?.alt || (item as any)?.title || 'img';

  return (
    <>
      <Link href={href}>
        <img src={img} alt={alt} className="img-fluid" />
      </Link>
      <Link href={href} rel="bookmark">
        {(item as any)?.title}
      </Link>
      <br />
    </>
  );
}
