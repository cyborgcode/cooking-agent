import type { Recipe } from "@/lib/types";

/**
 * Cuisine italienne, cuisinée en Tunisie.
 *
 * Une sélection courte et assumée. Le répertoire reste tunisien — c'est le
 * nom de l'application et c'est ce qu'on mange ici — et l'italien n'y tient
 * que la place d'un bon dimanche : huit plats qui font vraiment plaisir,
 * plutôt qu'une longue liste où les pâtes à l'ail voisinent avec les
 * lasagnes.
 *
 * Deux adaptations valent pour toutes :
 *
 *  - **Rien de porcin.** Le ragù des lasagnes et des tagliatelles est au
 *    bœuf seul là où l'original mêle bœuf et porc ; les 150 ml de lait de la
 *    recette d'origine compensent le gras manquant.
 *  - **Pas d'alcool.** Ni vin ni marsala nulle part.
 *
 * Les rares produits importés — mozzarella, parmesan — ont un remplaçant
 * local indiqué dans le catalogue.
 */
export const RECIPES_ITALIENNES: Recipe[] = [
  // ------------------------------------------------------------------ 1
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

  // ------------------------------------------------------------------ 2
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

  // ------------------------------------------------------------------ 3
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

  // ------------------------------------------------------------------ 4
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

  // ------------------------------------------------------------------ 5
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

  // ------------------------------------------------------------------ 6
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

  // ------------------------------------------------------------------ 7
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

  // ------------------------------------------------------------------ 8
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
];
