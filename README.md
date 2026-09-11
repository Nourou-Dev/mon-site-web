# YK.dev — site vitrine (inspiré de la vidéo, Next.js)

Site vitrine pour développeur web freelance, **inspiré** de l'UI montrée dans
la vidéo (header flottant, hero en dégradé, cartes "espace client", stack
technique en arbre, témoignages en carrousel, FAQ en accordéon, CTA final,
footer avec logo en filigrane) mais avec une identité, un contenu et des
illustrations originaux.

## Démarrer en local

Prérequis : [Node.js](https://nodejs.org) 18.18+ ou 20+.

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Commande        | Description                                  |
|-----------------|-----------------------------------------------|
| `npm run dev`   | Serveur de développement avec rechargement à chaud |
| `npm run build` | Build de production (déjà testé, sans erreur) |
| `npm run start` | Lance le build de production                 |
| `npm run lint`  | Vérifie le code avec ESLint                   |

## Structure du projet

```
app/
  layout.tsx        → layout racine, métadonnées SEO
  page.tsx           → assemble toutes les sections de la page d'accueil
  globals.css         → tokens de design (couleurs, focus, eyebrow badges)
components/
  Navbar.tsx           → header flottant + menu mobile
  Hero.tsx              → bandeau d'accueil en dégradé + mockup code
  ProblemSolution.tsx    → section "constat" + graphique SVG
  ClientSpace.tsx          → grille de 4 fonctionnalités (dashboard, preview, contrat, feedback)
  StatsBar.tsx               → bandeau de chiffres clés
  Services.tsx                 → grille des prestations
  TechStack.tsx                 → diagramme arborescent des technologies
  Testimonials.tsx                → carrousel de témoignages (interactif)
  FAQ.tsx                          → accordéon de questions fréquentes
  BlogTeaser.tsx                    → section "bientôt disponible"
  FinalCTA.tsx                       → appel à l'action final
  Footer.tsx                          → pied de page
  FloatingActions.tsx                 → bouton chat + bouton retour en haut
lib/
  data.ts   → TOUT le contenu texte (nav, services, FAQ, témoignages...)
```

## Personnaliser le contenu

Tout le texte affiché (nom, services, tarifs, FAQ, témoignages, liens de
contact) est centralisé dans **`lib/data.ts`**. Il suffit de modifier ce
fichier — aucun besoin de toucher aux composants pour changer le contenu.

Remplacez notamment :
- `site.name`, `site.brand`, `site.phone`, `site.email`, `site.whatsapp`
- les tableaux `services`, `testimonials`, `faqItems`, `techStack`

## Transformer le site en web app

Le projet est structuré pour évoluer facilement vers une vraie application :

1. **Espace client réel** : remplacez les mockups statiques dans
   `ClientSpace.tsx` par des données live (API, base de données) — le
   dashboard, l'aperçu et le fil de feedback sont déjà découpés en
   composants indépendants.
2. **Authentification** : ajoutez une route `app/(client)/dashboard/page.tsx`
   protégée (ex. avec NextAuth ou Clerk) pour un vrai espace membre.
3. **API** : créez des routes dans `app/api/*/route.ts` (App Router) pour
   gérer devis, contrats, messages — `lib/data.ts` peut alors être
   remplacé par des appels `fetch`/ORM (Prisma, Drizzle...).
4. **Formulaire de contact fonctionnel** : branchez le bouton "Démarrer mon
   projet" sur un service d'e-mail (Resend, SendGrid) ou un formulaire
   Next.js Server Action.
5. **PWA** : ajoutez un `manifest.json` et un service worker
   (`next-pwa` ou l'API native du App Router) pour une installation mobile.

## Accessibilité & qualité

- Navigation clavier avec focus visible (`focus-ring`)
- Lien "Aller au contenu" pour les lecteurs d'écran
- `prefers-reduced-motion` respecté (animations désactivées si demandé)
- Contrastes de texte conformes AA
- 100% responsive (mobile → desktop), testé avec `next build` (0 erreur)

## Notes

- Aucune image ou photo tierce n'est utilisée : le mockup "éditeur de code"
  dans le hero est un composant SVG/HTML original.
- Les icônes proviennent de [lucide-react](https://lucide.dev).
- Couleurs et typographies ont été choisies volontairement différentes de
  la vidéo source pour rester une **inspiration**, pas une copie.
