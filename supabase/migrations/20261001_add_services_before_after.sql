-- Services : exemples « Avant / Après » — à coller dans l’éditeur SQL Supabase
-- Prérequis : avoir exécuté 20260930_add_services_passions.sql (création de la table services).

alter table public.services add column if not exists before_text text;
alter table public.services add column if not exists after_text text;

update public.services s
set before_text = v.before_text, after_text = v.after_text
from (values
  ('J’automatise la saisie de vos factures',
   'Chaque fin de mois, une personne passe près de deux jours à ressaisir les factures fournisseurs dans le logiciel comptable, avec des erreurs de montants et des retards de paiement.',
   'Les factures reçues par e-mail sont lues, vérifiées et enregistrées automatiquement. L’équipe ne contrôle plus que les cas particuliers, en quelques minutes par jour.'),
  ('J’automatise vos tâches répétitives',
   'Les mêmes copier-coller, exports et relances reviennent chaque jour et occupent plusieurs heures par semaine, au détriment du travail qui compte vraiment.',
   'Ces actions s’exécutent seules, au bon moment et sans oubli. Les équipes récupèrent ce temps pour leurs clients et leurs projets.'),
  ('Je trie et traite vos e-mails automatiquement',
   'La boîte de réception commune déborde : les demandes urgentes se perdent entre les newsletters et chacun doit trier manuellement avant de répondre.',
   'Chaque e-mail est classé, étiqueté et transmis à la bonne personne dès sa réception. Les demandes urgentes sont signalées et plus rien ne passe entre les mailles.'),
  ('Je synchronise vos données entre vos outils',
   'Un nouveau client est saisi trois fois : dans le CRM, dans l’outil de facturation et dans le tableur de suivi. Les informations finissent par se contredire.',
   'Une seule saisie suffit : les données circulent automatiquement entre vos outils et restent à jour partout, en temps réel.'),
  ('Je crée des assistants IA pour vos équipes',
   'Les collaborateurs cherchent longtemps la bonne procédure, rédigent les mêmes comptes rendus et préparent chaque document à partir de zéro.',
   'Un assistant IA répond à leurs questions à partir de vos documents, rédige les premiers jets et prépare le travail. Ils se concentrent sur la validation et la décision.'),
  ('Je mets en place un support client assisté par IA',
   'Les clients attendent parfois plus de 24 heures une réponse à des questions simples, et l’équipe support répète les mêmes explications toute la journée.',
   'Les questions fréquentes reçoivent une réponse immédiate et cohérente, jour et nuit. Les demandes complexes sont transmises à un humain avec tout le contexte.'),
  ('J’exploite vos documents avec l’IA',
   'Contrats, PDF et notes s’accumulent dans des dossiers partagés. Retrouver une clause ou une information précise prend de longues minutes, voire des heures.',
   'Vos documents deviennent interrogeables en langage naturel : une question suffit pour obtenir la réponse, le résumé ou la clause recherchée, avec la source.'),
  ('Je connecte votre CRM à vos outils',
   'Les commerciaux recopient les contacts depuis les formulaires et les e-mails, oublient des relances et n’ont jamais une vision complète du client.',
   'Les prospects arrivent directement dans le CRM, les relances se programment seules et chaque échange est historisé automatiquement.'),
  ('Je relie vos applications entre elles via API',
   'Vos logiciels fonctionnent en silos : il faut exporter des fichiers, les retravailler puis les importer ailleurs, avec un risque d’erreur à chaque étape.',
   'Les applications échangent leurs données directement via leurs API, en temps réel et de façon fiable. Plus aucun fichier à manipuler à la main.'),
  ('J’automatise vos prises de rendez-vous et rappels',
   'La prise de rendez-vous se fait par téléphone et par e-mail, les confirmations sont envoyées à la main et les absences non prévenues coûtent cher.',
   'Les clients réservent en ligne selon vos disponibilités réelles, reçoivent confirmations et rappels automatiques. Les absences diminuent nettement.'),
  ('Je centralise vos données dans une base fiable',
   'Les informations sont dispersées entre plusieurs tableurs, versions et boîtes e-mail. Personne ne sait vraiment quel fichier fait foi.',
   'Toutes vos données sont réunies dans une base unique, structurée et sécurisée. Chacun travaille sur la même information, toujours à jour.'),
  ('Je crée des tableaux de bord automatiques',
   'Chaque semaine, quelqu’un passe une demi-journée à exporter, consolider et mettre en forme les chiffres pour le reporting.',
   'Les indicateurs clés se mettent à jour automatiquement dans un tableau de bord clair, consultable à tout moment et partageable en un clic.'),
  ('Je fiabilise et nettoie vos données',
   'Doublons, fautes de frappe et formats incohérents faussent les analyses et font échouer les envois de campagnes.',
   'Les données sont dédoublonnées, corrigées et normalisées automatiquement, puis contrôlées en continu pour rester propres dans la durée.'),
  ('Je développe des outils internes sur mesure',
   'L’équipe jongle avec des tableurs fragiles et des outils génériques qui ne correspondent pas vraiment à sa façon de travailler.',
   'Une application simple, pensée pour vos processus, remplace les bricolages : moins d’erreurs, une prise en main immédiate et un gain de temps quotidien.'),
  ('Je construis des portails et mini-applications',
   'Clients et partenaires envoient leurs documents par e-mail et appellent pour connaître l’avancement de leur dossier.',
   'Un portail dédié leur permet de déposer leurs documents, suivre l’avancement et retrouver leurs informations en autonomie, à toute heure.')
) as v(title, before_text, after_text)
where s.title = v.title
  and s.before_text is null
  and s.after_text is null;
