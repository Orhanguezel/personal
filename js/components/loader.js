export function loadLoader() {
    const loader = document.getElementById('loader');
    loader.innerHTML = `
      <div class="progress-wrap">
        <h1>Loading...</h1>
        <div class="progress-bar">
          <div class="progress"></div>
        </div>
      </div>
    `;
  }
  