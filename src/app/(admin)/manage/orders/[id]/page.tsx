import { OrderType } from "@/application/schemas/order.schema";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getOrderByIdAdmin } from "@/infrastructure/apis/admin/order.api";
import OrderStatusForm from "@/presentation/features/admin/manage/orders/orderId/OrderStatusForm";

type OrderDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id || !session.accessToken) {
    redirect("/auth/otp");
  }

  const allowedRoles = ["admin", "root"];
  if (!allowedRoles.includes(session.user.role)) {
    redirect("/403");
  }

  let order: OrderType | null = null;
  try {
    const response = await getOrderByIdAdmin(id, session.accessToken);
    order = response.result;
  } catch (error: unknown) {
    console.error("❌ Error fetching order details:", error);
    redirect("/403");
  }

  if (!order) redirect("/404");

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded shadow-md">
      <h1 className="mb-4 text-2xl font-semibold text-gray-800">جزئیات سفارش</h1>

      <div className="space-y-2">
        <DetailRow label="شناسه سفارش" value={order.id} />

        <DetailRow
          label="وضعیت سفارش"
          value={
            <div className="flex items-center gap-4">
              <OrderStatusForm orderId={order.id} currentStatus={order.status} />
            </div>
          }
        />

        <DetailRow label="روش پرداخت" value={order.paymentMethod} />
        <DetailRow label="روش ارسال" value={order.deliveryMethod} />
        <DetailRow label="شعبه" value={order.branch ?? "-"} />
        <DetailRow label="آدرس" value={order.address?.value ?? "-"} />
        <DetailRow label="مبلغ کل" value={`${order.totalPrice.toLocaleString()} تومان`} />
        <DetailRow label="تاریخ ایجاد" value={new Date(order.createdAt).toLocaleString("fa-IR")} />
      </div>

      {order.items?.length ? (
        <div className="mt-8">
          <h2 className="mb-2 text-lg font-semibold">محصولات سفارش</h2>
          <table className="w-full text-center border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">محصول</th>
                <th className="p-2 border">تعداد</th>
                <th className="p-2 border">قیمت</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">{item.price.toLocaleString()} تومان</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between pb-1 text-gray-700 border-b">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
