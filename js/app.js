import { loadHeader } from './components/header.js';
import { loadHeroSection } from './components/heroSection.js';
import { loadAboutMeSection } from './components/aboutMeSection.js';
import { loadProjectsSection } from './components/portfolyoSection.js';
import { loadSkillsSection } from './components/skillSection.js';
import { loadContactSection } from './components/contactSection.js';
import { loadFooter } from './components/footer.js';
import { loadContactPage } from './components/contactPage.js';

const currentPage = window.location.pathname;

// Tüm sayfalarda geçerli olan bileşenleri yükle
loadHeader();
loadFooter();

// Ana sayfa (index.html) için bileşenleri yükle
if (currentPage.includes('index.html') || currentPage === '/') {
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
