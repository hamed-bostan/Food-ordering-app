import mongoose, { Schema, model, models } from "mongoose";

const OtpCodeSchema = new Schema(
  {
    phone: { type: String, required: true },
    code: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }, // Expires after 5 mins
  },
  { timestamps: true }
);

export const OtpCode = models.OtpCode || model("OtpCode", OtpCodeSchema);
