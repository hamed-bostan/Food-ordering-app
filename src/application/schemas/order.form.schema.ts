import { z } from "zod";

// JSON-based form schema for order creation
export const CreateOrderFormSchema = z.object({
  branch: z.enum(["aghdasieh", "vanak", "ekbatan"], {
    required_error: "Branch selection is required",
  }),
  deliveryMethod: z.enum(["pickup", "courier"], {
    required_error: "Delivery method is required",
  }),
  paymentMethod: z.enum(["cash", "online"], {
    required_error: "Payment method is required",
  }),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Product ID is required"),
        name: z.string().min(1, "Product name is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        price: z.number().nonnegative("Price must be >= 0"),
      })
    )
    .min(1, "Order must contain at least one item"),
  totalPrice: z.number().nonnegative("Total price must be >= 0"),
});

export const UpdateOrderFormSchema = z.object({
  branch: z.enum(["aghdasieh", "vanak", "ekbatan"]).optional(),
  deliveryMethod: z.enum(["pickup", "courier"]).optional(),
  paymentMethod: z.enum(["cash", "online"]).optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        name: z.string(),
        quantity: z.number().min(1),
        price: z.number().nonnegative(),
      })
    )
    .optional(),
  totalPrice: z.number().nonnegative().optional(),
});

// Types
export type CreateOrderFormType = z.infer<typeof CreateOrderFormSchema>;
export type UpdateOrderFormType = z.infer<typeof UpdateOrderFormSchema>;
