import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { getOrdersAdmin } from "@/infrastructure/apis/admin/order.api";
import OrdersTable from "@/presentation/features/admin/manage/orders";
import { deleteOrderAction, updateOrderAction } from "@/application/orders.action";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  const allowedRoles = ["admin", "root"];
  if (!session?.user?.id || !session.accessToken || !allowedRoles.includes(session.user.role)) {
    redirect(session ? "/403" : "/auth/otp");
  }

  const { result } = await getOrdersAdmin(session.accessToken);

  return <OrdersTable initialOrders={result} deleteAction={deleteOrderAction} updateAction={updateOrderAction} />;
}
