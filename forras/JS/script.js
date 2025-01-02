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

    // Mobile Menu Toggle
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
                const headerOffset = header.offsetHeight;
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
                if (entry.target.classList.contains('stat-card')) {
                    animateStats();
                }
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.join-card, .stat-card, .section-title').forEach(el => {
        observer.observe(el);
    });

    // Language switcher functionality
    const languageLinks = document.querySelectorAll('.dropdown-content a');
    languageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const language = e.target.getAttribute('href').replace('#', '');
            // Here you would typically implement language switching logic
            console.log(`Switching to language: ${language}`);
            // For demonstration purposes, we'll just store the selection
            localStorage.setItem('selectedLanguage', language);
        });
    });
});