// Page Initializers
// Loads data and renders content for each page

const PageInit = {
    // Initialize home page
    async home() {
        const discography = await DataLoader.getDiscography();
        const site = await DataLoader.getSiteData();
        
        if (!discography) return;

        // Render latest release
        const releaseGrid = document.querySelector('[data-content="latest-release"]');
        if (releaseGrid && discography.albums && discography.albums.length > 0) {
            const latest = discography.albums[0];
            const image = latest.image 
                ? `<img src="${latest.image}" alt="${latest.title}" class="home-release_img">`
                : PlaceholderSVG.album(400);
            
            releaseGrid.innerHTML = `
                <div class="home-release_artwork">${image}</div>
                <div class="home-release_info">
                    <span class="home-release_label">Latest Release</span>
                    <h2 class="home-release_title">${latest.title}</h2>
                    <p class="home-release_description">${latest.description}</p>
                    <div class="home-release_actions">
                        <a href="pages/discography.html" class="btn btn--primary">Listen Now</a>
                        <a href="pages/discography.html" class="link-arrow">
                            View All Releases
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                </div>
            `;
        }

        // Render featured tracks (from first album)
        const trackList = document.querySelector('[data-content="tracks"]');
        if (trackList && discography.albums && discography.albums.length > 0) {
            const featuredAlbum = discography.albums[0];
            if (featuredAlbum.tracks && featuredAlbum.tracks.length > 0) {
                trackList.innerHTML = featuredAlbum.tracks
                    .slice(0, 4)
                    .map((track, i) => Templates.trackRow(track, i))
                    .join('');
            }
        }
    },

    // Initialize discography page
    async discography() {
        const data = await DataLoader.getDiscography();
        if (!data) return;

        // Render albums
        const albumsGrid = document.querySelector('[data-content="albums"]');
        if (albumsGrid && data.albums) {
            albumsGrid.innerHTML = data.albums
                .map(album => Templates.albumCard(album))
                .join('');
        }

        // Render singles
        const singlesGrid = document.querySelector('[data-content="singles"]');
        if (singlesGrid && data.singles) {
            singlesGrid.innerHTML = data.singles
                .map(single => Templates.singleCard(single))
                .join('');
        }

        // Re-initialize animations for dynamically added content
        initDynamicAnimations();
    },

    // Initialize beats/packs page
    async beats() {
        const data = await DataLoader.getBeats();
        if (!data) return;

        // Render beats
        const beatsList = document.querySelector('[data-content="beats"]');
        if (beatsList && data.beats) {
            beatsList.innerHTML = data.beats
                .map(beat => Templates.beatCard(beat))
                .join('');
        }

        // Render sample packs
        const packsGrid = document.querySelector('[data-content="packs"]');
        if (packsGrid && data.samplePacks) {
            packsGrid.innerHTML = data.samplePacks
                .map(pack => Templates.samplePackCard(pack))
                .join('');
        }

        initDynamicAnimations();
    },

    // Initialize merch page
    async merch() {
        const data = await DataLoader.getMerch();
        if (!data) return;

        // Render products
        const productsGrid = document.querySelector('[data-content="products"]');
        if (productsGrid && data.products) {
            productsGrid.innerHTML = data.products
                .map(product => Templates.merchCard(product))
                .join('');
        }

        initDynamicAnimations();
    },

    // Initialize other projects page
    async projects() {
        const data = await DataLoader.getProjects();
        if (!data) return;

        // Render featured projects
        const featuredGrid = document.querySelector('[data-content="featured"]');
        if (featuredGrid && data.featuredProjects) {
            featuredGrid.innerHTML = data.featuredProjects
                .map(project => Templates.projectCard(project, true))
                .join('');
        }

        // Render collaborations
        const collabsGrid = document.querySelector('[data-content="collabs"]');
        if (collabsGrid && data.collaborations) {
            collabsGrid.innerHTML = data.collaborations
                .map(collab => Templates.collabCard(collab))
                .join('');
        }

        initDynamicAnimations();
    },

    // Initialize about page
    async about() {
        const data = await DataLoader.getSiteData();
        if (!data) return;

        // Render artist image
        const artistImage = document.querySelector('[data-content="artist-image"]');
        if (artistImage) {
            if (data.artist.image) {
                artistImage.innerHTML = `<img src="${data.artist.image}" alt="${data.artist.name}" class="about-image_img">`;
            } else {
                artistImage.innerHTML = PlaceholderSVG.portrait(500, 600);
            }
        }

        // Render bio content
        const bioContent = document.querySelector('[data-content="bio"]');
        if (bioContent && data.artist.bio) {
            let bioHTML = `<h2>Lorem Ipsum</h2>`;
            bioHTML += `<p class="text-lead">${data.artist.bio.short}</p>`;
            
            if (data.artist.bio.full && data.artist.bio.full.length > 0) {
                bioHTML += data.artist.bio.full.map(p => `<p>${p}</p>`).join('');
            }
            
            if (data.artist.bio.influences) {
                bioHTML += `<div class="divider divider--accent"></div>`;
                bioHTML += `<h3>Lorem Ipsum</h3>`;
                bioHTML += `<p>${data.artist.bio.influences}</p>`;
            }
            
            bioContent.innerHTML = bioHTML;
        }

        // Render stats
        const statsGrid = document.querySelector('[data-content="stats"]');
        if (statsGrid && data.stats) {
            statsGrid.innerHTML = data.stats
                .map(stat => Templates.statItem(stat))
                .join('');
        }

        initDynamicAnimations();
    },

    // Initialize contact/links page
    async contact() {
        const data = await DataLoader.getSiteData();
        if (!data) return;

        const container = document.querySelector('[data-content="platform-links"]');
        if (!container || !data.social) return;

        // Only the three platforms we want to feature
        const platforms = [
            {
                key: 'youtube',
                label: 'YouTube',
                icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
                    <polygon points="10,8 16,12 10,16" fill="currentColor"/>
                </svg>`
            },
            {
                key: 'bandcamp',
                label: 'Bandcamp',
                icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <polygon points="4,17 10,7 20,7 14,17" fill="currentColor"/>
                </svg>`
            },
            {
                key: 'soundcloud',
                label: 'SoundCloud',
                icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <rect x="2" y="14" width="2" height="4" rx="1" fill="currentColor"/>
                    <rect x="6" y="10" width="2" height="8" rx="1" fill="currentColor"/>
                    <rect x="10" y="8" width="2" height="10" rx="1" fill="currentColor"/>
                    <rect x="14" y="6" width="2" height="12" rx="1" fill="currentColor"/>
                    <rect x="18" y="10" width="2" height="8" rx="1" fill="currentColor"/>
                </svg>`
            }
        ];

        const arrowSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

        container.innerHTML = platforms
            .filter(p => data.social[p.key])
            .map(p => `
                <a href="${data.social[p.key]}" class="platform-link" target="_blank" rel="noopener">
                    <span class="platform-link_icon">${p.icon}</span>
                    <span class="platform-link_label">${p.label}</span>
                    <span class="platform-link_arrow">${arrowSVG}</span>
                </a>
            `).join('');
    }
};

// Re-initialize scroll animations for dynamically loaded content
function initDynamicAnimations() {
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

    document.querySelectorAll('[data-animate]:not(.animate-on-scroll)').forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Auto-detect and initialize page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.toLowerCase();
    
    if (path.includes('discography')) {
        PageInit.discography();
    } else if (path.includes('beats') || path.includes('packs')) {
        PageInit.beats();
    } else if (path.includes('merch')) {
        PageInit.merch();
    } else if (path.includes('other-projects') || path.includes('projects')) {
        PageInit.projects();
    } else if (path.includes('about')) {
        PageInit.about();
    } else if (path.includes('contact')) {
        PageInit.contact();
    } else if (path.endsWith('/') || path.endsWith('index.html') || path === '') {
        PageInit.home();
    }
});

window.PageInit = PageInit;
