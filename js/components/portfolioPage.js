export function loadPortfolioPage() {
  const mainContent = document.getElementById("portfolio-content");

  if (mainContent) {
    mainContent.innerHTML = `
        <section class="portfolio-hero" id="portfolio-hero">
          <div class="portfolio-content">
            <h2>My Portfolio</h2>
            <img src="img/portfolio3.png" alt="portfolio" class="portfolio-image" />
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
  <img src="assets/kino-ticket.png" alt="Kino-Ticket und Admin-Panel Project" class="projects-image" id="kino-ticket" />
  <div class="projects-details">
    <h3>Kino-Ticket und Admin-Panel 🎥🍿</h3>
    <p>An interactive platform for booking cinema tickets and managing cinemas, movies, and showtimes through a dedicated Admin Panel. The project offers a seamless experience for both users and administrators.</p>
    <h4>Technologies Used:</h4>
    <ul>
      <li>Frontend: HTML5, CSS3, SASS, JavaScript (ES6)</li>
      <li>Backend: Node.js</li>
      <li>Testing: Jest</li>
      <li>Local Storage: Persistent data storage</li>
    </ul>
    <h4>Key Features:</h4>
    <ul>
      <li>User-friendly ticket booking with seat selection</li>
      <li>Dynamic admin management for cinemas, movies, and showtimes</li>
      <li>Responsive design for all devices</li>
      <li>Integration of a cart system with LocalStorage</li>
    </ul>
    <a href="https://orhanguezel.github.io/Kino-Ticket/" target="_blank" class="btn">View Project</a>
  </div>
</div>



          <div class="projects-card">
  <img src="assets/pastoral.png" alt="Pastoral TMGDK Project" class="projects-image" id="pastoral-tmgdk" />
  <div class="projects-details">
    <h3>Pastoral TMGDK</h3>
    <p>Pastoral TMGDK is a web-based application that offers professional consultancy services in the field of hazardous material management, with a focus on compliance, environmental safety, and public health.</p>
    <h4>Technologies Used:</h4>
    <ul>
      <li>Frontend: HTML5, CSS3, JavaScript</li>
      <li>Responsive Design: Mobile-friendly layouts</li>
      <li>SEO Optimization: Robots.txt and sitemap integration</li>
    </ul>
    <h4>Key Features:</h4>
    <ul>
      <li>Dynamic components: Header, footer, and carousel</li>
      <li>Real-time data loading for services, regulations, and sectors</li>
      <li>Comprehensive consultancy tools</li>
    </ul>
    <a href="https://www.pastoraltmgdk.com" target="_blank" class="btn">View Project</a>
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
  <img src="assets/cinema-house.png" alt="Cinema-House Project" class="projects-image" id="cinema-house" />
  <div class="projects-details">
    <h3>Cinema-House</h3>
    <p>Cinema-House is a dynamic and responsive web application for browsing and exploring movies. Users can filter movies by popularity, release dates, genres, and ratings, and view detailed movie information.</p>
    <h4>Technologies Used:</h4>
    <ul>
      <li>Frontend: HTML5, CSS3, JavaScript</li>
      <li>API Integration: The Movie Database (TMDb)</li>
      <li>Package Management: Node.js</li>
    </ul>
    <h4>Key Features:</h4>
    <ul>
      <li>Movie search and filtering</li>
      <li>Detailed movie information including cast and genres</li>
      <li>Responsive design for both desktop and mobile devices</li>
      <li>German localization</li>
    </ul>
    <a href="https://orhanguezel.github.io/Cinema-House/" target="_blank" class="btn">View Project</a>
  </div>
</div>

<div class="projects-card">
  <img src="assets/pokemon.png" alt="Pokémon Search and Catch Game" class="projects-image" id="pokemon-game" />
  <div class="projects-details">
    <h3>Pokémon Search and Catch Game</h3>
    <p>A fun and interactive web application where users can search, display, and catch Pokémon using the PokeAPI. Includes animations, sound effects, and confetti celebrations for a delightful experience.</p>
    <h4>Technologies Used:</h4>
    <ul>
      <li>Frontend: HTML5, CSS3, JavaScript</li>
      <li>API Integration: PokeAPI</li>
      <li>Animations: Canvas-Confetti Library</li>
    </ul>
    <h4>Key Features:</h4>
    <ul>
      <li>Search and view Pokémon details, including stats and abilities</li>
      <li>Catch Pokémon with sound effects and animations</li>
      <li>Celebrate with confetti when all Pokémon are caught</li>
      <li>Responsive design for all devices</li>
    </ul>
    <a href="https://orhanguezel.github.io/Pokemon/" target="_blank" class="btn">View Project</a>
  </div>
</div>

<div class="projects-card">
  <img src="assets/weather-app.png" alt="Weather App Project" class="projects-image" id="weather-app" />
  <div class="projects-details">
    <h3>Weather App</h3>
    <p>A responsive web application that allows users to search for the current weather of any city using real-time data from the OpenWeatherMap API.</p>
    <h4>Technologies Used:</h4>
    <ul>
      <li>Frontend: HTML5, CSS3, JavaScript</li>
      <li>API Integration: OpenWeatherMap API</li>
      <li>Responsive Design: Suitable for all screen sizes</li>
    </ul>
    <h4>Key Features:</h4>
    <ul>
      <li>Search weather by city name</li>
      <li>Displays temperature, weather condition, and an icon</li>
      <li>Responsive and user-friendly interface</li>
    </ul>
    <a href="https://orhanguezel.github.io/WeatherApp/" target="_blank" class="btn">View Project</a>
  </div>
</div>

 <div class="projects-card">
            <img src="assets/github-app.png" alt="GitHub User and Repository Search Tool" class="projects-image" id="github-tool" />
            <div class="projects-details">
              <h3>GitHub User and Repository Search Tool</h3>
              <p>A simple web-based tool to search GitHub repositories and user profiles using the GitHub REST API...</p>
              <h4>Technologies Used:</h4>
              <ul>
                <li>Frontend: HTML5, CSS3, JavaScript</li>
                <li>API: GitHub REST API</li>
                <li>Responsive Design</li>
              </ul>
              <h4>Key Features:</h4>
              <ul>
                <li>Search repositories by GitHub username</li>
                <li>Fetch detailed GitHub user information</li>
                <li>Error handling for invalid usernames</li>
                <li>Responsive design for mobile and desktop</li>
              </ul>
              <a href="https://orhanguezel.github.io/GitHubRepositorySearch/" target="_blank" class="btn">View Project</a>
            </div>
          </div>


<div class="projects-card">
            <img src="assets/harry-potter.png" alt="Harry Potter App Project" class="projects-image" id="harry-potter-app" />
            <div class="projects-details">
              <h3>Harry Potter App 🧙‍♂️</h3>
              <p>An engaging and responsive web application that showcases the magical world of Harry Potter, featuring characters, spells, houses, and books from the franchise.</p>
              <h4>Technologies Used:</h4>
              <ul>
                <li>Frontend: HTML5, CSS3, JavaScript</li>
                <li>API Integration: hp-api, Potter API</li>
                <li>Responsive Design: Tailored for all screen sizes</li>
              </ul>
              <h4>Key Features:</h4>
              <ul>
                <li>Dynamic search for characters, spells, books, and houses</li>
                <li>Interactive UI with real-time API data</li>
                <li>Responsive and user-friendly interface</li>
                <li>Deployed using GitHub Pages</li>
              </ul>
              <a href="https://orhanguezel.github.io/Harry-Potter-app/" target="_blank" class="btn">View Project</a>
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
