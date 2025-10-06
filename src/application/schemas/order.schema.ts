import { z } from "zod";
import { AddressSchema } from "./address.schema";

export const BranchEnum = z.enum(["aghdasieh", "vanak", "ekbatan"]);
export type BranchType = z.infer<typeof BranchEnum>;

export const DeliveryMethodEnum = z.enum(["pickup", "courier"]);
export type DeliveryMethodType = z.infer<typeof DeliveryMethodEnum>;

export const PaymentMethodEnum = z.enum(["cash", "online"]);
export type PaymentMethodType = z.infer<typeof PaymentMethodEnum>;

// --- Validation rule messages ---
const branchDeliveryAddressRule = {
  message: "Invalid branch/deliveryMethod/address combination",
  path: ["deliveryMethod"] as (string | number)[],
};

// --- Base schema (common fields) ---
const BaseOrderSchema = z.object({
  id: z.string(),
  branch: BranchEnum.nullable(),
  deliveryMethod: DeliveryMethodEnum,
  paymentMethod: PaymentMethodEnum,
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

// --- Full validation: branch + deliveryMethod + address consistency ---
export const OrderSchema = BaseOrderSchema.refine((data) => {
  if (data.deliveryMethod === "pickup") {
    return data.branch !== null && data.address == null;
  }
  if (data.deliveryMethod === "courier") {
    return data.branch === null && data.address != null;
  }
  return false;
}, branchDeliveryAddressRule);

// --- Create DTO (omit id + createdAt) ---
export const CreateOrderDto = BaseOrderSchema.omit({
  id: true,
  createdAt: true,
}).refine((data) => {
  if (data.deliveryMethod === "pickup") {
    return data.branch !== null && data.address == null;
  }
  if (data.deliveryMethod === "courier") {
    return data.branch === null && data.address != null;
  }
  return false;
}, branchDeliveryAddressRule);

// --- Update DTO (partial + conditional validation) ---
export const UpdateOrderDto = BaseOrderSchema.omit({
  id: true,
  createdAt: true,
})
  .partial()
  .refine((data) => {
    if (data.deliveryMethod === undefined) {
      return true; // no delivery method change
    }
    if (data.deliveryMethod === "pickup") {
      return data.branch != null && data.address == null;
    }
    if (data.deliveryMethod === "courier") {
      return data.branch == null && data.address != null;
    }
    return false;
  }, branchDeliveryAddressRule);

// --- Types ---
export type OrderType = z.infer<typeof OrderSchema>;
export type CreateOrderDtoType = z.infer<typeof CreateOrderDto>;
export type UpdateOrderDtoType = z.infer<typeof UpdateOrderDto>;
