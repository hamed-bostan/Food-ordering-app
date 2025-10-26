"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { OrderType } from "@/application/schemas/order.schema";
import OrderRow from "./OrderRow";
import { deleteOrderAdmin } from "@/infrastructure/apis/admin/order.api";

type OrdersTableProps = {
  initialOrders: OrderType[];
  token: string;
};

export default function OrdersTable({ initialOrders, token }: OrdersTableProps) {
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);

  const handleOrderUpdated = (updatedOrder: OrderType) => {
    setOrders((prev) => prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
  };

  const handleOrderRemoved = async (orderId: string) => {
    try {
      const res = await deleteOrderAdmin(orderId, token);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      toast.success(res.message);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to remove order");
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
          <th className="p-2 border">Created At</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            token={token}
            onOrderUpdated={handleOrderUpdated}
            onOrderRemoved={handleOrderRemoved}
          />
        ))}
      </tbody>
    </table>
  );
}
