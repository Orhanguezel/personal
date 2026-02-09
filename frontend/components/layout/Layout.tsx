'use client';

import React, { useEffect, useState } from 'react';

import AddClassBody from '../elements/AddClassBody';
import BackToTop from '../elements/BackToTop';
import DataBg from '../elements/DataBg';
import ImageHoverEffects from '../elements/ImageHoverEffects';

import Breadcrumb from './Breadcrumb';
import MobileMenu from './MobileMenu';

import Footer1 from './footer/Footer1';
import Footer2 from './footer/Footer2';
import Footer3 from './footer/Footer3';

import Header1 from './header/Header1';
import Header2 from './header/Header2';
import Header3 from './header/Header3';

interface LayoutProps {
  headerStyle?: number;
  footerStyle?: number;
  children?: React.ReactNode;
  breadcrumbTitle?: string;
}

export default function Layout({
  headerStyle,
  footerStyle,
  breadcrumbTitle,
  children,
}: LayoutProps) {
  const [scroll, setScroll] = useState(false);

  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = (): void => {
    setMobileMenu((prev) => {
      const next = !prev;

      if (typeof document !== 'undefined') {
        if (next) document.body.classList.add('mobile-menu-active');
        else document.body.classList.remove('mobile-menu-active');
      }

      return next;
    });
  };

  // Eğer ileride kullanılacaksa kalsın; yoksa kaldırabilirsin.
  const [isSearch, setSearch] = useState(false);
  const handleSearch = (): void => setSearch((p) => !p);

  const [isOffCanvas, setOffCanvas] = useState(false);
  const handleOffCanvas = (): void => setOffCanvas((p) => !p);

  // 1) WOW init — deps DAİMA []
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const t = window.setTimeout(() => {
      import('wowjs')
        .then((m: any) => {
          const WOWCtor =
            (typeof m === 'function' && m) ||
            (m?.default && typeof m.default === 'function' && m.default) ||
            (m?.WOW && typeof m.WOW === 'function' && m.WOW) ||
            (window as any).WOW;

          if (typeof WOWCtor === 'function') {
            (window as any).wow = new WOWCtor({ live: false });
            (window as any).wow.init();
            return;
          }

          console.error('WOW constructor not found');
        })
        .catch((err) => {
          console.error('Failed to import WOW.js:', err);

          const WOWCtor = (window as any).WOW;
          if (typeof WOWCtor === 'function') {
            (window as any).wow = new WOWCtor({ live: false });
            (window as any).wow.init();
          }
        });
    }, 100);

    return () => window.clearTimeout(t);
  }, []);

  // 2) Scroll listener — deps DAİMA []
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onScroll = (): void => {
      const next = window.scrollY > 100;
      setScroll((prev) => (prev === next ? prev : next));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Unmount cleanup (body class vs.)
  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('mobile-menu-active');
      }
    };
  }, []);

  const header = !headerStyle ? 1 : headerStyle;

  return (
    <>
      <div id="top" />
      <AddClassBody />
      <DataBg />
      <ImageHoverEffects />

      {header === 1 ? (
        <Header1
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          isOffCanvas={isOffCanvas}
          handleOffCanvas={handleOffCanvas}
        />
      ) : null}

      {header === 2 ? (
        <Header2
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          isOffCanvas={isOffCanvas}
          handleOffCanvas={handleOffCanvas}
        />
      ) : null}

      {header === 3 ? (
        <Header3
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          isOffCanvas={isOffCanvas}
          handleOffCanvas={handleOffCanvas}
        />
      ) : null}

      <MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />

      <main className="main">
        {breadcrumbTitle ? <Breadcrumb breadcrumbTitle={breadcrumbTitle} /> : null}
        {children}
      </main>

      {!footerStyle ? <Footer1 /> : null}
      {footerStyle === 1 ? <Footer1 /> : null}
      {footerStyle === 2 ? <Footer2 /> : null}
      {footerStyle === 3 ? <Footer3 /> : null}

      <BackToTop target="#top" />
    </>
  );
}
