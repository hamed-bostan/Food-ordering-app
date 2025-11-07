import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { OrderType } from "@/application/schemas/order.schema";
import { getOrdersAdmin } from "@/infrastructure/apis/admin/order.api";
import OrdersTable from "@/presentation/features/admin/manage/orders";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id || !session.accessToken) {
    redirect("/auth/otp");
  }

  if (session.user.role !== "admin") {
    redirect("/403");
  }

  let initialOrders: OrderType[] = [];

  try {
    const response = await getOrdersAdmin(session.accessToken);
    initialOrders = response.result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error fetching orders:", error.message);
    } else {
      console.error("❌ Unexpected error fetching orders:", error);
    }
    redirect("/403");
  }

  return <OrdersTable initialOrders={initialOrders} token={session.accessToken} />;
}
