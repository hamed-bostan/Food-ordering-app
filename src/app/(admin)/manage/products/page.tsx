import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { ProductType } from "@/application/schemas/product.schema";
import { getProductsAdmin } from "@/infrastructure/apis/admin/product.api";
import ProductsTable from "@/presentation/features/admin/manage/products";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id || !session.accessToken) {
    redirect("/auth/otp");
  }

  const allowedRoles = ["admin", "root"];
  if (!allowedRoles.includes(session.user.role)) {
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
