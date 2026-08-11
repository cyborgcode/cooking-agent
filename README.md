# Chef Tounsi — الشاف التونسي

Agent de cuisine pour le quotidien tunisien. Il répond à une seule question,
tous les jours : **qu'est-ce qu'on mange aujourd'hui ?** — puis il accompagne
le repas jusqu'au bout : les étapes, les minuteurs, la liste de courses par
commerce et le budget en dinars.

Interface bilingue **français / arabe tunisien (derja)**, avec bascule
droite-à-gauche complète. Aucun emoji dans l'interface : toutes les icônes
sont des pictogrammes vectoriels (lucide).

Thème clair ou sombre : par défaut l'application suit le réglage du système —
le bon comportement pour une application qu'on ouvre le soir dans une
cuisine — et le bouton de l'en-tête permet de forcer l'un ou l'autre. Le
choix est mémorisé et appliqué avant le premier rendu, sans clignotement.

## Ce que fait l'agent

- **Le plat du jour** — vous indiquez le nombre de convives, le budget, le
  temps disponible et vos contraintes (rapide, végétarien, Ramadan, pour
  recevoir…). L'agent propose un plat, explique son choix, et adapte la
  recette à la saison et à votre garde-manger.
- **Mode cuisine pas à pas** — une étape à la fois, en gros caractères, avec
  un minuteur par étape de cuisson et les astuces au bon moment.
- **Liste de courses par commerce** — organisée dans l'ordre du parcours
  réel : marché, boucherie, poissonnerie, attar, boulangerie, grande surface.
  Chaque ligne est chiffrée, avec un sous-total par commerce.
- **Garde-manger** — ce que vous cochez sort des courses et pèse dans le
  choix du plat.
- **Menu de la semaine** — sept plats variés, sans répétition, de saison.
- **Prix du marché en direct** — l'agent va chercher sur le web ce que valent
  réellement les produits en ce moment, et affiche l'écart avec l'estimation
  intégrée, chaque chiffre rattaché à sa source et à sa date.
- **Recettes trouvées sur le web** — un plat absent du répertoire est cherché
  sur des sites de cuisine, reconstitué en étapes bilingues et cuisiné dans le
  même mode pas-à-pas, avec ses sources affichées.

## Adaptation au marché tunisien

- **88 ingrédients** avec leur nom français *et* le nom employé au marché
  (سفنارية, قرعة حمراء, ملسوقة, تابل…).
- **Prix indicatifs en dinars**, produits subventionnés signalés (pain,
  semoule, huile végétale, sucre, lait).
- **Calendrier de saison tunisien** : l'agent ne propose pas de marqa de
  petits pois en septembre, et privilégie ce qui est abondant et bon marché.
- **Commerces réels** : l'attar pour les épices et les légumes secs, la
  boucherie pour l'agneau, la grande surface pour les conserves.
- **20 recettes du quotidien**, des plus rapides aux plus longues :
  couscous à l'agneau et au poisson, mloukhia, ojja, kafteji, tastira,
  slata mechouia, chorba frik, lablabi, makrouna bel salsa, brik à l'œuf,
  marqa hlowa, mermez, riz djerbien, chakchouka, kamounia, omek houria,
  masfouf, marqa de petits pois, salade tunisienne.

## Démarrer

```bash
npm install
cp .env.example .env.local   # facultatif : voir ci-dessous
npm run dev
```

L'application tourne sur http://localhost:3000.

### Les deux clés sont facultatives

Avec `GEMINI_API_KEY` renseignée, c'est **Gemini** qui choisit le plat parmi
les candidats présélectionnés et rédige la justification en français et en
derja.

Sans clé — ou si l'appel échoue, expire ou renvoie une réponse inexploitable —
l'application bascule automatiquement sur le **planificateur local**, un
score déterministe qui tient compte de la saison, du budget, du temps et du
garde-manger. L'interface indique toujours l'origine de la suggestion.
L'application n'est donc jamais bloquée par le réseau.

Dans les deux cas, **les chiffres ne viennent jamais du modèle** : coûts,
quantités et listes de courses sont recalculés localement à partir du
catalogue. Le modèle choisit et explique ; il ne compte pas.

#### La recherche web (Tavily)

`TAVILY_API_KEY` active trois choses : les prix du marché en direct, les
recettes cherchées sur le web, et un court contexte sur l'état du marché
transmis à Gemini avant qu'il ne choisisse le plat du jour. L'hôte
`api.tavily.com` doit être joignable depuis le serveur.

Chaque fonction se dégrade seule, sans jamais casser la page :

