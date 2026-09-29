# Portfolio pleine largeur, pages « Mes services » et « Passions », nom doré animé

Cette évolution garde l'identité Folioblox, mais pose tout le contenu directement sur le fond sombre, sur toute la largeur de l'écran, sans grandes cartes englobantes.
Elle ajoute deux nouvelles pages alimentées par Supabase, « Mes services » et « Passions », avec chacune un aperçu sur l'accueil, et corrige les points relevés.

## Pour qui
- **Les visiteurs (clients, recruteurs)** : ils voient un site plus ample et plus premium. Ils comprennent immédiatement ce que Michaël peut faire pour leur entreprise et découvrent la personne derrière le travail.
- **Michaël** : il gère lui-même ses services et ses passions depuis Supabase, sans toucher au code.

## Fonctionnalités et expérience

### 1. Mise en page pleine largeur, sans cartes englobantes
- Les grands panneaux arrondis qui entourent chaque section sont supprimés. Le contenu est posé directement sur le fond sombre, de gauche à droite de l'écran, avec des marges latérales confortables.
- Les sections sont séparées par l'espace et par de fins filets, et non plus par des blocs.
- **En-têtes photo** : ils passent en pleine largeur, bord à bord, sans marges ni coins arrondis. Le topbar est posé dessus, puis devient la barre sombre compacte au scroll.
- **Contenu intérieur** : les cartes de contenu (offres, services, compétences…) restent, mais s'étalent sur toute la largeur disponible, avec plus de colonnes sur les grands écrans.
- **Pied de page** : il est posé lui aussi directement sur le fond.
- En mode clair, la même logique s'applique sur le fond blanc cassé.

### 2. Accueil
- **Bandeau des outils** : la phrase « Les outils que j'utilise au quotidien pour relier vos systèmes. » est retirée. Seules les icônes des outils défilent, sur toute la largeur.
- **Nom animé** : « Michaël Godefroy », en haut, reçoit un effet doré. Un reflet brillant traverse les lettres en boucle, comme sur de l'or poli. Pour les visiteurs qui réduisent les animations, le nom reste doré mais fixe.
- **Nouvel aperçu « Mes services »** : il est placé juste après « Derrière les systèmes ». Il montre les 6 premiers services et un bouton « Voir tous les services ».
- **Nouvel aperçu « Passions »** : il est placé juste après « À propos de moi ». Il montre 3 ou 4 passions en images et un bouton « Voir plus ».

### 3. Nouvelle page « Mes services »
- Elle a son propre en-tête photo pleine largeur, couleur cuivre et orange.
- Elle contient une grande liste de services formulés en bénéfices pour l'entreprise, sans parler de stack. Par exemple : « J'automatise la saisie de vos factures », ou « Je connecte votre CRM à vos outils ».
- Les services sont regroupés par catégorie : Automatisation, IA, Intégrations, Données, Développement sur mesure.
- **Chaque service** affiche une icône, un titre fort et une phrase qui explique le bénéfice. Au survol, la ligne s'éclaire en orange et l'icône s'anime. Les services apparaissent en cascade au scroll.
- La page se termine par un appel à l'action vers Contact.
- **Contenu** : il vient d'une nouvelle table Supabase, `services`. Michaël peut ajouter, modifier, ordonner et masquer ses services.

### 4. Nouvelle page « Passions »
- Elle a son propre en-tête photo pleine largeur, couleur corail et rose.
- Elle présente une galerie éditoriale des hobbies, en grandes images qui alternent avec leur titre et un court texte. Les images zooment doucement au survol et se révèlent au scroll.
- **Contenu** : il vient d'une nouvelle table Supabase, `passions` (titre, texte, image, ordre, visible ou non).
- **Images** : elles sont hébergées dans un espace de stockage Supabase public, `passion-images`, créé par le script.
- **État vide** : tant qu'aucune passion n'est saisie, la page et l'aperçu de l'accueil affichent un état vide soigné.

### 5. Page « Compétences »
- **Titre** : le mot « Compétences » de l'en-tête s'affiche maintenant en entier. Sa taille s'adapte à la largeur de l'écran.
- **Nouvelles cartes de compétences** (n8n, Python, etc.) :
  - le logo est mis en valeur, en grand, dans un écrin sombre avec un halo orange qui s'intensifie et une légère animation au survol ;
  - la carte n'affiche que le nom de la compétence et une courte phrase qui explique son usage ;
  - le niveau, les tags et la mention « MODULE 01 » sont retirés ;
  - les cartes sont disposées en grille pleine largeur et apparaissent en cascade.

