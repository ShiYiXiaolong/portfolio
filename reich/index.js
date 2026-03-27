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

    // --- Language Management ---
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('reich-lang') || 'DE';

    const translations = {
        'DE': {
            'nav.home': 'Home',
            'nav.news': 'Aktuelles',
            'nav.services': 'Leistungen',
            'nav.team': 'Team',
            'nav.appointment': 'Termine',
            'nav.contact': 'Kontakt',
            'appointment.badge': 'Ihr Termin',
            'appointment.title': 'Terminordination',
            'appointment.desc': 'Um Wartezeiten zu minimieren, bitten wir um telefonische Terminvereinbarung.',
            'info.location.title': 'Standort & Erreichbarkeit',
            'info.location.text': 'Unsere Praxis befindet sich im ersten Stock und ist an der Hinterseite über die Stiege bzw. barrierefrei mittels Lift erreichbar.',
            'info.parking.title': 'Parken',
            'info.parking.text': 'Rund um die Ordination befinden sich Kurzparkplätze für unsere Patienten.',
            'info.mask.title': 'Infektschutz',
            'info.mask.text': 'Bitte verwenden Sie zum Schutz ihrer Mitmenschen eine Maske, wenn Sie unsere Ordination wegen eines Infektes aufsuchen.',
            'info.admission.title': 'Patienten-Neuaufnahme',
            'info.admission.text': 'Als Altenberger Kassenärzte sind wir primär für Patienten im Gemeindegebiet verantwortlich. Eine Neuaufnahme aus Nachbargemeinden ist aus Kapazitätsgründen aktuell leider nicht möglich.',
            'hero.badge': 'Hausärztliche Versorgung',
            'hero.title': 'Menschlichkeit &<br>medizinische <span class="serif-italic">Exzellenz.</span>',
            'hero.subtitle': 'Herzlich Willkommen in Ihrer Ordination im Haus der Gesundheit in Altenberg. Sie als Mensch stehen im Mittelpunkt unserer Tätigkeit.',
            'hero.cta.appointment': 'Termin vereinbaren',
            'hero.cta.services': 'Leistungen ansehen',
            'hero.discover': 'Entdecken',
            'news.title': 'Aktuelles aus der Ordination',
            'news.desc': 'Bleiben Sie informiert über Urlaubszeiten, Impfangebote und Neuigkeiten.',
            'services.title': 'Medizinische Leistungen',
            'services.desc': 'Wir bieten ein breites Spektrum an allgemeinmedizinischer Versorgung.',
            'team.title': 'Unser Team',
            'team.desc': 'Kompetenz und Herzlichkeit für Ihre Gesundheit.',
            'team.more': 'Mehr Infos',
            'footer.tagline': 'Ihre Hausarztpraxis in Altenberg.',
            'footer.copyright': '&copy; 2026 Dr. Daniela Reich. Alle Rechte vorbehalten.',
            'footer.back': 'Nach oben'
        },
        'EN': {
            'nav.home': 'Home',
            'nav.news': 'News',
            'nav.services': 'Services',
            'nav.team': 'Team',
            'nav.appointment': 'Book Online',
            'nav.contact': 'Contact',
            'appointment.badge': 'Your Visit',
            'appointment.title': 'Appointment Only',
            'appointment.desc': 'To minimize waiting times, please book an appointment by phone.',
            'info.location.title': 'Location & Access',
            'info.location.text': 'Our practice is located on the first floor and is accessible at the back via stairs or barrier-free via lift.',
            'info.parking.title': 'Parking',
            'info.parking.text': 'There are short-term parking spaces available around the practice for our patients.',
            'info.mask.title': 'Infection Protection',
            'info.mask.text': 'To protect your fellow humans, please wear a mask if you visit our practice due to an infection.',
            'info.admission.title': 'New Patient Policy',
            'info.admission.text': 'As medical doctors in Altenberg, we are primarily responsible for the local community. We currently cannot accept new patients from neighboring municipalities.',
            'hero.badge': 'Primary Medical Care',
            'hero.title': 'Compassion &<br>medical <span class="serif-italic">excellence.</span>',
            'hero.subtitle': 'Welcome to your medical practice in the House of Health in Altenberg. You as a human are at the center of our work.',
            'hero.cta.appointment': 'Book Appointment',
            'hero.cta.services': 'View Services',
            'hero.discover': 'Discover',
            'news.title': 'Latest News',
            'news.desc': 'Stay informed about holiday hours, vaccinations, and practice updates.',
            'services.title': 'Medical Services',
            'services.desc': 'We offer a wide range of general medical care services.',
            'team.title': 'Our Team',
            'team.desc': 'Competence and warmth for your health.',
            'team.more': 'More Info',
            'footer.tagline': 'Your general practice in Altenberg.',
            'footer.copyright': '&copy; 2026 Dr. Daniela Reich. All rights reserved.',
            'footer.back': 'Back to top'
        }
    };

    function updateLanguage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });
        
        // Update toggle button UI
        if (langBtn) {
            const spans = langBtn.querySelectorAll('span:not(.sep)');
            spans.forEach(span => {
                if (span.textContent === currentLang) {
                    span.classList.add('active');
                } else {
                    span.classList.remove('active');
                }
            });
        }
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'DE' ? 'EN' : 'DE';
            localStorage.setItem('reich-lang', currentLang);
            updateLanguage();
            // Re-draw team with new language
            if (typeof initTeam === 'function') {
                initTeam();
            }
        });
    }

    // Initial load
    updateLanguage();

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

    // --- Content Initialization (Dynamic Team) ---
    const teamGrid = document.getElementById('team-grid');
    if (teamGrid) {
        initTeam();
    }

    async function initTeam() {
        try {
            // Use cached cat data if available (8 members)
            if (!window._catCache || window._catCache.length < 8) {
                const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=8');
                window._catCache = await response.json();
            }
            const cats = window._catCache;
            
            const rolesDict = {
                'DE': [
                    'Dr. Daniela Reich - Leitende Ärztin', 
                    'Dr. Minka Rex - Fachärztin', 
                    'Dr. Felix Purrington - Facharzt',
                    'Praxis-Management', 
                    'Medizinische Fachangestellte', 
                    'Anästhesie-Assistenz', 
                    'Labor-Organisation',
                    'Empfang'
                ],
                'EN': [
                    'Dr. Daniela Reich - Lead Physician', 
                    'Dr. Minka Rex - Specialist', 
                    'Dr. Felix Purrington - Specialist',
                    'Practice Management', 
                    'Medical Assistant', 
                    'Anesthesia Assistant', 
                    'Lab Organization',
                    'Reception'
                ]
            };
            
            const namesDict = {
                'DE': ['Dr. Daniela Reich', 'Dr. Minka Rex', 'Dr. Felix Purrington', 'Luna Samtpfote', 'Balu Tatze', 'Simba Krall', 'Nala Weichfell', 'Oskar Schnurr'],
                'EN': ['Dr. Daniela Reich', 'Dr. Minka Rex', 'Dr. Felix Purrington', 'Luna Softpaw', 'Balu Paws', 'Simba Claw', 'Nala Fur', 'Oskar Purr']
            };

            const links = [
                'dr-daniela-reich.html',
                'dr-minka-rex.html',
                'dr-felix-purrington.html',
                null, null, null, null, null
            ];

            const roles = rolesDict[currentLang];
            const names = namesDict[currentLang];

            teamGrid.innerHTML = ''; // Clear
            
            cats.forEach((cat, index) => {
                const card = document.createElement('div');
                card.className = 'service-card reveal-card';
                card.style.padding = '3rem 2rem';
                card.style.transitionDelay = `${index * 0.05}s`;
                
                let moreBtn = '';
                if (links[index]) {
                    moreBtn = `<a href="${links[index]}" class="btn btn-outline btn-sm mt-3" data-i18n="team.more">${translations[currentLang]['team.more']}</a>`;
                }

                card.innerHTML = `
                    <div style="width: 140px; height: 140px; margin: 0 auto 2rem; border-radius: 50%; overflow: hidden; box-shadow: var(--shadow-md); border: 3px solid var(--accent);">
                        <img src="${cat.url}" alt="${names[index]}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">${names[index]}</h3>
                    <p style="color: var(--accent); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.7rem;">${roles[index]}</p>
                    ${moreBtn}
                `;
                
                teamGrid.appendChild(card);
                if (typeof observer !== 'undefined') {
                    observer.observe(card);
                }
            });
        } catch (err) {
            console.error('Error fetching cats:', err);
            teamGrid.innerHTML = '<p class="text-center">Team konnte nicht geladen werden.</p>';
        }
    }
});
