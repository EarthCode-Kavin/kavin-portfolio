# Kavin T.S. — Academic Portfolio

Personal research website (single-page) for **Kavin T.S.**, PhD Research Scholar,
Department of Remote Sensing, Bharathidasan University. Adapted from the iPortfolio
template — dark theme, animated particle + topographic background, JS section switching.

## Deploy to GitHub Pages

**Option A — user site (recommended):** create a repo named `EarthCode-Kavin.github.io`,
push these files to the `main` branch root. Live at `https://earthcode-kavin.github.io`.

```bash
cd kavin-portfolio
git init && git add . && git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/EarthCode-Kavin/EarthCode-Kavin.github.io.git
git push -u origin main
```

**Option B — project site:** push to any repo, then Settings → Pages → Branch: `main` / root.
Lives at `https://earthcode-kavin.github.io/<repo>/`. All paths are relative, so both work.

## Editing

All content is in `index.html`, top to bottom: Header (hero) → About → Resume →
Research → Contact. Edit the text directly; search for a section comment like
`<!-- ======= About Section ======= -->`.

- **Photo:** replace `assets/img/kavin_profile.jpg` (square, ~600×600).
- **CV download:** replace `assets/docs/CV.pdf`.
- **Background:** `assets/img/bg.png` (dark DEM-contour texture).
- **Skill icons:** in `assets/img/icons/` — swap the `<img>` `src` in the Skills block.
- **Publications:** duplicate a `.portfolio-item filter-app` (journal) or `filter-card`
  (presentation) block. For citation copy buttons, give each `<textarea>` a unique id
  ending in a 4-character code (e.g. `bibtexd002`, `harvardd002`) and reference it in
  the matching `onclick="copyCitation('...', this)"`.

## Optional: add a photo Gallery
A gallery section was removed (no photos yet). To add one, create
`assets/img/gallery/`, drop in images, and re-add a `#gallery` section using the
Spotlight library (CSS/JS already in `assets/`). Add a nav link too.

## Stack
Bootstrap 5, AOS-ready markup, Isotope (publication filter), GLightbox, particles.js.
No build step — static files only.
