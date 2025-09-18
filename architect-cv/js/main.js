// Main JavaScript file for architect CV website
// Handles lazy loading, smooth scrolling, and general interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Lazy Loading Implementation
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading class for animation
                img.classList.add('loading');
                
                // Load the actual image
                const tempImg = new Image();
                tempImg.onload = function() {
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                };
                tempImg.onerror = function() {
                    img.classList.remove('loading');
                    img.alt = 'Image failed to load';
                    console.warn('Failed to load image:', img.dataset.src);
                };
                
                tempImg.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    // Start observing lazy images
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Enhanced smooth scrolling for anchor links including skip links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return; // allow default for top
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const hasFixedNav = !!document.querySelector('.nav');
                if (hasFixedNav) {
                    const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                } else {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                if (this.classList.contains('skip-link') || this.textContent.includes('Skip')) {
                    target.focus();
                }
            }
        });
    });
    
    // Back to top functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
        });
        
        // Smooth scroll to top
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }
    
    // Optimized scroll handling
    const handleScroll = debounce(() => {
        // Add any scroll-based animations or effects here
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero sections (if present)
        const heroElements = document.querySelectorAll('.hero-content');
        heroElements.forEach(hero => {
            hero.style.transform = `translateY(${rate}px)`;
        });
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
    
    // Fade in animations for sections
    const observeElements = document.querySelectorAll('.section, .portfolio-item');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    observeElements.forEach(el => {
        fadeObserver.observe(el);
    });
    
    // Skip link is now included in HTML, no need to create dynamically
    
    // Print optimization
    window.addEventListener('beforeprint', function() {
        // Ensure all images are loaded before printing
        const unloadedImages = document.querySelectorAll('.lazy-image:not(.loaded)');
        unloadedImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            }
        });
    });
    
    // Error handling for failed resources
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.warn('Failed to load image:', e.target.src);
            e.target.style.display = 'none';
        }
    });
    
    // Preload critical resources
    function preloadCriticalResources() {
        const firstLazy = document.querySelector('.lazy-image');
        const src = firstLazy?.dataset?.src;
        if (!src) return;
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    }
    
    // Initialize preloading
    preloadCriticalResources();
    
    console.log('Architect CV website initialized successfully');
});

// Utility functions
const Utils = {
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Throttle function for performance
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format date for accessibility
    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}