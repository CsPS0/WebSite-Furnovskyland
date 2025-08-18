'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // Language handling
    const defaultLanguage = 'en';
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
    const mobileNav = document.getElementById('mobile-nav');

    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('open');
        mobileNav.classList.toggle('hidden');
    });

    // Language Dropdown
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownTrigger = dropdown.querySelector('a[data-i18n="nav.language"]');

    dropdownTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdownContent.classList.toggle('hidden');
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        if (!dropdownContent.classList.contains('hidden')) {
            dropdownContent.classList.add('hidden');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                if (!mobileNav.classList.contains('hidden')) {
                    mobileMenu.classList.remove('open');
                    mobileNav.classList.add('hidden');
                }
            }
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');
    
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

    // Minecraft Server Status
    const serverIpElement = document.getElementById('server-ip');
    if (serverIpElement) {
        const serverIp = serverIpElement.textContent;
        const serverStatusElement = document.getElementById('server-status');
        const serverPlayersElement = document.getElementById('server-players');
        const serverVersionElement = document.getElementById('server-version');

        // Set initial loading state
        serverStatusElement.textContent = 'Loading...';
        serverStatusElement.classList.remove('text-green-500', 'text-red-500');
        serverStatusElement.classList.add('text-gray-500');
        serverPlayersElement.textContent = 'Loading...';
        serverVersionElement.textContent = 'Loading...';

        fetch(`https://api.mcsrvstat.us/2/${serverIp}`)
            .then(response => response.json())
            .then(data => {
                console.log('Minecraft API Response:', data); // Log the full response

                if (data.online) {
                    serverStatusElement.textContent = 'Online';
                    serverStatusElement.classList.remove('text-gray-500', 'text-red-500');
                    serverStatusElement.classList.add('text-green-500');
                    serverPlayersElement.textContent = `${data.players.online}/${data.players.max}`;
                    serverVersionElement.textContent = data.version ? data.version : 'N/A'; // Use N/A if version is missing or empty
                } else {
                    serverStatusElement.textContent = 'Offline';
                    serverStatusElement.classList.remove('text-gray-500', 'text-green-500');
                    serverStatusElement.classList.add('text-red-500');
                    serverPlayersElement.textContent = 'N/A';
                    serverVersionElement.textContent = 'N/A';
                }
            })
            .catch(error => {
                console.error('Error fetching Minecraft server status:', error);
                serverStatusElement.textContent = 'Error';
                serverStatusElement.classList.remove('text-gray-500', 'text-green-500');
                serverStatusElement.classList.add('text-red-500');
                serverPlayersElement.textContent = 'N/A';
                serverVersionElement.textContent = 'N/A';
            });
    }

    // Contact Form (Formspree)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.action = 'https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT'; // REPLACE WITH YOUR ACTUAL FORMSPREE ENDPOINT
        contactForm.method = 'POST';
    }

    // Set current year for copyright
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});