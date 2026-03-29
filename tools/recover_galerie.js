const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../');
const backupPath = path.join(rootDir, 'galerie_backup.html');
const cleanPath = path.join(rootDir, 'galerie.html');

const correctHeader = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/png" href="img/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Galerie – Projekte und Arbeiten der Steinmann Melktechnik GmbH. Melkanlagen, Stalleinrichtungen und mehr.">
  <title>Galerie – Steinmann Melktechnik GmbH</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/style.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <!-- Navigation -->
  <nav class="navbar navbar-inner" id="navbar">
    <div class="container nav-container">
      <a href="index.html" class="nav-logo">
        <img src="img/logo.png" alt="Steinmann Melktechnik Logo" class="logo-img">
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Navigation umschalten">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-menu" id="navMenu">
        <li><a href="index.html" class="nav-link">Home</a></li>
        <li><a href="ueber-uns.html" class="nav-link">Über uns</a></li>
        <li><a href="dienstleistungen.html" class="nav-link">Dienstleistungen</a></li>
        <li><a href="produkte.html" class="nav-link">Produkte</a></li>
        <li><a href="referenzen.html" class="nav-link">Referenzen</a></li>
        <li><a href="galerie.html" class="nav-link active">Galerie</a></li>
        <li><a href="partner.html" class="nav-link">Partner</a></li>
        <li><a href="kontakt.html" class="nav-link nav-cta">Kontakt</a></li>
      </ul>
    </div>
  </nav>

  <!-- Page Header -->
  <section class="page-header">
    <div class="container">
      <span class="section-tag">Galerie</span>
      <h1>Unsere <span class="text-accent">Projekte</span></h1>
      <p>Einblicke in unsere Arbeit – von der Montage bis zur fertigen Anlage. Hier sehen Sie eine Auswahl unserer realisierten Projekte.</p>
    </div>
  </section>

  <!-- Gallery Filter -->
  <section class="section">
    <div class="container">
      <div class="galerie-filter">
        <button class="filter-btn active" data-filter="alle">Alle</button>
        <button class="filter-btn" data-filter="melktechnik">Melktechnik</button>
        <button class="filter-btn" data-filter="stalleinrichtung">Stalleinrichtungen</button>
        <button class="filter-btn" data-filter="stall">Stall</button>
        <button class="filter-btn" data-filter="kuehltechnik">Kühltechnik</button>
        <button class="filter-btn" data-filter="fuetterung">Fütterung</button>
        <button class="filter-btn" data-filter="anlaesse">Anlässe</button>
        <button class="filter-btn" data-filter="diverses">Diverses</button>
      </div>

      <div class="galerie-grid" id="galerieGrid">
`;

let brokenHtml = fs.readFileSync(backupPath, 'utf8');
let gridStartIndex = brokenHtml.indexOf('<div class="galerie-grid" id="galerieGrid">');
gridStartIndex += '<div class="galerie-grid" id="galerieGrid">\n'.length;

let gridContent = brokenHtml.substring(gridStartIndex);
gridContent = gridContent.replace('<script src="js/galerie.js"></script>', '<script src="js/galerie.js?v=2"></script>');
fs.writeFileSync(cleanPath, correctHeader + gridContent, 'utf8');
console.log("Recovery successful.");
