import { z } from "zod";

export const AddressSchema = z.object({
  id: z.string(),
  value: z.string(),
  coords: z.tuple([z.number(), z.number()]),
});

export type AddressType = z.infer<typeof AddressSchema>;
