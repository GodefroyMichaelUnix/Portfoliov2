# Directives de Développement & Préservation du Design

## ⚠️ Règle Absolue : Préservation du Design
L'identité visuelle actuelle du portfolio (direction « Folioblox » : éditoriale, sombre, en panneaux) doit être **strictement préservée** lors de chaque intervention :
- **Structure** : une colonne centrée (max 1400px) faite de grands panneaux arrondis (`.fb-panel`, `.studio-page`) posés sur un fond quasi noir (`--fb-bg`), séparés par de fines marges de 12px.
- **En-têtes** : chaque page s'ouvre sur un panneau photo duotone plein cadre (`PageIntro` / `Hero`, images dans `public/art/ref/`), avec un libellé coloré, un titre géant blanc et gras, et à droite une phrase forte et un court texte. Couleurs : Accueil orange, Projets et Contact bleu-vert et orange, À propos violet, Compétences rouge-orangé, Certifications ambre, Coulisses vert-bleu.
- **Typographie** : Plus Jakarta Sans pour tous les titres et textes (graisse 800 pour les titres). Pas d'Archivo ni d'Instrument Serif. Textes agrandis et contrastés.
- **Palette** : mode sombre par défaut (`--fb-panel` #111, `--fb-card` #1a1a1a), mode clair conservé (fond blanc cassé, panneaux blancs). Orange signature `--fb-orange` (#ec5314).
- **Composants** : pills arrondis avec flèche dans un cercle (`Pill`), en-têtes de section « libellé, titre, phrase, texte, bouton » (`SectionHead`), cartes sombres (`.fb-card`, trait orange avec `.fb-card-line`), listes éditoriales à filets (`.fb-list` / `.fb-row`), galerie en éventail, carte d'offre mise en avant en orange.
- **Topbar** : intégré au panneau d'en-tête (texte blanc), puis barre sombre compacte au scroll. Il conserve Explorer, le son, le thème et le pill blanc « Me contacter ».
- **Animations** : zoom lent de l'image d'en-tête, titre qui monte à l'entrée, révélations en fondu au scroll (`Reveal`), survols sobres, transitions entre pages (`PageTransition` + `AnimatePresence`).
- **À conserver** : `CustomCursor`, défilement Lenis (`SmoothScroll`), environnement sonore (`SoundContext`), transition de thème (`WaterRippleOverlay`), `MagneticWrapper`, marquees.
- **Architecture** : application SPA React 19 + Tailwind CSS + Vite servie sur le port 3000. Styles : `index.css` (base), `styles/premium.css` (lisibilité), `styles/folio.css` (identité actuelle).
