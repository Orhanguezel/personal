export function loadFooter() {
  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <footer class="footer">
      <div class="logo-container">
        <div class="logo-footer">
          <img src="./img/logo3.png" alt="logo" />
          <h2 class="section-title">Guezel <span class="highlight-footer">Webdesign</span></h2>
        </div>
      </div>
      
      <!-- Footer Content -->
      <div class="footer-content">
        <!-- About Company Section -->
        <div class="footer-section">
          <h3>About Us</h3>
          <ul>
            <li><a href="#about-me">About Me</a></li>
            <li><a href="#projects">Portfolio</a></li>
            <li><a href="#skills">Skills</a></li>
          </ul>
        </div>

        <!-- Contact Info Section -->
        <div class="footer-section">
          <h3>Contact Info</h3>
          <p>Feel free to contact & reach us!</p>
          <p>Address: 22th Streets, Grevenbroich</p>
          <p>Email: orhanguzell@gmail.com</p>
          <p>Phone: +988-123-456-78</p>
        </div>

        <!-- Portfolio Section -->
        <div class="footer-section">
          <h3>Our Portfolio</h3>
          <ul>
            <li><a href="portfolio.html#antalya">Antalya Döner Pizzeria</a></li>
            <li><a href="portfolio.html#misset">MissEt</a></li>
            <li><a href="portfolio.html#kuhlturm">Kuhlturm</a></li>
            <li><a href="portfolio.html#btu">BTU Holding</a></li>
            <li><a href="portfolio.html#hazer">Hazer Pilic</a></li>
          </ul>
        </div>
      </div>

      <!-- Privacy Policy -->
      <div class="footer-section">
        <h3>Privacy Policy</h3>
        <ul>
          <li><a href="privacy-policy.html">View Privacy Policy</a></li>
        </ul>
      </div>

      <!-- Social Media and Copyright -->
      <div class="footer-bottom">
        <div class="social-media">
          <a href="https://github.com/Orhanguezel" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
          <a href="https://codepen.io/Orhan-G-zel" target="_blank" rel="noopener noreferrer"><i class="fab fa-codepen"></i></a>
          <a href="https://www.instagram.com/kazatlet?igsh=eWkyaWNydWhteG1t" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
          <a href="https://www.linkedin.com/in/orhan-g%C3%BCzel-53b47b11a/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
        </div>
        <p class="copyright">
          Copyright © 2024 Guezel Webdesign. Powered by OG
        </p>
      </div>
    </footer>
  `;
}
