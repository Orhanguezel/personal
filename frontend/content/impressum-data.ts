/**
 * Impressum content per locale.
 *
 * LEGAL BASIS:
 *   - § 5 DDG (Digitale-Dienste-Gesetz) — Pflichtangaben
 *   - § 18 Abs. 2 MStV — inhaltlich Verantwortlicher
 *   - § 19 UStG — Kleinunternehmerregelung (wenn zutreffend)
 *   - DSGVO Art. 13/14 — Datenschutz-Verweis
 *
 * JOBCENTER-NOTE:
 *   - Impressum ist gesetzliche Pflicht, KEIN Nachweis eines Vollzeitgewerbes.
 *   - "Freiberufliche Taetigkeit" gemaess § 18 EStG erfordert KEINEN Gewerbeschein.
 *   - Einkuenfte werden dem Jobcenter ordnungsgemaess gemeldet.
 *   - Kleinunternehmerregelung (§ 19 UStG) = keine MwSt.-Ausweisung.
 */

export type ImpressumSection = {
  title: string;
  html: string;
};

export const impressumByLocale: Record<string, ImpressumSection> = {
  de: {
    title: 'Impressum',
    html: `
<h2>Impressum</h2>
<p><strong>Angaben gemaess § 5 DDG (Digitale-Dienste-Gesetz)</strong></p>

<h3>Diensteanbieter</h3>
<p>
  Orhan Guezel<br />
  Freiberuflicher Webentwickler<br />
  Daimlerstrasse 50<br />
  41516 Grevenbroich<br />
  Deutschland
</p>

<h3>Kontakt</h3>
<p>
  E-Mail: <a href="mailto:info@guezelwebdesign.com">info@guezelwebdesign.com</a><br />
  Telefon: +49 172 384 6068<br />
  Website: <a href="https://guezelwebdesign.com">https://guezelwebdesign.com</a>
</p>

<h3>Berufsbezeichnung</h3>
<p>Freiberuflicher Webentwickler / Full-Stack Developer (Freiberufliche Taetigkeit gemaess § 18 EStG)</p>

<h3>Umsatzsteuer</h3>
<p>Gemaess § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).</p>

<h3>Inhaltlich Verantwortlicher gemaess § 18 Abs. 2 MStV</h3>
<p>Orhan Guezel (Anschrift wie oben)</p>

<h3>EU-Streitbeilegung</h3>
<p>Die Europaeische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
<a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.
Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

<h3>Haftungsausschluss</h3>
<h4>Haftung fuer Inhalte</h4>
<p>Die Inhalte dieser Seiten wurden mit groesster Sorgfalt erstellt. Fuer die Richtigkeit, Vollstaendigkeit und Aktualitaet der Inhalte koennen wir jedoch keine Gewaehr uebernehmen. Als Diensteanbieter sind wir gemaess § 7 Abs. 1 DDG fuer eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Gemaess §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, uebermittelte oder gespeicherte fremde Informationen zu ueberwachen.</p>

<h4>Haftung fuer Links</h4>
<p>Unser Angebot enthaelt Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Fuer die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.</p>

<h4>Urheberrecht</h4>
<p>Die Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfaeltigung, Bearbeitung oder Verbreitung bedarf der schriftlichen Zustimmung des Autors.</p>

<h3>Datenschutz</h3>
<p>Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer <a href="/de/custompages/policy/datenschutz">Datenschutzerklaerung</a>.</p>
    `.trim(),
  },

  en: {
    title: 'Legal Notice (Impressum)',
    html: `
<h2>Legal Notice (Impressum)</h2>
<p><strong>Information according to § 5 DDG (German Digital Services Act)</strong></p>

<h3>Service Provider</h3>
<p>
  Orhan Guezel<br />
  Freelance Web Developer<br />
  Daimlerstrasse 50<br />
  41516 Grevenbroich<br />
  Germany
</p>

<h3>Contact</h3>
<p>
  Email: <a href="mailto:info@guezelwebdesign.com">info@guezelwebdesign.com</a><br />
  Phone: +49 172 384 6068<br />
  Website: <a href="https://guezelwebdesign.com">https://guezelwebdesign.com</a>
</p>

<h3>Professional Title</h3>
<p>Freelance Web Developer / Full-Stack Developer (Freelance activity pursuant to § 18 EStG, German Income Tax Act)</p>

<h3>VAT</h3>
<p>No VAT is charged pursuant to § 19 UStG (German small business regulation).</p>

<h3>Responsible for Content (§ 18 Abs. 2 MStV)</h3>
<p>Orhan Guezel (address as above)</p>

<h3>EU Dispute Resolution</h3>
<p>The European Commission provides a platform for online dispute resolution (ODR):
<a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.
We are neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board.</p>

<h3>Disclaimer</h3>
<h4>Liability for Content</h4>
<p>The contents of our pages were created with great care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 (1) DDG.</p>

<h4>Liability for Links</h4>
<p>Our website contains links to external third-party websites over whose content we have no control. The respective provider is always responsible for the content of linked pages.</p>

<h4>Copyright</h4>
<p>The content and works on these pages are subject to German copyright law. Duplication, processing, or distribution requires written consent of the author.</p>

<h3>Privacy</h3>
<p>Information about the processing of personal data can be found in our <a href="/en/custompages/policy/privacy-policy">Privacy Policy</a>.</p>
    `.trim(),
  },

  tr: {
    title: 'Yasal Bildirim (Impressum)',
    html: `
<h2>Yasal Bildirim (Impressum)</h2>
<p><strong>Alman Dijital Hizmetler Yasasi (§ 5 DDG) kapsaminda zorunlu bilgiler</strong></p>

<h3>Hizmet Saglayici</h3>
<p>
  Orhan Guezel<br />
  Serbest Web Gelistirici<br />
  Daimlerstrasse 50<br />
  41516 Grevenbroich<br />
  Almanya
</p>

<h3>Iletisim</h3>
<p>
  E-posta: <a href="mailto:info@guezelwebdesign.com">info@guezelwebdesign.com</a><br />
  Telefon: +49 172 384 6068<br />
  Web sitesi: <a href="https://guezelwebdesign.com">https://guezelwebdesign.com</a>
</p>

<h3>Meslek Unvani</h3>
<p>Serbest Web Gelistirici / Full-Stack Developer (Alman Gelir Vergisi Kanunu § 18 EStG kapsaminda serbest meslek faaliyeti)</p>

<h3>KDV</h3>
<p>§ 19 UStG (Alman kucuk isletme duzenlemesi) kapsaminda KDV alinmamaktadir.</p>

<h3>Icerikten Sorumlu Kisi (§ 18 Abs. 2 MStV)</h3>
<p>Orhan Guezel (yukaridaki adres)</p>

<h3>AB Uyusmazlik Cozumu</h3>
<p>Avrupa Komisyonu cevrimici uyusmazlik cozumu (ODR) platformu sunmaktadir:
<a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.
Bir tuketici arabuluculuk kurulu nezdinde uyusmazlik cozum surecine katilma zorunlulugumuz ve niyetimiz bulunmamaktadir.</p>

<h3>Sorumluluk Reddi</h3>
<h4>Icerik Sorumlulugu</h4>
<p>Sayfalarimizin icerigi buyuk bir ozenle olusturulmustur. Ancak icerigin dogrulugu, eksiksizligi veya guncelligi konusunda garanti veremeyiz.</p>

<h4>Baglanti Sorumlulugu</h4>
<p>Web sitemiz, icerigini kontrol edemedigimiz ucuncu taraf web sitelerine baglantilar icermektedir.</p>

<h4>Telif Hakki</h4>
<p>Bu sayfalardaki icerik ve eserler Alman telif hakki yasasina tabidir.</p>

<h3>Gizlilik</h3>
<p>Kisisel verilerin islenmesine iliskin bilgileri <a href="/tr/custompages/policy/gizlilik-politikasi">Gizlilik Politikamizda</a> bulabilirsiniz.</p>
    `.trim(),
  },
};
