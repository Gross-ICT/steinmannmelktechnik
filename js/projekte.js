document.addEventListener("DOMContentLoaded", function() {
  
  // --- Tab Interaktionen ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabBtns.length > 0 && tabContents.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const targetTab = this.getAttribute('data-tab');
        tabContents.forEach(content => {
          if (content.getAttribute('id') === 'tab-' + targetTab) {
            content.style.display = 'block';
            setTimeout(() => { content.classList.add('active'); }, 10);
          } else {
            content.style.display = 'none';
            content.classList.remove('active');
          }
        });
      });
    });
  }

  // --- Projekt Daten ---
  var projekteStore = {
    laufend1: {
      titel: 'Neubau Milchviehstall Familie Roos',
      ort: '<i class="ph ph-map-pin"></i> Romoos, LU',
      beschreibung: 'Ein moderner Milchviehstall für 80 Kühe befindet sich in der Bauphase. Die Anlage wird nach den neuesten Tierwohl-Standards errichtet und soll künftig eine optimale Arbeitsumgebung bieten.',
      umfang: 'Planung und Installation der kompletten Stalleinrichtung, inklusive Liegeboxen, automatischer Fütterungsanlage, Laufgangausstattung und Belüftungssystem.',
      status: 'Montage der Stallelemente ist im Gange. Voraussichtliche Fertigstellung und Inbetriebnahme: Ende nächsten Monats.',
      tags: ['Stalleinrichtung', 'Fütterung', 'Laufstall'],
      galerie: ['img/referenzen/stalleinrichtung.png', 'img/referenzen/gallery_2.png', 'img/referenzen/gallery_3.png']
    },
    laufend2: {
      titel: 'Erweiterung Melkanlage Hof Gerber',
      ort: '<i class="ph ph-map-pin"></i> Schüpfheim, LU',
      beschreibung: 'Der Hof Gerber vergrössert seinen Tierbestand und benötigt eine entsprechende Aufstockung der Melkplätze. Die bestehende Anlage wird während des laufenden Betriebs nahtlos modifiziert.',
      umfang: 'Erweiterung der aktuellen GEA Melkanlage um vier weitere Plätze. Einbau einer stärkeren Vakuumpumpe und neuer elektronischer Pulsatoren zur schonenden Melkung.',
      status: 'Planung und Materialbestellung abgeschlossen. Die Modifikationen vor Ort beginnen nächste Woche.',
      tags: ['Melktechnik', 'Planung', 'GEA'],
      galerie: ['img/referenzen/melkanlage.png', 'img/referenzen/gallery_1.png']
    },
    laufend3: {
      titel: 'Kühlsystem Modernisierung Zemp',
      ort: '<i class="ph ph-map-pin"></i> Entlebuch, LU',
      beschreibung: 'Das bestehende Kühlsystem des landwirtschaftlichen Betriebs entsprach nicht mehr den energetischen Anforderungen. Ein Austausch gegen ein hocheffizientes System steht an.',
      umfang: 'Demontage des alten Tanks und Installation eines neuen Buri AG Direktkühlers inklusive eines intelligenten Wärmerückgewinnungssystems für die Heisswassergewinnung.',
      status: 'Aktuell in der Installationsphase. Die Wärmerückgewinnung wird derzeit mit dem Warmwassernetz gekoppelt.',
      tags: ['Kühltechnik', 'Montage', 'Energieeffizienz'],
      galerie: ['img/referenzen/kuehltank.png', 'img/referenzen/gallery_5.png']
    },
    laufend4: {
      titel: 'Umbau Laufstall Familie Bieri',
      ort: '<i class="ph ph-map-pin"></i> Flühli, LU',
      beschreibung: 'Ein älterer Anbindestall wird Zug um Zug in einen offenen, tierfreundlichen Laufstall umgebaut, um den Arbeitsaufwand massiv zu reduzieren.',
      umfang: 'Einbau einer neuen Schieberentmistung, Erneuerung der Spaltenböden und Anpassung der Fressgitterbereiche.',
      status: 'Die Betonarbeiten der Böden sind abgeschlossen, aktuell läuft die Befestigung und Justierung der Schieberentmistung.',
      tags: ['Stalleinrichtung', 'Umbau', 'Entmistung'],
      galerie: ['img/referenzen/laufstall.png', 'img/referenzen/gallery_4.png', 'img/referenzen/gallery_6.png']
    },
    abgeschlossen1: {
      titel: 'Melkstand 2x4 Hof Meier',
      ort: '<i class="ph ph-map-pin"></i> Werthenstein, LU',
      beschreibung: 'Durch den Generationenwechsel auf dem Hof wurde die Melktechnik komplett erneuert, um dem jungen Betriebsleiter eine effiziente und schnelle Melkarbeit zu ermöglichen.',
      umfang: 'Planung und schlüsselfertige Inbetriebnahme eines modernen 2x4 Fischgrätenmelkstands. Integration der elektronischen Milchmengenmessung für das Herdenmanagement.',
      status: 'Erfolgreich abgeschlossen und in Betrieb genommen. Die tägliche Melkzeit wurde um 30% gesenkt.',
      tags: ['Melktechnik', 'Abgeschlossen', 'Fischgräte'],
      galerie: ['img/referenzen/melkplatz.png', 'img/referenzen/gallery_1.png', 'img/referenzen/gallery_2.png', 'img/referenzen/gallery_3.png']
    },
    abgeschlossen2: {
      titel: 'Generalüberholung Vakuumpumpe',
      ort: '<i class="ph ph-map-pin"></i> Malters, LU',
      beschreibung: 'Eine in die Jahre gekommene Vakuumanlage fiel unregelmässig aus und wurde akut überholt, um Folgeschäden am Euter der Kühe zu verhindern.',
      umfang: 'Diagnose, Austausch verschlissener Lamellen und Ventile, sowie Neu-Justierung der gesamten Anlage samt Reinigungs-Service.',
      status: 'Abschluss der Reparaturarbeiten innerhalb von 48 Stunden. Anlage liefert wieder ein konstantes, optimales Vakuum.',
      tags: ['Service', 'Reparatur', 'Wartung'],
      galerie: ['img/referenzen/reparatur.png', 'img/referenzen/gallery_5.png']
    },
    abgeschlossen3: {
      titel: 'Kälberdorf Errichtung Steiner',
      ort: '<i class="ph ph-map-pin"></i> Wolhusen, LU',
      beschreibung: 'Um die Kälberaufzucht zu professionalisieren und Krankheiten vorzubeugen, wurde ein Außenklima-Kälberdorf geplant.',
      umfang: 'Montage spezieller Kälberhütten ("Iglus") mit passenden Auslaufgittern und Installation einer effizienten, automatisierten Tränkestation.',
      status: 'Fertig in Betrieb. Die Kälber weisen signifikant weniger Atemwegserkrankungen auf.',
      tags: ['Stalleinrichtung', 'Kälber', 'Tränketechnik'],
      galerie: ['img/referenzen/stalleinrichtung.png', 'img/referenzen/gallery_4.png', 'img/referenzen/gallery_6.png']
    },
    abgeschlossen4: {
      titel: 'Wärmerückgewinnung Landwirtschaft Wyss',
      ort: '<i class="ph ph-map-pin"></i> Ruswil, LU',
      beschreibung: 'Betrieb Wyss wollte seine laufenden Stromkosten für die Warmwasseraufbereitung senken und die Abwärme des Kühltanks intelligent nutzen.',
      umfang: 'Erweiterung des bestehenden Milchkühltanks um ein Wärmerückgewinnungs-Modul, Leitungsbau zum Boiler im Wohnhaus.',
      status: 'Erfolgreich umgesetzt. Der Betrieb konnte seine Stromkosten für Heisswasser um fast 80% reduzieren.',
      tags: ['Kühltechnik', 'Effizienz', 'Buri AG'],
      galerie: ['img/referenzen/melkanlage.png', 'img/referenzen/gallery_1.png', 'img/referenzen/gallery_5.png', 'img/referenzen/kuehltank.png']
    }
  };

  // --- Modal Logik ---
  var modal = document.getElementById('projektModal');
  var closeBtn = document.getElementById('projektClose');

  document.querySelectorAll('.referenz-card.projekt-card[data-projekt]').forEach(function (card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function () {
      var key = card.getAttribute('data-projekt');
      var data = projekteStore[key];
      if (!data) return;

      document.getElementById('modalProjektTitel').textContent = data.titel;
      document.getElementById('modalProjektOrt').innerHTML = data.ort;
      document.getElementById('modalProjektBeschreibung').textContent = data.beschreibung;
      document.getElementById('modalProjektUmfang').textContent = data.umfang;
      document.getElementById('modalProjektStatus').textContent = data.status;

      var tagsEl = document.getElementById('modalProjektTags');
      tagsEl.innerHTML = '';
      data.tags.forEach(function (tag) {
        var span = document.createElement('span');
        span.textContent = tag;
        tagsEl.appendChild(span);
      });

      var galerieEl = document.getElementById('modalProjektGalerie');
      if (galerieEl) {
        galerieEl.innerHTML = '';
        if (data.galerie && data.galerie.length > 0) {
          data.galerie.forEach(function (imgSrc, index) {
            var img = document.createElement('img');
            img.src = imgSrc;
            img.alt = 'Projektfoto ' + (index + 1);
            img.loading = 'lazy';
            img.addEventListener('click', function() {
              openLightbox(data.galerie, index);
            });
            galerieEl.appendChild(img);
          });
          document.getElementById('modalProjektGalerieSection').style.display = 'block';
        } else {
          document.getElementById('modalProjektGalerieSection').style.display = 'none';
        }
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if(modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if(closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if(modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lightboxOverlay && lightboxOverlay.classList.contains('active')) {
        closeLightbox();
      } else {
        closeModal();
      }
    }
    if (lightboxOverlay && lightboxOverlay.classList.contains('active')) {
      if (e.key === 'ArrowLeft') prevLightboxImage();
      if (e.key === 'ArrowRight') nextLightboxImage();
    }
  });

  // --- Lightbox Implementation ---
  var lightboxOverlay = document.getElementById('lightboxOverlay');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCounter = document.getElementById('lightboxCounter');
  var lightboxCloseBtn = document.getElementById('lightboxClose');
  var lightboxPrevBtn = document.getElementById('lightboxPrev');
  var lightboxNextBtn = document.getElementById('lightboxNext');
  
  var currentGallery = [];
  var currentIndex = 0;

  function openLightbox(galleryArray, index) {
    currentGallery = galleryArray;
    currentIndex = index;
    updateLightbox();
    if(lightboxOverlay) lightboxOverlay.classList.add('active');
  }

  function closeLightbox() {
    if(lightboxOverlay) lightboxOverlay.classList.remove('active');
  }

  function updateLightbox() {
    if (currentGallery.length === 0) return;
    if(lightboxImg) lightboxImg.src = currentGallery[currentIndex];
    if(lightboxCounter) lightboxCounter.textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
  }

  function nextLightboxImage() {
    if (currentGallery.length === 0) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightbox();
  }

  function prevLightboxImage() {
    if (currentGallery.length === 0) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightbox();
  }

  if(lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if(lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightboxImage);
  if(lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightboxImage);

  if(lightboxOverlay) {
    lightboxOverlay.addEventListener('click', function(e) {
      if (e.target === lightboxOverlay || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    // Swipe support for Lightbox
    var touchstartX = 0;
    var touchendX = 0;

    lightboxOverlay.addEventListener('touchstart', function(event) {
      touchstartX = event.changedTouches[0].clientX;
    }, {passive: true});

    lightboxOverlay.addEventListener('touchend', function(event) {
      touchendX = event.changedTouches[0].clientX;
      handleSwipe();
    }, {passive: true});

    function handleSwipe() {
      var swipeThreshold = 50;
      if (touchendX < touchstartX - swipeThreshold) {
        nextLightboxImage(); // Swipe left -> next
      }
      if (touchendX > touchstartX + swipeThreshold) {
        prevLightboxImage(); // Swipe right -> prev
      }
    }
  }

});
