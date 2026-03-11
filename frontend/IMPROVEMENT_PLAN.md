# Frontend Improvement Plan - Lighthouse CI

Based on the Lighthouse CI analysis dated 2026-02-09.

## 📊 Current Status Overview (Approximate)
- **Performance:** ~50/100 (Critical)
- **Accessibility:** ~79/100 (Needs Improvement)
- **Best Practices:** Issues with `robots.txt` and image ratios.
- **SEO:** Generally okay, but specific technical SEO fixes needed.

---

## 📅 Implementation Plan

### Phase 1: Configuration & SEO Quick Wins
- [ ] **Fix `robots.ts`**: Remove invalid properties and ensure standard format.
- [ ] **Next.config Optimization**: Ensure compression is enabled (already present, verify) and check mostly standard optimization flags.

### Phase 2: Accessibility (A11y) Foundations
- [x] **Button/Link Names**: Add `aria-label` to icon-only buttons (Mobile Menu, Social Links, Sliders).
    - Fixed: Header1, MobileMenu, BackToTop, ThemeSwitch.
- [ ] **Heading Order**: Ensure H1 is present and hierarchy is sequential (H1 -> H2 -> H3).
- [ ] **Alt Text**: Remove redundant "image of" text or ensure `alt` is meaningful.
- [ ] **Color Contrast**: Adjust specific UI element colors if flagged.

### Phase 3: Performance & Core Web Vitals
- [x] **Image Optimization (LCP & CLS)**:
    - Added `sizes` and `Next/Image` to `ServiceCard`.
    - Added explicit dimensions to `Brands1`.
    - Confirmed `Home1` uses `priority`.
- [ ] **Unused JS/CSS**: `wowjs` is dynamically loaded, which is good.

### Phase 4: Verification
- [ ] **Re-run Lighthouse CI**: Verify scores have improved.

---

## 📝 Progress Tracker

### Current Task
Running verification (Build & Test).
