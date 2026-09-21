# Michael Godefroy — Portfolio AI Automation Engineer

Portfolio professionnel de Michael Godefroy, AI Automation Engineer & IT Automation. Conception de systèmes d'automatisation résilients, intégrations d'APIs et agents IA orientés résultats.

---

## Stack technique

- **React** (v19)
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Motion**
- **React Router**
- **Supabase** (Database & Client SDK)
- **Supabase Edge Functions** (Deno runtime)
- **Resend** (API d'envoi transactionnel d'emails)
- **Netlify** (Hébergement & déploiement continu du frontend)

---

## Architecture

```text
GitHub
  ↓
React/Vite frontend
  ↓
Netlify

Frontend
  ↓
Supabase
  ↓
Portfolio data

Contact form
  ↓
Supabase Edge Function
  ↓
Resend
  ↓
michael@mgodefroy.com
```

### Données dynamiques
L'ensemble des données dynamiques du portfolio (profil, projets, compétences, certifications, offres tarifaires, FAQ, scénarios de workflow) est centralisé et stocké dans **Supabase**. Le frontend interroge directement Supabase via son client TypeScript avec accès public sécurisé (Row Level Security).

### Formulaire de contact & notifications
L'envoi des messages du formulaire de contact est entièrement orchestré côté serveur par une **Supabase Edge Function** (`send-contact-message`) :
1. Validation stricte et nettoyage des données reçues (`POST`).
2. Détection de spam via piège invisible (honeypot).
3. Enregistrement sécurisé du message dans la table `public.contact_messages`.
4. Envoi d'une notification par email à `michael@mgodefroy.com` via l'API **Resend**, avec le champ `reply_to` configuré sur l'adresse du visiteur pour une réponse directe.

---

## Commandes de développement

### 1. Installation des dépendances
```bash
npm install
```

### 2. Démarrage du serveur de développement
```bash
npm run dev
```

### 3. Vérification des types
```bash
npm run lint
```

### 4. Build de production (Vite)
```bash
npm run build
```
