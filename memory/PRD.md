# PRD — Portfolio Michael Godefroy (Portfoliov2)
## Problème initial
Repo public https://github.com/GodefroyMichaelUnix/Portfoliov2 — travailler directement dessus. Objectif des modifications : à définir plus tard.
## Stack
React 19 + TS + Vite + Tailwind v4 + Motion + Lenis ; données Supabase (RLS public) ; contact via Edge Function Supabase + Resend ; hébergement Netlify.
## Contraintes (AGENTS.md)
Préservation stricte du design (typos Archivo/Instrument Serif/Plus Jakarta Sans/JetBrains Mono, palette, animations, Lenis, SoundContext).
## Fait (2026-09-29)
- Repo présent dans /app, npm install, tsc OK
- Lanceur local /app/frontend/package.json (exclu via .git/info/exclude) → vite sur port 3000
## Bloquant
- .env avec VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY requis pour afficher le contenu
## Backlog
- Tâches à définir par l'utilisateur
