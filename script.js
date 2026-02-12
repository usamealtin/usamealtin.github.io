document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navContainer = document.querySelector('.nav-container');

    if (!navToggle || !navContainer) return;

    navToggle.addEventListener('click', () => {
        const isOpen = navContainer.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
});

