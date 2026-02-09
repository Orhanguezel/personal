'use client';

import { useMemo } from "react";
import ThemeSwitch from "@/components/elements/ThemeSwitch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetSiteSettingByKeyQuery } from "@/integrations/hooks";
import { pickSettingValue, pickSocialUrl, resolveLocaleForApi, resolveLocaleForLinks } from "@/integrations/shared";
import Menu from "../Menu";
import MobileMenu from "../MobileMenu";
import OffCanvas from "../OffCanvas";
import SiteLogo from "../SiteLogo";
import { useSiteMedia } from "../siteAssets";

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isOffCanvas, handleOffCanvas }: any) {
    const pathname = usePathname() || "/";
    const localeForLinks = useMemo(() => resolveLocaleForLinks(pathname, "de"), [pathname]);
    const localeForApi = useMemo(() => resolveLocaleForApi(pathname), [pathname]);

    const { brandName, brandShort } = useSiteMedia({ locale: localeForApi ?? localeForLinks });
    const brandLabel = brandShort || brandName;

    const { data: socialsRow } = useGetSiteSettingByKeyQuery({
        key: "socials",
        locale: localeForApi ?? localeForLinks,
    } as any);

    const socialsValue = useMemo(() => pickSettingValue(socialsRow), [socialsRow]);
    const socials = useMemo(() => {
        const facebook = pickSocialUrl(socialsValue, "facebook");
        const x = pickSocialUrl(socialsValue, "x") || pickSocialUrl(socialsValue, "twitter");
        const linkedin = pickSocialUrl(socialsValue, "linkedin");
        const github = pickSocialUrl(socialsValue, "github");
        const instagram = pickSocialUrl(socialsValue, "instagram");
        return { facebook, x, linkedin, github, instagram };
    }, [socialsValue]);

    return (
        <>
            <header>
                <nav className={`navbar navbar-expand-lg navbar-light w-100 flex-nowrap z-999 p-0 ${scroll ? "navbar-stick" : ""}`} style={{ position: `${scroll ? "fixed" : "relative"}`, top: `${scroll ? "0" : "auto"}` }}>
                    <a href="#" className="navbar-menu p-4 text-center square-100 menu-tigger icon_80 icon-shape d-none d-md-flex" data-bs-target=".offCanvas__info" aria-controls="offCanvas__info" onClick={handleOffCanvas}>
                        <i className="ri-menu-2-line" />
                    </a>
                    <div className="container py-3 px-0">
                        <Link className="navbar-brand d-flex main-logo align-items-center ms-lg-0 ms-md-5 ms-3" href="/">
                            <SiteLogo className="me-2" alt={brandName} sizes="32px" />
                            <span className="fs-4 ms-2">{brandLabel}</span>
                        </Link>
                        <div className="d-none d-lg-flex">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <Menu />
                            </div>
                        </div>
                        <div className="navbar-social d-flex align-items-center pe-5 pe-lg-0 me-5 me-lg-0">
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
                            <div className="burger-icon burger-icon-white border rounded-3" onClick={handleMobileMenu}>
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
    );
}
