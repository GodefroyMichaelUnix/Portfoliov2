# Directives de Développement & Préservation du Design

## ⚠️ Règle Absolue : Préservation du Design
L'identité visuelle et l'expérience utilisateur de ce portfolio sont hautement soignées et doivent être **strictement préservées** lors de chaque intervention :
- **Typographie** : Conserver la hiérarchie et les polices spécifiques (Archivo pour les titres forts, Instrument Serif pour les accents éditoriaux, Plus Jakarta Sans pour la lecture, JetBrains Mono pour les données techniques).
- **Palette & Contrastes** : Respecter le thème clair/sombre, les nuances précises de zinc/fond (`#F6F7F9` et dark mode), les micro-animations et les bordures subtiles.
- **Composants & Animations** : Ne jamais supprimer ni dénaturer les composants interactifs (`Hero`, `AutomationBackground`, `CustomCursor`, `BootLoader`, `EditorialMarquee`, `WorkflowDiagram`, `MagneticWrapper`, etc.).
- **Interactions sonores & Lenis** : Conserver le lissage de défilement (Lenis) et l'environnement sonore discret (SoundContext).
- **Architecture** : Application SPA React 19 + Tailwind CSS + Vite servie sur le port 3000.
