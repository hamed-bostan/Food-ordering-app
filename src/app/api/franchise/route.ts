// app/api/franchise/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Franchise from "@/models/Franchise";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const newFranchise = await Franchise.create(body);

    // Extract only the fields needed by FranchiseFormValues
    const {
      fullName,
      nationalId,
      phone,
      province,
      city,
      region,
      address,
      propertyArea,
      buildingAge,
      hasBusinessLicense,
      hasParking,
      hasKitchen,
      hasStorage,
    } = newFranchise;

    return NextResponse.json({
      success: true,
      data: {
        fullName,
        nationalId,
        phone,
        province,
        city,
        region,
        address,
        propertyArea,
        buildingAge,
        hasBusinessLicense,
        hasParking,
        hasKitchen,
        hasStorage,
      },
    });
  } catch (err) {
    console.error("Failed to submit franchise form:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
