"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { OrderType } from "@/application/schemas/order.schema";
import OrderRow from "./OrderRow";
import { useSession } from "next-auth/react";
import { UpdateOrderFormType } from "@/application/schemas/order.form.schema";

export default function OrdersTable({
  initialOrders,
  deleteAction,
  updateAction,
}: {
  initialOrders: OrderType[];
  deleteAction: (orderId: string) => Promise<string>;
  updateAction: (orderId: string, data: UpdateOrderFormType) => Promise<OrderType>;
}) {
  const session = useSession();
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);

  const handleOrderUpdated = (updatedOrder: OrderType) => {
    setOrders((prev) => prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
  };

  const handleOrderRemoved = async (orderId: string) => {
    const removedOrder = orders.find((o) => o.id === orderId);
    setOrders((prev) => prev.filter((o) => o.id !== orderId)); // Optimistic

    try {
      const message = await deleteAction(orderId);
      toast.success(message);
    } catch (error: unknown) {
      if (removedOrder) {
        setOrders((prev) => [...prev, removedOrder].sort((a, b) => a.id.localeCompare(b.id))); // Rollback
      }
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to delete order");
    }
  };

  return (
    <table className="w-full border border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Order ID</th>
          <th className="p-2 border">Payment</th>
          <th className="p-2 border">Delivery</th>
          <th className="p-2 border">Branch</th>
          <th className="p-2 border">Total Price</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Created At</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderRow
            key={order.id}
            userRole={session?.data?.user?.role ?? ""}
            order={order}
            updateAction={updateAction}
            onOrderUpdated={handleOrderUpdated}
            onOrderRemoved={handleOrderRemoved}
          />
        ))}
      </tbody>
    </table>
  );
}
