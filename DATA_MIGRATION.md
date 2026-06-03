# 📊 دليل نقل البيانات من Mock إلى Production

## المقدمة

التطبيق الآن يستخدم بيانات حقيقية في MongoDB بدلاً من mock data محفوظ في الملفات.

---

## البيانات الحالية

### 1. بيانات المستخدمين
```
الموقع: MongoDB collections/users
البيانات: 
  - email (فريد)
  - phone (فريد)
  - password (مشفر بـ bcrypt)
  - name, role, region, rating, etc.
  
API: POST /api/auth/signup, POST /api/auth/login
```

### 2. بيانات المحاصيل (Mock)
```
الموقع: app/data/crops.ts (ملف ثابت)
البيانات: 20+ محصول مع:
  - أسماء (عربي/إنجليزي)
  - شهر الزراعة والحصاد
  - احتياجات المياه
  - المحافظات المناسبة
  
الحالة: تُقرأ من الملف (لا تُحفظ في DB)
```

### 3. بيانات المحافظات (Mock)
```
الموقع: app/data/regions.ts
البيانات: 11 محافظة عمانية مع:
  - الأسماء العربية والإنجليزية
  - الإحداثيات الجغرافية
  - المناخ والتربة
  - المصادر المائية
  - الألوان للخريطة
  
الحالة: بيانات ثابتة
```

### 4. بيانات الأفلاج (Mock)
```
الموقع: app/data/aflaj.ts
البيانات: 8 أنظمة ري تقليدية:
  - الإحداثيات
  - معلومات UNESCO
  - المحافظة التابعة لها
  
الحالة: بيانات ثابتة
```

### 5. بيانات المزارع (Mock)
```
الموقع: app/data/farms.ts
البيانات: 8 مزارع/تجار مع:
  - الأسماء والموقع
  - رقم الهاتف والبريد
  - نوع المنتجات
  - التقييمات
  
الحالة: بيانات ثابتة (يمكن أن تصبح حقيقية)
```

---

## الخطة: نقل Mock Data إلى MongoDB

### المرحلة 1: بيانات المحاصيل (Crops)

#### 1. إنشاء Crop Model

```typescript
// models/Crop.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICrop extends Document {
  name_ar: string;
  name_en: string;
  plantMonth: number;
  harvestMonth: number;
  waterNeeds: "low" | "medium" | "high";
  regions: string[];
  description: string;
  benefits: string[];
  createdAt: Date;
  updatedAt: Date;
}

const cropSchema = new Schema<ICrop>(
  {
    name_ar: { type: String, required: true },
    name_en: { type: String, required: true },
    plantMonth: { type: Number, min: 1, max: 12 },
    harvestMonth: { type: Number, min: 1, max: 12 },
    waterNeeds: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    regions: [String],
    description: String,
    benefits: [String],
  },
  { timestamps: true }
);

export const Crop =
  mongoose.models.Crop || mongoose.model<ICrop>("Crop", cropSchema);
```

#### 2. إنشاء API endpoint

```typescript
// app/api/crops/list/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Crop } from "@/models/Crop";

export async function GET() {
  try {
    await connectDB();
    const crops = await Crop.find();
    return NextResponse.json({ crops }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch crops" }, { status: 500 });
  }
}
```

#### 3. تحميل البيانات

```typescript
// scripts/seed-crops.ts (script واحد)
import { connectDB } from "@/lib/db";
import { Crop } from "@/models/Crop";
import { crops } from "@/app/data/crops";

async function seedCrops() {
  await connectDB();
  await Crop.deleteMany({}); // حذف البيانات القديمة
  
  for (const crop of crops) {
    await Crop.create({
      name_ar: crop.name_ar,
      name_en: crop.name_en,
      plantMonth: crop.plantMonth,
      harvestMonth: crop.harvestMonth,
      waterNeeds: crop.waterNeeds,
      regions: crop.suitable_regions,
      description: crop.description,
    });
  }
  
  console.log("✅ Crops seeded successfully");
}

seedCrops();
```

---

### المرحلة 2: بيانات المزارع (Farms)

#### 1. إنشاء Farm Model

