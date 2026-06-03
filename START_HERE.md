# ✅ قائمة التحقق الفورية (Quick Start Checklist)

## ⚡ 5 دقائق فقط للبدء

### الخطوة 1: التحضير
\\\ash
# اذهب للمجلد
cd C:\Users\elady\omani-farm

# تحقق من npm
npm --version
# يجب أن تشاهد: v18.0.0 أو أحدث

# تحقق من المكتبات
npm list mongoose bcryptjs
# يجب أن تشاهد كلاهما مثبوتاً
\\\

### الخطوة 2: إعداد البيانات

\\\ash
# انسخ نموذج البيانات
copy .env.example .env.local

# فتح .env.local وأضف:
# MONGODB_URI=mongodb+srv://...
\\\

### الخطوة 3: تشغيل التطبيق

\\\ash
# شغّل التطبيق
npm run dev

# في المتصفح: http://localhost:3000
\\\

### الخطوة 4: اختبار الميزات

- [ ] الصفحة الرئيسية تحمّل
- [ ] الـ navbar يظهر
- [ ] زر "أنشئ حساب" يعمل
- [ ] يمكنك الانتقال إلى signup
- [ ] يمكنك الانتقال إلى login
- [ ] يمكنك الانتقال إلى profile

### الخطوة 5: إنشاء حساب حقيقي

\\\
اذهب إلى: http://localhost:3000/auth/signup

اختر: البريد الإلكتروني

أملأ:
  - البريد: test@omani.com
  - كلمة المرور: Pass123!
  - الاسم: محمد الفارس
  - النوع: مزارع
  - المحافظة: مسقط

اضغط: إنهاء
\\\

### الخطوة 6: تسجيل الدخول

\\\
اذهب إلى: http://localhost:3000/auth/login

أدخل:
  - البريد: test@omani.com
  - كلمة المرور: Pass123!

اضغط: دخول
\\\

### الخطوة 7: شاهد الملف الشخصي

\\\
يجب أن ترى:
- اسمك: محمد الفارس
- نوعك: مزارع 👨‍🌾
- منطقتك: مسقط
- بيانات أخرى
\\\

---

## 🚨 إذا حدثت مشاكل:

### المشكلة: npm install فشل
\\\
الحل:
npm cache clean --force
npm install
\\\

### المشكلة: Port 3000 مشغول
\\\
الحل:
npm run dev -- -p 3001
# استخدم 3001 بدلاً من 3000
\\\

### المشكلة: MongoDB غير موجود
\\\
الحل 1: استخدم MongoDB Atlas
  - اذهب إلى https://www.mongodb.com/cloud/atlas
  - أنشئ cluster
  - انسخ connection string
  - ضعها في .env.local

الحل 2: استخدم MongoDB محلي
  - حمّل من https://www.mongodb.com/try/download/community
  - ثبّت
  - شغّل mongod
\\\

### المشكلة: "MONGODB_URI not found"
\\\
الحل:
1. تأكد من وجود ملف .env.local
2. أضف فيه MONGODB_URI
3. أعد تشغيل npm run dev
4. Ctrl+C ثم npm run dev
\\\

---

## 📁 الملفات المهمة:

`
README.md           - دليل شامل
QUICKSTART.md       - البدء السريع
ARCHITECTURE.md     - شرح معماري
API_TESTING.md      - اختبار API
DEPLOYMENT.md       - النشر على Vercel
DATA_MIGRATION.md   - نقل البيانات
.env.example        - مثال الـ variables
`

---

## ✨ علامات النجاح:

- [x] npm install اكتمل
- [ ] npm run dev يشتغل بدون أخطاء
- [ ] http://localhost:3000 يحمّل الصفحة
- [ ] يمكن إنشاء حساب جديد
- [ ] يمكن تسجيل الدخول
- [ ] الملف الشخصي يعرض البيانات
- [ ] يمكن تسجيل الخروج

**لما تتأكد من كل الأشياء → اقرأ DEPLOYMENT.md**

---

## 🚀 الخطوة التالية:

1. ✅ شغّل التطبيق محلياً
2. ✅ اختبر جميع الميزات
3. ⏭️ اقرأ DEPLOYMENT.md
4. ⏭️ انشر على Vercel
5. ⏭️ أخبر الناس! 🌍

**وقت التشغيل الكلي: 15 دقيقة ⏱️**

صُنع بـ ❤️ لأجل عمان 🇴🇲
