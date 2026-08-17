import type {
  Bilingual,
  Cuisine,
  IngredientCategory,
  Lang,
  RecipeCategory,
  RecipeTag,
  Unit,
} from "@/lib/types";

/** Langue d'écriture de droite à gauche. */
export function isRTL(lang: Lang): boolean {
  return lang === "ar";
}

export function dir(lang: Lang): "rtl" | "ltr" {
  return isRTL(lang) ? "rtl" : "ltr";
}

/** Choisit la variante linguistique d'un libellé bilingue. */
export function pick(value: Bilingual, lang: Lang): string {
  return value[lang];
}

type Dict = Record<string, Bilingual>;

/** Libellés de l'interface. */
export const UI: Dict = {
  appName: { fr: "Chef Tounsi", ar: "الشاف التونسي" },
  tagline: {
    fr: "Qu'est-ce qu'on mange aujourd'hui ?",
    ar: "شنوّة ناكلو اليوم ؟",
  },

  // Navigation
  navRecipes: { fr: "Recettes", ar: "الوصفات" },
  navWeek: { fr: "La semaine", ar: "الجمعة" },
  navShopping: { fr: "Courses", ar: "القضيان" },
  navPantry: { fr: "Ma cuisine", ar: "مطبخي" },
  navPrices: { fr: "Prix", ar: "الأسعار" },

  // Formulaire
  people: { fr: "Convives", ar: "عدد الناس" },
  budget: { fr: "Budget", ar: "الميزانية" },
  budgetFree: { fr: "Sans limite", ar: "بلا حدّ" },
  time: { fr: "Temps disponible", ar: "الوقت المتوفر" },
  constraints: { fr: "Contraintes", ar: "الشروط" },
  note: { fr: "Une envie particulière ?", ar: "تشتهي حاجة ؟" },
  notePlaceholder: {
    fr: "J'ai des courgettes à finir, quelque chose de léger…",
    ar: "عندي قرعة لازم نكمّلها، حاجة خفيفة…",
  },
  ask: { fr: "Propose-moi un plat", ar: "اقترح عليّ ماكلة" },
  asking: { fr: "L'agent réfléchit…", ar: "الشاف يخمّم…" },
  again: { fr: "Une autre idée", ar: "فكرة أخرى" },
  minutes: { fr: "minutes", ar: "دقيقة" },

  // Suggestion
  todaysMeal: { fr: "Le plat du jour", ar: "ماكلة اليوم" },
  why: { fr: "Pourquoi ce plat", ar: "علاش هالماكلة" },
  adaptations: { fr: "Adaptations conseillées", ar: "تعديلات مقترحة" },
  alternatives: { fr: "Sinon, aussi", ar: "ولا زادة" },
  estimatedCost: { fr: "Coût estimé", ar: "التكلفة التقريبية" },
  startCooking: { fr: "Commencer à cuisiner", ar: "ابدا الطياب" },
  addToShopping: { fr: "Ajouter aux courses", ar: "زيدها للقضيان" },
  added: { fr: "Ajouté aux courses", ar: "تزادت للقضيان" },

  // Recettes
  allRecipes: { fr: "Toutes les recettes", ar: "الوصفات الكل" },
  searchRecipe: { fr: "Chercher un plat…", ar: "لوّج على ماكلة…" },
  ingredients: { fr: "Ingrédients", ar: "المقادير" },
  steps: { fr: "Préparation", ar: "طريقة التحضير" },
  utensils: { fr: "Matériel", ar: "الأدوات" },
  tips: { fr: "Astuces", ar: "نصائح" },
  step: { fr: "Étape", ar: "خطوة" },
  of: { fr: "sur", ar: "من" },
  nextStep: { fr: "Étape suivante", ar: "الخطوة اللي بعد" },
  prevStep: { fr: "Précédent", ar: "اللي قبل" },
  finish: { fr: "Terminé", ar: "كمّلت" },
  finished: { fr: "Bon appétit !", ar: "بالصحة والهنا !" },
  cookingMode: { fr: "Mode cuisine", ar: "وضع الطياب" },
  optional: { fr: "facultatif", ar: "اختياري" },
  noResult: { fr: "Aucun plat ne correspond.", ar: "ما فمّا حتّى ماكلة تجي." },

  // Minuteur
  startTimer: { fr: "Lancer le minuteur", ar: "شغّل المنبّه" },
  timerDone: { fr: "C'est prêt", ar: "حاضر" },

  // Courses
  shoppingList: { fr: "Liste de courses", ar: "قائمة القضيان" },
  emptyShopping: {
    fr: "Votre liste est vide. Ajoutez un plat depuis la page du jour ou les recettes.",
    ar: "القائمة فارغة. زيد ماكلة من صفحة اليوم ولا من الوصفات.",
  },
  total: { fr: "Total", ar: "المجموع" },
  selectedMeals: { fr: "Plats sélectionnés", ar: "الماكلات المختارة" },
  alreadyHave: { fr: "Déjà au placard", ar: "موجود في المونة" },
  clearList: { fr: "Vider la liste", ar: "فرّغ القائمة" },
  removeMeal: { fr: "Retirer ce plat", ar: "نحّي هالماكلة" },

  // Garde-manger
  pantryTitle: { fr: "Mon garde-manger", ar: "المونة متاعي" },
  pantryHelp: {
    fr: "Cochez ce que vous avez déjà : l'agent en tiendra compte et vos courses seront plus courtes.",
    ar: "علّم على اللي عندك، الشاف يحسب حسابو والقضيان تنقص.",
  },
  pantryCount: { fr: "produits cochés", ar: "منتوج معلّم" },
  selectStaples: { fr: "Cocher les produits de base", ar: "علّم على المونة الأساسية" },
  clearPantry: { fr: "Tout décocher", ar: "نحّي الكل" },

  // Semaine
  weekTitle: { fr: "Le menu de la semaine", ar: "منيو الجمعة" },
  weekHelp: {
    fr: "Sept plats différents, choisis selon la saison et ce que vous avez déjà.",
    ar: "سبعة ماكلات مختلفة، حسب الفصل وحسب اللي عندك.",
  },
  generateWeek: { fr: "Composer la semaine", ar: "اعمل منيو الجمعة" },
  addWeekToShopping: { fr: "Tout ajouter aux courses", ar: "زيد الكل للقضيان" },

  // Divers
  seasonNow: { fr: "De saison en ce moment", ar: "في وقتها توّا" },
  sourceGemini: { fr: "Suggestion générée par Gemini", ar: "اقتراح من Gemini" },
  sourceLocal: { fr: "Suggestion du planificateur local", ar: "اقتراح من المخطّط المحلّي" },
  priceNotice: {
    fr: "Prix indicatifs du marché tunisien, en dinars.",
    ar: "أسعار تقريبية من السوق التونسي، بالدينار.",
  },
  // Tableau de bord du garde-manger
  dashboardTitle: { fr: "Ma cuisine", ar: "مطبخي" },
  dashboardIntro: {
    fr: "Dites ce que vous avez, l'agent cherche quoi en faire.",
    ar: "قلّي شنوّة عندك، والشاف يلوّج شنوّة تعمل بيه.",
  },
  inMyPantry: { fr: "Dans mon garde-manger", ar: "في المونة متاعي" },
  addIngredients: { fr: "Ajouter des produits", ar: "زيد منتوجات" },
  emptyPantryTitle: { fr: "Votre garde-manger est vide", ar: "المونة متاعك فارغة" },
  emptyPantryHelp: {
    fr: "Cochez ce que vous avez chez vous : l'agent ne proposera plus que des plats que vous pouvez réellement faire.",
    ar: "علّم على اللي عندك في الدار : الشاف ما يقترحش كان ماكلات تنجّم تعملها بالفعل.",
  },
  cookNow: { fr: "À faire tout de suite", ar: "تنجّم تعملها توّا" },
  cookNowHelp: {
    fr: "Rien à acheter : vous avez tout.",
    ar: "ما تشري والو : عندك الكل.",
  },
  almostThere: { fr: "À deux ou trois courses près", ar: "ينقصك شويّة قضيان" },
  missingLabel: { fr: "Il manque", ar: "ينقص" },
  missingOne: { fr: "1 ingrédient", ar: "مقدار واحد" },
  missingMany: { fr: "ingrédients", ar: "مقادير" },
  checkStaples: { fr: "Vérifiez aussi", ar: "ثبّت زادة في" },
  nothingCookable: {
    fr: "Rien de réalisable pour l'instant. Ajoutez quelques produits.",
    ar: "ما فمّاش شيء تنجّم تعملو توّا. زيد شويّة منتوجات.",
  },
  ofIngredients: { fr: "sur", ar: "من" },
  askFromPantry: { fr: "Que me conseilles-tu ?", ar: "شنوّة تنصحني ؟" },
  refine: { fr: "Affiner", ar: "عدّل" },
  hideRefine: { fr: "Masquer", ar: "خبّي" },
  seeAllRecipes: { fr: "Voir tout le répertoire", ar: "شوف الوصفات الكل" },

  // Prix du marché
  pricesTitle: { fr: "Prix du marché", ar: "أسعار السوق" },
  pricesHelp: {
    fr: "Les prix intégrés sont des ordres de grandeur. Ici, l'agent va chercher sur le web ce que valent réellement les produits en ce moment.",
    ar: "الأسعار اللي في التطبيق تقريبية. هنا الشاف يلوّج في الويب على الأسعار الحقيقية توّا.",
  },
  checkPrices: { fr: "Vérifier les prix", ar: "تثبّت من الأسعار" },
  checking: { fr: "Recherche en cours…", ar: "قاعد يلوّج…" },
  catalogPrice: { fr: "Estimation", ar: "تقدير" },
  webPrice: { fr: "Relevé web", ar: "من الويب" },
  noWebPrice: { fr: "Pas de source", ar: "ما فماش مصدر" },
  sources: { fr: "Sources consultées", ar: "المصادر" },
  lastChecked: { fr: "Vérifié le", ar: "تثبّتنا منها في" },
  checkListPrices: { fr: "Vérifier les prix de ma liste", ar: "تثبّت من أسعار قائمتي" },
  confidenceHigh: { fr: "source claire", ar: "مصدر واضح" },
  confidenceMedium: { fr: "à confirmer", ar: "يتأكّد" },
  confidenceLow: { fr: "peu sûr", ar: "موش مضمون" },
  priceSourceCatalogue: {
    fr: "Estimations intégrées à l'application.",
    ar: "تقديرات من التطبيق.",
  },
  priceSourceWeb: {
    fr: "Prix relevés sur le web, chacun rattaché à sa source.",
    ar: "أسعار من الويب، كل وحدة مع مصدرها.",
  },

  // Recette trouvée sur le web
  discoverTitle: { fr: "Chercher une recette sur le web", ar: "لوّج على وصفة في الويب" },
  discoverHelp: {
    fr: "Un plat qui n'est pas dans le répertoire ? L'agent le cherche sur des sites de cuisine tunisienne et le reconstitue en étapes.",
    ar: "ماكلة موش موجودة في القائمة ؟ الشاف يلوّج عليها في مواقع الطبخ التونسي ويرتّبها خطوة بخطوة.",
  },
  discoverPlaceholder: { fr: "kaak warka, bambalouni, chorba bel hout…", ar: "كعك ورقة، بمبالوني، شربة بالحوت…" },
  discoverButton: { fr: "Chercher sur le web", ar: "لوّج في الويب" },
  discovering: { fr: "L'agent parcourt le web…", ar: "الشاف قاعد يقلّب في الويب…" },
  fromWeb: { fr: "Trouvée sur le web", ar: "ملقية في الويب" },
  webRecipeWarning: {
    fr: "Recette reconstituée à partir de sources web : vérifiez les quantités avant de vous lancer.",
    ar: "الوصفة معمولة من مصادر ويب : ثبّت في المقادير قبل ما تبدا.",
  },
  sourcesUsed: { fr: "D'après ces sources", ar: "حسب هالمصادر" },
  webContext: { fr: "Contexte web consulté", ar: "معلومات من الويب" },
  discoverNotFound: {
    fr: "Rien trouvé pour cette recherche. Essayez le nom tunisien du plat.",
    ar: "ما لقينا شيء. جرّب الاسم التونسي متاع الماكلة.",
  },
  searchWebInstead: { fr: "Chercher ce plat sur le web", ar: "لوّج على هالماكلة في الويب" },
  pricedFromCatalogue: {
    fr: "des ingrédients sont chiffrés — le coût est donc partiel",
    ar: "من المقادير عندها سوم — التكلفة ناقصة",
  },

  error: { fr: "Quelque chose n'a pas fonctionné.", ar: "فمّا حاجة ما مشاتش." },
  retry: { fr: "Réessayer", ar: "عاود" },
  allCuisines: { fr: "Toutes les cuisines", ar: "المطابخ الكل" },
  themeToDark: { fr: "Passer au thème sombre", ar: "بدّل للثيم المظلم" },
  themeToLight: { fr: "Passer au thème clair", ar: "بدّل للثيم الفاتح" },
  difficulty1: { fr: "Facile", ar: "ساهل" },
  difficulty2: { fr: "Moyen", ar: "متوسّط" },
  difficulty3: { fr: "Technique", ar: "يحب خبرة" },
};

