# PRD — Portfolio Michaël Godefroy (Portfoliov2)
## Problème initial
Repo public https://github.com/GodefroyMichaelUnix/Portfoliov2 — travailler directement dessus.
## Stack
React 19 + TS + Vite + Tailwind v4 + Motion + Lenis ; données Supabase (RLS public) ; contact via Edge Function Supabase + Resend ; Netlify.
Aperçu : lanceur local /app/frontend/package.json (exclu de git) → vite port 3000 ; clés dans /app/.env.local (ignoré).
## Identité actuelle (AGENTS.md mis à jour)
Direction « Folioblox » : fond quasi noir, panneaux arrondis empilés, en-têtes photo duotone par page, Plus Jakarta Sans unique, pills orange avec flèche, listes éditoriales, dark par défaut + clair conservé.
## Fait
- 2026-09-29 : clone, install, connexion Supabase de l'aperçu
- 2026-09-29 : refonte premium (glass/fond animé) — REMPLACÉE ensuite
- 2026-09-29 : refonte Folioblox Phase 1 : styles/folio.css, Folio.tsx (Pill, SectionHead), PageIntro = en-tête photo, Hero orange, HomePage complète (outils, trio N&B, éventail + méthodologie, portrait, workflows, vidéo, tarifs, projets, certifs « Awards », coulisses, FAQ, contact), Projets (intro, grille 2×2, liste, état vide), À propos (Qui je suis, services, timeline), Contact (champs arrondis, bouton orange), topbar intégré/compact, 10 photos générées dans public/art/ref/, fallback portrait local, masquage des logos cassés, correction débordement horizontal
## Notes
- Supabase : 0 projets ; images d'expertise en chemins relatifs rejetés par safeExternalUrl → fallback local dans la galerie ; heroPhotoUrl/avatarUrl vides → portrait local src/assets/images/michael_portrait_transparent.png
## Backlog
- P1 Phase 2 : mise en page détaillée Compétences, Certifications, Coulisses ; remplacer les photos générées par les vraies
- P2 Phase 3 : perfs/accessibilité, puis Save to Github
