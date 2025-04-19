import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const data = await req.json();

  const { error } = await supabase
    .from("users")
    .update(data)
    .eq("email", data.email); // or however you're identifying the user

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Success" });
}
