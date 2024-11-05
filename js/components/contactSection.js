export function loadContactSection() {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {  // DOM'da `contact-section` olup olmadığını kontrol edin
        contactSection.innerHTML = `
          <section class="contact-summary">
            <h2 class="section-title">
              Get in <span class="highlight">Touch</span>
            </h2>
            <p>
              If you would like to work together or have any questions, feel free to
              reach out to me.
            </p>
            <div class="view-all">
              <a href="contact.html" class="btn">Contact Me</a>
            </div>
          </section>
        `;
    }
}
