import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const { error } = await supabase
    .from("user_profiles") // replace with your actual table name
    .insert([data]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "User added successfully" },
    { status: 200 }
  );
}
