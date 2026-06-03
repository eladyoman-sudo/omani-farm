import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, phone, password, name, role, region } = await req.json();

    // Validation
    if (!name || !password) {
      return NextResponse.json(
        { error: "الاسم وكلمة المرور مطلوبة" },
        { status: 400 }
      );
    }

    if (!email && !phone) {
      return NextResponse.json(
        { error: "البريد الإلكتروني أو رقم الهاتف مطلوب" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [
        email ? { email } : null,
        phone ? { phone } : null,
      ].filter(Boolean),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "هذا المستخدم موجود بالفعل" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      email,
      phone,
      password: hashedPassword,
      name,
      role: role || "farmer",
      region,
      verified: false,
    });

    // Return user without password
    const userResponse = newUser.toObject();
    delete (userResponse as any).password;

    return NextResponse.json(
      {
        success: true,
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "حدث خطأ في إنشاء الحساب" },
      { status: 500 }
    );
  }
}
