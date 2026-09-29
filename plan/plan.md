# Portfolio refait sur le modèle complet de la référence « Folioblox »

Le portfolio de Michaël Godefroy reprend page par page la mise en page, les couleurs, la typographie et les composants de la référence fournie.
Tout le contenu reste celui de Michaël, tiré de Supabase. Seules des photos d'ambiance générées remplacent provisoirement les photos de la référence.

## Pour qui
- Les visiteurs (clients, recruteurs) : ils découvrent un portfolio sombre, éditorial et haut de gamme, au même niveau que la référence.
- Michaël : il veut un rendu fidèle à la référence, avec ses propres informations.

## Fonctionnalités et expérience

### Langage visuel commun (toutes les pages)
- **Fond** : un noir quasi uni. Le site est une colonne centrée faite de grands panneaux sombres aux coins arrondis, empilés et séparés par de fines marges, comme sur la référence.
  - Le fond animé actuel (réseau de lignes, halos, grille) est retiré.
- **En-tête de chaque page** : un grand panneau photo aux coins arrondis.
  - La photo est plein cadre, en duotone coloré, avec le topbar intégré en haut.
  - En bas à gauche : un petit libellé coloré et un titre géant blanc et gras (« Projets », « À propos », « Contact »…).
  - À droite : une phrase forte et un court texte.
- **Couleurs des panneaux d'en-tête**, comme sur la référence :
  - Accueil : orange ;
  - Projets : bleu-vert et orange ;
  - À propos : violet ;
  - Contact : bleu-vert et orange ;
  - pour les pages absentes de la référence : Compétences en rouge-orangé, Certifications en ambre doré, Coulisses en vert-bleu.
- **Motif de section récurrent** : un petit libellé orange, un grand titre blanc gras à gauche, et à droite une phrase en gras, un petit texte gris et un bouton pill orange.
- **Boutons** : de petits pills arrondis avec une flèche dans un cercle.
  - La version principale est orange avec un cercle blanc.
  - La version du topbar est blanche avec un cercle orange (« Me contacter »).
- **Typographie** : un sans-serif géométrique gras pour tous les titres (Plus Jakarta Sans, déjà présente sur le site) et la même police pour le texte.
  - Les italiques Instrument Serif et la police Archivo sont retirés.
- **Topbar** : il est intégré au panneau d'en-tête, avec le nom de Michaël à gauche, les liens à droite et le pill « Me contacter ».
  - Au scroll, il devient une barre sombre compacte.
  - Il conserve Explorer, le son et le bouton clair/sombre, en petites icônes.
- **Cartes** : elles sont sombres, légèrement plus claires que le fond, avec des coins arrondis.
  - Les cartes de services ont un fin trait orange en haut.
  - La carte mise en avant des offres est entièrement orange.
- **Listes éditoriales** : des lignes séparées par des filets fins, avec une catégorie en orange, le nom en blanc, un court texte gris et l'année à droite (style « Latest Projects » et « Awards »).
- **Animations** : l'image du panneau d'en-tête zoome très lentement pendant que le titre monte à l'entrée.
  - Les sections se révèlent en fondu au scroll.
  - Les images zooment légèrement au survol, et les cartes et boutons se soulèvent.
  - Les logos défilent, et la galerie en éventail s'ouvre.
  - Le mouvement reste sobre.
- **Conservés** : le curseur personnalisé, le défilement Lenis, les sons discrets, l'animation de changement de thème, les transitions entre pages et les textes agrandis et contrastés.

### Accueil
1. **Panneau orange** : « Salut, je suis », le nom en géant, le titre et la proposition de valeur à droite. En bas, une rangée #01, #02, #03 avec les catégories de compétences.
2. **Bandeau des outils** : une légende et le défilé des logos de la Tech Stack.
3. **« Derrière les systèmes »** : le titre et le texte de présentation de l'accueil avec le lien vers À propos, puis une rangée de trois images noir et blanc légendées Automatisation, Intelligence artificielle et Développement.
4. **Galerie en éventail**, centrée : le titre Savoir-faire, son texte et son bouton. Les images des cartes d'expertise en éventail, puis une rangée #01 à #04 avec les étapes de la méthodologie.
5. **« À propos de moi »** : à gauche, le titre et un extrait de la bio avec le bouton « En savoir plus » ; à droite, le vrai portrait de Michaël, en grand et teinté orange.
6. **Workflows et vidéo de présentation** : conservés et remis dans le style.
7. **Offres** : un titre centré et des cartes de prix. La deuxième carte est mise en avant en orange.
8. **Projets récents** : une liste éditoriale des projets, avec un état vide soigné tant qu'il n'y a aucun projet.
9. **Certifications** : sur le modèle « Awards », une grande image à gauche et la liste des certifications à droite (organisme, titre, année).
10. **Coulisses** : un bloc « libellé, titre, texte et bouton » vers la page Coulisses.
11. **FAQ**, puis un **bloc de contact final**.

