document.addEventListener('DOMContentLoaded', function () {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.galerie-item');
  var currentFilteredItems = Array.from(items);

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      currentFilteredItems = [];

      items.forEach(function (item) {
        var itemCategories = (item.getAttribute('data-category') || "").split(' ');
        if (filter === 'alle' || itemCategories.includes(filter)) {
          item.style.display = '';
          currentFilteredItems.push(item);
          setTimeout(function () { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(function () { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // ============================================
  // Lightbox Implementation
  // ============================================

  var lightboxHtml = `
    <div class="lightbox-overlay" id="lightbox">
      <div class="lightbox-content">
        <img class="lightbox-img" id="lightbox-img" src="" alt="Großansicht">
        <button class="lightbox-close" id="lightbox-close"><i class="ph ph-x"></i></button>
        <button class="lightbox-nav lightbox-prev" id="lightbox-prev"><i class="ph ph-caret-left"></i></button>
        <button class="lightbox-nav lightbox-next" id="lightbox-next"><i class="ph ph-caret-right"></i></button>
        <div class="lightbox-counter" id="lightbox-counter">1 / 10</div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', lightboxHtml);

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var closeBtn = document.getElementById('lightbox-close');
  var prevBtn = document.getElementById('lightbox-prev');
  var nextBtn = document.getElementById('lightbox-next');
  var counter = document.getElementById('lightbox-counter');
  
  var currentLightboxIndex = 0;

  function updateLightbox() {
      if (currentFilteredItems.length === 0) return;
      var activeItem = currentFilteredItems[currentLightboxIndex];
      var img = activeItem.querySelector('img');
      if (img) {
          lightboxImg.src = img.src;
          counter.innerText = (currentLightboxIndex + 1) + " / " + currentFilteredItems.length;
      }
  }

  function openLightbox(index) {
      currentLightboxIndex = index;
      updateLightbox();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; 
  }

  function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
  }

  function nextImage() {
      currentLightboxIndex = (currentLightboxIndex + 1) % currentFilteredItems.length;
      updateLightbox();
  }

  function prevImage() {
      currentLightboxIndex = (currentLightboxIndex - 1 + currentFilteredItems.length) % currentFilteredItems.length;
      updateLightbox();
  }

  items.forEach(function (item) {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function () {
          if (item.style.display === 'none') return;
          var index = currentFilteredItems.indexOf(item);
          if (index !== -1) {
              openLightbox(index);
          }
      });
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', function(e) { e.stopPropagation(); nextImage(); });
  prevBtn.addEventListener('click', function(e) { e.stopPropagation(); prevImage(); });
  
  lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
          closeLightbox();
      }
  });

  document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
  });

  var touchStartX = 0;
  var touchEndX = 0;

  lightbox.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});

  lightbox.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }, {passive: true});

  function handleSwipe() {
      var threshold = 50;
      if (touchEndX < touchStartX - threshold) {
          nextImage(); 
      }
      if (touchEndX > touchStartX + threshold) {
          prevImage(); 
      }
  }
});
