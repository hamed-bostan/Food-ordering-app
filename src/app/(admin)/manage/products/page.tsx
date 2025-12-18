import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { getProductsAdmin } from "@/infrastructure/apis/admin/product.api";
import ProductsTable from "@/presentation/features/admin/manage/products";
import { deleteProductAction, updateProductAction } from "@/application/actions";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  const allowedRoles = ["admin", "root"];
  if (!session?.user?.id || !session.accessToken || !allowedRoles.includes(session.user.role)) {
    redirect(session ? "/403" : "/auth/otp");
  }

  const { result } = await getProductsAdmin(session.accessToken);

  return (
    <ProductsTable initialProducts={result} deleteAction={deleteProductAction} updateAction={updateProductAction} />
  );
}
