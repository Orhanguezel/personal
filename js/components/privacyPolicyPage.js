export function loadPrivacyPolicyPage() {
  const contactSection = document.getElementById("privacy-policy");
  if (contactSection) {
    contactSection.innerHTML = `
          <section class="privacy-policy-page">
          <div class="container">
          <h1>Privacy Policy</h1>
        <p><strong>Effective Date:</strong> January 1, 2025</p>
        <p>At Guezel Web Design ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website <a href="https://www.guezelwebdesign.com">https://www.guezelwebdesign.com</a>. Please read this policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.</p>

        <h2>Information We Collect</h2>
        <p>We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
        <ul>
            <li><strong>Personal Data:</strong> Information such as your name, email address, and phone number that you voluntarily provide when registering or contacting us.</li>
            <li><strong>Derivative Data:</strong> Information our servers collect automatically, such as your IP address, browser type, and pages you view.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We may use the information collected about you to:</p>
        <ul>
            <li>Provide and manage our services.</li>
            <li>Improve user experience.</li>
            <li>Contact you with updates and promotional materials.</li>
        </ul>

        <h2>Sharing Your Information</h2>
        <p>We do not sell, trade, or share your personal information with third parties unless required by law or with your consent.</p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
            <li>Access the information we store about you.</li>
            <li>Request the deletion of your personal information.</li>
        </ul>
        <p>To exercise these rights, please contact us at <a href="mailto:orhanguezel@dci-studentorg">orhanguezel@dci-studentorg</a>.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <ul>
            <li>Email: <a href="orhanguezel@dci-studentorg">orhanguezel@dci-student.org</a></li>
            <li>Website: <a href="https://www.guezelwebdesign.com">https://www.guezelwebdesign.com</a></li>
        </ul>
    </div>
          </section>
        `;
  } else {
    console.log("Element with id 'contact' not found.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPrivacyPolicyPage();
});
