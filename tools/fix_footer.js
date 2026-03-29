const fs = require('fs');
const path = require('path');

const galerieHTMLPath = path.join(__dirname, '../galerie.html');
let html = fs.readFileSync(galerieHTMLPath, 'utf8');

// The clean footer block extracted from index.html
const missingFooter = `
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="cta-banner">
    <div class="container">
      <div class="cta-content">
        <h2>Projekt geplant? Wir beraten Sie gerne.</h2>
        <p>Ob Neuanlage, Umbau oder Reparatur – rufen Sie uns an oder schreiben Sie uns.</p>
        <div class="cta-actions">
          <a href="tel:+41796412453" class="btn btn-primary"><i class="ph ph-phone"></i> 079 641 24 53</a>
          <a href="kontakt.html" class="btn btn-outline-dark">Zum Kontaktformular <i class="ph ph-arrow-right"></i></a>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo footer-logo">
            <img src="img/logo.png" alt="Steinmann Melktechnik Logo" class="logo-img">
          </a>
          <p>Ihr Fachpartner für Melktechnik, Stalleinrichtungen und Hoftechnik in Hüswil, Luzern.</p>
        </div>
        <div class="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="ueber-uns.html">Über uns</a></li>
            <li><a href="dienstleistungen.html">Dienstleistungen</a></li>
            <li><a href="produkte.html">Produkte</a></li>
            <li><a href="referenzen.html">Referenzen</a></li>
            <li><a href="galerie.html">Galerie</a></li>
            <li><a href="partner.html">Partner</a></li>
            <li><a href="kontakt.html">Kontakt</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Leistungen</h4>
          <ul>
            <li><a href="dienstleistungen.html">Melktechnik</a></li>
            <li><a href="dienstleistungen.html">Kühltechnik</a></li>
            <li><a href="dienstleistungen.html">Stalleinrichtungen</a></li>
            <li><a href="dienstleistungen.html">Fütterungstechnik</a></li>
            <li><a href="dienstleistungen.html">Service & Reparatur</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4>Kontakt</h4>
          <p><a href="https://www.google.com/maps/search/?api=1&query=Bernstrasse+7a,+6152+Hüswil,+Schweiz" target="_blank" rel="noopener"><i class="ph ph-map-pin"></i> Bernstrasse 7a, 6152 Hüswil</a></p>
          <p><i class="ph ph-phone"></i> <a href="tel:+41796412453">079 641 24 53</a></p>
          <p><i class="ph ph-envelope"></i> <a href="mailto:steinmann.urs@bluewin.ch">steinmann.urs@bluewin.ch</a></p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Steinmann Melktechnik GmbH. Alle Rechte vorbehalten.</p>
        <div class="footer-legal">
          <a href="impressum.html">Impressum</a>
          <a href="datenschutz.html">Datenschutz</a>
        </div>
        <div class="footer-created-by">
          <span>Diese Webseite wurde erstellt von</span>
          <a href="https://gross-ict.ch" target="_blank" rel="noopener"><img src="img/gross-ict_logo.png" alt="Gross ICT" class="created-by-logo"></a>
        </div>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
  <script src="js/galerie.js?v=2"></script>
  <!-- Cookie Banner -->
  <div class="cookie-banner" id="cookieBanner">
    <p>Diese Website verwendet Google Fonts. Dabei werden Daten an Google übermittelt. Mehr dazu in unserer <a href="datenschutz.html">Datenschutzerklärung</a>.</p>
    <div class="cookie-banner-actions">
      <button class="btn-cookie btn-cookie-accept" id="cookieAccept">Verstanden</button>
      <button class="btn-cookie btn-cookie-decline" id="cookieDecline">Ablehnen</button>
    </div>
  </div>
  <script>
    (function(){
      if(localStorage.getItem("cookieConsent"))return;
      var b=document.getElementById("cookieBanner");
      if(!b)return;
      setTimeout(function(){b.classList.add("visible");},800);
      document.getElementById("cookieAccept").addEventListener("click",function(){
        localStorage.setItem("cookieConsent","accepted");b.classList.remove("visible");
      });
      document.getElementById("cookieDecline").addEventListener("click",function(){
        localStorage.setItem("cookieConsent","declined");b.classList.remove("visible");
      });
    })();
  </script>
</body>
</html>
`;

if (!html.includes('</html>')) {
    html += missingFooter;
    fs.writeFileSync(galerieHTMLPath, html, 'utf8');
    console.log("Footer and Javascript correctly restored!");
} else {
    console.log("Footer is already present. Not appending again.");
}
