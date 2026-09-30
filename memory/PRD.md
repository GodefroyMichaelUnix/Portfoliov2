# PRD — Portfolio Michaël Godefroy (Portfoliov2)

## Problème d'origine
Repo GitHub public https://github.com/GodefroyMichaelUnix/Portfoliov2 — refonte premium du portfolio (React 19 + Vite + TS + Tailwind + Motion, données Supabase). Langue : français.

## Architecture
- Frontend seul (racine /app, port 3000). Données via @supabase/supabase-js (clé publique dans /app/.env.local).
- Identité « Folioblox » pleine largeur : fond sombre, Plus Jakarta Sans, libellés orange, pills avec flèche, en-têtes photo. Voir /app/AGENTS.md.

## Réalisé
- [S1] Connexion Supabase, refonte premium, refonte Folioblox, pleine largeur, nom doré, pages Services & Passions, SQL 20260930_add_services_passions.sql.
- [S2 — 2026-09-30] Vidéo de présentation sous l'en-tête (vidéo d'ambiance provisoire générée /art/presentation-ambiance.webm/.mp4, badge « Aperçu d’ambiance », remplacée auto par presentation_video_url) ; bandeau logos pleine largeur encadré de filets, logos plus grands avec halo au survol ; bannière « Les coulisses » (fleurs géométriques animées, logos outils, image) ; modale service Avant/Après (Échap, croix, clic extérieur) ; marquee des passions (ralentit au survol, fixe si reduced-motion) ; Certifications en « Awards » + fenêtre de détail ; Coulisses pleine largeur (journal numéroté + rail au scroll, grille architecture, flux, cartes sombres, stack, CTA) ; SQL 20261001_add_services_before_after.sql (colonnes before_text/after_text + 15 exemples). Testé (iteration_3, 26/27 puis correctif clic extérieur vérifié).

## Dépendances utilisateur
- Exécuter dans Supabase : 20260930_add_services_passions.sql puis 20261001_add_services_before_after.sql. Sans cela, Services/Passions affichent l'état vide.

## Backlog
- P1 : vraie vidéo de présentation + vraies photos (en-têtes, passions), réglages après retour.
- P2 : nettoyage AutomationBackground/premium.css, performances, accessibilité, envoi GitHub via « Save to Github ».
