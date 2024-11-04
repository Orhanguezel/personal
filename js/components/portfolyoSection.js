export function loadProjectsSection() {
  const projectsSection = document.getElementById('projects-section');
  projectsSection.innerHTML = `
    <section class="projects" id="projects">
        <div class="section-title">
          <h2>My <span class="highlight">Portfolio</span></h2>
          <p class="section-description">
            Explore some of the key projects I've completed, ranging from
            restaurant websites to industrial solutions, helping clients bring
            their online presence to life.
          </p>
        </div>

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

            <!-- Project 2: Miss Et -->
            <div class="project-item">
              <div class="project-image-wrapper">
                <img src="assets/misset.png"alt="Miss Et Website"/>
              </div>
              <div class="project-details">
                <h3>Miss Et & Balik</h3>
                <p>
                  A website developed for a popular restaurant in der Türkei
                </p>
                <a href="portfolio.html#misset"class="project-link">View Details →</a>
              </div>
            </div>
        </div>
      
        <div class="view-all">
          <a href="portfolio.html" class="btn">View All Portfolio</a>
        </div>
      </section>
  `;
}
