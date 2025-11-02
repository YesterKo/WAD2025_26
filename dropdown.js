// Select elements
const btn = document.getElementById('profileBtn');
const menu = document.getElementById('profileDropdown');

// Toggle dropdown when clicking the avatar
btn.addEventListener('click', (e) => {
  e.stopPropagation(); // stops event from bubbling up
  const isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close dropdown when clicking outside it
window.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
});

// Close dropdown when pressing the Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
});
