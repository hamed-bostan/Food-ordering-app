"use client";

import { OrderType } from "@/application/schemas/order.schema";

type OrderRowProps = {
  order: OrderType;
  token: string;
  onOrderUpdated: (order: OrderType) => void;
  onOrderRemoved: (orderId: string) => void;
};

export default function OrderRow({ order, token, onOrderUpdated, onOrderRemoved }: OrderRowProps) {
  const handleViewDetails = () => {
    alert(`Viewing details for order ID: ${order.id}`);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this order?")) {
      onOrderRemoved(order.id);
    }
  };

  return (
    <tr className="text-center border-t">
      <td className="p-2 border">{order.id}</td>
      <td className="p-2 border">{order.paymentMethod}</td>
      <td className="p-2 border">{order.deliveryMethod}</td>
      <td className="p-2 border">{order.branch ?? "-"}</td>
      <td className="p-2 border">{order.totalPrice.toLocaleString()} تومان</td>
      <td className="p-2 border">{new Date(order.createdAt).toLocaleString("fa-IR")}</td>
      <td className="p-2 space-x-2 border">
        <button onClick={handleViewDetails} className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
          View
        </button>
        <button onClick={handleDelete} className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600">
          Delete
        </button>
      </td>
    </tr>
  );
}
