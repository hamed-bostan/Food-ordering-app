import { z } from "zod";

export const makeOptional = (schema: z.ZodTypeAny) =>
  z.preprocess((val) => (val === "" ? null : val), schema.nullable().optional());
