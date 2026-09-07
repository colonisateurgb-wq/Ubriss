# UBriss

Plateforme de croissance virale et d'automatisation de contenu pour créateurs
et commerces d'Afrique francophone (Cameroun). Générateur de scripts viraux,
planificateur multi-plateformes, abonnement en Mobile Money via Notch Pay.

Construit avec Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase et
Notch Pay. Le projet tourne **immédiatement en mode démo** (aucune clé API
requise) : génération de scripts et paiements sont simulés.

---

## 1. Lancer le projet en local (optionnel, pour vérifier avant de déployer)

Il te faut [Node.js 20+](https://nodejs.org) installé sur ton ordinateur.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvre `http://localhost:3000`. Le générateur et les paiements fonctionnent
tout de suite en mode démo (`NOTCHPAY_MODE=mock`, `OPENAI_MODE=mock`).

---

## 2. Déployer sur Netlify (gratuit)

### Étape 1 — Mets le code sur GitHub

Netlify déploie depuis un dépôt Git. Si ton code n'est pas encore sur GitHub :

1. Crée un compte sur [github.com](https://github.com) si tu n'en as pas.
2. Crée un nouveau dépôt (bouton **New repository**), nomme-le `ubriss`,
   laisse-le vide (sans README).
3. Depuis le dossier du projet sur ton ordinateur :

```bash
git init
git add .
git commit -m "Premier commit UBriss"
git branch -M main
git remote add origin https://github.com/TON_PSEUDO/ubriss.git
git push -u origin main
```

### Étape 2 — Connecte Netlify à GitHub

1. Va sur [app.netlify.com](https://app.netlify.com) et crée un compte
   (inscription gratuite avec GitHub, Google ou email).
2. Clique sur **Add new site** → **Import an existing project**.
3. Choisis **GitHub** et autorise Netlify à accéder à tes dépôts.
4. Sélectionne le dépôt `ubriss`.

### Étape 3 — Vérifie les réglages de build

Netlify détecte automatiquement Next.js grâce au fichier `netlify.toml`
déjà présent dans le projet. Tu devrais voir :

- **Build command** : `npm run build`
- **Publish directory** : `.next`

Ne change rien, clique sur **Deploy site**.

### Étape 4 — Ajoute les variables d'environnement

Avant ou juste après le premier déploiement : va dans
**Site configuration → Environment variables** et ajoute au minimum :

```
NOTCHPAY_MODE=mock
OPENAI_MODE=mock
```

Cela suffit pour que le site fonctionne en ligne exactement comme en local,
avec génération de scripts et paiements simulés — idéal pour montrer le
produit avant de brancher les vrais services.

Quand tu seras prêt à passer en production réelle, ajoute aussi :

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NOTCHPAY_MODE=live
NOTCHPAY_PUBLIC_KEY=...
NOTCHPAY_SECRET_KEY=...
OPENAI_MODE=live
OPENAI_API_KEY=...
```

puis redéploie (**Deploys → Trigger deploy**).

### Étape 5 — C'est en ligne

Netlify te donne une URL du type `https://ubriss-xxxx.netlify.app`. Tu peux
la renommer dans **Site configuration → Domain management → Options →
Edit site name**, ou brancher un nom de domaine que tu possèdes déjà dans
la même section (gratuit aussi, tu payes juste le nom de domaine ailleurs
si tu n'en as pas encore).

Chaque `git push` sur `main` redéploie automatiquement le site.

---

## 3. Alternative rapide sans GitHub (pour une démo ponctuelle)

Si tu veux juste montrer le résultat sans passer par Git :

1. En local : `npm run build`
2. Va sur [app.netlify.com/drop](https://app.netlify.com/drop)
3. Glisse le dossier `.next` généré dans la zone de dépôt

Attention : cette méthode ne redéploie pas automatiquement et les routes
API (`/api/...`) nécessitent en général le passage par GitHub + le plugin
Next.js pour fonctionner correctement sur Netlify. Pour un vrai site
utilisable, privilégie la méthode GitHub ci-dessus.

---

## 4. Ce qui est réel vs simulé actuellement

| Fonctionnalité | État |
|---|---|
| Interface (landing, dashboard, générateur, planificateur) | Réelle, prête à l'emploi |
| Génération de scripts | Templates simulés par défaut ; bascule vers GPT-4o-mini réel en passant `OPENAI_MODE=live` + clé API |
| Paiement Mobile Money | Simulé par défaut (`/mock-checkout`) ; bascule vers Notch Pay réel en passant `NOTCHPAY_MODE=live` + clés |
| Authentification | Formulaire présent, pas encore branché à Supabase (utilisateur fictif utilisé partout) |
| Sauvegarde des scripts / posts programmés | Stockage en mémoire (perdu au rechargement) ; le schéma SQL Supabase est prêt dans `lib/supabase.ts`, à exécuter puis brancher dans les routes API |

---

## 5. Prochaines étapes techniques suggérées

1. Créer un projet sur [supabase.com](https://supabase.com), exécuter le
   schéma SQL présent en commentaire dans `lib/supabase.ts`.
2. Brancher l'authentification réelle dans `app/(auth)/login/page.tsx`.
3. Remplacer `MOCK_USER` (`data/mock-user.ts`) par la session Supabase dans
   `app/dashboard/layout.tsx`.
4. Créer un compte marchand sur [notchpay.co](https://notchpay.co) pour
   obtenir les vraies clés MTN MoMo / Orange Money.
5. Ajouter une vraie clé OpenAI si tu veux des scripts générés dynamiquement
   plutôt que les templates.
