export interface Crop {
  id: string;
  nameAr: string;
  nameEn: string;
  category: "fruits" | "vegetables" | "dates" | "herbs" | "grains" | "fodder";
  emoji: string;
  plantingMonths: number[];
  harvestMonths: number[];
  suitableRegions: string[];
  waterNeeds: "منخفضة" | "متوسطة" | "عالية";
  description: string;
  tips: string;
}

export const CROPS: Crop[] = [
  // التمور - كنز عُمان
  {
    id: "dates",
    nameAr: "نخيل التمر",
    nameEn: "Date Palm",
    category: "dates",
    emoji: "🌴",
    plantingMonths: [1, 2, 3],
    harvestMonths: [7, 8, 9, 10],
    suitableRegions: ["batinah_north", "batinah_south", "dakhliyah", "dhahirah", "buraimi", "sharqiyah_north"],
    waterNeeds: "متوسطة",
    description: "أهم محصول في عُمان، أكثر من 250 نوعاً مثل الخلاص والفرض والخنيزي",
    tips: "يحتاج تلقيحاً يدوياً في فبراير-مارس، يتحمل الحرارة الشديدة والملوحة",
  },
  // الليمون العُماني
  {
    id: "lime",
    nameAr: "الليمون العُماني",
    nameEn: "Omani Lime",
    category: "fruits",
    emoji: "🍋",
    plantingMonths: [10, 11, 12, 1],
    harvestMonths: [3, 4, 5, 6],
    suitableRegions: ["batinah_north", "batinah_south", "muscat"],
    waterNeeds: "متوسطة",
    description: "الليمون العُماني مشهور عالمياً، يُزرع بكثرة في الباطنة",
    tips: "يحتاج تربة جيدة التصريف، يُصدَّر مجففاً (الليمون الأسود)",
  },
  // الموز
  {
    id: "banana",
    nameAr: "الموز",
    nameEn: "Banana",
    category: "fruits",
    emoji: "🍌",
    plantingMonths: [3, 4, 10, 11],
    harvestMonths: [8, 9, 10, 3, 4],
    suitableRegions: ["batinah_north", "batinah_south", "dhofar"],
    waterNeeds: "عالية",
    description: "ينمو في المناطق الرطبة والساحلية",
    tips: "يحتاج ري منتظم وتربة خصبة عميقة",
  },
  // المانجو
  {
    id: "mango",
    nameAr: "المانجو",
    nameEn: "Mango",
    category: "fruits",
    emoji: "🥭",
    plantingMonths: [2, 3, 10],
    harvestMonths: [5, 6, 7],
    suitableRegions: ["batinah_north", "batinah_south", "dhofar", "muscat"],
    waterNeeds: "متوسطة",
    description: "من أهم الفواكه في الباطنة وظفار",
    tips: "يزهر في يناير-فبراير، يحتاج إلى برودة ليلية لتحفيز التزهير",
  },
  // البابايا
  {
    id: "papaya",
    nameAr: "البابايا",
    nameEn: "Papaya",
    category: "fruits",
    emoji: "🫐",
    plantingMonths: [3, 4, 9, 10],
    harvestMonths: [8, 9, 10, 2, 3],
    suitableRegions: ["dhofar", "batinah_north"],
    waterNeeds: "متوسطة",
    description: "تنمو بسرعة، تناسب مناخ ظفار",
    tips: "تبدأ الإنتاج بعد 9-11 شهراً من الزراعة",
  },
  // الطماطم
  {
    id: "tomato",
    nameAr: "الطماطم",
    nameEn: "Tomato",
    category: "vegetables",
    emoji: "🍅",
    plantingMonths: [9, 10, 11],
    harvestMonths: [12, 1, 2, 3],
    suitableRegions: ["batinah_north", "batinah_south", "dakhliyah", "muscat", "sharqiyah_north"],
    waterNeeds: "متوسطة",
    description: "من أكثر الخضروات زراعةً في عُمان شتاءً",
    tips: "يُزرع في الشتاء تجنباً للحرارة، يحتاج دعامات",
  },
  // الفلفل
  {
    id: "pepper",
    nameAr: "الفلفل",
    nameEn: "Pepper",
    category: "vegetables",
    emoji: "🫑",
    plantingMonths: [9, 10, 11],
    harvestMonths: [12, 1, 2, 3, 4],
    suitableRegions: ["batinah_north", "batinah_south", "muscat", "dakhliyah"],
    waterNeeds: "متوسطة",
    description: "يُزرع في الشتاء، أنواع حلوة وحارة",
    tips: "يحتاج تربة خفيفة جيدة التهوية",
  },
  // الخيار
  {
    id: "cucumber",
    nameAr: "الخيار",
    nameEn: "Cucumber",
    category: "vegetables",
    emoji: "🥒",
    plantingMonths: [10, 11, 2, 3],
    harvestMonths: [12, 1, 2, 4, 5],
    suitableRegions: ["batinah_north", "batinah_south", "muscat", "dakhliyah", "buraimi"],
    waterNeeds: "عالية",
    description: "سريع النمو، ينتج خلال 45-55 يوماً",
    tips: "يحتاج ري منتظم، يُزرع على أسلاك أو داخل بيوت محمية",
  },
  // البامية
  {
    id: "okra",
    nameAr: "البامية",
    nameEn: "Okra",
    category: "vegetables",
    emoji: "🌿",
    plantingMonths: [3, 4, 8, 9],
    harvestMonths: [5, 6, 7, 10, 11],
    suitableRegions: ["batinah_north", "batinah_south", "dakhliyah", "muscat"],
    waterNeeds: "منخفضة",
    description: "تتحمل الحرارة، تُزرع صيفاً وخريفاً",
    tips: "تُجمع يومياً لضمان الجودة، تتحمل الملوحة البسيطة",
  },
  // الكوسا
  {
    id: "zucchini",
    nameAr: "الكوسا",
    nameEn: "Zucchini",
    category: "vegetables",
    emoji: "🥬",
    plantingMonths: [9, 10, 11, 2],
    harvestMonths: [11, 12, 1, 2, 4],
    suitableRegions: ["batinah_north", "muscat", "dakhliyah", "buraimi"],
    waterNeeds: "متوسطة",
    description: "سريع الإنتاج، مناسب للمزارع الصغيرة",
    tips: "يُحصد مبكراً قبل أن يكبر للحصول على أفضل جودة",
  },
  // البصل
  {
    id: "onion",
    nameAr: "البصل",
    nameEn: "Onion",
    category: "vegetables",
    emoji: "🧅",
    plantingMonths: [10, 11],
    harvestMonths: [2, 3, 4],
    suitableRegions: ["batinah_north", "batinah_south", "dakhliyah", "dhahirah", "buraimi"],
    waterNeeds: "منخفضة",
    description: "محصول شتوي مهم، يتحمل التربة الرملية",
    tips: "يحتاج تربة خفيفة جيدة التصريف",
  },
  // الثوم
  {
    id: "garlic",
    nameAr: "الثوم",
    nameEn: "Garlic",
    category: "vegetables",
    emoji: "🧄",
    plantingMonths: [10, 11, 12],
    harvestMonths: [3, 4],
    suitableRegions: ["dakhliyah", "batinah_north", "dhahirah"],
    waterNeeds: "منخفضة",
    description: "يُزرع في الأماكن الجبلية والداخلية",
    tips: "يحتاج برودة الشتاء لتكوين الفصوص",
  },
  // الجزر
  {
    id: "carrot",
    nameAr: "الجزر",
    nameEn: "Carrot",
    category: "vegetables",
    emoji: "🥕",
    plantingMonths: [10, 11],
    harvestMonths: [1, 2, 3],
    suitableRegions: ["dakhliyah", "batinah_north", "buraimi", "dhahirah"],
    waterNeeds: "منخفضة",
    description: "يُزرع شتاءً في التربة الخفيفة",
    tips: "يحتاج تربة عميقة خفيفة لتطور الجذر",
  },
  // الكبوس (ملوخية عمانية)
  {
    id: "lubia",
    nameAr: "اللوبيا",
    nameEn: "Cowpea",
    category: "vegetables",
    emoji: "🫘",
    plantingMonths: [9, 10, 3, 4],
    harvestMonths: [11, 12, 5, 6],
    suitableRegions: ["batinah_north", "batinah_south", "dakhliyah", "dhofar"],
    waterNeeds: "منخفضة",
    description: "محصول تقليدي عُماني، يثبت النيتروجين في التربة",
    tips: "يتحمل الحرارة والجفاف، مفيد لتحسين التربة",
  },
  // الذرة
  {
    id: "sorghum",
    nameAr: "الذرة السورغم",
    nameEn: "Sorghum",
    category: "grains",
    emoji: "🌾",
    plantingMonths: [7, 8, 9],
    harvestMonths: [10, 11, 12],
    suitableRegions: ["dhofar", "dakhliyah", "batinah_north"],
    waterNeeds: "منخفضة",
    description: "محصول تقليدي يتحمل الجفاف، مهم في ظفار",
    tips: "يتحمل الملوحة والجفاف، يُستخدم علفاً وغذاءً",
  },
  // الحناء
  {
    id: "henna",
    nameAr: "الحناء",
    nameEn: "Henna",
    category: "herbs",
    emoji: "🌿",
    plantingMonths: [3, 4],
    harvestMonths: [6, 7, 8],
    suitableRegions: ["batinah_north", "dakhliyah", "dhahirah"],
    waterNeeds: "منخفضة",
    description: "محصول تقليدي عُماني ذو قيمة تجارية",
    tips: "يتحمل الحرارة والملوحة، يُحصد أوراقه",
  },
  // الرمان
  {
    id: "pomegranate",
    nameAr: "الرمان",
    nameEn: "Pomegranate",
    category: "fruits",
    emoji: "🍎",
    plantingMonths: [1, 2, 3],
    harvestMonths: [9, 10, 11],
    suitableRegions: ["dakhliyah", "dhahirah", "batinah_north"],
    waterNeeds: "منخفضة",
    description: "رمان الجبل الأخضر مشهور بجودته العالية",
    tips: "يتحمل الحرارة والجفاف، يحتاج برودة شتوية",
  },
  // العنب
  {
    id: "grapes",
    nameAr: "العنب",
    nameEn: "Grapes",
    category: "fruits",
    emoji: "🍇",
    plantingMonths: [1, 2],
    harvestMonths: [6, 7, 8],
    suitableRegions: ["dakhliyah", "dhahirah", "musandam"],
    waterNeeds: "متوسطة",
    description: "يُزرع في المناطق الجبلية المعتدلة",
    tips: "يحتاج تقليماً سنوياً وعرائش للدعم",
  },
  // الجلبانة (بازلاء)
  {
    id: "peas",
    nameAr: "البازلاء",
    nameEn: "Peas",
    category: "vegetables",
    emoji: "🫛",
    plantingMonths: [10, 11],
    harvestMonths: [1, 2],
    suitableRegions: ["dakhliyah", "musandam", "batinah_north"],
    waterNeeds: "منخفضة",
    description: "يُزرع شتاءً في المناطق المعتدلة",
    tips: "يحتاج دعامات للتسلق، يُحسّن التربة بتثبيت النيتروجين",
  },
  // الباذنجان
  {
    id: "eggplant",
    nameAr: "الباذنجان",
    nameEn: "Eggplant",
    category: "vegetables",
    emoji: "🍆",
    plantingMonths: [9, 10, 2, 3],
    harvestMonths: [11, 12, 1, 5, 6],
    suitableRegions: ["batinah_north", "muscat", "dakhliyah"],
    waterNeeds: "متوسطة",
    description: "ينمو جيداً في الطقس الدافئ",
    tips: "يُزرع في الشتاء العُماني المعتدل",
  },
];

export const MONTHS_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

export const getCropsByRegion = (regionId: string) =>
  CROPS.filter((c) => c.suitableRegions.includes(regionId));

export const getCropsByMonth = (month: number) =>
  CROPS.filter((c) => c.plantingMonths.includes(month));

export const getCropsByRegionAndMonth = (regionId: string, month: number) =>
  CROPS.filter(
    (c) => c.suitableRegions.includes(regionId) && c.plantingMonths.includes(month)
  );
