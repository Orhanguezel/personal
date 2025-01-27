export function loadProjectsSection() {
  const projectsSection = document.getElementById('projects-section');
  projectsSection.innerHTML = `
    <section class="projects" id="projects">
        <h2 class="section-title">
          My <span class="highlight">Portfolio</span></h2>
          <p class="section-description">
            Explore some of the key projects I've completed, ranging from
            restaurant websites to industrial solutions, helping clients bring
            their online presence to life.
          </p>
      

        <div class="projects-section">
          <!-- Project 1: Antalya Döner Pizzeria -->
          <div class="project-item">
            <div class="project-image-wrapper">
              <img src="assets/antalya-logo.png"alt="Antalya Döner Pizzeria Website"/>
            </div>
            <div class="project-details">
              <h3>Antalya Döner Pizzeria</h3>
              <p>
                A website developed for a popular Döner restaurant in Germany.
              </p>
              <a href="portfolio.html#antalya"class="project-link">View Details →</a>
            </div>
          </div>

            <!-- Project 2: Kino Ticket -->
          <div class="project-item">
            <div class="project-image-wrapper">
              <img src="assets/kino-ticket.png" alt="Kino Ticket Website"/>
            </div>
            <div class="project-details">
              <h3>Kino Ticket</h3>
              <p>
                An interactive cinema ticket booking and admin panel platform.
              </p>
              <a href="portfolio.html#kino-ticket" class="project-link">View Details →</a>
            </div>
          </div>
        </div>
      
        <div class="view-all">
          <a href="portfolio.html" class="btn">View All Portfolio</a>
        </div>
      </section>
  `;
}
