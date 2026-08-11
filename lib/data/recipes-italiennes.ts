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
      { id: "parmesan", qty: 30, unit: "g", optional: true },
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
          fr: "Hors du feu, ajouter le persil ciselé et servir immédiatement, avec du parmesan si vous en avez.",
          ar: "بعيد على النار، زيد المعدنوس مقطّع وقدّمها ديركت، مع البارميزان كان عندك.",
        },
      },
    ],
    utensils: [
      { fr: "Grande casserole", ar: "طنجرة كبيرة" },
      { fr: "Poêle large", ar: "طاجين واسع" },
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
      { id: "sardine", qty: 600, unit: "g", note: { fr: "en filets, sans arêtes", ar: "فيليه بلا عظام" } },
      { id: "fenouil", qty: 1, unit: "piece" },
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
      { id: "oeuf", qty: 3, unit: "piece", note: { fr: "jaunes + 1 œuf entier", ar: "الأصفر + عظمة كاملة" } },
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
          fr: "Battre les œufs avec le parmesan râpé et beaucoup de poivre noir, jusqu'à obtenir une crème épaisse.",
          ar: "اخفق العظم مع البارميزان المبشور وبرشة فلفل أكحل، حتى تولّي كريمة ثخينة.",
        },
        minutes: 4,
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
      { id: "creme_fraiche", qty: 200, unit: "ml" },
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
          fr: "Incorporer la ricotta bien égouttée, puis la crème fouettée, en soulevant délicatement la masse.",
          ar: "زيد الريكوتا مصفّية مليح، بعد الكريمة المخفوقة، وحرّك من التحت للفوق بالشوية.",
        },
        minutes: 6,
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
];
