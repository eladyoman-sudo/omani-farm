# 🚀 دليل النشر على Vercel

## خطوة 1: إعداد MongoDB (مجاني)

### 1.1 إنشاء حساب MongoDB
```
اذهب إلى: https://www.mongodb.com/cloud/atlas
Sign up → Create Free Account
```

### 1.2 إنشاء Cluster
1. **Build your database** → اختر "Shared" (مجاني)
2. **اختر المنطقة** (اختر القريبة منك)
3. **اسم الـ Cluster**: `omani-farm` أو أي اسم
4. **انتظر التفعيل** (2-3 دقائق)

### 1.3 الحصول على Connection String
1. **اذهب إلى "Database"** → **"Connect"**
2. **اختر "Drivers"** → **"Node.js"**
3. **انسخ الـ connection string**:
```
mongodb+srv://username:password@cluster.mongodb.net/omani-farm?retryWrites=true&w=majority
```

---

## خطوة 2: إعداد Vercel (مجاني!)

### 2.1 ربط GitHub
1. **اذهب إلى**: https://vercel.com
2. **Sign Up with GitHub**
3. **اتصل بـ GitHub** (يطلب الإذن)

### 2.2 Import المشروع
1. **اضغط "New Project"**
2. **اختر `omani-farm` من GitHub**
3. **اضغط "Import"**

### 2.3 إضافة Environment Variables
في صفحة الـ Import:

1. **أضف `MONGODB_URI`**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/omani-farm?retryWrites=true&w=majority
   ```

2. **أضف `NEXTAUTH_SECRET`**:
   ```
   (generate random string: openssl rand -base64 32)
   ```

3. **اضغط "Deploy"** ✅

---

## خطوة 3: أول Deploy

**في جهازك المحلي:**

```bash
# اتأكد الكود بلاش في git
git status

# اضغط كل التعديلات
git add .
git commit -m "إضافة MongoDB والـ API routes"
git push origin main
```

**Vercel يندشر تلقائياً** (1-2 دقيقة)

---

## 🔄 التحديثات والتطوير

### تطوير محلي:
```bash
# شغّل التطبيق محلياً
npm run dev

# اذهب إلى: http://localhost:3000
```

### النشر:
```bash
# أي تعديل على الكود
nano app/page.tsx

# رفع للـ GitHub
git add .
git commit -m "وصف التعديل"
git push origin main

# ✅ Vercel ينشر تلقائياً
```

---

## 🔐 الأمان

### البيانات الحساسة:
```
❌ لا تضع في الكود:
   - MONGODB_URI
   - API Keys
   - Secrets

✅ ضعها في:
   - Vercel Environment Variables فقط
   - أو في .env.local المحلي (لا تضفه لـ git)
```

### ملف `.gitignore`:
```
node_modules/
.env.local
.env*.local
```

---

## 📊 مراقبة الـ Deploy

### في Vercel Dashboard:
- **Deployments**: شف حالة كل deploy
- **Logs**: شف errors و messages
- **Environment**: تعديل variables

### البيانات الحقيقية:
- **MongoDB Atlas**: شف البيانات والـ backups
- **Analytics**: شف عدد الزوار

---

## 🔗 الـ URLs

بعد النشر:
```
الموقع الرئيسي:
https://your-project.vercel.app

تسجيل دخول:
https://your-project.vercel.app/auth/login

إنشاء حساب:
https://your-project.vercel.app/auth/signup

الملف الشخصي:
https://your-project.vercel.app/profile
```

---

## 🛠️ Troubleshooting

### "MONGODB_URI not found"
```
✅ أضفها في Vercel Environment Variables
✅ اضغط Redeploy
```

### "Database connection error"
```
✅ تحقق من الـ connection string
✅ تأكد أن الـ IP whitelist يسمح بـ 0.0.0.0/0 (في MongoDB Atlas)
```

### "Build failed"
```
✅ شوف الـ logs في Vercel
✅ تأكد من:
   - npm install تم بنجاح
   - لا توجد TypeScript errors
   - الـ environment variables موجودة
```

---

## 💰 التكاليف

### مجاني:
- ✅ Vercel Hobby (unlimited deployments, 100GB bandwidth)
- ✅ MongoDB Atlas (512MB free)
- ✅ Custom domain الأول مجاني

### لما تنمو:
- Vercel Pro: $20/شهر (unlimited bandwidth)
- MongoDB Atlas: ~$57/شهر (dedicated server)

---

## 📈 الخطوات التالية

بعد النشر:
1. **الدومين المخصص** (optional)
2. **قاعدة بيانات Production** (لما تنمو)
3. **CI/CD pipeline** (لو تريد اختبارات)
4. **Monitoring و Alerts** (ملاقبة الأخطاء)

---

**الآن أنت مستعد للنشر! 🚀**
