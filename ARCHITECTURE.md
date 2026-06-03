# 🏗️ هندسة التطبيق (Architecture)

## 📚 نظرة عامة

تطبيق زراعي عماني مبني على:
- **Frontend**: React + TypeScript (Next.js)
- **Backend**: Node.js API Routes
- **Database**: MongoDB
- **Hosting**: Vercel
- **Authentication**: Email/Phone + Password

---

## 🗂️ هيكل المشروع

```
omani-farm/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # الصفحة الرئيسية
│   ├── globals.css                # Design system
│   │
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx          # صفحة تسجيل الدخول
│   │   └── signup/
│   │       └── page.tsx          # صفحة إنشاء الحساب
│   │
│   ├── profile/
│   │   └── page.tsx              # الملف الشخصي
│   │
│   ├── marketplace/
│   │   └── page.tsx              # السوق (في التطوير)
│   │
│   ├── crops/
│   │   └── page.tsx              # الدليل الزراعي (في التطوير)
│   │
│   ├── map/
│   │   └── page.tsx              # خريطة المصادر المائية (في التطوير)
│   │
│   ├── api/
│   │   └── auth/
│   │       ├── login/
│   │       │   └── route.ts       # API: تسجيل الدخول
│   │       └── signup/
│   │           └── route.ts       # API: إنشاء حساب
│   │
│   ├── components/
│   │   └── Navbar.tsx             # شريط التنقل
│   │
│   ├── data/
│   │   ├── regions.ts             # بيانات المحافظات (11 محافظة)
│   │   ├── crops.ts               # بيانات المحاصيل (20+ محصول)
│   │   ├── aflaj.ts               # بيانات الأفلاج (أنظمة ري تقليدية)
│   │   └── farms.ts               # بيانات المزارع والتجار
│   │
│   ├── lib/
│   │   ├── auth-context.tsx       # Context للمصادقة
│   │   ├── db.ts                  # اتصال MongoDB
│   │
│   └── models/
│       └── User.ts                # Mongoose schema للمستخدم
│
├── .env.local                      # Environment variables (محلي)
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── next.config.ts                  # Next.js config
├── tailwind.config.ts              # Tailwind CSS config
│
├── DEPLOYMENT.md                   # دليل النشر على Vercel
├── API_TESTING.md                  # اختبار الـ API محلياً
└── ARCHITECTURE.md                 # هذا الملف
```

---

## 🔄 تدفق البيانات

### تسجيل الدخول (Login Flow)

```
1. المستخدم يفتح /auth/login
   ↓
2. يدخل البريد الإلكتروني وكلمة المرور
   ↓
3. يضغط "دخول"
   ↓
4. POST /api/auth/login
   ├─ البحث في MongoDB عن المستخدم
   ├─ تحقق من كلمة المرور (bcrypt)
   └─ أرجع المستخدم بدون كلمة المرور
   ↓
5. AuthContext يحفظ المستخدم في localStorage
   ↓
6. توجيه إلى /profile
```

---

### إنشاء الحساب (Signup Flow)

```
1. المستخدم يفتح /auth/signup
   ↓
2. Step 1: اختيار طريقة التسجيل (email/phone)
   ↓
3. Step 2: دخول البيانات الشخصية
   ├─ الاسم
   ├─ كلمة المرور
   ├─ النوع (مزارع/تاجر)
   └─ المحافظة
   ↓
4. Step 3: التحقق (يمكن تخطيه الآن)
   ↓
5. يضغط "إنهاء"
   ↓
6. POST /api/auth/signup
   ├─ التحقق من البيانات
   ├─ البحث عن مستخدم موجود
   ├─ Hash كلمة المرور (bcrypt)
   └─ حفظ في MongoDB
   ↓
7. AuthContext يحفظ المستخدم
   ↓
8. توجيه إلى /profile
```

---

## 🔐 الأمان

### كلمات المرور
```
❌ محفوظة كـ plain text
✅ محفوظة كـ bcrypt hash

عملية Hashing:
password ("123456") 
    ↓ (bcrypt with salt 10 rounds)
$2a$10$XYZ... (64 characters)
```

### البيانات الحساسة
```
❌ لا تُرسل في الـ URL:
   /api/auth/login?email=test@example.com

✅ ترسل في POST body (متشفر عبر HTTPS):
   POST /api/auth/login
   Content-Type: application/json
   {
     "emailOrPhone": "test@example.com",
     "password": "secret"
   }
```

### Session Management
```
1. عند الـ login الناجح:
   ← localStorage.setItem("current_user", JSON.stringify(user))

2. عند التحديث الصفحة:
   ← AuthProvider يقرأ من localStorage
   
3. عند الـ logout:
   ← localStorage.removeItem("current_user")
```

---

## 📊 نموذج البيانات (User)

### في MongoDB:

```typescript
{
  _id: ObjectId,
  email: "farmer@omani.com",
  phone: "96891234567",
  password: "$2a$10$...",  // bcrypt hash
  name: "محمد الفارس",
  role: "farmer" | "trader" | "admin",
  avatar: "👨‍🌾",
  region: "مسقط",
  bio: "مزارع متخصص في التمور",
  rating: 4.5,
  verified: false,
  createdAt: "2026-06-02T10:30:00Z",
  updatedAt: "2026-06-02T10:30:00Z"
}
```

