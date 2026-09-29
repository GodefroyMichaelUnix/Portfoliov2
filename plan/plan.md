# Connecter le portfolio à Supabase dans l'aperçu

Connecter l'aperçu du portfolio de Michael Godefroy à sa base Supabase existante, pour que les pages affichent leur vrai contenu.
Ce plan ne modifie ni le design, ni le code, ni la base de données. Il prépare le travail sur le frontend qui suivra.

## Pour qui
- Michael Godefroy : il a besoin d'un aperçu fidèle de son portfolio avant de retoucher le frontend.
- Les visiteurs du site en production ne sont pas concernés : rien ne change sur Netlify.

## Fonctionnalités et résultat attendu
- L'aperçu utilise le projet Supabase `https://edvztfzlwziibwhrjswg.supabase.co` avec la clé publique (publishable) fournie.
- Les pages Accueil, À propos, Projets, Compétences, Certifications, Coulisses et Contact chargent leur contenu réel : profil, projets, compétences, certifications, offres, FAQ, workflows, cartes d'expertise, piliers, coulisses et logos de la Tech Stack.
- Les clés sont stockées dans un fichier d'environnement local. Ce fichier est déjà ignoré par git, donc les clés ne partent pas sur GitHub avec « Save to Github ».
- On vérifie visuellement chaque page, puis on présente un court constat de ce qui s'affiche.

## Parcours utilisateur
1. Michael ouvre l'aperçu.
2. La page d'accueil affiche son vrai contenu : nom, accroche, portrait, expertises, marquee des technologies.
3. Il navigue entre les pages et retrouve les mêmes contenus qu'en production.
4. Il peut ensuite demander ses modifications du frontend sur une base fidèle.

## Ressenti UI/UX
- Aucun changement visuel. L'identité définie dans `AGENTS.md` reste intacte : typographies, palette claire/sombre, animations, curseur personnalisé, défilement Lenis et sons.

## Phases de mise en œuvre
- **Phase 1 (MVP, réalisée maintenant)** : connexion de l'aperçu à Supabase, rechargement de l'aperçu, vérification visuelle page par page.
- **Phase 2** : modifications du frontend demandées par Michael (à définir).
- **Phase 3** : finitions sur ces modifications (responsive, accessibilité, performances), puis envoi sur GitHub via « Save to Github ».

## Hypothèses
- La clé fournie est bien la clé publique (publishable) destinée au navigateur, pas une clé secrète.
- Le formulaire de contact n'est pas testé par un envoi réel : Michael confirme qu'il fonctionne déjà. On vérifie seulement qu'il s'affiche.
- Si certaines sections restent vides (données absentes ou règles de sécurité Supabase), rien n'est corrigé ni signalé en détail. La priorité est le frontend.
- Aucune écriture dans la base Supabase et aucune modification de ses règles de sécurité.
- Le lanceur local de l'aperçu, ajouté plus tôt et exclu de git, est conservé tel quel.
