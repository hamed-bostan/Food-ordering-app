import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ProductUploadPanel from "./components/ProductUploadPanel";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/db/mongodb";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not logged in
  if (!session) redirect("/auth/otp");

  try {
    const databaseConnection = await connectToDatabase();

    // Fetch the user from DB
    const currentUser = await databaseConnection.collection("users").findOne({ _id: new ObjectId(session.user.id) });

    // Redirect if user not found or not admin
    if (!currentUser || currentUser.role !== "admin") redirect("/403");

    return <ProductUploadPanel />;
  } catch {
    // Redirect on any unexpected error
    redirect("/403");
  }
}
