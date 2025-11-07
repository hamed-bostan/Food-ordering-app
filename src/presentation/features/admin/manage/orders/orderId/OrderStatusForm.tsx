"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material";
import { updateOrderAdmin } from "@/infrastructure/apis/admin/order.api";
import { useState } from "react";
import { useSession } from "next-auth/react";

type OrderStatus = "تعیین وضعیت نشده" | "در حال آماده سازی" | "ارسال شده" | "لغو شده";

type OrderStatusFormProps = {
  orderId: string;
  currentStatus?: OrderStatus | null;
};

type FormData = {
  status: OrderStatus;
};

export default function OrderStatusForm({ orderId, currentStatus }: OrderStatusFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: { status: currentStatus ?? "تعیین وضعیت نشده" },
    values: { status: currentStatus ?? "تعیین وضعیت نشده" },
  });

  const selectedStatus = watch("status");

  const STATUS_COLORS: Record<OrderStatus, { bg: string; text: string }> = {
    "تعیین وضعیت نشده": { bg: "#FEF9C3", text: "#854D0E" },
    "در حال آماده سازی": { bg: "#DBEAFE", text: "#1E3A8A" },
    "ارسال شده": { bg: "#DCFCE7", text: "#166534" },
    "لغو شده": { bg: "#FEE2E2", text: "#991B1B" },
  };

  const onSubmit = async (data: FormData) => {
    if (!session?.accessToken) return console.error("⚠️ No access token found");

    try {
      setLoading(true);
      const { result } = await updateOrderAdmin(orderId, { status: data.status }, session.accessToken);

      setValue("status", result.status);
      router.refresh();
    } catch (err) {
      console.error("❌ Error updating order:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FormControl variant="outlined" size="small" className="w-48">
            <InputLabel id="status-label">وضعیت سفارش</InputLabel>
            <Select
              {...field}
              labelId="status-label"
              label="وضعیت سفارش"
              onChange={(e) => field.onChange(e.target.value as OrderStatus)}
              sx={{
                "& .MuiSelect-select": {
                  backgroundColor: STATUS_COLORS[selectedStatus]?.bg ?? "inherit",
                  color: STATUS_COLORS[selectedStatus]?.text ?? "inherit",
                  borderRadius: "6px",
                  fontWeight: 500,
                },
              }}
            >
              <MenuItem value="تعیین وضعیت نشده">تعیین وضعیت نشده</MenuItem>
              <MenuItem value="در حال آماده سازی">در حال آماده سازی</MenuItem>
              <MenuItem value="ارسال شده">ارسال شده</MenuItem>
              <MenuItem value="لغو شده">لغو شده</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Button type="submit" variant="contained" color="primary" size="small" disabled={loading}>
        {loading ? "در حال به‌روزرسانی..." : "به‌روزرسانی"}
      </Button>
    </form>
  );
}
