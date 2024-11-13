import { loadHeader } from './components/header.js';
import { loadHeroSection } from './components/heroSection.js';
import { loadAboutMeSection } from './components/aboutMeSection.js';
import { loadProjectsSection } from './components/portfolyoSection.js';
import { loadSkillsSection } from './components/skillSection.js';
import { loadContactSection } from './components/contactSection.js';
import { loadFooter } from './components/footer.js';
import { loadContactPage } from './components/contactPage.js';
import { loadAboutPage } from './components/aboutPage.js';
import { loadPortfolioPage } from './components/portfolioPage.js';

const currentPage = window.location.pathname;

// Tüm sayfalarda geçerli olan bileşenleri yükle
loadHeader();
loadFooter();

// Ana sayfa (index.html) için bileşenleri yükle
if (currentPage.endsWith('/') || currentPage.endsWith('/index.html') || currentPage === '/personal/') {
  loadHeroSection();
  loadAboutMeSection();
  loadProjectsSection();
  loadSkillsSection();
  loadContactSection(); // Yalnızca `index.html` için kısa iletişim bölümü yüklenecek
}

// `contact.html` sayfasında yalnızca tam iletişim sayfası yüklenir
if (currentPage.includes('contact.html')) {
  loadContactPage(); // Tam iletişim sayfası sadece `contact.html`de yüklenecek
}

// Sadece `about-me.html` sayfası için About Me içeriğini yükle
if (currentPage.includes('about-me.html')) {
  loadAboutPage();
}

// Sadece `portfolio.html` sayfası için portfolyo içeriğini yükle
if (currentPage.includes('portfolio.html')) {
  loadPortfolioPage();
}
