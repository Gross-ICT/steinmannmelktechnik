document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let lastScroll = 0;
    function handleScroll() {
      const scrollY = window.scrollY;
      navbar.classList.toggle('scrolled', scrollY > 60);

      // Hide/show navbar on scroll direction
      if (scrollY > 300) {
        if (scrollY > lastScroll + 5) {
          navbar.classList.add('nav-hidden');
        } else if (scrollY < lastScroll - 5) {
          navbar.classList.remove('nav-hidden');
        }
      } else {
        navbar.classList.remove('nav-hidden');
      }
      lastScroll = scrollY;
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

  // --- Scroll animations (Intersection Observer) ---
  const animatedElements = document.querySelectorAll(
    '.about-card, .service-card, .partner-detail-card, .contact-card, .contact-map, .section-header, .teaser-card, .highlight, .process-step, .direction-card, .owner-card, .about-teaser-content, .about-intro-text, .cta-content'
  );

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement.children);
          const delay = siblings.indexOf(entry.target) * 100;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    animatedElements.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  // --- Parallax effect for page headers ---
  const pageHeader = document.querySelector('.page-header');
  if (pageHeader) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < 600) {
        pageHeader.style.backgroundPositionY = (scrollY * 0.3) + 'px';
        const content = pageHeader.querySelector('.container');
        if (content) {
          content.style.transform = `translateY(${scrollY * 0.15}px)`;
          content.style.opacity = Math.max(0, 1 - scrollY / 500);
        }
      }
    }, { passive: true });
  }

  // --- Dynamic Years Calculation ---
  document.querySelectorAll('.stat-number[data-start-year]').forEach(stat => {
    const startYear = parseInt(stat.getAttribute('data-start-year'), 10);
    const currentYear = new Date().getFullYear();
    stat.textContent = (currentYear - startYear) + " Jahre";
  });

  // --- Counter animation for hero stats ---
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length > 0) {
    let statsCounted = false;
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          animateStats();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);
  }

  function animateStats() {
    document.querySelectorAll('.stat-number').forEach(stat => {
      const text = stat.textContent.trim();
      const match = text.match(/(\d+)/);
      if (match) {
        const target = parseInt(match[1]);
        const prefix = text.substring(0, text.indexOf(match[1]));
        const suffix = text.substring(text.indexOf(match[1]) + match[1].length);
        let current = 0;
        const duration = 6000;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.round(target * eased);
          stat.textContent = prefix + current + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      }
    });
  }

  // --- Magnetic hover effect for cards ---
  document.querySelectorAll('.teaser-card, .service-card, .partner-detail-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- Smooth reveal for page header text ---
  const headerContent = document.querySelector('.hero-content');
  if (headerContent) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < 800) {
        headerContent.style.transform = `translateY(${scrollY * 0.2}px)`;
        headerContent.style.opacity = Math.max(0, 1 - scrollY / 600);
      }
    }, { passive: true });
  }

});
