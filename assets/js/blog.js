 const blogPosts = [
        {
            id: 1,
            title: "Clean Water Project Transforms Local Community",
            excerpt: "Our recent water rehabilitation project has provided safe drinking water to over 3,000 people...",
            description: "Access to clean water is a fundamental human right. Through our partnership with local authorities, we rehabilitated 5 deep wells and installed solar-powered pumps. This initiative now serves more than 3,000 individuals daily, drastically reducing waterborne diseases and improving livelihoods. Women and children no longer walk long distances, and families can focus on farming and education.",
            datePublished: "March 12, 2026",
            imageMain: "assets/images/programs/water_comunity.jpeg",
            gallery: [
                "assets/images/programs/water_comunity_2.jpeg",
                "assets/images/programs/water_comunity_3.jpeg",
                "assets/images/programs/water_comunity_4.jpeg",
                "assets/images/programs/water_comunity_5.jpeg",
                "assets/images/programs/water_comunity_6.jpeg"
            ],
            videoUrl: "assets/videos/water-project.mp4",
            hasVideo: false,
        },
        {
            id: 2,
            title: "Medical supply",
            excerpt: "Medical supply from WHO For raskiamboni Village of kenya Border to Somalia...",
            description: "We understand that in the medical field, every second and every supply counts. We specialize in the sourcing and distribution of premium medical equipment and consumables, ensuring that hospitals, clinics, and frontline workers have the tools they need to save lives.",
            datePublished: "February 28, 2026",
            imageMain: "assets/images/programs/Medical_Supply.jpeg",
            gallery: [
                "assets/images/programs/Medical_Supply_2.jpeg",
                "assets/images/programs/medicalSuply.jpeg",
            
            ],
            videoUrl: "",
            hasVideo: false
        },
        {
            id: 3,
            title: "Empowering Youth Through Education Programs",
            excerpt: "Our youth empowerment initiatives are helping young people gain skills and confidence...",
            description: "Education opens doors. This year, 450 young people (60% girls) graduated from our vocational training program in Kismayo. Skills learned include carpentry, ICT, and renewable energy installation. Graduates received startup kits, and many are now self-employed. We also renovated 4 classrooms and provided school supplies to 2,000+ children in remote villages.",
            datePublished: "January 20, 2026",
            imageMain: "assets/images/blog/blog3.jpg",
            gallery: [
                "assets/images/blog/edu1.jpg",
                "assets/images/blog/edu2.jpg",
                "assets/images/blog/edu3.jpg"
            ],
            videoUrl: "assets/videos/youth-empowerment.mp4",
            hasVideo: true
        },
        {
            id: 4,
            title: "Emergency Health Campaign Reaches Remote Areas",
            excerpt: "Mobile health units provided maternal care and vaccinations to over 2,500 people...",
            description: "In partnership with UNFPA, our mobile clinics visited hard-to-reach villages, offering prenatal checkups, vaccinations, and nutrition screening. More than 2,500 individuals received life-saving care. We also trained 30 community health workers to promote hygiene and family planning. This campaign reduced malnutrition rates by 18% in targeted locations.",
            datePublished: "March 5, 2026",
            imageMain: "assets/images/blog/health1.jpg",
            gallery: [
                "assets/images/blog/health2.jpg",
                "assets/images/blog/health3.jpg"
            ],
            videoUrl: "",
            hasVideo: false
        },
        {
            id: 5,
            title: "New Sanitation Facilities in Kismayo Schools",
            excerpt: "Rehabilitation of 12 school toilets improved hygiene for 4,000 students...",
            description: "Safe sanitation is key for children's education. We reconstructed gender-separated latrines and handwashing stations in 12 schools across Kismayo. Hygiene promotion sessions reached 4,000 students, reducing absenteeism due to illness. Teachers report higher attendance rates, especially among girls.",
            datePublished: "February 10, 2026",
            imageMain: "assets/images/blog/sanitation1.jpg",
            gallery: [
                "assets/images/blog/san2.jpg",
                "assets/images/blog/san3.jpg"
            ],
            videoUrl: "",
            hasVideo: false
        }
    ];

    // Pagination settings
    const postsPerPage = 3;
    let currentPage = 1;
    let totalPages = Math.ceil(blogPosts.length / postsPerPage);

    // DOM elements
    const blogGridContainer = document.getElementById('blogGridContainer');
    const paginationContainer = document.getElementById('paginationContainer');
    const blogListView = document.getElementById('blogListView');
    const singlePostView = document.getElementById('singlePostView');
    const dynamicPostContent = document.getElementById('dynamicPostContent');
    const backToBlogBtn = document.getElementById('backToBlogBtn');

    // Helper: Render blog posts for current page
    function renderBlogPage() {
        if (!blogGridContainer) return;
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const currentPosts = blogPosts.slice(start, end);

        blogGridContainer.innerHTML = '';
        currentPosts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'blog-card reveal';
            card.innerHTML = `
                <img src="${post.imageMain}" alt="${post.title}" onerror="this.src='https://placehold.co/600x400?text=Image+Not+Found'">
                <div class="blog-content">
                    <h3>${escapeHtml(post.title)}</h3>
                    <p>${escapeHtml(post.excerpt)}</p>
                    <a href="#" class="read-more" data-id="${post.id}">Read More →</a>
                </div>
            `;
            blogGridContainer.appendChild(card);
        });

        // Attach event listeners to read-more buttons
        document.querySelectorAll('.read-more[data-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const postId = parseInt(btn.getAttribute('data-id'));
                const post = blogPosts.find(p => p.id === postId);
                if (post) {
                    showSinglePost(post);
                }
            });
        });

        renderPaginationButtons();
        // re-trigger any reveal animation if needed
    }

    function renderPaginationButtons() {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '‹ Prev';
        prevBtn.className = 'page-btn';
        if (currentPage === 1) prevBtn.disabled = true;
        prevBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderBlogPage();
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = `page-btn ${currentPage === i ? 'active-page' : ''}`;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderBlogPage();
            });
            paginationContainer.appendChild(pageBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next ›';
        nextBtn.className = 'page-btn';
        if (currentPage === totalPages) nextBtn.disabled = true;
        nextBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderBlogPage();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    // Show single post (dynamically)
    function showSinglePost(post) {
        // Hide blog list, show single view
        blogListView.classList.add('hidden-view');
        blogListView.style.display = 'none';
        singlePostView.style.display = 'block';
        singlePostView.classList.remove('hidden-view');

        // Build gallery HTML
        let galleryHtml = '';
        if (post.gallery && post.gallery.length) {
            galleryHtml = `<div class="gallery-grid">${post.gallery.map(img => `<img src="${img}" alt="gallery image" onerror="this.src='https://placehold.co/400x300?text=Image+Missing'">`).join('')}</div>`;
        }

        // video or image main media
        let mediaHtml = '';
        if (post.hasVideo && post.videoUrl && post.videoUrl.trim() !== '') {
            mediaHtml = `
                <div class="featured-media">
                    <video controls style="width:100%; border-radius:24px;">
                        <source src="${post.videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            `;
        } else {
            mediaHtml = `<div class="featured-media"><img src="${post.imageMain}" alt="${post.title}" onerror="this.src='https://placehold.co/800x450?text=Media+Not+Available'"></div>`;
        }

        const postHtml = `
            <div class="post-header">
                <h1 class="post-title">${escapeHtml(post.title)}</h1>
                <div class="post-meta">
                    <span><i class="far fa-calendar-alt"></i> ${escapeHtml(post.datePublished)}</span>
                    <span><i class="far fa-folder-open"></i></span>
                </div>
            </div>
            ${mediaHtml}
            <div class="post-description">
                <p>${escapeHtml(post.description)}</p>
            </div>
            ${galleryHtml ? `<h3 style="margin-top: 1.5rem;">📸 Project Gallery</h3>${galleryHtml}` : ''}
            <div style="margin-top: 2rem; padding: 1rem; background: #eef7f0; border-radius: 24px;">
                <i class="fas fa-hand-holding-heart"></i> Published by director.
            </div>
        `;
        dynamicPostContent.innerHTML = postHtml;
        // scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Helper to escape HTML
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
            return c;
        });
    }

    // Back to blog list
    function backToBlogList() {
        blogListView.style.display = 'block';
        blogListView.classList.remove('hidden-view');
        singlePostView.style.display = 'none';
        singlePostView.classList.add('hidden-view');
        // Re-render blog page to ensure correct state
        renderBlogPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbarNav');
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }
    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) navbar.classList.remove('active');
        });
    });

    // Handle blog nav link to ensure showing blog list if on single view
    const blogNavLink = document.getElementById('blogNavLink');
    if (blogNavLink) {
        blogNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            // if we are in single view, go back to list
            if (singlePostView.style.display === 'block') {
                backToBlogList();
            } else {
                // already on blog list, just refresh scroll
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Event listener for back button
    if (backToBlogBtn) {
        backToBlogBtn.addEventListener('click', backToBlogList);
    }

    // Initialize: render blog list with pagination
    renderBlogPage();

    // Ensure blog list visible, single hidden initially
    singlePostView.style.display = 'none';
    blogListView.style.display = 'block';

    // Simple responsive: if any image fails, fallback
    window.addEventListener('load', () => {
        // Additional dummy images for gallery simulation (since many placeholder images may not exist, we avoid console errors gracefully)
        // For demo, replace broken images with placeholder if needed but not mandatory.
    });