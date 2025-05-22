import { z } from "zod";

export const franchiseFormSchema = z.object({
  fullName: z.string().min(1, "وارد کردن نام الزامی است."),
  nationalId: z.string().min(10, "کد ملی باید ۱۰ رقم باشد."),
  phone: z.string().min(1, "شماره تماس الزامی است."),
  province: z.string().min(1),
  city: z.string().min(1),
  region: z.string().min(1),
  address: z.string().min(1),
  ownershipType: z.string().min(1),
  area: z.string().min(1),
  buildingAge: z.string().min(1),
  hasLicense: z.boolean().optional(),
  hasParking: z.boolean().optional(),
  hasKitchen: z.boolean().optional(),
  hasStorage: z.boolean().optional(),
});

export type FranchiseFormValues = z.infer<typeof franchiseFormSchema>;