/** Raccourci de traduction. */
export function t(key: keyof typeof UI, lang: Lang): string {
  return UI[key]?.[lang] ?? String(key);
}

export const CUISINE_LABELS: Record<Cuisine, Bilingual> = {
  tunisienne: { fr: "Tunisienne", ar: "تونسية" },
  italienne: { fr: "Italienne", ar: "إيطالية" },
};

export const CATEGORY_LABELS: Record<RecipeCategory, Bilingual> = {
  plat: { fr: "Plat", ar: "طبق رئيسي" },
  soupe: { fr: "Soupe", ar: "شربة" },
  salade: { fr: "Salade", ar: "سلاطة" },
  entree: { fr: "Entrée", ar: "مقبّلات" },
  petit_dejeuner: { fr: "Petit-déjeuner", ar: "فطور الصباح" },
  dessert: { fr: "Dessert", ar: "حلو" },
};

export const TAG_LABELS: Record<RecipeTag, Bilingual> = {
  rapide: { fr: "Rapide", ar: "سريعة" },
  economique: { fr: "Économique", ar: "رخيصة" },
  vegetarien: { fr: "Végétarien", ar: "نباتية" },
  plat_unique: { fr: "Plat unique", ar: "ماكلة كاملة" },
  ramadan: { fr: "Ramadan", ar: "رمضان" },
  invites: { fr: "Pour recevoir", ar: "للضياف" },
  enfants: { fr: "Les enfants aiment", ar: "الصغار يحبّوها" },
  sans_gluten: { fr: "Sans gluten", ar: "بلا غلوتان" },
  batch: { fr: "Se garde", ar: "تتخزن" },
};

