import { z } from "zod";
import { AddressSchema } from "./address.schema";

const branchDeliveryMethodRule = {
  message: "Invalid branch/deliveryMethod combination",
  path: ["branch"] as (string | number)[],
};

const BaseOrderSchema = z.object({
  id: z.string(),
  branch: z.enum(["aghdasieh", "vanak", "ekbatan"]).nullable(),
  deliveryMethod: z.enum(["pickup", "courier"]),
  paymentMethod: z.enum(["cash", "online"]),
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

export const OrderSchema = BaseOrderSchema.refine(
  (data) =>
    (data.deliveryMethod === "pickup" && data.branch !== null) ||
    (data.deliveryMethod === "courier" && data.branch === null),
  branchDeliveryMethodRule
);

export const CreateOrderDto = BaseOrderSchema.omit({
  id: true,
  createdAt: true,
}).refine(
  (data) =>
    (data.deliveryMethod === "pickup" && data.branch !== null) ||
    (data.deliveryMethod === "courier" && data.branch === null),
  branchDeliveryMethodRule
);

export const UpdateOrderDto = BaseOrderSchema.omit({
  id: true,
  createdAt: true,
})
  .partial()
  .refine((data) => {
    if (data.deliveryMethod === undefined) {
      return true;
    }
    if (data.deliveryMethod === "pickup") {
      return data.branch != null;
    }
    if (data.deliveryMethod === "courier") {
      return data.branch === null;
    }
    return false;
  }, branchDeliveryMethodRule);

export type OrderType = z.infer<typeof OrderSchema>;
export type CreateOrderDtoType = z.infer<typeof CreateOrderDto>;
export type UpdateOrderDtoType = z.infer<typeof UpdateOrderDto>;
