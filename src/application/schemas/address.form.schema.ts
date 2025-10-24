import { z } from "zod";

export const AddressCreateSchema = z.object({
  id: z.string().optional(), // optional when creating
  value: z.string(),
  coords: z.tuple([z.number(), z.number()]),
});

export type AddressCreateType = z.infer<typeof AddressCreateSchema>;