### الحقول:
- **email**: إختياري، فريد على مستوى قاعدة البيانات
- **phone**: إختياري، فريد على مستوى قاعدة البيانات
- **password**: مطلوب، مشفر بـ bcrypt
- **name**: مطلوب
- **role**: farmer/trader/admin
- **region**: المحافظة (مسقط، البريمي، الشرقية، إلخ)
- **verified**: هل تم التحقق من البريد/الهاتف

---

## 🚀 دورة حياة التطبيق

### التطوير (Development)
```
1. npm run dev → http://localhost:3000
2. تعديل الملفات
3. Refresh الصفحة تلقائياً (HMR)
4. اختبار محلياً مع MongoDB
```

### الاختبار (Testing)
```
1. استخدم Postman/cURL لاختبار API
2. قراءة البيانات من MongoDB Atlas
3. التحقق من الأخطاء والـ edge cases
```

### النشر (Deployment)
```
1. git add . && git commit && git push
2. Vercel يكتشف التغيير تلقائياً
3. إعادة بناء التطبيق (2-3 دقائق)
4. نشر نسخة جديدة
5. https://your-project.vercel.app حي!
```

### الصيانة (Maintenance)
```
1. مراقبة الأخطاء في Vercel logs
2. مراقبة قاعدة البيانات في MongoDB Atlas
3. التحديثات التلقائية من GitHub
4. النسخ الاحتياطية التلقائية (MongoDB Atlas)
```

---

## 🔗 الـ API Endpoints

### POST /api/auth/signup
```
Request:
{
  "email": "farmer@omani.com",
  "phone": "96891234567",
  "password": "Password123!",
  "name": "محمد",
  "role": "farmer",
  "region": "مسقط"
}

Response (201):
{
  "success": true,
  "user": { _id, email, name, role, region, ... }
}

Errors (400/500):
{
  "error": "رسالة الخطأ"
}
```

### POST /api/auth/login
```
Request:
{
  "emailOrPhone": "farmer@omani.com",
  "password": "Password123!"
}

Response (200):
{
  "success": true,
  "user": { _id, email, name, role, region, ... }
}

Errors (401/500):
{
  "error": "بيانات الدخول غير صحيحة"
}
```

---

## 🌐 المحافظات (Regions)

11 محافظة عمانية:
```
1. مسقط (Muscat) - العاصمة
2. محافظة البريمي (Al Buraimi)
3. محافظة الدقم (Duqm)
4. محافظة السويق (Al Suwaiq)
5. محافظة الرستاق (Rustaq)
6. محافظة وادي بني خالد (Wadi Bani Khaled)
7. محافظة نخل (Nakhl)
8. محافظة كلباء (Kalba)
9. محافظة خور فكان (Khor Fakkan)
10. محافظة الفجيرة (Fujairah)
11. محافظة ظفار (Dhofar)
```

كل محافظة لها:
- مناخ خاص
- تربة معينة
- محاصيل مناسبة
- مصادر مياه (أفلاج وآبار)
- لون فريد في الخريطة

---

## 🌾 المحاصيل (Crops)

20+ محصول:
- **تمور**: فهود، خلاص، زحلاوي
- **خضروات**: طماطم، خيار، باذنجان
- **فواكه**: رمان، ليمون، مانجو
- **محاصيل أخرى**: الذرة، الشعير، البصل

كل محصول له:
- شهر الزراعة
- شهر الحصاد
- احتياجات المياه
- المحافظات المناسبة
- الوصف والفوائد

---

## 💾 قاعدة البيانات

### المجموعات (Collections):
1. **users** - المستخدمون (200+ في النهاية)
2. **listings** - قوائم البيع/الشراء (الآن في التطوير)
3. **reviews** - التقييمات (الآن في التطوير)
4. **messages** - الرسائل بين المستخدمين (الآن في التطوير)

### النسخ الاحتياطية:
- MongoDB Atlas توفر نسخ احتياطية يومية
- يمكن استعادة البيانات من أي نقطة زمنية

---

## 📈 النمو المستقبلي

### المرحلة 1 (الآن) ✅
- [x] المصادقة (Sign up/Login)
- [x] الملف الشخصي
- [ ] الصفحة الرئيسية (تحتاج تحديث)
- [ ] خريطة الأفلاج
- [ ] دليل المحاصيل

### المرحلة 2 (Q3 2026)
- [ ] السوق الزراعي (Buy/Sell)
- [ ] نظام التقييمات
- [ ] البحث عن المزارعين
- [ ] الرسائل المباشرة

### المرحلة 3 (Q4 2026)
- [ ] AI Agricultural Advisor
- [ ] التنبيهات الزراعية
- [ ] تقارير الأداء
- [ ] تطبيق الهاتف (React Native)

---

## 📞 الدعم

### في حالة الأسئلة:
- اقرأ **API_TESTING.md** للاختبار
- اقرأ **DEPLOYMENT.md** للنشر
- تحقق من MongoDB Atlas dashboard
- شاهد Vercel logs للأخطاء

---

## ✨ الخلاصة

تطبيق حديث مبني على:
- ✅ أحدث تقنيات (Next.js 16, React 19)
- ✅ معايير الأمان (bcrypt, HTTPS)
- ✅ قابلية النمو (MongoDB, Vercel)
- ✅ التطوير السريع (TypeScript, Tailwind)
- ✅ النشر التلقائي (GitHub + Vercel)

**أنت الآن تملك أساساً قوياً للتطبيق! 🎉**
