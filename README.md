# Tune Eternal Hub

One-stop shop for the musician Tune Eternal.

## Project Structure

```
TuneEternal_Hub_Site/
├── index.html              # Main homepage
├── package.json            # NPM dependencies and scripts
├── components/             # Reusable HTML components
│   ├── footer.html
│   └── hamburger_nav.html
├── pages/                  # Additional pages
├── scss/                   # SCSS source files
│   ├── main.scss          # Main SCSS entry point
│   ├── abstracts/         # Variables, mixins
│   ├── base/              # Reset, typography
│   ├── layout/            # Header, footer, navigation
│   ├── components/        # Buttons, cards, etc.
│   └── pages/             # Page-specific styles
├── css/                   # Compiled CSS (generated, gitignored)
└── js/                    # JavaScript files
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build CSS:
```bash
npm run sass:build
```

3. Start development server:
```bash
npm run dev
```

This will:
- Watch SCSS files for changes and compile them automatically
- Start a live-reload server on http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server with live-reload and SCSS watch
- `npm run sass` - Watch SCSS files and compile on change
- `npm run sass:build` - Build SCSS once (for production)
- `npm run server` - Start live-server only
- `npm run build` - Build production CSS

## Features

- **Responsive Design** - Mobile-first approach with hamburger navigation
- **SCSS Architecture** - Organized with the 7-1 pattern
- **Modern CSS** - Flexbox, Grid, CSS animations
- **Component-based** - Reusable components and utilities
- **Live Reload** - Automatic browser refresh during development

## Customization

### Colors & Branding

Edit `scss/abstracts/_variables.scss` to customize:
- Color palette
- Typography
- Spacing
- Breakpoints
- Transitions and effects

### Adding New Pages

1. Create HTML file in `pages/` directory
2. Create corresponding SCSS file in `scss/pages/`
3. Import the SCSS file in `scss/main.scss`

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) - last 2 versions

## Author

L4w1i3t
