/* ==========================================================================
   Himabindu Chowdary K - UX Research Portfolio JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Element References
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('navMenu');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('themeToggle');

  const openCaseStudyBtn = document.getElementById('openCaseStudyModal');
  const closeCaseStudyBtn = document.getElementById('closeCaseStudyModal');
  const caseStudyModal = document.getElementById('caseStudyModal');

  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastNotification = document.getElementById('toastNotification');

  // --------------------------------------------------------------------------
  // 2. Theme Switcher (Dark / Light Mode)
  // --------------------------------------------------------------------------
  const currentTheme = localStorage.getItem('hb_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('hb_portfolio_theme', newTheme);
  });

  // --------------------------------------------------------------------------
  // 3. Navbar Sticky State & Mobile Menu Toggle
  // --------------------------------------------------------------------------
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // --------------------------------------------------------------------------
  // 4. Scrollspy (Highlight Nav Link for Current Section)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // --------------------------------------------------------------------------
  // 5. Case Study Modal Details
  // --------------------------------------------------------------------------
  function openModal() {
    caseStudyModal.classList.add('active');
    caseStudyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeModal() {
    caseStudyModal.classList.remove('active');
    caseStudyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openCaseStudyBtn && closeCaseStudyBtn && caseStudyModal) {
    openCaseStudyBtn.addEventListener('click', openModal);
    closeCaseStudyBtn.addEventListener('click', closeModal);

    // Close when clicking overlay backdrop
    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) {
        closeModal();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && caseStudyModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. Copy Email to Clipboard with Toast Notification
  // --------------------------------------------------------------------------
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'bindu.hkc13@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(err => {
        showToast('Direct email: bindu.hkc13@gmail.com');
      });
    });
  }

  function showToast(message) {
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3000);
  }
});