| | sans Tavily | Tavily seul | Tavily + Gemini |
|---|---|---|---|
| Prix du marché | estimations intégrées | estimations + sources à consulter | prix relevés, datés et attribués |
| Recette du web | fonction annoncée comme inactive | pages trouvées, mise en recette impossible | recette complète en français et en derja |
| Plat du jour | planificateur local | planificateur local | suggestion située dans le marché du moment |

**Le contenu web est traité comme une donnée, jamais comme une consigne.**
Les extraits sont encadrés dans les prompts et accompagnés d'une instruction
explicite de les ignorer s'ils contiennent des ordres. Le modèle ne peut de
toute façon renvoyer qu'un plat de la liste fournie, revalidé à la réception,
et les prix extraits sont bornés et rattachés à une source réellement
présente dans les extraits — sans quoi ils sont écartés.

## Architecture

```
app/
  page.tsx                  Le plat du jour
  recettes/                 Catalogue + fiche et mode cuisine
  semaine/  courses/  garde-manger/
  api/agent/                Suggestion du jour (Gemini → local)
  api/semaine/              Menu de la semaine (local)
  api/courses/              Liste de courses consolidée
  api/prix/                 Relevé des prix du marché (web)
  api/decouvrir/            Recherche d'une recette sur le web
  prix/                     Prix du marché
  recettes/decouvrir/       Recette trouvée sur le web

lib/
  types.ts                  Modèle de domaine, libellés bilingues
  data/ingredients.ts       Catalogue du marché tunisien
  data/recipes.ts           Les 20 recettes, étapes bilingues
  data/shops.ts             Les commerces et leur ordre de visite
  pricing.ts                Conversion d'unités, coûts, fusion des listes
  planner.ts                Score déterministe, adaptations, menu semaine
  gemini.ts                 Appel du modèle + repli local
  tavily.ts                 Client de recherche web (cache, délais, repli)
  market-prices.ts          Prix relevés sur le web et attribués
  discover.ts               Mise en recette d'un plat trouvé sur le web
  i18n.ts                   Dictionnaire FR/AR, unités, mois, jours
  scale.ts                  Mise à l'échelle et formats (sans données)
  view.ts                   Modèles de vue + validation des requêtes

components/
  icons.tsx                 Registre d'icônes — le seul endroit qui en définit
  ...
```

Le catalogue complet reste côté serveur : les composants client ne reçoivent
que des modèles de vue allégés.

### Les icônes

Toute icône affichée passe par `components/icons.tsx`, qui associe un nom
métier (`market`, `harissa`, `ramadan`, `timer`…) à un composant lucide.
Pour changer un pictogramme, on modifie une ligne de ce registre — et rien
d'autre dans l'application.

## Déploiement sur Vercel

Le projet est un Next.js standard : Vercel le détecte seul, aucune
configuration ni `vercel.json` n'est nécessaire.

1. Sur [vercel.com/new](https://vercel.com/new), importer le dépôt
   `cyborgcode/cooking-agent`.
2. Laisser les réglages par défaut (framework Next.js, `npm install`,
   `next build`). La seule branche du dépôt est
   `claude/tunisian-cooking-agent-9lrn95` : elle sert donc de branche de
   production.
3. Déployer.

L'application se construit et fonctionne **sans aucune variable
d'environnement** : elle démarre sur le planificateur local et le catalogue
de prix intégré. Pour activer le modèle et la recherche web, ajouter ensuite
dans *Settings → Environment Variables* :

| Variable | Effet si absente |
|---|---|
| `GEMINI_API_KEY` | Le plat du jour vient du planificateur local ; pas de recette reconstituée depuis le web. |
| `TAVILY_API_KEY` | Pas de prix relevés sur le web ni de recherche de recette ; le reste est intact. |
| `GEMINI_MODEL` | `gemini-2.5-flash`. |
| `TAVILY_API_URL` | `https://api.tavily.com/search`. |

L'hôte `api.tavily.com` doit être joignable depuis les fonctions Vercel, ce
qui est le cas par défaut.

Une fois le dépôt lié, chaque `git push` redéploie automatiquement, et
chaque pull request obtient sa propre URL de prévisualisation.

## Vérifications

```bash
npm run build     # compilation + types + prérendu des 20 fiches
npx next typegen  # types de routes — à lancer avant `tsc` sur un dépôt frais
npx tsc --noEmit  # types seuls
npx eslint .      # qualité
```

`PageProps` est généré par Next à partir de l'arborescence des routes :
sur une copie fraîche, lancez `next typegen` (ou un `next build`) avant
`tsc --noEmit`, sinon les pages à paramètre ne compilent pas.

## Prix

Les prix sont des ordres de grandeur relevés sur les marchés de quartier et
servent à estimer un repas, pas à tenir une comptabilité. Ils sont regroupés
dans `lib/data/ingredients.ts` et se corrigent en un seul endroit.
