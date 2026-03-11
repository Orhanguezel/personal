'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

type Props = {
  href: string;
  numberText: string;
  title: string;
  text: string;
  img: string; // The image URL
  isLast?: boolean;
};

// Helper for mouse position
const getMousePos = (e: React.MouseEvent | MouseEvent) => {
  const posx = e.pageX || (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
  const posy = e.pageY || (e.clientY + document.body.scrollTop + document.documentElement.scrollTop);
  return { x: posx, y: posy };
};

export default function ServiceCard({ href, numberText, title, text, img, isLast }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  
  // We use a ref for the requestAnimationFrame management to avoid re-renders
  const requestRef = useRef<number>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!wrapperRef.current || !innerRef.current || !imgRef.current) return;
    
    // Initial Position (Use transform directly to avoid layout thrashing)
    // React event 'e' has clientX/Y
    wrapperRef.current.style.transform = `translate3d(${e.clientX + 20}px, ${e.clientY + 20}px, 0) rotate(14deg)`;
    
    // Show
    wrapperRef.current.style.opacity = '1';
    wrapperRef.current.style.pointerEvents = 'auto';
    innerRef.current.style.transform = 'translateX(0%)';
    imgRef.current.style.transform = 'translateX(0%)';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Optimize: Skip on mobile/tablet or if reduced motion
    if (typeof window !== 'undefined' && window.innerWidth < 992) return;

    if (!wrapperRef.current) return;
    
    // Cancel previous frame if exists
    if (requestRef.current) cancelAnimationFrame(requestRef.current);

    // Use client coordinates directly (viewport-relative) - No Reflow!
    const clientX = e.clientX;
    const clientY = e.clientY;

    requestRef.current = requestAnimationFrame(() => {
        if (wrapperRef.current) {
            // Use transform (GPU) instead of top/left (CPU Layout)
            // Restore CSS rotation (14deg)
            wrapperRef.current.style.transform = `translate3d(${clientX + 20}px, ${clientY + 20}px, 0) rotate(14deg)`;
        }
    }) as unknown as number;
  };

  const handleMouseLeave = () => {
    if (!wrapperRef.current || !innerRef.current || !imgRef.current) return;
    
    // Hide
    wrapperRef.current.style.opacity = '0';
    wrapperRef.current.style.pointerEvents = 'none';
    innerRef.current.style.transform = 'translateX(100%)';
    imgRef.current.style.transform = 'translateX(-100%)';
    
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };
  
  // Clean up
  useEffect(() => {
    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="col-12">
      <div
        className={[
          'single-service-card-1',
          'tg-img-reveal-item', // Keep class for styling if needed, but remove data-fx
          'w-100',
          'border-top',
          'border-900',
          'p-3',
          isLast ? 'border-bottom' : '',
        ].join(' ')}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // Removed data-fx={1} so the global script ignores this
      >
        <div className="service-card-details d-lg-flex align-items-center">
          <h3 className="service-card-title w-lg-50 w-100 mb-0">
            <Link href={href}>
              <span className="service-number">{numberText}</span>
              {title}
            </Link>
          </h3>

          <Link
            href={href}
            className="d-md-flex d-block ps-lg-10 align-items-center justify-content-end w-100"
          >
            <p className="service-card-text my-3">{text}</p>
            <div className="service-card-icon icon-shape ms-auto icon-md rounded-circle border">
              <i className="ri-arrow-right-up-line" />
            </div>
          </Link>
        </div>

        {/* 
            The Reveal Wrapper is now part of the React Tree.
            Hydration will expect it, and no mismatch will occur.
        */}
        <div 
            ref={wrapperRef} 
            className="tg-img-reveal-wrapper" 
            style={{ 
                opacity: 0, 
                pointerEvents: 'none',
                // Ensure GPU promotion
                willChange: 'transform' 
            }}
        >
                    <Image 
                        src={img} 
                        alt={title} 
                        fill 
                        sizes="400px"
                        style={{ objectFit: 'cover' }}
                    />
                     {/* Optional: Add meta content if identical match is needed, 
                         but checking the original code, it seems the author/date were often empty or generic.
                         If needed, we can add props for them. 
                     */}
                     {/* Replicating the Inner Structure from ImageHoverEffects.tsx for full fidelity */}
                     <div className="tg-hover-wrapper">
                        <ul className="tgbanner__content-meta list-wrap">
                            <li><span className="by">By</span> <a href="#">GWD</a></li>
                            <li>Oct 2023</li> 
                        </ul>
                        <h3 className="tg-hover-title">{title}</h3>
                     </div>
        </div>
      </div>
    </div>
  );
}