```typescript
// models/Farm.ts
export interface IFarm extends Document {
  name: string;
  owner_id: mongoose.Types.ObjectId; // Link to User
  region: string;
  location: {
    latitude: number;
    longitude: number;
  };
  crops: string[]; // محاصيل المزرعة
  description: string;
  phone: string;
  email: string;
  rating: number; // 0-5
  reviews: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 2. تحديث User Model

```typescript
// أضف هذا الحقل إلى User schema:
farm_id: mongoose.Types.ObjectId, // Link إلى farm إن كان مالك مزرعة
```

---

### المرحلة 3: بيانات الرسائل والتقييمات

#### 1. Message Model
```typescript
export interface IMessage extends Document {
  sender_id: mongoose.Types.ObjectId;
  receiver_id: mongoose.Types.ObjectId;
  subject: string;
  body: string;
  read: boolean;
  createdAt: Date;
}
```

#### 2. Review Model
```typescript
export interface IReview extends Document {
  reviewer_id: mongoose.Types.ObjectId;
  farm_id: mongoose.Types.ObjectId;
  rating: number; // 1-5
  comment: string;
  helpful_count: number;
  createdAt: Date;
}
```

---

## جدول النقل الموصى به

| المرحلة | البيانات | الوقت | الأولوية |
|--------|---------|------|---------|
| 1 | Users (حالي) | ✅ تم | عالية جداً |
| 2 | Crops | 30 دقيقة | عالية |
| 3 | Farms | 45 دقيقة | عالية |
| 4 | Reviews | 30 دقيقة | متوسطة |
| 5 | Messages | 30 دقيقة | متوسطة |
| 6 | Listings (Market) | 45 دقيقة | متوسطة |

---

## خطوات التنفيذ

### الخطوة 1: إنشاء Models

```bash
# أنشئ الملفات:
models/Crop.ts
models/Farm.ts
models/Review.ts
models/Message.ts
models/Listing.ts
```

### الخطوة 2: إنشاء API Endpoints

```bash
# أنشئ الملفات:
app/api/crops/list/route.ts
app/api/farms/list/route.ts
app/api/farms/nearby/route.ts
app/api/reviews/create/route.ts
app/api/messages/send/route.ts
```

### الخطوة 3: تحديث الصفحات

```bash
# استخدم البيانات من API بدلاً من Mock
app/crops/page.tsx      (GET من /api/crops/list)
app/marketplace/page.tsx (GET من /api/listings/list)
app/farms/page.tsx      (GET من /api/farms/nearby)
```

### الخطوة 4: اختبار وتثبيت النقل

```bash
npm run dev
# اختبر كل صفحة مع البيانات الجديدة
```

---

## كود مثال: نقل Crops

### قبل (Mock Data):
```typescript
// app/crops/page.tsx
import { crops } from "@/app/data/crops";

export default function CropsPage() {
  return (
    <div>
      {crops.map(crop => (
        <div key={crop.id}>
          <h3>{crop.name_ar}</h3>
          <p>Plant: {crop.plantMonth}</p>
        </div>
      ))}
    </div>
  );
}
```

### بعد (Real Data):
```typescript
// app/crops/page.tsx
"use client";
import { useState, useEffect } from "react";

export default function CropsPage() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCrops() {
      const res = await fetch("/api/crops/list");
      const data = await res.json();
      setCrops(data.crops);
      setLoading(false);
    }
    fetchCrops();
  }, []);

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div>
      {crops.map(crop => (
        <div key={crop._id}>
          <h3>{crop.name_ar}</h3>
          <p>Plant: {crop.plantMonth}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## نصائح مهمة

### 🔐 الأمان
- تحقق من أن المستخدم مصرح له قبل إرسال البيانات
- استخدم authentication tokens (قريباً)

### 📊 الأداء
- استخدم pagination للبيانات الكبيرة
- أضف caching للبيانات التي لا تتغير كثيراً

### 🔄 النسخ الاحتياطية
- MongoDB Atlas توفر backups يومية
- اختبر restore من backup مرة شهرياً

---

## الخلاصة

التطبيق يمكن أن ينقل تدريجياً من:
1. ✅ Mock users → Real MongoDB users (تم)
2. ⏳ Mock crops → Real MongoDB crops (قادم)
3. ⏳ Mock farms → Real MongoDB farms (قادم)
4. ⏳ Mock reviews → Real MongoDB reviews (قادم)
5. ⏳ Mock messages → Real MongoDB messages (قادم)

**كل خطوة تستغرق 30-45 دقيقة فقط!**

صُنع بـ ❤️ لأجل عمان 🇴🇲
