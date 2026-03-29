const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../img');
const processedDir = path.join(imgDir, 'Fotos_processed');
const galerieHTMLPath = path.join(__dirname, '../galerie.html');

// 1. Dateien zurückschieben
const dirsToCheck = [
    path.join(imgDir, 'galerie', 'melktechnik'),
    path.join(imgDir, 'galerie', 'stalleinrichtung'),
    path.join(imgDir, 'galerie', 'kuehltechnik'),
    path.join(imgDir, 'galerie', 'fuetterung'),
    path.join(imgDir, 'galerie', 'stall'),
    path.join(imgDir, 'galerie', 'anlaesse'),
    path.join(imgDir, 'galerie', 'diverses'),
    path.join(imgDir, 'galerie', 'projekte')
];

let movedCount = 0;
for (const dir of dirsToCheck) {
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));
        for (const file of files) {
            fs.renameSync(path.join(dir, file), path.join(processedDir, file));
            movedCount++;
        }
    }
}
console.log(`🔙 ${movedCount} Bilder wurden zurück in Fotos_processed verschoben.`);

// 2. HTML bereinigen
if (fs.existsSync(galerieHTMLPath)) {
    let html = fs.readFileSync(galerieHTMLPath, 'utf8');
    
    const parts = html.split('<div class="galerie-item"');
    let newHtml = parts[0];
    let removedCount = 0;
    
    for (let i = 1; i < parts.length; i++) {
        const block = parts[i];
        if (block.includes('<img src="img/galerie/') && block.includes('Neues Projekt:')) {
            removedCount++;
        } else {
            newHtml += '<div class="galerie-item"' + block;
        }
    }
    
    fs.writeFileSync(galerieHTMLPath, newHtml, 'utf8');
    console.log(`🧹 ${removedCount} Einträge wurden aus der galerie.html entfernt.`);
}
