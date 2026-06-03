# ⚡ البدء السريع (Quick Start)

## 5 دقائق فقط! ⏱️

### 1️⃣ اختبر التطبيق محلياً (2 دقيقة)

```bash
cd C:\Users\elady\omani-farm
npm install
npm run dev
```

ستشاهد:
```
▲ Next.js 16.2.7
- Local: http://localhost:3000
```

اذهب إلى: **http://localhost:3000** ✅

---

### 2️⃣ إنشاء حساب جديد (1 دقيقة)

1. اضغط على **"أنشئ حساب"** في الصفحة الرئيسية
2. اختر **"بريد إلكتروني"**
3. ملأ النموذج:
   ```
   البريد الإلكتروني: test@omani.com
   كلمة المرور: Password123!
   الاسم: محمد الفارس
   النوع: مزارع
   المحافظة: مسقط
   ```
4. اضغط **"إنهاء"** ✅

---

### 3️⃣ شاهد الملف الشخصي (1 دقيقة)

سيتم توجيهك إلى:
```
http://localhost:3000/profile
```

ستشاهد:
- صورة المستخدم (👨‍🌾 للمزارع، 🏪 للتاجر)
- البيانات الشخصية
- زر تسجيل الخروج

---

## 🔧 اختبار الـ API (اختياري)

### استخدام Postman:

**1. تحميل Postman** من: https://www.postman.com/downloads/

**2. إنشاء طلب جديد:**

```
Method: POST
URL: http://localhost:3000/api/auth/signup
Body (JSON):
{
  "email": "trader@omani.com",
  "password": "Password123!",
  "name": "أحمد التاجر",
  "role": "trader",
  "region": "سلالة"
}
```

اضغط **Send** وستشاهد الاستجابة! ✅

---

## 📱 الصفحات المتاحة

```
http://localhost:3000/                    الصفحة الرئيسية
http://localhost:3000/auth/signup         إنشاء حساب
http://localhost:3000/auth/login          تسجيل الدخول
http://localhost:3000/profile             الملف الشخصي
http://localhost:3000/marketplace         السوق (قريباً)
http://localhost:3000/crops               المحاصيل (قريباً)
http://localhost:3000/map                 الخريطة (قريباً)
```

---

## 🐛 حل المشاكل الشائعة

### المشكلة: "Cannot find module 'mongoose'"

**الحل:**
```bash
npm install mongoose bcryptjs @types/bcryptjs
npm run dev
```

---

### المشكلة: "Port 3000 is already in use"

**الحل:**
```bash
# في Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# أو استخدم port مختلف:
npm run dev -- -p 3001
```

---

### المشكلة: "MONGODB_URI not set"

**الحل 1: اختبار بدون MongoDB**
```
npm run dev

# يعمل بدون database
```

**الحل 2: إضافة MongoDB**
```
1. اذهب إلى: https://www.mongodb.com/cloud/atlas
2. أنشئ cluster (مجاني)
3. انسخ connection string
4. أضفها في .env.local:
   MONGODB_URI=mongodb+srv://...
5. أعد تشغيل التطبيق
```

---

## 📚 ملفات إضافية للقراءة

```
ARCHITECTURE.md     هندسة التطبيق الكاملة
API_TESTING.md     اختبار API بالتفصيل
DEPLOYMENT.md      نشر على Vercel
```

---

## ✨ الخطوة التالية

بعد التجربة المحلية:

### للنشر على الإنترنت:
```
1. اقرأ DEPLOYMENT.md
2. أنشئ حساب MongoDB Atlas
3. أنشئ حساب Vercel
4. انشر! 🚀
```

### لإضافة ميزات:
```
1. انظر إلى ARCHITECTURE.md
2. أضف endpoints جديدة في app/api/
3. أضف صفحات جديدة في app/
4. اختبر محلياً ثم انشر
```

---

## 🎉 تم!

الآن لديك:
- ✅ تطبيق يعمل محلياً
- ✅ مصادقة بريد/هاتف
- ✅ قاعدة بيانات جاهزة
- ✅ API endpoints
- ✅ توثيق كامل

**ماذا تختار التالي؟**
