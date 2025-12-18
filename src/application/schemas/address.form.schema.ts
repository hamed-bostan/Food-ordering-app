import { z } from "zod";

export const AddressCreateSchema = z.object({
  value: z.string(),
  coords: z.tuple([z.number(), z.number()]),
});

export type AddressCreateType = z.infer<typeof AddressCreateSchema>;

export const AddressUpdateSchema = AddressCreateSchema.extend({
  id: z.string().optional(),
});

export type AddressUpdateType = z.infer<typeof AddressUpdateSchema>;
