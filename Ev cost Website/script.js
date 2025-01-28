const darkModeToggle = document.getElementById('dark-mode-toggle');
const screenshot = document.getElementById('screenshot');
const header = document.querySelector('.sticky-header');
const logo = document.querySelector('.logo-container');

// Function to update header background based on theme and scroll
function updateHeaderBackground(scrolled = window.scrollY) {
  const minOpacity = 0.9;
  const maxOpacity = 1;
  const opacity = Math.min(maxOpacity, minOpacity + (scrolled / 200));
  const headerBg = document.body.classList.contains('light') 
    ? `rgba(255, 255, 255, ${opacity})`
    : `rgba(15, 21, 35, ${opacity})`;
  
  header.style.background = headerBg;
}

// Enhanced dark mode toggle with localStorage
darkModeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  screenshot.src = isLight ? '../img/screenshots/lightcreen.png' : '../img/screenshots/darkscreen.png';
  
  // Update header background immediately
  updateHeaderBackground();
  
  // Save preference to localStorage
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Check theme on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    screenshot.src = 'img/screenshots/lightcreen.jpg';
    updateHeaderBackground();
  }
});

// Header opacity on scroll
window.addEventListener('scroll', () => {
  updateHeaderBackground();
});

// Logo movement effect
logo.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = logo.getBoundingClientRect();
  const x = (e.clientX - left - width/2) / 25;
  const y = (e.clientY - top - height/2) / 25;
  
  logo.style.transform = `translate(${x}px, ${y}px)`;
});

logo.addEventListener('mouseleave', () => {
  logo.style.transform = 'translate(0px, 0px)';
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, {
  threshold: 0.1
});

// Observe all sections and cards
document.querySelectorAll('.features-section, .how-it-works, .download-section, .feature-card, .step, .try-calculator-banner, .app-features-grid').forEach((el) => {
  observer.observe(el);
});

// Add pulse animation to all download and try buttons
const actionButtons = document.querySelectorAll('.download-button, .try-calculator-button, .try-first-button');

actionButtons.forEach(btn => {
    setInterval(() => {
        btn.classList.add('pulse');
        setTimeout(() => {
            btn.classList.remove('pulse');
        }, 1000);
    }, 5000);
});