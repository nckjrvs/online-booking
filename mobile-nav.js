// Hamburger menu toggle for mobile nav
document
  .querySelector('.nav-hamburger')
  ?.addEventListener('click', function () {
    const links = document.querySelector('.nav-links');
    const isOpen = links.classList.toggle('open');
    this.classList.toggle('active', isOpen);
    this.setAttribute('aria-expanded', isOpen);
  });

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links')?.classList.remove('open');
    document.querySelector('.nav-hamburger')?.classList.remove('active');
  });
});
