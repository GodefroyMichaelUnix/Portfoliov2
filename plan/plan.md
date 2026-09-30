# Accueil complété, services détaillés, passions en mouvement, Certifications et Coulisses en pleine largeur

Cette évolution restaure deux sections de l'accueil qui ont disparu (la vidéo de présentation et la vitrine « Les coulisses ») et remet en valeur le bandeau des technologies.
Elle ajoute aussi un détail « avant / après » pour chaque service, un défilement de photos de passions, et met Certifications et Coulisses au niveau des pages Services et Compétences.

## Pour qui
- **Les visiteurs (clients, recruteurs)** : ils voient Michaël en vidéo dès le haut de la page et comprennent concrètement ce qu'un service change pour une entreprise.
- **Michaël** : il retrouve les sections qu'il aimait, et il gère les exemples avant/après et ses passions depuis Supabase.

## Fonctionnalités et expérience

### 1. Vidéo de présentation, juste sous l'en-tête
- La section vidéo revient sur l'accueil, placée juste sous l'en-tête photo et avant le bandeau des technologies. Elle garde son lecteur actuel, dans le style pleine largeur.
- **Vidéo provisoire** : tant que Michaël n'a pas fourni sa propre vidéo dans Supabase, une courte vidéo d'ambiance générée est utilisée. Elle dure environ 8 à 12 secondes, sans son, dans le style duotone orange du site, et montre un bureau et des écrans, sans visage.
- Dès que la vidéo de Michaël est renseignée dans Supabase, elle remplace automatiquement la vidéo provisoire.

### 2. Vitrine « Les coulisses » comme avant
- **Reprise de l'ancienne bannière**, adaptée à la pleine largeur :
  - fond sombre et décor de fleurs géométriques ;
  - titre « De l'idée au système. », texte de présentation et logos des outils (Supabase, Netlify, Claude, AI Studio) ;
  - image d'aperçu à droite et bouton « Explorer les coulisses ».
- Elle remplace le bloc texte actuel, à la même place sur l'accueil.

### 3. Bandeau des technologies bien visible
- Les logos défilent à nouveau sur toute la largeur de l'écran. Aujourd'hui, une colonne vide réservée à l'ancienne phrase réduit la zone visible.
- La ligne revient : de fins filets au-dessus et en dessous encadrent le défilé.
- Les logos sont plus lisibles : plus grands, plus contrastés, et ils s'éclairent au survol.

### 4. Services avec exemple avant / après
- Un clic sur un service ouvre une fenêtre de détail :
  - l'icône, le titre et la phrase bénéfice ;
  - un bloc **« Avant »**, qui décrit la situation de départ ;
  - un bloc **« Après »**, qui décrit le résultat obtenu ;
  - un bouton « En parler » vers Contact.
- La fenêtre se ferme avec la croix, la touche Échap ou un clic à l'extérieur. Cela fonctionne sur la page Services comme sur l'aperçu de l'accueil.
- **Contenu** : deux nouveaux champs, « avant » et « après », s'ajoutent à la table `services`. Un script SQL complémentaire les crée et rédige un exemple concret pour chacun des 15 services de départ. Michaël peut ensuite les modifier dans Supabase.
- Un service sans exemple s'ouvre quand même, avec seulement son titre, sa description et le bouton.

### 5. Passions en mouvement sur l'accueil
- L'aperçu « Passions » devient un défilement horizontal, lent et continu, de grandes photos de passions avec leur titre.
- Il ralentit au survol. Il est fixe pour les visiteurs qui réduisent les animations.
- Le bouton « Voir plus » vers la page Passions est conservé, ainsi que l'état vide tant qu'aucune passion n'est saisie.

### 6. Certifications en pleine largeur
- L'en-tête photo reste inchangé.
- **Présentation « Awards »** :
  - une grande image à gauche ;
  - à droite, la liste des certifications (organisme en orange, titre, année), qui s'éclaire au survol.
- Un clic sur une ligne ouvre la fenêtre de détail existante (résumé, compétences, lien de vérification).
- Les cartes apparaissent en cascade. La page se termine par un appel à l'action vers Contact.

### 7. Coulisses en pleine largeur
- **Journal de fabrication** : il devient une liste éditoriale numérotée, avec le numéro, l'icône, le titre et le texte. Il est accompagné d'une ligne de progression qui se dessine au scroll.
- **Architecture** : cartes en grille pleine largeur, avec des pastilles d'outils.
- **Flux réels** : lignes à filets, avec des étapes reliées par des flèches.
- **Rôles des IA et état actuel** : cartes sombres à trait orange.
- **Stack** : pastilles sur toute la largeur, puis un appel à l'action final.
- Le contenu de la page reste le même.

## Parcours utilisateur
1. Le visiteur arrive sur l'en-tête doré, puis voit directement la vidéo de présentation. Juste en dessous, il voit le bandeau de logos, encadré de fins filets.
2. Il ouvre un service, lit l'exemple avant/après, et clique sur « En parler ».
3. Plus bas, il voit défiler les passions de Michaël, puis la bannière « Les coulisses ».
4. Sur Certifications, il parcourt la liste et ouvre le détail d'une certification. Sur Coulisses, il suit le journal qui se dessine au scroll.

## Ressenti UI/UX
- Même identité pleine largeur : fond sombre, grands titres blancs gras, libellés orange, filets fins, pills avec flèche, mode clair disponible.
- La vidéo et la bannière des coulisses apportent de la chaleur et du mouvement. Les fenêtres de service sont sobres, avec un contraste net entre « Avant », en gris, et « Après », en orange.
- Les animations restent calmes : défilement lent, fondus et apparitions en cascade.

## Phases de mise en œuvre
- **Phase 1 (MVP, réalisée maintenant)** : les sept points ci-dessus, avec le script SQL complémentaire pour les champs avant/après, et une vérification en sombre, en clair et sur mobile.
- **Phase 2** : remplacement de la vidéo générée et des photos provisoires par les vraies, et réglages après le retour de Michaël.
- **Phase 3** : finitions (performances, accessibilité), puis envoi sur GitHub via « Save to Github ».

## Hypothèses
- **Vidéo** : elle est placée juste sous l'en-tête, avant les logos, comme dans le message de Michaël. La vidéo générée est un fichier du site, provisoire, et n'est jamais présentée comme Michaël. Si la génération échoue, une image d'ambiance animée la remplace.
- **Vitrine Coulisses** : elle reprend l'ancienne bannière, décor de fleurs compris, comme Michaël l'a validé.
- **Détail des services** : il s'ouvre dans une fenêtre (modale), choisie par défaut faute de réponse.
- **Exemples avant/après** : ils sont rédigés à partir des services de départ, restent génériques mais concrets, et sont modifiables dans Supabase.
- **Défilement des passions** : il est automatique, lent et continu, et ralentit au survol, choisi par défaut faute de réponse.
- **Script SQL** : Michaël doit coller lui-même le script complémentaire dans Supabase. En attendant, les services s'ouvrent sans les blocs avant/après.
- **Aucune autre modification** : pas de changement des autres tables Supabase, du formulaire de contact ni des autres pages.
