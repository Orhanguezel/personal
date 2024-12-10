export function loadHeader() {
  const header = document.getElementById("header");

  // Şu anki sayfanın adını belirleyin
  const currentPage = window.location.pathname.split("/").pop();

  // Sayfaya göre farklı linkler tanımlayın
  const linkPrefix = currentPage === "index.html" ? "" : "index.html";

  header.innerHTML = `
    <header class="main-nav">
      <div class="logo">
        <img src="./img/logo3.png" alt="logo" />
        <h4 class="section-title">Guezel <span class="highlight">Webdesign</span></h4>
      </div>
      <nav>
        <ul class="nav-menu">
          <li><a href="${linkPrefix}">Home</a></li>
          <li><a href="${linkPrefix}#about-me">About Me</a></li>
          <li><a href="${linkPrefix}#projects">Portfolio</a></li>
          <li><a href="${linkPrefix}#skills">Skills</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
      <div class="hamburger-menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </header>
  `;

  // Hamburger menü işlevselliği
  const hamburgerMenu = header.querySelector('.hamburger-menu');
  const navMenu = header.querySelector('.nav-menu');

  hamburgerMenu.addEventListener('click', function () {
      navMenu.classList.toggle('show');
      hamburgerMenu.classList.toggle('open');
      
      // Menü açıldığında sayfa kaydırmasını durdur
      if (navMenu.classList.contains('show')) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'auto';
      }
  });

  // Menü dışında bir yere tıklandığında menüyü kapat
  document.addEventListener('click', function (event) {
      if (!header.contains(event.target) && navMenu.classList.contains('show')) {
          navMenu.classList.remove('show');
          hamburgerMenu.classList.remove('open');
          document.body.style.overflow = 'auto';
      }
  });
}
