// models/Franchise.ts
import mongoose from "mongoose";

const franchiseSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    nationalId: { type: String, required: true },
    phone: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    region: String,
    address: String,
    ownershipType: { type: String, required: true },
    propertyArea: String,
    buildingAge: String,
    hasBusinessLicense: Boolean,
    hasParking: Boolean,
    hasKitchen: Boolean,
    hasStorage: Boolean,
  },
  { timestamps: true }
);

const FranchiseModel =
  mongoose.models.Franchise || mongoose.model("Franchise", franchiseSchema);

export default FranchiseModel;
