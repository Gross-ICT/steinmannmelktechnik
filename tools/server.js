const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Paths
const imgDir = path.join(__dirname, '../img');
const processedDir = path.join(imgDir, 'Fotos_processed');
const galerieHTMLPath = path.join(__dirname, '../galerie.html');

// Create generic projects dir to avoid duplicating multiple-category files
const projectsDir = path.join(imgDir, 'galerie', 'projekte');
if (!fs.existsSync(projectsDir)) fs.mkdirSync(projectsDir, { recursive: true });

const tagNames = {
    'melktechnik': 'Melktechnik',
    'kuehltechnik': 'Kühltechnik',
    'fuetterung': 'Fütterung',
    'stall': 'Stall',
    'anlaesse': 'Anlässe',
    'diverses': 'Diverses',
    'belueftung': 'Belüftung',
    'aufstallung': 'Aufstallungssysteme'
};

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(processedDir));

app.get('/api/images', (req, res) => {
    try {
        if (!fs.existsSync(processedDir)) return res.json([]);
        const files = fs.readdirSync(processedDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
        res.json(files);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/categorize', (req, res) => {
    const { file, categories } = req.body;
    
    // Ensure categories is an array and valid
    if (!file || !Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({ error: 'Ungültige Parameter' });
    }

    const sourcePath = path.join(processedDir, file);
    const destPath = path.join(projectsDir, file);

    try {
        if (fs.existsSync(sourcePath)) {
            // Move file to general projekte folder
            fs.renameSync(sourcePath, destPath);

            // Update galerie.html with all assigned categories
            updateGalerieHTML(categories, file);

            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Datei nicht gefunden' });
        }
    } catch (e) {
        console.error("Fehler beim Verschieben:", e);
        res.status(500).json({ error: e.message });
    }
});

function updateGalerieHTML(selectedCategories, filename) {
    if (!fs.existsSync(galerieHTMLPath)) return;
    
    let html = fs.readFileSync(galerieHTMLPath, 'utf8');
    
    const searchString = '<div class="galerie-grid" id="galerieGrid">';
    const idx = html.indexOf(searchString);
    
    if (idx !== -1) {
        const catString = selectedCategories.join(' ');
        const tagsFriendly = selectedCategories.map(c => tagNames[c]).join(', ');
        const mainCatFriendly = tagNames[selectedCategories[0]];
        
        // Extract year from WhatsApp filename "WhatsApp Image 2026-03-28..."
        const yearMatch = filename.match(/\d{4}/);
        const yearObj = yearMatch ? yearMatch[0] : new Date().getFullYear();

        const newBlock = `
        <div class="galerie-item" data-category="${catString}">
          <div class="galerie-placeholder">
            <img src="img/galerie/projekte/${filename}" alt="${mainCatFriendly}" loading="lazy">
          </div>
          <div class="galerie-overlay">
            <h3>${mainCatFriendly}</h3>
            <span class="galerie-tag">${tagsFriendly}</span>
          </div>
        </div>`;
        
        const insertPos = idx + searchString.length;
        html = html.substring(0, insertPos) + newBlock + html.substring(insertPos);
        fs.writeFileSync(galerieHTMLPath, html, 'utf8');
    }
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n================================`);
    console.log(`✅ Server gestartet (Multiselect-Modus)!`);
    console.log(`👉 Öffne: http://localhost:${PORT}`);
    console.log(`================================\n`);
});