### 6. Navigation
- « Services » devient un lien direct du topbar, à côté d'Accueil, Projets et Coulisses.
- « Passions » rejoint le menu Explorer, avec Compétences, Certifications et À propos.
- Les deux pages sont aussi ajoutées au menu mobile et au pied de page.

### 7. Script SQL fourni
- Un script prêt à coller dans l'éditeur SQL de Supabase :
  - il crée les tables `services` et `passions`, avec une lecture publique sécurisée et aucune écriture publique ;
  - il crée l'espace de stockage des images de passions.
- **Services** : le script contient une première liste d'environ 15 services, rédigée à partir du profil de Michaël. Il peut la modifier.
- **Passions** : le script ne contient aucune passion inventée, seulement un exemple en commentaire. Michaël saisit ses vraies passions.
- Le script est aussi versionné dans le dossier des migrations Supabase du projet.

## Parcours utilisateur
1. Le visiteur arrive sur l'en-tête pleine largeur. Le nom de Michaël brille comme de l'or, et les icônes des outils défilent juste en dessous.
2. En descendant, il voit les 6 premiers services, clique sur « Voir tous les services » et découvre la liste complète par catégorie.
3. De retour sur l'accueil, il découvre les passions de Michaël après la section « À propos de moi », puis clique sur « Voir plus » pour ouvrir la page Passions.
4. Sur Compétences, il voit le titre en entier et des cartes centrées sur les logos.
5. Michaël colle le script dans Supabase, ajoute ses passions et leurs photos, et ajuste ses services. Le site se met à jour automatiquement.

## Ressenti UI/UX
- Ample, aéré et premium : le contenu respire sur toute la largeur, sans effet « boîte dans une boîte ».
- L'identité est conservée : fond sombre, grands titres blancs gras, libellés orange, pills avec flèche, filets fins, mode clair disponible.
- Le doré du nom est la seule touche précieuse. Il reste élégant et discret dans son mouvement.
- Le style des services se lit vite : chaque ligne est un bénéfice clair pour l'entreprise.

## Phases de mise en œuvre
- **Phase 1 (MVP, réalisée maintenant)** :
  - mise en page pleine largeur sans panneaux et en-têtes bord à bord, sur toutes les pages ;
  - nom doré animé et bandeau d'outils sans phrase ;
  - correction du titre Compétences et nouvelles cartes de compétences ;
  - pages Services et Passions avec leurs aperçus sur l'accueil et la navigation mise à jour ;
  - script SQL avec la liste de services de départ ;
  - vérification en sombre, en clair et sur mobile.
- **Phase 2** :
  - mise en page détaillée de Certifications et Coulisses dans ce nouveau style pleine largeur ;
  - remplacement des photos générées par les vraies photos de Michaël ;
  - réglages après son retour.
- **Phase 3** : finitions (performances, accessibilité, réduction des animations), puis envoi sur GitHub via « Save to Github ».

## Hypothèses
- **En-têtes photo** : « Effectivement » est compris comme une préférence pour des en-têtes pleine largeur bord à bord, sans marges ni coins arrondis.
- **Placement des services** : la question n'a pas reçu de réponse explicite. Par cohérence avec Passions, les services ont leur propre page et un aperçu de 6 services sur l'accueil.
- **Tant que le script SQL n'est pas lancé**, les deux nouvelles pages affichent un état vide soigné, sans erreur. Michaël doit lancer le script lui-même dans Supabase, puis y ajouter ses passions et leurs photos.
- **Liste de services de départ** : elle est rédigée à partir de son profil (automatisation, agents IA, intégrations d'API, pipelines de données, développement). Elle reste modifiable dans Supabase.
- **Nouvelles photos** : deux photos d'ambiance générées sont ajoutées pour les en-têtes Services et Passions. Elles sont provisoires, comme les autres.
- **Cartes de compétences** : le niveau et les tags sont masqués à l'affichage. Les données restent dans Supabase et ne sont pas supprimées.
- **Aucune autre modification** : pas de changement des autres tables Supabase, du formulaire de contact ou du chargement des données existantes.