export const INGREDIENT_CATEGORY_LABELS: Record<IngredientCategory, Bilingual> = {
  legume: { fr: "Légumes", ar: "خضرة" },
  fruit: { fr: "Fruits", ar: "غلّة" },
  herbe: { fr: "Herbes", ar: "أعشاب" },
  viande: { fr: "Viandes", ar: "لحوم" },
  poisson: { fr: "Poissons", ar: "حوت" },
  cremerie: { fr: "Crèmerie", ar: "مشتقات الحليب" },
  epice: { fr: "Épices", ar: "توابل" },
  cereale: { fr: "Céréales", ar: "حبوب" },
  legumineuse: { fr: "Légumes secs", ar: "قطاني" },
  epicerie: { fr: "Épicerie", ar: "مواد غذائية" },
  boulangerie: { fr: "Boulangerie", ar: "مخبوزات" },
};

/** Abréviations d'unités, telles qu'on les écrit sur une liste de courses. */
export const UNIT_LABELS: Record<Unit, Bilingual> = {
  g: { fr: "g", ar: "غ" },
  kg: { fr: "kg", ar: "كغ" },
  ml: { fr: "ml", ar: "مل" },
  l: { fr: "l", ar: "ل" },
  piece: { fr: "", ar: "" },
  botte: { fr: "botte", ar: "حزمة" },
  cas: { fr: "c. à soupe", ar: "مغرفة" },
  cac: { fr: "c. à café", ar: "ملعقة" },
  pincee: { fr: "pincée", ar: "رشّة" },
  gousse: { fr: "gousse", ar: "سنّ" },
  boite: { fr: "boîte", ar: "علبة" },
  feuille: { fr: "feuille", ar: "ورقة" },
  verre: { fr: "verre", ar: "كاس" },
};

