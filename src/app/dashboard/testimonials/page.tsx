import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectToDatabase } from "@/lib/db/mongodb";
import TestimonialUploadPanel from "./components/TestimonialUploadPanel";

export default async function TestimonialsPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not logged in
  if (!session) redirect("/auth/otp");

  try {
    const databaseConnection = await connectToDatabase();

    // Fetch current user from DB
    const currentUser = await databaseConnection.collection("users").findOne({ _id: new ObjectId(session.user.id) });

    // Redirect if user not found or not admin
    if (!currentUser || currentUser.role !== "admin") redirect("/403");

    return <TestimonialUploadPanel />;
  } catch {
    redirect("/403");
  }
}
