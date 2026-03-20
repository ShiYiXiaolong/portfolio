document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
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
                localStorage.setItem('theme', 'theme-light');
            } else {
                htmlElement.classList.replace('theme-light', 'theme-dark');
                localStorage.setItem('theme', 'theme-dark');
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

    // --- Mobile Menu Logic ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });

        const navLinks = navLinksContainer.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
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

    const galleryData = [
        { category: 'balkon', src: 'assets/gallery/balkon%20%281%29.JPG' },
        { category: 'balkon', src: 'assets/gallery/balkon%20%282%29.JPG' },
        { category: 'balkon', src: 'assets/gallery/balkon%20%283%29.JPG' },
        { category: 'balkon', src: 'assets/gallery/balkon%20%284%29.JPG' },
        { category: 'balkon', src: 'assets/gallery/balkon%20%285%29.JPG' },
        { category: 'balkon', src: 'assets/gallery/balkon%20%286%29.JPG' },
        { category: 'balkon', src: 'assets/gallery/balkon%20%287%29.JPG' },
        { category: 'balkon', src: 'assets/gallery/balkon%20%288%29.JPG' },
        { category: 'balkon', src: 'assets/gallery/balkon%20%289%29.JPG' },
        { category: 'carport', src: 'assets/gallery/carport%20%2814%29.jpg' },
        { category: 'carport', src: 'assets/gallery/carport%20%2815%29.jpg' },
        { category: 'carport', src: 'assets/gallery/carport%20%2816%29.jpg' },
        { category: 'carport', src: 'assets/gallery/carport%20%2819%29.JPG' },
        { category: 'carport', src: 'assets/gallery/carport%20%2840%29.JPG' },
        { category: 'carport', src: 'assets/gallery/carport%20%285%29.JPG' },
        { category: 'carport', src: 'assets/gallery/carport%20%2863%29.JPG' },
        { category: 'carport', src: 'assets/gallery/carport%20%2869%29.JPG' },
        { category: 'carport', src: 'assets/gallery/carport%20%2872%29.jpg' },
        { category: 'garten', src: 'assets/gallery/gartenhuetten-und-laube%20%2813%29.jpg' },
        { category: 'garten', src: 'assets/gallery/gartenhuetten-und-laube%20%2818%29.jpg' },
        { category: 'garten', src: 'assets/gallery/gartenhuetten-und-laube%20%282%29.jpg' },
        { category: 'garten', src: 'assets/gallery/gartenhuetten-und-laube%20%2825%29.jpg' },
        { category: 'garten', src: 'assets/gallery/gartenhuetten-und-laube%20%2826%29.JPG' },
        { category: 'garten', src: 'assets/gallery/gartenhuetten-und-laube%20%2834%29.JPG' },
        { category: 'garten', src: 'assets/gallery/gartenhuetten-und-laube%20%284%29.JPG' },
        { category: 'garten', src: 'assets/gallery/gartenhuetten-und-laube%20%286%29.jpg' },
        { category: 'garten', src: 'assets/gallery/gartenhuetten-und-laube%20%288%29.jpg' },
        { category: 'holz', src: 'assets/gallery/holzkonstruktionen%20%2814%29.JPG' },
        { category: 'holz', src: 'assets/gallery/holzkonstruktionen%20%2815%29.JPG' },
        { category: 'holz', src: 'assets/gallery/holzkonstruktionen%20%2834%29.JPG' },
        { category: 'holz', src: 'assets/gallery/holzkonstruktionen%20%2837%29.JPG' },
        { category: 'holz', src: 'assets/gallery/holzkonstruktionen%20%2838%29.JPG' },
        { category: 'holz', src: 'assets/gallery/holzkonstruktionen%20%2847%29.jpg' },
        { category: 'holz', src: 'assets/gallery/holzkonstruktionen%20%285%29.JPG' },
        { category: 'holz', src: 'assets/gallery/holzkonstruktionen%20%288%29.JPG' },
        { category: 'holz', src: 'assets/gallery/holzkonstruktionen%20%289%29.JPG' },
        { category: 'terrassen', src: 'assets/gallery/terrassenboden%20%281%29.JPG' },
        { category: 'terrassen', src: 'assets/gallery/terrassenboden%20%2813%29.JPG' },
        { category: 'terrassen', src: 'assets/gallery/terrassenboden%20%2817%29.JPG' },
        { category: 'terrassen', src: 'assets/gallery/terrassenboden%20%2820%29.JPG' },
        { category: 'terrassen', src: 'assets/gallery/terrassenboden%20%2868%29.JPG' },
        { category: 'terrassen', src: 'assets/gallery/terrassenboden%20%2869%29.JPG' },
        { category: 'terrassen', src: 'assets/gallery/terrassenboden%20%2878%29.JPG' },
        { category: 'terrassen', src: 'assets/gallery/terrassenboden%20%2892%29.jpg' },
        { category: 'ueberdachung', src: 'assets/gallery/ueberdachung%20%2810%29.JPG' },
        { category: 'ueberdachung', src: 'assets/gallery/ueberdachung%20%2813%29.jpg' },
        { category: 'ueberdachung', src: 'assets/gallery/ueberdachung%20%2814%29.JPG' },
        { category: 'ueberdachung', src: 'assets/gallery/ueberdachung%20%2815%29.JPG' },
        { category: 'ueberdachung', src: 'assets/gallery/ueberdachung%20%2816%29.jpg' },
        { category: 'ueberdachung', src: 'assets/gallery/ueberdachung%20%2817%29.JPG' },
        { category: 'ueberdachung', src: 'assets/gallery/ueberdachung%20%2824%29.JPG' },
        { category: 'ueberdachung', src: 'assets/gallery/ueberdachung%20%284%29.JPG' },
        { category: 'ueberdachung', src: 'assets/gallery/ueberdachung%20%287%29.JPG' },
        { category: 'zaun', src: 'assets/gallery/zaun-und-sichtschutz%20%2834%29.JPG' },
        { category: 'zaun', src: 'assets/gallery/zaun-und-sichtschutz%20%2836%29.JPG' },
        { category: 'zaun', src: 'assets/gallery/zaun-und-sichtschutz%20%2839%29.JPG' },
        { category: 'zaun', src: 'assets/gallery/zaun-und-sichtschutz%20%284%29.jpg' },
        { category: 'zaun', src: 'assets/gallery/zaun-und-sichtschutz%20%2848%29.JPG' },
        { category: 'zaun', src: 'assets/gallery/zaun-und-sichtschutz%20%2852%29.jpg' },
        { category: 'zaun', src: 'assets/gallery/zaun-und-sichtschutz%20%2856%29.JPG' },
        { category: 'zaun', src: 'assets/gallery/zaun-und-sichtschutz%20%286%29.JPG' },
        { category: 'zaun', src: 'assets/gallery/zaun-und-sichtschutz%20%288%29.jpg' },
    ];


    const galleryGrid = document.querySelector('.real-gallery-grid');
    if (galleryGrid) {
        galleryData.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item-real filter-item hide';
            div.setAttribute('data-category', item.category);
            div.setAttribute('data-src', item.src);
            div.style.backgroundImage = `url('${item.src}')`;
            galleryGrid.appendChild(div);
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');
    const loadMoreBtn = document.getElementById('load-more-gallery');

    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    let visibleItems = [];
    let currentIndex = 0;

    const MAX_INITIAL = 4;
    let showingAll = false;

    function updateGridAndModalItems() {
        const activeBtn = document.querySelector('.filter-btn.active');
        const activeFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

        let matched = [];
        filterItems.forEach(item => {
            const cat = item.getAttribute('data-category');
            if (activeFilter === 'all' || activeFilter === cat) {
                matched.push(item);
            } else {
                item.classList.add('hide');
            }
        });

        visibleItems = matched;

        if (activeFilter === 'all' && !showingAll) {
            matched.forEach((item, index) => {
                if (index < MAX_INITIAL) item.classList.remove('hide');
                else item.classList.add('hide');
            });
            if (loadMoreBtn) loadMoreBtn.style.display = matched.length > MAX_INITIAL ? 'inline-block' : 'none';
        } else {
            matched.forEach(item => item.classList.remove('hide'));
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        }
    }

    updateGridAndModalItems();

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                showingAll = false;
                updateGridAndModalItems();
            });
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            showingAll = true;
            updateGridAndModalItems();
        });
    }

    if (galleryGrid) {
        galleryGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.filter-item');
            if (!item) return;
            const src = item.getAttribute('data-src');
            currentIndex = visibleItems.indexOf(item);
            if (currentIndex === -1) currentIndex = 0;
            openModal(src);
        });
    }

    function openModal(src) {
        if (!modal || !modalImg) return;
        modalImg.src = src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    function showNext() {
        if (visibleItems.length === 0) return;
        currentIndex = (currentIndex + 1) % visibleItems.length;
        if (modalImg && visibleItems[currentIndex]) {
            modalImg.src = visibleItems[currentIndex].getAttribute('data-src');
        }
    }

    function showPrev() {
        if (visibleItems.length === 0) return;
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        if (modalImg && visibleItems[currentIndex]) {
            modalImg.src = visibleItems[currentIndex].getAttribute('data-src');
        }
    }

    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });

});
