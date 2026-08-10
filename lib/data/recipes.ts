import type { Recipe } from "@/lib/types";

/**
 * Répertoire de plats tunisiens du quotidien.
 *
 * Les quantités sont données pour `serves` personnes ; l'application les
 * remet à l'échelle du nombre de convives. Les identifiants d'ingrédients
 * renvoient au catalogue `lib/data/ingredients.ts`.
 */
export const RECIPES: Recipe[] = [
  // ------------------------------------------------------------------ 1
  {
    slug: "kosksi-bel-allouch",
    name: { fr: "Couscous à l'agneau", ar: "كسكسي بالعلوش" },
    description: {
      fr: "Le plat du vendredi : semoule vapeur, agneau mijoté et légumes de saison dans une sauce rouge parfumée au tabel.",
      ar: "ماكلة نهار الجمعة : سميد مبخّر، لحم علوش وخضرة في مرقة حمراء بالتابل.",
    },
    region: { fr: "Toute la Tunisie", ar: "تونس الكل" },
    category: "plat",
    serves: 4,
    prepMinutes: 30,
    cookMinutes: 90,
    difficulty: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["plat_unique", "invites"],
    ingredients: [
      { id: "semoule_couscous", qty: 500, unit: "g" },
      { id: "agneau", qty: 600, unit: "g" },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "concentre_tomate", qty: 2, unit: "cas" },
      { id: "pois_chiche_sec", qty: 100, unit: "g", note: { fr: "trempés la veille", ar: "منقوعين من البارح" } },
      { id: "carotte", qty: 3, unit: "piece" },
      { id: "pomme_de_terre", qty: 2, unit: "piece" },
      { id: "courgette", qty: 2, unit: "piece" },
      { id: "navet", qty: 2, unit: "piece", optional: true },
      { id: "potiron", qty: 200, unit: "g", optional: true },
      { id: "piment_fort", qty: 2, unit: "piece" },
      { id: "huile_olive", qty: 80, unit: "ml" },
      { id: "tabel", qty: 1, unit: "cas" },
      { id: "harissa", qty: 1, unit: "cas" },
      { id: "curcuma", qty: 1, unit: "cac" },
      { id: "piment_moulu", qty: 1, unit: "cac" },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Faire revenir l'oignon émincé dans l'huile d'olive au fond du couscoussier, puis ajouter la viande coupée en morceaux et la saisir sur toutes ses faces.",
          ar: "شوّح البصل المقطّع في زيت الزيتون في قاع الكسكاس، زيد اللحم مقطّع وحمّرو من الجوانب الكل.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Ajouter le concentré de tomate, la harissa, le tabel, le curcuma et le piment moulu. Remuer 2 minutes pour cuire les épices.",
          ar: "زيد الطماطم المصبرة، الهريسة، التابل، الخرقوم والفلفل الأحمر. حرّك دقيقتين باش تطيب التوابل.",
        },
        minutes: 2,
        tip: {
          fr: "Cuire le concentré de tomate avant d'ajouter l'eau enlève son goût acide.",
          ar: "طياب الطماطم قبل ما تزيد الما ينحّي الحموضة.",
        },
      },
      {
        text: {
          fr: "Mouiller avec 1,5 litre d'eau, ajouter les pois chiches, saler et porter à ébullition.",
          ar: "زيد لتر ونصف ماء، الحمص، الملح وخلّيها تغلي.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Humidifier la semoule avec un peu d'eau salée et de l'huile, l'aérer entre les mains, puis la placer dans le haut du couscoussier dès que la vapeur monte.",
          ar: "بلّل السميد بشوية ماء مالح وزيت، فركو بيديك، وحطّو في فوق الكسكاس كي يطلع البخار.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Cuire la semoule 20 minutes à la vapeur, la retirer, l'arroser d'un peu de bouillon, l'aérer et la remettre pour un deuxième passage de 20 minutes.",
          ar: "بخّر السميد 20 دقيقة، نحّيه، رشّو بشوية مرقة، فركو وردّو 20 دقيقة أخرى.",
        },
        minutes: 40,
        tip: {
          fr: "Deux passages à la vapeur : c'est ce qui donne des grains détachés et non collants.",
          ar: "زوز مرّات في البخار هوما اللي يخلّيو الحبّة تتفرّق.",
        },
      },
      {
        text: {
          fr: "Après 45 minutes de cuisson de la sauce, ajouter les carottes et les navets, puis 10 minutes plus tard les pommes de terre, les courgettes, le potiron et les piments.",
          ar: "بعد 45 دقيقة من طياب المرقة، زيد السفنارية واللفت، وبعد 10 دقائق زيد البطاطا، القرعة الخضراء، القرعة الحمراء والفلفل.",
        },
        minutes: 25,
      },
      {
        text: {
          fr: "Verser la semoule dans un grand plat, l'arroser progressivement de sauce en mélangeant, puis dresser la viande et les légumes par-dessus.",
          ar: "فرّغ السميد في صحن كبير، بلّلو بالمرقة شوية بشوية، وحطّ اللحم والخضرة فوقو.",
        },
        minutes: 5,
      },
    ],
    utensils: [
      { fr: "Couscoussier", ar: "كسكاس" },
      { fr: "Grand plat de service", ar: "صحن كبير" },
      { fr: "Passoire", ar: "مصفاة" },
    ],
    tips: [
      {
        fr: "Réservez un peu de bouillon à part : chacun ajuste son assiette selon son goût.",
        ar: "خلّي شوية مرقة على جنب، كل واحد يزيد على كيفو.",
      },
      {
        fr: "Le couscous est encore meilleur réchauffé le lendemain à la vapeur.",
        ar: "الكسكسي يجي أطيب غدوة كي تسخّنو في البخار.",
      },
    ],
  },

  // ------------------------------------------------------------------ 2
  {
    slug: "kosksi-bel-hout",
    name: { fr: "Couscous au poisson", ar: "كسكسي بالحوت" },
    description: {
      fr: "La version côtière du couscous : mulet ou dorade pochés dans une sauce safranée, servis sur semoule fine.",
      ar: "كسكسي السواحل : بوري ولا ورقة في مرقة، فوق سميد رقيق.",
    },
    region: { fr: "Sfax, Bizerte, Kerkennah", ar: "صفاقس، بنزرت، قرقنة" },
    category: "plat",
    serves: 4,
    prepMinutes: 25,
    cookMinutes: 60,
    difficulty: 2,
    months: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
    tags: ["plat_unique", "invites"],
    ingredients: [
      { id: "semoule_couscous", qty: 500, unit: "g" },
      { id: "mulet", qty: 800, unit: "g", note: { fr: "en tranches épaisses", ar: "مقطّع شرايح" } },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "concentre_tomate", qty: 2, unit: "cas" },
      { id: "pois_chiche_sec", qty: 100, unit: "g" },
      { id: "pomme_de_terre", qty: 2, unit: "piece" },
      { id: "carotte", qty: 2, unit: "piece" },
      { id: "courgette", qty: 2, unit: "piece" },
      { id: "piment_fort", qty: 2, unit: "piece" },
      { id: "huile_olive", qty: 80, unit: "ml" },
      { id: "tabel", qty: 1, unit: "cas" },
      { id: "curcuma", qty: 1, unit: "cac" },
      { id: "harissa", qty: 1, unit: "cas" },
      { id: "citron", qty: 1, unit: "piece" },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Nettoyer le poisson, le frotter au sel et au citron, puis le réserver au frais.",
          ar: "نظّف الحوت، دلّكو بالملح والقارص، وحطّو في الفريجيدار.",
        },
        minutes: 10,
        tip: {
          fr: "Le citron enlève l'odeur forte et raffermit la chair.",
          ar: "القارص ينحّي الريحة ويشدّ اللحم.",
        },
      },
      {
        text: {
          fr: "Préparer la sauce : oignon dans l'huile, concentré de tomate, harissa, tabel et curcuma, puis 1,2 litre d'eau et les pois chiches.",
          ar: "حضّر المرقة : بصل في الزيت، طماطم مصبرة، هريسة، تابل وخرقوم، بعد زيد 1.2 لتر ماء والحمص.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Mettre la semoule à la vapeur pendant 20 minutes, l'aérer, l'humidifier et la remettre 20 minutes.",
          ar: "بخّر السميد 20 دقيقة، فركو، بلّلو وردّو 20 دقيقة.",
        },
        minutes: 40,
      },
      {
        text: {
          fr: "Ajouter les légumes dans la sauce et laisser cuire 20 minutes.",
          ar: "زيد الخضرة في المرقة وخلّيها تطيب 20 دقيقة.",
        },
        minutes: 20,
      },
      {
        text: {
          fr: "Déposer délicatement les tranches de poisson dans la sauce frémissante et cuire 12 minutes sans remuer.",
          ar: "حطّ شرايح الحوت في المرقة بالشوية وطيّب 12 دقيقة بلا ما تحرّك.",
        },
        minutes: 12,
        tip: {
          fr: "Ne jamais remuer le poisson dans la sauce : il se briserait. Secouez la casserole si besoin.",
          ar: "ما تحرّكش الحوت في المرقة، يتهرّس. هزّ الطنجرة برك.",
        },
      },
      {
        text: {
          fr: "Dresser la semoule, l'arroser de sauce, puis poser le poisson et les légumes dessus. Servir avec des quartiers de citron.",
          ar: "حطّ السميد، بلّلو بالمرقة، وحطّ الحوت والخضرة فوقو. قدّمو مع القارص.",
        },
        minutes: 5,
      },
    ],
    utensils: [
      { fr: "Couscoussier", ar: "كسكاس" },
      { fr: "Écumoire", ar: "مغرفة مثقوبة" },
    ],
  },

  // ------------------------------------------------------------------ 3
  {
    slug: "ojja-merguez",
    name: { fr: "Ojja aux merguez", ar: "عجّة مرڨاز" },
    description: {
      fr: "Œufs pochés dans une sauce tomate épicée aux merguez. Le dîner rapide par excellence, mangé directement à la poêle avec du pain.",
      ar: "عظم في صلصة حارّة بالمرڨاز. عشاء سريع، ياكلوه من الطاجين بالخبز.",
    },
    category: "plat",
    serves: 2,
    prepMinutes: 10,
    cookMinutes: 20,
    difficulty: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["rapide", "economique", "plat_unique"],
    ingredients: [
      { id: "merguez", qty: 250, unit: "g" },
      { id: "oeuf", qty: 4, unit: "piece" },
      { id: "tomate", qty: 3, unit: "piece" },
      { id: "poivron_vert", qty: 2, unit: "piece" },
      { id: "ail", qty: 3, unit: "gousse" },
      { id: "concentre_tomate", qty: 1, unit: "cas" },
      { id: "harissa", qty: 1, unit: "cac" },
      { id: "huile_olive", qty: 3, unit: "cas" },
      { id: "tabel", qty: 1, unit: "cac" },
      { id: "sel", qty: 1, unit: "cac" },
      { id: "pain", qty: 1, unit: "piece" },
    ],
    steps: [
      {
        text: {
          fr: "Faire dorer les merguez coupées en tronçons dans une poêle avec un filet d'huile, puis les réserver.",
          ar: "حمّر المرڨاز مقطّع في الطاجين بشوية زيت، ونحّيه على جنب.",
        },
        minutes: 6,
      },
      {
        text: {
          fr: "Dans la même poêle, faire revenir l'ail écrasé et les poivrons coupés en dés.",
          ar: "في نفس الطاجين، شوّح الثوم المهروس والفلفل مقطّع.",
        },
        minutes: 4,
      },
      {
        text: {
          fr: "Ajouter les tomates râpées, le concentré, la harissa et le tabel. Laisser réduire jusqu'à ce que l'huile remonte.",
          ar: "زيد الطماطم المبشورة، الطماطم المصبرة، الهريسة والتابل. خلّيها تنشف حتى يطلع الزيت.",
        },
        minutes: 8,
        tip: {
          fr: "L'huile qui remonte à la surface, c'est le signe que la sauce est prête.",
          ar: "كي يطلع الزيت لفوق، الصلصة وليّت حاضرة.",
        },
      },
      {
        text: {
          fr: "Remettre les merguez, creuser des puits dans la sauce et y casser les œufs.",
          ar: "ردّ المرڨاز، اعمل حفر في الصلصة وكسّر العظم فيهم.",
        },
        minutes: 1,
      },
      {
        text: {
          fr: "Couvrir et cuire à feu doux jusqu'à ce que le blanc soit pris et le jaune encore coulant.",
          ar: "غطّي وطيّب على نار هادية حتى يشدّ الأبيض ويبقى الأصفر سايل.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Servir aussitôt dans la poêle, avec du pain pour saucer.",
          ar: "قدّمها في الطاجين ديركت، مع الخبز.",
        },
      },
    ],
    utensils: [
      { fr: "Poêle avec couvercle", ar: "طاجين بغطاء" },
      { fr: "Râpe", ar: "مبشرة" },
    ],
    tips: [
      {
        fr: "Sans merguez, l'ojja se fait aussi très bien avec du thon en boîte ou juste des légumes.",
        ar: "بلا مرڨاز، العجّة تجي باهية بالطن المعلب ولا بالخضرة برك.",
      },
    ],
  },

  // ------------------------------------------------------------------ 4
  {
    slug: "mloukhia",
    name: { fr: "Mloukhia", ar: "ملوخية" },
    description: {
      fr: "Ragoût vert très longuement mijoté à base de poudre de corète, avec du bœuf fondant. Un plat de patience, cuisiné pour les grandes occasions.",
      ar: "مرقة خضراء تطيب برشة وقت بالملوخية واللحم البڨري. ماكلة الصبر، تتعمل للمناسبات.",
    },
    region: { fr: "Tunis, Nabeul", ar: "تونس، نابل" },
    category: "plat",
    serves: 4,
    prepMinutes: 15,
    cookMinutes: 210,
    difficulty: 3,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["invites", "batch"],
    ingredients: [
      { id: "mloukhia_poudre", qty: 150, unit: "g" },
      { id: "boeuf", qty: 700, unit: "g", note: { fr: "en gros cubes", ar: "مقطّع كبير" } },
      { id: "huile_olive", qty: 200, unit: "ml" },
      { id: "ail", qty: 6, unit: "gousse" },
      { id: "laurier", qty: 3, unit: "feuille" },
      { id: "coriandre_moulue", qty: 1, unit: "cac" },
      { id: "piment_moulu", qty: 1, unit: "cac" },
      { id: "sel", qty: 2, unit: "cac" },
      { id: "citron", qty: 1, unit: "piece" },
      { id: "pain", qty: 2, unit: "piece" },
    ],
    steps: [
      {
        text: {
          fr: "Délayer la poudre de mloukhia dans un peu d'eau froide jusqu'à obtenir une pâte lisse, sans grumeaux.",
          ar: "ذوّب الملوخية في شوية ماء بارد حتى تولّي عجينة ملسة بلا كتل.",
        },
        minutes: 5,
        tip: {
          fr: "Toujours délayer à l'eau froide : à l'eau chaude, la poudre fait des grumeaux impossibles à rattraper.",
          ar: "ذوّبها بالماء البارد ديما، بالسخون تعمل كتل ما تتحلّش.",
        },
      },
      {
        text: {
          fr: "Chauffer l'huile d'olive dans une marmite à fond épais et y verser la pâte de mloukhia. Remuer sans arrêt à feu moyen.",
          ar: "سخّن زيت الزيتون في طنجرة قاعها غليظ وزيد عجينة الملوخية. حرّك بلا توقّف على نار متوسطة.",
        },
        minutes: 15,
      },
      {
        text: {
          fr: "Continuer de remuer jusqu'à ce que la mloukhia fonce et passe du vert clair au vert très sombre, presque noir.",
          ar: "كمّل حرّك حتى تولّي الملوخية خضراء غامقة، تقريب كحلة.",
        },
        minutes: 20,
        tip: {
          fr: "C'est l'étape qui fait tout le goût. Si ça accroche, baissez le feu, n'ajoutez pas d'eau tout de suite.",
          ar: "هاذي المرحلة اللي تعطي الذوق. كان تلزق، نقّص النار، ما تزيدش ماء توّا.",
        },
      },
      {
        text: {
          fr: "Ajouter l'ail, le laurier, la coriandre et le piment, puis mouiller petit à petit avec 1,5 litre d'eau chaude en remuant.",
          ar: "زيد الثوم، ورق الرند، القزبر والفلفل، وبلّل شوية بشوية بـ1.5 لتر ماء سخون وأنت تحرّك.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Ajouter la viande, saler et laisser mijoter à couvert à tout petit feu pendant 2h30 à 3h.",
          ar: "زيد اللحم، ملّح وخلّيها تطيب مغطّية على نار صغيرة 2:30 لـ3 سوايع.",
        },
        minutes: 165,
      },
      {
        text: {
          fr: "La mloukhia est prête quand une couche d'huile brillante remonte à la surface et que la viande se défait à la cuillère.",
          ar: "الملوخية تولّي حاضرة كي يطلع الزيت لفوق واللحم يتفكّك بالمغرفة.",
        },
      },
      {
        text: {
          fr: "Servir avec du pain et un filet de citron.",
          ar: "قدّمها بالخبز وشوية قارص.",
        },
      },
    ],
    utensils: [
      { fr: "Marmite à fond épais", ar: "طنجرة قاعها غليظ" },
      { fr: "Cuillère en bois", ar: "مغرفة خشب" },
    ],
    tips: [
      {
        fr: "Préparez-en une grande quantité : la mloukhia se bonifie et se congèle très bien.",
        ar: "اعمل كمية كبيرة، الملوخية تتحسّن وتتجمّد مليح.",
      },
    ],
  },

  // ------------------------------------------------------------------ 5
  {
    slug: "marqet-jelbana",
    name: { fr: "Marqa de petits pois", ar: "مرقة جلبانة" },
    description: {
      fr: "Ragoût de petits pois printaniers aux artichauts ou aux pommes de terre, relevé au tabel. Le plat du printemps tunisien.",
      ar: "مرقة جلبانة بالبطاطا، بالتابل. ماكلة الربيع في تونس.",
    },
    category: "plat",
    serves: 4,
    prepMinutes: 20,
    cookMinutes: 45,
    difficulty: 1,
    months: [2, 3, 4, 5],
    tags: ["economique", "enfants"],
    ingredients: [
      { id: "petit_pois", qty: 1, unit: "kg", note: { fr: "à écosser", ar: "تتقشّر" } },
      { id: "poulet_morceaux", qty: 500, unit: "g" },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "pomme_de_terre", qty: 3, unit: "piece" },
      { id: "concentre_tomate", qty: 1, unit: "cas" },
      { id: "huile_olive", qty: 4, unit: "cas" },
      { id: "tabel", qty: 1, unit: "cac" },
      { id: "curcuma", qty: 1, unit: "cac" },
      { id: "citron", qty: 1, unit: "piece" },
      { id: "persil", qty: 1, unit: "botte" },
      { id: "sel", qty: 1, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Écosser les petits pois et couper les pommes de terre en gros cubes.",
          ar: "قشّر الجلبانة وقطّع البطاطا كبير.",
        },
        minutes: 15,
      },
      {
        text: {
          fr: "Faire revenir l'oignon et le poulet dans l'huile d'olive jusqu'à coloration.",
          ar: "شوّح البصل والدجاج في زيت الزيتون حتى يحمّر.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Ajouter le concentré de tomate (peu, la sauce doit rester claire), le tabel et le curcuma.",
          ar: "زيد شوية طماطم مصبرة برك (المرقة تبقى صافية)، التابل والخرقوم.",
        },
        minutes: 2,
        tip: {
          fr: "La marqa de petits pois est une sauce blanche-jaune, pas rouge : allez-y doucement sur la tomate.",
          ar: "مرقة الجلبانة صفراء موش حمراء، خفّف على الطماطم.",
        },
      },
      {
        text: {
          fr: "Mouiller avec 700 ml d'eau, saler et laisser cuire 20 minutes à couvert.",
          ar: "زيد 700 مل ماء، ملّح وخلّيها تطيب 20 دقيقة مغطّية.",
        },
        minutes: 20,
      },
      {
        text: {
          fr: "Ajouter les petits pois et les pommes de terre, puis poursuivre la cuisson 20 minutes.",
          ar: "زيد الجلبانة والبطاطا وكمّل الطياب 20 دقيقة.",
        },
        minutes: 20,
      },
      {
        text: {
          fr: "Hors du feu, ajouter le persil ciselé et un filet de jus de citron.",
          ar: "نحّيها من النار، زيد المعدنوس مقطّع وشوية عصير قارص.",
        },
      },
    ],
    utensils: [{ fr: "Marmite", ar: "طنجرة" }],
  },

  // ------------------------------------------------------------------ 6
  {
    slug: "kafteji",
    name: { fr: "Kafteji", ar: "كفتاجي" },
    description: {
      fr: "Légumes frits puis hachés au couteau, mêlés à des œufs. Un plat de rue devenu un classique du dîner familial.",
      ar: "خضرة مقلية ومفرومة بالسكين مع العظم. ماكلة الزنقة ولّات ماكلة الدار.",
    },
    category: "plat",
    serves: 3,
    prepMinutes: 15,
    cookMinutes: 30,
    difficulty: 1,
    months: [5, 6, 7, 8, 9, 10],
    tags: ["economique", "vegetarien", "enfants"],
    ingredients: [
      { id: "poivron_vert", qty: 4, unit: "piece" },
      { id: "piment_fort", qty: 2, unit: "piece" },
      { id: "tomate", qty: 3, unit: "piece" },
      { id: "courgette", qty: 1, unit: "piece" },
      { id: "potiron", qty: 200, unit: "g" },
      { id: "pomme_de_terre", qty: 2, unit: "piece" },
      { id: "oeuf", qty: 3, unit: "piece" },
      { id: "huile_vegetale", qty: 300, unit: "ml", note: { fr: "pour la friture", ar: "للقلي" } },
      { id: "harissa", qty: 1, unit: "cac", optional: true },
      { id: "sel", qty: 1, unit: "cac" },
      { id: "pain", qty: 2, unit: "piece" },
    ],
    steps: [
      {
        text: {
          fr: "Chauffer l'huile dans une poêle profonde et frire les légumes séparément, du plus doux au plus coloré : courgette, potiron, poivrons, piments, tomates.",
          ar: "سخّن الزيت في طاجين عميق واقلي الخضرة وحدة وحدة : قرعة خضراء، قرعة حمراء، فلفل، فلفل حار، طماطم.",
        },
        minutes: 15,
        tip: {
          fr: "Frire séparément : chaque légume a son temps de cuisson.",
          ar: "اقلي كل خضرة وحدها، كل وحدة وقتها.",
        },
      },
      {
        text: {
          fr: "Frire les pommes de terre coupées en cubes jusqu'à ce qu'elles soient dorées, puis les égoutter sur du papier absorbant.",
          ar: "اقلي البطاطا مقطّعة حتى تحمّر، وصفّيها في ورق.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Faire frire les œufs dans la même huile, en gardant le jaune coulant.",
          ar: "اقلي العظم في نفس الزيت وخلّي الأصفر سايل.",
        },
        minutes: 3,
      },
      {
        text: {
          fr: "Réunir tous les légumes sur une planche et les hacher grossièrement au couteau, en ajoutant les œufs à la fin.",
          ar: "جمّع الخضرة الكل على لوحة وافرمهم بالسكين، وزيد العظم في الآخر.",
        },
        minutes: 3,
        tip: {
          fr: "Hachez au couteau, pas au mixeur : le kafteji doit garder du grain.",
          ar: "افرم بالسكين موش بالخلاط، الكفتاجي يلزمو يبقى محبّب.",
        },
      },
      {
        text: {
          fr: "Saler, ajouter la harissa si vous aimez relevé, mélanger et servir tiède avec du pain.",
          ar: "ملّح، زيد الهريسة كان تحبّها حارّة، خلّط وقدّمو دافي بالخبز.",
        },
      },
    ],
    utensils: [
      { fr: "Poêle profonde", ar: "طاجين عميق" },
      { fr: "Planche et grand couteau", ar: "لوحة وسكين كبير" },
    ],
  },

  // ------------------------------------------------------------------ 7
  {
    slug: "tastira",
    name: { fr: "Tastira", ar: "تسطيرة" },
    description: {
      fr: "Poivrons, tomates et ail frits puis écrasés, liés à l'œuf. Rapide, économique, et parfait au petit-déjeuner comme au dîner.",
      ar: "فلفل، طماطم وثوم مقليين ومهروسين مع العظم. سريعة، رخيصة، تتاكل فطور ولا عشاء.",
    },
    category: "plat",
    serves: 2,
    prepMinutes: 10,
    cookMinutes: 20,
    difficulty: 1,
    months: [5, 6, 7, 8, 9, 10],
    tags: ["rapide", "economique", "vegetarien"],
    ingredients: [
      { id: "poivron_vert", qty: 4, unit: "piece" },
      { id: "tomate", qty: 3, unit: "piece" },
      { id: "ail", qty: 4, unit: "gousse" },
      { id: "piment_fort", qty: 1, unit: "piece" },
      { id: "oeuf", qty: 3, unit: "piece" },
      { id: "huile_olive", qty: 5, unit: "cas" },
      { id: "carvi", qty: 1, unit: "cac" },
      { id: "sel", qty: 1, unit: "cac" },
      { id: "pain", qty: 1, unit: "piece" },
    ],
    steps: [
      {
        text: {
          fr: "Frire les poivrons entiers et les gousses d'ail en chemise dans l'huile d'olive, jusqu'à ce que la peau cloque.",
          ar: "اقلي الفلفل صحيح وسنون الثوم بقشرهم في زيت الزيتون حتى تنفخ القشرة.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Ajouter les tomates coupées en deux et les faire fondre dans la même poêle.",
          ar: "زيد الطماطم مقطوعة نصفين وخلّيها تذوب في نفس الطاجين.",
        },
        minutes: 6,
      },
      {
        text: {
          fr: "Retirer les peaux des poivrons et de l'ail, puis écraser grossièrement le tout à la fourchette dans la poêle.",
          ar: "نحّي قشرة الفلفل والثوم، واهرس الكل بالفرشيطة في الطاجين.",
        },
        minutes: 3,
      },
      {
        text: {
          fr: "Saler, ajouter le carvi, puis casser les œufs directement dessus et brouiller légèrement.",
          ar: "ملّح، زيد الكروية، كسّر العظم فوقهم وحرّك شوية.",
        },
        minutes: 3,
        tip: {
          fr: "Le carvi (karwiya) est la signature de la tastira : ne le remplacez pas par du cumin.",
          ar: "الكروية هي ذوق التسطيرة، ما تبدّلهاش بالكمون.",
        },
      },
      {
        text: {
          fr: "Servir tiède, avec du pain frais et un filet d'huile d'olive.",
          ar: "قدّمها دافية بالخبز الطازج وشوية زيت زيتون.",
        },
      },
    ],
    utensils: [{ fr: "Poêle", ar: "طاجين" }],
  },

  // ------------------------------------------------------------------ 8
  {
    slug: "slata-mechouia",
    name: { fr: "Salade grillée (mechouia)", ar: "سلاطة مشوية" },
    description: {
      fr: "Poivrons et tomates grillés au feu, pelés et hachés, servis avec thon, œuf dur et olives. L'entrée tunisienne par excellence.",
      ar: "فلفل وطماطم مشويين على النار، مقشّرين ومفرومين، مع الطن والعظم المسلوق والزيتون.",
    },
    category: "salade",
    serves: 4,
    prepMinutes: 20,
    cookMinutes: 25,
    difficulty: 2,
    months: [5, 6, 7, 8, 9, 10],
    tags: ["economique", "invites"],
    ingredients: [
      { id: "poivron_vert", qty: 6, unit: "piece" },
      { id: "tomate", qty: 4, unit: "piece" },
      { id: "piment_fort", qty: 2, unit: "piece" },
      { id: "ail", qty: 4, unit: "gousse" },
      { id: "thon_boite", qty: 1, unit: "boite" },
      { id: "oeuf", qty: 2, unit: "piece" },
      { id: "olive_verte", qty: 50, unit: "g" },
      { id: "huile_olive", qty: 4, unit: "cas" },
      { id: "citron", qty: 1, unit: "piece" },
      { id: "carvi", qty: 1, unit: "cac" },
      { id: "sel", qty: 1, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Griller les poivrons, piments, tomates et gousses d'ail directement sur la flamme ou sous le gril, en les retournant jusqu'à ce que la peau soit noircie de partout.",
          ar: "اشوي الفلفل، الفلفل الحار، الطماطم والثوم على النار ديركت، وقلّبهم حتى تولّي القشرة كحلة.",
        },
        minutes: 20,
        tip: {
          fr: "Plus la peau noircit, plus la salade sera parfumée. N'ayez pas peur de brûler.",
          ar: "كل ما تكحّل القشرة كل ما ولّى الذوق أحسن، ما تخافش تحرق.",
        },
      },
      {
        text: {
          fr: "Enfermer les légumes grillés 10 minutes dans un sac ou un saladier couvert : la peau se détachera toute seule.",
          ar: "حطّ الخضرة المشوية 10 دقائق في كيس ولا صحن مغطّي، القشرة تتنحّى وحدها.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Peler les légumes, retirer les graines, puis les hacher finement au couteau sur une planche.",
          ar: "قشّرهم، نحّي الزريعة، وافرمهم مليح بالسكين على لوحة.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Assaisonner avec l'huile d'olive, le sel, le carvi et le jus de citron. Mélanger.",
          ar: "تبّلها بزيت الزيتون، الملح، الكروية وعصير القارص. خلّط.",
        },
        minutes: 3,
      },
      {
        text: {
          fr: "Dresser dans un plat creux, garnir de thon émietté, d'œufs durs en quartiers et d'olives.",
          ar: "حطّها في صحن، زيّنها بالطن، العظم المسلوق مقطّع والزيتون.",
        },
        minutes: 5,
      },
    ],
    utensils: [
      { fr: "Gril ou plaque en fonte", ar: "شواية" },
      { fr: "Planche et couteau", ar: "لوحة وسكين" },
    ],
  },

  // ------------------------------------------------------------------ 9
  {
    slug: "chorba-frik",
    name: { fr: "Chorba au frik", ar: "شربة فريك" },
    description: {
      fr: "Soupe de blé vert concassé à l'agneau et à la tomate, épaissie et parfumée à la menthe séchée. Incontournable à la rupture du jeûne.",
      ar: "شربة بالفريك واللحم والطماطم، بالنعناع اليابس. ما تفوتش في رمضان.",
    },
    category: "soupe",
    serves: 4,
    prepMinutes: 15,
    cookMinutes: 45,
    difficulty: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["ramadan", "economique"],
    ingredients: [
      { id: "frik", qty: 150, unit: "g" },
      { id: "agneau", qty: 300, unit: "g", note: { fr: "en petits dés", ar: "مقطّع صغير" } },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "tomate", qty: 2, unit: "piece" },
      { id: "concentre_tomate", qty: 1, unit: "cas" },
      { id: "celeri", qty: 1, unit: "botte", optional: true },
      { id: "persil", qty: 1, unit: "botte" },
      { id: "menthe_sechee", qty: 1, unit: "cac" },
      { id: "huile_olive", qty: 3, unit: "cas" },
      { id: "tabel", qty: 1, unit: "cac" },
      { id: "piment_moulu", qty: 1, unit: "cac" },
      { id: "citron", qty: 1, unit: "piece" },
      { id: "sel", qty: 1, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Rincer le frik à l'eau froide plusieurs fois, jusqu'à ce que l'eau soit claire.",
          ar: "اغسل الفريك بالماء البارد برشة مرّات حتى يصفى الماء.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Faire revenir l'oignon et la viande dans l'huile d'olive, puis ajouter le concentré, le tabel et le piment.",
          ar: "شوّح البصل واللحم في زيت الزيتون، زيد الطماطم المصبرة، التابل والفلفل.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Ajouter les tomates râpées et le céleri ciselé, laisser compoter 5 minutes.",
          ar: "زيد الطماطم المبشورة والكرافس مقطّع، خلّيها 5 دقائق.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Verser 1,5 litre d'eau, porter à ébullition, puis ajouter le frik en pluie en remuant.",
          ar: "زيد 1.5 لتر ماء، خلّيها تغلي، وزيد الفريك شوية بشوية وأنت تحرّك.",
        },
        minutes: 5,
        tip: {
          fr: "Verser le frik en pluie et remuer évite les paquets au fond de la marmite.",
          ar: "زيدو شوية بشوية وحرّك باش ما يتكتّلش في القاع.",
        },
      },
      {
        text: {
          fr: "Cuire 30 minutes à feu doux en remuant de temps en temps, jusqu'à ce que le frik soit tendre et la soupe onctueuse.",
          ar: "طيّب 30 دقيقة على نار هادية وحرّك من وقت لوقت حتى يلين الفريك وتولّي الشربة ثخينة.",
        },
        minutes: 30,
      },
      {
        text: {
          fr: "Hors du feu, ajouter le persil, la menthe séchée écrasée entre les doigts et le jus de citron.",
          ar: "نحّيها من النار، زيد المعدنوس، النعناع اليابس مفروك بيديك وعصير القارص.",
        },
      },
    ],
    utensils: [{ fr: "Marmite", ar: "طنجرة" }],
    tips: [
      {
        fr: "La chorba épaissit en refroidissant : gardez un peu d'eau chaude pour la détendre au moment de servir.",
        ar: "الشربة تثخن كي تبرد، خلّي شوية ماء سخون باش تحلّها.",
      },
    ],
  },

  // ------------------------------------------------------------------ 10
  {
    slug: "lablabi",
    name: { fr: "Lablabi", ar: "لبلابي" },
    description: {
      fr: "Bouillon de pois chiches à l'ail et au cumin versé sur du pain rassis émietté, avec un œuf, du thon et de la harissa. Le petit-déjeuner d'hiver.",
      ar: "مرقة حمص بالثوم والكمون على خبز يابس، مع عظمة، طن وهريسة. فطور الشتاء.",
    },
    region: { fr: "Tunis", ar: "تونس" },
    category: "plat",
    serves: 4,
    prepMinutes: 10,
    cookMinutes: 75,
    difficulty: 1,
    months: [11, 12, 1, 2, 3],
    tags: ["economique", "plat_unique", "vegetarien"],
    ingredients: [
      { id: "pois_chiche_sec", qty: 400, unit: "g", note: { fr: "trempés 12 h", ar: "منقوعين 12 ساعة" } },
      { id: "ail", qty: 8, unit: "gousse" },
      { id: "harissa", qty: 2, unit: "cas" },
      { id: "huile_olive", qty: 6, unit: "cas" },
      { id: "carvi", qty: 2, unit: "cac" },
      { id: "citron", qty: 1, unit: "piece" },
      { id: "oeuf", qty: 4, unit: "piece" },
      { id: "thon_boite", qty: 1, unit: "boite", optional: true },
      { id: "olive_verte", qty: 60, unit: "g", optional: true },
      { id: "capre", qty: 20, unit: "g", optional: true },
      { id: "pain", qty: 4, unit: "piece", note: { fr: "rassis", ar: "يابس" } },
      { id: "sel", qty: 1, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Égoutter les pois chiches trempés et les cuire dans 2 litres d'eau non salée jusqu'à ce qu'ils s'écrasent entre les doigts.",
          ar: "صفّي الحمص المنقوع وطيّبو في 2 لتر ماء بلا ملح حتى يتهرّس بين صوابعك.",
        },
        minutes: 60,
        tip: {
          fr: "Ne salez qu'en fin de cuisson : le sel durcit la peau des pois chiches.",
          ar: "ملّح في الآخر برك، الملح يقسّي قشرة الحمص.",
        },
      },
      {
        text: {
          fr: "Piler l'ail avec le carvi et le sel jusqu'à obtenir une pâte, puis l'ajouter au bouillon avec la harissa.",
          ar: "ادقّ الثوم مع الكروية والملح حتى يولّي عجينة، زيدو للمرقة مع الهريسة.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Laisser infuser 10 minutes à petit frémissement, puis rectifier le sel et l'acidité avec le citron.",
          ar: "خلّيها 10 دقائق على نار صغيرة، وعدّل الملح والحموضة بالقارص.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Pocher les œufs directement dans le bouillon, un par convive.",
          ar: "اسلق العظم ديركت في المرقة، وحدة لكل واحد.",
        },
        minutes: 4,
      },
      {
        text: {
          fr: "Émietter le pain rassis au fond de chaque bol, le couvrir de bouillon et de pois chiches.",
          ar: "فتّت الخبز اليابس في قاع كل زلافة، وغطّيه بالمرقة والحمص.",
        },
        minutes: 3,
      },
      {
        text: {
          fr: "Garnir de l'œuf poché, de thon, d'olives, de câpres, puis arroser généreusement d'huile d'olive.",
          ar: "زيّنو بالعظمة، الطن، الزيتون، الكبار، وصبّ زيت زيتون برشة.",
        },
      },
    ],
    utensils: [
      { fr: "Grande marmite", ar: "طنجرة كبيرة" },
      { fr: "Mortier", ar: "مهراس" },
    ],
  },

  // ------------------------------------------------------------------ 11
  {
    slug: "makrouna-bel-salsa",
    name: { fr: "Macaronis à la sauce rouge", ar: "مقرونة بالصلصة" },
    description: {
      fr: "Pâtes cuites directement dans une sauce tomate épicée au poulet. Le plat de semaine le plus cuisiné dans les foyers tunisiens.",
      ar: "مقرونة تطيب ديركت في الصلصة الحارة بالدجاج. أكثر ماكلة تتعمل في الديار التونسية.",
    },
    category: "plat",
    serves: 4,
    prepMinutes: 10,
    cookMinutes: 40,
    difficulty: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["economique", "enfants", "plat_unique"],
    ingredients: [
      { id: "pates_makrouna", qty: 500, unit: "g" },
      { id: "poulet_morceaux", qty: 500, unit: "g" },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "ail", qty: 3, unit: "gousse" },
      { id: "concentre_tomate", qty: 3, unit: "cas" },
      { id: "harissa", qty: 1, unit: "cas" },
      { id: "huile_olive", qty: 5, unit: "cas" },
      { id: "tabel", qty: 1, unit: "cac" },
      { id: "piment_moulu", qty: 1, unit: "cac" },
      { id: "cannelle", qty: 1, unit: "pincee" },
      { id: "laurier", qty: 2, unit: "feuille" },
      { id: "fromage_rape", qty: 60, unit: "g", optional: true },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Faire dorer le poulet avec l'oignon et l'ail dans l'huile d'olive.",
          ar: "حمّر الدجاج مع البصل والثوم في زيت الزيتون.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Ajouter le concentré de tomate, la harissa, le tabel, le piment et la cannelle. Bien remuer 2 minutes.",
          ar: "زيد الطماطم المصبرة، الهريسة، التابل، الفلفل والقرفة. حرّك دقيقتين.",
        },
        minutes: 2,
      },
      {
        text: {
          fr: "Mouiller avec 1,2 litre d'eau, ajouter le laurier et le sel, puis laisser mijoter 20 minutes.",
          ar: "زيد 1.2 لتر ماء، ورق الرند والملح، وخلّيها تطيب 20 دقيقة.",
        },
        minutes: 20,
      },
      {
        text: {
          fr: "Verser les pâtes crues directement dans la sauce bouillante et remuer pour éviter qu'elles collent.",
          ar: "زيد المقرونة نيّة ديركت في الصلصة اللي تغلي وحرّك باش ما تلزقش.",
        },
        minutes: 2,
        tip: {
          fr: "Cuire les pâtes dans la sauce, jamais à l'eau à part : c'est là que le plat prend son goût.",
          ar: "طيّب المقرونة في الصلصة موش في الماء، هكّا تشرب الذوق.",
        },
      },
      {
        text: {
          fr: "Cuire 12 à 15 minutes à découvert, en remuant, jusqu'à ce que les pâtes soient tendres et la sauce nappante.",
          ar: "طيّب 12-15 دقيقة بلا غطاء وأنت تحرّك حتى تلين المقرونة وتثخن الصلصة.",
        },
        minutes: 14,
      },
      {
        text: {
          fr: "Laisser reposer 5 minutes hors du feu, puis servir parsemé de fromage râpé.",
          ar: "خلّيها ترتاح 5 دقائق، وقدّمها بالجبن المبشور.",
        },
        minutes: 5,
      },
    ],
    utensils: [{ fr: "Marmite large", ar: "طنجرة واسعة" }],
  },

  // ------------------------------------------------------------------ 12
  {
    slug: "brik-bel-adhem",
    name: { fr: "Brik à l'œuf", ar: "بريك بالعظم" },
    description: {
      fr: "Feuille de malsouka garnie de pomme de terre, thon et persil, refermée sur un œuf entier et frite. Le défi : le manger sans faire couler le jaune.",
      ar: "ملسوقة بالبطاطا، الطن والمعدنوس، وعظمة صحيحة، مقلية. التحدّي : تاكلها بلا ما يسيل الأصفر.",
    },
    category: "entree",
    serves: 4,
    prepMinutes: 20,
    cookMinutes: 15,
    difficulty: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["ramadan", "invites", "rapide"],
    ingredients: [
      { id: "malsouka", qty: 4, unit: "feuille" },
      { id: "oeuf", qty: 4, unit: "piece" },
      { id: "pomme_de_terre", qty: 2, unit: "piece" },
      { id: "thon_boite", qty: 1, unit: "boite" },
      { id: "persil", qty: 1, unit: "botte" },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "capre", qty: 20, unit: "g", optional: true },
      { id: "fromage_rape", qty: 50, unit: "g", optional: true },
      { id: "huile_vegetale", qty: 400, unit: "ml", note: { fr: "pour la friture", ar: "للقلي" } },
      { id: "sel", qty: 1, unit: "cac" },
      { id: "poivre_noir", qty: 1, unit: "cac" },
      { id: "citron", qty: 1, unit: "piece" },
    ],
    steps: [
      {
        text: {
          fr: "Cuire les pommes de terre à l'eau, les éplucher et les écraser grossièrement à la fourchette.",
          ar: "اسلق البطاطا، قشّرها واهرسها بالفرشيطة.",
        },
        minutes: 20,
      },
      {
        text: {
          fr: "Mélanger la purée avec le thon égoutté, l'oignon râpé, le persil ciselé, les câpres, le sel et le poivre.",
          ar: "خلّط الهريسة مع الطن مصفّي، البصل مبشور، المعدنوس، الكبار، الملح والفلفل.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Poser une feuille de malsouka, déposer la farce en couronne au centre en laissant un creux, puis y casser un œuf.",
          ar: "حطّ ورقة ملسوقة، دير الحشوة في الوسط وخلّي حفرة، وكسّر عظمة فيها.",
        },
        minutes: 2,
        tip: {
          fr: "La farce doit former un muret autour de l'œuf pour le retenir pendant la friture.",
          ar: "الحشوة تعمل حيط دور العظمة باش تشدّها وقت القلي.",
        },
      },
      {
        text: {
          fr: "Replier la feuille en triangle ou en demi-lune et souder les bords en appuyant.",
          ar: "طوي الورقة مثلث ولا نصف قمرة واشدّ الأطراف مليح.",
        },
        minutes: 2,
      },
      {
        text: {
          fr: "Frire dans l'huile bien chaude, 1 à 2 minutes de chaque côté, en arrosant le dessus à la louche.",
          ar: "اقليها في زيت سخون مليح، دقيقة لدقيقتين من كل جيهة، وصبّ الزيت فوقها بالمغرفة.",
        },
        minutes: 4,
        tip: {
          fr: "L'huile doit être franchement chaude : sinon la feuille boit l'huile et devient molle.",
          ar: "الزيت يلزمو يكون سخون برشة، وإلا الورقة تشرب الزيت وتولّي طرية.",
        },
      },
      {
        text: {
          fr: "Égoutter sur du papier absorbant et servir immédiatement avec du citron.",
          ar: "صفّيها في ورق وقدّمها ديركت مع القارص.",
        },
      },
    ],
    utensils: [
      { fr: "Poêle à frire", ar: "مقلاة" },
      { fr: "Écumoire", ar: "مغرفة مثقوبة" },
    ],
  },

  // ------------------------------------------------------------------ 13
  {
    slug: "slata-tounsia",
    name: { fr: "Salade tunisienne", ar: "سلاطة تونسية" },
    description: {
      fr: "Tomates, concombres, poivrons et oignons taillés très finement, relevés à l'huile d'olive et au citron.",
      ar: "طماطم، خيار، فلفل وبصل مقطّعين رقاق برشة، بزيت الزيتون والقارص.",
    },
    category: "salade",
    serves: 4,
    prepMinutes: 15,
    cookMinutes: 0,
    difficulty: 1,
    months: [5, 6, 7, 8, 9, 10],
    tags: ["rapide", "economique", "vegetarien", "sans_gluten"],
    ingredients: [
      { id: "tomate", qty: 4, unit: "piece" },
      { id: "concombre", qty: 2, unit: "piece" },
      { id: "poivron_vert", qty: 2, unit: "piece" },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "menthe_fraiche", qty: 1, unit: "botte" },
      { id: "thon_boite", qty: 1, unit: "boite", optional: true },
      { id: "oeuf", qty: 2, unit: "piece", optional: true },
      { id: "olive_verte", qty: 50, unit: "g" },
      { id: "huile_olive", qty: 4, unit: "cas" },
      { id: "citron", qty: 1, unit: "piece" },
      { id: "sel", qty: 1, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Tailler les tomates, concombres, poivrons et oignons en tout petits dés réguliers.",
          ar: "قطّع الطماطم، الخيار، الفلفل والبصل تقطيع صغير ومتساوي.",
        },
        minutes: 12,
        tip: {
          fr: "La finesse de la coupe fait toute la différence : visez des dés de 5 mm.",
          ar: "التقطيع الرقيق هو السرّ، حاول تعملهم 5 مم.",
        },
      },
      {
        text: {
          fr: "Faire dégorger l'oignon 5 minutes dans de l'eau froide salée pour adoucir son piquant, puis l'égoutter.",
          ar: "نقّع البصل 5 دقائق في ماء بارد مالح باش يخفّ حرّو، وصفّيه.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Mélanger tous les légumes avec la menthe ciselée, le sel, l'huile d'olive et le jus de citron.",
          ar: "خلّط الخضرة الكل مع النعناع مقطّع، الملح، زيت الزيتون وعصير القارص.",
        },
        minutes: 3,
      },
      {
        text: {
          fr: "Garnir de thon, d'œufs durs et d'olives, puis servir bien frais.",
          ar: "زيّنها بالطن، العظم المسلوق والزيتون، وقدّمها باردة.",
        },
      },
    ],
    utensils: [
      { fr: "Planche et couteau bien aiguisé", ar: "لوحة وسكين ماضي" },
      { fr: "Saladier", ar: "صحن سلاطة" },
    ],
  },

  // ------------------------------------------------------------------ 14
  {
    slug: "marqa-hlowa",
    name: { fr: "Marqa douce au potiron", ar: "مرقة حلوة" },
    description: {
      fr: "Ragoût sucré-salé de viande, potiron, pruneaux et raisins secs, parfumé à la cannelle et à l'eau de fleur d'oranger.",
      ar: "مرقة حلوة باللحم، القرعة الحمراء، الزبيب والقرفة وماء الزهر.",
    },
    category: "plat",
    serves: 4,
    prepMinutes: 15,
    cookMinutes: 70,
    difficulty: 2,
    months: [9, 10, 11, 12, 1],
    tags: ["invites", "ramadan"],
    ingredients: [
      { id: "agneau", qty: 600, unit: "g" },
      { id: "potiron", qty: 600, unit: "g" },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "raisin_sec", qty: 80, unit: "g" },
      { id: "datte", qty: 100, unit: "g", optional: true },
      { id: "amande", qty: 50, unit: "g", optional: true },
      { id: "cannelle", qty: 1, unit: "cac" },
      { id: "sucre", qty: 1, unit: "cas" },
      { id: "eau_fleur_oranger", qty: 1, unit: "cas" },
      { id: "huile_olive", qty: 4, unit: "cas" },
      { id: "sel", qty: 1, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Faire revenir la viande et l'oignon dans l'huile d'olive, sans laisser trop colorer.",
          ar: "شوّح اللحم والبصل في زيت الزيتون بلا ما تحمّرهم برشة.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Ajouter la cannelle, saler, mouiller avec 800 ml d'eau et laisser mijoter 45 minutes.",
          ar: "زيد القرفة، ملّح، زيد 800 مل ماء وخلّيها تطيب 45 دقيقة.",
        },
        minutes: 45,
      },
      {
        text: {
          fr: "Faire tremper les raisins secs 10 minutes dans de l'eau tiède, puis les égoutter.",
          ar: "نقّع الزبيب 10 دقائق في ماء دافي وصفّيه.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Ajouter le potiron en gros cubes, les raisins secs et les dattes, puis cuire 20 minutes.",
          ar: "زيد القرعة الحمراء مقطّعة كبير، الزبيب والتمر، وطيّب 20 دقيقة.",
        },
        minutes: 20,
      },
      {
        text: {
          fr: "Ajouter le sucre et l'eau de fleur d'oranger en fin de cuisson, goûter et ajuster l'équilibre sucré-salé.",
          ar: "زيد السكر وماء الزهر في الآخر، ذوق وعدّل بين الحلو والمالح.",
        },
        minutes: 5,
        tip: {
          fr: "L'eau de fleur d'oranger se met toujours hors du feu : la chaleur détruit son parfum.",
          ar: "ماء الزهر يتزاد بعيد على النار، السخانة تقتل ريحتو.",
        },
      },
      {
        text: {
          fr: "Parsemer d'amandes grillées et servir.",
          ar: "زيّنها باللوز المحمّص وقدّمها.",
        },
      },
    ],
    utensils: [{ fr: "Marmite", ar: "طنجرة" }],
  },

  // ------------------------------------------------------------------ 15
  {
    slug: "mermez",
    name: { fr: "Mermez au poulet", ar: "مرمز بالدجاج" },
    description: {
      fr: "Ragoût de pois chiches et légumes au poulet, en sauce blonde parfumée à la coriandre. Doux, nourrissant, apprécié des enfants.",
      ar: "مرقة بيضاء بالحمص والخضرة والدجاج، بالقزبر. حلوة ومشبعة، الصغار يحبّوها.",
    },
    category: "plat",
    serves: 4,
    prepMinutes: 15,
    cookMinutes: 60,
    difficulty: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["economique", "enfants", "plat_unique"],
    ingredients: [
      { id: "poulet_morceaux", qty: 700, unit: "g" },
      { id: "pois_chiche_sec", qty: 150, unit: "g", note: { fr: "trempés la veille", ar: "منقوعين من البارح" } },
      { id: "oignon", qty: 1, unit: "piece" },
      { id: "carotte", qty: 3, unit: "piece" },
      { id: "pomme_de_terre", qty: 3, unit: "piece" },
      { id: "courgette", qty: 2, unit: "piece", optional: true },
      { id: "coriandre_moulue", qty: 1, unit: "cas" },
      { id: "curcuma", qty: 1, unit: "cac" },
      { id: "huile_olive", qty: 4, unit: "cas" },
      { id: "persil", qty: 1, unit: "botte" },
      { id: "citron", qty: 1, unit: "piece" },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Faire revenir l'oignon émincé et le poulet dans l'huile, sans coloration forte.",
          ar: "شوّح البصل والدجاج في الزيت بلا ما يحمّرو برشة.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Ajouter la coriandre moulue et le curcuma, remuer une minute pour libérer les arômes.",
          ar: "زيد القزبر المطحون والخرقوم، حرّك دقيقة باش تخرج الريحة.",
        },
        minutes: 1,
      },
      {
        text: {
          fr: "Mouiller avec 1 litre d'eau, ajouter les pois chiches égouttés et laisser cuire 35 minutes.",
          ar: "زيد لتر ماء والحمص مصفّي وخلّيها تطيب 35 دقيقة.",
        },
        minutes: 35,
      },
      {
        text: {
          fr: "Ajouter les carottes et les pommes de terre, saler, puis cuire encore 20 minutes.",
          ar: "زيد السفنارية والبطاطا، ملّح، وطيّب 20 دقيقة أخرى.",
        },
        minutes: 20,
      },
      {
        text: {
          fr: "Finir avec le persil ciselé et un trait de citron. La sauce doit rester claire et légèrement liée.",
          ar: "كمّل بالمعدنوس وشوية قارص. المرقة تبقى صافية وشوية ثخينة.",
        },
      },
    ],
    utensils: [{ fr: "Marmite", ar: "طنجرة" }],
  },

  // ------------------------------------------------------------------ 16
  {
    slug: "rouz-jerbi",
    name: { fr: "Riz djerbien", ar: "روز جربي" },
    description: {
      fr: "Riz cuit à la vapeur avec de la viande, des herbes hachées et beaucoup de persil, à la manière de Djerba.",
      ar: "روز مبخّر باللحم والخضرة المفرومة وبرشة معدنوس، على الطريقة الجربية.",
    },
    region: { fr: "Djerba", ar: "جربة" },
    category: "plat",
    serves: 4,
    prepMinutes: 25,
    cookMinutes: 60,
    difficulty: 3,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["invites", "plat_unique"],
    ingredients: [
      { id: "riz", qty: 500, unit: "g" },
      { id: "viande_hachee", qty: 300, unit: "g" },
      { id: "persil", qty: 2, unit: "botte" },
      { id: "epinard", qty: 200, unit: "g" },
      { id: "oignon", qty: 2, unit: "piece" },
      { id: "poivron_vert", qty: 2, unit: "piece" },
      { id: "concentre_tomate", qty: 2, unit: "cas" },
      { id: "huile_olive", qty: 100, unit: "ml" },
      { id: "tabel", qty: 1, unit: "cas" },
      { id: "piment_moulu", qty: 1, unit: "cac" },
      { id: "sel", qty: 2, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Hacher finement le persil, les épinards, les oignons et les poivrons.",
          ar: "افرم المعدنوس، السبناخ، البصل والفلفل مليح.",
        },
        minutes: 15,
      },
      {
        text: {
          fr: "Faire revenir la viande hachée avec les oignons dans l'huile d'olive, ajouter le concentré, le tabel et le piment.",
          ar: "شوّح اللحم المفروم مع البصل في زيت الزيتون، زيد الطماطم المصبرة، التابل والفلفل.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Ajouter les herbes hachées et laisser tomber à feu moyen 10 minutes.",
          ar: "زيد الخضرة المفرومة وخلّيها تذبل 10 دقائق على نار متوسطة.",
        },
        minutes: 10,
      },
      {
        text: {
          fr: "Rincer le riz, le mélanger à la préparation avec un peu d'huile jusqu'à ce que chaque grain soit enrobé.",
          ar: "اغسل الروز، خلّطو مع الحشوة وشوية زيت حتى تتغطّى كل حبّة.",
        },
        minutes: 5,
        tip: {
          fr: "Le riz djerbien n'est jamais bouilli : il cuit uniquement à la vapeur, enrobé de sauce.",
          ar: "الروز الجربي ما يتسلقش، يطيب في البخار برك.",
        },
      },
      {
        text: {
          fr: "Cuire le riz à la vapeur dans le haut du couscoussier pendant 40 minutes, en l'aérant à mi-cuisson.",
          ar: "بخّر الروز في فوق الكسكاس 40 دقيقة، وفركو في النص.",
        },
        minutes: 40,
      },
      {
        text: {
          fr: "Laisser reposer 5 minutes couvert, puis aérer à la fourchette et servir.",
          ar: "خلّيه يرتاح 5 دقائق مغطّي، فركو بالفرشيطة وقدّمو.",
        },
        minutes: 5,
      },
    ],
    utensils: [
      { fr: "Couscoussier", ar: "كسكاس" },
      { fr: "Grand couteau", ar: "سكين كبير" },
    ],
  },

  // ------------------------------------------------------------------ 17
  {
    slug: "chakchouka",
    name: { fr: "Chakchouka tunisienne", ar: "شكشوكة" },
    description: {
      fr: "Compotée de poivrons, oignons et tomates mijotée longuement, avec pois chiches et œufs. Végétarienne et très économique.",
      ar: "فلفل، بصل وطماطم يطيبو بالشوية، مع الحمص والعظم. نباتية ورخيصة.",
    },
    category: "plat",
    serves: 3,
    prepMinutes: 15,
    cookMinutes: 35,
    difficulty: 1,
    months: [5, 6, 7, 8, 9, 10],
    tags: ["vegetarien", "economique", "rapide"],
    ingredients: [
      { id: "poivron_vert", qty: 5, unit: "piece" },
      { id: "oignon", qty: 2, unit: "piece" },
      { id: "tomate", qty: 4, unit: "piece" },
      { id: "ail", qty: 3, unit: "gousse" },
      { id: "pois_chiche_boite", qty: 1, unit: "boite" },
      { id: "oeuf", qty: 3, unit: "piece" },
      { id: "concentre_tomate", qty: 1, unit: "cas" },
      { id: "harissa", qty: 1, unit: "cac" },
      { id: "huile_olive", qty: 5, unit: "cas" },
      { id: "carvi", qty: 1, unit: "cac" },
      { id: "sel", qty: 1, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Émincer les oignons et les poivrons en lanières, les faire fondre doucement dans l'huile d'olive.",
          ar: "قطّع البصل والفلفل شرايح وخلّيهم يذوبو بالشوية في زيت الزيتون.",
        },
        minutes: 12,
        tip: {
          fr: "Feu doux et patience : les légumes doivent fondre, pas griller.",
          ar: "نار هادية وصبر، الخضرة تذوب موش تتحرق.",
        },
      },
      {
        text: {
          fr: "Ajouter l'ail, le concentré de tomate et la harissa, puis remuer 2 minutes.",
          ar: "زيد الثوم، الطماطم المصبرة والهريسة، حرّك دقيقتين.",
        },
        minutes: 2,
      },
      {
        text: {
          fr: "Ajouter les tomates concassées, le carvi et le sel, puis laisser compoter 15 minutes.",
          ar: "زيد الطماطم مقطّعة، الكروية والملح، وخلّيها 15 دقيقة.",
        },
        minutes: 15,
      },
      {
        text: {
          fr: "Ajouter les pois chiches égouttés et poursuivre 5 minutes.",
          ar: "زيد الحمص مصفّي وكمّل 5 دقائق.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Casser les œufs sur le dessus, couvrir et cuire jusqu'à ce qu'ils soient pris.",
          ar: "كسّر العظم فوق، غطّي وطيّب حتى يشدّو.",
        },
        minutes: 5,
      },
    ],
    utensils: [{ fr: "Sauteuse avec couvercle", ar: "طاجين بغطاء" }],
  },

  // ------------------------------------------------------------------ 18
  {
    slug: "kamounia",
    name: { fr: "Kamounia", ar: "كمونية" },
    description: {
      fr: "Foie de bœuf mijoté dans une sauce très parfumée au cumin et à l'ail. Un plat franc et bon marché, servi avec du pain.",
      ar: "كبدة تطيب في مرقة بالكمون والثوم. ماكلة رخيصة وقوية الذوق، تتاكل بالخبز.",
    },
    category: "plat",
    serves: 3,
    prepMinutes: 10,
    cookMinutes: 40,
    difficulty: 2,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["economique", "rapide"],
    ingredients: [
      { id: "foie_boeuf", qty: 500, unit: "g", note: { fr: "en cubes", ar: "مقطّعة" } },
      { id: "ail", qty: 6, unit: "gousse" },
      { id: "carvi", qty: 2, unit: "cas", note: { fr: "c'est la base du plat", ar: "هي أساس الماكلة" } },
      { id: "concentre_tomate", qty: 1, unit: "cas" },
      { id: "harissa", qty: 1, unit: "cac" },
      { id: "huile_olive", qty: 5, unit: "cas" },
      { id: "piment_moulu", qty: 1, unit: "cac" },
      { id: "laurier", qty: 2, unit: "feuille" },
      { id: "sel", qty: 1, unit: "cac" },
      { id: "pain", qty: 2, unit: "piece" },
    ],
    steps: [
      {
        text: {
          fr: "Saisir les cubes de foie à feu vif dans l'huile bien chaude, 3 minutes, puis les réserver.",
          ar: "حمّر الكبدة على نار قوية في زيت سخون 3 دقائق ونحّيها.",
        },
        minutes: 3,
        tip: {
          fr: "Saisir vite et fort : un foie qui cuit lentement devient caoutchouteux.",
          ar: "حمّرها بسرعة وعلى نار قوية، الكبدة اللي تطيب بالشوية تولّي قاسية.",
        },
      },
      {
        text: {
          fr: "Dans la même casserole, faire revenir l'ail pilé avec le carvi, le piment et la harissa.",
          ar: "في نفس الطنجرة، شوّح الثوم المدقوق مع الكروية، الفلفل والهريسة.",
        },
        minutes: 2,
      },
      {
        text: {
          fr: "Ajouter le concentré de tomate, puis mouiller avec 400 ml d'eau et ajouter le laurier.",
          ar: "زيد الطماطم المصبرة، بعد 400 مل ماء وورق الرند.",
        },
        minutes: 3,
      },
      {
        text: {
          fr: "Remettre le foie, saler et laisser mijoter à couvert 30 minutes, jusqu'à ce que la sauce soit courte et brillante.",
          ar: "ردّ الكبدة، ملّح وخلّيها تطيب مغطّية 30 دقيقة حتى تنقص المرقة وتلمع.",
        },
        minutes: 30,
      },
      {
        text: {
          fr: "Rectifier en cumin juste avant de servir, avec beaucoup de pain.",
          ar: "زيد شوية كروية قبل ما تقدّم، وبرشة خبز.",
        },
      },
    ],
    utensils: [
      { fr: "Casserole", ar: "طنجرة" },
      { fr: "Mortier", ar: "مهراس" },
    ],
  },

  // ------------------------------------------------------------------ 19
  {
    slug: "omek-houria",
    name: { fr: "Omek Houria", ar: "أمك حورية" },
    description: {
      fr: "Purée de carottes cuites, écrasées à la fourchette et relevées à l'ail, à la harissa et au carvi. Une entrée douce et piquante à la fois.",
      ar: "سفنارية مسلوقة ومهروسة بالثوم، الهريسة والكروية. سلاطة حلوة وحارة في نفس الوقت.",
    },
    category: "salade",
    serves: 4,
    prepMinutes: 10,
    cookMinutes: 25,
    difficulty: 1,
    months: [11, 12, 1, 2, 3, 4],
    tags: ["economique", "vegetarien", "sans_gluten"],
    ingredients: [
      { id: "carotte", qty: 1, unit: "kg" },
      { id: "ail", qty: 4, unit: "gousse" },
      { id: "harissa", qty: 1, unit: "cas" },
      { id: "carvi", qty: 1, unit: "cac" },
      { id: "huile_olive", qty: 4, unit: "cas" },
      { id: "citron", qty: 1, unit: "piece" },
      { id: "olive_verte", qty: 50, unit: "g", optional: true },
      { id: "thon_boite", qty: 1, unit: "boite", optional: true },
      { id: "sel", qty: 1, unit: "cac" },
    ],
    steps: [
      {
        text: {
          fr: "Cuire les carottes entières avec les gousses d'ail dans l'eau salée, jusqu'à ce qu'elles soient très tendres.",
          ar: "اسلق السفنارية صحيحة مع الثوم في ماء مالح حتى تلين برشة.",
        },
        minutes: 25,
      },
      {
        text: {
          fr: "Égoutter, puis écraser à la fourchette avec l'ail cuit, en gardant un peu de texture.",
          ar: "صفّيها واهرسها بالفرشيطة مع الثوم المطيّب، وخلّيها شوية محبّبة.",
        },
        minutes: 5,
        tip: {
          fr: "À la fourchette, jamais au mixeur : sinon la texture devient une purée de bébé.",
          ar: "بالفرشيطة موش بالخلاط، وإلا تولّي هريسة صغار.",
        },
      },
      {
        text: {
          fr: "Assaisonner avec la harissa, le carvi, le sel, l'huile d'olive et le jus de citron.",
          ar: "تبّلها بالهريسة، الكروية، الملح، زيت الزيتون وعصير القارص.",
        },
        minutes: 3,
      },
      {
        text: {
          fr: "Laisser reposer 30 minutes au frais pour que les saveurs se lient, puis garnir d'olives et de thon.",
          ar: "خلّيها 30 دقيقة في البارد باش تتمازج الأذواق، وزيّنها بالزيتون والطن.",
        },
      },
    ],
    utensils: [
      { fr: "Casserole", ar: "طنجرة" },
      { fr: "Fourchette", ar: "فرشيطة" },
    ],
  },

  // ------------------------------------------------------------------ 20
  {
    slug: "masfouf",
    name: { fr: "Masfouf sucré", ar: "مسفوف" },
    description: {
      fr: "Semoule vapeur sucrée aux raisins secs, dattes et amandes, arrosée de lait. Petit-déjeuner de Ramadan et goûter des enfants.",
      ar: "سميد مبخّر حلو بالزبيب، التمر واللوز، مع الحليب. فطور رمضان وقوتة الصغار.",
    },
    category: "petit_dejeuner",
    serves: 4,
    prepMinutes: 10,
    cookMinutes: 40,
    difficulty: 1,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tags: ["ramadan", "enfants", "vegetarien"],
    ingredients: [
      { id: "semoule_couscous", qty: 400, unit: "g" },
      { id: "raisin_sec", qty: 80, unit: "g" },
      { id: "datte", qty: 150, unit: "g" },
      { id: "amande", qty: 60, unit: "g" },
      { id: "sucre", qty: 60, unit: "g" },
      { id: "beurre", qty: 40, unit: "g" },
      { id: "huile_olive", qty: 2, unit: "cas" },
      { id: "eau_fleur_oranger", qty: 1, unit: "cas" },
      { id: "lait", qty: 500, unit: "ml" },
      { id: "sel", qty: 1, unit: "pincee" },
    ],
    steps: [
      {
        text: {
          fr: "Humidifier la semoule avec de l'eau légèrement salée et un peu d'huile, l'aérer entre les mains.",
          ar: "بلّل السميد بماء فيه شوية ملح وشوية زيت، وفركو بيديك.",
        },
        minutes: 5,
      },
      {
        text: {
          fr: "Cuire à la vapeur 20 minutes, aérer, humidifier de nouveau, puis remettre 15 minutes.",
          ar: "بخّرو 20 دقيقة، فركو، بلّلو مرّة أخرى وردّو 15 دقيقة.",
        },
        minutes: 35,
      },
      {
        text: {
          fr: "Tremper les raisins secs dans de l'eau tiède, dénoyauter les dattes et concasser les amandes.",
          ar: "نقّع الزبيب في ماء دافي، نحّي نوى التمر وكسّر اللوز.",
        },
        minutes: 8,
      },
      {
        text: {
          fr: "Hors du feu, incorporer le beurre, le sucre, l'eau de fleur d'oranger, puis les fruits secs.",
          ar: "بعيد على النار، زيد الزبدة، السكر، ماء الزهر، وبعد الفواكه الجافة.",
        },
        minutes: 3,
      },
      {
        text: {
          fr: "Servir tiède dans des bols, chacun ajoutant du lait froid à sa convenance.",
          ar: "قدّمو دافي في الزلايف، وكل واحد يزيد الحليب البارد على كيفو.",
        },
        tip: {
          fr: "Le lait se verse au dernier moment, sinon la semoule se détrempe.",
          ar: "الحليب يتزاد في اللحظة الأخيرة، وإلا السميد يتبلّل برشة.",
        },
      },
    ],
    utensils: [
      { fr: "Couscoussier", ar: "كسكاس" },
      { fr: "Grand plat", ar: "صحن كبير" },
    ],
  },
];

const BY_SLUG = new Map(RECIPES.map((r) => [r.slug, r]));

export function getRecipe(slug: string): Recipe | undefined {
  return BY_SLUG.get(slug);
}

export const RECIPE_SLUGS: string[] = RECIPES.map((r) => r.slug);
