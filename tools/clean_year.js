const fs = require('fs');
const path = require('path');

const galerieHTMLPath = path.join(__dirname, '../galerie.html');

if (fs.existsSync(galerieHTMLPath)) {
    let html = fs.readFileSync(galerieHTMLPath, 'utf8');
    
    // Replace all "<p>Aufgenommen XXXX</p>" with empty string (plus any surrounding whitespace/newlines if possible)
    html = html.replace(/[ \t]*<p>Aufgenommen \d{4}<\/p>\r?\n/g, '');
    
    fs.writeFileSync(galerieHTMLPath, html, 'utf8');
    console.log("Alle 'Aufgenommen ...' Texte aus galerie.html entfernt.");
}
