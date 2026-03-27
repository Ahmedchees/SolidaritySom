(function() {
            // Get all slides (5 amazing images)
            const slides = document.querySelectorAll('.slide');
            const dotsContainer = document.getElementById('dotsContainer');
            let currentIndex = 0;
            let slideInterval;
            const totalSlides = slides.length;
            let isTransitioning = false;   // prevent rapid dot clicks while crossfade

            // Create dots based on number of slides
            function createDots() {
                dotsContainer.innerHTML = '';
                for (let i = 0; i < totalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (i === 0) dot.classList.add('active-dot');
                    dot.setAttribute('data-index', i);
                    dot.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (isTransitioning) return;
                        const idx = parseInt(dot.getAttribute('data-index'), 10);
                        if (idx !== currentIndex) {
                            goToSlide(idx);
                            resetInterval();
                        }
                    });
                    dotsContainer.appendChild(dot);
                }
            }

            // Update active slide and dot states
            function goToSlide(index) {
                if (isTransitioning) return;
                if (index === currentIndex) return;
                if (index < 0) index = totalSlides - 1;
                if (index >= totalSlides) index = 0;

                isTransitioning = true;
                
                // Remove active class from current slide
                slides[currentIndex].classList.remove('active');
                // Add active class to new slide
                slides[index].classList.add('active');
                
                // Update dots UI
                const dots = document.querySelectorAll('.dot');
                dots.forEach((dot, i) => {
                    if (i === index) {
                        dot.classList.add('active-dot');
                    } else {
                        dot.classList.remove('active-dot');
                    }
                });
                
                currentIndex = index;
                
                // allow next transition after crossfade duration (1.2s)
                setTimeout(() => {
                    isTransitioning = false;
                }, 1300);
            }

            // Auto slide every 5 seconds (smooth and attractive)
            function startAutoSlide() {
                if (slideInterval) clearInterval(slideInterval);
                slideInterval = setInterval(() => {
                    if (!isTransitioning) {
                        let nextIndex = (currentIndex + 1) % totalSlides;
                        goToSlide(nextIndex);
                    }
                }, 1300);
            }
            
            function resetInterval() {
                if (slideInterval) {
                    clearInterval(slideInterval);
                    startAutoSlide();
                }
            }

            // Initialize first slide: ensure only first slide active, others opacity 0
            function initSlides() {
                if (slides.length === 0) return;
                // set all slides initially inactive
                slides.forEach((slide, idx) => {
                    slide.classList.remove('active');
                });
                // activate first slide
                slides[0].classList.add('active');
                currentIndex = 0;
                createDots();
                startAutoSlide();
            }

            // optional: pause auto-slide when user hovers over hero (enhances UX, keeps responsiveness)
            const heroSection = document.querySelector('.hero-header');
            if (heroSection) {
                heroSection.addEventListener('mouseenter', () => {
                    if (slideInterval) clearInterval(slideInterval);
                });
                heroSection.addEventListener('mouseleave', () => {
                    startAutoSlide();
                });
                // also for touch devices — pause on touch start to avoid conflict, then restart
                heroSection.addEventListener('touchstart', () => {
                    if (slideInterval) clearInterval(slideInterval);
                });
                heroSection.addEventListener('touchend', () => {
                    startAutoSlide();
                });
            }
            
            // Ensure window resize does not break any layout, and images remain responsive (CSS handles)
            window.addEventListener('resize', () => {
                // just reflow safety: no action needed
            });
            
            // preload images? optional — but background images will load naturally
            initSlides();
        })();