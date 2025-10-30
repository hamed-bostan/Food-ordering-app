import { z } from "zod";
import { AddressSchema, AddressType } from "./address.schema";
import { isOrderDeliveryValid } from "@/domain/order/order.rules";

// --- Enums ---
export const BranchEnum = z.enum(["aghdasieh", "vanak", "ekbatan"]);
export type BranchType = z.infer<typeof BranchEnum>;

export const DeliveryMethodEnum = z.enum(["pickup", "courier"]);
export type DeliveryMethodType = z.infer<typeof DeliveryMethodEnum>;

export const PaymentMethodEnum = z.enum(["cash", "online"]);
export type PaymentMethodType = z.infer<typeof PaymentMethodEnum>;

export const StatusEnum = z.enum(["تعیین وضعیت نشده", "در حال آماده سازی", "ارسال شده", "لغو شده"]);
export type StatusType = z.infer<typeof StatusEnum>;

// --- Validation rule messages ---
export const orderDeliveryValidationError = {
  message: "Invalid branch/deliveryMethod/address combination",
  path: ["deliveryMethod"] as (string | number)[],
};

// --- Base schema (common fields) ---
export const BaseOrderSchema = z.object({
  id: z.string(),
  branch: BranchEnum.nullable(),
  deliveryMethod: DeliveryMethodEnum,
  paymentMethod: PaymentMethodEnum,
  status: StatusEnum.optional().default("تعیین وضعیت نشده"),
  items: z.array(
    z.object({
      productId: z.string(),
      name: z.string(),
      quantity: z.number().min(1),
      price: z.number().nonnegative(),
      discount: z.number().default(0),
    })
  ),
  totalPrice: z.number().nonnegative(),
  address: AddressSchema.nullable().optional(),
  notes: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
});

// --- Full validation schema (domain use) ---
export const OrderSchema = BaseOrderSchema.refine(
  (data) => isOrderDeliveryValid(data.deliveryMethod, data.branch, data.address),
  orderDeliveryValidationError
);

export type OrderType = z.infer<typeof OrderSchema>;
export type AddressTypeForOrder = AddressType;
