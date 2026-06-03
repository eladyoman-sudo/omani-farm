export interface Farm {
  id: string;
  name: string;
  nameAr: string;
  type: "مزرعة" | "متجر" | "مركز توزيع" | "سوق";
  region: string;
  lat: number;
  lng: number;
  crops: string[];
  phone: string;
  description: string;
  rating: number;
}

export const FARMS: Farm[] = [
  // مسقط
  {
    id: "farm_1",
    name: "Green Valley Farm",
    nameAr: "مزرعة الوادي الأخضر",
    type: "مزرعة",
    region: "muscat",
    lat: 23.6100,
    lng: 58.5400,
    crops: ["dates", "lime", "mango"],
    phone: "97399123456",
    description: "مزرعة متخصصة في التمور والليمون العُماني عالي الجودة",
    rating: 4.8,
  },
  {
    id: "store_1",
    name: "Al-Baraka Agricultural Market",
    nameAr: "سوق البركة الزراعي",
    type: "متجر",
    region: "muscat",
    lat: 23.5900,
    lng: 58.4900,
    crops: ["dates", "lime", "tomato", "cucumber"],
    phone: "97399234567",
    description: "متجر متخصص في بيع المحاصيل الطازجة يومياً",
    rating: 4.5,
  },

  // الباطنة الشمالية
  {
    id: "farm_2",
    name: "Al-Batinah Lime Farms",
    nameAr: "مزارع الليمون بالباطنة",
    type: "مزرعة",
    region: "batinah_north",
    lat: 24.2500,
    lng: 56.6800,
    crops: ["lime", "banana", "dates"],
    phone: "97399345678",
    description: "أكبر مزرعة ليمون عُماني معروفة عالمياً - الليمون الأسود المجفف",
    rating: 4.9,
  },
  {
    id: "center_1",
    name: "Sohar Agricultural Distribution",
    nameAr: "مركز صحار الزراعي للتوزيع",
    type: "مركز توزيع",
    region: "batinah_north",
    lat: 24.3600,
    lng: 56.7400,
    crops: ["all"],
    phone: "97399456789",
    description: "مركز توزيع رئيسي للمحاصيل إلى الأسواق والمتاجر",
    rating: 4.6,
  },

  // الداخلية
  {
    id: "farm_3",
    name: "Green Mountain Farm",
    nameAr: "مزرعة الجبل الأخضر",
    type: "مزرعة",
    region: "dakhliyah",
    lat: 23.0000,
    lng: 57.5200,
    crops: ["pomegranate", "grapes", "apricot"],
    phone: "97399567890",
    description: "مزرعة جبلية متخصصة في الرمان والعنب عالي الارتفاع",
    rating: 4.7,
  },
  {
    id: "market_1",
    name: "Nizwa Central Market",
    nameAr: "سوق نزوى المركزي",
    type: "سوق",
    region: "dakhliyah",
    lat: 22.9333,
    lng: 57.5333,
    crops: ["dates", "pomegranate", "grapes", "vegetables"],
    phone: "97399678901",
    description: "سوق تاريخي عريق لبيع التمور والفواكه والخضروات",
    rating: 4.4,
  },

  // الشرقية الشمالية
  {
    id: "farm_4",
    name: "Sharqiyah Vegetable Farms",
    nameAr: "مزارع الشرقية للخضروات",
    type: "مزرعة",
    region: "sharqiyah_north",
    lat: 22.6000,
    lng: 58.4500,
    crops: ["tomato", "cucumber", "okra"],
    phone: "97399789012",
    description: "متخصصة في الخضروات الطازجة والموسمية",
    rating: 4.3,
  },

  // ظفار
  {
    id: "farm_5",
    name: "Dhofar Khareef Farms",
    nameAr: "مزارع ظفار الخريف",
    type: "مزرعة",
    region: "dhofar",
    lat: 17.2000,
    lng: 54.3600,
    crops: ["banana", "papaya", "mango", "coconut"],
    phone: "97399890123",
    description: "مزرعة استوائية في موسم الخريف - منتجات فريدة",
    rating: 4.8,
  },
  {
    id: "market_2",
    name: "Salalah Fruit Market",
    nameAr: "سوق صلالة للفواكه",
    type: "سوق",
    region: "dhofar",
    lat: 17.0197,
    lng: 54.0924,
    crops: ["banana", "coconut", "papaya", "mango"],
    phone: "97399901234",
    description: "سوق متخصص في الفواكه الاستوائية بصلالة",
    rating: 4.5,
  },

  // الظاهرة
  {
    id: "farm_6",
    name: "Dhahirah Date Farm",
    nameAr: "مزرعة الظاهرة للتمور",
    type: "مزرعة",
    region: "dhahirah",
    lat: 23.7000,
    lng: 56.5200,
    crops: ["dates"],
    phone: "97399012345",
    description: "متخصصة في إنتاج أجود أنواع التمور العُمانية",
    rating: 4.6,
  },

  // البريمي
  {
    id: "farm_7",
    name: "Buraimi Date & Palm",
    nameAr: "مزرعة البريمي للنخيل والتمور",
    type: "مزرعة",
    region: "buraimi",
    lat: 24.2333,
    lng: 55.7833,
    crops: ["dates", "palm"],
    phone: "97399123401",
    description: "حقول نخيل تقليدية متخصصة في أصناف البريمي المشهورة",
    rating: 4.5,
  },

  // مسندم
  {
    id: "farm_8",
    name: "Musandam Mountain Orchards",
    nameAr: "بساتين مسندم الجبلية",
    type: "مزرعة",
    region: "musandam",
    lat: 26.2500,
    lng: 56.3000,
    crops: ["grapes", "pomegranate", "apricot"],
    phone: "97399234401",
    description: "بساتين جبلية في أعلى ارتفاعات عُمان",
    rating: 4.7,
  },
];

export const getFarmsByRegion = (regionId: string) =>
  FARMS.filter((f) => f.region === regionId);

export const getFarmsByType = (type: string) =>
  FARMS.filter((f) => f.type === type);

export const getFarmsByCrop = (cropId: string) =>
  FARMS.filter((f) => f.crops.includes(cropId) || f.crops.includes("all"));

export const getNearbyFarms = (lat: number, lng: number, maxDistance = 50) => {
  return FARMS.sort((a, b) => {
    const distA = Math.sqrt(Math.pow(a.lat - lat, 2) + Math.pow(a.lng - lng, 2));
    const distB = Math.sqrt(Math.pow(b.lat - lat, 2) + Math.pow(b.lng - lng, 2));
    return distA - distB;
  }).slice(0, maxDistance);
};
