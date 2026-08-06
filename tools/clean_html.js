const fs = require('fs');
const path = require('path');

const galerieHTMLPath = path.join(__dirname, '../galerie.html');

if (fs.existsSync(galerieHTMLPath)) {
    let html = fs.readFileSync(galerieHTMLPath, 'utf8');
    
    // 1. Remove blocks with placeholders
    const parts = html.split('<div class="galerie-item"');
    let newHtml = parts[0];
    let removedCount = 0;
    
    for (let i = 1; i < parts.length; i++) {
        const block = parts[i];
        if (block.includes('<i class="ph ph-image"></i>')) {
            removedCount++;
        } else {
            newHtml += '<div class="galerie-item"' + block;
        }
    }
    
    html = newHtml;

    // 2. Fix titles (Neues Projekt: -> "") 
    html = html.replace(/<h3>Neues Projekt: (.*?)<\/h3>/g, '<h3>$1</h3>');

    // 3. Fix Updated text
    html = html.replace(/<p>Aktualisiert (\d{4})<\/p>/g, '<p>Aufgenommen $1</p>');

    fs.writeFileSync(galerieHTMLPath, html, 'utf8');
    console.log(`Bereinigt: ${removedCount} Platzhalter entfernt. Alte Titel und Daten aktualisiert!`);
} else {
    console.log("galerie.html nicht gefunden!");
}
