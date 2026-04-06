'use client';

// frontend/components/sections/Home1.tsx

import Image from 'next/image';
import Link from "next/link"
import { useMemo } from 'react';

import { useStaticSiteSetting } from '@/utils/staticSiteSettings';
import { normalizeUiHomeSettingValue, type UiHomeCopy } from '@/integrations/shared';
import { shouldUnoptimizeImage } from '@/utils/nextImage';
import { getCvAssetPath } from '@/utils/cv';

export default function Home1({
	locale = 'en',
	initialUi,
}: {
	locale?: string;
	initialUi?: UiHomeCopy;
}) {
	const safeLocale = (locale || 'en').trim() || 'en';

	const { data: uiSetting } = useStaticSiteSetting({
		key: 'ui_home',
		locale: safeLocale,
	});

	const ui = useMemo(() => {
		if (initialUi) return initialUi;
		return normalizeUiHomeSettingValue(uiSetting?.value);
	}, [uiSetting?.value, initialUi]);
	const copy = ui.home1;

	const heroSrc = String(copy.hero_image || '').trim() || '/assets/imgs/hero/hero-1/man.png';
	const heroAlt = String(copy.hero_image_alt || '').trim() || 'Portrait of the developer';
	const decorSrc = String(copy.decor_image || '').trim() || '/assets/imgs/hero/hero-1/decorate.png';
	const decorAlt = String(copy.decor_image_alt || '').trim() || '';
	const cvHref = getCvAssetPath(safeLocale);


	return (
		<>

			<section className="section-hero-1 position-relative pt-200 pb-120 overflow-hidden">
				<div className="container position-relative z-3">
					<div className="row">
						<div className="col-lg-6 col-md-12">
							<span className="text-dark">{copy.greeting}</span>
							<h1
								className="ds-2 mb-3"
								dangerouslySetInnerHTML={{ __html: copy.title_html }}
							/>
							<p className="text-300 mb-6">{copy.description}</p>
							<Link href={cvHref} className="btn btn-gradient me-2" target="_blank" rel="noopener noreferrer" aria-label={copy.cta_primary}>
								{copy.cta_primary}
								<i className="ri-download-line ms-2" />
							</Link>
							<Link href="/#contact" className="btn btn-outline-secondary d-inline-flex align-items-center" aria-label={copy.cta_secondary}>
								<span>{copy.cta_secondary}</span>
								<i className="ri-arrow-right-line ms-2" />
							</Link>
							<p className="text-400 mt-6 mb-3">{copy.experience_label}</p>
							<div className="d-flex gap-3">
								<div className="brand-logo icon-xl icon-shape rounded-3 bg-900">
									<Image src="/assets/imgs/hero/hero-1/brand-1.png" alt="Next.js logo" width={64} height={64} sizes="64px" style={{ objectFit: 'contain', height: 'auto' }} />
								</div>
								<div className="brand-logo icon-xl icon-shape rounded-3 bg-900">
									<Image src="/assets/imgs/hero/hero-1/brand-2.png" alt="React logo" width={64} height={64} sizes="64px" style={{ objectFit: 'contain', height: 'auto' }} />
								</div>
								<div className="brand-logo icon-xl icon-shape rounded-3 bg-900">
									<Image src="/assets/imgs/hero/hero-1/brand-3.png" alt="TypeScript logo" width={64} height={64} sizes="64px" style={{ objectFit: 'contain', height: 'auto' }} />
								</div>
								<div className="brand-logo icon-xl icon-shape rounded-3 bg-900">
									<Image src="/assets/imgs/hero/hero-1/brand-4.png" alt="Laravel logo" width={64} height={64} sizes="64px" style={{ objectFit: 'contain', height: 'auto' }} />
								</div>
								<div className="brand-logo icon-xl icon-shape rounded-3 bg-900">
									<Image src="/assets/imgs/hero/hero-1/brand-5.png" alt="Flutter logo" width={64} height={64} sizes="64px" style={{ objectFit: 'contain', height: 'auto' }} />
								</div>
								<div className="brand-logo icon-xl icon-shape rounded-3 bg-900 d-none d-md-flex">
									<Image src="/assets/imgs/hero/hero-1/brand-6.png" alt="MySQL logo" width={64} height={64} sizes="64px" style={{ objectFit: 'contain', height: 'auto' }} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="shape-1 position-absolute bottom-0 start-50 z-1 ms-10 d-none d-md-block">
					<Image
						className="position-relative z-1 filter-gray"
						src={heroSrc}
						alt={heroAlt}
						width={720}
						height={900}
						priority
						fetchPriority="high"
						decoding="async"
						sizes="(max-width: 992px) 100vw, 720px"
						unoptimized={shouldUnoptimizeImage(heroSrc)}
						style={{ height: 'auto' }}
					/>
					<div className="position-absolute top-50 start-0 translate-middle z-0 mt-8 ms-10 ps-8">
						<Image
							className="ribbonRotate"
							src={decorSrc}
							alt={decorAlt}
							width={220}
							height={209}
							sizes="220px"
							unoptimized={shouldUnoptimizeImage(decorSrc)}
						/>
					</div>
				</div>
				<div
					className="position-absolute top-0 start-0 w-100 h-100 filter-invert"
					style={{ backgroundImage: 'url(/assets/imgs/hero/hero-1/background.png)' }}
				/>
			</section>

		</>
	)
}
