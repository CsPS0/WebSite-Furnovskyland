'use strict';

document.addEventListener('DOMContentLoaded', () => {

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }

    // Language logic is now handled by Eleventy static generation.

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenu && mobileNav) {
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.toggle('open');
            mobileMenu.setAttribute('aria-expanded', isOpen);
            mobileNav.classList.toggle('show');
        });
    }

    // Language Dropdown
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownTrigger = document.querySelector('.dropdown-trigger');

    if (dropdownTrigger && dropdownContent) {
        dropdownTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isShown = dropdownContent.classList.toggle('show');
            dropdownTrigger.setAttribute('aria-expanded', isShown);
        });
    }

    // Close dropdowns and mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (dropdownContent && !dropdownContent.classList.contains('hidden') && !dropdownContent.classList.contains('show') === false) {
            dropdownContent.classList.remove('show');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                if (mobileNav && mobileNav.classList.contains('show')) {
                    mobileMenu.classList.remove('open');
                    mobileNav.classList.remove('show');
                }
            }
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up', 'scroll-down');
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
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .content-section, .section-title').forEach(el => {
        el.classList.add('animate-up');
        observer.observe(el);
    });

    // Minecraft Server Status
    const serverIpElement = document.getElementById('server-ip');
    if (serverIpElement) {
        const serverIp = serverIpElement.textContent;
        const serverStatusElement = document.getElementById('server-status');
        const serverPlayersElement = document.getElementById('server-players');
        
        // Add skeletons to minecraft page if they exist
        if(serverStatusElement) {
            serverStatusElement.innerHTML = '<div class="skeleton-loader" style="display:inline-block; width:100px; height:1rem;"></div>';
            serverPlayersElement.innerHTML = '<div class="skeleton-loader" style="display:inline-block; width:100px; height:1rem;"></div>';
        }

        const updateMcUI = (data) => {
            if (data.online) {
                serverStatusElement.textContent = 'Online';
                serverStatusElement.classList.remove('text-gray', 'text-red');
                serverStatusElement.classList.add('text-green');
                serverPlayersElement.textContent = `${data.players.online}/${data.players.max}`;
            } else {
                serverStatusElement.textContent = 'Offline';
                serverStatusElement.classList.remove('text-gray', 'text-green');
                serverStatusElement.classList.add('text-red');
                serverPlayersElement.textContent = 'N/A';
            }
        };

        const mcCacheKey = `mc_status_${serverIp}`;
        const cachedMc = sessionStorage.getItem(mcCacheKey);
        let useCache = false;

        if (cachedMc) {
            try {
                const cacheData = JSON.parse(cachedMc);
                if (new Date().getTime() - cacheData.timestamp < 5 * 60000) { // 5 minutes
                    updateMcUI(cacheData.response);
                    useCache = true;
                }
            } catch (e) { console.error(e); }
        }

        if (!useCache) {
            fetch(`https://api.mcsrvstat.us/2/${serverIp}`)
                .then(response => response.json())
                .then(data => {
                    updateMcUI(data);
                    sessionStorage.setItem(mcCacheKey, JSON.stringify({
                        timestamp: new Date().getTime(),
                        response: data
                    }));
                })
                .catch(error => {
                    console.error('Error fetching Minecraft server status:', error);
                    serverStatusElement.textContent = 'Error';
                    serverStatusElement.classList.remove('text-gray', 'text-green');
                    serverStatusElement.classList.add('text-red');
                    serverPlayersElement.textContent = 'N/A';
                });
        }
    }

    // Discord Server Status
    const discordCountElement = document.getElementById('discord-online-count');
    const discordSkeleton = document.querySelector('.discord-skeleton');
    
    if (discordCountElement) {
        if(discordSkeleton) discordSkeleton.style.display = 'block';
        discordCountElement.style.display = 'none';

        const updateDiscordUI = (data) => {
            if(discordSkeleton) discordSkeleton.style.display = 'none';
            discordCountElement.style.display = 'inline';

            if (data.presence_count !== undefined) {
                discordCountElement.textContent = data.presence_count;
            } else {
                discordCountElement.textContent = 'N/A';
            }
        };

        const discordCacheKey = 'discord_status_v3';
        const cachedDiscord = sessionStorage.getItem(discordCacheKey);
        let useDiscordCache = false;

        if (cachedDiscord) {
            try {
                const cacheData = JSON.parse(cachedDiscord);
                if (new Date().getTime() - cacheData.timestamp < 5 * 60000) { // 5 minutes
                    updateDiscordUI(cacheData.response);
                    useDiscordCache = true;
                }
            } catch (e) { console.error(e); }
        }

        if (!useDiscordCache) {
            fetch('https://discord.com/api/guilds/836271168977764363/widget.json')
                .then(response => response.json())
                .then(data => {
                    updateDiscordUI(data);
                    sessionStorage.setItem(discordCacheKey, JSON.stringify({
                        timestamp: new Date().getTime(),
                        response: data
                    }));
                })
                .catch(error => {
                    if(discordSkeleton) discordSkeleton.style.display = 'none';
                    discordCountElement.style.display = 'inline';

                    console.error('Error fetching Discord widget status:', error);
                    discordCountElement.textContent = 'N/A';
                });
        }
    }

    // Set current year for copyright
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Lightbox implementation for gallery
    const galleryImages = document.querySelectorAll('.gallery img');
    if (galleryImages.length > 0) {
        // Create lightbox container
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="" alt="Lightbox Image">
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        // Open lightbox with Anime.js
        galleryImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.style.visibility = 'visible';
                anime({
                    targets: lightbox,
                    opacity: [0, 1],
                    duration: 400,
                    easing: 'easeOutQuad'
                });
                anime({
                    targets: lightboxImg,
                    scale: [0.8, 1],
                    duration: 400,
                    easing: 'easeOutElastic(1, .8)'
                });
            });
        });

        // Close lightbox with Anime.js
        const closeLightbox = () => {
            anime({
                targets: lightbox,
                opacity: 0,
                duration: 300,
                easing: 'easeInQuad',
                complete: () => {
                    lightbox.style.visibility = 'hidden';
                    lightboxImg.src = '';
                }
            });
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // --- 3. Dark Mode Toggle ---
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const docElement = document.documentElement; 
    
    if (themeToggles.length > 0) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            docElement.setAttribute('data-theme', 'dark');
            themeToggles.forEach(toggle => {
                const icon = toggle.querySelector('i');
                if(icon) icon.classList.replace('fa-moon', 'fa-sun');
            });
        }

        themeToggles.forEach(themeToggle => {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                let theme = docElement.getAttribute('data-theme');
                
                if (theme === 'dark') {
                    docElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                    
                    themeToggles.forEach(toggle => {
                        let icon = toggle.querySelector('i');
                        if(!icon) return;
                        anime({
                            targets: icon,
                            rotate: 360,
                            duration: 500,
                            easing: 'easeInOutSine',
                            complete: () => {
                                icon.classList.replace('fa-sun', 'fa-moon');
                                anime.set(icon, {rotate: 0});
                            }
                        });
                    });
                } else {
                    docElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    
                    themeToggles.forEach(toggle => {
                        let icon = toggle.querySelector('i');
                        if(!icon) return;
                        anime({
                            targets: icon,
                            rotate: -360,
                            duration: 500,
                            easing: 'easeInOutSine',
                            complete: () => {
                                icon.classList.replace('fa-moon', 'fa-sun');
                                anime.set(icon, {rotate: 0});
                            }
                        });
                    });
                }
            });
        });
    }

    // --- 4. Scroll To Top Button ---
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if(scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                if(scrollToTopBtn.style.opacity !== '1') {
                    anime({
                        targets: scrollToTopBtn,
                        opacity: 1,
                        translateY: 0,
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                    scrollToTopBtn.style.pointerEvents = 'auto';
                }
            } else {
                if(scrollToTopBtn.style.opacity === '1') {
                    anime({
                        targets: scrollToTopBtn,
                        opacity: 0,
                        translateY: 20,
                        duration: 300,
                        easing: 'easeInQuad'
                    });
                    scrollToTopBtn.style.pointerEvents = 'none';
                }
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // --- 5. Page Load Anime.js Stagger ---
    anime({
        targets: 'main .card, main .content-section, main .gallery img',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {start: 200}),
        easing: 'easeOutExpo',
        duration: 800
    });
});