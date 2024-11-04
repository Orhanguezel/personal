export function loadSkillsSection() {
    const skillsSection = document.getElementById('skills-section');
    skillsSection.innerHTML = `
      <section class="skills" id="skills">
        <h2 class="section-title">My <span class="highlight">Skills</span></h2>
        <div class="skill-flex">
          
          <!-- Frontend Development -->
          <div class="skill-item">
            <h3>Frontend Development</h3>
            <div class="icon-card"><img src="assets/html.png" alt="HTML" class="skill-icon" /><p>HTML</p></div>
            <div class="icon-card"><img src="assets/css.png" alt="CSS" class="skill-icon" /><p>CSS</p></div>
            <div class="icon-card"><img src="assets/sass.png" alt="Sass" class="skill-icon" /><p>Sass</p></div>
            <div class="icon-card"><img src="assets/bootstrap.png" alt="Bootstrap" class="skill-icon" /><p>Bootstrap</p></div>
            <div class="icon-card"><img src="assets/javascript.png" alt="JavaScript" class="skill-icon" /><p>JavaScript</p></div>
            <div class="icon-card"><img src="assets/react.png" alt="React.js" class="skill-icon" /><p>React.js</p></div>
          </div>
          
          <!-- Backend Development -->
          <div class="skill-item">
            <h3>Backend Development</h3>
            <div class="icon-card"><img src="assets/nodejs.png" alt="Node.js" class="skill-icon" /><p>NodeJS</p></div>
            <div class="icon-card"><img src="assets/expressjs.png" alt="Express.js" class="skill-icon" /><p>Express.js</p></div>
            <div class="icon-card"><img src="assets/mongodb.png" alt="MongoDB" class="skill-icon" /><p>MongoDB</p></div>
            <div class="icon-card"><img src="assets/mysql.png" alt="MySQL" class="skill-icon" /><p>MySQL</p></div>
            <div class="icon-card"><img src="assets/postman.svg" alt="Postman" class="skill-icon" /><p>Postman</p></div>
          </div>
          
          <!-- UI/UX Design -->
          <div class="skill-item">
            <h3>UI/UX Design</h3>
            <div class="icon-card"><img src="assets/figma.png" alt="Figma" class="skill-icon" /><p>Figma</p></div>
            <div class="icon-card"><img src="assets/canva.png" alt="Canva" class="skill-icon" /><p>Canva</p></div>
            <div class="icon-card"><img src="assets/photoshop.png" alt="Adobe Photoshop" class="skill-icon" /><p>Adobe Photoshop</p></div>
          </div>
          
          <!-- Other Skills -->
          <div class="skill-item">
            <h3>Other Skills</h3>
            <div class="icon-card"><img src="assets/seo.jpg" alt="SEO" class="skill-icon" /><p>SEO</p></div>
            <div class="icon-card"><img src="assets/git.png" alt="Git" class="skill-icon" /><p>Git</p></div>
            <div class="icon-card"><img src="assets/GitHub.jpg" alt="GitHub" class="skill-icon" /><p>GitHub</p></div>
            <div class="icon-card"><img src="assets/wordpress.jpg" alt="WordPress" class="skill-icon" /><p>WordPress</p></div>
          </div>
          
        </div>
      </section>
    `;
  }
  