// Portfolio-specific JavaScript functionality
// Handles navigation, filtering, contact form, and portfolio interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Set initial ARIA state based on screen size
    function setNavAriaState() {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            navLinks.setAttribute('aria-hidden', 'true');
            navToggle.setAttribute('aria-expanded', 'false');
        } else {
            navLinks.removeAttribute('aria-hidden');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
    
    if (navToggle && navLinks) {
        // Set initial state
        setNavAriaState();
        
        // Update on resize
        window.addEventListener('resize', Utils.throttle(setNavAriaState, 250));
        // Keyboard support for nav toggle
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
            
            // Update ARIA attributes for accessibility  
            const isOpen = navLinks.classList.contains('mobile-open');
            const isMobile = window.innerWidth < 768;
            
            this.setAttribute('aria-expanded', isOpen);
            if (isMobile) {
                navLinks.setAttribute('aria-hidden', !isOpen);
            } else {
                navLinks.removeAttribute('aria-hidden');
            }
            
            // Focus management
            if (isOpen) {
                const firstLink = navLinks.querySelector('.nav-link');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileNavLinks = navLinks.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                navToggle.setAttribute('aria-expanded', 'false');
                
                const isMobile = window.innerWidth < 768;
                if (isMobile) {
                    navLinks.setAttribute('aria-hidden', 'true');
                }
                
                // Return focus to toggle
                navToggle.focus();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                navToggle.setAttribute('aria-expanded', 'false');
                
                const isMobile = window.innerWidth < 768;
                if (isMobile) {
                    navLinks.setAttribute('aria-hidden', 'true');
                }
            }
        });
        
        // Escape key to close mobile menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                navToggle.setAttribute('aria-expanded', 'false');
                
                const isMobile = window.innerWidth < 768;
                if (isMobile) {
                    navLinks.setAttribute('aria-hidden', 'true');
                }
                
                navToggle.focus();
            }
        });
    }
    
    // Smart Navigation Hide/Show on Scroll
    let lastScrollTop = 0;
    const nav = document.querySelector('.nav');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', Utils.throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                nav.classList.add('hidden');
            } else {
                // Scrolling up
                nav.classList.remove('hidden');
            }
        } else {
            // At top of page
            nav.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    }, 100));
    
    // Portfolio Grid Interactions
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
        
        // Keyboard navigation support
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Could open modal or navigate to detail page
                console.log('Portfolio item activated:', this.querySelector('h3').textContent);
            }
        });
    });
    
    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Form validation
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            
            // Basic validation
            if (!validateForm(formObject)) {
                showMessage('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await submitContactForm(formObject);
                
                // Success state
                showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
                
            } catch (error) {
                // Error state
                console.error('Form submission error:', error);
                showMessage('Sorry, there was an error sending your message. Please try again or email me directly.', 'error');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
        
        // Real-time validation feedback
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error state on input
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
    }
    
    // Form validation functions
    function validateForm(data) {
        const required = ['name', 'email', 'subject', 'message'];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        for (let field of required) {
            if (!data[field] || data[field].trim() === '') {
                return false;
            }
        }
        
        if (!emailRegex.test(data.email)) {
            return false;
        }
        
        return true;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validation rules
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Visual feedback
        if (!isValid) {
            field.classList.add('error');
            showFieldError(field, errorMessage);
        } else {
            field.classList.remove('error');
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.textContent = message;
        errorEl.style.cssText = `
            color: #dc2626;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        field.parentNode.appendChild(errorEl);
    }
    
    async function submitContactForm(data) {
        // Simulate API call - replace with actual endpoint
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({ status: 'success', message: 'Message sent successfully' });
                } else {
                    reject(new Error('Server error'));
                }
            }, 2000);
        });
    }
    
    function showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-weight: 500;
            ${type === 'success' ? 'background-color: #dcfce7; color: #166534; border: 1px solid #bbf7d0;' : ''}
            ${type === 'error' ? 'background-color: #fef2f2; color: #dc2626; border: 1px solid #fecaca;' : ''}
            ${type === 'info' ? 'background-color: #eff6ff; color: #1d4ed8; border: 1px solid #dbeafe;' : ''}
        `;
        
        contactForm.insertBefore(messageEl, contactForm.firstChild);
        
        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 5000);
        }
        
        // Scroll to message for visibility
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Enhanced Image Loading with Error Handling
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    portfolioImages.forEach(img => {
        img.addEventListener('error', function() {
            // Create placeholder for failed images
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background-color: #f3f4f6;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #6b7280;
                font-size: 1rem;
            `;
            placeholder.textContent = 'Image unavailable';
            
            this.parentNode.replaceChild(placeholder, this);
        });
    });
    
    // Portfolio Item Analytics (optional tracking)
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Track portfolio item clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'portfolio_click', {
                    'item_name': this.querySelector('h3').textContent,
                    'item_category': this.dataset.category,
                    'item_position': index + 1
                });
            }
        });
    });
    
    // Accessibility improvements
    function enhanceAccessibility() {
        // Add proper ARIA labels to interactive elements
        const interactiveElements = document.querySelectorAll('.portfolio-item, .nav-toggle, .submit-btn');
        
        interactiveElements.forEach(el => {
            if (!el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')) {
                if (el.classList.contains('portfolio-item')) {
                    const title = el.querySelector('h3');
                    if (title) {
                        el.setAttribute('aria-label', `View ${title.textContent} project details`);
                    }
                }
            }
        });
        
        // Ensure form labels are properly associated
        const formLabels = contactForm?.querySelectorAll('label');
        formLabels?.forEach(label => {
            const forAttr = label.getAttribute('for');
            if (!forAttr) return;
            const input = document.getElementById(forAttr);
            if (!input) return;
            const help = document.getElementById(`${forAttr}-help`);
            if (help && !input.getAttribute('aria-describedby')) {
                input.setAttribute('aria-describedby', `${forAttr}-help`);
            }
        });
    }
    
    enhanceAccessibility();
    
    console.log('Portfolio page JavaScript initialized successfully');
});