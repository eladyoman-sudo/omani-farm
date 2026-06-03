export interface Falaj {
  id: string;
  name: string;
  nameAr: string;
  region: string;
  lat: number;
  lng: number;
  type: "dawoodi" | "ghayli" | "aini";
  length_km: number;
  isUNESCO: boolean;
  description: string;
}

export const AFLAJ: Falaj[] = [
  {
    id: "falaj_daris",
    name: "Falaj Daris",
    nameAr: "فلج داريس",
    region: "dakhliyah",
    lat: 22.9308,
    lng: 57.5414,
    type: "dawoodi",
    length_km: 3.0,
    isUNESCO: true,
    description: "أكبر الأفلاج في عُمان وأحد مواقع التراث العالمي، يروي أكثر من 400 هكتار",
  },
  {
    id: "falaj_al_khatmain",
    name: "Falaj Al Khatmain",
    nameAr: "فلج الخطمين",
    region: "dakhliyah",
    lat: 22.9200,
    lng: 57.5200,
    type: "dawoodi",
    length_km: 4.5,
    isUNESCO: true,
    description: "أحد الأفلاج الخمسة المدرجة على قائمة اليونسكو",
  },
  {
    id: "falaj_al_malki",
    name: "Falaj Al Malki",
    nameAr: "فلج المالكي",
    region: "dakhliyah",
    lat: 22.9100,
    lng: 57.5300,
    type: "aini",
    length_km: 1.2,
    isUNESCO: true,
    description: "فلج عيني يعتمد على المياه الجوفية المرتفعة",
  },
  {
    id: "falaj_al_mayassar",
    name: "Falaj Al Mayassar",
    nameAr: "فلج الميسر",
    region: "sharqiyah_north",
    lat: 22.5500,
    lng: 58.5700,
    type: "dawoodi",
    length_km: 5.0,
    isUNESCO: true,
    description: "من أطول الأفلاج في المنطقة الشرقية",
  },
  {
    id: "falaj_al_jeela",
    name: "Falaj Al Jeela",
    nameAr: "فلج الجيلة",
    region: "batinah_north",
    lat: 23.9500,
    lng: 57.1000,
    type: "ghayli",
    length_km: 2.3,
    isUNESCO: false,
    description: "فلج غيلي يسير فوق سطح الأرض، يروي مزارع النخيل والليمون",
  },
  {
    id: "falaj_nizwa",
    name: "Falaj Nizwa",
    nameAr: "فلج نزوى",
    region: "dakhliyah",
    lat: 22.9333,
    lng: 57.5333,
    type: "dawoodi",
    length_km: 6.0,
    isUNESCO: false,
    description: "يروي مزارع نزوى التاريخية وحدائق النخيل",
  },
  {
    id: "falaj_rustaq",
    name: "Falaj Rustaq",
    nameAr: "فلج الرستاق",
    region: "batinah_south",
    lat: 23.3900,
    lng: 57.4300,
    type: "dawoodi",
    length_km: 3.5,
    isUNESCO: false,
    description: "يروي واحة الرستاق الخضراء",
  },
  {
    id: "falaj_izki",
    name: "Falaj Izki",
    nameAr: "فلج إزكي",
    region: "dakhliyah",
    lat: 22.9300,
    lng: 57.7800,
    type: "dawoodi",
    length_km: 2.8,
    isUNESCO: false,
    description: "من أعرق الأفلاج في منطقة الداخلية",
  },
];

export const SALINITY_AREAS = [
  {
    id: "batinah_coast_salinity",
    nameAr: "ساحل الباطنة المالح",
    lat: 24.0,
    lng: 57.0,
    level: "عالية",
    description: "تملح الطبقات السطحية بسبب الضخ الجائر للمياه الجوفية",
    region: "batinah_north",
  },
  {
    id: "muscat_salinity",
    nameAr: "منطقة مسقط الساحلية",
    lat: 23.5,
    lng: 58.5,
    level: "متوسطة",
    description: "ملوحة بسبب قرب البحر والاستخدام المكثف للمياه",
    region: "muscat",
  },
  {
    id: "wusta_salinity",
    nameAr: "منطقة الوسطى الصحراوية",
    lat: 20.5,
    lng: 57.5,
    level: "عالية جداً",
    description: "صحراء رملية مالحة، زراعة صعبة جداً",
    region: "wusta",
  },
];
