document.addEventListener('DOMContentLoaded', function () {
  var stories = {
    mueller: {
      kunde: 'Landwirtschaftsbetrieb Müller',
      ort: '<i class="ph ph-map-pin"></i> Grossdietwil, LU',
      ausgangslage: 'Der Betrieb Müller bewirtschaftet rund 35 Milchkühe und war mit einer veralteten Melkanlage ausgestattet, die zunehmend störungsanfällig war. Die Milchqualität litt unter der alten Technik und der Arbeitsaufwand beim Melken war unverhältnismässig hoch.',
      loesung: 'Wir haben eine komplette GEA Melkanlage mit 2x6 Fischgrätenmelkstand installiert, inklusive moderner Milchkühlung und einem digitalen Herdenmanagement-System. Die gesamte Verrohrung, Vakuumtechnik und Elektronik wurde neu verlegt.',
      ergebnis: 'Die Melkzeit konnte um rund 40% reduziert werden. Die Milchqualität hat sich deutlich verbessert und das Herdenmanagement-System ermöglicht eine gezielte Überwachung jeder einzelnen Kuh. Der Betrieb spart täglich wertvolle Arbeitszeit.',
      zitat: 'Urs Steinmann hat unsere neue Melkanlage perfekt installiert. Schnell, sauber und zuverlässig. Bei Fragen ist er immer erreichbar.',
      autor: 'Familie Müller, Grossdietwil',
      galerie: ['img/referenzen/melkanlage.png', 'img/referenzen/gallery_1.png', 'img/referenzen/gallery_2.png', 'img/referenzen/gallery_3.png', 'img/referenzen/gallery_4.png'],
      tags: ['Melkanlage', 'Kühltechnik', 'Neuanlage', 'GEA']
    },
    buehler: {
      kunde: 'Hof Bühler',
      ort: '<i class="ph ph-map-pin"></i> Zell, LU',
      ausgangslage: 'Der Hof Bühler plante den Umbau vom Anbindestall zum modernen Laufstall. Die bestehenden Stalleinrichtungen waren veraltet und entsprachen nicht mehr den aktuellen Tierwohl-Anforderungen. Gleichzeitig sollte die Fütterung automatisiert werden.',
      loesung: 'Gemeinsam mit ITIN & HOCH haben wir neue Liegeboxen mit Komfortmatten, einen breiten Laufgang mit rutschfestem Belag und eine automatische Fütterungsanlage geplant und montiert. Die Stallbelüftung wurde optimiert.',
      ergebnis: 'Die Kühe zeigen deutlich mehr Bewegung und Wohlbefinden. Die automatisierte Fütterung spart täglich über eine Stunde Arbeitszeit. Die Milchleistung hat sich seit dem Umbau spürbar gesteigert.',
      zitat: 'Der Umbau war eine grosse Investition, aber mit Steinmann Melktechnik hatten wir einen Partner, der alles professionell koordiniert hat. Das Ergebnis übertrifft unsere Erwartungen.',
      autor: 'Familie Bühler, Zell',
      galerie: ['img/referenzen/stalleinrichtung.png', 'img/referenzen/gallery_2.png', 'img/referenzen/gallery_4.png', 'img/referenzen/gallery_6.png', 'img/referenzen/gallery_3.png'],
      tags: ['Stalleinrichtung', 'Fütterung', 'Umbau', 'ITIN & HOCH']
    },
    wicki: {
      kunde: 'Familie Wicki',
      ort: '<i class="ph ph-map-pin"></i> Willisau, LU',
      ausgangslage: 'Die bestehende Milchkühlung von Familie Wicki war über 20 Jahre alt, energieineffizient und konnte die Milch bei Hitzeperioden nicht mehr zuverlässig auf die vorgeschriebene Temperatur kühlen. Eine Erneuerung war dringend nötig.',
      loesung: 'Installation eines neuen Buri AG Direktkühlers mit 2000 Liter Fassungsvermögen und integrierter Wärmerückgewinnung. Die gewonnene Wärme wird für die Warmwasseraufbereitung im Haushalt und für die Reinigung genutzt.',
      ergebnis: 'Die Energiekosten für die Kühlung konnten um rund 30% gesenkt werden. Dank der Wärmerückgewinnung spart der Betrieb zusätzlich beim Warmwasser. Ein regelmässiger Servicevertrag sichert den störungsfreien Betrieb.',
      zitat: 'Die neue Kühlung läuft einwandfrei und die Wärmerückgewinnung merken wir jeden Monat auf der Stromrechnung. Der Service von Urs ist immer prompt und unkompliziert.',
      autor: 'Familie Wicki, Willisau',
      galerie: ['img/referenzen/kuehltank.png', 'img/referenzen/gallery_5.png', 'img/referenzen/gallery_1.png', 'img/referenzen/gallery_4.png', 'img/referenzen/gallery_6.png'],
      tags: ['Kühltechnik', 'Wärmerückgewinnung', 'Service', 'Buri AG']
    },
    kaufmann: {
      kunde: 'Betrieb Kaufmann',
      ort: '<i class="ph ph-map-pin"></i> Altbüron, LU',
      ausgangslage: 'Betrieb Kaufmann hatte seinen Viehbestand vergrössert und die bestehende Melkanlage war an der Kapazitätsgrenze. Zudem zeigten die Vakuumpumpe und mehrere Pulsatoren Verschleisserscheinungen, was zu ungleichmässigem Melken führte.',
      loesung: 'Erweiterung des bestehenden GEA Melksystems um zwei zusätzliche Melkplätze. Kompletter Austausch der Vakuumpumpe und aller Pulsatoren. Erneuerung der Melkschläuche und Zitzengummis. Nachrüstung der Milchmengenmessung.',
      ergebnis: 'Die Melkkapazität wurde um 30% erhöht. Das gleichmässige Vakuum sorgt für schonendes Melken und gesunde Euter. Die Milchmengenmessung ermöglicht eine bessere Kontrolle der Einzeltierleistung.',
      zitat: 'Urs hat unsere bestehende Anlage clever erweitert, ohne dass wir alles neu kaufen mussten. Das war wirtschaftlich die beste Lösung für unseren Betrieb.',
      autor: 'Familie Kaufmann, Altbüron',
      galerie: ['img/referenzen/melkplatz.png', 'img/referenzen/gallery_1.png', 'img/referenzen/gallery_3.png', 'img/referenzen/gallery_5.png', 'img/referenzen/gallery_2.png'],
      tags: ['Melkanlage', 'Erweiterung', 'Reparatur', 'GEA']
    },
    hofer: {
      kunde: 'Landwirtschaft Hofer',
      ort: '<i class="ph ph-map-pin"></i> Pfaffnau, LU',
      ausgangslage: 'Familie Hofer plante einen kompletten Neubau eines Laufstalls für 50 Milchkühe. Von der Stalleinrichtung über die Entmistung bis zum Belüftungssystem sollte alles aus einer Hand kommen – mit kurzen Kommunikationswegen.',
      loesung: 'Komplettplanung und Montage der gesamten Stalleinrichtung: Liegeboxen, Fressgitter, Laufganggestaltung, Schieberentmistung und ein automatisches Belüftungssystem mit Temperatursteuerung. Koordination mit dem Bauunternehmen.',
      ergebnis: 'Der neue Stall bietet optimale Bedingungen für die Tiere. Die automatische Entmistung und Belüftung reduzieren den Arbeitsaufwand massiv. Familie Hofer kann sich auf das Wesentliche konzentrieren: ihre Kühe.',
      zitat: 'Von der Beratung über die Planung bis zur Montage – alles aus einer Hand. Wir können Steinmann Melktechnik nur empfehlen.',
      autor: 'Familie Hofer, Pfaffnau',
      galerie: ['img/referenzen/laufstall.png', 'img/referenzen/gallery_4.png', 'img/referenzen/gallery_2.png', 'img/referenzen/gallery_6.png', 'img/referenzen/gallery_5.png'],
      tags: ['Stalleinrichtung', 'Neubau', 'Belüftung', 'Entmistung']
    },
    brunner: {
      kunde: 'Hof Brunner',
      ort: '<i class="ph ph-map-pin"></i> Ufhusen, LU',
      ausgangslage: 'An einem Sonntagmorgen fiel die Melkanlage von Hof Brunner komplett aus – mitten in der Melkzeit. Eine schnelle Lösung war zwingend nötig, da die Kühe nicht warten konnten. Nach der Notfall-Reparatur wurde eine Generalüberholung geplant.',
      loesung: '24h-Notfall-Einsatz: Innerhalb einer Stunde vor Ort, Fehlerdiagnose und provisorische Reparatur, damit das Melken fortgesetzt werden konnte. Anschliessend komplette Generalüberholung der Anlage mit neuer Steuerung, Vakuumleitung und Pulsatoren.',
      ergebnis: 'Die Anlage läuft seit der Überholung störungsfrei. Ein Servicevertrag mit regelmässiger Wartung verhindert künftige Ausfälle. Familie Brunner ist seit 2018 treuer Stammkunde.',
      zitat: 'Als unsere Kühlung am Sonntagmorgen ausfiel, war Urs innerhalb einer Stunde vor Ort. So einen Service findet man selten!',
      autor: 'Familie Brunner, Ufhusen',
      galerie: ['img/referenzen/reparatur.png', 'img/referenzen/gallery_5.png', 'img/referenzen/gallery_1.png', 'img/referenzen/gallery_3.png', 'img/referenzen/gallery_6.png'],
      tags: ['Notfall-Service', 'Reparatur', 'Wartung', 'Servicevertrag']
    }
  };

  var modal = document.getElementById('referenzModal');
  var closeBtn = document.getElementById('referenzClose');

  document.querySelectorAll('.referenz-card[data-referenz]').forEach(function (card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function () {
      var key = card.getAttribute('data-referenz');
      var story = stories[key];
      if (!story) return;

      document.getElementById('modalKunde').textContent = story.kunde;
      document.getElementById('modalOrt').innerHTML = story.ort;
      document.getElementById('modalAusgangslage').textContent = story.ausgangslage;
      document.getElementById('modalLoesung').textContent = story.loesung;
      document.getElementById('modalErgebnis').textContent = story.ergebnis;
      document.getElementById('modalZitat').textContent = story.zitat;
      document.getElementById('modalAutor').textContent = '— ' + story.autor;

      var tagsEl = document.getElementById('modalTags');
      tagsEl.innerHTML = '';
      story.tags.forEach(function (tag) {
        var span = document.createElement('span');
        span.textContent = tag;
        tagsEl.appendChild(span);
      });

      var galerieEl = document.getElementById('modalGalerie');
      if (galerieEl) {
        galerieEl.innerHTML = '';
        if (story.galerie && story.galerie.length > 0) {
          story.galerie.forEach(function (imgSrc, index) {
            var img = document.createElement('img');
            img.src = imgSrc;
            img.alt = 'Projektfoto ' + (index + 1);
            img.loading = 'lazy';
            img.addEventListener('click', function() {
              openLightbox(story.galerie, index);
            });
            galerieEl.appendChild(img);
          });
          document.getElementById('modalGalerieSection').style.display = 'block';
        } else {
          document.getElementById('modalGalerieSection').style.display = 'none';
        }
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lightboxOverlay.classList.contains('active')) {
        closeLightbox();
      } else {
        closeModal();
      }
    }
    if (lightboxOverlay.classList.contains('active')) {
      if (e.key === 'ArrowLeft') prevLightboxImage();
      if (e.key === 'ArrowRight') nextLightboxImage();
    }
  });

  // Lightbox Implementation
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
    lightboxOverlay.classList.add('active');
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
  }

  function updateLightbox() {
    if (currentGallery.length === 0) return;
    lightboxImg.src = currentGallery[currentIndex];
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
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

  lightboxCloseBtn.addEventListener('click', closeLightbox);
  lightboxNextBtn.addEventListener('click', nextLightboxImage);
  lightboxPrevBtn.addEventListener('click', prevLightboxImage);

  lightboxOverlay.addEventListener('click', function(e) {
    if (e.target === lightboxOverlay || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Swipe support for Lightbox
  var touchstartX = 0;
  var touchendX = 0;

  lightboxOverlay.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
  }, {passive: true});

  lightboxOverlay.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
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

});
