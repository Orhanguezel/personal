export function loadHeader() {
    const header = document.getElementById('header');
    header.innerHTML = `
      <header class="main-nav">
        <div class="logo">
          <img src="./img/logo3.png" alt="logo" />
          <h4 class="section-title">Guezel <span class="highlight">Webdesign</span></h4>
        </div>
        <nav>
          <ul class="nav-menu">
            <li><a href="#">Home</a></li>
            <li><a href="#about-me">About Me</a></li>
            <li><a href="#projects">Portfolio</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div class="hamburger-menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </header>
    `;
  }
  