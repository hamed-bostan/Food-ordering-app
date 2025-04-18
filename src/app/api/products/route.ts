import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}
