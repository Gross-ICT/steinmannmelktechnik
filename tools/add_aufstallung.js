const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../');
const galeriePath = path.join(rootDir, 'galerie.html');
const serverPath = path.join(__dirname, 'server.js');
const uiPath = path.join(__dirname, 'public/index.html');

// 1. Update sever.js tagNames
let serverJs = fs.readFileSync(serverPath, 'utf8');
const oldTagNames = /const tagNames = \{[\s\S]*?\};/;
const newTagNames = `const tagNames = {
    'melktechnik': 'Melktechnik',
    'stalleinrichtung': 'Stalleinrichtungen',
    'kuehltechnik': 'Kühltechnik',
    'fuetterung': 'Fütterung',
    'stall': 'Stall',
    'anlaesse': 'Anlässe',
    'diverses': 'Diverses',
    'belueftung': 'Belüftung',
    'aufstallung': 'Aufstallungssysteme'
};`;
serverJs = serverJs.replace(oldTagNames, newTagNames);
fs.writeFileSync(serverPath, serverJs, 'utf8');

// 2. Update galerie.html
let galerie = fs.readFileSync(galeriePath, 'utf8');
const oldFilterRegex = /<div class="galerie-filter">[\s\S]*?<\/div>/;
const newFilter = `<div class="galerie-filter">
        <button class="filter-btn active" data-filter="alle">Alle</button>
        <button class="filter-btn" data-filter="anlaesse">Anlässe</button>
        <button class="filter-btn" data-filter="aufstallung">Aufstallungssysteme</button>
        <button class="filter-btn" data-filter="belueftung">Belüftung</button>
        <button class="filter-btn" data-filter="diverses">Diverses</button>
        <button class="filter-btn" data-filter="fuetterung">Fütterung</button>
        <button class="filter-btn" data-filter="kuehltechnik">Kühltechnik</button>
        <button class="filter-btn" data-filter="melktechnik">Melktechnik</button>
        <button class="filter-btn" data-filter="stall">Stall</button>
        <button class="filter-btn" data-filter="stalleinrichtung">Stalleinrichtungen</button>
      </div>`;
galerie = galerie.replace(oldFilterRegex, newFilter);
fs.writeFileSync(galeriePath, galerie, 'utf8');

// 3. Update public/index.html UI buttons & key configuration
let ui = fs.readFileSync(uiPath, 'utf8');

const newUIButtons = `<div class="shortcut">1. Anlässe (1)</div>
        <div class="shortcut">2. Aufstallungssysteme (2)</div>
        <div class="shortcut">3. Belüftung (3)</div>
        <div class="shortcut">4. Diverses (4)</div>
        <div class="shortcut">5. Fütterung (5)</div>
        <div class="shortcut">6. Kühltechnik (6)</div>
        <div class="shortcut">7. Melktechnik (7)</div>
        <div class="shortcut">8. Stall (8)</div>
        <div class="shortcut">9. Stalleinrichtungen (9)</div>
        <div class="shortcut" style="color:red">Überspringen (S)</div>
        <p class="info">Klicke Kategorien an, um sie auszuwählen (Mehrfachauswahl möglich). Drücke dann Enter oder auf "Speichern".</p>
        
        <button class="btn" id="btn_anlaesse" onclick="toggle('anlaesse')">1. Anlässe</button>
        <button class="btn" id="btn_aufstallung" onclick="toggle('aufstallung')">2. Aufstallungssysteme</button>
        <button class="btn" id="btn_belueftung" onclick="toggle('belueftung')">3. Belüftung</button>
        <button class="btn" id="btn_diverses" onclick="toggle('diverses')">4. Diverses</button>
        <button class="btn" id="btn_fuetterung" onclick="toggle('fuetterung')">5. Fütterung</button>
        <button class="btn" id="btn_kuehltechnik" onclick="toggle('kuehltechnik')">6. Kühltechnik</button>
        <button class="btn" id="btn_melktechnik" onclick="toggle('melktechnik')">7. Melktechnik</button>
        <button class="btn" id="btn_stall" onclick="toggle('stall')">8. Stall</button>
        <button class="btn" id="btn_stalleinrichtung" onclick="toggle('stalleinrichtung')">9. Stalleinrichtungen</button>`;

const newKeyMap = `const keyMap = {
                '1': 'anlaesse',
                '2': 'aufstallung',
                '3': 'belueftung',
                '4': 'diverses',
                '5': 'fuetterung',
                '6': 'kuehltechnik',
                '7': 'melktechnik',
                '8': 'stall',
                '9': 'stalleinrichtung'
            };`;

const shortcutRegex = /<div class="shortcut">1\. Anlässe[\s\S]*?<button class="btn" id="btn_stalleinrichtung" onclick="toggle\('stalleinrichtung'\)">8\. Stalleinrichtungen<\/button>/;
const keyMapRegex = /const keyMap = \{[\s\S]*?\};/;

ui = ui.replace(shortcutRegex, newUIButtons);
ui = ui.replace(keyMapRegex, newKeyMap);
fs.writeFileSync(uiPath, ui, 'utf8');

console.log("Aufstallungssysteme added successfully.");
