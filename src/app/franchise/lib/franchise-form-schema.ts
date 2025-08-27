import { z } from "zod";

export const franchiseFormSchema = z.object({
  fullName: z.string().min(3, "وارد کردن نام و نام خانوادگی الزامی است."),
  nationalId: z
    .string()
    .min(10, "کد ملی باید ۱۰ رقم باشد.")
    .regex(/^\d+$/, "کد ملی فقط باید عدد باشد."),
  phone: z
    .string()
    .min(11, "شماره تماس باید 11 رقم باشد.")
    .regex(/^\d+$/, "شماره تماس فقط باید عدد باشد."),
  province: z
    .string({
      required_error: "وارد کردن استان الزامی است.",
    })
    .nonempty("وارد کردن استان الزامی است."),
  city: z
    .string({
      required_error: "وارد کردن شهر الزامی است.",
    })
    .nonempty("وارد کردن شهر الزامی است."),
  region: z.string().optional(),
  address: z.string().optional(),
  ownershipType: z
    .string({
      required_error: "وارد کردن نوع مالکیت الزامی است.",
    })
    .nonempty("وارد کردن نوع مالکیت الزامی است."),
  propertyArea: z
    .string()
    .optional()
    .refine((val) => val === undefined || val === "" || /^\d+$/.test(val), {
      message: "فقط عدد مجاز است.",
    }),
  buildingAge: z
    .string()
    .optional()
    .refine((val) => val === undefined || val === "" || /^\d+$/.test(val), {
      message: "فقط عدد مجاز است.",
    }),
  hasBusinessLicense: z.boolean().optional(),
  hasParking: z.boolean().optional(),
  hasKitchen: z.boolean().optional(),
  hasStorage: z.boolean().optional(),
});

export type FranchiseFormValues = z.infer<typeof franchiseFormSchema>;
