import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import ProductsTable from "./components";
import { ProductType } from "@/domain/product.schema";
import { getProductsAdmin } from "@/infrastructure/apis/admin/product.api";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id || !session.accessToken) {
    redirect("/auth/otp");
  }

  if (session.user.role !== "admin") {
    redirect("/403");
  }

  let initialProducts: ProductType[] = [];

  try {
    const response = await getProductsAdmin(session.accessToken);
    initialProducts = response.result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error fetching products:", error.message);
    } else {
      console.error("❌ Unexpected error fetching products:", error);
    }
    redirect("/403");
  }

  return <ProductsTable initialProducts={initialProducts} token={session.accessToken} />;
}
