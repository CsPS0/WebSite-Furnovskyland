"use strict"

document.addEventListener('DOMContentLoaded', () => {
    /*
    // Element selections
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.main-header');

    // Dark Mode functionality
    const enableDarkMode = () => {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    };

    const disableDarkMode = () => {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    };

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    */

    // Language handling
    const defaultLanguage = 'hu';
    let currentLanguage = localStorage.getItem('selectedLanguage') || defaultLanguage;

    // Function to update text content based on translation key
    const updateText = (element, translationKey) => {
        const keys = translationKey.split('.');
        let translation = translations[currentLanguage];
        for (const key of keys) {
            if (translation && translation[key]) {
                translation = translation[key];
            } else {
                console.warn(`Translation missing for key: ${translationKey} in language: ${currentLanguage}`);
                return;
            }
        }
        if (element.tagName.toLowerCase() === 'input' && element.type === 'submit') {
            element.value = translation;
        } else {
            element.textContent = translation;
        }
    };

    // Function to update all translations on the page
    const updatePageLanguage = () => {
        document.documentElement.lang = currentLanguage;
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const translationKey = element.getAttribute('data-i18n');
            updateText(element, translationKey);
        });
    };

    // Handle language selection
    const languageLinks = document.querySelectorAll('[data-lang]');
    languageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentLanguage = e.target.getAttribute('data-lang');
            localStorage.setItem('selectedLanguage', currentLanguage);
            updatePageLanguage();
        });
    });

    // Initial language setup
    updatePageLanguage();

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Toggle animation classes for menu icon
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.children[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            mobileMenu.children[1].style.opacity = '0';
            mobileMenu.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            mobileMenu.children[0].style.transform = 'none';
            mobileMenu.children[1].style.opacity = '1';
            mobileMenu.children[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            // Reset menu icon
            mobileMenu.children[0].style.transform = 'none';
            mobileMenu.children[1].style.opacity = '1';
            mobileMenu.children[2].style.transform = 'none';
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
    /*
    // Add some animation to stat numbers
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-card p');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current).toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target.toLocaleString();
                }
            };
            updateCount();
        });
    };
    */

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.join-card, .stat-card, .section-title').forEach(el => {
        observer.observe(el);
    });
});