/** Met en forme une quantité : « 250 g », « 2 gousses », « 3 ». */
export function formatQty(qty: number, unit: Unit, lang: Lang): string {
  const rounded = Number.isInteger(qty) ? String(qty) : qty.toFixed(1).replace(/\.0$/, "");
  const label = UNIT_LABELS[unit][lang];
  if (!label) return rounded;

  // Le français accorde les unités écrites en toutes lettres.
  if (lang === "fr" && qty > 1 && ["botte", "gousse", "boîte", "feuille", "verre", "pincée"].includes(label)) {
    return `${rounded} ${label}s`;
  }
  return `${rounded} ${label}`;
}

const MONTH_NAMES: Bilingual[] = [
  { fr: "janvier", ar: "جانفي" },
  { fr: "février", ar: "فيفري" },
  { fr: "mars", ar: "مارس" },
  { fr: "avril", ar: "أفريل" },
  { fr: "mai", ar: "ماي" },
  { fr: "juin", ar: "جوان" },
  { fr: "juillet", ar: "جويلية" },
  { fr: "août", ar: "أوت" },
  { fr: "septembre", ar: "سبتمبر" },
  { fr: "octobre", ar: "أكتوبر" },
  { fr: "novembre", ar: "نوفمبر" },
  { fr: "décembre", ar: "ديسمبر" },
];

/** Nom du mois (1–12) — les noms français employés en Tunisie. */
export function monthName(month: number, lang: Lang): string {
  return MONTH_NAMES[Math.min(11, Math.max(0, month - 1))][lang];
}

const WEEKDAYS: Bilingual[] = [
  { fr: "Lundi", ar: "الإثنين" },
  { fr: "Mardi", ar: "الثلاثاء" },
  { fr: "Mercredi", ar: "الأربعاء" },
  { fr: "Jeudi", ar: "الخميس" },
  { fr: "Vendredi", ar: "الجمعة" },
  { fr: "Samedi", ar: "السبت" },
  { fr: "Dimanche", ar: "الأحد" },
];

export function weekdayName(index: number, lang: Lang): string {
  return WEEKDAYS[index % 7][lang];
}

/** Icône de saison correspondant au mois. */
export function seasonIcon(month: number): "spring" | "summer" | "autumn" | "winter" {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}
