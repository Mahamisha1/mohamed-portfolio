/* ==========================================
   1. DARK / LIGHT MODE TOGGLE
   ========================================== */
const themeToggleBtn = document.querySelector('.theme-toggle');

// System preference ykn saved theme ilaali
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Theme saagu (set) gochuuf
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
} else if (!systemPrefersDark) {
  // Desktop light mode badhaadhe yoo ta'e
  document.documentElement.setAttribute('data-theme', 'light');
  updateThemeIcon('light');
}

// Biliqa (Click) irratti Theme jijjiiruu
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    if (newTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

// Mallattoo (Icon) jijjiiruuf
function updateThemeIcon(theme) {
  if (!themeToggleBtn) return;
  themeToggleBtn.innerHTML = theme === 'light' 
    ? '🌙' // Moon icon for Light Mode
    : '☀️'; // Sun icon for Dark Mode
}


/* ==========================================
   2. MOBILE MENU TOGGLE
   ========================================== */
const menuToggleBtn = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggleBtn && navMenu) {
  // Menu saaquu / cufuu
  menuToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Accessibility (Aria state)
    const isExpanded = navMenu.classList.contains('active');
    menuToggleBtn.setAttribute('aria-expanded', isExpanded);
  });

  // Link tokko yoo cuqafamu Menu cufuu
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // Menu ala yoo cuqafame cufuu
  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !menuToggleBtn.contains(event.target)) {
      navMenu.classList.remove('active');
    }
  });
}