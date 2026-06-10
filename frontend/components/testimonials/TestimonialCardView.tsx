import Image from 'next/image';
import Link from 'next/link';

import type { TestimonialCard } from '@/integrations/shared';

function renderStars(rating: number) {
  const safe = Number.isFinite(rating) ? Math.max(0, Math.min(5, Math.round(rating))) : 0;
  return Array.from({ length: 5 }).map((_, i) => (
    <i
      key={i}
      className={`ri-star-fill fs-7 ${i < safe ? 'text-primary-1' : 'text-500'}`}
    />
  ));
}

export function TestimonialCardView({
  card,
  locale,
}: {
  card: TestimonialCard;
  locale: string;
}) {
  const href =
    card.href && card.href !== '#' ? card.href : `/${locale}/testimonials`;

  return (
    <div className="bg-white card-testimonial-1 p-lg-7 p-md-5 p-4 border-2 rounded-4 position-relative h-100">
      <div className="mb-6 logo">
        <Image
          src={card.logo}
          alt={card.company || 'Partner'}
          width={100}
          height={40}
          style={{ height: 'auto', width: 'auto', maxHeight: '40px' }}
        />
      </div>
      <div className="d-flex mb-5">{renderStars(card.rating)}</div>
      <p className="mb-7 h6">“{card.comment}”</p>
      <Link href={href} className="d-flex align-items-center">
        <Image
          className="icon_65 avatar"
          src={card.avatar}
          alt={card.name}
          width={65}
          height={65}
        />
        <h3 className="ms-2 mb-0 h6">
          {card.name}
          <span className="fs-6 fw-regular">{card.meta}</span>
        </h3>
      </Link>
      <div className="position-absolute top-0 end-0 m-5">
        <svg xmlns="http://www.w3.org/2000/svg" width={52} height={52} viewBox="0 0 52 52" fill="none" aria-hidden>
          <g clipPath={`url(#clip0_${card.id.replace(/[^a-zA-Z0-9_-]/g, '')})`}>
            <path
              d="M0 29.7144H11.1428L3.71422 44.5715H14.8571L22.2857 29.7144V7.42871H0V29.7144Z"
              fill="#D1D5DB"
            />
            <path
              d="M29.7148 7.42871V29.7144H40.8577L33.4291 44.5715H44.5719L52.0005 29.7144V7.42871H29.7148Z"
              fill="#D1D5DB"
            />
          </g>
          <defs>
            <clipPath id={`clip0_${card.id.replace(/[^a-zA-Z0-9_-]/g, '')}`}>
              <rect width={52} height={52} fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
