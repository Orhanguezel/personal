export function loadAboutMeSection() {
    const aboutMeSection = document.getElementById('about-me-section');
    aboutMeSection.innerHTML = `
      <section class="about-me" id="about-me">
        <h2 class="section-title">About <span class="highlight">Me</span></h2>
        <div class="about-content">
          <div class="text">
            <p>
              I'm Orhan Güzel, a passionate web developer with a background in engineering. My journey into technology began with my graduation
              from Erciyes University and continued as a military engineer in the Turkish Air Force for 12 years. Since moving to Germany in
              2022, I have focused on web development and constantly strive to learn more in order to enhance my skills in this dynamic field.
            </p>
          </div>
          <div class="view-all">
            <a href="about-me.html" class="btn">View Detail</a>
          </div>
        </div>
      </section>
    `;
  }
  