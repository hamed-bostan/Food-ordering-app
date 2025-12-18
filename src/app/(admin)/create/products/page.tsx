import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ProductUploader from "@/presentation/features/admin/create/products/ProductUploader";
import { createProductAction } from "@/application/actions";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  const allowedRoles = ["admin", "root"];
  if (!session?.user?.id || !session.accessToken || !allowedRoles.includes(session.user.role)) {
    redirect(session ? "/403" : "/auth/otp");
  }

  return <ProductUploader createAction={createProductAction} />;
}
