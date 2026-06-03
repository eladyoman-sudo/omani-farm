import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email?: string;
  phone?: string;
  password?: string;
  name: string;
  role: "farmer" | "trader" | "admin";
  avatar?: string;
  region?: string;
  bio?: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: String,
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["farmer", "trader", "admin"],
      default: "farmer",
    },
    avatar: String,
    region: String,
    bio: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// منع إعادة تعريف النموذج
export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
