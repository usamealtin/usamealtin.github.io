function initNavbarToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const navContainer = document.querySelector('.nav-container');

    if (!navToggle || !navContainer) return;

    navToggle.addEventListener('click', () => {
        const isOpen = navContainer.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const navbarRoot = document.getElementById('navbar-root');

    if (navbarRoot) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(html => {
                navbarRoot.innerHTML = html;
                initNavbarToggle();
            })
            .catch(err => console.error('Navbar yüklenemedi:', err));
    } else {
        // Sayfada statik header varsa (ileride kullanmak istersen)
        initNavbarToggle();
    }
});


