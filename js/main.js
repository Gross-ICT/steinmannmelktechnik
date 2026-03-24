document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  if (navbar && !navbar.classList.contains('navbar-inner')) {
    function handleScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- Mobile menu toggle ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Hero Video: play once, stop at 5 seconds ---
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    const MAX_DURATION = 5;

    heroVideo.addEventListener('timeupdate', () => {
      if (heroVideo.currentTime >= MAX_DURATION) {
        heroVideo.pause();
      }
    });

    heroVideo.addEventListener('ended', () => {
      heroVideo.pause();
    });

    heroVideo.addEventListener('error', () => {
      heroVideo.style.display = 'none';
      const overlay = document.querySelector('.hero-overlay');
      if (overlay) {
        overlay.style.background = 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #1b4332 100%)';
      }
    });
  }

  // --- Scroll animations (Intersection Observer) ---
  const animatedElements = document.querySelectorAll(
    '.about-card, .service-card, .partner-detail-card, .contact-card, .contact-map, .section-header, .teaser-card, .highlight, .process-step, .direction-card, .owner-card'
  );

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement.children);
          const delay = siblings.indexOf(entry.target) * 80;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animatedElements.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

});
