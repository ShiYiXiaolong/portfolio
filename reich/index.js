document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Management ---
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('reich-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.className = savedTheme;
    } else if (systemPrefersDark) {
        htmlElement.className = 'theme-dark';
    } else {
        htmlElement.className = 'theme-light';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (htmlElement.classList.contains('theme-dark')) {
                htmlElement.classList.replace('theme-dark', 'theme-light');
                localStorage.setItem('reich-theme', 'theme-light');
            } else {
                htmlElement.classList.replace('theme-light', 'theme-dark');
                localStorage.setItem('reich-theme', 'theme-dark');
            }
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            
            // Basic mobile menu styling injection if needed
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '100%';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.width = '100%';
                navLinksContainer.style.background = 'var(--bg-surface)';
                navLinksContainer.style.padding = '2rem';
                navLinksContainer.style.borderBottom = '1px solid var(--border-color)';
                navLinksContainer.style.boxShadow = 'var(--shadow-md)';
            } else {
                navLinksContainer.style.display = '';
            }
        });
        
        // Close menu on link click
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                navLinksContainer.style.display = '';
            });
        });
    }

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.fade-in-up, .reveal-card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // --- Smooth Scrolling for Internal Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Content Initialization (Optional dynamic part) ---
    // In a real scenario, we could fetch the JSON here.
    // For now, the HTML already contains the core content.
});
