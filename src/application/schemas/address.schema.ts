import { z } from "zod";

export const AddressSchema = z.object({
  id: z.string(),
  value: z.string(), // the full address (main editable field)
  coords: z.tuple([z.number(), z.number()]), // lat/lng from map
});

export type AddressType = z.infer<typeof AddressSchema>;
