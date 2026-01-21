# AVA Bijoux - Plateforme E-commerce

Plateforme e-commerce multi-sites pour la vente de bijoux personnalisés (gravure prénom) via un réseau de 450 salons partenaires.

## 🚀 Démarrage rapide

### 1. Cloner et installer

```bash
git clone <votre-repo>
cd ava-bijoux
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Puis remplissez les valeurs dans `.env.local` (voir section "Services externes" ci-dessous).

### 3. Initialiser la base de données

```bash
npx prisma generate
npx prisma db push
```

### 4. Lancer en développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## 📦 Services externes à configurer

### Stripe (Paiement)

1. Créer un compte sur [stripe.com](https://stripe.com)
2. Aller dans Dashboard > Developers > API keys
3. Copier les clés dans `.env.local` :
   - `STRIPE_SECRET_KEY` (commence par `sk_test_`)
   - `STRIPE_PUBLISHABLE_KEY` (commence par `pk_test_`)

### Resend (Emails)

1. Créer un compte sur [resend.com](https://resend.com)
2. Créer une API Key
3. Ajouter dans `.env.local` :
   - `RESEND_API_KEY` (commence par `re_`)

### Mondial Relay (Livraison)

1. Contacter Mondial Relay pour obtenir les accès API
2. Ajouter les identifiants dans `.env.local`

### Base de données PostgreSQL

Options recommandées :
- **Vercel Postgres** : Gratuit pour commencer, intégré à Vercel
- **Supabase** : Gratuit, excellent dashboard
- **Railway** : Simple, auto-scaling

---

## 🏗️ Structure du projet

```
ava-bijoux/
├── prisma/
│   └── schema.prisma      # Schéma de la base de données
├── src/
│   ├── app/               # Pages Next.js (App Router)
│   │   ├── page.tsx       # Page d'accueil
│   │   ├── panier/        # Page panier
│   │   ├── checkout/      # Tunnel de commande
│   │   ├── s/[salonCode]/ # Mini-sites salons
│   │   ├── salon/         # Espace salon partenaire
│   │   └── admin/         # Back-office admin
│   ├── components/        # Composants React
│   │   ├── ui/            # Composants UI (Button, Input, Logo...)
│   │   ├── layout/        # Header, Footer
│   │   └── products/      # Cartes produits, personnaliseur
│   └── lib/               # Utilitaires
│       ├── store/         # State management (Zustand)
│       └── data/          # Données mock pour développement
├── public/                # Assets statiques
│   └── images/            # Images produits, logos
└── tailwind.config.ts     # Configuration Tailwind avec couleurs AVA
```

---

## 🎨 Charte graphique AVA

### Couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| Crème | `#FDFFEB` | Fond principal |
| Doré | `#FFEEC2` | Accents, boutons secondaires |
| Pêche | `#FFD7A1` | Éléments d'accentuation |
| Corail | `#FFBB90` | Call-to-action, boutons principaux |
| Anthracite | `#454545` | Textes, éléments sombres |

### Typographies

- **Titres** : Raleway (36-48pt)
- **Sous-titres** : Lato Regular (24-30pt)
- **Corps** : Quicksand Book (12-14pt)

---

## 🔗 URLs du projet

- **Mini-site salon** : `/s/CODE_SALON` (ex: `/s/HAIR75001`)
- **Espace salon** : `/salon`
- **Back-office admin** : `/admin`

---

## 📋 Fonctionnalités

### ✅ Implémenté
- [x] Structure multi-sites avec URLs uniques
- [x] Catalogue produits
- [x] Personnalisation texte + choix police
- [x] Prévisualisation mockup 2D temps réel
- [x] Panier avec options de livraison
- [x] Tunnel de commande (formulaire)
- [x] Charte graphique AVA complète
- [x] Design responsive mobile-first

### 🔄 À compléter (avec vos clés API)
- [ ] Intégration Stripe (paiement)
- [ ] Intégration Resend (emails)
- [ ] Intégration Mondial Relay
- [ ] Espace salon (Magic Link)
- [ ] Back-office admin complet
- [ ] Import CSV salons

---

## 🚀 Déploiement sur Vercel

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Connecter votre repository GitHub
3. Ajouter les variables d'environnement dans Vercel
4. Dans Hostinger, configurer le DNS :
   - Ajouter un CNAME `@` vers `cname.vercel-dns.com`
   - Ou utiliser les serveurs DNS de Vercel

---

## 📞 Support

Projet développé pour AVA / Dépôts Gemmes.
