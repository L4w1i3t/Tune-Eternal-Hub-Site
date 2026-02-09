// Data Loader Utility
// Handles fetching and caching JSON data for the site

const DataLoader = {
    cache: {},
    basePath: '',

    // Determine base path based on current page location
    init() {
        const path = window.location.pathname;
        // If we're in a subdirectory (pages/), go up one level
        this.basePath = path.includes('/pages/') ? '../' : '';
    },

    // Fetch JSON data with caching
    async load(filename) {
        if (this.cache[filename]) {
            return this.cache[filename];
        }

        try {
            const response = await fetch(`${this.basePath}data/${filename}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}`);
            }
            const data = await response.json();
            this.cache[filename] = data;
            return data;
        } catch (error) {
            console.error(`DataLoader: ${error.message}`);
            return null;
        }
    },

    // Convenience methods for each data type
    async getDiscography() {
        return this.load('discography.json');
    },

    async getBeats() {
        return this.load('beats.json');
    },

    async getMerch() {
        return this.load('merch.json');
    },

    async getProjects() {
        return this.load('projects.json');
    },

    async getSiteData() {
        return this.load('site.json');
    }
};

// Initialize on load
DataLoader.init();

// SVG Placeholder generator for items without images
const PlaceholderSVG = {
    // Album/music artwork placeholder
    album(size = 400) {
        return `<svg class="placeholder-img" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${size}" height="${size}" fill="#242424"/>
            <circle cx="${size/2}" cy="${size/2}" r="${size * 0.3}" fill="#333" stroke="#444" stroke-width="2"/>
            <circle cx="${size/2}" cy="${size/2}" r="${size * 0.1}" fill="#1a1a1a"/>
        </svg>`;
    },

    // Generic square placeholder
    square(size = 400) {
        return `<svg class="placeholder-img" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${size}" height="${size}" fill="#1a1a1a"/>
            <rect x="${size * 0.2}" y="${size * 0.2}" width="${size * 0.6}" height="${size * 0.6}" fill="#333" rx="4"/>
        </svg>`;
    },

    // Play button placeholder
    playable(size = 400) {
        return `<svg class="placeholder-img" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${size}" height="${size}" fill="#242424"/>
            <polygon points="${size * 0.38},${size * 0.25} ${size * 0.38},${size * 0.75} ${size * 0.68},${size * 0.5}" fill="#444"/>
        </svg>`;
    },

    // Apparel/merch placeholder
    apparel(size = 400) {
        return `<svg class="placeholder-img" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${size}" height="${size}" fill="#1a1a1a"/>
            <rect x="${size * 0.3}" y="${size * 0.2}" width="${size * 0.4}" height="${size * 0.5}" fill="#333" rx="4"/>
            <rect x="${size * 0.4}" y="${size * 0.15}" width="${size * 0.2}" height="${size * 0.08}" fill="#333"/>
        </svg>`;
    },

    // Video/widescreen placeholder
    video(width = 800, height = 450) {
        return `<svg class="placeholder-img" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${width}" height="${height}" fill="#1a1a1a"/>
            <rect x="${width * 0.35}" y="${height * 0.3}" width="${width * 0.3}" height="${height * 0.4}" fill="#333" rx="8"/>
            <polygon points="${width * 0.44},${height * 0.4} ${width * 0.44},${height * 0.6} ${width * 0.56},${height * 0.5}" fill="#444"/>
        </svg>`;
    },

    // Portrait/person placeholder
    portrait(width = 500, height = 600) {
        return `<svg class="placeholder-img" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${width}" height="${height}" fill="#1a1a1a"/>
            <circle cx="${width/2}" cy="${height * 0.35}" r="${width * 0.2}" fill="#333"/>
            <ellipse cx="${width/2}" cy="${height * 0.75}" rx="${width * 0.24}" ry="${height * 0.25}" fill="#333"/>
        </svg>`;
    },

    // Waveform/audio placeholder
    waveform(size = 400) {
        return `<svg class="placeholder-img" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${size}" height="${size}" fill="#1a1a1a"/>
            <rect x="${size * 0.15}" y="${size * 0.4}" width="${size * 0.08}" height="${size * 0.25}" fill="#333"/>
            <rect x="${size * 0.28}" y="${size * 0.25}" width="${size * 0.08}" height="${size * 0.45}" fill="#444"/>
            <rect x="${size * 0.41}" y="${size * 0.3}" width="${size * 0.08}" height="${size * 0.35}" fill="#333"/>
            <rect x="${size * 0.54}" y="${size * 0.2}" width="${size * 0.08}" height="${size * 0.55}" fill="#444"/>
            <rect x="${size * 0.67}" y="${size * 0.35}" width="${size * 0.08}" height="${size * 0.3}" fill="#333"/>
            <rect x="${size * 0.80}" y="${size * 0.45}" width="${size * 0.08}" height="${size * 0.15}" fill="#444"/>
        </svg>`;
    }
};

