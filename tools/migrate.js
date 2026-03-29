const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../');
const galeriePath = path.join(rootDir, 'galerie.html');
const serverPath = path.join(__dirname, 'server.js');
const uiPath = path.join(__dirname, 'public/index.html');

// 1. Update galerie.html
let galerie = fs.readFileSync(galeriePath, 'utf8');

galerie = galerie.replace(/stalleinrichtung/g, 'aufstallung');
galerie = galerie.replace(/Stalleinrichtungen/g, 'Aufstallungssysteme');

// Deduplicate tags and categories if any
galerie = galerie.replace(/aufstallung aufstallung/g, 'aufstallung');
galerie = galerie.replace(/Aufstallungssysteme, Aufstallungssysteme/g, 'Aufstallungssysteme');

// Remove duplicated filter button (since we had one for 'aufstallung' and one for 'stalleinrichtung', which is now also 'aufstallung')
const duplicatedButtonRegex = /<button class="filter-btn" data-filter="aufstallung">Aufstallungssysteme<\/button>\s*<button class="filter-btn" data-filter="aufstallung">Aufstallungssysteme<\/button>/g;
galerie = galerie.replace(duplicatedButtonRegex, '<button class="filter-btn" data-filter="aufstallung">Aufstallungssysteme</button>');

fs.writeFileSync(galeriePath, galerie, 'utf8');

// 2. Update server.js
let serverJs = fs.readFileSync(serverPath, 'utf8');
serverJs = serverJs.replace(/[ \t]*'stalleinrichtung': 'Stalleinrichtungen',?\r?\n/g, '');
fs.writeFileSync(serverPath, serverJs, 'utf8');

// 3. Update index.html
let ui = fs.readFileSync(uiPath, 'utf8');

ui = ui.replace(/[ \t]*<div class="shortcut">9\. Stalleinrichtungen \(9\)<\/div>\r?\n/g, '');
ui = ui.replace(/[ \t]*<button class="btn" id="btn_stalleinrichtung" onclick="toggle\('stalleinrichtung'\)">9\. Stalleinrichtungen<\/button>\r?\n/g, '');
ui = ui.replace(/[ \t]*'9': 'stalleinrichtung'\r?\n/g, '');

fs.writeFileSync(uiPath, ui, 'utf8');

console.log("Migration von Stalleinrichtungen zu Aufstallungssysteme abgeschlossen!");
