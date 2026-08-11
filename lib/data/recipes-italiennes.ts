import type { Recipe } from "@/lib/types";

/**
 * Cuisine italienne, cuisinée en Tunisie.
 *
 * La présence italienne — surtout sicilienne — a laissé sa marque sur la
 * table tunisienne : les pâtes sont un produit de base subventionné et la
 * makrouna bel salsa est déjà une cousine du ragù. Ces recettes-ci sont donc
 * choisies pour une cuisine tunisienne réelle, pas pour un rayon d'épicerie
 * fine.
 *
 * Trois principes ont guidé la sélection :
 *
 *  1. **Rien de porcin.** Le guanciale et la pancetta sont remplacés par de
 *     la dinde fumée, qui se trouve chez tous les bouchers. La carbonara
 *     ci-dessous est annoncée comme une adaptation, pas comme l'originale.
 *  2. **Pas d'alcool.** Ni vin blanc dans le risotto, ni marsala dans le
 *     tiramisu : ces recettes s'en passent sans rien perdre, et la
 *     substitution est expliquée là où elle compte.
 *  3. **Des produits du marché.** Aubergines, sardines, fenouil, câpres,
 *     olives, pignons, ricotta : tout vient du marché ou de l'attar. Les
 *     rares produits importés (mozzarella, parmesan) ont un remplaçant local
 *     indiqué dans le catalogue.
 */
