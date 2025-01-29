export function loadContactPage() {
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.innerHTML = `
        <section class="contact-page">
            <h2 class="section-title">Get In Touch And Feel Free To <span class="highlight">Contact Us</span></h2>
            <p>
              Feel free to reach out to us for any inquiries or assistance you may
              need. Our team is dedicated to providing you with top-notch service
              and answering all your questions. 
            </p>
      
          <div class="contact-container">
            <div class="contact-cards">
              <div class="card">
                <div class="icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="info">
                  <h3>Office Location</h3>
                  <p>Grevenbroich, NRW, Germany</p>
                </div>
              </div>
              <div class="card">
                <div class="icon">
                  <i class="fas fa-phone"></i>
                </div>
                <div class="info">
                  <h3>Phone Number</h3>
                  <p>+49 172 3846068</p>
                </div>
              </div>
              <div class="card">
                <div class="icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="info">
                  <h3>Mail Address</h3>
                  <p>orhan.guezel@dci-student.org</p>
                </div>
              </div>
            </div>
      
            <div class="contact-form">
              <form id="contactForm">
                <input type="text" id="name" placeholder="Your Name" required />
                <input type="email" id="email" placeholder="Your Email" required />
                <input type="text" id="subject" placeholder="Your Subject" required />
                <textarea id="message" placeholder="Your Message" rows="5" required></textarea>
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      `;
    
    document.getElementById("contactForm").addEventListener("submit", async function(event) {
      event.preventDefault();
      
      const data = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          subject: document.getElementById("subject").value,
          message: document.getElementById("message").value
      };

      const response = await fetch("https://guezelwebdesign.com/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
      });

      const result = await response.json();
      alert(result.message);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadContactPage();
});