// Template renderer utilities
const Templates = {
    // Render album card
    albumCard(album) {
        const image = album.image 
            ? `<img src="${album.image}" alt="${album.title}">`
            : PlaceholderSVG.album();
        
        return `
            <article class="card" data-animate data-id="${album.id}">
                <div class="card_image">${image}</div>
                <div class="card_content">
                    <span class="card_label">${album.year}</span>
                    <h3 class="card_title">${album.title}</h3>
                    <p class="card_description">${album.description}</p>
                </div>
            </article>
        `;
    },

    // Render single/EP card
    singleCard(single) {
        const image = single.image 
            ? `<img src="${single.image}" alt="${single.title}">`
            : PlaceholderSVG.square();
        
        return `
            <article class="card" data-animate data-id="${single.id}">
                <div class="card_image">${image}</div>
                <div class="card_content">
                    <span class="card_label">${single.type}</span>
                    <h3 class="card_title">${single.title}</h3>
                </div>
            </article>
        `;
    },

    // Render track row
    trackRow(track, index) {
        return `
            <div class="card card--track">
                <div class="card_image">${PlaceholderSVG.playable(60)}</div>
                <div class="card_content">
                    <h3 class="card_title">${track.title}</h3>
                    <span class="card_meta">${track.duration}</span>
                </div>
                <button class="btn btn--icon" aria-label="Play">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21"/>
                    </svg>
                </button>
            </div>
        `;
    },

    // Render beat card (horizontal)
    beatCard(beat) {
        const image = beat.image 
            ? `<img src="${beat.image}" alt="${beat.title}">`
            : PlaceholderSVG.playable(180);
        
        return `
            <div class="card card--horizontal" data-animate data-id="${beat.id}">
                <div class="card_image">${image}</div>
                <div class="card_content">
                    <span class="card_label">${beat.genre} / ${beat.bpm} BPM</span>
                    <h3 class="card_title">${beat.title}</h3>
                    <p class="card_description">${beat.description}</p>
                </div>
                <div class="card_actions">
                    <span class="price">$${beat.price.lease}</span>
                    <a href="${beat.purchaseLink}" class="btn btn--secondary btn--small">License</a>
                </div>
            </div>
        `;
    },

    // Render sample pack card
    samplePackCard(pack) {
        const image = pack.image 
            ? `<img src="${pack.image}" alt="${pack.title}">`
            : PlaceholderSVG.waveform();
        
        return `
            <article class="card" data-animate data-id="${pack.id}">
                <div class="card_image">${image}</div>
                <div class="card_content">
                    <span class="card_label">${pack.category}</span>
                    <h3 class="card_title">${pack.title}</h3>
                    <p class="card_description">${pack.description}</p>
                    <div class="card_footer">
                        <span class="price">$${pack.price}</span>
                        <a href="${pack.purchaseLink}" class="btn btn--secondary btn--small">Get Pack</a>
                    </div>
                </div>
            </article>
        `;
    },

    // Render merch product card
    merchCard(product) {
        const image = product.image 
            ? `<img src="${product.image}" alt="${product.title}">`
            : PlaceholderSVG.apparel();
        
        return `
            <article class="card" data-animate data-id="${product.id}">
                <div class="card_image">${image}</div>
                <div class="card_content">
                    <span class="card_label">${product.category}</span>
                    <h3 class="card_title">${product.title}</h3>
                    <p class="card_description">${product.description}</p>
                    <div class="card_footer">
                        <span class="price">$${product.price}</span>
                        <a href="${product.purchaseLink}" class="btn btn--secondary btn--small">View</a>
                    </div>
                </div>
            </article>
        `;
    },

    // Render featured project card
    projectCard(project, featured = false) {
        const image = project.image 
            ? `<img src="${project.image}" alt="${project.title}">`
            : PlaceholderSVG.video();
        
        const cardClass = featured ? 'card card--featured' : 'card';
        
        return `
            <article class="${cardClass}" data-animate data-id="${project.id}">
                <div class="card_image">
                    ${image}
                    <div class="card_overlay">
                        <button class="btn-play" aria-label="Play">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5,3 19,12 5,21"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="card_content">
                    <span class="card_label">${project.type}</span>
                    <h3 class="card_title">${project.title}</h3>
                    <p class="card_description">${project.description}</p>
                </div>
            </article>
        `;
    },

    // Render collaboration card
    collabCard(collab) {
        const image = collab.image 
            ? `<img src="${collab.image}" alt="${collab.title}">`
            : PlaceholderSVG.square();
        
        return `
            <article class="card" data-animate data-id="${collab.id}">
                <div class="card_image">${image}</div>
                <div class="card_content">
                    <span class="card_label">${collab.type}</span>
                    <h3 class="card_title">${collab.title}</h3>
                    <p class="card_description">${collab.description}</p>
                </div>
            </article>
        `;
    },

    // Render stat item
    statItem(stat) {
        return `
            <div class="stat-item" data-animate>
                <span class="stat-number">${stat.value}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `;
    }
};

// Export for use in other scripts
window.DataLoader = DataLoader;
window.PlaceholderSVG = PlaceholderSVG;
window.Templates = Templates;
