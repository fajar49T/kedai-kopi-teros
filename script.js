/* =========================================================
   KEDAI ES TEROS — MAIN SCRIPT
   1. Mobile navigation toggle
   2. Navbar background on scroll
   3. Active navigation link highlighting on scroll
   4. Smooth scroll for internal links (with mobile menu close)
   5. Fade-in animation on scroll (Intersection Observer)
   6. Footer year
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. MOBILE NAVIGATION TOGGLE
     --------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  /* Close mobile menu when a link is clicked */
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  /* ---------------------------------------------------------
     2. NAVBAR BACKGROUND ON SCROLL
     --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // run once on load

  /* ---------------------------------------------------------
     3. ACTIVE NAV LINK HIGHLIGHTING WHILE SCROLLING
     --------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightActiveLink = () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.dataset.section === currentSectionId) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightActiveLink);
  highlightActiveLink(); // run once on load

  /* ---------------------------------------------------------
     4. SMOOTH SCROLL (native CSS scroll-behavior already
        handles this, but this ensures consistent offset
        behaviour for the fixed navbar across browsers)
     --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight + 1;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------------------------------------------------------
     5. FADE-IN ANIMATION ON SCROLL
     --------------------------------------------------------- */
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));

  /* ---------------------------------------------------------
     6. FOOTER YEAR
     --------------------------------------------------------- */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