export const RECIPES_ITALIENNES: Recipe[] = [
  // ------------------------------------------------------------------ 1
  {
    slug: "spaghetti-aglio-olio",
    name: { fr: "Spaghetti à l'ail et à l'huile", ar: "سباغيتي بالثوم والزيت" },
    description: {
      fr: "Cinq ingrédients, tous déjà au placard. Le plat qu'on fait à 22 h quand il n'y a plus rien dans le frigo, et qui reste meilleur que la plupart des autres.",
      ar: "خمس مقادير، الكل موجود في المونة. الماكلة اللي تتعمل في العشرة بالليل كي ما يبقى شيء في الفريجيدار.",
    },
    region: { fr: "Naples", ar: "نابولي" },
    cuisine: "italienne",
    category: "plat",
    serves: 2,
    prepMinutes: 5,
    cookMinutes: 15,
    difficulty: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["rapide", "economique", "vegetarien"],
    ingredients: [
      { id: "spaghetti", qty: 250, unit: "g" },
      { id: "ail", qty: 6, unit: "gousse", note: { fr: "en fines lamelles", ar: "مقطّع رقيق" } },
      { id: "huile_olive", qty: 6, unit: "cas" },
      { id: "piment_fort", qty: 1, unit: "piece" },
      { id: "persil", qty: 1, unit: "botte" },
      { id: "sel", qty: 1, unit: "cas", note: { fr: "pour l'eau des pâtes", ar: "لماء المقرونة" } },
    ],
    steps: [
      {
        text: {
          fr: "Porter une grande casserole d'eau à ébullition et la saler franchement : c'est le seul moment où les pâtes prennent du sel.",
          ar: "خلّي طنجرة ماء كبيرة تغلي وملّحها مليح : هاذي الفرصة الوحيدة باش تاخذ المقرونة الملح.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Pendant ce temps, faire blondir doucement l'ail en lamelles dans l'huile d'olive avec le piment, à feu très doux.",
          ar: "في نفس الوقت، شوّح الثوم المقطّع رقيق في زيت الزيتون مع الفلفل، على نار صغيرة برشة.",
        },
        minutes: 5,
        tip: {
          fr: "L'ail doit blondir, jamais brunir : un ail brûlé rend toute l'huile amère et il faut tout recommencer.",
          ar: "الثوم يصفارّ، ما يكحّلش. كان تحرق، الزيت الكل يولّي مرّ ولازمك تعاود من الأول.",
        },
      },
      {
        text: {
          fr: "Cuire les spaghetti une minute de moins que le temps indiqué, puis prélever une tasse d'eau de cuisson avant d'égoutter.",
          ar: "طيّب السباغيتي دقيقة أقل من الوقت المكتوب، وخوذ كاس من ماء الطياب قبل ما تصفّيها.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Verser les pâtes dans la poêle avec l'huile parfumée, ajouter un peu d'eau de cuisson et remuer vivement une minute.",
          ar: "زيد المقرونة في الطاجين مع الزيت، زيد شوية من ماء الطياب وحرّك بقوة دقيقة.",
        },
        minutes: 2,
        tip: {
          fr: "C'est l'amidon de l'eau de cuisson qui lie l'huile aux pâtes. Sans elle, l'huile glisse et reste au fond du plat.",
          ar: "النشا اللي في ماء الطياب هو اللي يربط الزيت بالمقرونة. بلاه، الزيت يبقى في القاع.",
        },
      },
      {
        text: {
          fr: "Hors du feu, ajouter le persil ciselé et servir immédiatement.",
          ar: "بعيد على النار، زيد المعدنوس مقطّع وقدّمها ديركت.",
        },
      },
    ],
    utensils: [
      { fr: "Grande casserole", ar: "طنجرة كبيرة" },
      { fr: "Poêle large", ar: "طاجين واسع" },
    ],
    tips: [
      {
        fr: "Pas de fromage sur une aglio e olio : le plat vit du contraste entre l'ail, le piment et l'huile, que le parmesan écraserait.",
        ar: "ما تحطّش جبن على الأليو إي أوليو : الماكلة تعيش على التوازن بين الثوم، الحارّ والزيت، والبارميزان يغطّي عليهم.",
      },
    ],
  },

  // ------------------------------------------------------------------ 2
  {
    slug: "pasta-al-tonno",
    name: { fr: "Pâtes au thon", ar: "مقرونة بالطن" },
    description: {
      fr: "Le thon à l'huile est un produit tunisien avant d'être un produit italien. Ici il rencontre les câpres et les olives : vingt minutes, tout vient du placard.",
      ar: "الطن المعلّب منتوج تونسي قبل ما يكون إيطالي. هنا يتلاقى مع الكبار والزيتون : عشرين دقيقة، والكل من المونة.",
    },
    region: { fr: "Sicile", ar: "صقلية" },
    cuisine: "italienne",
    category: "plat",
    serves: 4,
    prepMinutes: 10,
    cookMinutes: 20,
    difficulty: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["rapide", "economique", "enfants"],
    ingredients: [
      { id: "pates_makrouna", qty: 400, unit: "g" },
      { id: "thon_boite", qty: 2, unit: "boite" },
      { id: "tomate", qty: 4, unit: "piece" },
      { id: "ail", qty: 3, unit: "gousse" },
      { id: "concentre_tomate", qty: 1, unit: "cas" },
      { id: "capre", qty: 20, unit: "g" },
      { id: "olive_verte", qty: 60, unit: "g" },
      { id: "huile_olive", qty: 4, unit: "cas" },
      { id: "piment_moulu", qty: 1, unit: "cac" },
      { id: "persil", qty: 1, unit: "botte" },
      { id: "sel", qty: 1, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Faire revenir l'ail écrasé dans l'huile d'olive quelques secondes, sans le colorer.",
          ar: "شوّح الثوم المهروس في زيت الزيتون ثواني، بلا ما يحمّر.",
        },
        minutes: 2,
      },
      {
        text: {
          fr: "Ajouter les tomates râpées et le concentré, saler, et laisser réduire à feu moyen.",
          ar: "زيد الطماطم المبشورة والطماطم المصبرة، ملّح، وخلّيها تنشف على نار متوسطة.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Ajouter le thon égoutté et émietté, les câpres rincées, les olives et le piment. Cuire 3 minutes seulement.",
          ar: "زيد الطن مصفّي ومفتّت، الكبار مغسول، الزيتون والفلفل. طيّب 3 دقائق برك.",
        },
        minutes: 3,
        tip: {
          fr: "Le thon est déjà cuit : plus il mijote, plus il devient sec et filandreux.",
          ar: "الطن مطيّب من قبل. كل ما طال في النار كل ما نشف وولّى خيوط.",
        },
      },
      {
        text: {
          fr: "Cuire les pâtes al dente dans l'eau salée, les égoutter en gardant un peu d'eau.",
          ar: "طيّب المقرونة في ماء مالح وصفّيها، وخلّي شوية ماء.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Mélanger les pâtes à la sauce dans la poêle, détendre avec l'eau de cuisson et finir au persil.",
          ar: "خلّط المقرونة مع الصلصة في الطاجين، حلّها بماء الطياب وكمّل بالمعدنوس.",
        },
        minutes: 2,
      },
    ],
    utensils: [
      { fr: "Poêle", ar: "طاجين" },
      { fr: "Râpe", ar: "مبشرة" },
    ],
  },

  // ------------------------------------------------------------------ 3
  {
    slug: "pasta-alla-norma",
    name: { fr: "Pâtes alla Norma", ar: "مقرونة بالبيتنجال" },
    description: {
      fr: "Aubergines frites, sauce tomate et ricotta : le plat de Catane. En pleine saison des aubergines, c'est l'un des plats les moins chers du répertoire.",
      ar: "بيتنجال مقلي، صلصة طماطم وريكوتا : ماكلة كاتانيا. في وقت البيتنجال، من أرخص الماكلات.",
    },
    region: { fr: "Catane, Sicile", ar: "كاتانيا، صقلية" },
    cuisine: "italienne",
    category: "plat",
    serves: 4,
    prepMinutes: 15,
    cookMinutes: 30,
    difficulty: 2,
    months: [6, 7, 8, 9, 10],
    tags: ["vegetarien", "economique"],
    ingredients: [
      { id: "pates_makrouna", qty: 400, unit: "g" },
      { id: "aubergine", qty: 2, unit: "piece" },
      { id: "tomate", qty: 6, unit: "piece" },
      { id: "ail", qty: 3, unit: "gousse" },
      { id: "basilic", qty: 1, unit: "botte" },
      { id: "ricotta", qty: 120, unit: "g", note: { fr: "à défaut de ricotta salata", ar: "عوض الريكوتا المالحة" } },
      { id: "huile_vegetale", qty: 300, unit: "ml", note: { fr: "pour la friture", ar: "للقلي" } },
      { id: "huile_olive", qty: 3, unit: "cas" },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Couper les aubergines en cubes, les saler et les laisser dégorger 20 minutes dans une passoire.",
          ar: "قطّع البيتنجال مكعّبات، ملّحو وخلّيه يصفّي 20 دقيقة في المصفاة.",
        },
        minutes: 20,
        tip: {
          fr: "Faire dégorger enlève l'amertume et surtout limite l'huile absorbée à la friture.",
          ar: "التمليح ينحّي المرارة وينقّص الزيت اللي يشربو البيتنجال في القلي.",
        },
      },
      {
        text: {
          fr: "Éponger soigneusement les cubes, puis les frire en plusieurs fois dans l'huile bien chaude jusqu'à ce qu'ils soient dorés.",
          ar: "نشّف المكعّبات مليح، واقليهم على مرّات في زيت سخون حتى يحمّرو.",
        },
        minutes: 12,
      },
      {
        text: {
          fr: "Dans une autre poêle, faire revenir l'ail dans l'huile d'olive, ajouter les tomates râpées et laisser réduire.",
          ar: "في طاجين آخر، شوّح الثوم في زيت الزيتون، زيد الطماطم المبشورة وخلّيها تنشف.",
        },
        minutes: 15,
      },
      {
        text: {
          fr: "Ajouter la moitié des aubergines à la sauce et le basilic déchiré à la main.",
          ar: "زيد نص البيتنجال للصلصة والحبق مقطّع باليد.",
        },
        minutes: 2,
      },
      {
        text: {
          fr: "Mélanger les pâtes cuites al dente à la sauce, puis dresser avec le reste des aubergines et la ricotta émiettée.",
          ar: "خلّط المقرونة المطيّبة مع الصلصة، وحطّ فوقها باقي البيتنجال والريكوتا مفتّتة.",
        },
        minutes: 3,
      },
    ],
    utensils: [
      { fr: "Passoire", ar: "مصفاة" },
      { fr: "Poêle profonde", ar: "طاجين عميق" },
    ],
  },

  // ------------------------------------------------------------------ 4
  {
    slug: "caponata",
    name: { fr: "Caponata sicilienne", ar: "كابوناتا صقلية" },
    description: {
      fr: "Aubergines, céleri, olives et câpres en aigre-doux. Très proche de ce que la cuisine tunisienne fait déjà : elle se mange froide, et elle est meilleure le lendemain.",
      ar: "بيتنجال، كرافس، زيتون وكبار، حلو وحامض. قريبة برشة من المطبخ التونسي : تتاكل باردة، وأطيب غدوة.",
    },
    region: { fr: "Palerme, Sicile", ar: "باليرمو، صقلية" },
    cuisine: "italienne",
    category: "entree",
    serves: 4,
    prepMinutes: 20,
    cookMinutes: 35,
    difficulty: 2,
    months: [6, 7, 8, 9, 10],
    tags: ["vegetarien", "invites", "batch"],
    ingredients: [
      { id: "aubergine", qty: 3, unit: "piece" },
      { id: "celeri", qty: 1, unit: "botte" },
      { id: "oignon", qty: 2, unit: "piece" },
      { id: "tomate", qty: 3, unit: "piece" },
      { id: "olive_verte", qty: 80, unit: "g" },
      { id: "capre", qty: 30, unit: "g" },
      { id: "vinaigre", qty: 4, unit: "cas" },
      { id: "sucre", qty: 2, unit: "cas" },
      { id: "pignon", qty: 30, unit: "g", optional: true },
      { id: "raisin_sec", qty: 30, unit: "g", optional: true },
      { id: "basilic", qty: 1, unit: "botte" },
      { id: "huile_olive", qty: 8, unit: "cas" },
      { id: "sel", qty: 1, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Couper les aubergines en cubes, les faire dégorger au sel 20 minutes, puis les éponger.",
          ar: "قطّع البيتنجال مكعّبات، ملّحو 20 دقيقة، ونشّفو.",
        },
        minutes: 20,
      },
      {
        text: {
          fr: "Frire les aubergines dans l'huile d'olive jusqu'à ce qu'elles soient dorées, puis les réserver.",
          ar: "اقلي البيتنجال في زيت الزيتون حتى يحمّر، ونحّيه على جنب.",
        },
        minutes: 12,
      },
      {
        text: {
          fr: "Dans la même poêle, faire fondre les oignons et le céleri coupé en tronçons, à feu moyen.",
          ar: "في نفس الطاجين، خلّي البصل والكرافس المقطّع يذوبو على نار متوسطة.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Ajouter les tomates concassées, les olives, les câpres rincées, les raisins secs et les pignons.",
          ar: "زيد الطماطم مقطّعة، الزيتون، الكبار مغسول، الزبيب والصنوبر.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Verser le vinaigre et le sucre, monter le feu et laisser l'acidité s'évaporer une minute.",
          ar: "زيد الخل والسكر، كبّر النار وخلّي الحموضة تتبخّر دقيقة.",
        },
        minutes: 2,
        tip: {
          fr: "C'est l'aigre-doux qui définit la caponata : goûtez et ajustez, elle doit piquer légèrement sans être sucrée.",
          ar: "الحلو والحامض هوما سرّ الكابوناتا : ذوق وعدّل، تلزم تحمّض شوية بلا ما تولّي حلوة.",
        },
      },
      {
        text: {
          fr: "Remettre les aubergines, mélanger délicatement et laisser refroidir. Ajouter le basilic au moment de servir.",
          ar: "ردّ البيتنجال، خلّط بالشوية وخلّيها تبرد. زيد الحبق وقت التقديم.",
        },
        minutes: 3,
      },
    ],
    utensils: [
      { fr: "Grande poêle", ar: "طاجين كبير" },
      { fr: "Passoire", ar: "مصفاة" },
    ],
    tips: [
      {
        fr: "La caponata se garde une semaine au frais et se bonifie chaque jour.",
        ar: "الكابوناتا تقعد جمعة في الفريجيدار وتتحسّن كل نهار.",
      },
    ],
  },

  // ------------------------------------------------------------------ 5
  {
    slug: "pizza-margherita",
    name: { fr: "Pizza margherita", ar: "بيتزا مارغريتا" },
    description: {
      fr: "Pâte maison, sauce tomate crue, mozzarella et basilic. Rien d'autre : c'est la simplicité qui fait la margherita, pas la garniture.",
      ar: "عجينة من الدار، صلصة طماطم نيّة، موزاريلا وحبق. حتّى شيء آخر : البساطة هي سرّ المارغريتا.",
    },
    region: { fr: "Naples", ar: "نابولي" },
    cuisine: "italienne",
    category: "plat",
    serves: 4,
    prepMinutes: 25,
    cookMinutes: 15,
    difficulty: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["enfants", "invites"],
    ingredients: [
      { id: "farine", qty: 500, unit: "g" },
      { id: "levure_boulangere", qty: 7, unit: "g" },
      { id: "huile_olive", qty: 4, unit: "cas" },
      { id: "tomate_pelee", qty: 1, unit: "boite" },
      { id: "mozzarella", qty: 250, unit: "g" },
      { id: "basilic", qty: 1, unit: "botte" },
      { id: "origan", qty: 1, unit: "cac" },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Délayer la levure dans 300 ml d'eau tiède, puis l'incorporer à la farine et au sel. Pétrir 10 minutes.",
          ar: "ذوّب الخميرة في 300 مل ماء دافي، زيدها للفارينة والملح. اعجن 10 دقائق.",
        },
        minutes: 12,
        tip: {
          fr: "Eau tiède, jamais chaude : au-delà de 40 °C la levure meurt et la pâte ne lèvera pas.",
          ar: "ماء دافي موش سخون : كان يفوت 40 درجة الخميرة تموت والعجين ما يطلعش.",
        },
      },
      {
        text: {
          fr: "Couvrir d'un torchon et laisser lever à l'abri des courants d'air jusqu'à ce que la pâte double de volume.",
          ar: "غطّي بفوطة وخلّي العجين يطلع بعيد على الهواء حتى يولّي الضعف.",
        },
        minutes: 90,
      },
      {
        text: {
          fr: "Préchauffer le four au maximum avec la plaque à l'intérieur : c'est la chaleur du support qui cuit le dessous.",
          ar: "سخّن الفرن على أقصى درجة والصفيحة فيه : السخانة متاع الصفيحة هي اللي تطيّب التحت.",
        },
        minutes: 20,
      },
      {
        text: {
          fr: "Écraser les tomates pelées à la fourchette avec du sel et un filet d'huile. Ne pas les cuire.",
          ar: "اهرس الطماطم المقشّرة بالفرشيطة مع الملح وشوية زيت. ما تطيّبهاش.",
        },
        minutes: 3,
      },
      {
        text: {
          fr: "Étaler la pâte à la main, la garnir de sauce en laissant un bord libre, puis d'origan et de mozzarella égouttée.",
          ar: "افرد العجين باليد، حطّ الصلصة وخلّي الحافة فارغة، بعد الزعتر والموزاريلا مصفّية.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Enfourner sur la plaque brûlante jusqu'à ce que la croûte gonfle et se tache de brun.",
          ar: "حطّها في الفرن على الصفيحة السخونة حتى تنفخ الحافة وتولّي فيها بقع كحلة.",
        },
        minutes: 12,
      },
      {
        text: {
          fr: "Ajouter le basilic frais à la sortie du four, jamais avant : la cuisson le noircit.",
          ar: "زيد الحبق الطازج كي تخرجها من الفرن، موش قبل : السخانة تكحّلو.",
        },
      },
    ],
    utensils: [
      { fr: "Saladier", ar: "قصعة" },
      { fr: "Plaque de four", ar: "صفيحة فرن" },
    ],
  },

  // ------------------------------------------------------------------ 6
  {
    slug: "melanzane-parmigiana",
    name: { fr: "Aubergines à la parmigiana", ar: "بيتنجال بالبارميزان" },
    description: {
      fr: "Un gratin d'aubergines frites, de sauce tomate et de fromage, monté en couches. Long à préparer, mais il nourrit une tablée entière.",
      ar: "غراتان بيتنجال مقلي، صلصة طماطم وجبن، طبقة فوق طبقة. ياخذ وقت، أما يشبّع الطاولة الكل.",
    },
    region: { fr: "Campanie", ar: "كامبانيا" },
    cuisine: "italienne",
    category: "plat",
    serves: 4,
    prepMinutes: 25,
    cookMinutes: 50,
    difficulty: 2,
    months: [6, 7, 8, 9, 10],
    tags: ["vegetarien", "invites"],
    ingredients: [
      { id: "aubergine", qty: 4, unit: "piece" },
      { id: "tomate_pelee", qty: 2, unit: "boite" },
      { id: "mozzarella", qty: 200, unit: "g" },
      { id: "parmesan", qty: 60, unit: "g" },
      { id: "ail", qty: 3, unit: "gousse" },
      { id: "basilic", qty: 1, unit: "botte" },
      { id: "huile_vegetale", qty: 400, unit: "ml", note: { fr: "pour la friture", ar: "للقلي" } },
      { id: "huile_olive", qty: 3, unit: "cas" },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Couper les aubergines en tranches de 1 cm dans la longueur, les saler et les laisser dégorger 30 minutes.",
          ar: "قطّع البيتنجال شرايح 1 سم بالطول، ملّحو وخلّيه يصفّي 30 دقيقة.",
        },
        minutes: 30,
      },
      {
        text: {
          fr: "Préparer la sauce : ail dans l'huile d'olive, tomates pelées écrasées, sel, et laisser réduire à feu doux.",
          ar: "حضّر الصلصة : ثوم في زيت الزيتون، طماطم مقشّرة مهروسة، ملح، وخلّيها تنشف على نار هادية.",
        },
        minutes: 20,
      },
      {
        text: {
          fr: "Éponger les tranches et les frire jusqu'à ce qu'elles soient dorées, puis les égoutter sur du papier.",
          ar: "نشّف الشرايح واقليهم حتى يحمّرو، وصفّيهم في ورق.",
        },
        minutes: 15,
      },
      {
        text: {
          fr: "Monter dans un plat : sauce, aubergines, mozzarella, parmesan, basilic. Répéter jusqu'à épuisement.",
          ar: "ركّب في صحن : صلصة، بيتنجال، موزاريلا، بارميزان، حبق. عاود حتى يكملو.",
        },
        minutes: 8,
        tip: {
          fr: "Terminer par de la sauce et du parmesan, jamais par la mozzarella seule : elle brûlerait.",
          ar: "كمّل بالصلصة والبارميزان، موش بالموزاريلا وحدها : تتحرق.",
        },
      },
      {
        text: {
          fr: "Enfourner à 180 °C jusqu'à ce que le dessus soit gratiné et que la sauce bouillonne sur les bords.",
          ar: "حطّها في الفرن على 180 درجة حتى يحمّر الوجه وتغلي الصلصة في الأطراف.",
        },
        minutes: 30,
      },
      {
        text: {
          fr: "Laisser reposer 15 minutes avant de couper : le plat doit se tenir dans l'assiette.",
          ar: "خلّيها ترتاح 15 دقيقة قبل ما تقطّع : لازمها تشدّ في الصحن.",
        },
        minutes: 15,
      },
    ],
    utensils: [
      { fr: "Plat à gratin", ar: "صحن فرن" },
      { fr: "Poêle à frire", ar: "مقلاة" },
    ],
  },

  // ------------------------------------------------------------------ 7
  {
    slug: "pasta-con-le-sarde",
    name: { fr: "Pâtes aux sardines et au fenouil", ar: "مقرونة بالسردينة والبسباس" },
    description: {
      fr: "Le plat sicilien qui ressemble le plus à la Tunisie : sardines, fenouil, raisins secs et pignons. Le sucré-salé y est déjà, comme dans la marqa hlowa.",
      ar: "الماكلة الصقلية اللي تشبه تونس أكثر : سردينة، بسباس، زبيب وصنوبر. الحلو والمالح موجود، كيما في المرقة الحلوة.",
    },
    region: { fr: "Palerme, Sicile", ar: "باليرمو، صقلية" },
    cuisine: "italienne",
    category: "plat",
    serves: 4,
    prepMinutes: 25,
    cookMinutes: 30,
    difficulty: 3,
    months: [4, 5, 6, 9, 10],
    tags: ["invites"],
    ingredients: [
      { id: "spaghetti", qty: 400, unit: "g" },
      {
        id: "sardine",
        qty: 600,
        unit: "g",
        note: {
          fr: "en filets — comptez 1,2 kg de sardines entières",
          ar: "فيليه — احسب 1.2 كغ سردينة صحيحة",
        },
      },
      {
        id: "fenouil",
        qty: 1,
        unit: "piece",
        note: {
          fr: "bulbe, à défaut de fenouil sauvage",
          ar: "بصلة البسباس، عوض البسباس البرّي",
        },
      },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "anchois", qty: 20, unit: "g" },
      { id: "raisin_sec", qty: 40, unit: "g" },
      { id: "pignon", qty: 30, unit: "g" },
      { id: "curcuma", qty: 1, unit: "cac", note: { fr: "à la place du safran", ar: "عوض الزعفران" } },
      { id: "chapelure", qty: 40, unit: "g" },
      { id: "huile_olive", qty: 6, unit: "cas" },
      { id: "citron", qty: 1, unit: "piece" },
      { id: "sel", qty: 1, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Nettoyer les sardines en filets, les rincer et les frotter au citron. Faire tremper les raisins secs dans un peu d'eau tiède.",
          ar: "نظّف السردينة فيليه، اغسلها ودلّكها بالقارص. نقّع الزبيب في شوية ماء دافي.",
        },
        minutes: 15,
      },
      {
        text: {
          fr: "Cuire le fenouil 10 minutes dans l'eau bouillante salée, le retirer et le hacher. Garder l'eau pour les pâtes.",
          ar: "اسلق البسباس 10 دقائق في ماء مالح، نحّيه وافرمو. خلّي الماء للمقرونة.",
        },
        minutes: 10,
        tip: {
          fr: "Cuire les pâtes dans l'eau du fenouil : c'est là que passe tout son parfum.",
          ar: "طيّب المقرونة في ماء البسباس : الريحة الكل موجودة فيه.",
        },
      },
      {
        text: {
          fr: "Faire dorer la chapelure à sec dans une poêle jusqu'à ce qu'elle soit brune, puis la réserver.",
          ar: "حمّر البقسماط المطحون في طاجين بلا زيت حتى يولّي بنّي، ونحّيه.",
        },
        minutes: 4,
      },
      {
        text: {
          fr: "Faire fondre l'oignon dans l'huile d'olive, ajouter les anchois qui vont se défaire, puis le curcuma.",
          ar: "خلّي البصل يذوب في زيت الزيتون، زيد الأنشوة اللي تتفكّك، بعد الخرقوم.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Ajouter le fenouil haché, les raisins égouttés et les pignons, puis les sardines. Cuire sans trop remuer.",
          ar: "زيد البسباس المفروم، الزبيب مصفّي والصنوبر، بعد السردينة. طيّب بلا ما تحرّك برشة.",
        },
        minutes: 8,
        tip: {
          fr: "Les sardines doivent rester en morceaux : remuez le moins possible, secouez la poêle plutôt.",
          ar: "السردينة تبقى قطع : ما تحرّكش برشة، هزّ الطاجين برك.",
        },
      },
      {
        text: {
          fr: "Mélanger aux spaghetti cuits dans l'eau du fenouil, puis servir couvert de chapelure grillée.",
          ar: "خلّطها مع السباغيتي المطيّبة في ماء البسباس، وقدّمها مغطّية بالبقسماط المحمّر.",
        },
        minutes: 3,
      },
    ],
    utensils: [
      { fr: "Grande casserole", ar: "طنجرة كبيرة" },
      { fr: "Poêle large", ar: "طاجين واسع" },
    ],
    tips: [
      {
        fr: "En Sicile, la chapelure grillée remplace le fromage : on ne met jamais de parmesan sur un plat de poisson.",
        ar: "في صقلية، البقسماط المحمّر يعوّض الجبن : ما يحطّوش بارميزان على ماكلة حوت.",
      },
    ],
  },

  // ------------------------------------------------------------------ 8
  {
    slug: "minestrone",
    name: { fr: "Minestrone", ar: "مينستروني" },
    description: {
      fr: "La soupe de légumes italienne : ce qui est de saison, des haricots blancs et une poignée de pâtes. Elle se fait avec ce qu'il reste au bas du frigo.",
      ar: "شربة الخضرة الإيطالية : اللي في وقتو، لوبيا بيضاء وحفنة مقرونة. تتعمل باللي بقى في الفريجيدار.",
    },
    region: { fr: "Milan", ar: "ميلانو" },
    cuisine: "italienne",
    category: "soupe",
    serves: 4,
    prepMinutes: 20,
    cookMinutes: 45,
    difficulty: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["vegetarien", "economique", "plat_unique", "batch"],
    ingredients: [
      { id: "haricot_blanc", qty: 150, unit: "g", note: { fr: "trempés la veille", ar: "منقوعة من البارح" } },
      { id: "carotte", qty: 2, unit: "piece" },
      { id: "celeri", qty: 1, unit: "botte" },
      { id: "courgette", qty: 1, unit: "piece" },
      { id: "pomme_de_terre", qty: 2, unit: "piece" },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "tomate", qty: 3, unit: "piece" },
      { id: "ail", qty: 2, unit: "gousse" },
      { id: "pates_makrouna", qty: 100, unit: "g" },
      { id: "huile_olive", qty: 4, unit: "cas" },
      { id: "basilic", qty: 1, unit: "botte" },
      { id: "parmesan", qty: 40, unit: "g", optional: true },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Cuire les haricots blancs trempés dans l'eau non salée jusqu'à ce qu'ils soient tendres.",
          ar: "طيّب اللوبيا البيضاء المنقوعة في ماء بلا ملح حتى تلين.",
        },
        minutes: 40,
      },
      {
        text: {
          fr: "Faire revenir l'oignon, l'ail, la carotte et le céleri coupés en petits dés dans l'huile d'olive.",
          ar: "شوّح البصل، الثوم، السفنارية والكرافس مقطّعين صغير في زيت الزيتون.",
        },
        minutes: 10,
        tip: {
          fr: "Tous les légumes coupés à la même taille cuisent en même temps : c'est tout le secret de la soupe.",
          ar: "كان قطّعت الخضرة الكل نفس القدّ، تطيب في نفس الوقت : هذا سرّ الشربة.",
        },
      },
      {
        text: {
          fr: "Ajouter les tomates râpées, puis 1,5 litre d'eau chaude et les haricots avec leur eau de cuisson.",
          ar: "زيد الطماطم المبشورة، بعد 1.5 لتر ماء سخون واللوبيا مع ماءها.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Ajouter les pommes de terre, saler et laisser mijoter 20 minutes.",
          ar: "زيد البطاطا، ملّح وخلّيها تطيب 20 دقيقة.",
        },
        minutes: 20,
      },
      {
        text: {
          fr: "Ajouter la courgette puis les pâtes, et poursuivre la cuisson jusqu'à ce que les pâtes soient tendres.",
          ar: "زيد القرعة الخضراء بعد المقرونة، وكمّل الطياب حتى تلين المقرونة.",
        },
        minutes: 12,
      },
      {
        text: {
          fr: "Servir avec un filet d'huile d'olive crue, du basilic et du parmesan râpé.",
          ar: "قدّمها مع شوية زيت زيتون نيّة، حبق وبارميزان مبشور.",
        },
      },
    ],
    utensils: [{ fr: "Grande marmite", ar: "طنجرة كبيرة" }],
  },

  // ------------------------------------------------------------------ 9
  {
    slug: "carbonara-tunisienne",
    name: { fr: "Carbonara à la dinde fumée", ar: "كاربونارا بالديك الرومي المدخّن" },
    description: {
      fr: "La carbonara adaptée : la dinde fumée du boucher remplace le guanciale. Ce n'est pas l'originale et elle ne prétend pas l'être — mais la technique, elle, est la vraie.",
      ar: "كاربونارا معدّلة : الديك الرومي المدخّن يعوّض الڨوانتشالي. موش الأصلية وما تدّعيش — أما الطريقة هي الصحيحة.",
    },
    region: { fr: "Rome, adaptée", ar: "روما، معدّلة" },
    cuisine: "italienne",
    category: "plat",
    serves: 3,
    prepMinutes: 10,
    cookMinutes: 15,
    difficulty: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["rapide", "enfants"],
    ingredients: [
      { id: "spaghetti", qty: 300, unit: "g" },
      { id: "dinde_fumee", qty: 150, unit: "g", note: { fr: "en lardons", ar: "مقطّع قطع صغيرة" } },
      {
        id: "oeuf",
        qty: 4,
        unit: "piece",
        note: {
          fr: "3 jaunes + 1 œuf entier",
          ar: "3 أصفار + عظمة كاملة",
        },
      },
      { id: "parmesan", qty: 60, unit: "g" },
      { id: "poivre_noir", qty: 1, unit: "cac" },
      { id: "huile_olive", qty: 2, unit: "cas" },
      { id: "sel", qty: 1, unit: "cas" },
    ],
    steps: [
      {
        text: {
          fr: "Faire dorer la dinde fumée dans l'huile d'olive jusqu'à ce qu'elle soit croustillante, puis couper le feu.",
          ar: "حمّر الديك الرومي المدخّن في زيت الزيتون حتى يولّي مقرمش، وطفي النار.",
        },
        minutes: 6,
      },
      {
        text: {
          fr: "Battre 3 jaunes et 1 œuf entier avec le parmesan râpé et beaucoup de poivre noir, jusqu'à obtenir une crème épaisse.",
          ar: "اخفق 3 أصفار وعظمة كاملة مع البارميزان المبشور وبرشة فلفل أكحل، حتى تولّي كريمة ثخينة.",
        },
        minutes: 4,
        tip: {
          fr: "Les jaunes donnent l'onctuosité, l'œuf entier assez de liquide pour enrober les pâtes sans que la sauce ne fige.",
          ar: "الأصفار يعطيو النعومة، والعظمة الكاملة تعطي السيولة باش تغطّي المقرونة بلا ما تشدّ الصلصة.",
        },
      },
      {
        text: {
          fr: "Cuire les spaghetti al dente et prélever une grande tasse d'eau de cuisson avant d'égoutter.",
          ar: "طيّب السباغيتي وخوذ كاس كبيرة من ماء الطياب قبل ما تصفّيها.",
        },
        minutes: 9,
      },
      {
        text: {
          fr: "Verser les pâtes chaudes dans la poêle hors du feu, avec la dinde, et mélanger.",
          ar: "زيد المقرونة السخونة في الطاجين بعيد على النار، مع الديك الرومي، وخلّط.",
        },
        minutes: 1,
      },
      {
        text: {
          fr: "Ajouter le mélange aux œufs hors du feu en remuant sans arrêt, et détendre avec l'eau de cuisson jusqu'à obtenir une sauce nappante.",
          ar: "زيد خليط العظم بعيد على النار وحرّك بلا توقّف، وحلّها بماء الطياب حتى تولّي صلصة ملسة.",
        },
        minutes: 2,
        tip: {
          fr: "Hors du feu, impérativement : sur la flamme, l'œuf coagule et vous obtenez des pâtes aux œufs brouillés.",
          ar: "بعيد على النار بالسيف : على النار العظم يشدّ وتولّي مقرونة بالعظم المخلّط.",
        },
      },
      {
        text: {
          fr: "Servir aussitôt, avec encore un tour de poivre.",
          ar: "قدّمها ديركت، مع شوية فلفل أكحل زايد.",
        },
      },
    ],
    utensils: [
      { fr: "Poêle large", ar: "طاجين واسع" },
      { fr: "Fouet", ar: "خفّاقة" },
    ],
    tips: [
      {
        fr: "Ni crème ni lait dans une carbonara : c'est l'œuf et l'eau de cuisson qui font la sauce.",
        ar: "لا كريمة لا حليب في الكاربونارا : العظم وماء الطياب هوما اللي يعملو الصلصة.",
      },
      {
        fr: "Le fromage d'origine est le pecorino romano, plus salé et plus piquant. Le parmesan le remplace bien et se trouve partout ; si vous croisez du pecorino, prenez-le.",
        ar: "الجبن الأصلي هو البيكورينو رومانو، أملح وأقوى. البارميزان يعوّضو مليح ويتلقى في كل بلاصة ؛ كان لقيت بيكورينو، خوذو.",
      },
    ],
  },

  // ------------------------------------------------------------------ 10
  {
    slug: "tiramisu",
    name: { fr: "Tiramisù sans alcool", ar: "تيراميسو بلا كحول" },
    description: {
      fr: "Monté à la ricotta plutôt qu'au mascarpone, introuvable ou hors de prix, et sans marsala. Il ne cuit pas : tout se joue au réfrigérateur.",
      ar: "معمول بالريكوتا عوض الماسكاربوني اللي ما يتلقاش ولا غالي، وبلا مارسالا. ما يطيبش : الكل يتعمل في الفريجيدار.",
    },
    region: { fr: "Vénétie", ar: "فينيتو" },
    cuisine: "italienne",
    category: "dessert",
    serves: 6,
    prepMinutes: 25,
    cookMinutes: 0,
    difficulty: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["invites", "enfants"],
    ingredients: [
      { id: "ricotta", qty: 500, unit: "g" },
      {
        id: "creme_liquide",
        qty: 200,
        unit: "ml",
        note: { fr: "entière, bien froide", ar: "كاملة الدسم، باردة برشة" },
      },
      { id: "sucre", qty: 120, unit: "g" },
      { id: "oeuf", qty: 3, unit: "piece" },
      { id: "boudoir", qty: 24, unit: "piece" },
      { id: "cafe", qty: 30, unit: "g", note: { fr: "en café fort, refroidi", ar: "قهوة قوية وباردة" } },
      { id: "cacao", qty: 20, unit: "g" },
    ],
    steps: [
      {
        text: {
          fr: "Préparer un café bien serré et le laisser refroidir complètement.",
          ar: "حضّر قهوة قوية وخلّيها تبرد بالكامل.",
        },
        minutes: 10,
        tip: {
          fr: "Un café encore tiède détrempe les boudoirs et fait s'effondrer le montage.",
          ar: "القهوة الدافية تبلّل البودوار برشة والتركيبة تتهدّ.",
        },
      },
      {
        text: {
          fr: "Blanchir les jaunes d'œufs avec le sucre jusqu'à ce que le mélange double de volume et blanchisse.",
          ar: "اخفق أصفر العظم مع السكر حتى يكبر الخليط ويبيّض.",
        },
        minutes: 6,
      },
      {
        text: {
          fr: "Fouetter la crème liquide bien froide jusqu'à ce qu'elle tienne, puis l'incorporer à la ricotta égouttée en soulevant délicatement la masse.",
          ar: "اخفق الكريمة السائلة الباردة حتى تشدّ، وزيدها للريكوتا المصفّية وحرّك من التحت للفوق بالشوية.",
        },
        minutes: 6,
        tip: {
          fr: "Seule la crème liquide entière monte. La crème fraîche épaisse, elle, ne foisonnera jamais : le bol et la crème doivent en plus sortir du réfrigérateur.",
          ar: "الكريمة السائلة الكاملة برك هي اللي تطلع. الكريمة الثخينة ما تنفخش أبدا : والقصعة والكريمة لازمهم يخرجو من الفريجيدار.",
        },
      },
      {
        text: {
          fr: "Monter les blancs en neige ferme et les incorporer en dernier, en trois fois.",
          ar: "اخفق البياض حتى يشدّ وزيدو في الآخر، على ثلاث مرّات.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Tremper chaque boudoir une seconde dans le café, pas plus, et tapisser le fond du plat.",
          ar: "غطّس كل بودوار ثانية وحدة في القهوة، لا أكثر، وفرش بيهم قاع الصحن.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Alterner une couche de crème et une couche de biscuits, terminer par la crème et lisser.",
          ar: "بدّل طبقة كريمة وطبقة بسكوي، كمّل بالكريمة وملّسها.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Réfrigérer au moins 4 heures, idéalement une nuit, et saupoudrer de cacao juste avant de servir.",
          ar: "حطّو في الفريجيدار 4 سوايع على الأقل، وأحسن ليلة كاملة، ورشّ الكاكاو قبل التقديم ديركت.",
        },
        minutes: 240,
        tip: {
          fr: "Le cacao au dernier moment : posé à l'avance, il boit l'humidité et devient pâteux.",
          ar: "الكاكاو في اللحظة الأخيرة : كان حطّيتو من قبل يشرب الرطوبة ويولّي عجين.",
        },
      },
    ],
    utensils: [
      { fr: "Plat rectangulaire", ar: "صحن مستطيل" },
      { fr: "Fouet", ar: "خفّاقة" },
    ],
    tips: [
      {
        fr: "Les œufs ne sont pas cuits : utilisez-les extra-frais et gardez le plat au froid jusqu'au service.",
        ar: "العظم ما يطيبش : استعمل عظم طازج برشة وخلّي الصحن في البارد حتى وقت التقديم.",
      },
    ],
  },

  // ------------------------------------------------------------------ 11
  {
    slug: "lasagne-bolognaise",
    name: { fr: "Lasagnes à la bolognaise", ar: "لازانيا بولونيز" },
    description: {
      fr: "Un ragù de bœuf mijoté deux heures, une béchamel muscadée, six couches de pâtes et beaucoup de fromage. C'est long, et c'est exactement pour ça que c'est bon.",
      ar: "راڨو باللحم البڨري يطيب ساعتين، بشاميل بجوزة الطيب، ستة طبقات وبرشة جبن. تاخذ وقت، وعلى هالخاطر تجي طيبة.",
    },
    region: { fr: "Bologne", ar: "بولونيا" },
    cuisine: "italienne",
    category: "plat",
    serves: 6,
    prepMinutes: 40,
    cookMinutes: 150,
    difficulty: 3,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["invites", "enfants", "batch"],
    ingredients: [
      { id: "lasagne", qty: 400, unit: "g" },
      { id: "viande_hachee", qty: 700, unit: "g", note: { fr: "bœuf", ar: "لحم بڨري" } },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "carotte", qty: 2, unit: "piece" },
      { id: "celeri", qty: 1, unit: "botte" },
      { id: "concentre_tomate", qty: 2, unit: "cas" },
      { id: "tomate_pelee", qty: 2, unit: "boite" },
      { id: "lait", qty: 900, unit: "ml", note: { fr: "dont 150 ml pour le ragù", ar: "منهم 150 مل للراڨو" } },
      { id: "beurre", qty: 80, unit: "g" },
      { id: "farine", qty: 80, unit: "g" },
      { id: "muscade", qty: 1, unit: "pincee" },
      { id: "parmesan", qty: 120, unit: "g" },
      { id: "mozzarella", qty: 200, unit: "g" },
      { id: "huile_olive", qty: 4, unit: "cas" },
      { id: "laurier", qty: 2, unit: "feuille" },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Hacher très finement l'oignon, les carottes et le céleri, puis les faire fondre doucement dans l'huile d'olive sans les colorer.",
          ar: "افرم البصل، السفنارية والكرافس مليح، وخلّيهم يذوبو بالشوية في زيت الزيتون بلا ما يحمّرو.",
        },
        minutes: 12,
        tip: {
          fr: "Ce trio fondu — le soffritto — est la base du ragù. Dix minutes de patience ici valent une heure de cuisson en plus ensuite.",
          ar: "هالثلاثي المذوّب هو أساس الراڨو. عشر دقائق صبر هنا تعوّض ساعة طياب زايدة من بعد.",
        },
      },
      {
        text: {
          fr: "Monter le feu, ajouter la viande hachée et l'écraser à la cuillère pour qu'elle ne forme pas de boulettes. La laisser perdre son eau puis colorer.",
          ar: "كبّر النار، زيد اللحم المفروم واهرسو بالمغرفة باش ما يعملش كور. خلّيه ينشف ماءه ويحمّر.",
        },
        minutes: 12,
      },
      {
        text: {
          fr: "Verser 150 ml de lait et laisser l'absorber complètement : c'est lui qui attendrit la viande.",
          ar: "زيد 150 مل حليب وخلّي اللحم يشربو بالكامل : هو اللي يليّن اللحم.",
        },
        minutes: 10,
        tip: {
          fr: "Le lait dans le ragù n'est pas une fantaisie : c'est dans la recette d'origine, et il arrondit l'acidité de la tomate.",
          ar: "الحليب في الراڨو موش زيادة : موجود في الوصفة الأصلية، ويكسّر حموضة الطماطم.",
        },
      },
      {
        text: {
          fr: "Ajouter le concentré, les tomates pelées écrasées, le laurier et le sel. Couvrir à demi et laisser mijoter à tout petit feu.",
          ar: "زيد الطماطم المصبرة، الطماطم المقشّرة المهروسة، ورق الرند والملح. غطّي نص غطاء وخلّيها تطيب على نار صغيرة.",
        },
        minutes: 120,
        tip: {
          fr: "Deux heures minimum, à peine frémissant. Un ragù pressé reste une sauce bolognaise ratée.",
          ar: "ساعتين على الأقل، تغلي بالكاد. الراڨو المستعجل يبقى صلصة فاشلة.",
        },
      },
      {
        text: {
          fr: "Préparer la béchamel : fondre le beurre, ajouter la farine et cuire 2 minutes, puis verser 750 ml de lait chaud en fouettant sans arrêt.",
          ar: "حضّر البشاميل : ذوّب الزبدة، زيد الفارينة وطيّب دقيقتين، بعد صبّ 750 مل حليب سخون وأنت تخفق بلا توقّف.",
        },
        minutes: 10,
        tip: {
          fr: "Lait chaud sur roux chaud, et le fouet ne s'arrête jamais : c'est ce qui évite les grumeaux, pas la chance.",
          ar: "حليب سخون على الروّ السخون، والخفّاقة ما تتوقّفش : هكّا ما تجيش كتل.",
        },
      },
      {
        text: {
          fr: "Saler la béchamel et la parfumer d'une pincée de muscade râpée.",
          ar: "ملّح البشاميل وعطّرها برشّة جوزة الطيب مبشورة.",
        },
        minutes: 2,
      },
      {
        text: {
          fr: "Monter dans le plat : une louche de ragù, des feuilles de lasagne, du ragù, de la béchamel, du parmesan. Répéter six fois.",
          ar: "ركّب في الصحن : مغرفة راڨو، أوراق لازانيا، راڨو، بشاميل، بارميزان. عاود ستّ مرّات.",
        },
        minutes: 12,
        tip: {
          fr: "Toujours une couche de sauce sous la première feuille, sinon elle colle au plat et brûle.",
          ar: "ديما طبقة صلصة تحت الورقة الأولى، وإلا تلزق في الصحن وتتحرق.",
        },
      },
      {
        text: {
          fr: "Terminer par béchamel, mozzarella et parmesan, puis enfourner à 180 °C jusqu'à ce que le dessus soit doré et cloqué.",
          ar: "كمّل بالبشاميل، الموزاريلا والبارميزان، وحطّها في الفرن على 180 درجة حتى يحمّر الوجه.",
        },
        minutes: 40,
      },
      {
        text: {
          fr: "Laisser reposer 20 minutes avant de couper : sortie du four, une lasagne s'effondre dans l'assiette.",
          ar: "خلّيها ترتاح 20 دقيقة قبل ما تقطّع : كي تخرج من الفرن ديركت، تتهدّ في الصحن.",
        },
        minutes: 20,
      },
    ],
    utensils: [
      { fr: "Grand plat à gratin", ar: "صحن فرن كبير" },
      { fr: "Marmite à fond épais", ar: "طنجرة قاعها غليظ" },
      { fr: "Fouet", ar: "خفّاقة" },
    ],
    tips: [
      {
        fr: "La bolognaise d'origine mêle bœuf et porc : ici tout est au bœuf, et les 150 ml de lait compensent largement le gras manquant.",
        ar: "البولونيز الأصلية فيها لحم بڨري وحلّوف : هنا الكل بڨري، و150 مل حليب يعوّضو الدسم الناقص.",
      },
      {
        fr: "Le ragù est meilleur préparé la veille. Doublez les quantités et congelez : c'est la base de la moitié des plats de cette liste.",
        ar: "الراڨو أطيب كي تعملو من البارح. ضاعف الكمية وجمّدو : هو أساس نص الماكلات في هالقائمة.",
      },
    ],
  },

  // ------------------------------------------------------------------ 12
  {
    slug: "tagliatelle-al-ragu",
    name: { fr: "Tagliatelles au ragù", ar: "تالياتيلي بالراڨو" },
    description: {
      fr: "Le vrai mariage de la sauce bolognaise : des tagliatelles larges, pas des spaghetti. La surface plate retient le ragù au lieu de le laisser tomber au fond.",
      ar: "الزواج الحقيقي متاع صلصة البولونيز : تالياتيلي عريضة، موش سباغيتي. السطح المسطّح يشدّ الراڨو بدل ما يطيح في القاع.",
    },
    region: { fr: "Bologne", ar: "بولونيا" },
    cuisine: "italienne",
    category: "plat",
    serves: 4,
    prepMinutes: 20,
    cookMinutes: 135,
    difficulty: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["invites", "enfants", "batch"],
    ingredients: [
      { id: "tagliatelle", qty: 400, unit: "g" },
      { id: "viande_hachee", qty: 500, unit: "g", note: { fr: "bœuf", ar: "لحم بڨري" } },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "carotte", qty: 2, unit: "piece" },
      { id: "celeri", qty: 1, unit: "botte" },
      { id: "tomate_pelee", qty: 1, unit: "boite" },
      { id: "concentre_tomate", qty: 2, unit: "cas" },
      { id: "lait", qty: 150, unit: "ml" },
      { id: "parmesan", qty: 80, unit: "g" },
      { id: "huile_olive", qty: 4, unit: "cas" },
      { id: "laurier", qty: 2, unit: "feuille" },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Faire fondre l'oignon, la carotte et le céleri hachés très fin dans l'huile d'olive, sans coloration.",
          ar: "خلّي البصل، السفنارية والكرافس مفرومين رقاق يذوبو في زيت الزيتون بلا ما يحمّرو.",
        },
        minutes: 12,
      },
      {
        text: {
          fr: "Ajouter la viande, l'écraser à la cuillère et la laisser colorer après évaporation de son eau.",
          ar: "زيد اللحم، اهرسو بالمغرفة وخلّيه يحمّر بعد ما ينشف ماءه.",
        },
        minutes: 12,
      },
      {
        text: {
          fr: "Verser le lait et le laisser absorber entièrement avant d'ajouter la tomate.",
          ar: "زيد الحليب وخلّيه يتشرب بالكامل قبل ما تزيد الطماطم.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Ajouter le concentré, les tomates pelées, le laurier et le sel, puis laisser mijoter à couvert au minimum.",
          ar: "زيد الطماطم المصبرة، الطماطم المقشّرة، ورق الرند والملح، وخلّيها تطيب مغطّية على أصغر نار.",
        },
        minutes: 100,
      },
      {
        text: {
          fr: "Cuire les tagliatelles al dente, les égoutter et les verser directement dans la sauteuse de ragù.",
          ar: "طيّب التالياتيلي، صفّيها وزيدها ديركت في طاجين الراڨو.",
        },
        minutes: 8,
        tip: {
          fr: "On mélange les pâtes à la sauce dans la poêle, jamais l'inverse : la sauce ne se verse pas sur une assiette de pâtes nues.",
          ar: "المقرونة تتخلّط مع الصلصة في الطاجين، موش العكس : الصلصة ما تتصبّش على مقرونة عريانة في الصحن.",
        },
      },
      {
        text: {
          fr: "Remuer une minute à feu vif avec un peu d'eau de cuisson, puis servir avec le parmesan râpé.",
          ar: "حرّك دقيقة على نار قوية مع شوية ماء الطياب، وقدّمها مع البارميزان المبشور.",
        },
        minutes: 2,
      },
    ],
    utensils: [
      { fr: "Marmite à fond épais", ar: "طنجرة قاعها غليظ" },
      { fr: "Sauteuse large", ar: "طاجين واسع" },
    ],
  },

  // ------------------------------------------------------------------ 13
  {
    slug: "tagliatelle-champignons-creme",
    name: { fr: "Tagliatelles crémeuses aux champignons", ar: "تالياتيلي بالفطر والكريمة" },
    description: {
      fr: "Champignons saisis à feu vif, crème, parmesan : trente minutes pour un plat qui a l'air d'en avoir demandé deux heures.",
      ar: "فطر محمّر على نار قوية، كريمة، بارميزان : ثلاثين دقيقة لماكلة تبان كأنها خذات ساعتين.",
    },
    region: { fr: "Nord de l'Italie", ar: "شمال إيطاليا" },
    cuisine: "italienne",
    category: "plat",
    serves: 4,
    prepMinutes: 10,
    cookMinutes: 20,
    difficulty: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["rapide", "invites", "vegetarien"],
    ingredients: [
      { id: "tagliatelle", qty: 400, unit: "g" },
      { id: "champignon", qty: 500, unit: "g" },
      { id: "creme_liquide", qty: 200, unit: "ml" },
      { id: "ail", qty: 3, unit: "gousse" },
      { id: "beurre", qty: 30, unit: "g" },
      { id: "huile_olive", qty: 2, unit: "cas" },
      { id: "parmesan", qty: 80, unit: "g" },
      { id: "persil", qty: 1, unit: "botte" },
      { id: "poivre_noir", qty: 1, unit: "cac" },
      { id: "sel", qty: 1, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Essuyer les champignons sans les laver et les couper en lamelles épaisses.",
          ar: "امسح الفطر بلا ما تغسلو وقطّعو شرايح غليظة.",
        },
        minutes: 6,
        tip: {
          fr: "Les champignons boivent l'eau comme une éponge : lavés, ils rendront leur liquide dans la poêle au lieu de dorer.",
          ar: "الفطر يشرب الماء كيف الإسفنجة : كان غسلتو، يفرّغ الماء في الطاجين بدل ما يحمّر.",
        },
      },
      {
        text: {
          fr: "Les saisir à feu vif dans le beurre et l'huile, en une seule couche et sans remuer au début, jusqu'à ce qu'ils soient bien dorés.",
          ar: "حمّرهم على نار قوية في الزبدة والزيت، طبقة وحدة وبلا ما تحرّك في البداية، حتى يحمّرو مليح.",
        },
        minutes: 8,
        tip: {
          fr: "Poêle bien chaude et pas trop chargée : entassés, les champignons bouillent au lieu de rôtir.",
          ar: "طاجين سخون وما تعمّرهش برشة : كان تكدّسو، الفطر يغلي بدل ما يحمّر.",
        },
      },
      {
        text: {
          fr: "Ajouter l'ail écrasé, saler, poivrer généreusement et laisser une minute.",
          ar: "زيد الثوم المهروس، ملّح، زيد فلفل أكحل برشة وخلّيها دقيقة.",
        },
        minutes: 2,
      },
      {
        text: {
          fr: "Verser la crème et laisser réduire jusqu'à ce qu'elle nappe la cuillère.",
          ar: "زيد الكريمة وخلّيها تنقص حتى تغطّي المغرفة.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Ajouter les tagliatelles égouttées, le parmesan et un peu d'eau de cuisson, puis remuer hors du feu.",
          ar: "زيد التالياتيلي مصفّية، البارميزان وشوية ماء الطياب، وحرّك بعيد على النار.",
        },
        minutes: 2,
      },
      {
        text: {
          fr: "Finir au persil ciselé et servir aussitôt.",
          ar: "كمّل بالمعدنوس مقطّع وقدّمها ديركت.",
        },
      },
    ],
    utensils: [
      { fr: "Grande poêle", ar: "طاجين كبير" },
      { fr: "Casserole", ar: "طنجرة" },
    ],
  },

  // ------------------------------------------------------------------ 14
  {
    slug: "gnocchi-sauce-tomate",
    name: { fr: "Gnocchi maison, sauce tomate et mozzarella", ar: "نيوكي دار بالطماطم والموزاريلا" },
    description: {
      fr: "Des gnocchi de pommes de terre roulés à la main, une sauce tomate au basilic et de la mozzarella fondue par-dessus. Un plat d'enfance, en plus riche.",
      ar: "نيوكي بالبطاطا معمولين باليد، صلصة طماطم بالحبق وموزاريلا ذايبة فوق. ماكلة الصغر، أما أدسم.",
    },
    region: { fr: "Nord de l'Italie", ar: "شمال إيطاليا" },
    cuisine: "italienne",
    category: "plat",
    serves: 4,
    prepMinutes: 45,
    cookMinutes: 30,
    difficulty: 3,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["invites", "enfants", "vegetarien"],
    ingredients: [
      { id: "pomme_de_terre", qty: 1, unit: "kg", note: { fr: "à chair farineuse", ar: "بطاطا فارينوز" } },
      { id: "farine", qty: 250, unit: "g" },
      { id: "oeuf", qty: 1, unit: "piece" },
      { id: "tomate_pelee", qty: 2, unit: "boite" },
      { id: "mozzarella", qty: 200, unit: "g" },
      { id: "parmesan", qty: 60, unit: "g" },
      { id: "ail", qty: 2, unit: "gousse" },
      { id: "basilic", qty: 1, unit: "botte" },
      { id: "huile_olive", qty: 4, unit: "cas" },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Cuire les pommes de terre entières, avec la peau, dans l'eau salée jusqu'à ce qu'un couteau les traverse sans résistance.",
          ar: "اسلق البطاطا صحيحة بقشرتها في ماء مالح حتى يدخل فيها السكين بساهل.",
        },
        minutes: 30,
        tip: {
          fr: "Avec la peau, impérativement : épluchées, elles se gorgent d'eau et il faudra ajouter tant de farine que les gnocchi deviendront du caoutchouc.",
          ar: "بقشرتها بالسيف : كان قشّرتها، تشرب الماء وتلزمك فارينة برشة والنيوكي يولّيو قاسيين.",
        },
      },
      {
        text: {
          fr: "Les éplucher encore chaudes et les écraser au presse-purée sur le plan de travail, puis laisser tiédir.",
          ar: "قشّرها وهي سخونة واهرسها على الطاولة، وخلّيها تبرد شوية.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Ajouter l'œuf battu, le sel et la farine petit à petit, en travaillant le moins possible jusqu'à obtenir une pâte souple.",
          ar: "زيد العظمة مخفوقة، الملح والفارينة شوية بشوية، واعجن أقل ما تنجّم حتى تولّي عجينة طرية.",
        },
        minutes: 8,
        tip: {
          fr: "Moins on pétrit, plus les gnocchi sont légers. La farine indiquée est un maximum, pas un objectif.",
          ar: "كل ما عجنت أقل، كل ما ولّاو النيوكي أخفّ. الفارينة المكتوبة هي الحدّ الأقصى موش هدف.",
        },
      },
      {
        text: {
          fr: "Rouler des boudins de la grosseur d'un doigt, les couper en tronçons de 2 cm et les rouler sur le dos d'une fourchette.",
          ar: "دحرج عصيّات قدّ الصبع، قطّعهم 2 سم ودحرجهم على ظهر الفرشيطة.",
        },
        minutes: 20,
      },
      {
        text: {
          fr: "Préparer la sauce : ail dans l'huile, tomates pelées écrasées, sel, et laisser réduire avec le basilic.",
          ar: "حضّر الصلصة : ثوم في الزيت، طماطم مقشّرة مهروسة، ملح، وخلّيها تنشف مع الحبق.",
        },
        minutes: 20,
      },
      {
        text: {
          fr: "Pocher les gnocchi dans l'eau bouillante salée et les retirer à l'écumoire dès qu'ils remontent à la surface.",
          ar: "اسلق النيوكي في ماء يغلي مالح ونحّيهم بالمغرفة المثقوبة كي يطلعو لفوق.",
        },
        minutes: 4,
        tip: {
          fr: "Ils remontent quand ils sont cuits : c'est le seul signal, et il ne trompe pas. Une minute de plus et ils se défont.",
          ar: "كي يطلعو لفوق يكونو طابو : هاذي العلامة الوحيدة وما تغلطش. دقيقة زايدة ويتفكّكو.",
        },
      },
      {
        text: {
          fr: "Les mélanger à la sauce, couvrir de mozzarella et de parmesan, et passer sous le gril jusqu'à ce que le fromage dore.",
          ar: "خلّطهم مع الصلصة، غطّيهم بالموزاريلا والبارميزان، وحطّهم تحت الشوّاية حتى يحمّر الجبن.",
        },
        minutes: 8,
      },
    ],
    utensils: [
      { fr: "Presse-purée", ar: "هرّاسة" },
      { fr: "Écumoire", ar: "مغرفة مثقوبة" },
      { fr: "Plat à gratin", ar: "صحن فرن" },
    ],
  },

  // ------------------------------------------------------------------ 15
  {
    slug: "risotto-champignons",
    name: { fr: "Risotto aux champignons", ar: "ريزوتو بالفطر" },
    description: {
      fr: "Vingt minutes à remuer sans s'éloigner, et le riz devient une crème. Sans vin : le bouillon et un trait de citron en fin de cuisson font le travail.",
      ar: "عشرين دقيقة تحرّك بلا ما تبعّد، والروز يولّي كريمة. بلا نبيذ : المرقة وشوية قارص في الآخر يعملو الخدمة.",
    },
    region: { fr: "Milan", ar: "ميلانو" },
    cuisine: "italienne",
    category: "plat",
    serves: 4,
    prepMinutes: 10,
    cookMinutes: 30,
    difficulty: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["invites", "vegetarien"],
    ingredients: [
      { id: "riz", qty: 350, unit: "g", note: { fr: "à grains ronds", ar: "روز حبّتو مدوّرة" } },
      { id: "champignon", qty: 400, unit: "g" },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "beurre", qty: 60, unit: "g" },
      { id: "parmesan", qty: 80, unit: "g" },
      { id: "huile_olive", qty: 2, unit: "cas" },
      { id: "citron", qty: 1, unit: "piece" },
      { id: "persil", qty: 1, unit: "botte" },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Porter 1,5 litre d'eau salée à frémissement et la garder chaude à côté : c'est le bouillon.",
          ar: "خلّي 1.5 لتر ماء مالح يسخن وخلّيه سخون على جنب : هاذي المرقة.",
        },
        minutes: 8,
        tip: {
          fr: "Le bouillon doit rester chaud. Froid, il stoppe la cuisson à chaque louche et le riz cuit en dents de scie.",
          ar: "المرقة تبقى سخونة. كان باردة، توقّف الطياب في كل مغرفة والروز يطيب متفاوت.",
        },
      },
      {
        text: {
          fr: "Faire dorer les champignons en lamelles à feu vif dans l'huile, saler et les réserver.",
          ar: "حمّر الفطر مقطّع شرايح على نار قوية في الزيت، ملّح ونحّيه على جنب.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Faire fondre l'oignon haché dans la moitié du beurre, puis ajouter le riz et le remuer jusqu'à ce que les grains deviennent translucides sur les bords.",
          ar: "خلّي البصل المفروم يذوب في نص الزبدة، زيد الروز وحرّك حتى تولّي الحبّة شفّافة من الأطراف.",
        },
        minutes: 4,
      },
      {
        text: {
          fr: "Ajouter le bouillon une louche à la fois, en remuant, et n'en remettre que lorsque la précédente est absorbée.",
          ar: "زيد المرقة مغرفة بمغرفة وأنت تحرّك، وما تزيدش الجاية كان ما تشربتش اللي قبلها.",
        },
        minutes: 18,
        tip: {
          fr: "C'est le frottement des grains qui libère l'amidon et crée la crème : sans remuer, on obtient du riz au bouillon.",
          ar: "احتكاك الحبّات هو اللي يخرّج النشا ويعمل الكريمة : بلا تحريك، يجيك روز بالمرقة برك.",
        },
      },
      {
        text: {
          fr: "Hors du feu, ajouter le reste du beurre froid, le parmesan et les champignons, puis battre vigoureusement.",
          ar: "بعيد على النار، زيد باقي الزبدة الباردة، البارميزان والفطر، وحرّك بقوة.",
        },
        minutes: 2,
        tip: {
          fr: "Beurre froid hors du feu, battu énergiquement : c'est cette étape qui rend le risotto onctueux, pas la crème.",
          ar: "زبدة باردة بعيد على النار وتحريك بقوة : هاذي الخطوة اللي تعطي النعومة، موش الكريمة.",
        },
      },
      {
        text: {
          fr: "Ajouter quelques gouttes de citron, rectifier le sel et servir immédiatement : un risotto n'attend pas.",
          ar: "زيد نقاط قارص، عدّل الملح وقدّمو ديركت : الريزوتو ما يستنّاش.",
        },
      },
    ],
    utensils: [
      { fr: "Sauteuse large", ar: "طاجين واسع" },
      { fr: "Casserole pour le bouillon", ar: "طنجرة للمرقة" },
    ],
    tips: [
      {
        fr: "Le riz italien à grains ronds donne le meilleur résultat ; à défaut, un riz rond ordinaire convient — évitez seulement le riz long, qui ne libère pas assez d'amidon.",
        ar: "الروز الإيطالي المدوّر أحسن حاجة ؛ وإلا الروز المدوّر العادي يمشي — تجنّب الروز الطويل برك، ما يخرّجش نشا بركة.",
      },
    ],
  },

  // ------------------------------------------------------------------ 16
  {
    slug: "escalope-milanaise",
    name: { fr: "Escalope milanaise", ar: "سكالوب ميلانيز" },
    description: {
      fr: "Panée, dorée au beurre, servie avec un quartier de citron. Trente minutes, et les enfants finissent leur assiette.",
      ar: "مغلّفة بالبقسماط، محمّرة بالزبدة، مع قطعة قارص. ثلاثين دقيقة، والصغار يكمّلو صحنهم.",
    },
    region: { fr: "Milan", ar: "ميلانو" },
    cuisine: "italienne",
    category: "plat",
    serves: 4,
    prepMinutes: 15,
    cookMinutes: 15,
    difficulty: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["rapide", "enfants"],
    ingredients: [
      { id: "escalope_dinde", qty: 600, unit: "g" },
      { id: "oeuf", qty: 2, unit: "piece" },
      { id: "chapelure", qty: 150, unit: "g" },
      { id: "farine", qty: 80, unit: "g" },
      { id: "parmesan", qty: 40, unit: "g", optional: true },
      { id: "beurre", qty: 60, unit: "g" },
      { id: "huile_vegetale", qty: 100, unit: "ml" },
      { id: "citron", qty: 1, unit: "piece" },
      { id: "sel", qty: 1, unit: "cac" },
      { id: "poivre_noir", qty: 1, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Aplatir les escalopes entre deux feuilles de papier jusqu'à une épaisseur régulière d'un demi-centimètre.",
          ar: "افرد السكالوب بين ورقتين حتى يولّي سمكو متساوي نص سنتيمتر.",
        },
        minutes: 8,
        tip: {
          fr: "Une épaisseur régulière, c'est une cuisson régulière : sinon les bords sont secs quand le centre est encore cru.",
          ar: "سمك متساوي يعني طياب متساوي : وإلا الأطراف تنشف والوسط يبقى نيّ.",
        },
      },
      {
        text: {
          fr: "Préparer trois assiettes : farine salée et poivrée, œufs battus, chapelure mélangée au parmesan.",
          ar: "حضّر ثلاثة صحون : فارينة بالملح والفلفل، عظم مخفوق، وبقسماط مخلّط بالبارميزان.",
        },
        minutes: 4,
      },
      {
        text: {
          fr: "Passer chaque escalope dans la farine, puis l'œuf, puis la chapelure en appuyant bien pour la faire adhérer.",
          ar: "مرّر كل سكالوب في الفارينة، بعد العظم، بعد البقسماط واضغط مليح باش يلزق.",
        },
        minutes: 6,
      },
      {
        text: {
          fr: "Chauffer l'huile avec le beurre et cuire les escalopes 3 minutes de chaque côté, sans surcharger la poêle.",
          ar: "سخّن الزيت مع الزبدة وطيّب السكالوب 3 دقائق من كل جيهة، بلا ما تعمّر الطاجين.",
        },
        minutes: 12,
        tip: {
          fr: "Le beurre seul brûlerait ; mêlé à l'huile, il donne le goût sans noircir.",
          ar: "الزبدة وحدها تتحرق ؛ مخلّطة بالزيت، تعطي الذوق بلا ما تكحّل.",
        },
      },
      {
        text: {
          fr: "Égoutter sur du papier absorbant et servir aussitôt avec des quartiers de citron.",
          ar: "صفّيها في ورق وقدّمها ديركت مع قطع القارص.",
        },
      },
    ],
    utensils: [
      { fr: "Grande poêle", ar: "طاجين كبير" },
      { fr: "Maillet ou rouleau", ar: "مطرقة ولا نشّابة" },
    ],
  },

  // ------------------------------------------------------------------ 17
  {
    slug: "pasta-al-forno",
    name: { fr: "Pâtes au four gratinées", ar: "مقرونة في الفرن ڨراتان" },
    description: {
      fr: "Le plat du dimanche : des pâtes courtes, du ragù, de la béchamel et une croûte de fromage. C'est le cousin direct de la makrouna qu'on fait déjà ici.",
      ar: "ماكلة نهار الأحد : مقرونة قصيرة، راڨو، بشاميل وقشرة جبن. هي بنت عم المقرونة اللي نعملوها هنا.",
    },
    region: { fr: "Sud de l'Italie", ar: "جنوب إيطاليا" },
    cuisine: "italienne",
    category: "plat",
    serves: 6,
    prepMinutes: 25,
    cookMinutes: 70,
    difficulty: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["invites", "enfants", "batch"],
    ingredients: [
      { id: "pates_makrouna", qty: 500, unit: "g" },
      { id: "viande_hachee", qty: 500, unit: "g", note: { fr: "bœuf", ar: "لحم بڨري" } },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "tomate_pelee", qty: 2, unit: "boite" },
      { id: "concentre_tomate", qty: 2, unit: "cas" },
      { id: "lait", qty: 600, unit: "ml" },
      { id: "beurre", qty: 60, unit: "g" },
      { id: "farine", qty: 60, unit: "g" },
      { id: "muscade", qty: 1, unit: "pincee" },
      { id: "mozzarella", qty: 200, unit: "g" },
      { id: "parmesan", qty: 80, unit: "g" },
      { id: "huile_olive", qty: 3, unit: "cas" },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Faire revenir l'oignon puis la viande dans l'huile, ajouter le concentré et les tomates pelées, saler et laisser mijoter.",
          ar: "شوّح البصل بعد اللحم في الزيت، زيد الطماطم المصبرة والمقشّرة، ملّح وخلّيها تطيب.",
        },
        minutes: 40,
      },
      {
        text: {
          fr: "Préparer la béchamel : beurre fondu, farine cuite 2 minutes, puis lait chaud versé en fouettant. Saler et muscader.",
          ar: "حضّر البشاميل : زبدة ذايبة، فارينة تطيب دقيقتين، بعد حليب سخون وأنت تخفق. ملّح وزيد جوزة الطيب.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Cuire les pâtes très fermes — 3 minutes de moins que le temps indiqué — puis les égoutter.",
          ar: "طيّب المقرونة قاسية برشة — 3 دقائق أقل من الوقت المكتوب — وصفّيها.",
        },
        minutes: 8,
        tip: {
          fr: "Elles finiront de cuire au four en absorbant la sauce. Cuites à point ici, elles ressortiraient en bouillie.",
          ar: "تكمّل طياب في الفرن وهي تشرب الصلصة. كان طيّبتها كامل هنا، تخرج مهروسة.",
        },
      },
      {
        text: {
          fr: "Mélanger les pâtes au ragù et à la moitié de la béchamel, puis verser dans un plat beurré.",
          ar: "خلّط المقرونة مع الراڨو ونص البشاميل، وفرّغها في صحن مدهون بالزبدة.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Couvrir du reste de béchamel, de mozzarella et de parmesan, et enfourner à 190 °C jusqu'à formation d'une croûte dorée.",
          ar: "غطّيها بباقي البشاميل، الموزاريلا والبارميزان، وحطّها في الفرن على 190 درجة حتى تولّي قشرة محمّرة.",
        },
        minutes: 30,
      },
      {
        text: {
          fr: "Laisser reposer 10 minutes avant de servir, pour que les parts se tiennent.",
          ar: "خلّيها ترتاح 10 دقائق قبل التقديم، باش تشدّ القطع.",
        },
        minutes: 10,
      },
    ],
    utensils: [
      { fr: "Grand plat à gratin", ar: "صحن فرن كبير" },
      { fr: "Fouet", ar: "خفّاقة" },
    ],
  },

  // ------------------------------------------------------------------ 18
  {
    slug: "panna-cotta",
    name: { fr: "Panna cotta au coulis", ar: "بانّا كوتّا بالكوليس" },
    description: {
      fr: "Trois ingrédients, dix minutes de travail, et un dessert de restaurant. Toute la difficulté tient dans la dose de gélatine.",
      ar: "ثلاث مقادير، عشر دقائق خدمة، وحلو متاع ريستوران. الصعوبة الوحيدة هي قدّ الجيلاتين.",
    },
    region: { fr: "Piémont", ar: "بييمونتي" },
    cuisine: "italienne",
    category: "dessert",
    serves: 6,
    prepMinutes: 15,
    cookMinutes: 10,
    difficulty: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["invites", "enfants"],
    ingredients: [
      { id: "creme_liquide", qty: 500, unit: "ml" },
      { id: "lait", qty: 100, unit: "ml" },
      { id: "sucre", qty: 80, unit: "g" },
      { id: "gelatine", qty: 4, unit: "piece" },
      { id: "vanille", qty: 2, unit: "piece" },
      { id: "citron", qty: 1, unit: "piece" },
      { id: "grenade", qty: 200, unit: "g", optional: true, note: { fr: "ou fraises, selon la saison", ar: "ولا فراولة، حسب الفصل" } },
    ],
    steps: [
      {
        text: {
          fr: "Faire ramollir les feuilles de gélatine dans un bol d'eau très froide.",
          ar: "خلّي أوراق الجيلاتين تليّن في زلافة ماء بارد برشة.",
        },
        minutes: 6,
      },
      {
        text: {
          fr: "Chauffer la crème, le lait, le sucre et le sucre vanillé sans jamais laisser bouillir.",
          ar: "سخّن الكريمة، الحليب، السكر والسكر بالفانيلا بلا ما تخلّيهم يغليو.",
        },
        minutes: 6,
        tip: {
          fr: "À ébullition, la crème tranche et le dessert devient granuleux : coupez le feu dès que ça frémit sur les bords.",
          ar: "كان غلات، الكريمة تتقطّع والحلو يولّي محبّب : طفي النار كي تبدا تتحرّك في الأطراف.",
        },
      },
      {
        text: {
          fr: "Hors du feu, essorer la gélatine entre les mains et la dissoudre complètement dans la crème chaude.",
          ar: "بعيد على النار، اعصر الجيلاتين بيديك وذوّبو بالكامل في الكريمة السخونة.",
        },
        minutes: 3,
        tip: {
          fr: "Quatre feuilles pour 600 ml donnent une prise tout juste tremblante. Plus, et vous obtenez un flan caoutchouteux.",
          ar: "أربعة أوراق لـ600 مل تعطي شدّة ترجرج بالكاد. أكثر، ويولّي كيف الفلان القاسي.",
        },
      },
      {
        text: {
          fr: "Répartir dans les verrines et réfrigérer au moins 4 heures.",
          ar: "وزّعها في الكيسان وحطّها في الفريجيدار 4 سوايع على الأقل.",
        },
        minutes: 240,
      },
      {
        text: {
          fr: "Écraser les fruits avec un peu de sucre et de jus de citron, puis en napper chaque verrine au moment de servir.",
          ar: "اهرس الغلّة مع شوية سكر وعصير قارص، وحطّها فوق كل كاس وقت التقديم.",
        },
        minutes: 5,
      },
    ],
    utensils: [
      { fr: "Casserole", ar: "طنجرة" },
      { fr: "Verrines", ar: "كيسان" },
    ],
  },
];
