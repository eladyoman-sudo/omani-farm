# 🧪 اختبار الـ API محلياً

## الخطوة 1: تأكد من npm install

```bash
npm install
```

يجب أن تكون لديك المكتبات:
- ✅ mongoose
- ✅ bcryptjs
- ✅ @types/bcryptjs

---

## الخطوة 2: إعداد البيانات المحلية

### أ) إنشاء MongoDB محلي (اختياري)

**الخيار 1: MongoDB Atlas (سهل)**
```
اذهب إلى: https://www.mongodb.com/cloud/atlas
انسخ الـ Connection String
```

**الخيار 2: MongoDB Community (محلي)**
```bash
# على Windows:
# حمّل من: https://www.mongodb.com/try/download/community

# بعد التثبيت:
mongod

# في نافذة أخرى:
mongosh
```

### ب) تحديث .env.local

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/omani-farm?retryWrites=true&w=majority
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

---

## الخطوة 3: تشغيل التطبيق

```bash
npm run dev
```

يجب أن ترى:
```
▲ Next.js 16.2.7
- Local:        http://localhost:3000
```

---

## الخطوة 4: اختبار الـ API

### استخدام Postman أو cURL

#### 1. إنشاء حساب جديد (Sign Up)

**POST** `http://localhost:3000/api/auth/signup`

**Body (JSON):**
```json
{
  "email": "farmer@omani.com",
  "password": "Password123!",
  "name": "محمد الفارس",
  "role": "farmer",
  "region": "مسقط"
}
```

**الرد المتوقع (201):**
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "email": "farmer@omani.com",
    "name": "محمد الفارس",
    "role": "farmer",
    "region": "مسقط",
    "verified": false,
    "createdAt": "2026-06-02T..."
  }
}
```

---

#### 2. تسجيل الدخول (Login)

**POST** `http://localhost:3000/api/auth/login`

**Body (JSON):**
```json
{
  "emailOrPhone": "farmer@omani.com",
  "password": "Password123!"
}
```

**الرد المتوقع (200):**
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "email": "farmer@omani.com",
    "name": "محمد الفارس",
    "role": "farmer",
    "region": "مسقط",
    "verified": false
  }
}
```

---

#### 3. اختبار بيانات خاطئة

**POST** `http://localhost:3000/api/auth/login`

**Body (JSON):**
```json
{
  "emailOrPhone": "notexist@omani.com",
  "password": "wrong"
}
```

**الرد المتوقع (401):**
```json
{
  "error": "بيانات الدخول غير صحيحة"
}
```

---

## الخطوة 5: اختبار الـ UI

### 1. اذهب إلى صفحة Sign Up
```
http://localhost:3000/auth/signup
```

- املأ النموذج بالبيانات
- اضغط "اتبع الخطوة التالية"
- الحساب يجب أن ينشأ في MongoDB

### 2. اذهب إلى صفحة Login
```
http://localhost:3000/auth/login
```

- استخدم البريد الإلكتروني أو الهاتف
- استخدم كلمة المرور
- يجب أن ينجح التسجيل

### 3. شاهد Profile
```
http://localhost:3000/profile
```

- يجب أن تشوف بيانات المستخدم
- اضغط "تعديل الملف الشخصي"

---

## 🐛 Troubleshooting

### خطأ: "MONGODB_URI not found"

**المشكلة:**
```
Error: MONGODB_URI environment variable is not set
```

**الحل:**
```
1. تأكد من وجود .env.local في المجلد الرئيسي
2. أضف فيه:
   MONGODB_URI=mongodb+srv://...
3. أعد تشغيل التطبيق (Ctrl+C ثم npm run dev)
```

---

### خطأ: "bcryptjs not found"

**المشكلة:**
```
Module not found: Can't resolve 'bcryptjs'
```

**الحل:**
```bash
npm install bcryptjs @types/bcryptjs
npm run dev
```

---

### خطأ: "Connect ECONNREFUSED"

**المشكلة:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**الحل:**
1. **تأكد من MongoDB Atlas:**
   - الـ connection string صحيح في .env.local
   - IP whitelist يسمح بـ 0.0.0.0/0

2. **أو شغّل MongoDB محلي:**
   ```bash
   mongod
   ```

---

### خطأ: "Duplicate key error"

**المشكلة:**
```
MongoError: E11000 duplicate key error
```

**الحل:**
```bash
# حذف البيانات القديمة من MongoDB Atlas:
# اذهب إلى MongoDB Atlas Dashboard
# اختر Database
# اضغط Delete Collection
# أعد المحاولة
```

---

## 📊 مراقبة الـ Logs

### في Terminal:

```bash
# شغّل التطبيق مع logs مفصلة
npm run dev
```

### شاهد الأخطاء:

```
[api/auth/signup] User created successfully
[api/auth/login] User logged in
```

---

## ✅ مؤشرات النجاح

- [x] npm install اكتمل
- [x] .env.local يحتوي على MONGODB_URI
- [x] تطبيق يشتغل على http://localhost:3000
- [x] POST /api/auth/signup ينجح
- [x] POST /api/auth/login ينجح
- [x] بيانات محفوظة في MongoDB
- [x] User Profile يعرض البيانات الصحيحة

**لما تتأكد من كل هذا → أنت مستعد للنشر على Vercel! 🚀**

---

## الخطوة التالية

1. **اقرأ DEPLOYMENT.md** للنشر على Vercel
2. **أنشئ حساب MongoDB Atlas**
3. **أنشئ حساب Vercel وربط GitHub**
4. **اضف environment variables**
5. **Deploy! 🚀**
