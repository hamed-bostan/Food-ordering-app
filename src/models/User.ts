// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  phone_number: string;
  otp?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  otpExpiresAt?: Date;
}

const UserSchema = new Schema<IUser>({
  phone_number: { type: String, required: true, unique: true },
  otp: String,
  otpExpiresAt: Date,
  first_name: String,
  last_name: String,
  email: String,
});

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
