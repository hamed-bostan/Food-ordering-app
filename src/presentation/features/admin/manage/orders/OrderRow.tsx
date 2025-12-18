"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { OrderType } from "@/application/schemas/order.schema";
import { UpdateOrderFormSchema, UpdateOrderFormType } from "@/application/schemas/order.form.schema";
import Link from "next/link";

type OrderRowProps = {
  order: OrderType;
  updateAction: (orderId: string, data: UpdateOrderFormType) => Promise<OrderType>;
  onOrderUpdated: (updatedOrder: OrderType) => void;
  onOrderRemoved: (orderId: string) => void;
  userRole: string;
};

export default function OrderRow({ order, updateAction, onOrderUpdated, onOrderRemoved, userRole }: OrderRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const isRoot = userRole === "root";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateOrderFormType>({
    resolver: zodResolver(UpdateOrderFormSchema),
    defaultValues: {
      status: order.status,
    },
  });

  const onSubmit = async (data: UpdateOrderFormType) => {
    if (!isRoot) return;
    const updatedOrder = await updateAction(order.id, data);
    onOrderUpdated(updatedOrder);
    setIsEditing(false);
    reset();
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const STATUS_COLORS: Record<OrderType["status"], { bg: string; text: string }> = {
    "تعیین وضعیت نشده": { bg: "#FEF9C3", text: "#854D0E" },
    "در حال آماده سازی": { bg: "#DBEAFE", text: "#1E3A8A" },
    "ارسال شده": { bg: "#DCFCE7", text: "#166534" },
    "لغو شده": { bg: "#FEE2E2", text: "#991B1B" },
  };

  const statusColor = STATUS_COLORS[order.status] ?? {
    bg: "#F3F4F6",
    text: "#374151",
  };

  return (
    <tr className="text-center border-t">
      <td className="p-2 border">{order.id}</td>
      <td className="p-2 border">{order.paymentMethod}</td>
      <td className="p-2 border">{order.deliveryMethod}</td>
      <td className="p-2 border">{order.branch ?? "-"}</td>
      <td className="p-2 border">{order.totalPrice.toLocaleString()} تومان</td>
      <td className="font-medium border">
        {isEditing ? (
          <>
            <select {...register("status")} className="w-full p-1 border rounded">
              <option value="تعیین وضعیت نشده">تعیین وضعیت نشده</option>
              <option value="در حال آماده سازی">در حال آماده سازی</option>
              <option value="ارسال شده">ارسال شده</option>
              <option value="لغو شده">لغو شده</option>
            </select>
            {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
          </>
        ) : (
          <div
            className="inline-flex items-center justify-center w-5/6 py-1 rounded"
            style={{
              backgroundColor: statusColor.bg,
              color: statusColor.text,
            }}
          >
            {order.status}
          </div>
        )}
      </td>
      <td className="p-2 border">{new Date(order.createdAt).toLocaleString("fa-IR")}</td>
      <td className="p-2 space-x-2 border">
        <Link
          href={`/manage/orders/${order.id}`}
          className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          View
        </Link>
        {isRoot && isEditing && (
          <form onSubmit={handleSubmit(onSubmit)} className="inline-flex gap-2">
            <button type="submit" className="text-green-600">
              <SaveIcon fontSize="small" />
            </button>
            <button type="button" onClick={handleCancel} className="text-gray-600">
              <CloseIcon fontSize="small" />
            </button>
          </form>
        )}
        {isRoot && !isEditing && (
          <div className="inline-flex gap-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-600">
              <EditIcon fontSize="small" />
            </button>
            <button onClick={() => onOrderRemoved(order.id)} className="text-red-600">
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        )}
        {!isRoot && <span className="text-gray-400">No actions</span>}
      </td>
    </tr>
  );
}
