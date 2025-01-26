import { loadHeader } from './components/header.js';
import { loadHeroSection } from './components/heroSection.js';
import { loadAboutMeSection } from './components/aboutMeSection.js';
import { loadProjectsSection } from './components/portfolyoSection.js';
import { loadSkillsSection } from './components/skillSection.js';
import { loadContactSection } from './components/contactSection.js';
import { loadFooter } from './components/footer.js';


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

