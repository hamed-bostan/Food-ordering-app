import { OrderType } from "@/application/schemas/order.schema";
import Link from "next/link";

type OrderStatus = "تعیین وضعیت نشده" | "در حال آماده سازی" | "ارسال شده" | "لغو شده";

type OrderRowProps = {
  order: OrderType;
  onOrderRemoved: (orderId: string) => void;
};

export default function OrderRow({ order, onOrderRemoved }: OrderRowProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this order?")) {
      onOrderRemoved(order.id);
    }
  };

  const STATUS_COLORS: Record<OrderStatus, { bg: string; text: string }> = {
    "تعیین وضعیت نشده": { bg: "#FEF9C3", text: "#854D0E" },
    "در حال آماده سازی": { bg: "#DBEAFE", text: "#1E3A8A" },
    "ارسال شده": { bg: "#DCFCE7", text: "#166534" },
    "لغو شده": { bg: "#FEE2E2", text: "#991B1B" },
  };

  const statusColor = STATUS_COLORS[order.status] ?? {
    bg: "#F3F4F6",
    text: "#374151",
  }; // fallback (gray)

  return (
    <tr className="text-center border-t">
      <td className="p-2 border">{order.id}</td>
      <td className="p-2 border">{order.paymentMethod}</td>
      <td className="p-2 border">{order.deliveryMethod}</td>
      <td className="p-2 border">{order.branch ?? "-"}</td>
      <td className="p-2 border">{order.totalPrice.toLocaleString()} تومان</td>
      <td className="font-medium border">
        <div
          className="inline-flex items-center justify-center w-5/6 py-1 rounded"
          style={{
            backgroundColor: statusColor.bg,
            color: statusColor.text,
          }}
        >
          {order.status}
        </div>
      </td>

      <td className="p-2 border">{new Date(order.createdAt).toLocaleString("fa-IR")}</td>

      <td className="p-2 space-x-2 border">
        <Link
          href={`/manage/orders/${order.id}`}
          className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          View
        </Link>
        <button onClick={handleDelete} className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600">
          Delete
        </button>
      </td>
    </tr>
  );
}