### Pages intérieures
- **Projets** : un panneau d'en-tête, un bloc d'introduction et une grille 2×2 de cartes avec image, nom, texte et pill « Voir ».
  - La liste éditoriale « Projets récents » suit la grille.
  - Tant que Supabase ne contient aucun projet, un état vide soigné s'affiche.
  - Les filtres actuels sont conservés.
- **À propos** : un panneau violet, puis un bloc « Qui je suis » avec le titre du parcours, la bio et le portrait.
  - Ensuite, une section services « Ce que je peux faire pour vous » en cartes à trait orange, alimentées par les expertises de la page.
  - La timeline du parcours, la citation, la méthodologie et le bloc de clôture sont remis dans le style.
- **Contact** : un panneau d'en-tête, puis à gauche un titre fort avec les moyens de contact, et à droite le formulaire.
  - Le formulaire a des champs sombres arrondis et un bouton orange pleine largeur.
  - Son fonctionnement ne change pas.
- **Compétences** : un panneau d'en-tête, puis chaque catégorie en « libellé et titre », avec ses compétences en cartes à trait orange (logo, niveau, usage, tags).
- **Certifications** : un panneau d'en-tête, puis une présentation « Awards » avec une image et une liste. La fenêtre de détail d'une certification est conservée.
- **Coulisses** : un panneau d'en-tête, puis le journal de fabrication en liste éditoriale numérotée. L'architecture, les flux, les rôles des IA et la stack passent en cartes et listes du même style.

## Parcours utilisateur
1. Le visiteur arrive sur le grand panneau orange : le nom de Michaël, son titre et ses domaines #01 à #03.
2. En descendant, il enchaîne les panneaux sombres : les outils, la présentation, le savoir-faire en éventail, le portrait, les offres, les projets, les certifications et la FAQ.
3. Il ouvre Projets, À propos ou Contact : chaque page s'ouvre sur son propre panneau coloré, avec un titre géant.
4. Il bascule en mode clair : les panneaux d'en-tête gardent leurs couleurs, et le reste passe en clair.
5. Il écrit à Michaël via le formulaire de contact, qui fonctionne comme aujourd'hui.

## Ressenti UI/UX
- Sombre, éditorial, premium et très structuré : de grands titres blancs gras, des petits libellés orange et beaucoup d'espace.
- La couleur vient des photos des panneaux et de l'orange des boutons, pas d'effets de fond.
- Des coins très arrondis, des filets fins, des animations calmes et précises.

## Phases de mise en œuvre
- **Phase 1 (MVP, réalisée maintenant)** : le langage visuel commun, l'accueil complet, et les pages Projets, À propos et Contact, qui ont un modèle direct dans la référence. Les pages Compétences, Certifications et Coulisses reçoivent le panneau d'en-tête et le style commun. Les photos d'ambiance sont générées. Vérification en sombre, en clair et sur mobile.
- **Phase 2** : mise en page détaillée de Compétences, Certifications et Coulisses, remplacement des photos générées par tes vraies photos, et réglages après ton retour.
- **Phase 3** : finitions (performances, accessibilité, réduction des animations), puis envoi sur GitHub via « Save to Github ».

## Hypothèses
- **Photos générées** : une dizaine de photos d'ambiance sont créées pour l'instant.
  - Elles montrent des silhouettes anonymes et des objets, au style cinématographique duotone, sans texte.
  - Elles servent aux panneaux d'en-tête, aux trois images noir et blanc de l'accueil et à l'image des certifications.
  - Elles ne sont jamais présentées comme Michaël ni comme ses projets, et restent faciles à remplacer.
- Le vrai portrait de Michaël est utilisé dans le bloc « À propos de moi » de l'accueil et dans « Qui je suis » de la page À propos.
- Les images déjà présentes dans Supabase (cartes d'expertise) alimentent la galerie en éventail.
- **Mode sombre par défaut, mode clair conservé.** En clair, le fond devient blanc cassé, les panneaux sombres deviennent clairs avec du texte foncé, et les panneaux d'en-tête gardent leurs photos colorées.
- Les sections de la référence sans contenu équivalent chez Michaël (témoignages, articles) ne sont pas ajoutées. Aucune information de la référence n'est reprise : les courts libellés d'interface sont écrits en français pour le site de Michaël.
- Tout ce qui a été ajouté lors de la direction précédente (fond animé, topbar en verre, cartes 3D, hero précédent) est retiré ou remplacé, sauf les textes agrandis et les transitions entre pages.
- Le fichier `AGENTS.md` est mis à jour pour décrire cette nouvelle identité, qui remplace l'ancienne.
- Aucune modification de Supabase, du formulaire de contact ni du chargement des données. Aucune page ou fonctionnalité n'est ajoutée ou supprimée.
