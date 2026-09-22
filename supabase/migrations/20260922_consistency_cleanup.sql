-- Keep Supabase schema and portfolio content aligned with the application contract.
-- Idempotent cleanup for environments where these changes may already exist.

alter table public.contact_messages
  alter column project_type set not null,
  alter column created_at set not null;

alter table public.home_pillars
  alter column image set not null;

drop index if exists public.contact_messages_email_idx;
drop index if exists public.contact_messages_created_at_idx;

update public.profile
set
  title = 'AI Automation Engineer',
  about_page_description = 'Je suis Michaël Godefroy. Je relie les idées, les outils et les personnes pour transformer la complexité en quelque chose d’utile.',
  about_journey_intro_title = 'Je m’appelle Michaël.',
  about_journey_intro_text = 'Après l’obtention du Baccalauréat à 16 ans, je n’ai pas pu poursuivre immédiatement des études universitaires. J’ai donc commencé à travailler dès l’âge de 18 ans et construit mon parcours principalement par la pratique.',
  about_transition_text = 'Aujourd’hui, je construis progressivement mon profil d’AI & Automation Engineer. Je me forme principalement en autodidacte, en travaillant sérieusement sur Python, l’automatisation, les APIs, les workflows, les outils no-code/low-code et l’intelligence artificielle. Je suis également des formations et passe des certifications afin de structurer mes connaissances et de pouvoir progressivement proposer mes compétences en freelance.',
  stats = '[
    {"label":"Projets","value":"3","sublabel":"Systèmes documentés"},
    {"label":"Workflows","value":"3","sublabel":"Scénarios présentés"},
    {"label":"Réactivité","value":"< 24h","sublabel":"Réponse aux prises de contact"},
    {"label":"Code","value":"100%","sublabel":"Versionné sur GitHub"}
  ]'::jsonb,
  updated_at = timezone('utc'::text, now())
where id = 'main';

update public.making_of_steps
set description = 'La structure du projet (React + Vite + TypeScript + Tailwind CSS), le design system et les premiers composants ont été générés à partir de prompts détaillés donnés à Google AI Studio, avec un cahier des charges précis plutôt qu’un simple prompt de génération.'
where id = 'generation-ai-studio';

update public.making_of_steps
set description = 'Passage d’une seule page à une architecture multi-pages avec React Router, ajout des transitions de page et des animations au scroll avec Motion, puis affinage visuel section par section jusqu’à obtenir un rendu premium plutôt qu’un simple template.'
where id = 'iterations-design';

update public.making_of_stack
set name = 'Motion'
where id = 'framer-motion';
