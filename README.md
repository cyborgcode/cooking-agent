# Chef Tounsi — الشاف التونسي

Agent de cuisine pour le quotidien tunisien. Il répond à une seule question,
tous les jours : **qu'est-ce qu'on mange aujourd'hui ?** — puis il accompagne
le repas jusqu'au bout : les étapes, les minuteurs, la liste de courses par
commerce et le budget en dinars.

Interface bilingue **français / arabe tunisien (derja)**, avec bascule
droite-à-gauche complète. Aucun emoji dans l'interface : toutes les icônes
sont des pictogrammes vectoriels (lucide).

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

### La clé Gemini est facultative

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

## Architecture

```
app/
  page.tsx                  Le plat du jour
  recettes/                 Catalogue + fiche et mode cuisine
  semaine/  courses/  garde-manger/
  api/agent/                Suggestion du jour (Gemini → local)
  api/semaine/              Menu de la semaine (local)
  api/courses/              Liste de courses consolidée

lib/
  types.ts                  Modèle de domaine, libellés bilingues
  data/ingredients.ts       Catalogue du marché tunisien
  data/recipes.ts           Les 20 recettes, étapes bilingues
  data/shops.ts             Les commerces et leur ordre de visite
  pricing.ts                Conversion d'unités, coûts, fusion des listes
  planner.ts                Score déterministe, adaptations, menu semaine
  gemini.ts                 Appel du modèle + repli local
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

## Vérifications

```bash
npm run build     # compilation + types + prérendu des 20 fiches
npx tsc --noEmit  # types seuls
npx eslint .      # qualité
```

## Prix

Les prix sont des ordres de grandeur relevés sur les marchés de quartier et
servent à estimer un repas, pas à tenir une comptabilité. Ils sont regroupés
dans `lib/data/ingredients.ts` et se corrigent en un seul endroit.
