import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().optional().or(z.literal("")), // allow empty string
  phone_number: z
    .string()
    .regex(/^\d{11}$/, "شماره تماس باید 11 رقم عدد باشد.")
    .optional()
    .or(z.literal("")), // allow empty
  email: z.string().email("ایمیل معتبر وارد کنید").optional().or(z.literal("")),
  image: z.any().optional(), // use .any() because FileList isn't directly supported
});

export type ProfileSchema = z.infer<typeof profileSchema>;
