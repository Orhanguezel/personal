export function loadFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
      <footer class="footer">
        <div class="logo-container">
          <div class="logo-footer">
            <img src="./img/logo3.png" alt="logo" />
            <h4 class="section-title">Guezel <span class="highlight">Webdesign</span></h4>
          </div>
        </div>
        <div class="footer-content">
          <div class="footer-section"><h3>About Us</h3><ul><li><a href="#about-me">About Me</a></li></ul></div>
          <div class="footer-section"><h3>Contact Info</h3><p>Feel free to contact & reach us!</p></div>
        </div>
        <div class="footer-bottom">
          <div class="social-media">
            <a href="https://github.com/Orhanguezel" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
          </div>
          <p class="copyright">© 2024 Guezel Webdesign. Powered by OG</p>
        </div>
      </footer>
    `;
  }
  