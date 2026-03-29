const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../');
const galeriePath = path.join(rootDir, 'galerie.html');
const serverPath = path.join(__dirname, 'server.js');
const uiPath = path.join(__dirname, 'public/index.html');

// 1. Rename lueftung to belueftung in server.js
let serverJs = fs.readFileSync(serverPath, 'utf8');
serverJs = serverJs.replace(/'lueftung': 'Lüftung'/g, "'belueftung': 'Belüftung'");
fs.writeFileSync(serverPath, serverJs, 'utf8');

// 2. Rename lueftung to belueftung in galerie.html and reorder filter buttons
let galerie = fs.readFileSync(galeriePath, 'utf8');
// globally replace any data-category="lueftung" that might have been saved already
galerie = galerie.replace(/lueftung/g, 'belueftung');

// Now replace the filter section with alphabetical sorting
const oldFilterRegex = /<div class="galerie-filter">[\s\S]*?<\/div>/;
const newFilter = `<div class="galerie-filter">
        <button class="filter-btn active" data-filter="alle">Alle</button>
        <button class="filter-btn" data-filter="anlaesse">Anlässe</button>
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

// 3. Rebuild UI in tools/public/index.html to have alphabetical shortcuts
let ui = fs.readFileSync(uiPath, 'utf8');
ui = ui.replace(/lueftung/g, 'belueftung');

const newUIButtons = `<div class="shortcut">1. Anlässe (1)</div>
        <div class="shortcut">2. Belüftung (2)</div>
        <div class="shortcut">3. Diverses (3)</div>
        <div class="shortcut">4. Fütterung (4)</div>
        <div class="shortcut">5. Kühltechnik (5)</div>
        <div class="shortcut">6. Melktechnik (6)</div>
        <div class="shortcut">7. Stall (7)</div>
        <div class="shortcut">8. Stalleinrichtungen (8)</div>
        <div class="shortcut" style="color:red">Überspringen (S)</div>
        <p class="info">Klicke Kategorien an, um sie auszuwählen (Mehrfachauswahl möglich). Drücke dann Enter oder auf "Speichern".</p>
        
        <button class="btn" id="btn_anlaesse" onclick="toggle('anlaesse')">1. Anlässe</button>
        <button class="btn" id="btn_belueftung" onclick="toggle('belueftung')">2. Belüftung</button>
        <button class="btn" id="btn_diverses" onclick="toggle('diverses')">3. Diverses</button>
        <button class="btn" id="btn_fuetterung" onclick="toggle('fuetterung')">4. Fütterung</button>
        <button class="btn" id="btn_kuehltechnik" onclick="toggle('kuehltechnik')">5. Kühltechnik</button>
        <button class="btn" id="btn_melktechnik" onclick="toggle('melktechnik')">6. Melktechnik</button>
        <button class="btn" id="btn_stall" onclick="toggle('stall')">7. Stall</button>
        <button class="btn" id="btn_stalleinrichtung" onclick="toggle('stalleinrichtung')">8. Stalleinrichtungen</button>`;

const newKeyMap = `const keyMap = {
                '1': 'anlaesse',
                '2': 'belueftung',
                '3': 'diverses',
                '4': 'fuetterung',
                '5': 'kuehltechnik',
                '6': 'melktechnik',
                '7': 'stall',
                '8': 'stalleinrichtung'
            };`;

// We use hardcoded regex replaces to precisely overwrite the regions
ui = ui.replace(/<div class="shortcut">1\. Melktechnik[\s\S]*?<button class="btn" id="btn_belueftung" onclick="toggle\('belueftung'\)">8\. Belüftung<\/button>/, newUIButtons);
ui = ui.replace(/const keyMap = {[\s\S]*?};/, newKeyMap);

fs.writeFileSync(uiPath, ui, 'utf8');

console.log("Renamed Lueftung to Belueftung and sorted alphabetically!");
