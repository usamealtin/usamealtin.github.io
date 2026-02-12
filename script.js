function initNavbarToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const navContainer = document.querySelector('.nav-container');

    if (!navToggle || !navContainer) return;

    navToggle.addEventListener('click', () => {
        const isOpen = navContainer.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

function applyTheme(theme) {
    const root = document.documentElement;
    root.dataset.theme = theme;
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        // storage not available, ignore
    }

    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }
}

function initTheme() {
    let theme;
    try {
        theme = localStorage.getItem('theme');
    } catch (e) {
        theme = null;
    }

    if (!theme) {
        const prefersDark = window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
    }

    applyTheme(theme);

    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            applyTheme(current);
        });
    }
}

function initExpandableCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const body = card.querySelector('.project-body');
        if (!body) return;

        const toggle = () => {
            card.classList.toggle('expanded');
        };

        card.setAttribute('tabindex', '0');
        card.addEventListener('click', toggle);
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });

    const blogItems = document.querySelectorAll('.blog-item');
    blogItems.forEach(item => {
        const body = item.querySelector('.blog-body');
        if (!body) return;

        const toggle = () => {
            item.classList.toggle('expanded');
        };

        item.setAttribute('tabindex', '0');
        item.addEventListener('click', toggle);
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });
}

function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.name?.value || '';
        const email = form.email?.value || '';
        const message = form.message?.value || '';

        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);

        // Buraya kendi e-posta adresini yazabilirsin
        window.location.href = `mailto:altinusame@gmail.com?subject=${subject}&body=${body}`;
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
                initTheme();
                initExpandableCards();
                initContactForm();
            })
            .catch(err => {
                console.error('Navbar yüklenemedi:', err);
                initNavbarToggle();
                initTheme();
                initExpandableCards();
                initContactForm();
            });
    } else {
        // Sayfada statik header varsa (ileride kullanmak istersen)
        initNavbarToggle();
        initTheme();
        initExpandableCards();
        initContactForm();
    }
});

