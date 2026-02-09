'use client'

import { useMemo } from 'react'
import ThemeSwitch from '@/components/elements/ThemeSwitch'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useGetSiteSettingByKeyQuery } from '@/integrations/hooks'
import { pickSettingValue, pickSocialUrl, resolveLocaleForApi, resolveLocaleForLinks } from '@/integrations/shared'
import OffCanvas from '../OffCanvas'
import MobileMenu from '../MobileMenu'
import SiteLogo from '../SiteLogo'
import { useSiteMedia } from '../siteAssets'

export default function Header3({ scroll, isMobileMenu, handleMobileMenu,isOffCanvas, handleOffCanvas }: any) {
	const pathname = usePathname() || '/'
	const localeForLinks = useMemo(() => resolveLocaleForLinks(pathname, 'de'), [pathname])
	const localeForApi = useMemo(() => resolveLocaleForApi(pathname), [pathname])

	const { brandName, brandShort } = useSiteMedia({ locale: localeForApi ?? localeForLinks })
	const brandLabel = brandShort || brandName

	const { data: socialsRow } = useGetSiteSettingByKeyQuery({
		key: 'socials',
		locale: localeForApi ?? localeForLinks,
	} as any)

	const socialsValue = useMemo(() => pickSettingValue(socialsRow), [socialsRow])
	const socials = useMemo(() => {
		const facebook = pickSocialUrl(socialsValue, 'facebook')
		const x = pickSocialUrl(socialsValue, 'x') || pickSocialUrl(socialsValue, 'twitter')
		const linkedin = pickSocialUrl(socialsValue, 'linkedin')
		const github = pickSocialUrl(socialsValue, 'github')
		const instagram = pickSocialUrl(socialsValue, 'instagram')
		return { facebook, x, linkedin, github, instagram }
	}, [socialsValue])

	return (
		<>
			<header>
				<nav className="navbar navbar-expand-lg navbar-home-3 flex-nowrap z-999 p-0">
					<div className="container py-3 px-0">
						<Link className="navbar-brand d-flex main-logo align-items-center ms-lg-0 ms-md-5 ms-3" href="/index-3">
							<h1 className="fs-28 mb-0 me-2">{brandLabel}</h1>
							<SiteLogo className="ms-2" alt={brandName} sizes="32px" />
						</Link>
						<div className="d-none d-lg-flex">
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav me-auto mb-2 mb-lg-0">
									<li className="nav-item">
										<Link className="nav-link active" href="#about">About me</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" href="#resume">Resume</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" href="#services">Services</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" href="#portfolio">Portfolio</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" href="#blog">Blog</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" href="#contact">Contact</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="navbar-social d-flex align-items-center">
							<div className="d-md-flex d-none gap-3">
								{socials.facebook ? (
									<a href={socials.facebook} target="_blank" rel="noreferrer">
										<i className="ri-facebook-circle-fill fs-18" />
									</a>
								) : null}
								{socials.x ? (
									<a href={socials.x} target="_blank" rel="noreferrer">
										<i className="ri-twitter-x-fill fs-18" />
									</a>
								) : null}
								{socials.linkedin ? (
									<a href={socials.linkedin} target="_blank" rel="noreferrer">
										<i className="ri-linkedin-fill fs-18" />
									</a>
								) : null}
								{socials.github ? (
									<a href={socials.github} target="_blank" rel="noreferrer">
										<i className="ri-github-fill fs-18" />
									</a>
								) : null}
								{socials.instagram ? (
									<a href={socials.instagram} target="_blank" rel="noreferrer">
										<i className="ri-instagram-fill fs-18" />
									</a>
								) : null}
							</div>
							<div className="burger-icon burger-icon-white border rounded-3" onClick={handleOffCanvas}>
								<span className="burger-icon-top" />
								<span className="burger-icon-mid" />
								<span className="burger-icon-bottom" />
							</div>
						</div>
					</div>
					<ThemeSwitch />
				</nav>
				{/* offCanvas-menu */}
				<OffCanvas isOffCanvas={isOffCanvas} handleOffCanvas={handleOffCanvas} />
				<MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
			</header>

		</>
	)
}
