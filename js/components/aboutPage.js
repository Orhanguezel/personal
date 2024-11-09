export function loadAboutPage() {
  const mainContent = document.getElementById("about-content");

  if (mainContent) {
    mainContent.innerHTML = `
        <section class="about-me-hero" id="about-me-hero">
          <div class="about-me-content">
            <ul class="dots">
              <li><h2>A</h2></li>
              <li><h2>b</h2></li>
              <li><h2>o</h2></li>
              <li><h2>u</h2></li>
              <li><h2>t</h2></li>
              <li><h2></h2></li>
              <li><h2>m</h2></li>
              <li><h2>e</h2></li>
            </ul>
          </div>
  
          <div class="heros" id="heros">
            <div class="logos about-mee">
              <a href="#about-me" class="span">
                <img src="./img/logo1.png" alt="profil foto" />About Me
              </a>
            </div>
            <div class="logos sport">
              <a href="#sport" class="span">
                <img src="./img/sport2.png" alt="sport foto" />Sport
              </a>
            </div>
            <div class="logos education">
              <a href="#education" class="span">
                <img src="./img/2.png" alt="education" />Education
              </a>
            </div>
            <div class="logos sosial">
              <a href="#social-media" class="span">
                <img src="./img/4.png" alt="logo-sosial" />Social Media
              </a>
            </div>
            <div class="logos experince">
              <a href="#experience" class="span">
                <img src="./img/3.png" alt="logo-projects" />Experience
              </a>
            </div>
          </div>
        </section>
  
        <section class="about-me" id="about-me">
          <h2 class="section-title">
            <i class="fas fa-user"></i> About <span class="highlight">Me</span>
          </h2>
          <div class="content about-content">
            <p>
              I'm Orhan Güzel, a passionate web developer with a background in engineering.
              My journey into technology began with my graduation from Erciyes University
              and continued as a military engineer in the Turkish Air Force for 12 years.
              Since moving to Germany in 2022, I have focused on web development and 
              constantly strive to learn more to enhance my skills in this dynamic field.
            </p>
          </div>
<section id="education">
  <h2 class="section-title">
    <i class="fas fa-graduation-cap"></i> Education
  </h2>
  <div class="content education-content">
    <table class="table-section">
      <tbody>
        <tr>
          <td data-label="Degree">Vocational School</td>
          <td data-label="University/Institution">Anatolische Berufsschule, Turkey</td>
          <td data-label="Period">1994 - 1997</td>
        </tr>
        <tr>
          <td data-label="Degree">Bachelor's Degree</td>
          <td data-label="University/Institution">Erciyes University, Turkey</td>
          <td data-label="Period">1998 - 2005</td>
        </tr>
        <tr>
          <td data-label="Degree">Web Development Course</td>
          <td data-label="University/Institution">DCI, Germany</td>
          <td data-label="Period">2024 - 2025 </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

  
         <section id="experience">
  <h2 class="section-title">
    <i class="fas fa-briefcase"></i> Experience
  </h2>
  <div class="content experience-content">
    <table class="table-section">
      <tbody>
        <tr>
          <td data-label="Position">Production Worker</td>
          <td data-label="Company">Humintec GmbH</td>
          <td data-label="Period">Oct 2023 - Jan 2024</td>
        </tr>
        <tr>
          <td data-label="Position">Freelancer</td>
          <td data-label="Company">BTU GmbH</td>
          <td data-label="Period">Jul 2018 - Oct 2023</td>
        </tr>
        <tr>
          <td data-label="Position">Engineer</td>
          <td data-label="Company">Turkish Air Force</td>
          <td data-label="Period">Jul 2005 - Jul 2018</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

  
          <!-- Sport Section -->
<section id="sport">
  <h2 class="section-title"><i class="fas fa-running"></i> Sports</h2>
  <p>
    I participate in triathlons, competing in swimming, cycling, and running. Especially for those of us who spend long hours at the desk coding, staying active is crucial not only for physical health but also for maintaining mental clarity. To avoid the monotony of a sedentary lifestyle, I engage in various sports. Daily training sessions, at least one hour a day, have proven to be a fantastic way to keep my body fit and boost my energy levels. Through sports, I stay not only physically strong but also mentally sharp and motivated.
  </p>

  <div class="content sport-content">
    <div class="sport-card">
      <img src="img/spor/10.png" alt="Swimming" class="sport-img" />
      <div class="sport-caption">Running</div>
    </div>
    <div class="sport-card">
      <img src="img/spor/2.png" alt="Cycling" class="sport-img" />
      <div class="sport-caption">Running</div>
    </div>
    <div class="sport-card">
      <img src="img/spor/12.png" alt="Running" class="sport-img" />
      <div class="sport-caption">Cycling</div>
    </div>
  <div class="sport-card">
    <img src="img/spor/13.png" alt="Swimming" class="sport-img" />
    <div class="sport-caption">Duathlon</div>
  </div>
  <div class="sport-card">
    <img src="img/spor/14.png" alt="Cycling" class="sport-img" />
    <div class="sport-caption">Swimming</div>
  </div>
  <div class="sport-card">
    <img src="img/spor/15.png" alt="Running" class="sport-img" />
    <div class="sport-caption">Triathlon</div>
  </div>
<div class="sport-card">
  <img src="img/spor/16.png" alt="Swimming" class="sport-img" />
  <div class="sport-caption">Triathlon</div>
</div>
<div class="sport-card">
  <img src="img/spor/17.png" alt="Cycling" class="sport-img" />
  <div class="sport-caption">Duathlon</div>
</div>
<div class="sport-card">
  <img src="img/spor/3.png" alt="Running" class="sport-img" />
  <div class="sport-caption">Running</div>
</div>
<div class="sport-card">
  <img src="img/spor/5.png" alt="Swimming" class="sport-img" />
  <div class="sport-caption">Swimming</div>
</div>
<div class="sport-card">
  <img src="img/spor/20.png" alt="Cycling" class="sport-img" />
  <div class="sport-caption">Duathlon</div>
</div>
<div class="sport-card">
  <img src="img/spor/6.png" alt="Running" class="sport-img" />
  <div class="sport-caption">Running</div>
</div>
<div class="sport-card">
  <img src="img/spor/8.png" alt="Swimming" class="sport-img" />
  <div class="sport-caption">Cycling</div>
</div>
<div class="sport-card">
  <img src="img/spor/23.png" alt="Cycling" class="sport-img" />
  <div class="sport-caption">Cycling</div>
</div>
<div class="sport-card">
  <img src="img/spor/9.png" alt="Running" class="sport-img" />
  <div class="sport-caption">Running</div>
</div>

</section>


      <!-- Social Media Section -->
      <section id="social-media">
        <h2 class="section-title">
          <i class="fas fa-share-alt"></i> Social Media
        </h2>
        <div class=" content sosial-content">
        <div class="container">
          <a href="#" class="btn-sosmed btn-facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a>
          <a href="https://www.instagram.com/kazatlet?igsh=eWkyaWNydWhteG1t" class="btn-sosmed btn-instagram"><i class="fa fa-instagram" aria-hidden="true"></i></a>
          <a href="#" class="btn-sosmed btn-youtube"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
          <a href="https://github.com/Orhanguezel" class="btn-sosmed btn-github"><i class="fab fa-github" aria-hidden="true"></i></a>
          <a href="https://www.linkedin.com/in/orhan-g%C3%BCzel-53b47b11a/" class="btn-sosmed btn-linkedin"><i class="fab fa-linkedin"aria-hidden="true"></i></a>
          <a href="https://codepen.io/Orhan-G-zel" class="btn-sosmed btn-codepen"><i class="fab fa-codepen"aria-hidden="true"></i></a>
        </div>
        </div>
      </section>
    </section>
      `;
  } else {
    console.error("Element with ID 'main-content' not found.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadAboutPage();
});
