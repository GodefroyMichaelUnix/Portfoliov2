-- Expand the "Coulisses" page into a complete A-to-Z build story.
-- Keeps the content data-driven in Supabase while the frontend controls presentation.

delete from public.making_of_steps;

insert into public.making_of_steps (id, step, title, description, icon_name, sort_order) values
('cadrage-positionnement', '01', 'Cadrage & positionnement', 'Avant toute ligne de code, définir ce que le portfolio devait raconter : un profil orienté AI Automation, IT Automation et AI Engineering, avec une présentation crédible pour le CDI comme pour le freelance. Le contenu, le ton, la hiérarchie des informations et les appels à l’action ont été pensés avant le détail visuel.', 'Compass', 1),
('brief-direction-artistique', '02', 'Brief & direction artistique', 'Le brief a progressivement fixé les règles visuelles du projet : interface claire et lumineuse, beaucoup de blanc, typographie éditoriale, détails orange, interactions mesurées, animations de scroll haut de gamme et absence de look “dark futuriste”. L’objectif était de construire une identité, pas d’habiller un template.', 'PenLine', 2),
('generation-ai-studio', '03', 'Génération de la base avec Google AI Studio', 'Google AI Studio a servi de point de départ pour générer la première base du projet à partir de prompts détaillés. React, Vite, TypeScript, Tailwind CSS, les premiers composants et une partie de la structure de l’interface ont été produits à partir d’un cahier des charges évolutif, puis repris et affinés.', 'Sparkles', 3),
('architecture-react', '04', 'Architecture React & navigation', 'La base générée a été transformée en véritable application React multi-pages avec React Router. Les pages Accueil, Projets, Compétences, Certifications, À propos, Contact et Coulisses ont été séparées, les composants réutilisables ont été structurés et les données ont progressivement quitté les composants pour devenir pilotables par la couche de services.', 'Blocks', 4),
('iterations-design-motion', '05', 'Itérations UI, Motion & interactions', 'Le rendu a ensuite été retravaillé section par section : transitions de pages, apparitions au scroll, hover states, cursor custom, menu mobile, effets magnétiques, thème clair/sombre, signature sonore, marquage éditorial et nombreuses micro-corrections. Motion a remplacé l’ancienne référence Framer Motion dans le projet au fur et à mesure de sa modernisation.', 'Layers3', 5),
('source-control-github', '06', 'GitHub devient la source de vérité', 'Le code a été versionné dans le dépôt GodefroyMichaelUnix/Portfoliov2. Les changements importants ont été découpés en commits cohérents : refontes de pages, corrections de types, nettoyage du dépôt, évolution du marquee, déplacement de la vidéo, nettoyage des projets et migrations Supabase. Cela permet de suivre l’évolution réelle du portfolio plutôt que de travailler sur une copie jetable.', 'GitBranch', 6),
('schema-supabase', '07', 'Modélisation de la donnée dans Supabase', 'Le portfolio a progressivement quitté le contenu codé en dur pour s’appuyer sur PostgreSQL via Supabase. Le profil, les compétences, certifications, tarifs, FAQ, workflows, contenus de la home, contenus des coulisses et Tech Stack sont stockés dans des tables dédiées. Row Level Security a été configuré pour exposer uniquement ce qui doit l’être publiquement.', 'Database', 7),
('service-types', '08', 'Couche de service & types TypeScript', 'Une couche portfolioService centralise les lectures Supabase et transforme les colonnes snake_case en modèles camelCase utilisés par React. Les types de la base sont versionnés dans database.types.ts afin de garder le frontend aligné avec le schéma. Cela rend le contenu remplaçable sans réécrire chaque page.', 'Braces', 8),
('contact-pipeline', '09', 'Formulaire de contact : Edge Function + Resend', 'Le formulaire de contact a été pensé comme un petit système à part entière : validation et nettoyage côté serveur, honeypot anti-spam, enregistrement dans public.contact_messages, puis notification par email via Resend. Une Supabase Edge Function orchestre le flux et conserve le secret de la logique hors du navigateur.', 'MailCheck', 9),
('tech-stack-storage', '10', 'Tech Stack Marquee & Supabase Storage', 'La ligne de logos de la home a elle aussi été rendue administrable. Une table tech_stack contrôle l’ordre, l’activation, le texte alternatif et l’échelle visuelle de chaque logo. Un bucket Storage tech-logos a été préparé pour les vrais fichiers, avec une URL de secours externe tant que les assets locaux ne sont pas encore uploadés.', 'Images', 10),
('video-presentation', '11', 'La vidéo de présentation trouve sa place', 'La vidéo “Mon parcours et ma vision” a été déplacée de la page À propos vers l’Accueil, directement sous le bloc “Comprendre le problème. Construire la bonne réponse.”. Le composant de présentation a été simplifié pour gérer proprement l’absence de version anglaise et un poster de secours.', 'Video', 11),
('content-architecture', '12', 'Contenu, crédibilité & nettoyage', 'Le contenu a été réécrit au fil des itérations pour rester crédible par rapport au niveau réel : positionnement, bio, méthodologie, certifications, compétences et informations de contact. Les projets ont ensuite été retirés volontairement de la base pour repartir sur une section “Projets à venir” plutôt que de conserver des démonstrations artificielles ou obsolètes.', 'FileText', 12),
('quality-security', '13', 'Cohérence, sécurité & maintenance', 'Après les fonctionnalités viennent les détails qui font tenir le site : nettoyage des index inutiles, politiques RLS séparées, vérification des advisors Supabase, alignement du schéma avec les types, nettoyage des composants orphelins, correction des incohérences de contenu et documentation du projet dans le README.', 'ShieldCheck', 13),
('deployment-netlify', '14', 'GitHub → Netlify → production', 'Le dépôt GitHub est relié à Netlify pour transformer chaque évolution validée du code en nouveau déploiement. Le build utilise Vite, Netlify sert la production et le site actif est accessible sur mgodefroy.com. La chaîne permet de passer du commit au site en ligne sans copier manuellement les fichiers.', 'Rocket', 14),
('domain-spaceship-dns', '15', 'Achat du domaine & configuration DNS', 'Le domaine mgodefroy.com a été acheté sur Spaceship, puis relié à l’infrastructure Netlify par configuration DNS. Cette étape a consisté à connecter le nom de domaine à l’hébergement, vérifier la résolution et faire fonctionner la version HTTPS du domaine personnalisé.', 'Globe2', 15),
('ai-collaboration', '16', 'Travailler avec plusieurs IA', 'Google AI Studio a servi à générer et faire évoluer la base frontend. Claude a été utilisé comme partenaire de revue et de debugging pour relire des versions, diagnostiquer des comportements subtils et proposer des corrections. Yuna / ChatGPT a ensuite été utilisée comme copilote du projet pour raisonner sur l’architecture, modifier directement GitHub et Supabase, documenter les choix et piloter les nettoyages successifs.', 'Bot', 16),
('continuous-evolution', '17', 'Le portfolio reste un produit vivant', 'Le site n’est pas considéré comme “terminé”. Chaque nouvelle compétence, certification, workflow, vidéo, asset ou amélioration d’architecture peut devenir une nouvelle donnée Supabase, un nouveau composant ou une nouvelle version déployée. Le portfolio sert donc aussi de laboratoire permanent pour apprendre à construire, maintenir et faire évoluer un produit web.', 'RefreshCw', 17);

