// Main JavaScript File
// Tune Eternal - Musician Hub Site

// Get the base path for the site (handles GitHub Pages repository name)
function getBasePath() {
    const path = window.location.pathname;
    // Check if we're on GitHub Pages (has repo name in path)
    const match = path.match(/^\/([^\/]+)\//);
    if (match && !match[1].endsWith('.html') && match[1] !== 'pages') {
        return '/' + match[1];
    }
    return '';
}

// Fix all links on page load to work with GitHub Pages
function fixAllLinks() {
    const basePath = getBasePath();
    if (!basePath) return; // No need to fix if no base path
    
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/')) {
            link.setAttribute('href', basePath + href);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fixAllLinks();
    initHeaderScroll();
    initBackToTop();
    initSmoothScroll();
    initFadeInAnimations();
});

// Header scroll effect - adds background on scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const scrollThreshold = 50;
    
    function updateHeader() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
}

// Back to top button visibility and functionality
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;
    
    const showThreshold = 400;
    
    function updateVisibility() {
        if (window.scrollY > showThreshold) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Fade-in animations on scroll
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    document.querySelectorAll('.card, [data-animate]').forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}
