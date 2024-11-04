export function loadHeroSection() {
    const heroSection = document.getElementById('hero-section');
    heroSection.innerHTML = `
      <section class="hero" id="hero">
        <div class="hero-content">
          <h2>Transforming Ideas into <span class="highlight">Digital Experiences</span></h2>
          <p>
            I am a web developer specializing in creating unique, high-performance websites and web applications.
            With a focus on user experience and modern design, I bring ideas to life on the web.
          </p>
          <div class="cta">
            <a href="#projects" class="explore-btn">Explore My Work</a>
          </div>
        </div>
        <div class="hero-image"></div>
      </section>
    `;
  }
  