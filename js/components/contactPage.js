export function loadContactPage() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
      contactSection.innerHTML = `
        <section class="contact-page">
            <h2 class="section-title">Get In Touch And Feel Free To <span class="highlight">Contact Us</span></h2>
            <p>
              Feel free to reach out to us for any inquiries or assistance you may
              need. Our team is dedicated to providing you with top-notch service
              and answering all your questions. Whether you’re looking for more
              information about our services, need support, or simply want to give
              feedback, we’re here to help. Get in touch with us today!
            </p>
      
          <div class="contact-container">
            <div class="contact-cards">
              <div class="card">
                <div class="icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="info">
                  <h3>Office Location</h3>
                  <p>13th Rock Street, San Francisco</p>
                </div>
              </div>
              <div class="card">
                <div class="icon">
                  <i class="fas fa-phone"></i>
                </div>
                <div class="info">
                  <h3>Phone Number</h3>
                  <p>+235-569-559-66, +985-365-226-447</p>
                </div>
              </div>
              <div class="card">
                <div class="icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="info">
                  <h3>Mail Address</h3>
                  <p>support@example.com</p>
                </div>
              </div>
            </div>
      
            <div class="contact-form">
              <form action="#" method="POST">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <input type="text" placeholder="Your Subject" />
                <textarea placeholder="Your Message (optional)" rows="5"></textarea>
                <button type="submit">Submit Message</button>
              </form>
            </div>
          </div>
        </section>
      `;
  } else {
      console.log("Element with id 'contact' not found.");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadContactPage();
});
