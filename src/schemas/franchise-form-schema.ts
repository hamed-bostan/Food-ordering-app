import { z } from "zod";

export const franchiseFormSchema = z.object({
  fullName: z.string().min(1, "وارد کردن نام و نام خانوادگی الزامی است."),
  nationalId: z
    .string()
    .min(10, "کد ملی باید ۱۰ رقم باشد.")
    .regex(/^\d+$/, "کد ملی فقط باید عدد باشد."),
  phone: z
    .string()
    .min(11, "شماره تماس باید 11 رقم باشد.")
    .regex(/^\d+$/, "شماره تماس فقط باید عدد باشد."),
  province: z.string().min(1),
  city: z.string().min(1),
  region: z.string().min(1),
  address: z.string().min(1),
  ownershipType: z.string().min(1),
  propertyArea: z.string().regex(/^\d+$/, "فقط عدد مجاز است."),
  buildingAge: z.string().regex(/^\d+$/, "فقط عدد مجاز است."),
  hasBusinessLicense: z.boolean().optional(), // was "hasLicense"
  hasParking: z.boolean().optional(),
  hasKitchen: z.boolean().optional(),
  hasStorage: z.boolean().optional(),
});

export type FranchiseFormValues = z.infer<typeof franchiseFormSchema>;
