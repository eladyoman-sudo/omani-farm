export interface User {
  id: string;
  email?: string;
  phone?: string;
  password?: string;
  name: string;
  role: "farmer" | "trader" | "admin";
  avatar?: string;
  region?: string;
  bio?: string;
  rating?: number;
  createdAt: string;
  verified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock users database
export const MOCK_USERS: User[] = [
  {
    id: "user_1",
    email: "farmer@omani.com",
    password: "password123", // In real app, this would be hashed
    name: "أحمد المزارع",
    role: "farmer",
    region: "batinah_north",
    bio: "مزارع متخصص في الليمون العُماني",
    rating: 4.8,
    createdAt: new Date().toISOString(),
    verified: true,
  },
  {
    id: "user_2",
    email: "trader@omani.com",
    password: "password123",
    name: "سالم التاجر",
    role: "trader",
    region: "muscat",
    bio: "تاجر فواكه وخضروات موثوق",
    rating: 4.5,
    createdAt: new Date().toISOString(),
    verified: true,
  },
];

// Simulate user registration
export const registerUser = (user: Partial<User>): User => {
  const newUser: User = {
    id: `user_${Date.now()}`,
    name: user.name || "مستخدم جديد",
    role: user.role || "farmer",
    email: user.email,
    phone: user.phone,
    password: user.password,
    region: user.region,
    bio: "",
    rating: 0,
    createdAt: new Date().toISOString(),
    verified: false,
  };

  MOCK_USERS.push(newUser);
  return newUser;
};

// Simulate user login
export const loginUser = (emailOrPhone: string, password: string): User | null => {
  const user = MOCK_USERS.find(
    (u) => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password
  );
  return user || null;
};

// Find user by email
export const findUserByEmail = (email: string): User | null => {
  return MOCK_USERS.find((u) => u.email === email) || null;
};

// Find user by phone
export const findUserByPhone = (phone: string): User | null => {
  return MOCK_USERS.find((u) => u.phone === phone) || null;
};

// Simulate Google Sign-in
export const googleSignIn = (email: string, name: string): User => {
  let user = findUserByEmail(email);
  if (!user) {
    user = registerUser({
      email,
      name,
      role: "farmer",
      verified: true,
    });
  }
  return user;
};

// Generate OTP
export const generateOTP = (): string => {
  return Math.random().toString().slice(2, 8);
};

// Verify OTP (mock - in real app would be sent via SMS)
export const verifyOTP = (otp: string, storedOTP: string): boolean => {
  return otp === storedOTP;
};