delete from public.making_of_stack;

insert into public.making_of_stack (id, name, sort_order) values
('google-ai-studio', 'Google AI Studio', 1),
('claude', 'Claude', 2),
('chatgpt-yuna', 'ChatGPT / Yuna', 3),
('react', 'React', 4),
('typescript', 'TypeScript', 5),
('vite', 'Vite', 6),
('tailwind-css', 'Tailwind CSS', 7),
('motion', 'Motion', 8),
('react-router', 'React Router', 9),
('supabase', 'Supabase', 10),
('postgresql', 'PostgreSQL', 11),
('edge-functions', 'Supabase Edge Functions', 12),
('resend', 'Resend', 13),
('github', 'GitHub', 14),
('netlify', 'Netlify', 15),
('spaceship', 'Spaceship', 16),
('dns', 'DNS', 17),
('storage', 'Supabase Storage', 18);

update public.profile
set stats = jsonb_build_array(
  jsonb_build_object('label','Projets','value','0','sublabel','En préparation'),
  jsonb_build_object('label','Workflows','value','3','sublabel','Scénarios présentés'),
  jsonb_build_object('label','Réactivité','value','< 24h','sublabel','Réponse aux prises de contact'),
  jsonb_build_object('label','Code','value','100%','sublabel','Versionné sur GitHub')
),
updated_at = now()
where id = 'main';
