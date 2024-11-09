export function loadPortfolioPage() {
    const mainContent = document.getElementById("portfolio-content");
  
    if (mainContent) {
      mainContent.innerHTML = `
        <section class="portfolio-hero" id="portfolio-hero">
          <div class="overlay"></div>
          <div class="portfolio-content">
            <h2>My Portfolio</h2>
            <img src="img/portfolio.png" alt="portfolio" class="portfolio-image" />
          </div>
        </section>
  
        <section class="portfolio-section" id="portfolio">
          <h2 class="section-title">
            My Completed <span class="highlight">Portfolio</span>
          </h2>
          <p class="section-description">
            Here are some of my favorite projects, showcasing my skills and passion for web development.
          </p>
  
          <div class="projects-card">
            <img src="assets/antalya-logo1.png" alt="Antalya Döner Pizzeria Project" class="projects-image" id="antalya" />
            <div class="projects-details">
              <h3>Antalya Döner & Pizzeria</h3>
              <p>This web application streamlines the restaurant management process for Antalya Döner & Pizzeria...</p>
              <h4>Technologies Used:</h4>
              <ul>
                <li>Frontend: React, Bootstrap</li>
                <li>Backend: Node.js, Express.js</li>
                <li>Database: MongoDB</li>
              </ul>
              <h4>Key Features:</h4>
              <ul>
                <li>Real-time order management and updates</li>
                <li>User registration and personalized ordering</li>
                <li>Admin dashboard with order analytics and management</li>
                <li>Mobile-responsive design for easy access on the go</li>
              </ul>
              <a href="https://www.antalya-doner-pizzeria.de" target="_blank" class="btn">View Project</a>
            </div>
          </div>
  
          <div class="projects-card">
            <img src="assets/misset.png" alt="MissEt Project" class="projects-image" id="misset" />
            <div class="projects-details">
              <h3>MissEt</h3>
              <p>MissEt is a web-based project designed to offer a seamless solution for meat lovers...</p>
              <h4>Technologies Used:</h4>
              <ul><li>HTML, CSS, JavaScript</li></ul>
              <h4>Key Features:</h4>
              <ul>
                <li>Detailed product catalog for different cuts and types of meat</li>
                <li>In-progress: Online reservation system for quick and easy table bookings</li>
                <li>Fully responsive design for both desktop and mobile users</li>
              </ul>
              <a href="https://orhanguezel.github.io/MissEt/" target="_blank" class="btn">View Project</a>
            </div>
          </div>
  
          <div class="projects-card">
            <img src="assets/kuhlturm-logo.png" alt="Kuhlturm Project" class="projects-image" id="kuhlturm" />
            <div class="projects-details">
              <h3>Kuhlturm</h3>
              <p>This project was developed for Ensotek, a refrigeration company specializing in industrial cooling solutions...</p>
              <h4>Technologies Used:</h4>
              <ul><li>HTML, CSS, JavaScript</li></ul>
              <p>The website was designed with a modern and professional interface...</p>
              <a href="https://orhanguezel.github.io/Ensotek/" target="_blank" class="btn">View Project</a>
            </div>
          </div>
  
          <div class="projects-card">
            <img src="assets/hazer-logo.png" alt="Hazer Piliç Project" class="projects-image" id="hazer" />
            <div class="projects-details">
              <h3>Hazer Piliç</h3>
              <p>This website was created for Hazer Piliç, a Turkish poultry company known for its high-quality, fresh chicken products...</p>
              <h4>Technologies Used:</h4>
              <ul><li>HTML, CSS, WordPress</li></ul>
              <a href="https://hazerpilic.com.tr/" target="_blank" class="btn">View Project</a>
            </div>
          </div>
  
          <div class="projects-card">
            <img src="assets/btu-logo.png" alt="BTU Holding Project" class="projects-image" id="btu" />
            <div class="projects-details">
              <h3>BTU Holding</h3>
              <p>This website was designed for BTU Holding, a major investment firm...</p>
              <h4>Technologies Used:</h4>
              <ul><li>HTML, CSS, WordPress</li></ul>
              <a href="https://btuholding.com.tr/" target="_blank" class="btn">View Project</a>
            </div>
          </div>
        </section>
      `;
    } else {
      console.error("Element with ID 'portfolio-content' not found.");
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadPortfolioPage();
  });
  